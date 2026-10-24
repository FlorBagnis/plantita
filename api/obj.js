// Sincronización de Plantita guardada en TU Upstash Redis.
//   POST /api/obj          -> crea, devuelve {id}
//   GET  /api/obj?id=XXXX  -> lee,   devuelve {id,name,data}
//   PUT  /api/obj?id=XXXX  -> guarda
// Usa las variables UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN.
const crypto = require("crypto");
const URL_ = process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const TTL = 60 * 60 * 24 * 400; // se renueva en cada guardado
const MAX = 900 * 1024;

async function redis(cmd) {
  const r = await fetch(URL_, {
    method: "POST",
    headers: { Authorization: "Bearer " + TOKEN, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
  });
  if (!r.ok) throw new Error("upstash " + r.status);
  return (await r.json()).result;
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  try {
    if (!URL_ || !TOKEN) return res.status(500).json({ error: "faltan variables de Upstash" });
    if (!["GET", "POST", "PUT"].includes(req.method)) return res.status(405).end();
    const id = req.method === "POST" ? crypto.randomBytes(16).toString("base64url") : String((req.query && req.query.id) || "");
    if (!/^[\w-]{6,64}$/.test(id)) return res.status(400).json({ error: "id inválido" });
    const key = "plantita:obj:" + id;

    if (req.method === "GET") {
      const v = await redis(["GET", key]);
      if (!v) return res.status(404).json({ error: "no existe" });
      return res.status(200).json({ id, ...JSON.parse(v) });
    }

    const b = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const txt = JSON.stringify({ name: String(b.name || "plantita").slice(0, 40), data: b.data });
    if (b.data === undefined) return res.status(400).json({ error: "falta data" });
    if (txt.length > MAX) return res.status(413).json({ error: "muy grande" });
    if (req.method === "PUT" && !(await redis(["EXISTS", key]))) return res.status(404).json({ error: "no existe" });
    await redis(["SET", key, txt, "EX", TTL]);
    return res.status(req.method === "POST" ? 201 : 200).json({ id });
  } catch (e) {
    return res.status(502).json({ error: "servidor" });
  }
};
