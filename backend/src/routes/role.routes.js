import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { companyContext } from "../middleware/company.middleware.js";
import checkPermission from "../middleware/permission.middleware.js";
import {
  getRoleById,
  getRoles,
  updateRolePermissions,
} from "../controllers/role.controller.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  companyContext,
  checkPermission("VIEW_ROLES"),
  getRoles
);

router.get(
  "/:roleId",
  authMiddleware,
  companyContext,
  checkPermission("VIEW_ROLES"),
  getRoleById
);

router.put(
  "/:roleId/permissions",
  authMiddleware,
  companyContext,
  checkPermission("UPDATE_ROLE"),
  updateRolePermissions
);

export default router;
