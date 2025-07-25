export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user?.role;

      if (!userRole) {
        return res.status(401).json({
          success: false,
          message: "User role not found in request",
        });
      }

      if (!roles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: `Access denied: Role (${userRole}) is not authorized`,
        });
      }

      next();
    } catch (error) {
      console.error("Authorization error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error during role authorization",
      });
    }
  };
};
