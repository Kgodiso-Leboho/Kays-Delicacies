import express from 'express';
import { adminGetAllOrders, createOrder, getOrders } from '../controllers/order.Controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router = express.Router();    

// Create a new order
router.post('/', authMiddleware, createOrder);

// Get orders for logged in user    
router.get('/', authMiddleware, getOrders);

// Admin route to get all orders
router.get('/admin', authMiddleware, adminGetAllOrders);

// Additional routes for updating order status, deleting orders, etc. can be added here as needed
router.put('/:orderId/status', authMiddleware, async (req, res) => {
    // Implement logic to update order status
    res.json({ message: 'Order status updated successfully' });
});

router.delete('/:orderId', authMiddleware, async (req, res) => {
    // Implement logic to delete an order
    res.json({ message: 'Order deleted successfully' });
});

export default router;