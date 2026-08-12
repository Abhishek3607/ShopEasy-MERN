import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";

// http://localhost:8000/api/v1/product/6a74614950a18cf054f65717?keyword=shirt

// 1️⃣Creating Products

export const createProducts = handleAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// 2️⃣Get all Products

export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const resultsPerPage = 3;
  const apiFeatures = new APIFunctionality(Product.find(), req.query)
    .search()
    .filter();

  // Getting filtered query before pagination
  const filteredQuery = apiFeatures.query.clone();
  const productCount = await filteredQuery.countDocuments();

  // Calculate total pages based on filtered count
  const totalPages = Math.ceil(productCount / resultsPerPage);
  const page = Number(req.query.page) || 1;

  if (page > totalPages && productCount > 0) {
    return next(new HandleError("This page doesn't exists", 404));
  }

  // Apply pagination
  apiFeatures.pagination(resultsPerPage);
  const products = await apiFeatures.query;

  if (!products || products.length === 0) {
    return next(new HandleError("No Product Found", 404));
  }

  res.status(200).json({
    success: true,
    products,
    productCount,
    resultsPerPage,
    totalPages,
    currentPage: page,
  });
});

// 3️⃣Update Product
export const updateProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(new HandleError("Product Not Fount", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// 4️⃣Delete Product
export const deleteProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new HandleError("Product Not Fount", 404));
  }
  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

// 5.Accessing Single Product
export const getSingleProduct = handleAsyncError(async (req, res, next) => {
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

// 6. Creating and Updating review
export const createReviewForProduct = handleAsyncError(
  async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    const product = await Product.findById(productId);
    const reviewExists = product.reviews.find(
      (review) => review.user.toString() === req.user.id.toString(),
    );
    if (reviewExists) {
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user.id.toString()) {
          ((review.rating = rating), (review.comment = comment));
        }
      });
    } else {
      product.reviews.push(review);
    }
    product.numOfReviews = product.reviews.length;
    let sum = 0;
    product.reviews.forEach((review) => {
      sum += review.rating;
    });
    product.ratings =
      product.reviews.length > 0 ? sum / product.reviews.length : 0;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      product,
    });
  },
);

// 7.Admin - Getting all products
export const getAdminProducts = handleAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});
