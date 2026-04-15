"use client";

export default function PublishPage() {
  return (
    <div style={{ padding: "100px 20px", maxWidth: 800, margin: "0 auto" }}>

      {/* HEADER */}
<div style={{ display: "flex", justifyContent: "space-between", marginBottom: 40 }}>
  <div>
    <div style={{ fontSize: 20, fontWeight: "bold" }}>TRATTABILE</div>
    <div style={{ fontSize: 12, color: "#777" }}>
      Offerte immobiliari riservate
    </div>
  </div>

  <button
    style={{
      background: "transparent",
      border: "1px solid #ddd",
      padding: "8px 14px",
      borderRadius: 8,
      cursor: "pointer",
    }}
  >
    Accedi
  </button>
</div>

      {/* TITOLO */}
      <h1 style={{ fontSize: 40, fontWeight: "bold" }}>
        Vendi casa senza esporti.
      </h1>

      <p style={{ color: "#555", marginTop: 10 }}>
        Ricevi offerte anonime da acquirenti verificati.
      </p>

      {/* BOX */}
      <div
        style={{
          background: "#f5f5f5",
          padding: 20,
          borderRadius: 10,
          marginTop: 30,
        }}
      >
        <p>✔️ Privacy totale</p>
        <p>✔️ Solo acquirenti verificati</p>
        <p>✔️ Nessun vincolo</p>
      </div>

      {/* FORM */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Demo invio");
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginTop: 30,
        }}
      >
        <input placeholder="Titolo annuncio" style={inputStyle} />
        <input placeholder="Prezzo" style={inputStyle} />
        <textarea placeholder="Descrizione" style={inputStyle} />

        <button style={buttonStyle}>Ricevi offerte</button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: 10,
  border: "1px solid #ccc",
  borderRadius: 6,
};

const buttonStyle = {
  background: "#000",
  color: "#fff",
  padding: 12,
  borderRadius: 8,
  cursor: "pointer",
};
