import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true }
  },
  { versionKey: false }
);

// Using ES6 export
const FoodModel = mongoose.model('Food', foodSchema);
export default FoodModel;
