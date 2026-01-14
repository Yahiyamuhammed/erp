export const companyContext = (req, res, next) => {
  // Super admin must explicitly choose a company
  if (req.user.isSuperAdmin) {
    const companyId = req.query.companyId;

    if (!companyId) {
      return res.status(400).json({
        message: "Company context is required",
      });
    }

    req.companyId = companyId;
    return next();
  }

  // Normal users
  if (!req.user.companyId) {
    return res.status(403).json({
      message: "User is not assigned to a company",
    });
  }

  req.companyId = req.user.companyId;
  next();
};
