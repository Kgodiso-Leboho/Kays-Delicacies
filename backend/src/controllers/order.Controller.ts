import pool from "../config/db.js";
import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../types/express.d.js";


function totalPrice(items: any[]): number {
    return items.reduce((total, item) => {
        // 1. Get the base price of the item
        const basePrice = Number(item.price) || 0;

        // 2. Calculate the price of extras (if they exist)
        let extrasTotal = 0;
        if (item.extras && Array.isArray(item.extras)) {
            extrasTotal = item.extras.reduce((sum: number, extra: any) => {
                return sum + (Number(extra.price) || 0);
            }, 0);
        }

        // 3. Multiply by quantity and add to the running total
        const quantity = Number(item.quantity) || 1;
        return total + (basePrice + extrasTotal) * quantity;
    }, 0);
}

export async function createOrder(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;
        const { items } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Items are required to place an order' });
        }

        // Calculate verified total
        const calculatedTotal = totalPrice(items);

        // Insert order
        const orderResult = await pool.query(
            'INSERT INTO orders (user_id, items, price) VALUES ($1, $2, $3) RETURNING id',
            [userId, JSON.stringify(items), calculatedTotal]
        );

        return res.status(201).json({ 
            message: 'Order created successfully', 
            orderId: orderResult.rows[0].id 
        });

    } catch (error) {
        next(error);
    }
}

export async function getOrders(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req.user?.id;

        const ordersResult = await pool.query('SELECT id, items, created_at, status FROM orders WHERE user_id = $1', [userId]);

        return res.status(200).json({ orders: ordersResult.rows });
    } catch (error) {
        next(error);
    }
}

export async function adminGetAllOrders(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const ordersResult = await pool.query(
            'SELECT orders.*, users.full_name, users.email FROM orders JOIN users ON orders.user_id = users.id ORDER BY created_at DESC'
        );

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

        const deleteResult = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING id', [orderId]);

        if (deleteResult.rows.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        next(error);
    }
}


