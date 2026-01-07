import express from "express";
import { login, me } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("get",req);
  res.status(200).json({
    message: "GET request working"
  });
});

router.post("/login", login);
router.get("/me", authMiddleware, me);


export default router;
