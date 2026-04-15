"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PropertyDetail() {
  const params = useParams();
  const [property, setProperty] = useState<any>(null);

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => {
        const found = data[params.id as any];
        setProperty(found);
      });
  }, []);

  if (!property) return <p style={{ padding: 40 }}>Caricamento...</p>;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 40 }}>

      <div style={{ height: 300, background: "#ddd", borderRadius: 10 }} />

      <h1 style={{ marginTop: 20 }}>{property.title}</h1>

      <h2 style={{ marginTop: 10 }}>€ {property.price}</h2>

      <p style={{ marginTop: 20, color: "#555" }}>
        {property.description}
      </p>

      <button style={{
        marginTop: 30,
        padding: 14,
        background: "#000",
        color: "#fff",
        borderRadius: 8,
        border: "none",
        cursor: "pointer"
      }}>
        Fai un'offerta anonima
      </button>

    </div>
  );
}
