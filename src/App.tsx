import "./App.css";
import { Button } from "./design-system/components/Button";

function App() {
  return (
    <div className="app">
      <h1>Welcome to CyberSmart!</h1>

      <section style={{ marginTop: "2rem" }}>
        <h2>Button Component with Styled Components</h2>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "1rem",
            alignItems: "center",
          }}
        >
          <Button size="sm" variant="primary">
            Small Primary
          </Button>
          <Button size="md" variant="primary">
            Medium Primary
          </Button>
          <Button size="lg" variant="primary">
            Large Primary
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "1rem",
            alignItems: "center",
          }}
        >
          <Button size="sm" variant="secondary">
            Small Secondary
          </Button>
          <Button size="md" variant="secondary">
            Medium Secondary
          </Button>
          <Button size="lg" variant="secondary">
            Large Secondary
          </Button>
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Button disabled>Disabled Primary</Button>
          <Button variant="secondary" disabled>
            Disabled Secondary
          </Button>
        </div>
      </section>
    </div>
  );
}

export default App;
