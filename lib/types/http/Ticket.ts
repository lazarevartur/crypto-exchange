import { Ticket } from "@prisma/client";
import { IPayloadResponse } from "@/lib/types/Payload";

export interface ITicketResponse extends Ticket {
  payment?: IPayloadResponse;
}

