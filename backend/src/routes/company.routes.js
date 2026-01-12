import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createCompany,
  getCompanies,
  updateCompany,
} from "../controllers/company.controller.js";
import checkPermission from "../middleware/permission.middleware.js";
import { validate } from "../middleware/validate.js";
import {
  createCompanySchema,
  updateCompanySchema,
} from "../validators/company.schema.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  checkPermission("CREATE_COMPANY"),
  validate(createCompanySchema),
  createCompany
);

router.get("/", authMiddleware, checkPermission("VIEW_COMPANY"), getCompanies);

router.put(
  "/:companyId",
  authMiddleware,
  checkPermission("UPDATE_COMPANY"),
  validate(updateCompanySchema),
  updateCompany
);

export default router;
