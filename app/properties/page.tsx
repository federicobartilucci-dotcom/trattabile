"use client";

import { useEffect, useState } from "react";

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("/api/properties")
      .then(res => res.json())
      .then(data => setProperties(data));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Immobili disponibili</h1>

      {properties.map((p: any, i) => (
        <div key={i} style={{ border: "1px solid #ddd", padding: 20, marginTop: 10 }}>
          <h2>{p.title}</h2>
          <p>Prezzo: {p.price}</p>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
}
