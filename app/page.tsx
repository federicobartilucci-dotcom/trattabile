"use client";

export default function Home() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>

      {/* HERO */}
      <div style={{
        background: "#f7f7f7",
        padding: "80px 20px",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: 42 }}>
          Vendi casa senza stress
        </h1>

        <p style={{
          fontSize: 18,
          color: "#555",
          maxWidth: 600,
          margin: "20px auto"
        }}>
          Ricevi offerte reali da acquirenti verificati. Decidi tu se e quando rispondere.
        </p>

        <button
          onClick={() => window.location.href = "/publish"}
          style={{
            padding: "14px 28px",
            background: "#000",
            color: "#fff",
            borderRadius: 8,
            border: "none",
            cursor: "pointer"
          }}
        >
          Pubblica immobile
        </button>

        <button
          onClick={() => window.location.href = "/properties"}
          style={{
            padding: "14px 28px",
            marginLeft: 10,
            background: "#ddd",
            borderRadius: 8,
            border: "none",
            cursor: "pointer"
          }}
        >
          Vedi immobili
        </button>
      </div>

      {/* BENEFICI */}
      <div style={{
        padding: 60,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
        gap: 20
      }}>
        <Card title="Offerte reali" text="Solo utenti interessati" />
        <Card title="Privacy totale" text="Decidi tu cosa mostrare" />
        <Card title="Zero stress" text="Niente telefonate inutili" />
      </div>

    </div>
  );
}

function Card({ title, text }: any) {
  return (
    <div style={{
      background: "#fff",
      padding: 20,
      borderRadius: 10,
      boxShadow: "0 5px 20px rgba(0,0,0,0.05)"
    }}>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
