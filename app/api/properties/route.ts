import { NextResponse } from "next/server";

let properties: any[] = [];

export async function GET() {
  return NextResponse.json(properties);
}

export async function POST(req: Request) {
  const body = await req.json();

  properties.push({
    ...body,
    offers: [],
  });

  return NextResponse.json({ success: true });
}
