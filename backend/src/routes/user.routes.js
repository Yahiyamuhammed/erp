import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import checkPermission from "../middleware/permission.middleware.js";
import { createUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  checkPermission("CREATE_USER"),
  createUser
);

export default router;
