
require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../src/models/user.models.js");

const makeAdmin = async () => {
  const email = process.argv[2]?.trim().toLowerCase();

  if (!email || !process.env.MONGO_URI) {
    throw new Error("Indicá un email y configurá MONGO_URI");
  }

  await mongoose.connect(process.env.MONGO_URI);

  const user = await User.findOneAndUpdate(
    { email },
    { $set: { role: "admin" } },
    { new: true }
  );

  if (!user) {
    throw new Error(
      "No existe un usuario con ese email. Registralo primero."
    );
  }

  console.log("Administrador habilitado:", user.email);
};

makeAdmin()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
