"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (!name || !email || !password) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (!isValidEmail(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Registration failed.");
                return;
            }

            toast.success("Registration successful!");
            setTimeout(() => {
                router.push("/dang_nhap");
            }, 2000); // Redirect after 2 seconds
        } catch {
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Toaster />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-poppins-semi-bold text-center mb-6 text-[#2E59BE]">
                    Register
                </h2>
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-poppins-medium mb-2"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            placeholder="Enter your name"
                        />
                    </div>
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
                        disabled={!name || !email || !password}
                        className={`w-full py-2 rounded-lg text-white font-poppins-bold transition ${
                            name && email && password
                                ? "bg-[#2E59BE] hover:bg-blue-600"
                                : "bg-gray-300 cursor-not-allowed"
                        }`}
                    >
                        Register
                    </button>
                </form>
                <p className="text-sm text-center mt-4">
                    Already have an account?{" "}
                    <span
                        onClick={() => router.push("/dang_nhap")}
                        className="text-[#2E59BE] cursor-pointer hover:underline"
                    >
                        Login here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
