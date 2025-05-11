"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      console.log("Sending login request:", { email, password });
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Invalid credentials.");
        setLoading(false);
        return;
      }

      // Store user details in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Login successful!");
      router.push("/"); // Immediate redirect
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Toaster />
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-poppins-semi-bold text-center mb-6 text-[#2E59BE]">
            Login
          </h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label
                  htmlFor="email"
                  className="block text-sm font-poppins-medium mb-2"
              >
                Email
              </label>
              <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                  htmlFor="password"
                  className="block text-sm font-poppins-medium mb-2"
              >
                Password
              </label>
              <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Enter your password"
              />
            </div>
            <button
                type="submit"
                disabled={!email || !password || loading}
                className={`w-full py-2 rounded-lg text-white font-poppins-bold transition ${
                    email && password && !loading
                        ? "bg-[#2E59BE] hover:bg-blue-600"
                        : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <span
                onClick={() => router.push("/dang_ky")}
                className="text-[#2E59BE] cursor-pointer hover:underline"
            >
            Register here
          </span>
          </p>
        </div>
      </div>
  );
};

export default LoginPage;
