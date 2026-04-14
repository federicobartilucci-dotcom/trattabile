"use client";

export default function PublishPage() {
  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      
      <h1 style={{ fontSize: 32, marginBottom: 10 }}>
        Pubblica il tuo immobile
      </h1>

      <p style={{ marginBottom: 20, color: "#555" }}>
        Le offerte non sono vincolanti e non costituiscono proposta contrattuale.
      </p>

      {/* VALORE DIFFERENZIANTE */}
      <div style={{ 
        background: "#f5f5f5", 
        padding: 15, 
        marginBottom: 20,
        borderRadius: 8
      }}>
        <p><strong>✔ Privacy totale:</strong> i tuoi dati non vengono mai condivisi pubblicamente</p>
        <p><strong>✔ Controllo totale:</strong> decidi tu se e quando rivelare la tua identità</p>
        <p><strong>✔ Sicurezza:</strong> vedrai i dati dell’acquirente solo se accetti l’offerta</p>
        <p><strong>✔ Nessun vincolo:</strong> né venditore né acquirente sono obbligati in alcun modo</p>
      </div>

      {/* SLOGAN */}
      <div style={{ marginBottom: 30 }}>
        <p style={{ fontStyle: "italic" }}>
          “Nessuno saprà mai a che prezzo sei disposto a vendere… finché non accetti.”
        </p>

        <p style={{ fontStyle: "italic", marginTop: 10 }}>
          “Solo trattative reali: chi fa un’offerta ha già verificato il proprio budget 
          (fondi o pre-delibera). Puntiamo dritti al rogito.”
        </p>
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
