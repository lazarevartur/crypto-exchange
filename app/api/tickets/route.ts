import { NextResponse } from "next/server";
import { PaymentStatus, PrismaClient } from "@prisma/client";
import type { NextRequest } from "next/server";
import { authenticateUser } from "@/app/api/_utils/utils";

export const dynamic = 'force-dynamic'


const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { userId, error } = authenticateUser(req);

    if (error) {
      return error;
    }

    const url = new URL(req.url);
    const ticketId = url.searchParams.get("id");
    const status = url.searchParams.get("status") as PaymentStatus | undefined;

    if (ticketId) {
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
    }

    const tickets = await prisma.ticket.findMany({
      where: {
        userId: userId,
        ...(status && { status: status }),
      },
    });

    return NextResponse.json(tickets, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/tickets:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
