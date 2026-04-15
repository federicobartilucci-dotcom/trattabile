"use client";

import { useState } from "react";

export default function PublishPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/properties", {
      method: "POST",
      body: JSON.stringify({ title, price, description }),
    });

    alert("Immobile pubblicato!");
    window.location.href = "/properties";
  };

  return (
    <div style={{ padding: 40, maxWidth: 600, margin: "0 auto" }}>
      
      <h1 style={{ marginBottom: 20 }}>Pubblica il tuo immobile</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >
        <input
          placeholder="Titolo (es. Trilocale centro Milano)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={input}
        />

        <input
          placeholder="Prezzo (€)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={input}
        />

        <textarea
          placeholder="Descrizione"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={input}
        />

        <button style={button}>
          Pubblica immobile
        </button>
      </form>

    </div>
  );
}

const input = {
  padding: 12,
  borderRadius: 8,
  border: "1px solid #ccc",
};

const button = {
  padding: 14,
  background: "#000",
  color: "#fff",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
};
