import Company from "../models/Company.js";

export const createCompany = async (req, res) => {
  const { name, code, gstNo } = req.body;

  const existingCompany = await Company.findOne({ code });
  if (existingCompany) {
    return res.status(400).json({ message: "Company code already exists" });
  }

  const company = await Company.create({
    name,
    code,
    gstNo: gstNo || null,
  });

  res.status(201).json({
    message: "Company created successfully",
  });
};

export const getCompanies = async (req, res) => {
  const companies = await Company.find().select(
    "name code gstNo isActive createdAt"
  );

  res.json(companies);
};

export const updateCompany = async (req, res) => {
  const { companyId } = req.params;
  const { name, code, gstNo, isActive } = req.body;

  const company = await Company.findById(companyId);
  if (!company) {
    return res.status(404).json({
      message: "Company not found",
    });
  }

  // Company code uniqueness check (excluding self)
  if (code && code !== company.code) {
    const codeExists = await Company.findOne({
      code,
      _id: { $ne: companyId },
    });

    if (codeExists) {
      return res.status(400).json({
        message: "Company code already exists",
      });
    }

    company.code = code;
  }

  if (name) company.name = name;
  if (gstNo !== undefined) company.gstNo = gstNo;
  if (isActive !== undefined) company.isActive = isActive;

  await company.save();

  return res.status(200).json({
    message: "Company updated successfully",
  });
};
