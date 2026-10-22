const db = require("./_db"), crypto = require("crypto");

// Solo aceptamos endpoints de los servicios de push conocidos
const HOSTS = ["fcm.googleapis.com", "push.services.mozilla.com", "push.apple.com", "notify.windows.com"];
const okEndpoint = (e) => {
  try {
    const u = new URL(e);
    return u.protocol === "https:" && HOSTS.some((h) => u.hostname === h || u.hostname.endsWith("." + h));
  } catch (x) { return false; }
};

module.exports = async (q, r) => {
  if (q.method !== "POST") return r.status(405).end();
  const b = q.body || {};
  if (!b.sub || !b.sub.endpoint || !okEndpoint(b.sub.endpoint)) return r.status(400).json({ e: "sub" });
  const id = crypto.createHash("sha1").update(b.sub.endpoint).digest("hex");

  // Baja: { sub, off: 1 } borra la suscripción y no llegan más avisos
  if (b.off) {
    await db.del("sub:" + id);
    await db.srem("subs", id);
    return r.status(200).json({ ok: 1, off: 1 });
  }

  const old = (await db.get("sub:" + id)) || {};
  await db.set("sub:" + id, {
    ...old, sub: b.sub, rt: String(b.rt || ""), days: Array.isArray(b.days) ? b.days : [],
    tz: +b.tz || 0, lw: +b.lw || 0, wd: String(b.wd || ""), name: String(b.name || "Plantita").slice(0, 20),
  });
  await db.sadd("subs", id);
  r.status(200).json({ ok: 1 });
};
