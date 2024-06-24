import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authenticateUser, authorizeAdmin } from "@/app/api/_utils/utils";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { userId, error } = authenticateUser(req);

    if (error) {
      return error;
    }

    const { error: roleError } = await authorizeAdmin(userId);

    if (roleError) {
      return NextResponse.json(false, { status: 200 });
    }

    return NextResponse.json(true, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/tickets:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
