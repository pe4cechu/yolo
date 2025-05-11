import connectDB from "../../utils/database";
import Account from "../../models/Account";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    await connectDB();

    const { email, password } = await req.json();

    // Check if the account exists
    const account = await Account.findOne({ email });
    if (!account) {
        return NextResponse.json(
            { message: "Invalid email or password.", success: false },
            { status: 401 }
        );
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
        return NextResponse.json(
            { message: "Invalid email or password.", success: false },
            { status: 401 }
        );
    }

    // Return success response with user details
    return NextResponse.json(
        {
            message: "Login successful!",
            success: true,
            user: { name: account.name, email: account.email }
        },
        { status: 200 }
    );
}
