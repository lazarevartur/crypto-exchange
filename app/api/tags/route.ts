// app/api/tags/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Получение всех тегов напрямую из базы данных
    const tags = await prisma.tag.findMany({
      select: {
        name: true,
      },
    });

    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/tags:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
