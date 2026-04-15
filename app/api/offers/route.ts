import { NextResponse } from "next/server";
import { properties } from "../properties/route";

export async function POST(req: Request) {
  const body = await req.json();

  const property = properties.find((p) => p.id === body.id);

  if (!property) {
    return NextResponse.json({ error: "Immobile non trovato" });
  }

  property.offers.push(body.offer);

  return NextResponse.json({ success: true });
}
