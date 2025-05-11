import connectDB from "../../utils/database";
import Account from "../../models/Account";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function GET(req) {
    await connectDB();

    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
            { message: "Authorization token is required.", success: false },
            { status: 400 }
        );
    }

    const token = authHeader.split(" ")[1];
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        const email = payload.email;
        if (!email) {
            return NextResponse.json(
                { message: "Invalid token.", success: false },
                { status: 400 }
            );
        }

        const account = await Account.findOne({ email });
        if (!account) {
            return NextResponse.json(
                { message: "Account not found.", success: false },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { name: account.name, email: account.email, success: true },
            { status: 200 }
        );
    } catch (error) {
        console.error("Token verification failed:", error);
        return NextResponse.json(
            {message: "Invalid or expired token.", success: false},
            {status: 401}
        );
    }
}
