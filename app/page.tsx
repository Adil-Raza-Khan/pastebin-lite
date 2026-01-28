"use client";

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");

  async function submit() {
    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: "Unknown error" }));
      alert(error.error || "Failed to create paste");
      return;
    }

    const data = await res.json();
    setUrl(data.url);
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Pastebin Lite</h1>

      <textarea
       rows={10}
       value={content}
       onChange={(e) => setContent(e.target.value)}
       style={{
       width: "100%",
       border: "1px solid #999",
       padding: "10px",
       borderRadius: "6px",
       fontFamily: "monospace"
  }}
/>


      <button onClick={submit}>Create Paste</button>

      {url && (
        <p>
          Share link: <a href={url}>{url}</a>
        </p>
      )}
    </main>
  );
}
