import { Schema, model } from "mongoose";

const productsSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1000,
    },
    price: { type: Number, required: true, min: 1, max: 1000000 },
    quantity: { type: Number, default: 0, min: 0, max: 1000 },
    sold: { type: Number, default: 0 },
    coverImage: { type: String },
    images: [String],
  },
  { timestamps: true}
);

export default model("products", productsSchema);
