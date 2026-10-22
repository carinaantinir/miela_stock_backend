const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
        name: {
        type: String,
        required: [true, "El nombre del producto es obligatorio"],
        trim: true,
        },

        category: { 
        type: String,
        required: [true, "La categoria es necesaria para el producto"],
        trim: true,
        enum:{
            values: ["Té", "Café", "Giff Card", "Complements"],
            message: "La categoria '{value}' incorrecta (Té, Café, Giff Card, Complements)"}
        },
        price: {
        type: Number,
        required: [true, "El precio es obligatorio"],
        min: [0, "El precio no puede ser negativo"],
        set: Math.round,
        },    
        stock: {
        type: Number,
        required: [true, "El stock es obligatorio"],
        min:[0, "El stock no puede ser negativo"],
        max: [15, "El stock supera el maximo permitido"],
        set: Math.round,
        },    
},
{     
timestamps: true,   
    },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
