"use client";

export default function PublishPage() {
  return (
    <div
      style={{
        padding: 40,
        maxWidth: 700,
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* TITOLO */}
      <h1 style={{ fontSize: 40, marginBottom: 10 }}>
  Vendi casa senza esporsi.
</h1>

<p style={{ fontSize: 18, color: "#555", marginBottom: 30 }}>
  Ricevi offerte anonime da acquirenti verificati e decidi tu se e quando farti contattare.
</p>

      <p style={{ color: "#666", marginBottom: 30 }}>
        Nessun vincolo. Nessuna pressione. Decidi tu tutto.
      </p>

      {/* BOX VALORE */}
      <div
        style={{
          background: "#f8f8f8",
          border: "1px solid #eee",
          borderRadius: 10,
          padding: 20,
          marginBottom: 30,
        }}
      >
        <p><strong>Privacy totale:</strong> i tuoi dati non sono pubblici</p>
        <p><strong>Controllo totale:</strong> decidi tu se e quando rivelarti</p>
        <p><strong>Solo acquirenti reali:</strong> budget verificato</p>
        <p><strong>Nessun vincolo:</strong> nessuna offerta è obbligatoria</p>
        <p><strong>Accesso ai contatti:</strong> solo se accetti l’offerta</p>
      </div>

      {/* SLOGAN */}
      <div style={{ marginBottom: 30 }}>
        <p style={{ fontStyle: "italic" }}>
          “Nessuno saprà mai a che prezzo sei disposto a vendere… finché non accetti.”
        </p>

        <p style={{ fontStyle: "italic", marginTop: 10 }}>
          “Solo trattative reali. Chi fa un’offerta ha già verificato il proprio budget.
          Puntiamo dritti al rogito.”
        </p>
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
          Pubblica immobile
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
  background: "black",
  color: "white",
  padding: "14px",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  fontSize: 16,
};
