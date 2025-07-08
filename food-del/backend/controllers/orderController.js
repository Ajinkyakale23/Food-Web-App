import orderModel from "../models/ordermodel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// PLACE ORDER
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    try {
        const { items, amount, address } = req.body;
        const userId = req.user.id; // 🔐 Get from token (authMiddleware)

        // 1. Create order in MongoDB
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
        });
        await newOrder.save();

        // 2. Optional: Clear user's cart (if you store it in user model)
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // 3. Stripe: Prepare line_items for checkout
        const line_items = items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // already in INR
            },
            quantity: item.quantity,
        }));

        // 4. Add delivery charge (optional)
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 1000, // ₹10
            },
            quantity: 1,
        });

        // 5. Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Stripe Order Error:", error);
        res.status(500).json({ success: false, message: "Failed to place order." });
    }
};

// VERIFY ORDER PAYMENT
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment successful." });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: true, message: "Payment cancelled, order deleted." });
        }
    } catch (error) {
        console.error("Order verification error:", error);
        res.status(500).json({ success: false, message: "Failed to verify order." });
    }
};

// USER ORDER HISTORY
const userOrders = async (req, res) => {
    try {
        const orders =await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
};

export { placeOrder, verifyOrder, userOrders };
