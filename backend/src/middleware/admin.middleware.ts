import { NextFunction, Response } from 'express';
import type { AuthRequest} from '../types/express.d.js';

export async function adminMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;    

        if (!userId || !req.user?.is_admin) {
            return res.status(403).json({ message: 'Forbidden: Admin access required' });
        }   

        next();
    } catch (error) {
        console.error('Admin middleware error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}