"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import logo from "@/app/public/icons/logo.svg";
import search from "@/app/public/icons/search.svg";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [searchTerm, setsearchTerm] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const searchBarRef = useRef(null); // Ref for the search bar

  const handleSumbit = (e) => {
    e.preventDefault();
    const encodedSearchTerm = encodeURIComponent(searchTerm); // Encode the search term
    router.push(`/search/${encodedSearchTerm}`);
    setsearchTerm("");
  };

  // Close search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setShowSearchBar(false);
      }
    };

    if (showSearchBar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearchBar]);

  return (
    <nav className="bg-white sticky top-0 shadow-md">
      <div className="flex items-center w-full">
        {/* Logo */}
        <div className="pl-5">
          <Link href="/">
            <img src={logo.src} alt="Logo" className="w-30 h-19" />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex text-[17px] font-poppins-medium space-x-14 justify-center flex-grow text-[#212121]">
          <li>
            <Link href="/san_pham">Sản phẩm</Link>
          </li>
          <li>
            <Link href="/thong_tin">Thông tin</Link>
          </li>
          <li>
            <Link href="/ve_greenly">Về Greenly</Link>
          </li>
        </ul>

        {/* Search Section */}
        <div className="ml-auto pr-14">
          {!showSearchBar ? (
            // Show search icon when search bar is hidden
            <img
              src={search.src}
              alt="Search"
              className="w-5 h-5 cursor-pointer"
              onClick={() => setShowSearchBar(true)} // Show search bar on click
            />
          ) : (
            // Show search bar when visible
            <form onSubmit={handleSumbit} className="flex" ref={searchBarRef}>
              <div className="flex justify-end">
                <input
                  value={searchTerm}
                  onChange={(e) => setsearchTerm(e.target.value)}
                  type="text"
                  className="text-black py-2 pl-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Tìm kiếm sản phẩm..."
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
