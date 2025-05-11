"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "/api";

// create account context
const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAccountDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/account`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setAccount(response.data);
        } catch (err) {
            console.error("Error fetching account details:", err);
            setError(err.response?.data?.message || "Failed to fetch account details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAccountDetails();
    }, []);

    return (
        <AccountContext.Provider
            value={{
                account,
                loading,
                error,
                fetchAccountDetails,
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

// custom Hook for context
export const useAccountContext = () => useContext(AccountContext);

export default AccountContext;
