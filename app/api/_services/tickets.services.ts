import prisma from "@/app/api/_lib/db";

export const getTicketById = (ticketId: string) => {
  return prisma.ticket.findUnique({
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
};
