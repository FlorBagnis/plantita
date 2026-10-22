module.exports = (q, r) => r.status(200).json({ key: process.env.VAPID_PUBLIC_KEY || "" });
