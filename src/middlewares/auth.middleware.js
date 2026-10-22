
const jwt = require("jsonwebtoken");
const User = require("../models/user.models.js");

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (
      !authorization ||
      !authorization.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        message: "Se requiere autenticación"
      });
    }

    const token = authorization.slice(7).trim();

    if (!token) {
      return res.status(401).json({
        message: "Token no proporcionado"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      {
        algorithms: ["HS256"],
        issuer: "miela-stock"
      }
    );

    const user = await User.findById(decoded.sub)
      .select("_id role");

    if (!user) {
      return res.status(401).json({
        message: "La sesión ya no es válida"
      });
    }

    req.user = {
      id: user._id.toString(),
      role: user.role || "user"
    };

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError" ||
      error.name === "NotBeforeError"
    ) {
      return res.status(401).json({
        message: "Token inválido o vencido"
      });
    }

    next(error);
  }
};

const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      message: "Acceso reservado a administradores"
    });
  }

  next();
};

module.exports = {
  authenticate,
  requireAdmin
};
