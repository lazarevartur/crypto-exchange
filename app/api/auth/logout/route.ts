// app/api/logout/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ message: 'Logout successful' });
  response.headers.append('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0');

  return response;
}