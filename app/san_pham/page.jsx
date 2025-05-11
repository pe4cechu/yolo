"use client";
import React, { useState } from "react";
import Product from "../components/Product";
import { useProductContext } from "../context/ProductContext";

const page = () => {
  const { products, data, setData } = useProductContext();
  const [activeCategory, setActiveCategory] = useState(null);
  const [activePriceRange, setActivePriceRange] = useState(null);

  const applyFilters = (category, priceRange) => {
    let filteredProducts = products;

    if (category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === category,
      );
    }

    if (priceRange) {
      const [min, max] = priceRange;
      filteredProducts = filteredProducts.filter(
        (p) => p.price >= min && p.price <= max,
      );
    }

    setData(filteredProducts);
  };

  const filterByCategory = (category) => {
    const newCategory = activeCategory === category ? null : category;
    setActiveCategory(newCategory);
    applyFilters(newCategory, activePriceRange);
  };

  const filterByPriceRange = (range) => {
    const isSameRange =
      activePriceRange &&
      activePriceRange[0] === range[0] &&
      activePriceRange[1] === range[1];

    const newRange = isSameRange ? null : range;
    setActivePriceRange(newRange);
    applyFilters(activeCategory, newRange);
  };

  return (
    <div>
      {/* Filter system */}
      <div className="container mx-auto my-8 px-4">
        <div className="bg-white text-black p-6 rounded-xl border border-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category filters */}
            <div className="flex flex-wrap items-center gap-2">
              <strong className={"font-poppins-extra-bold pr-4"}>
                Danh mục:
              </strong>
              <button
                onClick={() => filterByCategory("vegetable")}
                className={`px-3 py-1 rounded-full cursor-pointer ${
                  activeCategory === "vegetable"
                    ? "text-green-500 bg-green-100"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                Rau củ
              </button>
              <button
                onClick={() => filterByCategory("fruit")}
                className={`px-3 py-1 rounded-full cursor-pointer ${
                  activeCategory === "fruit"
                    ? "text-green-500 bg-green-100"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                Trái cây
              </button>
              <button
                onClick={() => filterByCategory("processed")}
                className={`px-3 py-1 rounded-full cursor-pointer ${
                  activeCategory === "processed"
                    ? "text-green-500 bg-green-100"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                Sản phẩm thực vật
              </button>
            </div>
            {/* Price filters */}
            <div className="flex flex-wrap items-center gap-2 justify-end">
              <strong className={"font-poppins-extra-bold pr-4"}>Giá:</strong>
              <button
                onClick={() => filterByPriceRange([0, 49999])}
                className={`px-3 py-1 rounded-full cursor-pointer ${
                  activePriceRange?.[0] === 0 && activePriceRange?.[1] === 49999
                    ? "text-green-500 bg-green-100"
                    : "bg-yellow-100 text-black hover:bg-yellow-200"
                }`}
              >
                {"<"} 50.000
              </button>
              <button
                onClick={() => filterByPriceRange([50000, 99999])}
                className={`px-3 py-1 rounded-full cursor-pointer ${
                  activePriceRange?.[0] === 50000 &&
                  activePriceRange?.[1] === 99999
                    ? "text-green-500 bg-green-100"
                    : "bg-yellow-100 text-black hover:bg-yellow-200"
                }`}
              >
                50.000 - 100.000
              </button>
              <button
                onClick={() => filterByPriceRange([100000, 149999])}
                className={`px-3 py-1 rounded-full cursor-pointer ${
                  activePriceRange?.[0] === 100000 &&
                  activePriceRange?.[1] === 149999
                    ? "text-green-500 bg-green-100"
                    : "bg-yellow-100 text-black hover:bg-yellow-200"
                }`}
              >
                100.000 - 150.000
              </button>
              <button
                onClick={() => filterByPriceRange([150001, Infinity])}
                className={`px-3 py-1 rounded-full cursor-pointer ${
                  activePriceRange?.[0] === 150001 &&
                  activePriceRange?.[1] === Infinity
                    ? "text-green-500 bg-green-100"
                    : "bg-yellow-100 text-black hover:bg-yellow-200"
                }`}
              >
                {">"} 150.000
              </button>
            </div>
          </div>
        </div>
      </div>
      <Product items={data} />
    </div>
  );
};

export default page;
