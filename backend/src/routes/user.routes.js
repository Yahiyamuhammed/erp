import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import checkPermission from "../middleware/permission.middleware.js";
import { createUser, getUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  checkPermission("CREATE_USER"),
  createUser
);
router.get(
  "/",
  authMiddleware,
  checkPermission("VIEW_USERS"),
  getUsers
);


export default router;
