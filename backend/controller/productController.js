import Product from "../models/productModel.js";
import HandleError from '../utils/handleError.js';
import handleAsyncError from '../middleware/handleAsyncError.js';
import APIFunctionality from "../utils/apiFunctionality.js";

// http://localhost:8000/api/v1/product/6a74614950a18cf054f65717?keyword=shirt

// 1️⃣Creating Products

export const createProducts = handleAsyncError(async (req,res,next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// 2️⃣Get all Products

export const getAllProducts =handleAsyncError( async (req,res,next) => {
  
  const resultsPerPage=3;
  const apiFeatures = new APIFunctionality(Product.find(),req.query).search().filter();

  // Getting filtered query before pagination
  const filteredQuery=apiFeatures.query.clone();
  const productCount=await filteredQuery.countDocuments();
  
  // Calculate total pages based on filtered count
  const totalPages=Math.ceil(productCount/resultsPerPage)
  console.log(totalPages);
  

  const products = await apiFeatures.query
  res.status(200).json({
    success: true,
    products,
    productCount,
    totalPages
  });
});

// 3️⃣Update Product
export const updateProduct = handleAsyncError(async (req,res,next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(new HandleError("Product Not Fount", 404))
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// 4️⃣Delete Product
export const deleteProduct = handleAsyncError(async (req,res,next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new HandleError("Product Not Fount", 404))
  }
  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

// 4️⃣Accessing Single Product
export const getSingleProduct = handleAsyncError(async (req,res,next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product Not Found",
    });
  }
  res.status(200).json({
    success: true,
    product,
  });
});
