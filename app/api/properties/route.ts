import { NextResponse } from "next/server";

// 🔥 database in memoria
export let properties: any[] = [];

export async function GET() {
  return NextResponse.json(properties);
}

export async function POST(req: Request) {
  const body = await req.json();

  // 👉 creazione immobile
  if (body.type === "property") {
    const newProperty = {
      id: Date.now().toString(),
      title: body.title,
      price: body.price,
      description: body.description,
      offers: [],
    };

    properties.push(newProperty);

    return NextResponse.json({ success: true });
  }

  // 👉 aggiunta offerta
  if (body.type === "offer") {
    const property = properties.find((p) => p.id === body.id);

    if (!property) {
      return NextResponse.json({ error: "Not found" });
    }

    property.offers.push(body.offer);

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid request" });
}
