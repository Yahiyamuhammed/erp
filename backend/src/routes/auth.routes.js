import express from "express";
import { login } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("get",req);
  res.status(200).json({
    message: "GET request working"
  });
});router.post("/login", login);

export default router;
