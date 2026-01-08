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
router.get(
  "/:roleId",
  authMiddleware,
  checkPermission("VIEW_ROLES"),
  getRoleById
);

router.put(
  "/:roleId/permissions",
  authMiddleware,
  checkPermission("UPDATE_ROLE"),
  updateRolePermissions
);

export default router;
