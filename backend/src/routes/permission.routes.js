import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import checkPermission from "../middleware/permission.middleware.js";
import { getPermissions } from "../controllers/permission.controller.js";
import { companyContext } from "../middleware/company.middleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  companyContext,
  checkPermission("UPDATE_ROLE"),
  getPermissions
);

export default router;
