// utils/auth.ts
import { NextRequest, NextResponse } from "next/server";
import { verify, JwtPayload, sign } from "jsonwebtoken";
import { serialize } from "cookie";
import prisma from "@/app/api/_lib/db";

const secret = process.env.JWT_SECRET || "your-secret-key";

export const authenticateUser = (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return {
      userId: null,
      error: NextResponse.json(
        { message: "Authentication required" },
        { status: 401 },
      ),
    };
  }

  try {
    const decodedToken = verify(token, secret) as JwtPayload;
    return { userId: decodedToken.userId, error: null };
  } catch (err) {
    return {
      userId: null,
      error: NextResponse.json({ message: "Invalid token" }, { status: 403 }),
    };
  }
};

export const authorizeAdmin = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.role !== "ADMIN") {
    return {
      user: null,
      error: NextResponse.json(
        {
          message:
            "Forbidden: You do not have permission to perform this action",
        },
        { status: 403 },
      ),
    };
  }

  return { user, error: null };
};

// utils/validateEthereumAddress.ts
export function validateEthereumAddress(address: string): boolean {
  // Проверка длины адреса
  if (address.length !== 42) return false;

  // Проверка формата адреса (должен начинаться с '0x')
  if (!address.startsWith("0x")) return false;

  // Проверка символов адреса (допустимы только цифры и буквы a-f)
  const re = /^0x[0-9a-fA-F]{40}$/;
  return re.test(address);
}

export const generateAndSetCookieToken = (
  response: NextResponse<{ userId: string }>,
  payload: any,
) => {
  const token = sign(payload, secret, {
    expiresIn: "1d",
  });

  response.headers.append(
    "Set-Cookie",
    serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    }),
  );
};

export function calculateExchangeAmount({
  amount,
  sourceToUsdRate,
  targetToUsdRate,
  commissionRate,
}: {
  amount: number;
  sourceToUsdRate: number;
  targetToUsdRate: number;
  commissionRate?: number;
}) {
  const totalUsd = amount * sourceToUsdRate;

  let commission = 0;
  if (commissionRate) {
    commission = totalUsd * commissionRate;
  }

  const totalUsdAfterCommission = totalUsd - commission;

  return totalUsdAfterCommission / targetToUsdRate;
}
