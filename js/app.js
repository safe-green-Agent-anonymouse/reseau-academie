/* RéseauAcadémie — routeur, pages, navigation, recherche */
(function(){
const app=document.getElementById("app");
const LEVELS=[{n:"Zéro",icon:"🐣",d:"Aucune connaissance : on part de rien, sans jargon."},{n:"Débutant",icon:"🟢",d:"Les bases solides : OSI, IP, Ethernet, services, outils."},{n:"Pro",icon:"🟠",d:"Niveau technicien / administrateur : subnetting, VLAN, routage, sécurité, Cisco."},{n:"Expert",icon:"🔴",d:"Ingénieur réseau : BGP, QoS, MPLS, VXLAN, SDN, automatisation."}];
const badge=l=>`<span class="level-badge lv${l}">${LEVELS[l].icon} ${LEVELS[l].n}</span>`;
const esc=s=>String(s).replace(/[&<>"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));
const strip=h=>h.replace(/<[^>]+>/g," ").replace(/&[a-z]+;/g," ").replace(/\s+/g," ");
const ordered=()=>{ const order=CATEGORIES.map(c=>c.id); return LESSONS.slice().sort((a,b)=>order.indexOf(a.cat)-order.indexOf(b.cat)); };

const GLOSSARY=[
["ACL","Access Control List : liste de règles qui autorise ou refuse du trafic."],["Adresse IP","Identifiant logique d'une interface sur un réseau IP (32 bits en IPv4, 128 en IPv6)."],["Adresse MAC","Identifiant physique de 48 bits d'une carte réseau."],["APIPA","Adresse 169.254.x.x auto-attribuée faute de serveur DHCP."],["ARP","Protocole qui trouve l'adresse MAC correspondant à une IPv4 locale."],["AS","Système autonome : ensemble de réseaux sous une même politique de routage (BGP)."],
["Bande passante","Capacité maximale d'un lien, en bit/s."],["BGP","Border Gateway Protocol : protocole de routage entre AS, celui d'Internet."],["Broadcast","Diffusion à tous les hôtes d'un réseau local."],["CIDR","Classless Inter-Domain Routing : notation /n du masque et fin des classes."],["CSMA/CD","Méthode d'accès Ethernet half-duplex avec détection de collision."],["CSMA/CA","Méthode d'accès Wi-Fi avec évitement de collision."],
["DHCP","Attribue automatiquement la configuration IP (DORA)."],["DMZ","Zone réseau isolée hébergeant les serveurs exposés à Internet."],["DNS","Système de résolution de noms de domaine en adresses IP."],["Domaine de broadcast","Ensemble des hôtes recevant un broadcast ; délimité par les routeurs."],["Domaine de collision","Segment où deux émissions simultanées entrent en collision."],["DSCP","Champ de 6 bits de l'en-tête IP pour la QoS."],
["Encapsulation","Ajout des en-têtes de chaque couche en descendant la pile."],["Ethernet","Technologie LAN filaire normalisée IEEE 802.3."],["FCS","Frame Check Sequence : CRC en fin de trame pour détecter les erreurs."],["Fibre optique","Support transmettant la lumière, monomode ou multimode."],["Full-duplex","Émission et réception simultanées."],["Gigue","Variation de la latence (jitter)."],
["HTTP / HTTPS","Protocole du Web ; HTTPS ajoute le chiffrement TLS."],["Hub","Concentrateur de couche 1 qui répète le signal sur tous ses ports."],["ICMP","Protocole de messages de contrôle et d'erreur (ping, traceroute)."],["IPsec","Suite de protocoles de sécurisation d'IP (VPN)."],["IPv6","Version 6 d'IP, adresses de 128 bits."],["LAN","Réseau local."],
["Latence","Délai de transmission d'un paquet (ms)."],["MPLS","Commutation par labels utilisée par les opérateurs."],["MTU","Taille maximale de la charge utile d'une trame (1500 octets en Ethernet)."],["Masque de sous-réseau","Sépare la partie réseau et la partie hôte d'une adresse IP."],["NAT / PAT","Traduction d'adresses privées en adresse(s) publique(s)."],["NDP","Neighbor Discovery Protocol : remplace ARP en IPv6."],
["OSI","Modèle de référence en 7 couches."],["OSPF","Protocole de routage à état de liens."],["Paquet","PDU de la couche 3."],["Passerelle par défaut","Routeur auquel un hôte envoie les paquets destinés à d'autres réseaux."],["Ping","Outil de test de connectivité (ICMP Echo)."],["PoE","Alimentation électrique via le câble Ethernet."],
["Port","Numéro de 16 bits identifiant une application (couche 4)."],["QoS","Qualité de service : priorisation du trafic."],["RADIUS","Protocole d'authentification centralisée (802.1X, VPN)."],["RFC","Request For Comments : documents normatifs de l'IETF."],["RIP","Protocole de routage à vecteur de distance (métrique : sauts)."],["Routeur","Équipement de couche 3 qui achemine les paquets entre réseaux."],
["SDN","Software-Defined Networking : contrôle centralisé et programmable."],["Segment","PDU TCP de la couche 4."],["SLAAC","Auto-configuration d'adresse IPv6 sans état."],["SSH","Accès distant chiffré (port 22)."],["SSID","Nom d'un réseau Wi-Fi."],["STP","Spanning Tree Protocol : supprime les boucles de couche 2."],
["Subnetting","Découpage d'un réseau en sous-réseaux."],["Switch","Commutateur de couche 2 qui transmet les trames selon la MAC."],["TCP","Protocole de transport fiable orienté connexion."],["TLS","Protocole de chiffrement des communications (HTTPS)."],["Trame","PDU de la couche 2."],["Trunk","Lien transportant plusieurs VLAN tagués 802.1Q."],
["TTL","Time To Live : compteur décrémenté à chaque routeur."],["UDP","Protocole de transport léger sans connexion."],["VLAN","Réseau local virtuel : domaine de broadcast logique."],["VLSM","Masques de sous-réseau de longueur variable."],["VPN","Réseau privé virtuel : tunnel chiffré au travers d'un réseau public."],["VXLAN","Encapsulation L2 dans UDP pour les data centers (VNI 24 bits)."],
["WAN","Réseau étendu (Internet, liaisons inter-sites)."],["Wi-Fi","Réseau local sans fil IEEE 802.11."],["Wildcard","Masque inversé utilisé par les ACL et OSPF."],["WPA3","Protocole de sécurité Wi-Fi le plus récent (SAE)."],["Zero Trust","Modèle de sécurité : ne jamais faire confiance, toujours vérifier."]
];

/* ---------- Sidebar & progression ---------- */
function progress(){ const d=STORE.get(), done=d.done||{}; const n=LESSONS.filter(l=>done[l.id]).length; const pct=Math.round(n/LESSONS.length*100);
  document.getElementById("progressPct").textContent=`${pct}% (${n}/${LESSONS.length})`; document.getElementById("progressFill").style.width=pct+"%"; return {done,n,pct}; }
function sidebar(active){ const {done}=progress(); let h=`<h4>Navigation</h4><a href="#/"${active==="home"?' class="active"':""}>🏠 Accueil</a><a href="#/parcours">🧭 Parcours par niveau</a><a href="#/sandbox">🖥️ Sandbox terminal</a><a href="#/outils">🧰 Outils</a><a href="#/exercices">🏋️ Exercices</a><a href="#/examen">🎓 Examen blanc</a><a href="#/ressources">📚 Ressources</a><a href="#/glossaire">📖 Glossaire</a>`;
  let k=0; CATEGORIES.forEach(c=>{ const ls=ordered().filter(l=>l.cat===c.id); if(!ls.length) return; h+=`<h4>${c.name}</h4>`; ls.forEach(l=>{ k++; h+=`<a href="#/cours/${l.id}" class="${active===l.id?"active ":""}${done[l.id]?"done":""}"><span class="num">${done[l.id]?"✓":k}</span>${l.icon} ${esc(l.title)}</a>`; }); });
  document.getElementById("sideNav").innerHTML=h; }

/* ---------- Pages ---------- */
function home(){ const {n,pct}=progress(); const nq=LESSONS.reduce((s,l)=>s+l.quiz.length,0);
  const next=ordered().find(l=>!(STORE.get().done||{})[l.id]);
  app.innerHTML=`<section class="hero"><h1>Apprenez les réseaux informatiques,<br>de zéro jusqu'au niveau expert.</h1>
  <p class="lead">Un cours complet et gratuit en français : modèle OSI, TCP/IP, adressage IP, sous-réseaux, routage, VLAN, DNS, sécurité, Wi-Fi, BGP, automatisation… avec des <b>sandbox terminal</b> Linux / Windows / Cisco, des <b>outils</b>, des <b>exercices illimités</b> et des <b>quiz</b>.</p>
  <div class="btns"><a class="btn primary" href="#/cours/${next?next.id:"zero"}">${n?"▶ Continuer : "+esc(next?next.title:"Révisions"):"🚀 Commencer à zéro"}</a><a class="btn" href="#/parcours">🧭 Choisir mon niveau</a><a class="btn" href="#/sandbox">🖥️ Ouvrir le terminal</a></div>
  <div class="stats"><div class="stat"><b>${LESSONS.length}</b>chapitres</div><div class="stat"><b>${nq}</b>questions de quiz</div><div class="stat"><b>4</b>terminaux simulés</div><div class="stat"><b>∞</b>exercices générés</div><div class="stat"><b>${pct}%</b>votre progression</div></div></section>
  <h2>Choisissez votre niveau</h2>
  <div class="grid">${LEVELS.map((L,i)=>`<a class="card" href="#/parcours#lv${i}"><div class="ico">${L.icon}</div><h3>${L.n}</h3><p>${L.d}</p><p style="margin-top:8px"><span class="tag">${LESSONS.filter(l=>l.level===i).length} chapitres</span></p></a>`).join("")}</div>
  <h2>Pratiquer</h2>
  <div class="grid">
   <a class="card" href="#/sandbox/linux"><div class="ico">🐧</div><h3>Terminal Linux</h3><p>ip, ping, dig, traceroute, ss, curl, nmap, dhclient…</p></a>
   <a class="card" href="#/sandbox/cmd"><div class="ico">🪟</div><h3>Windows CMD & PowerShell</h3><p>ipconfig, tracert, nslookup, Test-NetConnection…</p></a>
   <a class="card" href="#/sandbox/ios"><div class="ico">🔷</div><h3>Routeur Cisco IOS</h3><p>Modes, interfaces, routes, VLAN, show, sauvegarde.</p></a>
   <a class="card" href="#/exercices"><div class="ico">✂️</div><h3>Subnetting illimité</h3><p>Questions aléatoires avec correction détaillée.</p></a>
   <a class="card" href="#/outils"><div class="ico">🧮</div><h3>Calculateurs</h3><p>IPv4, VLSM, IPv6, binaire, débit.</p></a>
   <a class="card" href="#/examen"><div class="ico">🎓</div><h3>Examen blanc</h3><p>Chronométré, par niveau.</p></a>
  </div>
  <h2>Tous les chapitres</h2>${courseGrid()}`; }
function courseGrid(filter){ const done=STORE.get().done||{}, sc=STORE.get().scores||{};
  return CATEGORIES.map(c=>{ const ls=ordered().filter(l=>l.cat===c.id&&(!filter||filter(l))); if(!ls.length) return ""; return `<h3>${c.name}</h3><div class="grid">${ls.map(l=>`<a class="card" href="#/cours/${l.id}"><div class="ico">${l.icon}</div><h3>${esc(l.title)}</h3><p>${esc(l.summary)}</p><p style="margin-top:10px">${badge(l.level)} <span class="tag">⏱ ${l.duration} min</span>${done[l.id]?'<span class="tag done">✓ terminé</span>':""}${sc[l.id]!=null?`<span class="tag">Quiz ${sc[l.id]} %</span>`:""}</p></a>`).join("")}</div>`; }).join(""); }
function courses(){ app.innerHTML=`<div class="breadcrumbs"><a href="#/">Accueil</a> › Cours</div><h1>📚 Tous les cours</h1>
  <div class="form-row"><label>Filtrer par niveau<select id="lvf"><option value="">Tous les niveaux</option>${LEVELS.map((L,i)=>`<option value="${i}">${L.icon} ${L.n}</option>`).join("")}</select></label></div><div id="cg">${courseGrid()}</div>`;
  app.querySelector("#lvf").onchange=e=>{ const v=e.target.value; app.querySelector("#cg").innerHTML=courseGrid(v===""?null:l=>l.level===+v); }; }
function parcours(){ app.innerHTML=`<div class="breadcrumbs"><a href="#/">Accueil</a> › Parcours</div><h1>🧭 Parcours d'apprentissage</h1>
  <p class="lead">Suivez le parcours correspondant à votre niveau. Chaque étape combine un chapitre, de la pratique en sandbox et un quiz. Un chapitre est validé à partir de 80 % au quiz (ou en le marquant comme terminé).</p>
  ${LEVELS.map((L,i)=>{ const ls=ordered().filter(l=>l.level===i); const done=STORE.get().done||{}; const extra={0:[["🖥️ Sandbox Linux : tapez « ping google.fr » et « ip addr »","#/sandbox/linux"],["🔢 Exercice : conversion binaire","#/exercices"]],1:[["🪟 Missions Windows CMD et PowerShell","#/sandbox/cmd"],["🚪 Exercice : mémoriser les ports","#/exercices"],["🎓 Examen blanc niveau Débutant","#/examen"]],2:[["✂️ 20 exercices de subnetting d'affilée","#/exercices"],["🔷 Missions Cisco IOS","#/sandbox/ios"],["📐 Construire un plan VLSM","#/outils"],["🧪 Installer Packet Tracer ou GNS3 et refaire le lab Cisco","#/ressources"]],3:[["📖 Lire les RFC 4271 (BGP) et 7348 (VXLAN)","#/ressources"],["🧪 Monter un lab BGP/EVPN avec Containerlab + FRRouting","#/ressources"],["🎓 Examen blanc niveau Expert","#/examen"]]}[i];
   return `<section class="path" id="lv${i}"><h2>${L.icon} Niveau ${L.n} ${badge(i)}</h2><p class="muted">${L.d}</p><ol>${ls.map(l=>`<li><a href="#/cours/${l.id}">${l.icon} ${esc(l.title)}</a> <span class="tag">⏱ ${l.duration} min</span>${done[l.id]?'<span class="tag done">✓</span>':""}</li>`).join("")}${extra.map(([t,u])=>`<li><a href="${u}">${t}</a></li>`).join("")}</ol></section>`; }).join("")}`; }

function lesson(id){ const ls=ordered(); const idx=ls.findIndex(l=>l.id===id); if(idx<0) return notFound(); const l=ls[idx]; const done=(STORE.get().done||{})[l.id];
  const cat=CATEGORIES.find(c=>c.id===l.cat);
  app.innerHTML=`<div class="breadcrumbs"><a href="#/">Accueil</a> › <a href="#/cours">Cours</a> › ${cat.name}</div>
  <h1>${l.icon} ${esc(l.title)}</h1><p>${badge(l.level)} <span class="tag">⏱ ${l.duration} min</span> <span class="tag">${cat.name}</span></p>
  <article>${l.content}</article>
  <div class="keypoints"><h3>🔑 Points clés à retenir</h3><ul>${l.keypoints.map(k=>`<li>${esc(k)}</li>`).join("")}</ul></div>
  <div id="quiz"></div>
  <div class="form-row"><button class="btn ${done?"":"ok"}" id="markDone">${done?"↺ Marquer comme non terminé":"✓ Marquer comme terminé"}</button></div>
  <div class="lesson-nav">${idx>0?`<a class="btn" href="#/cours/${ls[idx-1].id}">← ${esc(ls[idx-1].title)}</a>`:"<span></span>"}${idx<ls.length-1?`<a class="btn primary" href="#/cours/${ls[idx+1].id}">${esc(ls[idx+1].title)} →</a>`:`<a class="btn primary" href="#/examen">🎓 Passer l'examen</a>`}</div>`;
  renderQuiz(app.querySelector("#quiz"),l.quiz,{onDone:pct=>{ STORE.score(l.id,pct); if(pct>=80){ STORE.done(l.id,true); sidebar(l.id); const b=app.querySelector("#markDone"); b.textContent="↺ Marquer comme non terminé"; b.classList.remove("ok"); } }});
  app.querySelector("#markDone").onclick=()=>{ const d=!(STORE.get().done||{})[l.id]; STORE.done(l.id,d); lesson(id); sidebar(l.id); };
  if(l.id==="osi") osiInteractive();
  sidebar(l.id); }

function osiInteractive(){ const L=[
  [7,"Application","Données","HTTP, DNS, SMTP, FTP, SSH","#a855f7","Point d'entrée des applications réseau. Fournit des services comme la navigation web (HTTP), la résolution de noms (DNS) ou l'e-mail (SMTP). Ce n'est pas l'application elle-même (le navigateur), mais les protocoles qu'elle utilise."],
  [6,"Présentation","Données","TLS, JPEG, UTF-8, MPEG","#3b82f6","Traduit les données dans un format commun : encodage des caractères, compression, chiffrement/déchiffrement."],
  [5,"Session","Données","RPC, NetBIOS, SMB","#06b6d4","Ouvre, maintient, synchronise et ferme les sessions de dialogue entre applications (points de reprise)."],
  [4,"Transport","Segment","TCP, UDP, QUIC","#22c55e","Communication de bout en bout entre processus : ports, segmentation, fiabilité (TCP : accusés, retransmission, contrôle de flux) ou rapidité (UDP)."],
  [3,"Réseau","Paquet","IPv4, IPv6, ICMP, OSPF","#eab308","Adressage logique (IP) et routage des paquets entre réseaux différents. Équipement typique : le routeur."],
  [2,"Liaison","Trame","Ethernet, Wi-Fi, PPP, ARP","#f97316","Transmission fiable sur un même lien : adressage physique (MAC), tramage, détection d'erreurs (FCS). Équipement typique : le switch."],
  [1,"Physique","Bit","Câbles, fibre, radio, RJ45","#ef4444","Transmission des bits bruts : tensions électriques, impulsions lumineuses, ondes radio, connecteurs, débits. Équipements : câbles, hubs, répéteurs."]];
  const d=document.getElementById("osiDiagram"), det=document.getElementById("osiDetail"); if(!d) return;
  d.innerHTML=L.map((x,i)=>`<div class="osi-layer" data-i="${i}" style="background:${x[4]}"><b class="n">${x[0]}</b><b>${x[1]}</b><span class="hide-sm">${x[3]}</span><span class="hide-sm">PDU : ${x[2]}</span></div>`).join("");
  d.querySelectorAll(".osi-layer").forEach(e=>e.onclick=()=>{ const x=L[+e.dataset.i]; det.innerHTML=`<b style="color:${x[4]}">Couche ${x[0]} — ${x[1]}</b> (PDU : ${x[2]})<br>${x[5]}<br><span class="muted">Exemples : ${x[3]}</span>`; });
  const btn=document.getElementById("encapBtn"); if(btn) btn.onclick=()=>{ const rows=[...document.querySelectorAll("#encapDemo .encap-row")]; rows.forEach(r=>r.classList.remove("on")); rows.forEach((r,i)=>setTimeout(()=>r.classList.add("on"),i*700)); }; }

function resources(){ app.innerHTML=`<div class="breadcrumbs"><a href="#/">Accueil</a> › Ressources</div><h1>📚 Ressources publiques pour aller plus loin</h1>
  <p class="lead">Une sélection d'ouvrages, cours, normes et simulateurs <b>gratuits et accessibles publiquement</b>, classés par type et par niveau. Ce site s'appuie sur ces références (RFC, normes IEEE, ouvrages universitaires).</p>
  ${RESOURCES.map(c=>`<h2>${c.cat}</h2><div class="grid">${c.items.map(r=>`<a class="card" href="${r.u}" target="_blank" rel="noopener noreferrer"><h3>${esc(r.t)} ↗</h3><p>${esc(r.d)}</p><p style="margin-top:8px"><span class="tag">${r.lvl}</span><span class="tag">${r.lang}</span></p></a>`).join("")}</div>`).join("")}
  <h2>📖 Ouvrages de référence (bibliothèque / librairie)</h2><p class="muted">Livres classiques, non libres, souvent disponibles en bibliothèque universitaire.</p>
  <div class="table-wrap"><table><tr><th>Titre</th><th>Auteurs</th><th>Pourquoi le lire</th></tr>${BOOKS.map(b=>`<tr><td><b>${esc(b.t)}</b></td><td>${esc(b.a)}</td><td>${esc(b.d)}</td></tr>`).join("")}</table></div>
  <h2>📜 RFC essentielles</h2><div class="table-wrap"><table><tr><th>RFC</th><th>Sujet</th></tr>${[[791,"IPv4"],[792,"ICMP"],[768,"UDP"],[9293,"TCP (remplace 793)"],[826,"ARP"],[1918,"Adresses IPv4 privées"],[4632,"CIDR"],[2131,"DHCP"],[1034,"DNS — concepts"],[1035,"DNS — implémentation"],[8200,"IPv6"],[4861,"Neighbor Discovery (IPv6)"],[4862,"SLAAC"],[2328,"OSPFv2"],[4271,"BGP-4"],[3022,"NAT traditionnel"],[8446,"TLS 1.3"],[9110,"Sémantique HTTP"],[9000,"QUIC"],[7348,"VXLAN"],[6241,"NETCONF"],[8040,"RESTCONF"]].map(([n,s])=>`<tr><td><a href="https://www.rfc-editor.org/rfc/rfc${n}" target="_blank" rel="noopener noreferrer">RFC ${n}</a></td><td>${s}</td></tr>`).join("")}</table></div>`; }
function glossary(){ const g=GLOSSARY.slice().sort((a,b)=>a[0].localeCompare(b[0],"fr")); const letters=[...new Set(g.map(x=>x[0][0].toUpperCase()))];
  app.innerHTML=`<div class="breadcrumbs"><a href="#/">Accueil</a> › Glossaire</div><h1>📖 Glossaire</h1><p class="lead">${g.length} termes essentiels des réseaux.</p>
  <div class="letter-nav">${letters.map(l=>`<a href="#/glossaire" data-l="${l}">${l}</a>`).join("")}</div>
  <dl class="glossary">${g.map(([t,d])=>`<dt id="g-${t[0].toUpperCase()}-${encodeURIComponent(t)}" data-first="${t[0].toUpperCase()}">${esc(t)}</dt><dd>${esc(d)}</dd>`).join("")}</dl>`;
  app.querySelectorAll("[data-l]").forEach(a=>a.onclick=e=>{ e.preventDefault(); app.querySelector(`dt[data-first="${a.dataset.l}"]`).scrollIntoView({behavior:"smooth"}); }); }
function notFound(){ app.innerHTML=`<h1>Page introuvable</h1><p>Erreur 404 — comme dirait HTTP 😉</p><a class="btn primary" href="#/">Retour à l'accueil</a>`; }

/* ---------- Routeur ---------- */
function route(){ const h=location.hash.replace(/^#/,"")||"/"; const [path]=h.split("#"); const p=path.split("/").filter(Boolean);
  document.getElementById("sidebar").classList.remove("open");
  document.querySelectorAll(".topnav a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#/"+(p[0]||"")));
  if(!p.length) home(); else if(p[0]==="cours"&&p[1]) lesson(p[1]); else if(p[0]==="cours") courses(); else if(p[0]==="parcours") parcours();
  else if(p[0]==="outils") renderTools(app); else if(p[0]==="exercices") renderExercises(app); else if(p[0]==="examen") renderExam(app);
  else if(p[0]==="sandbox") renderSandbox(app,p[1]); else if(p[0]==="ressources") resources(); else if(p[0]==="glossaire") glossary(); else notFound();
  if(!(p[0]==="cours"&&p[1])) sidebar(p.length?"":"home");
  const anchor=h.split("#")[1]; if(anchor){ const t=document.getElementById(anchor); if(t) setTimeout(()=>t.scrollIntoView({behavior:"smooth"}),50); } else window.scrollTo(0,0);
  const t=app.querySelector("h1"); document.title=(t&&p.length?t.textContent.trim()+" — ":"")+"RéseauAcadémie"; }
window.addEventListener("hashchange",route);

/* ---------- Recherche ---------- */
const sIn=document.getElementById("search"), sRes=document.getElementById("searchResults");
const idx=()=>[...LESSONS.map(l=>({t:l.icon+" "+l.title,u:"#/cours/"+l.id,txt:(l.title+" "+l.summary+" "+strip(l.content)+" "+l.keypoints.join(" ")).toLowerCase(),sub:l.summary})),...GLOSSARY.map(([t,d])=>({t:"📖 "+t,u:"#/glossaire",txt:(t+" "+d).toLowerCase(),sub:d})),{t:"🖥️ Sandbox terminal",u:"#/sandbox",txt:"sandbox terminal linux windows cmd powershell cisco ios commande ping ipconfig",sub:"Terminaux simulés"},{t:"🧮 Calculateur de sous-réseau",u:"#/outils",txt:"calculateur sous-réseau subnet vlsm binaire ipv6 outil",sub:"Outils"}];
let INDEX=null;
sIn.addEventListener("input",()=>{ INDEX=INDEX||idx(); const q=sIn.value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""); if(q.length<2){ sRes.classList.remove("open"); return; }
  const norm=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,""); const terms=q.split(/\s+/);
  const r=INDEX.map(x=>{ const n=norm(x.txt); if(!terms.every(t=>n.includes(t))) return null; const score=terms.reduce((s,t)=>s+(norm(x.t.toLowerCase()).includes(t)?10:0)+n.split(t).length,0); return {...x,score}; }).filter(Boolean).sort((a,b)=>b.score-a.score).slice(0,10);
  sRes.innerHTML=r.length?r.map(x=>`<a href="${x.u}">${esc(x.t)}<small>${esc(x.sub.slice(0,110))}</small></a>`).join(""):`<a>Aucun résultat</a>`; sRes.classList.add("open"); });
sRes.addEventListener("click",()=>{ sRes.classList.remove("open"); sIn.value=""; });
document.addEventListener("click",e=>{ if(!e.target.closest(".search-wrap")) sRes.classList.remove("open"); });
sIn.addEventListener("keydown",e=>{ if(e.key==="Enter"){ const a=sRes.querySelector("a[href]"); if(a){ location.hash=a.getAttribute("href"); sRes.classList.remove("open"); sIn.value=""; } } if(e.key==="Escape") sRes.classList.remove("open"); });

/* ---------- Thème & menu ---------- */
const th=localStorage.getItem("ra-theme"); if(th) document.documentElement.dataset.theme=th;
document.getElementById("themeBtn").onclick=()=>{ const n=document.documentElement.dataset.theme==="light"?"dark":"light"; document.documentElement.dataset.theme=n; localStorage.setItem("ra-theme",n); };
document.getElementById("menuBtn").onclick=()=>document.getElementById("sidebar").classList.toggle("open");
route();
})();
