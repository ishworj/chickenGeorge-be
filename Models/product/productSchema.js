import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    description: {
      type: String,
    },
    calorie: {
      type: Number,
      required: [true, "Calorie count is required"],
      min: [1, "Calorie count cannot be negative"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price cannot be negative"],
    },
    category: {
      type: String,
      enum: ["rawChicken", "crumbedChicken", "marinatedChicken", "cooked","roll","combo", "drinks","sides","others"],
      required: [true, "Category is required"],
    },

    imgSrc: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
