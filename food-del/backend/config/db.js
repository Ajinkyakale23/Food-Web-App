import mongoose from "mongoose";

export const connectDB = async () => {
    // try {
    //     const dbURI = 'mongodb+srv://ajinkya:230623@cluster0.znmpoew.mongodb.net/food-del'; // Replace <db_password> with the actual password
    //     await mongoose.connect(dbURI, {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true
    //     });
    //     console.log("DB Connected");
    // } catch (error) {
    //     console.error("DB Connection Error: ", error);
    // }
    await mongoose.connect('mongodb+srv://ajinkya:230623@cluster0.znmpoew.mongodb.net/food-del').then(()=>console.log("DB Connected"));
};
