import { NextResponse } from "next/server";
import { sign, decode, verify } from "jsonwebtoken";
import { serialize } from "cookie";
import { nanoid } from "nanoid";
import type { NextRequest } from "next/server";

const secret = "your-secret-key";

export const db: Record<string, any> = {};

// Проверка на ТОКЕН
// Если нет токена То записываем в БД и сетим кукис с userId
// Если есть токен, то добавляем в масив платижей новый платеж юзера
export async function POST(req: NextRequest) {

  try {
    const { username, password, text } = await req.json();
    const token = req.cookies.get("token")?.value;
    const paymentData = { text };
    const paymentId = nanoid();

    if (!token) {
      if (username && password) {
        const userId = nanoid();

        db[userId] = {
          payments: [{ [paymentId]: { paymentData } }],
        };

        const token = sign({ userId }, secret, {
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
      }
    } else {
      const verifyToken = verify(token, secret);

      if (verifyToken) {
        const userId = decode(token)?.userId;
        const user = db[userId];
        user.payments.push({ [paymentId]: { paymentData } });
      } else {
        return NextResponse.json({ message: "Token error" }, { status: 403 });
      }
    }



    return NextResponse.json({ message: "added new data" }, { status: 200 });
  } catch (e) {
    console.log("ERROR", e);
    return NextResponse.json({ message: "Validation data error" }, { status: 401 });
  }
}

// import { NextResponse } from "next/server";

// // To handle a GET request to /api

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const token = req.cookies.get("token")?.value;

  if (token && verify(token, secret)) {
    const decodedToken = decode(token);
    const userId = decodedToken?.userId;
    const userData = db[userId];

    console.log({ userId });

    userData.payments.forEach((payment) => {
      console.log({ payment });
    });
  }

  console.log({ token });
  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }
  const paymentExist = db[id];

  // Пример проверки ID. Здесь вы можете добавить свою логику обработки платежа.
  if (paymentExist) {
    return NextResponse.json({ message: "Payment ID is valid", paymentExist });
  } else {
    return NextResponse.json(
      { message: "Invalid Payment ID" },
      { status: 404 },
    );
  }
}
