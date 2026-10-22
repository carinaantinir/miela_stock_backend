
const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const {
  controllerRegisterUser,
  controllerLoginUser,
  controllerGetUsers,
  controllerGetUserById,
  controllerUpdateUser,
  controllerDeleteUser
} = require("../controllers/user.controller.js");

const validate = require("../middlewares/validate.middleware.js");

const {
  authenticate,
  requireAdmin
} = require("../middlewares/auth.middleware.js");

const registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("El email no es válido")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
];

const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("El email no es válido")
    .normalizeEmail(),

  body("password")
    .isString()
    .withMessage("La contraseña es obligatoria")
    .bail()
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
];

const updateValidation = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),

  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El email no puede estar vacío")
    .bail()
    .isEmail()
    .withMessage("El email no es válido")
    .normalizeEmail(),

  body("password")
    .optional()
    .notEmpty()
    .withMessage("La contraseña no puede estar vacía")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
];

router.post(
  "/register",
  registerValidation,
  validate,
  controllerRegisterUser
);

router.post(
  "/login",
  loginValidation,
  validate,
  controllerLoginUser
);

router.use(authenticate, requireAdmin);

router.get("/", controllerGetUsers);
router.get("/:id", controllerGetUserById);

router.put(
  "/:id",
  updateValidation,
  validate,
  controllerUpdateUser
);

router.delete("/:id", controllerDeleteUser);

module.exports = router;
