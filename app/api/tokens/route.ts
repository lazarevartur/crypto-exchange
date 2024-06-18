// app/api/tokens/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import type { NextRequest } from "next/server";
import { authenticateUser, authorizeAdmin } from "@/app/api/_utils/utils";

const prisma = new PrismaClient();

// Определение схемы данных с использованием Zod
const TokenSchema = z.object({
  name: z.string().nonempty(),
  symbol: z.string().nonempty(),
  imageUrl: z.string().url(),
  amount: z.number().positive(),
  price: z.number().positive(),
  network: z.string().nonempty(),
});

export async function POST(req: NextRequest) {
  try {
    const { userId, error: authError } = authenticateUser(req);

    if (authError) {
      return authError;
    }

    const { user, error: roleError } = await authorizeAdmin(userId);

    if (roleError) {
      return roleError;
    }

    const result = TokenSchema.safeParse(await req.json());

    if (!result.success) {
      return NextResponse.json({ message: "Invalid input data", errors: result.error.errors }, { status: 400 });
    }

    const { name, symbol, imageUrl, amount, price, network } = result.data;

    // Проверка уникальности name и symbol
    const existingToken = await prisma.token.findFirst({
      where: {
        OR: [
          { name: name },
          { symbol: symbol },
        ],
      },
    });

    if (existingToken) {
      return NextResponse.json({ message: "Token with the same name or symbol already exists" }, { status: 409 });
    }

    const token = await prisma.token.create({
      data: {
        name,
        symbol,
        imageUrl,
        amount,
        price,
        network,
      },
    });

    return NextResponse.json({ message: "Token created successfully", token }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/tokens:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const tokens = await prisma.token.findMany();

    return NextResponse.json({ message: "Tokens retrieved successfully", tokens }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/tokens:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}