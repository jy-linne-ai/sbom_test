"use client";

import { useEffect, useState } from "react";

type HealthResponse = {
  status: string;
  service: string;
  timestamp: string;
};

export default function Home() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

  useEffect(() => {
    fetch(`${apiUrl}/health`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setHealth)
      .catch((err: Error) => setError(err.message));
  }, [apiUrl]);

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <h1>SBOM Test FE2</h1>
      <p>pnpm + Next.js — Server health check</p>
      {error && <p style={{ color: "crimson" }}>Error: {error}</p>}
      {health && (
        <pre style={{ background: "#f4f4f4", padding: "1rem", borderRadius: 4 }}>
          {JSON.stringify(health, null, 2)}
        </pre>
      )}
      {!health && !error && <p>Loading...</p>}
    </main>
  );
}
