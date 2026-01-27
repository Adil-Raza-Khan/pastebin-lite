import kv from "@/lib/kv";
import { notFound } from "next/navigation";

export default async function PastePage({
  params
}: {
  params: { id: string };
}) {
  const paste = await kv.get<any>(`paste:${params.id}`);

  if (!paste) notFound();

  const now = Date.now();

  if (paste.expires_at && now >= paste.expires_at) notFound();
  if (paste.max_views !== null && paste.views >= paste.max_views) notFound();

  return (
    <main style={{ padding: "2rem", fontFamily: "monospace" }}>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {paste.content}
      </pre>
    </main>
  );
}
