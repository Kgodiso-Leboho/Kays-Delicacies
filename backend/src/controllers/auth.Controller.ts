import pool from "../config/db.js";
import bcrypt from 'bcrypt';
import type { Response, CookieOptions } from "express";
import type { AuthRequest } from "../types/express.d.js";
import type { User } from "../types/models.js";
import jwt from 'jsonwebtoken';

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
        return res.status(201).json({ message: 'User created successfully', user: newUser.rows[0], token });
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
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const userData = user.rows[0];

        const isMatch = await bcrypt.compare(password, userData.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user.rows[0]);
        res.cookie('token', token, cookieOptions);
        return res.status(200).json({ message: 'User logged in successfully', user: user.rows[0], token });

    }
    catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}