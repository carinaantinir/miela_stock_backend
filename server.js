require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./src/app.js");

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

// Conectar con MongoDB
const startServer = async () => {
    try {
        await mongoose.connect(MONGO_URI);

        console.log("MongoDB conectado correctamente");

        app.listen(PORT, () => {
            console.log(`Servidor funcionando en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Error al iniciar el servidor:", error.message);
        process.exit(1);
    }
};

startServer();