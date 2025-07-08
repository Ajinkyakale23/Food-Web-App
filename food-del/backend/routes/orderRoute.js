import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"; // Add .js if using ES modules
import { placeOrder, verifyOrder,userOrders } from "../controllers/orderController.js"; // Add .js as well

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware,userOrders)

export default orderRouter;
