import { check } from "express-validator";
import validatorMiddleware from "../../middleware/validatorMiddleware.js";

const createProductValidator = [
  check("name")
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name length must be between 2 and 50")
    .matches(/^[A-Za-z0-9\s]+$/)
    .withMessage("Name must contain only letters, numbers and spaces"),
  check("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description length must be between 10 and 1000"),
  check("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number")
    .toFloat()
    .custom((value) => {
      if (value < 1 || value > 1000000) {
        throw new Error("Price must be between 1 and 1000000");
      }
      return true;
    }),
  check("quantity")
    .optional()
    .isNumeric()
    .withMessage("Quantity must be a number")
    .toInt()
    .custom((value) => {
      if (value < 0) {
        throw new Error("Quantity must be a positive number");
      }
      return true;
    }),
  validatorMiddleware,
];
const getProductValidator = [
  check("id").isMongoId().withMessage("Invalid Mongo Id"),
  validatorMiddleware,
];
const updateProductValidator = [
  check("name")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name length must be between 2 and 50")
    .matches(/^[A-Za-z0-9\s]+$/)
    .withMessage("Name must contain only letters, numbers and spaces"),
  check("description")
    .optional()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description length must be between 10 and 1000"),
  check("price")
    .optional()
    .isNumeric()
    .withMessage("Price must be a number")
    .toFloat()
    .custom((value) => {
      if (value < 1 || value > 1000000) {
        throw new Error("Price must be between 1 and 1000000");
      }
      return true;
    }),
  check("quantity")
    .optional()
    .isNumeric()
    .withMessage("Quantity must be a number")
    .toInt()
    .custom((value) => {
      if (value < 0) {
        throw new Error("Quantity must be a positive number");
      }
      return true;
    }),
  validatorMiddleware,
];
const deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid Mongo Id"),
  validatorMiddleware,
];

export {
  createProductValidator,
  getProductValidator,
  updateProductValidator,
  deleteProductValidator,
}