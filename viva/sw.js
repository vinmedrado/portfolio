/* VIVA — offline-first asset cache (same-origin, app scope only). */
const CACHE='viva-cache-20261122-r15';
const CORE=['./','./index.html','./coach.js?v=4','./exercises.js?v=2','./evolution.js?v=3','./evolution-ui.js?v=2','./training.js?v=4','./guide.js?v=1','./backup.js?v=4','./spotify.js?v=3','./manifest.webmanifest','./favicon.svg'];
self.addEventListener('install',event=>{
 event.waitUntil((async()=>{const cache=await caches.open(CACHE);await cache.addAll(CORE);await self.skipWaiting()})());
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('viva-cache-')&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})());
});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET')return;
 const url=new URL(req.url);
 if(url.origin!==self.location.origin||!url.pathname.startsWith(new URL('./',self.registration.scope).pathname))return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  try{
   const net=await fetch(req);
   if(net&&net.ok)cache.put(req,net.clone()).catch(()=>{});
   return net;
  }catch(err){
   const cached=await cache.match(req,{ignoreSearch:true});
   if(cached)return cached;
   if(req.mode==='navigate')return await cache.match('./index.html')||await cache.match('./');
   throw err;
  }
 })());
});
