import express from 'express';
import { adminGetAllOrders, createOrder, deleteOrder, getOrders, updateOrderStatus } from '../controllers/order.Controller.js';
import { authMiddleware} from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';
const router = express.Router();    

// Create a new order
router.post('/', authMiddleware, createOrder);

// Get orders for logged in user    
router.get('/', authMiddleware, getOrders);

// Admin route to get all orders
router.get('/admin', authMiddleware, adminMiddleware, adminGetAllOrders);

// Additional routes for updating order status, deleting orders, etc. can be added here as needed
router.put('/:orderId/status', authMiddleware, adminMiddleware, updateOrderStatus);

// Admin route to delete an order
router.delete('/:orderId', authMiddleware, adminMiddleware, deleteOrder);

export default router;