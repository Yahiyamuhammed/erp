import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import checkPermission from "../middleware/permission.middleware.js";
import { getRoles } from "../controllers/role.controller.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  checkPermission("VIEW_ROLES"),
  getRoles
);

export default router;
