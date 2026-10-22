
const express = require("express");
const router = express.Router();

const {
  controllerCreateProduct,
  controllerGetProducts,
  controllerGetProductById,
  controllerUpdataProduct,
  controllerDeleteProduct
} = require("../controllers/product.controller.js");

const {
  authenticate,
  requireAdmin
} = require("../middlewares/auth.middleware.js");

router.use(authenticate);


router.get("/", controllerGetProducts);
router.get("/:id", controllerGetProductById);


router.post("/", requireAdmin, controllerCreateProduct);
router.put("/:id", requireAdmin, controllerUpdataProduct);
router.delete("/:id", requireAdmin, controllerDeleteProduct);

module.exports = router;
