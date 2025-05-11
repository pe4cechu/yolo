"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            router.push("/dang_nhap"); // Redirect to login page if not authenticated
        }
    }, [router]);

    return <>{children}</>;
};

export default ProtectedRoute;
