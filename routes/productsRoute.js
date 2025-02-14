import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  handleProductImage,
  updateProduct,
  uploadProductImages
} from "../controllers/products.js";
import { createProductValidator, deleteProductValidator, getProductValidator, updateProductValidator } from "../utils/validation/productsValidation.js";
import { allowedTo, checkActive, protectRoutes } from "../controllers/auth.js";

const productsRoute = Router();

productsRoute
  .route("/")
  .get(getProducts)
  .post(
    protectRoutes,
    checkActive,
    allowedTo("manager"),
    uploadProductImages,
    handleProductImage,
    createProductValidator,
    createProduct);

productsRoute
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(
    protectRoutes,
    checkActive,
    allowedTo("manager"),
    uploadProductImages,
    handleProductImage,
    updateProductValidator,
    updateProduct)
  .delete(
    protectRoutes,
    checkActive,
    allowedTo("manager"),
    deleteProductValidator,
    deleteProduct);

export default productsRoute;