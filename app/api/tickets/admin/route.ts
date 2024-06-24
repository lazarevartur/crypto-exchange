import { NextResponse } from "next/server";
import { PaymentStatus } from "@prisma/client";
import type { NextRequest } from "next/server";
import { authenticateUser, authorizeAdmin } from "@/app/api/_utils/utils";
import prisma from "@/app/api/_lib/db";
import { getTicketById } from "@/app/api/_services/tickets.services";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { userId, error } = authenticateUser(req);

    if (error) {
      return error;
    }

    const { error: roleError } = await authorizeAdmin(userId);

    if (roleError) {
      return roleError;
    }

    const url = new URL(req.url);
    const ticketId = url.searchParams.get("id");
    const status = url.searchParams.get("status") as PaymentStatus | undefined;

    if (ticketId) {
      const ticket = await getTicketById(ticketId);

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
        ...(status && { status: status }),
      },
      include: {
        payment: {
          include: {
            fromToken: true,
            toToken: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
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
