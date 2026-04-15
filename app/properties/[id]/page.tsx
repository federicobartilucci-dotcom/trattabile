"use client";

import { useEffect, useState } from "react";

export default function PropertyDetail({ params }: any) {
  const [property, setProperty] = useState<any>(null);
  const [offer, setOffer] = useState("");

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => {
       const found = data.find((p: any) => p.id === params.id);
setProperty(found);
      });
  }, [params.id]);

  if (!property) return <div style={{ padding: 40 }}>Caricamento...</div>;

  return (
    <div style={{ padding: 40 }}>
      <h1>{property.title}</h1>
      <p>Prezzo: {property.price}€</p>
      <p>{property.description}</p>

      <hr style={{ margin: "30px 0" }} />

      <h2>Fai un'offerta</h2>

      <input
        placeholder="Inserisci offerta"
        value={offer}
        onChange={(e) => setOffer(e.target.value)}
        style={{
          padding: 10,
          border: "1px solid #ccc",
          borderRadius: 6,
          marginRight: 10,
        }}
      />

      <button
       onClick={async () => {
  await fetch("/api/offers", {
    method: "POST",
    body: JSON.stringify({
      id: params.id,
      offer: offer,
    }),
  });

  alert("Offerta inviata!");
}}
        style={{
          padding: "10px 20px",
          background: "#000",
          color: "#fff",
          borderRadius: 6,
          border: "none",
        }}
      >
        Invia offerta
      </button>
    </div>
  );
}
