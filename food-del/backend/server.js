import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import orderRouter from "./routes/orderRoute.js";


// app config
const app = express();
const port = 4000;

// CORS setup with React app's URL
app.use(cors({
    origin: 'http://localhost:5173', // your React app's port
    methods: ['GET', 'POST'],
}));

// middleware
app.use(express.json());

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/order",orderRouter);

// Simple test route
app.get("/", (req, res) => {
    res.send("API Working");
});

// General error handling (for unhandled routes)
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "Not Found" });
});

// Global error handling middleware for unexpected errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Something went wrong!" });
});

// Start server
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});

app.get('/api/food/list', async (req, res) => {
    try {
      const foodList = await Food.find();  // Example fetching from DB
      res.json({ success: true, data: foodList });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to fetch food list." });
    }
  });
  
