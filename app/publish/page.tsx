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
      <h1 style={{ fontSize: 34, marginBottom: 10 }}>
        Pubblica il tuo immobile
      </h1>

      <p style={{ color: "#666", marginBottom: 30 }}>
        Nessun vincolo. Nessuna pressione. Decidi tu tutto.
      </p>

      {/* BOX VALORE */}
      <div
        style={{
          background: "#f9fafb",
          border: "1px solid #e5e7eb",
          borderRadius: 10,
          padding: 20,
          marginBottom: 30,
        }}
      >
        <p><strong>✔ Privacy totale</strong> — i tuoi dati non sono mai pubblici</p>
        <p><strong>✔ Controllo totale</strong> — scegli tu quando esporti</p>
        <p><strong>✔ Solo acquirenti reali</strong> — budget verificato</p>
        <p><strong>✔ Nessun obbligo</strong> — nessuna offerta è vincolante</p>
      </div>

      {/* SLOGAN */}
      <div style={{ marginBottom: 30 }}>
        <p style={{ fontStyle: "italic", fontSize: 16 }}>
          Nessuno saprà mai a che prezzo sei disposto a vendere.
          Finché non decidi tu.
        </p>

        <p style={{ fontStyle: "italic", marginTop: 10 }}>
          Solo trattative reali. Chi fa un’offerta può davvero comprare.
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
        <input
          placeholder="Titolo annuncio"
          style={inputStyle}
        />

        <input
          placeholder="Prezzo"
          style={inputStyle}
        />

        <textarea
          placeholder="Descrizione"
          style={{ ...inputStyle, height: 100 }}
        />

        <button style={buttonStyle}>
          Pubblica immobile
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: 12,
  borderRadius: 8,
  border: "1px solid #ddd",
  fontSize: 14,
};

const buttonStyle = {
  background: "black",
  color: "white",
  padding: "12px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  fontSize: 16,
};        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Immobile pubblicato (demo)");
        }}
      >
        <div style={{ marginBottom: 10 }}>
          <input
            placeholder="Titolo annuncio"
            style={{ width: "100%", padding: 10 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <input
            placeholder="Prezzo"
            style={{ width: "100%", padding: 10 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <textarea
            placeholder="Descrizione"
            style={{ width: "100%", padding: 10 }}
          />
        </div>

        <button
          type="submit"
          style={{
            background: "black",
            color: "white",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Pubblica immobile
        </button>
      </form>
    </div>
  );
}
