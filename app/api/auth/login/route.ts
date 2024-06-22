// app/api/user/route.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PrismaClient, UserRole } from "@prisma/client";
import { z } from "zod";
import {
  authenticateUser,
  generateAndSetCookieToken,
  validateEthereumAddress,
} from "@/app/api/_utils/utils";

const prisma = new PrismaClient();

// Определение схемы данных с использованием Zod и кастомной функции для проверки адреса
const CreateUserSchema = z.object({
  ethAddress: z.string().refine((address) => validateEthereumAddress(address), {
    message: "Invalid Ethereum address",
  }),
});

export async function POST(req: NextRequest) {
  try {
    // Валидация данных запроса
    const result = CreateUserSchema.safeParse(await req.json());

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid input data", errors: result.error.errors },
        { status: 400 },
      );
    }

    const { ethAddress } = result.data;

    const existingUser = await prisma.user.findFirst({
      where: { account: ethAddress },
    });

    if (existingUser) {
      const payload = { userId: existingUser.id };
      const response = NextResponse.json(payload);
      generateAndSetCookieToken(response, payload);

      return response;
    }

    const { userId } = authenticateUser(req);

    if (userId) {
      const user = await prisma.user.update({
        where: { id: userId },
        data: { account: ethAddress },
      });
      const payload = { userId: user.id };
      const response = NextResponse.json(payload);
      generateAndSetCookieToken(response, payload);

      return response;
    }

    const newUser = await prisma.user.create({
      data: {
        account: ethAddress,
        role: UserRole.USER,
      },
    });

    const payload = { userId: newUser.id };
    const response = NextResponse.json(payload);
    generateAndSetCookieToken(response, payload);

    return response;
  } catch (error) {
    console.error("Error in POST /api/user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
