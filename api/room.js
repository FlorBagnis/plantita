const db = require("./_db");
const clean = (s) => String(s || "").slice(0, 20);
const TTL = 60 * 60 * 24 * 90;
const MAX = 12;
const key = (c) => "roomv2:" + c;

module.exports = async (q, r) => {
  const b = q.method === "POST" ? q.body || {} : q.query || {};

  if (b.a === "create") {
    // hsetnx: si el código ya existe no pisa la sala, prueba con otro
    for (let i = 0; i < 5; i++) {
      const code = Math.random().toString(36).slice(2, 8).toUpperCase();
      if (code.length < 6) continue;
      if (await db.hsetnx(key(code), "_", 1)) {
        await db.expire(key(code), TTL);
        return r.status(200).json({ code });
      }
    }
    return r.status(500).json({ e: "code" });
  }

  const code = String(b.code || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!code) return r.status(400).json({ e: "code" });

  let m = await db.hgetall(key(code));
  if (!m) {
    // Salas viejas (formato anterior): se migran una sola vez
    const old = await db.get("room:" + code);
    if (!old) return r.status(404).json({ e: "nf" });
    await db.hset(key(code), { _: 1, ...(old.m || {}) });
    await db.expire(key(code), TTL);
    await db.del("room:" + code);
    m = { _: 1, ...(old.m || {}) };
  }

  if (b.a === "put" && b.id) {
    const id = String(b.id).slice(0, 24);
    if (id === "_") return r.status(400).json({ e: "id" });
    if (!m[id] && Object.keys(m).length - 1 >= MAX) return r.status(400).json({ e: "full" });
    const me = { n: clean(b.n), w: Math.max(0, +b.w || 0), s: Math.max(0, +b.s || 0), g: String(b.g || "").slice(0, 40), u: Date.now() };
    // Se guarda solo este integrante: dos personas a la vez ya no se pisan
    await db.hset(key(code), { [id]: me });
    await db.expire(key(code), TTL);
    m[id] = me;
  }

  delete m._;
  r.status(200).json({ m });
};
