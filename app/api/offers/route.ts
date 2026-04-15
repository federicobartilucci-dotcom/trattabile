import { NextResponse } from "next/server";
import { properties } from "../properties/route";

export async function POST(req: Request) {
  const body = await req.json();

  const property = properties.find((p: any) => p.id === body.id);

  if (!property) {
    return NextResponse.json({ error: "Not found" });
  }

  if (!property.offers) {
    property.offers = [];
  }

  property.offers.push(body.offer);

  return NextResponse.json({ success: true });
}
