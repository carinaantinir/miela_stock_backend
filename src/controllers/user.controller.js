
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require("../service/user.service.js");

const handleUserError = (error, res, next) => {
  if (error.code === 11000) {
    return res.status(409).json({
      message: "El email ya está registrado"
    });
  }

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

const controllerRegisterUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser({
      name,
      email,
      password
    });

    return res.status(201).json({
      message: "Usuario registrado correctamente",
      user
    });
  } catch (error) {
    return handleUserError(error, res, next);
  }
};

const controllerLoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);

    if (!user) {
      return res.status(401).json({
        message: "Credenciales inválidas"
      });
    }

    const token = jwt.sign(
      {},
      process.env.JWT_SECRET,
      {
        subject: user.id.toString(),
        expiresIn: "1h",
        algorithm: "HS256",
        issuer: "miela-stock"
      }
    );

    return res.status(200).json({
      message: "Inicio de sesión correcto",
      token,
      tokenType: "Bearer",
      user
    });
  } catch (error) {
    next(error);
  }
};

const controllerGetUsers = async (req, res, next) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const controllerGetUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "ID de usuario inválido"
      });
    }

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado"
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const controllerUpdateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "ID de usuario inválido"
      });
    }

    const { name, email, password } = req.body;

    if (
      name === undefined &&
      email === undefined &&
      password === undefined
    ) {
      return res.status(400).json({
        message: "Debés enviar al menos un campo para actualizar"
      });
    }

    const user = await updateUser(id, {
      name,
      email,
      password
    });

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado"
      });
    }

    return res.status(200).json({
      message: "Usuario actualizado correctamente",
      user
    });
  } catch (error) {
    return handleUserError(error, res, next);
  }
};

const controllerDeleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "ID de usuario inválido"
      });
    }

    if (id === req.user.id) {
      return res.status(403).json({
        message: "No podés eliminar tu propia cuenta administradora"
      });
    }

    const user = await deleteUser(id);

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado"
      });
    }

    return res.status(200).json({
      message: "Usuario eliminado correctamente"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  controllerRegisterUser,
  controllerLoginUser,
  controllerGetUsers,
  controllerGetUserById,
  controllerUpdateUser,
  controllerDeleteUser
};
