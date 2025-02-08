import express from "express";
const router = express.Router();
import { jwtVerify } from "../utils/jwt.js";
import { authenticate } from "../middlewares/authenticate.js";
import { getCartItem, saveCartItem } from "../Models/cart/cartModel.js";

router.get("/", authenticate, async (req, res) => {
  try {
    let cart = await getCartItem({ userId });
    res.status(200).json({
      status: "success",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error while getting cart",
    });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userData._id;

    let cart = await getCartItem({ userId });

    if (cart?.items) {
      const updatedItems = cart.items.map((item) => {
        if (item.productId.toString() === productId) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });

      cart.items = updatedItems;
      const newcart = await saveCartItem(cart);

      return res.status(201).json({
        status: "success",
        message: "item added to cart ",
        newcart,
      });
    }
    const newaddedItem = await saveCartItem({
      userId: req.userData._id,
      items: {
        productId,
        quantity,
      },
    });

    return res.status(201).json({
      status: "success",
      message: "item added to cart ",
      newaddedItem,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error while adding item to cart",
      errorMessage: error.message,
    });
  }
});

router.put("/", authenticate, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userData._id;

    let cart = await getCartItem({ userId });

    if (cart?.items) {
      const updatedItems = cart.items.map((item) => {
        if (item.productId.toString() === productId) {
          return { ...item, quantity: quantity };
        }
        return item;
      });

      cart.items = updatedItems;

      const newcart = await saveCartItem(cart);

      return res.status(201).json({
        status: "success",
        message: "cart item updated ",
        newcart,
      });
    }

    return res.status(201).json({
      status: "error",
      message: "cart not found ",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error while updating the cart",
      errorMessage: error.message,
    });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userData._id;

    let cart = await getCartItem({ userId });

    if (cart?.items) {
      const updatedItems = cart.items.map((item) => {
        if (item.productId.toString() === productId) {
          return { ...item, quantity: quantity };
        }
        return item;
      });

      cart.items = updatedItems;

      const newcart = await saveCartItem(cart);

      return res.status(201).json({
        status: "success",
        message: "cart item updated ",
        newcart,
      });
    }

    return res.status(201).json({
      status: "error",
      message: "cart not found ",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error while deleting the item",
      errorMessage: error.message,
    });
  }
});

export default router;
