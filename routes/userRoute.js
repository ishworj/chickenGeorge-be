import express from "express";
import { compareText, encryptText } from "../utils/bcrypt.js";
import { createUser, getUserByEmail } from "../Models/user/userModel.js";
import { jwtSign } from "../utils/jwt.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email } = req.body;
    let { password } = req.body;
    password = await encryptText(password);

    await createUser({
      username,
      email,
      password,
    });

    res.status(201).json({
      status: "success",
      message: "user created successfully",
    });
  } catch (error) {
    if (error?.message.includes("E11000")) {
      res.status(400).json({
        status: "error",
        message: "User already exists !!!",
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Error while creating the user",
      });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await getUserByEmail(email);

    if (userData) {
      const loginSuccess = await compareText(password, userData.password);
      if (loginSuccess) {
        const accesToken = await jwtSign({ email: userData.email });

        res.status(200).json({
          status: "error",
          message: "user loggedin succesfully ",
          accesToken,
        });
      } else {
        return res.status(403).json({
          status: "error",
          message: "credintials not matched",
        });
      }
    } else {
      return res.status(404).json({
        status: "error",
        message: "login error",
      });
    }
  } catch (error) {
     return res.status(500).json({
       status: "error",
       message: "login error",
     });
  }
});
export default router;
