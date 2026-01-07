import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import checkPermission from "../middleware/permission.middleware.js";
import {
  createUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import { validate } from "../middleware/validate.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../validators/user.schema.js";

const router = express.Router();

router.get("/", authMiddleware, checkPermission("VIEW_USERS"), getUsers);
router.post(
  "/",
  authMiddleware,
  checkPermission("CREATE_USER"),
  validate(createUserSchema),
  createUser
);
router.put(
  "/:userId",
  authMiddleware,
  checkPermission("UPDATE_USER"),
  validate(updateUserSchema),
  updateUser
);

export default router;
