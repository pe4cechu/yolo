import connectDB from "../../utils/database";
import Account from "../models/Account";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDB();
    const { email } = await req.json();

    const existingAccount = await Account.findOne({ email });
    return NextResponse.json({ exists: !!existingAccount });
}
