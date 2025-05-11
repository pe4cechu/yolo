"use client";
import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "/api";

// create product context
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);

  const fetchAllProducts = async () => {
    const api = await axios.get(`${API_BASE_URL}/products`);
    setProducts(api.data.product);
    setData(api.data.product);
    console.log("fetched all products = ", products);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  console.log("fetched all products = ", products);

  return (
    <ProductContext.Provider
      value={{
        products,
        data,
        setData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// custom Hook for context
export const useProductContext = () => useContext(ProductContext);

export default ProductContext;
