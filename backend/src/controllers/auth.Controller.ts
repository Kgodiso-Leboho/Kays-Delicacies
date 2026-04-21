import pool from "../config/db.js";
import bcrypt from 'bcrypt';
import type { Response, CookieOptions } from "express";
import type { AuthRequest } from "../types/express.d.js";
import type { User } from "../types/models.js";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendEmail } from "../utils/sendEmail.js";
// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600000 // 1 hour
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const generateToken = (user: User) => {
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { 
        expiresIn: '1h' 
    });
}

export async function registerUser(req: AuthRequest, res: Response) {
    try{
        const { full_name, email, password } = req.body;

        if(!full_name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (existingUser.rows.length > 0){
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        
        const newUser = await pool.query(
            'INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING id, full_name, email',
            [full_name, email, hashedPassword]
        );
        

        const token = generateToken(newUser.rows[0]);
        res.cookie('token', token, cookieOptions);
        return res.status(201).json({ message: 'User created successfully', user: newUser.rows[0]});
    }
    catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function loginUser(req: AuthRequest, res: Response) {
    try{
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const userData = user.rows[0];

        const isMatch = await bcrypt.compare(password, userData.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user.rows[0]);
        res.cookie('token', token, cookieOptions);

        res.json({
            user: {
                id: userData.id,
                full_name: userData.full_name,
                email: userData.email
            },
        })

        return res.status(200).json({ message: 'User logged in successfully', user: user.rows[0], token }); 
    }
    catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getDataOfLoggedInUser(req: AuthRequest, res: Response) {
    res.json(req.user);

    // return the info of the logged in user
}

export async function logoutUser(req: AuthRequest, res: Response) {
    res.cookie('token', '', { ...cookieOptions, maxAge: 1 });
    res.json({ message: 'User logged out successfully' });
}

export async function forgotPassword(req: AuthRequest, res: Response) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'If an account with this email exists, then an email will be sent' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour

        const updatedUser = await pool.query('UPDATE users SET reset_token = $1, reset_token_expiry = $2 WHERE email = $3 RETURNING id',
            [resetTokenHash, resetTokenExpiry, email]
        );

        const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

        await sendEmail(email, 'Password Reset Request', `You requested a password reset. Click the link to reset your password: ${resetUrl}`, `<p>You requested a password reset. Click the link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`);

        return res.status(200).json({ message: 'If an account with this email exists, then an email will be sent' });
        
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function resetPassword(req: AuthRequest, res: Response) {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ message: 'Token and new password are required' });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { id: number };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const result = await pool.query(
            'UPDATE users SET password = $1 WHERE id = $2 RETURNING id',
            [hashedPassword, decoded.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'Password has been reset successfully' });

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Token has expired' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}

