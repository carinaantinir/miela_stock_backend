
const express = require("express");
const Client = require("../models/client.models.js");
const createRecordsController = require("../controllers/records.controller.js");

const {
  authenticate,
  requireAdmin
} = require("../middlewares/auth.middleware.js");

const router = express.Router();

const controller = createRecordsController(
  Client,
  ["name", "email", "phone"]
);

router.use(authenticate, requireAdmin);

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
