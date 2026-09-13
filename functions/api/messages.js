// Mengambil daftar pesan dari database D1
export async function onRequestGet(context) {
  const db = context.env.DB;
  const { results } = await db.prepare("SELECT * FROM messages ORDER BY id DESC LIMIT 20").all();
  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" }
  });
}

// Menyimpan pesan baru ke database D1
export async function onRequestPost(context) {
  const db = context.env.DB;
  const body = await context.request.json();
  const { name, message } = body;

  if (!name || !message) {
    return new Response(JSON.stringify({ error: "Data tidak lengkap" }), { status: 400 });
  }

  await db.prepare("INSERT INTO messages (name, message) VALUES (?, ?)")
          .bind(name, message)
          .run();

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" }
  });
}
