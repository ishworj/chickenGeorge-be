import express from "express";
import {
  deleteProduct,
  getAllProducts,
  saveProduct,
  updateProduct,
} from "../Models/product/productModel.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const items = await getAllProducts();
    const categorizedData = items.reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});

    res.status(200).json({
      status: "success",
      categorizedData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error while getting the products",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const item = await saveProduct(product);

    res.status(201).json({
      status: "success",
      message: "product created succesfully",
      item,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error while saving the product",
      errorMessage: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const itemToBeUpdated = req.body;
    const item = await updateProduct(id, itemToBeUpdated);

    res.status(200).json({
      status: "success",
      message: "product updated succesfully",
      item,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error while updating the product",
      errorMessage: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const item = await deleteProduct(id);
    res.status(201).json({
      status: "success",
      message: "product deleted succesfully",
      item,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error while deleting the product",
      errorMessage: error.message,
    });
  }
});

export default router;
