const V="plantita-v2",CORE=["./","index.html","manifest.webmanifest"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>0)))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==V&&n!=="plantita-cfg").map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
const ext=/fonts\.(googleapis|gstatic)\.com|cdnjs\.cloudflare\.com/.test(u.host);
if(u.origin!==location.origin&&!ext)return;
if(ext){e.respondWith(caches.match(r).then(h=>h||fetch(r).then(n=>{const c=n.clone();caches.open(V).then(x=>x.put(r,c));return n}).catch(()=>h)));return}
e.respondWith(fetch(r).then(n=>{const c=n.clone();caches.open(V).then(x=>x.put(r,c));return n}).catch(()=>caches.match(r).then(h=>h||caches.match("index.html"))))});
async function check(){const c=await caches.open("plantita-cfg"),r=await c.match("cfg.json");if(!r)return;const s=await r.json();if(!s.on)return;
const n=new Date(),hh=n.getHours();if(hh>=22||hh<7)return;
const hm=("0"+hh).slice(-2)+":"+("0"+n.getMinutes()).slice(-2),td=n.getFullYear()+"-"+(n.getMonth()+1)+"-"+n.getDate();
let t=null,b="";
if(s.rt&&(s.days||[]).includes(n.getDay())&&hm>=s.rt&&s.wd!==td&&s.lr!==td){s.lr=td;t="Es la hora de tu plantita 🌱";b="Cumplí tus metas y dale agua."}
else if((Date.now()-s.lw)/36e5>=12&&Date.now()-(s.ln||0)>6*36e5&&s.wd!==td){s.ln=Date.now();t="Plantita tiene sed 🌱";b="Hace rato que no la regás. ¡Cumplí tus metas y dale agua!"}
if(!t)return;await c.put("cfg.json",new Response(JSON.stringify(s)));return self.registration.showNotification(t,{body:b,tag:"plantita"})}
self.addEventListener("periodicsync",e=>{if(e.tag==="plantita-remind")e.waitUntil(check())});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(l=>l.length?l[0].focus():self.clients.openWindow("./")))});
