import Account from "../models/Account";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Create account
export const createAccount = async (req) => {
    const body = await req.json();
    const { name, email, password } = body;

    // Check if email already exists
    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
        return NextResponse.json(
            {
                message: "Email already exists!",
                success: false,
            },
            { status: 400 } // Explicitly set the status code to 400
        );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new account
    const newAccount = await Account.create({
        name,
        email,
        password: hashedPassword,
    });

    return NextResponse.json(
        {
            message: "Account created successfully!",
            success: true,
            newAccount,
        },
        { status: 201 } // Explicitly set the status code to 201 for success
    );
};
