
const mongoose = require("mongoose");

const createRecordsController = (Model, allowedFields) => {
  const pickFields = (body) =>
    Object.fromEntries(
      allowedFields
        .filter((field) =>
          Object.prototype.hasOwnProperty.call(body, field)
        )
        .map((field) => [field, body[field]])
    );

  const handleError = (error, res, next) => {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Error de validación",
        errors: Object.values(error.errors).map(
          (item) => item.message
        )
      });
    }

    next(error);
  };

  const getAll = async (req, res, next) => {
    try {
      const records = await Model.find()
        .sort({ createdAt: -1 })
        .lean();

      return res.status(200).json(records);
    } catch (error) {
      next(error);
    }
  };

  const getById = async (req, res, next) => {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({
          message: "ID inválido"
        });
      }

      const record = await Model.findById(req.params.id).lean();

      if (!record) {
        return res.status(404).json({
          message: "Registro no encontrado"
        });
      }

      return res.status(200).json(record);
    } catch (error) {
      next(error);
    }
  };

  const create = async (req, res, next) => {
    try {
      const data = pickFields(req.body);
      const record = await Model.create(data);

      return res.status(201).json({
        message: "Registro creado correctamente",
        record
      });
    } catch (error) {
      return handleError(error, res, next);
    }
  };

  const update = async (req, res, next) => {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({
          message: "ID inválido"
        });
      }

      const data = pickFields(req.body);

      if (Object.keys(data).length === 0) {
        return res.status(400).json({
          message: "No se enviaron campos para actualizar"
        });
      }

      const record = await Model.findByIdAndUpdate(
        req.params.id,
        { $set: data },
        {
          new: true,
          runValidators: true
        }
      );

      if (!record) {
        return res.status(404).json({
          message: "Registro no encontrado"
        });
      }

      return res.status(200).json({
        message: "Registro actualizado correctamente",
        record
      });
    } catch (error) {
      return handleError(error, res, next);
    }
  };

  const remove = async (req, res, next) => {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({
          message: "ID inválido"
        });
      }

      const record = await Model.findByIdAndDelete(req.params.id);

      if (!record) {
        return res.status(404).json({
          message: "Registro no encontrado"
        });
      }

      return res.status(200).json({
        message: "Registro eliminado correctamente"
      });
    } catch (error) {
      next(error);
    }
  };

  return {
    getAll,
    getById,
    create,
    update,
    remove
  };
};

module.exports = createRecordsController;
