const mongoose = require("mongoose");
const productService = require("../service/product.service.js");

const controllerCreateProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body)
        return res.status(201).json(product);
    }   catch (error) {
            console.log("Error al crear producto", error); 
        return res.status(400).json({message: error.message});
    }
};


const controllerGetProducts = async (req, res) => {
    try {
        const products = await productService.getProducts();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });    
    }
};

const controllerGetProductById = async (req, res) => {
    try {
        const id = req.params.id.trim();

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "ID de producto inválido"
            });
        }

        const product = await productService.getProductById(id);

        if (!product) {
            return res.status(404).json({
                message: "Producto no encontrado"
            });
        }

        return res.status(200).json(product);

    } catch (error) {
        console.error("Error al buscar producto:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};











const controllerUpdataProduct = async (req, res) => {
    try {
            const product = await productService.updateProduct(
                req.params.id,
                req.body    
            );
    
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado"})
        }

        return res.status(200).json(product);
    }   catch (error) {
        return res.status(400).json({ message: error.message });    
    }
};

const controllerDeleteProduct = async (req, res) => {
    try {
            const product = await productService.deleteProduct(req.params.id)

            if (!product) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }
        
            return res.status(200).json({
                message: "Producto eliminado correctamente"
            });
    }   catch (error) {
        return res.status(500).json({ message: error.message });
    }  
};
        



module.exports = { controllerCreateProduct, controllerGetProducts, controllerGetProductById, controllerUpdataProduct, controllerDeleteProduct };