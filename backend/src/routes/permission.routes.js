import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import checkPermission from "../middleware/permission.middleware.js";
import { getPermissions } from "../controllers/permission.controller.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  checkPermission("UPDATE_ROLE"),
  getPermissions
);

export default router;
