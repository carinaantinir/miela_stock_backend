
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const productRouters = require("./routes/product.routes.js");
const userRoutes = require("./routes/user.routes.js");
const clientRoutes = require("./routes/client.routes.js");
const supplierRoutes = require("./routes/supplier.routes.js");

const app = express();

app.use(cors());
app.use(express.json({ limit: "100kb" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Demasiadas solicitudes. Intentá nuevamente más tarde."
  }
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    message: "Demasiados intentos de inicio de sesión. Intentá más tarde."
  }
});

app.use("/users/register", limiter);
app.use("/users/login", loginLimiter);

app.use("/users", userRoutes);
app.use("/api/products", productRouters);
app.use("/api/clients", clientRoutes);
app.use("/api/suppliers", supplierRoutes);

app.use((req, res) => {
  return res.status(404).json({
    message: "Ruta no encontrada"
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  if (res.headersSent) {
    return next(error);
  }

  return res.status(500).json({
    message: "Error interno del servidor"
  });
});

module.exports = app;
