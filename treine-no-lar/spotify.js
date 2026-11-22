(function(g){'use strict';
const CLIENT='viva-spotify-client-v1',PLAYLIST='viva-spotify-playlist-v1',TOKENS='viva-spotify-session-v1',PKCE='viva-spotify-pkce-v1';
// Spotify Client ID is public; no Client Secret or access tokens are included in the bundle.
const DEFAULT_CLIENT_ID='c4e9fe8799bc44cb944b26cb54557e3d';
const REDIRECT=new URL('.', location.href).href, SCOPES='streaming user-read-playback-state user-modify-playback-state playlist-read-private playlist-read-collaborative';
let dock=null,player=null,device='',playlists=[],song='',artist='',cover='',trackUri='',album='',playlistName='',playlistArt='',playing=false,expanded=false,embedOpen=false,sdkLoading=null,notice='',refreshFlight=null,lastStarted='',renderedPanel='',refreshTimer=null,visibilityBound=false,sdkStateRevision=0;
const saved=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k)||'';v?localStorage.setItem(k,v):localStorage.removeItem(k)}catch{return ''}};
const temp=(k,v)=>{try{if(v===undefined)return sessionStorage.getItem(k)||'';v?sessionStorage.setItem(k,v):sessionStorage.removeItem(k)}catch{return ''}};
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const validId=x=>/^[A-Fa-f0-9]{32}$/.test(String(x||'').trim());
function playlistId(x){const s=String(x||'').trim();if(/^[a-zA-Z0-9]{22}$/.test(s))return s;
 const uri=/^spotify:playlist:([a-zA-Z0-9]{22})$/i.exec(s);if(uri)return uri[1];
 const url=/^https:\/\/(?:www\.)?open\.spotify\.com\/(?:intl-[a-z-]+\/)?playlist\/([a-zA-Z0-9]{22})(?:[/?#].*)?$/i.exec(s);return url?url[1]:''}
const selected=()=>saved(PLAYLIST),clientId=()=>saved(CLIENT)||DEFAULT_CLIENT_ID;

const IMAGE_DOMAIN=/^https:\/\/(?:i\.scdn\.co|mosaic\.scdn\.co|[a-z0-9.-]+\.spotifycdn\.com)\/[^\s"'<>]*$/i;
function safeImage(value){const url=String(value||'');return IMAGE_DOMAIN.test(url)?url:''}
function albumArt(data){return safeImage(data?.images?.[0]?.url||data?.images?.[1]?.url||'')}
function selectedDetails(){const item=playlists.find(x=>x.id===selected());return {name:item?.name||playlistName||'Playlist escolhida',image:item?.image||playlistArt||''}}
function setTrack(item,active){
 if(!item)return;
 const nextSong=String(item.name||''),nextArtist=Array.isArray(item.artists)?item.artists.map(a=>a.name||'').filter(Boolean).join(', '):'';
 const nextCover=albumArt(item.album),nextAlbum=String(item.album?.name||''),nextUri=String(item.uri||'');
 const changed=song!==nextSong||artist!==nextArtist||cover!==nextCover||playing!==!!active||album!==nextAlbum||trackUri!==nextUri;
 song=nextSong;artist=nextArtist;cover=nextCover;album=nextAlbum;trackUri=nextUri;playing=!!active;
 if(changed)draw();
}
function onSDKState(state){
 sdkStateRevision++;
 const current=state?.track_window?.current_track;if(current)setTrack(current,!state.paused);
 else if(state&&playing!==!state.paused){playing=!state.paused;draw()}
}
async function syncPlayback(){
 if(!auth())return;
 const revisionAtStart=sdkStateRevision;
 try{
  const x=await api('/me/player');
  if(revisionAtStart!==sdkStateRevision)return; // a newer SDK event wins over delayed API data
  if(x?.item){setTrack(x.item,!!x.is_playing);return}
  if(player?.getCurrentState){const state=await player.getCurrentState();if(state)onSDKState(state)}
 }catch{ /* Spotify SDK events keep the player useful when the API is unavailable */ }
}
function beginSync(){
 if(refreshTimer)return;
 refreshTimer=setInterval(()=>{if(auth()&&document.visibilityState!=='hidden'&&(expanded||playing))syncPlayback()},18000);
 if(!visibilityBound&&document?.addEventListener){visibilityBound=true;document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&auth())syncPlayback()})}
}

function auth(){try{const x=JSON.parse(temp(TOKENS));return x?.access_token?x:null}catch{return null}}
function authStore(x,previous){if(!x?.access_token||!Number(x.expires_in))throw Error('Resposta de login inválida.');const y={access_token:x.access_token,refresh_token:x.refresh_token||previous?.refresh_token||'',until:Date.now()+(Number(x.expires_in)-40)*1000};temp(TOKENS,JSON.stringify(y));return y}
async function oauthRequest(data){const r=await fetch('https://accounts.spotify.com/api/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(data)});if(!r.ok)throw Error('Falha ao autorizar no Spotify ('+r.status+').');return r.json()}
async function token(){const x=auth();if(!x)return '';if(x.until>Date.now()+20000)return x.access_token;if(!x.refresh_token){temp(TOKENS,'');return ''}
 if(!refreshFlight)refreshFlight=oauthRequest({grant_type:'refresh_token',client_id:clientId(),refresh_token:x.refresh_token}).then(y=>authStore(y,x).access_token).catch(()=>{temp(TOKENS,'');throw Error('Sessão expirada. Conecte novamente.')}).finally(()=>refreshFlight=null);return refreshFlight}
async function api(path,method='GET',body){const t=await token();if(!t)throw Error('Conecte sua conta Spotify.');const r=await fetch('https://api.spotify.com/v1'+path,{method,headers:{Authorization:'Bearer '+t,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});if(r.status===403)throw Error('Sem permissão: confira Premium e autorização do usuário no app Spotify.');if(r.status===429)throw Error('Limite de requisições do Spotify.');if(!r.ok)throw Error('Spotify retornou erro '+r.status+'.');return r.status===204?null:r.json()}
function secureString(n){const a=new Uint8Array(n);crypto.getRandomValues(a);return btoa(String.fromCharCode(...a)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}
async function login(){if(!validId(clientId())){message('Salve seu Client ID primeiro.');return}if(!crypto?.subtle){message('Use HTTPS para conectar o Spotify.');return}
 const verifier=secureString(48),state=secureString(24),hash=new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(verifier)));
 const challenge=btoa(String.fromCharCode(...hash)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
 temp(PKCE,JSON.stringify({verifier,state,time:Date.now()}));
 location.assign('https://accounts.spotify.com/authorize?'+new URLSearchParams({response_type:'code',client_id:clientId(),redirect_uri:REDIRECT,scope:SCOPES,state,code_challenge_method:'S256',code_challenge:challenge}).toString())}
async function callback(){const query=new URLSearchParams(location.search),code=query.get('code'),err=query.get('error');if(!code&&!err)return;
 let state;try{state=JSON.parse(temp(PKCE))}catch{}temp(PKCE,'');
 try{const u=new URL(location.href);u.searchParams.delete('code');u.searchParams.delete('state');u.searchParams.delete('error');history.replaceState(null,'',u.pathname+u.search+u.hash)}catch{}
 if(err){message('Conexão cancelada.');return}
 if(!state||state.state!==query.get('state')||Date.now()-state.time>600000){message('Não foi possível validar o login. Abra o Treine no Lar no Safari e tente novamente.');return}
 try{authStore(await oauthRequest({client_id:clientId(),grant_type:'authorization_code',code,redirect_uri:REDIRECT,code_verifier:state.verifier}));expanded=true;message('Conectado. Ative o player e escolha sua playlist.');loadSDK().catch(()=>{});myPlaylists();syncPlayback();beginSync()}catch(e){message(e.message)}}

function spotIcon(name){
 const paths={
  play:'<path d="M8 5.5 19 12 8 18.5Z" fill="currentColor" stroke="none"/>',
  pause:'<rect x="7" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none"/><rect x="13.5" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none"/>',
  prev:'<path d="M6 5v14M19 6 8 12l11 6z" stroke-width="2" stroke-linejoin="round"/>',
  next:'<path d="M18 5v14M5 6l11 6-11 6z" stroke-width="2" stroke-linejoin="round"/>',
  music:'<path d="M9 17V5l11-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
  close:'<path d="M5 12h14m-7-7 7 7-7 7"/>',
  chevron:'<path d="m6 9 6 6 6-6"/>',
  equalizer:'<path d="M4 14v-4m4 8V6m4 15V3m4 15V6m4 8v-4"/>',
  arrow:'<path d="M5 17 19 5m-9 0h9v9"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  list:'<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3" cy="6" r="1"/><circle cx="3" cy="12" r="1"/><circle cx="3" cy="18" r="1"/>'
 };
 return '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+(paths[name]||paths.music)+'</svg>';
}
function signal(){
 const path='M0 39 L20 40 L35 34 L54 35 L72 18 L86 22 L101 44 L119 40 L134 29 L147 32 L163 11 L180 17 L198 44 L216 38 L232 41 L246 25 L265 31 L284 17 L305 20 L323 42 L342 45 L361 28 L378 33 L390 13 L407 18 L425 39 L444 34 L464 47 L480 38 L501 37 L520 39';
 const wave='<svg class="viva-spot-signal-svg" viewBox="0 0 520 60" preserveAspectRatio="none"><path d="'+path+'" fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"/></svg>';
 return '<div class="viva-spot-signal" aria-hidden="true"><div class="viva-spot-signal-flow">'+wave+wave+'</div><span class="viva-spot-signal-glow"></span></div>';
}
function coverMarkup(url,small=false){
 const cls=small?'viva-spot-art viva-spot-art-mini':'viva-spot-art';
 return '<span class="'+cls+'">'+(safeImage(url)?'<img src="'+esc(url)+'" alt="" loading="lazy" referrerpolicy="no-referrer">':'<span class="viva-spot-art-fallback">'+spotIcon('music')+'</span>')+'</span>';
}
function button(action,label,disabled=false,variant=''){
 const aria={prev:'Faixa anterior',next:'Próxima faixa',play:playing?'Pausar música':'Reproduzir música',
  toggle:expanded?'Fechar player Spotify':'Abrir player Spotify',list:'Atualizar playlists',activate:'Ativar reprodução do Spotify'};
 return '<button type="button" class="viva-spot-button '+esc(variant)+'" data-spot="'+esc(action)+'"'
  +(aria[action]?' aria-label="'+aria[action]+'"':'')+(disabled?' disabled':'')+'>'+label+'</button>';
}
function playlistCards(){
 if(!playlists.length)return '<p class="mv3-empty">Nenhuma playlist carregada. Toque em Atualizar para buscar sua biblioteca.</p>';
 return '<div class="mv3-playlists">'+playlists.map(p=>{
  const active=p.id===selected(),now=active&&playing&&lastStarted===p.id;
  return '<button type="button" data-spot-id="'+esc(p.id)+'" class="mv3-playlist'+(active?' is-selected':'')+'" aria-pressed="'+active+'">'
   +coverMarkup(p.image,true)
   +'<span class="mv3-playlist-text"><b>'+esc(p.name)+'</b><small>'+(now?'Reproduzindo':active?'Selecionada · toque para ouvir':esc(p.owner||'Playlist'))+'</small></span>'
   +'<span class="mv3-playlist-icon">'+spotIcon(now?'equalizer':'play')+'</span></button>';
 }).join('')+'</div>';
}
function panel(){
 const id=selected(),authorized=!!auth(),details=selectedDetails(),hasTrack=!!song;
 const state=playing?'REPRODUZINDO':hasTrack?'PAUSADO':device?'PLAYER ATIVO':'AGUARDANDO PLAYER';
 return '<div class="mv3">'
  +'<div class="mv3-heading"><span><b>Spotify</b><small>MÚSICA DO TREINO</small></span><span class="mv3-status'+(playing?' is-live':'')+'"><i></i>'+state+'</span></div>'
  +'<section class="mv3-player" aria-label="Reprodutor Spotify">'
  +'<div class="mv3-now">'+coverMarkup(hasTrack?cover:'')
  +'<div class="mv3-now-text"><small>'+(playing?'TOCANDO AGORA':hasTrack?'ÚLTIMA FAIXA':'ESCOLHA SUA MÚSICA')+'</small>'
  +'<b>'+esc(song||'Nenhuma faixa tocando')+'</b><span>'+esc(artist||'Selecione uma playlist abaixo')+'</span></div></div>'
  +'<div class="mv3-market">'+signal()+'</div>'
  +'<div class="mv3-controls">'+button('prev',spotIcon('prev'),!device,'mv3-control-side')
  +button('play',spotIcon(playing?'pause':'play'),!device,'mv3-control-main')
  +button('next',spotIcon('next'),!device,'mv3-control-side')+'</div>'
  +'<div class="mv3-current-list"><span>'+spotIcon('list')+' <b>'+esc(id?details.name:'Nenhuma playlist selecionada')+'</b></span>'
  +'<small>'+(playing?'EM REPRODUÇÃO':id?'PRONTA PARA TOCAR':'SELECIONE ABAIXO')+'</small></div>'
  +'</section>'
  +'<div class="mv3-library-title"><div><small>SUA BIBLIOTECA</small><h3>Playlists</h3></div>'
  +button('list',spotIcon('list')+' Atualizar',!authorized,'mv3-refresh')+'</div>'
  +(authorized?playlistCards():'<p class="mv3-empty">Conecte sua conta Premium para acessar suas playlists.</p>')
  +'<details class="mv3-expand"><summary>Adicionar playlist por link</summary>'
  +'<form id="spotify-playlist-form"><label for="spotify-playlist-url">Link do Spotify</label><div><input id="spotify-playlist-url" type="url" placeholder="Cole o link da playlist" autocomplete="off"><button type="submit">Salvar</button></div></form>'
  +(id?button('embed','Abrir player oficial '+spotIcon('arrow'),false,'mv3-embed'):'')
  +'</details>'
  +'<div class="mv3-connect">'+(authorized?
   button('activate',device?'Player conectado':'Ativar player',!!device,'mv3-activate')+button('logout','Desconectar',false,'mv3-disconnect'):
   button('login','Conectar Spotify Premium',false,'mv3-activate'))+'</div>'
  +'<details class="viva-spot-config mv3-expand"><summary>Configuração avançada</summary>'
  +'<p>O Spotify já está integrado ao Treine no Lar. O Client ID pode ser alterado aqui, sem compartilhar Client Secret.</p>'
  +'<form id="spotify-client-form"><label for="spotify-client-input">Client ID</label><input id="spotify-client-input" type="text" maxlength="32" spellcheck="false" autocomplete="off" value="'+esc(clientId())+'"><button type="submit">Salvar ID</button></form>'
  +'<p>URL de retorno: <code>'+REDIRECT+'</code>. Login PKCE; seus tokens não entram no backup do Treine no Lar.</p></details>'
  +'<p class="mv3-notice" role="status" aria-live="polite">'+esc(notice)+'</p></div>';
}
function draw(){
 if(!dock)return;
 const bar=dock.querySelector('[data-spot-bar]'),body=dock.querySelector('[data-spot-body]'),frame=dock.querySelector('[data-spot-frame]');
 const mini='<div class="viva-spot-mini">'+coverMarkup(cover||selectedDetails().image,true)
  +'<span class="viva-spot-mini-text"><b>'+esc(song||'Spotify · Música do treino')+'</b><small>'+esc(artist||selectedDetails().name)+'</small></span>'
  +'<span class="viva-spot-mini-signal">'+signal()+'</span></div>'
  +button('toggle',expanded?spotIcon('close'):spotIcon('chevron'),false,'is-minimize');
 if(bar&&bar.innerHTML!==mini)bar.innerHTML=mini;
 const newPanel=panel();
 if(body&&renderedPanel!==newPanel){
  const scroll=body.scrollTop;
  const details=[...body.querySelectorAll('.mv3-expand')].map(el=>el.open);
  body.innerHTML=newPanel;renderedPanel=newPanel;body.scrollTop=scroll;
  [...body.querySelectorAll('.mv3-expand')].forEach((el,i)=>{el.open=!!details[i]});
 }
 if(body)body.hidden=!expanded;
 if(frame)frame.hidden=!expanded||!embedOpen;
 dock.classList.toggle('is-open',expanded);
 dock.classList.toggle('is-used',!!selected()||!!auth());
 dock.classList.toggle('is-playing',playing);
}

function message(x){notice=String(x||'');draw()}
function embed(){const id=selected();if(!id){message('Escolha uma playlist.');return}const frame=dock.querySelector('[data-spot-frame]');embedOpen=!embedOpen;
 if(embedOpen&&frame&&!frame.querySelector('iframe')){const el=document.createElement('iframe');el.src='https://open.spotify.com/embed/playlist/'+id;el.title='Spotify — playlist do treino';el.setAttribute('allow','autoplay; encrypted-media; fullscreen; picture-in-picture');el.style.cssText='width:100%;height:152px;border:0;border-radius:12px';frame.appendChild(el)}
 expanded=true;message(embedOpen?'Use Play no player oficial. No iPhone, pode abrir o app Spotify.':'')}
function savePlaylist(raw){const id=playlistId(raw);if(!id){message('Cole um link de playlist Spotify, não de álbum ou música.');return false}const previous=selected();saved(PLAYLIST,id);if(previous!==id)lastStarted='';const chosen=playlists.find(p=>p.id===id);playlistName=chosen?.name||'Playlist escolhida';playlistArt=chosen?.image||'';embedOpen=false;const frame=dock?.querySelector('[data-spot-frame]');if(frame)frame.innerHTML='';message('Playlist salva.');return true}
function loadSDK(){if(g.Spotify?.Player)return Promise.resolve();if(sdkLoading)return sdkLoading;sdkLoading=new Promise((resolve,reject)=>{const timeout=setTimeout(()=>reject(Error('Tempo esgotado ao carregar o Spotify.')),14000);g.onSpotifyWebPlaybackSDKReady=()=>{clearTimeout(timeout);resolve()};const tag=document.createElement('script');tag.src='https://sdk.scdn.co/spotify-player.js';tag.async=true;tag.onerror=()=>{clearTimeout(timeout);reject(Error('SDK do Spotify indisponível.'))};document.head.appendChild(tag)}).catch(e=>{sdkLoading=null;throw e});return sdkLoading}
async function activate(){if(!auth()){message('Conecte sua conta Premium primeiro.');return}if(!g.Spotify?.Player){message('Carregando SDK. Depois toque novamente em Ativar player.');await loadSDK().catch(e=>message(e.message));return}
 if(!player){player=new g.Spotify.Player({name:'Treine no Lar - Música do treino',getOAuthToken:cb=>token().then(t=>cb(t||'')).catch(()=>cb('')),volume:.4});
  player.addListener('ready',x=>{device=x.device_id;message('Player ativo. Toque em uma playlist para iniciar a música.');syncPlayback()});
  player.addListener('not_ready',()=>{device='';message('Player desconectado. Confira a internet.')});
  player.addListener('player_state_changed',onSDKState);
  for(const name of ['initialization_error','authentication_error','account_error','playback_error'])player.addListener(name,()=>message(name==='account_error'?'Esta conta precisa ter Premium e estar autorizada no app.':'O Spotify não conseguiu iniciar o player.'));
 }
 try{player.activateElement?.();const result=await player.connect();if(!result)message('Não foi possível ativar o player. Teste no Safari.')}catch(e){message(e.message)}
}

async function startPlaylist(id){
 if(!playlistId(id)){message('Escolha uma playlist válida.');return false}
 // On iOS activateElement must be called synchronously from the playlist tap before awaiting an API call.
 try{player?.activateElement?.()}catch{}
 if(!device){
  message('Playlist selecionada. Toque em Ativar player e depois na playlist para reproduzir.');
  return false;
 }
 if(playing&&lastStarted===id){message('Esta playlist já está tocando.');return true}
 try{
  await api('/me/player/play?device_id='+encodeURIComponent(device),'PUT',{context_uri:'spotify:playlist:'+id});
  lastStarted=id;playing=true;message('Reproduzindo a playlist selecionada.');
  syncPlayback();return true;
 }catch(e){message(e.message);return false}
}
async function play(){
 if(!device){message('Ative o player primeiro.');return}
 try{player?.activateElement?.()}catch{}
 const id=selected();
 if(playing&&(!lastStarted||lastStarted===id)){
  try{await player.pause();playing=false;message('Música pausada.')}catch(e){message('Não foi possível pausar. '+e.message)}
  return;
 }
 if(!id){message('Escolha uma playlist.');return}
 if(lastStarted===id&&typeof player?.getCurrentState==='function'){
  try{
   const state=await player.getCurrentState();
   if(state?.paused){await player.resume();playing=true;message('Música retomada.');syncPlayback();return}
  }catch{}
 }
 await startPlaylist(id);
}
async function myPlaylists(){
 try{
  const result=await api('/me/playlists?limit=30&offset=0');
  playlists=(result?.items||[]).filter(p=>playlistId(p?.id)).map(p=>({
    id:p.id,name:String(p.name||'Playlist').slice(0,90),owner:String(p.owner?.display_name||'').slice(0,55),
    image:albumArt(p)
  }));
  const active=playlists.find(p=>p.id===selected());
  if(active){playlistName=active.name;playlistArt=active.image}
  message(playlists.length?'Escolha uma playlist. Um toque seleciona e reproduz.':'Nenhuma playlist encontrada. Cole o link de uma playlist.');
 }catch(e){message('Não foi possível carregar suas playlists: '+e.message)}
}

function logout(){try{player?.disconnect()}catch{}player=null;device='';playing=false;song='';artist='';cover='';album='';trackUri='';playlists=[];lastStarted='';renderedPanel='';temp(TOKENS,'');temp(PKCE,'');message('Conta desconectada deste navegador.')}
async function onClick(e){const b=e.target.closest('[data-spot],[data-spot-id]');if(!b)return;e.preventDefault();if(b.dataset.spotId){const id=b.dataset.spotId;try{player?.activateElement?.()}catch{}if(savePlaylist(id)){await startPlaylist(id)}return}switch(b.dataset.spot){
 case 'toggle':toggle();break;case 'login':await login();break;case 'activate':await activate();break;case 'list':await myPlaylists();break;case 'play':await play();break;case 'logout':logout();break;
 case 'prev':try{await player?.previousTrack()}catch{message('Não foi possível voltar.')}break;
 case 'next':try{await player?.nextTrack()}catch{message('Não foi possível avançar.')}break;
 case 'embed':embed();break;}}
function onSubmit(e){if(e.target.id==='spotify-playlist-form'){e.preventDefault();savePlaylist(dock.querySelector('#spotify-playlist-url')?.value);return}
 if(e.target.id==='spotify-client-form'){e.preventDefault();const id=(dock.querySelector('#spotify-client-input')?.value||'').trim();if(!validId(id)){message('Client ID inválido. Use 32 caracteres hexadecimais.');return}if(id!==clientId()){logout();saved(CLIENT,id)}message('Client ID salvo. Conecte sua conta Premium.')}}
function toggle(value){expanded=typeof value==='boolean'?value:!expanded;draw()}
function mount(el){if(!el)return;dock=el;dock.innerHTML='<div class="viva-spot-bar" data-spot-bar></div><div data-spot-body></div><div class="viva-spot-frame" data-spot-frame hidden></div>';dock.addEventListener('click',onClick);dock.addEventListener('submit',onSubmit);draw();callback().catch(e=>message(e.message));if(auth()){loadSDK().catch(()=>{});myPlaylists();syncPlayback();beginSync()}}
g.VivaSpotify=Object.freeze({mount,toggle,playlistId,validId,savePlaylist,safeImage,clientId,selected,get connected(){return !!device},get nowPlaying(){return {song,artist,cover,album,playing,playlist:selected()}},get status(){return notice}});
})(window);