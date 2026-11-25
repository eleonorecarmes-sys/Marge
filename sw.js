const C='marge-v28';const A=['./','./index.html','./manifest.json','./icon-180.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>fetch(new Request(u,{cache:'reload'})).then(r=>c.put(u,r))))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(new Request(e.request,{cache:'no-cache'})).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp))}return res}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))))});
