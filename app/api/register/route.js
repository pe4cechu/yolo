import connectDB from "../../utils/database";
import { createAccount } from "@/app/controllers/register";

// http://localhost:3001/api/products
export async function POST(req) {
  await connectDB();
  return createAccount(req);
}

// http://localhost:3001/api/products
export async function GET(req) {
  await connectDB();
  return getProducts();
}
