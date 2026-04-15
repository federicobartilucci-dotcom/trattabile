"use client";

import { useEffect, useState } from "react";

export default function PropertyDetail() {
  const [property, setProperty] = useState<any>(null);
  const [offer, setOffer] = useState("");

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => {
      useEffect(() => {
  fetch("/api/properties")
    .then((res) => res.json())
    .then((data) => {
      const urlParts = window.location.pathname.split("/");
      const idFromUrl = urlParts[urlParts.length - 1];

      const found = data.find((p: any) => p.id === idFromUrl);
      setProperty(found || data[0]);
    });
}, []);
      });
  }, []);

  if (!property) return <div style={{ padding: 40 }}>Caricamento...</div>;

  return (
    <div style={{ padding: 40 }}>
      <h1>{property.title}</h1>
      <p>{property.description}</p>

      <h3>Fai un'offerta</h3>

      <input
        placeholder="Inserisci offerta"
        value={offer}
        onChange={(e) => setOffer(e.target.value)}
        style={{
          padding: 10,
          border: "1px solid #ccc",
          marginRight: 10,
        }}
      />

      <button
        onClick={async () => {
          await fetch("/api/offers", {
            method: "POST",
            body: JSON.stringify({
              id: property.id,
              offer: offer,
            }),
          });

          alert("Offerta inviata!");
        }}
        style={{
          padding: "10px 20px",
          background: "black",
          color: "white",
          border: "none",
        }}
      >
        Invia offerta
      </button>
    </div>
  );
}
