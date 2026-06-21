import Navbar from "../components/Navbar";
function Home() {
  return (
    <>
      <Navbar />
      <section
        style={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
          textAlign: "center",
          padding: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
          }}
        >
          Blockchain Academic Certificate
          Verification System
        </h1>
        <p
          style={{
            maxWidth: "700px",
            fontSize: "18px",
            color: "#64748b",
          }}
        >
          Securely issue, manage and verify
          academic certificates using blockchain
          technology.
        </p>
        <button
          style={{
            padding: "14px 24px",
            border: "none",
            borderRadius: "8px",
            background: "#2563eb",
            color: "white",
            fontSize: "16px",
          }}
        >
          Verify Certificate
        </button>
      </section>
    </>
  );
}
export default Home;