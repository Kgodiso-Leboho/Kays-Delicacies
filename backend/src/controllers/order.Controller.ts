import pool from "../config/db.js";
import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../types/express.d.js";
import type { User } from "../types/models.js";

export async function createOrder(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const { user_id, items } = req.body;

        if (!user_id || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'User ID and items are required' });
        }

        // Validate user exists
        const userResult = await pool.query('SELECT id FROM users WHERE id = $1', [user_id]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }


        // Insert order into database
        const orderResult = await pool.query(
            'INSERT INTO orders (user_id, items) VALUES ($1, $2) RETURNING id',
            [user_id, JSON.stringify(items)]
        );

        return res.status(201).json({ message: 'Order created successfully', orderId: orderResult.rows[0].id });

    } catch (error) {
        next(error);
    }
}

export async function getOrders(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const ordersResult = await pool.query('SELECT id, items, created_at FROM orders WHERE user_id = $1', [userId]);

        return res.status(200).json({ orders: ordersResult.rows });
    } catch (error) {
        next(error);
    }
}

export async function adminGetAllOrders(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Check if user is admin
        const userResult = await pool.query('SELECT is_admin FROM users WHERE id = $1', [userId]);

        if (!userResult.rows[0]?.is_admin) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const ordersResult = await pool.query('SELECT id, user_id, items, created_at FROM orders');

        return res.status(200).json({ orders: ordersResult.rows });

    } catch (error) {
        next(error);
    }
}   

export async function updateOrderStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;
        const { orderId } = req.params;
        const { status } = req.body;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }   

        // Check if user is admin
        const userResult = await pool.query('SELECT is_admin FROM users WHERE id = $1', [userId]);  

        if (!userResult.rows[0]?.is_admin) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }   

        const updateResult = await pool.query(
            'UPDATE orders SET status = $1 WHERE id = $2 RETURNING id',
            [status, orderId]
        );

        if (updateResult.rows.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json({ message: 'Order status updated successfully' });

    } catch (error) {
        next(error);
    }   
}

export async function deleteOrder(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;
        const { orderId } = req.params; 

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Check if user is admin
        const userResult = await pool.query('SELECT is_admin FROM users WHERE id = $1', [userId]);

        if (!userResult.rows[0]?.is_admin) {
            return res.status(403).json({ message: 'Forbidden' });
        }   

        const deleteResult = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING id', [orderId]);

        if (deleteResult.rows.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        next(error);
    }
}
