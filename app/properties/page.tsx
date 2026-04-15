"use client";

import { useEffect, useState } from "react";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Immobili disponibili</h1>

      {properties.map((p, i) => (
        <div
          key={i}
          onClick={() => (window.location.href = "/properties/" + i)}
          style={{
            cursor: "pointer",
            border: "1px solid #ddd",
            padding: 20,
            marginTop: 10,
            borderRadius: 8,
          }}
        >
          <h2>{p.title}</h2>
          <p>Prezzo: {p.price}€</p>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
}
