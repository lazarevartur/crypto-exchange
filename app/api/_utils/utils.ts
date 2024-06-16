// utils/auth.ts
import { NextRequest, NextResponse } from "next/server";
import { verify, JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET || "your-secret-key";

export const authenticateUser = (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return { user: null, error: NextResponse.json({ message: "Authentication required" }, { status: 401 }) };
  }

  try {
    const decodedToken = verify(token, secret) as JwtPayload;
    return { userId: decodedToken.userId, error: null };
  } catch (err) {
    return { user: null, error: NextResponse.json({ message: "Invalid token" }, { status: 403 }) };
  }
};

export const authorizeAdmin = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.role !== 'ADMIN') {
    return { user: null, error: NextResponse.json({ message: "Forbidden: You do not have permission to perform this action" }, { status: 403 }) };
  }

  return { user, error: null };
};