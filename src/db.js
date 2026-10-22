const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
    }  catch (error) {
        console.error("Error al conectar a la DB", error.massage)
        process.exit();
    }
};


module.exports = connectDB;