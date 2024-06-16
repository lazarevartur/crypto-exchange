// app/api/payment/route.ts
import { NextResponse } from "next/server";
import { sign, decode, verify, JwtPayload } from "jsonwebtoken";
import { serialize } from "cookie";
import { PrismaClient } from "@prisma/client";
import type { NextRequest } from "next/server";

const prisma = new PrismaClient();
const secret = "your-secret-key";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    const token = req.cookies.get("token")?.value;

    if (!token) {

      const user = await prisma.user.create({
        data: {
          payments: {
            create: [{ text }],
          },
        },
      });

      const token = sign({ userId: user.id }, secret, {
        expiresIn: "1d",
      });

      const response = NextResponse.json({ message: "Set data with cookie" });

      response.headers.append(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24, // 1 day
          path: "/",
        }),
      );

      return response;
    } else {
      const verifyToken = verify(token, secret) as JwtPayload;

      if (verifyToken) {
        const userId = verifyToken.userId;
        await prisma.payment.create({
          data: {
            text,
            userId,
          },
        });

        return NextResponse.json(
          { message: "Added new data" },
          { status: 200 },
        );
      } else {
        return NextResponse.json({ message: "Token error" }, { status: 403 });
      }
    }
  } catch (e) {
    console.log("ERROR", e);
    return NextResponse.json(
      { message: "Validation data error" },
      { status: 401 },
    );
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (token && verify(token, secret)) {
    const decodedToken = decode(token) as JwtPayload;
    const userId = decodedToken?.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { payments: true },
    });


    if (user) {
      return NextResponse.json({ message: "user ID is valid", user });
    } else {
      return NextResponse.json(
        { message: "Invalid user ID" },
        { status: 404 },
      );
    }
  } else {
    return NextResponse.json({ message: "Not authenticated" }, { status: 403 });
  }
}
