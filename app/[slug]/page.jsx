"use client";
import React, { useEffect, useState } from "react";
import { useProductContext } from "../context/ProductContext";
import Product from "../components/Product";

const Page = ({ params }) => {
  const { products } = useProductContext();
  const [productById, setProductById] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      const { slug } = await params; // Await params to resolve the Promise
      const filterProduct = products.find((p) => p._id === slug);

      if (filterProduct) {
        setProductById(filterProduct);
        const related = products.filter(
          (p) => p.category === filterProduct.category,
        );
        setRelatedProduct(related);
      }
    };

    fetchProduct();
  }, [params, products]);

  if (!productById) return <p className="text-center my-5">Không có sản phẩm phù hợp.</p>;

  return (
    <div className="text-gray-900">
      <div className="container mx-auto my-5">
        <div className="flex flex-col md:flex-row items-start">
          {/* Product Image */}
          <div className="md:w-1/2 flex flex-col justify-start items-center p-3">
            <img
              src={
                activeImageIndex === 0
                  ? productById.imgSrc
                  : productById.other_images[activeImageIndex - 1]
              }
              alt="img"
              className="w-[600px] h-[400px] object-cover rounded-lg"
            />
            <div className="flex justify-start items-center mt-4 space-x-2">
              <img
                src={productById.imgSrc}
                alt="Main"
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${
                  activeImageIndex === 0 ? "border-2 border-black" : ""
                }`}
                onClick={() => setActiveImageIndex(0)}
              />
              {productById.other_images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Other ${index + 1}`}
                  className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${
                    activeImageIndex === index + 1
                      ? "border-2 border-black"
                      : ""
                  }`}
                  onClick={() => setActiveImageIndex(index + 1)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 pt-16">
            <h1 className="text-5xl font-poppins-bold pb-6">
              {productById.title}
            </h1>
            <p className="mb-6 text-lg  ">{productById.overview}</p>
            <div className="mb-6">
              <span className="text-2xl font-poppins-light text-red-500">
                {Number(productById.price).toLocaleString("vi-VN")}₫ /{" "}
                {productById.unit}
              </span>
            </div>
            <div className="flex pb-11 space-x-4">
              <button
                className="group relative flex items-center bg-black text-white px-8 py-4 rounded-full font-poppins-bold hover:bg-[#28b14b] transition cursor-pointer overflow-hidden"
                style={{ minWidth: "185px", minHeight: "42px" }}
                onClick={() => (window.location.href = productById.link)}
              >
                <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                  Đến cửa hàng
                </span>
                <span className="absolute inset-0 flex items-center justify-center transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  Đến cửa hàng
                </span>
              </button>
            </div>

            {/* Product Description */}
            <div className="mt-8 p-4 border border-gray-300 rounded-lg bg-white">
              <h2 className="text-xl font-poppins-bold mb-3">Mô tả sản phẩm</h2>
              <div
                className="text-gray-700 font-poppins-light text-justify"
                dangerouslySetInnerHTML={{
                  __html: productById.description
                    .replace(/•/g, "<br />•") // Add line breaks before each bullet point
                    .split("\n") // Split by newline characters
                    .map(
                      (line) => `<p style="margin-bottom: 1.5rem;">${line}</p>`,
                    ) // Add vertical spacing
                    .join(""), // Join the segments back into a single string
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <h1 className="text-center text-2xl font-poppins-extra-bold my-5">
        Sản phẩm liên quan
      </h1>
      <Product items={relatedProduct} />
    </div>
  );
};

export default Page;
