import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("db connected succesfully");
    }).catch((err) => {
        console.log(err);
    });
} 
