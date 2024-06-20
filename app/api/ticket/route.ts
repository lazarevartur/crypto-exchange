// app/api/tickets/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { NextRequest } from "next/server";
import { authenticateUser } from "@/app/api/_utils/utils";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { error } = authenticateUser(req);

    if (error) {
      return error;
    }

    const url = new URL(req.url);
    const ticketId = url.searchParams.get("id");

    if (!ticketId) {
      return NextResponse.json(
        { message: "Ticket ID is required" },
        { status: 400 },
      );
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: {
        payment: {
          include: {
            fromToken: true,
            toToken: true,
          },
        },
      },
    });

    if (!ticket) {
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(ticket, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/tickets:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
