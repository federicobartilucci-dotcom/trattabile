"use client";

export default function PublishPage() {
  return (
    <div
      style={{
        padding: "100px 20px",
        maxWidth: 800,
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ fontSize: 20, fontWeight: "bold" }}>
            TRATTABILE
          </div>

          <div
            style={{
              fontSize: 12,
              color: "#777",
              background: "transparent",
              border: "1px solid #ddd",
              padding: "8px 14px",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
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
      <h1
        style={{
          fontSize: 48,
          lineHeight: 1.2,
          fontWeight: "bold",
        }}
      >
        Vendi casa senza esporti.
      </h1>

      <p
        style={{
          fontSize: 16,
          lineHeight: 1.5,
          color: "#555",
          marginTop: 10,
          marginBottom: 30,
        }}
      >
        Ricevi offerte anonime da acquirenti verificati e decidi tu se e quando farti contattare.
      </p>

      {/* BOX VALORE */}
      <div
        style={{
          background: "#f7f7f7",
          borderRadius: 16,
          padding: 25,
          marginBottom: 40,
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >
        <p><strong>Privacy totale:</strong> i tuoi dati non sono pubblici</p>
        <p><strong>Controllo totale:</strong> decidi tu se e quando rivelarti</p>
        <p><strong>Solo acquirenti reali:</strong> budget verificato</p>
        <p><strong>Nessun vincolo:</strong> nessuna offerta è obbligatoria</p>
      </div>

      {/* FORM */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Immobile pubblicato (demo)");
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >
        <input placeholder="Titolo annuncio" style={inputStyle} />
        <input placeholder="Prezzo" style={inputStyle} />
        <textarea placeholder="Descrizione" style={{ ...inputStyle, height: 120 }} />

        <button style={buttonStyle}>
          Ricevi offerte ora
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: 12,
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: 14,
};

const buttonStyle = {
  background: "#000",
  color: "#fff",
  padding: "16px",
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  fontSize: 16,
  fontWeight: "bold",
  transition: "all 0.2s ease",
};
