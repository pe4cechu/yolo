"use client";
import React from "react";
import Link from "next/link";
import { ToastContainer, toast, Bounce } from "react-toastify";

import { useProductContext } from "../context/ProductContext";

const Product = ({ items }) => {
  if (items.length === 0)
    return (
      <h1 className="text-center my-5" style={{ marginTop: "15rem" }}>
          Không có sản phẩm phù hợp.
      </h1>
    );

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {items.map((product) => (
            <div
              key={product._id}
              className="text-center flex justify-center items-center"
            >
              <div
                className="card bg-dark text-light"
                style={{ width: "18rem" }}
              >
                <Link href={`/${product._id}`}>
                  <div className="flex justify-center items-center">
                    <img
                      src={product.imgSrc}
                      alt="img"
                      className="w-64 h-64 object-cover rounded-lg"
                    />
                  </div>
                </Link>
                <div className="card-body text-[#212121]">
                  <h5 className="card-title font-poppins-bold text-lg">
                    {product.title}
                  </h5>
                  <p className="card-text font-poppins-light">
                    {product.overview}
                  </p>
                  <button className="btn btn-primary font-poppins-light text-xl text-red-500">
                    {Number(product.price).toLocaleString("vi-VN")}₫
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
