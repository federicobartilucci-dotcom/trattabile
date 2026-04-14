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
      {/* TITOLO */}
     <h1 style={{
  fontSize: 48,
  lineHeight: 1.2,
  fontWeight: "bold"
}}>
  Vendi casa senza esporti.
</h1>
  <p style={{ fontSize: 20,
lineHeight: 1.5, color: "#555", marginBottom: 30 }}>
  Ricevi offerte anonime da acquirenti verificati e decidi tu se e quando farti contattare.
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
  Inizia ora
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
