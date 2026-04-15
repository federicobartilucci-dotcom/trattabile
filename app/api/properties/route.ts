import { NextResponse } from "next/server";

// 🔥 IMPORTANTE: export
export let properties: any[] = [];

export async function GET() {
  return NextResponse.json(properties);
}

export async function POST(req: Request) {
  const body = await req.json();

  properties.push({
    id: properties.length.toString(), // id semplice
    ...body,
    offers: [],
  });

  return NextResponse.json({ success: true });
}
