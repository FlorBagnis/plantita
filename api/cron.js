const db = require("./_db"), wp = require("web-push");
wp.setVapidDetails(process.env.VAPID_SUBJECT || "mailto:plantita@example.com", process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
module.exports = async (q, r) => {
  const sec = process.env.CRON_SECRET;
  // El secreto ahora es obligatorio
  if (!sec) return r.status(500).json({ e: "CRON_SECRET no configurado" });
  if (q.headers.authorization !== "Bearer " + sec && q.query.key !== sec) return r.status(401).end();
  const ids = (await db.smembers("subs")) || [], now = Date.now();
  let sent = 0;
  for (const id of ids) {
    const u = await db.get("sub:" + id);
    if (!u) { await db.srem("subs", id); continue; }
    const l = new Date(now - (u.tz || 0) * 6e4), hh = l.getUTCHours();
    const hm = ("0" + hh).slice(-2) + ":" + ("0" + l.getUTCMinutes()).slice(-2);
    const td = l.getUTCFullYear() + "-" + (l.getUTCMonth() + 1) + "-" + l.getUTCDate();
    if (hh >= 22 || hh < 7) continue;
    let t = null, b = "";
    if (u.rt && (u.days || []).includes(l.getUTCDay()) && hm >= u.rt && u.wd !== td && u.lr !== td) {
      u.lr = td; t = "Es la hora de " + u.name + " 🌱"; b = "Cumplí tus metas y dale agua.";
    } else if (u.lw && (now - u.lw) / 36e5 >= 12 && now - (u.ln || 0) > 6 * 36e5 && u.wd !== td) {
      u.ln = now; t = u.name + " tiene sed 🌱"; b = "Hace rato que no la regás. ¡Cumplí tus metas y dale agua!";
    }
    if (!t) continue;
    try { await wp.sendNotification(u.sub, JSON.stringify({ t, b }), { TTL: 3600 }); await db.set("sub:" + id, u); sent++; }
    catch (e) { if (e.statusCode === 404 || e.statusCode === 410) { await db.del("sub:" + id); await db.srem("subs", id); } }
  }
  r.status(200).json({ sent });
};
