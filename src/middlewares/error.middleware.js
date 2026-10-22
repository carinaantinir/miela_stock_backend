const errorHandler = (err, req, res, next) => {
  console.error("Error en el servidor:", err);

  if (res.headersSent) {
    return next(err);
  }

  if (err.code === 11000) {
    return res.status(409).json({
      message: "El email ya está registrado"
    });
  }

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map(
      (error) => error.message
    );

    return res.status(400).json({
      message: "Error de validación",
      errors
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Identificador inválido"
    });
  }

  return res.status(500).json({
    message: "Error interno del servidor"
  });
};

module.exports = errorHandler;