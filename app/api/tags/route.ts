// app/api/tags/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import type { NextRequest } from "next/server";
import cache from "@/app/api/_services/cache";
import { authenticateUser, authorizeAdmin } from "@/app/api/_utils/utils";

const prisma = new PrismaClient();

// Определение схемы данных с использованием Zod
const TagSchema = z.object({
  name: z.string().nonempty(),
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

    const result = TagSchema.safeParse(await req.json());

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid input data", errors: result.error.errors },
        { status: 400 },
      );
    }

    const { name } = result.data;

    // Проверка уникальности name
    const existingTag = await prisma.tag.findUnique({
      where: {
        name,
      },
    });

    if (existingTag) {
      return NextResponse.json(
        { message: "Tag with the same name already exists" },
        { status: 409 },
      );
    }

    const tag = await prisma.tag.create({
      data: {
        name,
      },
    });

    // Инвалидация кэша после создания нового тега
    cache.del("tags");

    return NextResponse.json(tag, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/tags:", error);
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
    const cachedTags = cache.get("tags");
    if (cachedTags) {
      return NextResponse.json(cachedTags, { status: 200 });
    }

    // Получение всех токенов с тегами
    const tags = await prisma.tag.findMany({
      select: {
        name: true,
      },
    });

    const mappedTags = tags.map((tag) => tag.name);
    cache.set("tags", mappedTags);

    return NextResponse.json(mappedTags, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/tags:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
