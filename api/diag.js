module.exports = (q, r) => {
  const e = process.env, out = {};
  ["VAPID_PUBLIC_KEY", "VAPID_PRIVATE_KEY", "VAPID_SUBJECT", "CRON_SECRET", "KV_REST_API_URL", "KV_REST_API_TOKEN", "UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"].forEach((k) => {
    out[k] = e[k] ? (e[k] !== e[k].trim() ? "TIENE ESPACIOS " : "") + "largo " + e[k].length : "FALTA";
  });
  out.subject_empieza_con_mailto = /^mailto:/.test(e.VAPID_SUBJECT || "");
  ["web-push", "@upstash/redis"].forEach((m) => {
    try { require(m); out[m] = "ok"; } catch (x) { out[m] = "NO SE ENCUENTRA"; }
  });
  r.status(200).json(out);
};
