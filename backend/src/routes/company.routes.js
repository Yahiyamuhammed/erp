import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import checkPermission from "../middlewares/checkPermission.js";
import validate from "../middlewares/validate.js";
import {
  createCompany,
  getCompanies,
  updateCompany,
} from "../controllers/company.controller.js";
import {
  createCompanySchema,
  updateCompanySchema,
} from "../validations/company.schema.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  checkPermission("CREATE_COMPANY"),
  validate(createCompanySchema),
  createCompany
);

router.get(
  "/",
  authMiddleware,
  checkPermission("VIEW_COMPANY"),
  getCompanies
);

router.put(
  "/:companyId",
  authMiddleware,
  checkPermission("UPDATE_COMPANY"),
  validate(updateCompanySchema),
  updateCompany
);

export default router;
