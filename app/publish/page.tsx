"use client";
export default function PublishPage() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Pubblica il tuo immobile</h1>

      <p>
        Le offerte non sono vincolanti e non costituiscono proposta contrattuale.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Immobile pubblicato (demo)");
        }}
      >
        <div style={{ marginBottom: 10 }}>
          <input placeholder="Titolo annuncio" style={{ width: "100%", padding: 8 }} />
        </div>

        <div style={{ marginBottom: 10 }}>
          <input placeholder="Prezzo" style={{ width: "100%", padding: 8 }} />
        </div>

        <div style={{ marginBottom: 10 }}>
          <textarea
            placeholder="Descrizione"
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <button type="submit">Pubblica</button>
      </form>
    </div>
  );
}
