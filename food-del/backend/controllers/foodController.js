import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image uploaded." });
        }

        const { name, description, price, category } = req.body;
        if (!name || !description || !price || !category) {
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }

        // Check if price is greater than 0
        if (price <= 0) {
            return res.status(400).json({ success: false, message: "Price must be greater than 0." });
        }

        let image_filename = req.file.filename;

        const food = new foodModel({
            name,
            description,
            price,
            category,
            image: image_filename,
        });

        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ success: false, message: "Error occurred." });
    }
};


// all food list

const listFood = async (req,res) =>{
    try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
 // remove food item
//  const removeFood = async (req, res) => {
//     try{
//         const food = await foodModel.findById(req.body.id);
//         fs.unlink(`./uploads/${food.image}`,()=>{})

//         await foodModel.findByIdAndDelete(req.body.id);
//         res.json({success:true,message:"Food Removed"})

//     }catch(error)
//     {
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
//  }


// const removeFood = async (req, res) => {
//     try {
//         // Find the food item by ID (use req.params.id if ID is passed in the URL)
//         const food = await foodModel.findById(req.params.id);

//         // Check if food exists
//         if (!food) {
//             return res.status(404).json({ success: false, message: "Food not found" });
//         }

//         // Check if the food item has an image and if it exists in the file system
//         if (food.image) {
//             const imagePath = `./uploads/${food.image}`;
//             // Check if the image exists before attempting to delete it
//             if (fs.existsSync(imagePath)) {
//                 fs.unlink(imagePath, (err) => {
//                     if (err) {
//                         console.error("Error deleting image:", err);
//                         return res.status(500).json({ success: false, message: "Error deleting image" });
//                     }
//                 });
//             }
//         }

//         // Delete the food item from the database
//         await foodModel.findByIdAndDelete(req.params.id);

//         // Send a response
//         res.json({ success: true, message: "Food Removed" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, message: "Error occurred while removing food" });
//     }
// };

// const removeFood = async (req, res) => {
//     try {
//       const food = await foodModel.findById(req.body.id);
//       if (!food) {
//         return res.status(404).json({ success: false, message: "Food not found" });
//       }
  
//       const imagePath = `./uploads/${food.image}`;
//       if (fs.existsSync(imagePath)) {
//         fs.unlinkSync(imagePath);
//       }
  
//       await foodModel.findByIdAndDelete(req.body.id);
//       res.json({ success: true, message: "Food Removed" });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ success: false, message: "Error occurred while removing food" });
//     }
//   };
  const removeFood = async (foodId) => {
    // Optimistically update the UI by removing the food item immediately
    setList((prevList) => prevList.filter(item => item._id !== foodId));
  
    const response = await axios.post(
      `${url}/api/food/remove`,
      { id: foodId },
      { headers: { token } }
    );
  
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
      // If there's an error, you may want to refetch the list to restore the deleted item
      fetchList();
    }
  };
export { addFood, listFood ,removeFood};
