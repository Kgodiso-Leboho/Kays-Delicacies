import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { AuthRequest} from '../types/express.d.js';
import type { UserPayload } from '../types/auth.js';
import pool  from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export async function authMiddleware (req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized, no token provided' 
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;

        // Fetch user from the database to ensure that the user still exists and to get the latest user data
        const user = await pool.query(
            "SELECT id, full_name, email, role FROM users where id = $1",
            [decoded.id]
        )

        if(user.rows.length === 0){
            return res.status(401).json({
                message: "Unauthorized, user was not found"
            });
        }

        req.user = user.rows[0];
        next();
        
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({
            message: 'Unauthorized, token failed'
        });
    }
}



















