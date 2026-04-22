import pool from "../config/db.js";
import type { Response } from "express";
import type { AuthRequest } from "../types/express.d.js";
import type { User } from "../types/models.js";

export async function createOrder(req: AuthRequest, res: Response, next: Function) {
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