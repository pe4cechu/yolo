import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    overview: { type: String, require: true },
    description: { type: String, require: true },
    category: { type: String, require: true },
    price: { type: String, require: true },
    unit: { type: String, require: true },
    imgSrc: { type: String, require: true },
    other_images: { type: Array, require: true },
    link: { type: String, require: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
