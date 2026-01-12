export const companyContext = (req, res, next) => {
  if (req.user.isSuperAdmin) {
    return next();
  }

  if (!req.user.companyId) {
    return res.status(403).json({
      message: "User is not assigned to a company",
    });
  }

  req.companyId = req.user.companyId;
  next();
};
