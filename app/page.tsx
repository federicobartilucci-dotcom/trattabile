import Link from "next/link";
export default function Home() {
  return (
    <div style={{ padding: 40, maxWidth: 900, margin: "0 auto" }}>
      
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>
        Vendi casa ricevendo offerte anonime, e parla solo quando decidi tu
      </h1>

      <p style={{ fontSize: 18, marginBottom: 30 }}>
        Pubblica il tuo annuncio a pagamento e ricevi offerte da acquirenti realmente interessati.
        Il processo è semplice, veloce e trasparente.
      </p>

      <h2 style={{ marginTop: 40 }}>Perché usarlo?</h2>

      <ul style={{ marginTop: 10, lineHeight: 1.8 }}>
        <li>Nessuna perdita di tempo con curiosi</li>
        <li>Ricevi solo offerte concrete</li>
        <li>Decidi tu quando rivelare i tuoi dati</li>
        <li>Massima privacy durante tutta la trattativa</li>
      </ul>

      <h2 style={{ marginTop: 40 }}>Come funziona</h2>

      <ol style={{ marginTop: 10, lineHeight: 1.8 }}>
        <li>Pubblica il tuo immobile</li>
        <li>Ricevi offerte anonime</li>
        <li>Scegli se e quando rispondere</li>
      </ol>
   <Link href="/publish" style={{
  display: "inline-block",
  padding: 10,
  marginTop: 20,
  background: "black",
  color: "white",
  textDecoration: "none"
}}>
  Pubblica immobile
</Link>
</Link>
    </div>
  );
}
