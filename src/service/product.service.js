
const Product = require("../models/product.models");


const createProduct = (data) => {
    return Product.create(data);
}

const getProducts = () => {
    return Product.find();
};

const getProductById = (id) => {
    return Product.findById(id)
};

const updateProduct = (id, data) => {
    return Product.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });
};

const deleteProduct = (id) => {
    return Product.findByIdAndDelete(id);
};


module.exports = { createProduct, getProducts, getProductById,
    updateProduct, deleteProduct };