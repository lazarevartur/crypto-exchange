// app/api/tokens/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import type { NextRequest } from "next/server";
import cache from "@/app/api/_lib/cache";
import { authenticateUser, authorizeAdmin } from "@/app/api/_utils/utils";
import prisma from "@/app/api/_lib/db";


// Определение схемы данных с использованием Zod
const TokenSchema = z.object({
  name: z.string().nonempty(),
  symbol: z.string().nonempty(),
  imageUrl: z.string().url(),
  amount: z.number().positive(),
  price: z.number().positive(),
  network: z.string().nonempty(),
  address: z.string().nonempty(),
  min: z.number().positive().default(0.1),
  infoText: z.string().optional()
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
      return NextResponse.json(
          { message: "Invalid input data", errors: result.error.errors },
          { status: 400 },
      );
    }

    const { name, symbol, imageUrl, amount, price, network, min, infoText, address } = result.data;

    // Проверка уникальности name и symbol
    const existingToken = await prisma.token.findFirst({
      where: {
        OR: [{ name: name }, { symbol: symbol }],
      },
    });

    if (existingToken) {
      return NextResponse.json(
          { message: "Token with the same name or symbol already exists" },
          { status: 409 },
      );
    }

    const token = await prisma.token.create({
      data: {
        name,
        symbol,
        imageUrl,
        amount,
        price,
        network,
        min,
        infoText,
        address
      },
    });

    // Инвалидация кэша после создания нового токена
    cache.del("tokens");
    cache.del("tags");

    return NextResponse.json(
        { message: "Token created successfully", token },
        { status: 201 },
    );
  } catch (error) {
    console.error("Error in POST /api/tokens:", error);
    return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(req: NextRequest) {
  try {
    // Попытка получить данные из кэша
    const cachedTokens = cache.get("tokens");
    if (cachedTokens) {
      return NextResponse.json(
          cachedTokens,
          { status: 200 },
      );
    }

    // Получение всех токенов из базы данных
    const tokens = await prisma.token.findMany();

    // Сохранение в кэш
    cache.set("tokens", tokens);

    return NextResponse.json(
        tokens,
        { status: 200 },
    );
  } catch (error) {
    console.error("Error in GET /api/tokens:", error);
    return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}