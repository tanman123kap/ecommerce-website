import {v2 as cloudinary} from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
    try {
        const {name, description, price, category, subCategory, sizes, bestseller} = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
        const imagesURL = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: "image", folder: "StellaProducts"});
                return result.secure_url;
            })
        );
        const productData = {
            name,
            description,
            price: Number(price),
            image: imagesURL,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true : false,
            date: Date.now()
        };
        const product = new productModel(productData);
        await product.save();
        res.json({success: true, message: "Product Added!"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({success: true, products});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Product Removed!"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}
const singleProduct = async (req, res) => {
    try {
        const {productID} = req.body;
        const product = await productModel.findById(productID);
        console.log('Product ID:', productID);
        res.json({success: true, product});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export {addProduct, listProduct, removeProduct, singleProduct};