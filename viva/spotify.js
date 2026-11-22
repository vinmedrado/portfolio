(function(g){'use strict';
const CLIENT='viva-spotify-client-v1',PLAYLIST='viva-spotify-playlist-v1',TOKENS='viva-spotify-session-v1',PKCE='viva-spotify-pkce-v1';
const REDIRECT='https://vinmedrado.com/viva/', SCOPES='streaming user-read-playback-state user-modify-playback-state playlist-read-private playlist-read-collaborative';
let dock=null,player=null,device='',playlists=[],song='',artist='',playing=false,expanded=false,embedOpen=false,sdkLoading=null,notice='',refreshFlight=null;
const saved=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k)||'';v?localStorage.setItem(k,v):localStorage.removeItem(k)}catch{return ''}};
const temp=(k,v)=>{try{if(v===undefined)return sessionStorage.getItem(k)||'';v?sessionStorage.setItem(k,v):sessionStorage.removeItem(k)}catch{return ''}};
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const validId=x=>/^[A-Fa-f0-9]{32}$/.test(String(x||'').trim());
function playlistId(x){const s=String(x||'').trim();if(/^[a-zA-Z0-9]{22}$/.test(s))return s;
 const uri=/^spotify:playlist:([a-zA-Z0-9]{22})$/i.exec(s);if(uri)return uri[1];
 const url=/^https:\/\/(?:www\.)?open\.spotify\.com\/(?:intl-[a-z-]+\/)?playlist\/([a-zA-Z0-9]{22})(?:[/?#].*)?$/i.exec(s);return url?url[1]:''}
const selected=()=>saved(PLAYLIST),clientId=()=>saved(CLIENT);
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
 if(!state||state.state!==query.get('state')||Date.now()-state.time>600000){message('Não foi possível validar o login. Abra o VIVA no Safari e tente novamente.');return}
 try{authStore(await oauthRequest({client_id:clientId(),grant_type:'authorization_code',code,redirect_uri:REDIRECT,code_verifier:state.verifier}));expanded=true;message('Conectado. Toque em Ativar player para liberar o áudio.');loadSDK().catch(()=>{})}catch(e){message(e.message)}}
function button(action,label,disabled=false){return '<button type="button" data-spot="'+action+'"'+(disabled?' disabled':'')+'>'+label+'</button>'}
function panel(){const id=selected(),isAuth=!!auth();return '<p class="viva-spot-copy">Escolha sua playlist. A música continua independente do cronômetro e dos avisos por voz.</p>'+
 '<form id="spotify-playlist-form"><label>Link da playlist<input id="spotify-playlist-url" type="url" placeholder="https://open.spotify.com/playlist/..." autocomplete="off"></label><button type="submit">Salvar</button></form>'+
 (id?'<p class="viva-spot-note">Playlist salva neste aparelho.</p>'+button('embed',embedOpen?'Ocultar player oficial':'Abrir player oficial'):'<p class="viva-spot-note">Escolha uma playlist para começar.</p>')+
 '<div class="viva-spot-divider"></div>'+
 (isAuth?'<div class="viva-spot-buttons">'+button('activate',device?'Player ativo':'Ativar player',!!device)+button('list','Minhas playlists')+button('logout','Desconectar')+'</div>'+
 '<div class="viva-spot-buttons">'+button('prev','Anterior',!device)+button('play',playing?'Pausar':'Reproduzir',!device)+button('next','Próxima',!device)+'</div>'+
 (playlists.length?'<div class="viva-spot-list">'+playlists.map(p=>'<button type="button" data-spot-id="'+p.id+'">'+esc(p.name)+'</button>').join('')+'</div>':''):
 validId(clientId())?button('login','Conectar Spotify Premium'):'<p class="viva-spot-note">O player por link funciona sem cadastro de desenvolvedor. Para controles próprios, configure o Client ID abaixo.</p>')+
 '<details class="viva-spot-config"><summary>Configurar Spotify for Developers</summary><p>Crie um app em developer.spotify.com/dashboard, selecione Web Playback SDK e cadastre como Redirect URI exatamente <code>'+REDIRECT+'</code>. Autorize sua conta como usuário do app. Não informe Client Secret.</p>'+
 '<form id="spotify-client-form"><label>Client ID<input id="spotify-client-input" type="text" maxlength="32" spellcheck="false" autocomplete="off" placeholder="32 caracteres" value="'+esc(clientId())+'"></label><button type="submit">Salvar ID</button></form>'+
 '<p>O login usa PKCE. Os tokens ficam na sessão deste navegador e não entram no backup do VIVA.</p></details>'+
 '<p class="viva-spot-notice" role="status">'+esc(notice)+'</p>'}
function draw(){if(!dock)return;const bar=dock.querySelector('[data-spot-bar]'),body=dock.querySelector('[data-spot-body]'),frame=dock.querySelector('[data-spot-frame]');
 if(bar)bar.innerHTML='<span><strong>Spotify</strong><small>'+esc(song?song+(artist?' · '+artist:''):notice||'Música do treino')+'</small></span>'+button('toggle',expanded?'Fechar':'Abrir');
 if(body){body.innerHTML=panel();body.hidden=!expanded}if(frame)frame.hidden=!expanded||!embedOpen;dock.classList.toggle('is-open',expanded)}
function message(x){notice=String(x||'');draw()}
function embed(){const id=selected();if(!id){message('Escolha uma playlist.');return}const frame=dock.querySelector('[data-spot-frame]');embedOpen=!embedOpen;
 if(embedOpen&&frame&&!frame.querySelector('iframe')){const el=document.createElement('iframe');el.src='https://open.spotify.com/embed/playlist/'+id;el.title='Spotify — playlist do treino';el.setAttribute('allow','autoplay; encrypted-media; fullscreen; picture-in-picture');el.style.cssText='width:100%;height:152px;border:0;border-radius:12px';frame.appendChild(el)}
 expanded=true;message(embedOpen?'Use Play no player oficial. No iPhone, pode abrir o app Spotify.':'')}
function savePlaylist(raw){const id=playlistId(raw);if(!id){message('Cole um link de playlist Spotify, não de álbum ou música.');return false}saved(PLAYLIST,id);embedOpen=false;const frame=dock?.querySelector('[data-spot-frame]');if(frame)frame.innerHTML='';message('Playlist salva.');return true}
function loadSDK(){if(g.Spotify?.Player)return Promise.resolve();if(sdkLoading)return sdkLoading;sdkLoading=new Promise((resolve,reject)=>{const timeout=setTimeout(()=>reject(Error('Tempo esgotado ao carregar o Spotify.')),14000);g.onSpotifyWebPlaybackSDKReady=()=>{clearTimeout(timeout);resolve()};const tag=document.createElement('script');tag.src='https://sdk.scdn.co/spotify-player.js';tag.async=true;tag.onerror=()=>{clearTimeout(timeout);reject(Error('SDK do Spotify indisponível.'))};document.head.appendChild(tag)}).catch(e=>{sdkLoading=null;throw e});return sdkLoading}
async function activate(){if(!auth()){message('Conecte sua conta Premium primeiro.');return}if(!g.Spotify?.Player){message('Carregando SDK. Depois toque novamente em Ativar player.');await loadSDK().catch(e=>message(e.message));return}
 if(!player){player=new g.Spotify.Player({name:'VIVA - Música do treino',getOAuthToken:cb=>token().then(t=>cb(t||'')).catch(()=>cb('')),volume:.4});
  player.addListener('ready',x=>{device=x.device_id;message('Player pronto. Escolha sua playlist e toque em Reproduzir.')});
  player.addListener('not_ready',()=>{device='';message('Player desconectado. Confira a internet.')});
  player.addListener('player_state_changed',x=>{if(!x)return;playing=!x.paused;song=x.track_window?.current_track?.name||'';artist=(x.track_window?.current_track?.artists||[]).map(a=>a.name).join(', ');draw()});
  for(const name of ['initialization_error','authentication_error','account_error','playback_error'])player.addListener(name,()=>message(name==='account_error'?'Esta conta precisa ter Premium e estar autorizada no app.':'O Spotify não conseguiu iniciar o player.'));
 }
 try{player.activateElement?.();const result=await player.connect();if(!result)message('Não foi possível ativar o player. Teste no Safari.')}catch(e){message(e.message)}
}
async function play(){if(!device){message('Ative o player primeiro.');return}if(!selected()){message('Escolha uma playlist.');return}
 try{player.activateElement?.();if(playing){await player.pause();playing=false;message('Música pausada.');return}
  await api('/me/player/play?device_id='+encodeURIComponent(device),'PUT',{context_uri:'spotify:playlist:'+selected()});message('Reprodução iniciada. Se o Safari bloquear, toque em Reproduzir novamente.')
 }catch(e){message(e.message)}
}
async function myPlaylists(){try{const x=await api('/me/playlists?limit=30&offset=0');playlists=(x?.items||[]).filter(a=>playlistId(a?.id)).map(p=>({id:p.id,name:String(p.name||'Playlist').slice(0,85)}));message(playlists.length?'Escolha uma playlist.':'Nenhuma playlist encontrada. Cole um link.')}catch(e){message(e.message)}}
function logout(){try{player?.disconnect()}catch{}player=null;device='';playing=false;song='';artist='';playlists=[];temp(TOKENS,'');temp(PKCE,'');message('Conta desconectada deste navegador.')}
async function onClick(e){const b=e.target.closest('[data-spot],[data-spot-id]');if(!b)return;e.preventDefault();if(b.dataset.spotId){savePlaylist(b.dataset.spotId);return}switch(b.dataset.spot){
 case 'toggle':toggle();break;case 'login':await login();break;case 'activate':await activate();break;case 'list':await myPlaylists();break;case 'play':await play();break;case 'logout':logout();break;
 case 'prev':try{await player?.previousTrack()}catch{message('Não foi possível voltar.')}break;
 case 'next':try{await player?.nextTrack()}catch{message('Não foi possível avançar.')}break;
 case 'embed':embed();break;}}
function onSubmit(e){if(e.target.id==='spotify-playlist-form'){e.preventDefault();savePlaylist(dock.querySelector('#spotify-playlist-url')?.value);return}
 if(e.target.id==='spotify-client-form'){e.preventDefault();const id=(dock.querySelector('#spotify-client-input')?.value||'').trim();if(!validId(id)){message('Client ID inválido. Use 32 caracteres hexadecimais.');return}if(id!==clientId()){logout();saved(CLIENT,id)}message('Client ID salvo. Conecte sua conta Premium.')}}
function toggle(value){expanded=typeof value==='boolean'?value:!expanded;draw()}
function mount(el){if(!el)return;dock=el;dock.innerHTML='<div class="viva-spot-bar" data-spot-bar></div><div data-spot-body></div><div class="viva-spot-frame" data-spot-frame hidden></div>';dock.addEventListener('click',onClick);dock.addEventListener('submit',onSubmit);draw();callback().catch(e=>message(e.message));if(auth())loadSDK().catch(()=>{})}
g.VivaSpotify=Object.freeze({mount,toggle,playlistId,validId,savePlaylist,clientId,selected,get connected(){return !!device},get status(){return notice}});
})(window);