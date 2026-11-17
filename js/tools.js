/* Outils interactifs : calculateurs IP, VLSM, conversions, IPv6, débit */
(function(){
const IP = {
  parse(s){ s=String(s).trim(); const m=s.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/); if(!m) return null;
    const o=m.slice(1).map(Number); if(o.some(x=>x>255)) return null; return ((o[0]<<24)>>>0)+(o[1]<<16)+(o[2]<<8)+o[3]; },
  str(n){ n=n>>>0; return [n>>>24,(n>>>16)&255,(n>>>8)&255,n&255].join("."); },
  mask(c){ return c===0?0:(0xFFFFFFFF<<(32-c))>>>0; },
  cidrFromMask(m){ let c=0,seen0=false; for(let i=31;i>=0;i--){ const b=(m>>>i)&1; if(b){ if(seen0) return -1; c++; } else seen0=true; } return c; },
  bin(n){ n=n>>>0; return [n>>>24,(n>>>16)&255,(n>>>8)&255,n&255].map(o=>o.toString(2).padStart(8,"0")).join("."); },
  cls(n){ const f=n>>>24; if(f<128) return "A"; if(f<192) return "B"; if(f<224) return "C"; if(f<240) return "D (multicast)"; return "E (expérimental)"; },
  kind(n){ const r=(net,c)=>((n&IP.mask(c))>>>0)===IP.parse(net);
    if(r("10.0.0.0",8)||r("172.16.0.0",12)||r("192.168.0.0",16)) return "Privée (RFC 1918)";
    if(r("127.0.0.0",8)) return "Loopback"; if(r("169.254.0.0",16)) return "Link-local (APIPA)";
    if(r("100.64.0.0",10)) return "CGNAT (RFC 6598)"; if(r("224.0.0.0",4)) return "Multicast";
    if(r("240.0.0.0",4)) return "Réservée"; if(r("0.0.0.0",8)) return "« Ce réseau »";
    if(r("192.0.2.0",24)||r("198.51.100.0",24)||r("203.0.113.0",24)) return "Documentation";
    return "Publique"; },
  // "a.b.c.d/x" ou "a.b.c.d 255.255.255.0" ou "a.b.c.d" + cidr séparé
  parseCidr(s){ s=String(s).trim().replace(/\s+/g," "); let ip,c;
    if(s.includes("/")){ const [a,b]=s.split("/"); ip=IP.parse(a); c=Number(b); if(!/^\d{1,2}$/.test(b)||c>32) return null; }
    else if(s.includes(" ")){ const [a,b]=s.split(" "); ip=IP.parse(a); const m=IP.parse(b); if(m===null) return null; c=IP.cidrFromMask(m); if(c<0) return null; }
    else return null;
    if(ip===null) return null; return {ip,cidr:c}; },
  info(ip,c){ const m=IP.mask(c), net=(ip&m)>>>0, bc=(net|(~m>>>0))>>>0, size=2**(32-c);
    let first,last,hosts; if(c===32){first=last=net;hosts=1;} else if(c===31){first=net;last=bc;hosts=2;} else {first=net+1;last=bc-1;hosts=size-2;}
    return {ip,cidr:c,mask:m,wildcard:(~m)>>>0,net,bc,first,last,hosts,size}; }
};
window.IP = IP;

function colorBits(ip,c){ const b=IP.bin(ip); let out="",k=0; for(const ch of b){ if(ch==="."){out+=".";continue;} out+=`<span class="${k<c?"n":"h"}">${ch}</span>`; k++; } return out; }
function esc(s){ return String(s).replace(/[&<>"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch])); }

const IPv6 = {
  expand(s){ s=s.trim().toLowerCase(); let pre="";
    const pi=s.indexOf("/"); if(pi>=0){ pre=s.slice(pi); s=s.slice(0,pi); }
    if(!/^[0-9a-f:.]+$/.test(s)) return null;
    // IPv4 embarquée
    const v4=s.match(/(\d+\.\d+\.\d+\.\d+)$/); if(v4){ const n=IP.parse(v4[1]); if(n===null) return null; s=s.replace(v4[1],((n>>>16).toString(16))+":"+((n&0xffff).toString(16))); }
    const dbl=s.split("::"); if(dbl.length>2) return null;
    const head=dbl[0]?dbl[0].split(":"):[], tail=dbl.length===2&&dbl[1]?dbl[1].split(":"):[];
    if([...head,...tail].some(g=>!/^[0-9a-f]{1,4}$/.test(g))) return null;
    let groups; if(dbl.length===2){ const miss=8-head.length-tail.length; if(miss<1) return null; groups=[...head,...Array(miss).fill("0"),...tail]; }
    else { if(head.length!==8) return null; groups=head; }
    return groups.map(g=>g.padStart(4,"0")).join(":")+pre; },
  compress(s){ const full=IPv6.expand(s); if(!full) return null; let pre=""; let f=full; const pi=f.indexOf("/"); if(pi>=0){pre=f.slice(pi);f=f.slice(0,pi);}
    const g=f.split(":").map(x=>x.replace(/^0+(?=.)/,""));
    let best=-1,bl=0; for(let i=0;i<8;){ if(g[i]==="0"){ let j=i; while(j<8&&g[j]==="0") j++; if(j-i>bl&&j-i>1){bl=j-i;best=i;} i=j; } else i++; }
    if(best<0) return g.join(":")+pre;
    const left=g.slice(0,best).join(":"), right=g.slice(best+bl).join(":");
    return left+"::"+right+pre; },
  eui64(mac){ const h=mac.toLowerCase().replace(/[^0-9a-f]/g,""); if(h.length!==12) return null;
    const b=h.match(/../g).map(x=>parseInt(x,16)); b[0]^=0x02; const a=[b[0],b[1],b[2],0xff,0xfe,b[3],b[4],b[5]];
    return [0,2,4,6].map(i=>((a[i]<<8)|a[i+1]).toString(16)).join(":"); }
};
window.IPv6 = IPv6;

function renderTools(el){
el.innerHTML = `
<div class="breadcrumbs"><a href="#/">Accueil</a> › Outils</div>
<h1>🧰 Boîte à outils réseau</h1>
<p class="lead">Calculateurs et convertisseurs pour vérifier vos exercices et préparer vos plans d'adressage. Tout fonctionne hors ligne dans votre navigateur.</p>
<div class="grid">
 <a class="card" href="#/outils" data-jump="t-subnet"><div class="ico">🧮</div><h3>Calculateur IPv4</h3><p>Réseau, broadcast, plage, binaire.</p></a>
 <a class="card" href="#/outils" data-jump="t-split"><div class="ico">✂️</div><h3>Découpage en sous-réseaux</h3><p>Diviser un réseau en N parts.</p></a>
 <a class="card" href="#/outils" data-jump="t-vlsm"><div class="ico">📐</div><h3>Calculateur VLSM</h3><p>Plan d'adressage optimisé.</p></a>
 <a class="card" href="#/outils" data-jump="t-conv"><div class="ico">🔁</div><h3>Convertisseur</h3><p>Décimal, binaire, hexadécimal.</p></a>
 <a class="card" href="#/outils" data-jump="t-v6"><div class="ico">6️⃣</div><h3>Outils IPv6</h3><p>Compression, expansion, EUI-64.</p></a>
 <a class="card" href="#/outils" data-jump="t-bw"><div class="ico">⏱️</div><h3>Débit & transfert</h3><p>Temps de téléchargement.</p></a>
</div>

<section class="tool" id="t-subnet">
 <h2>🧮 Calculateur de sous-réseau IPv4</h2>
 <div class="form-row">
  <label>Adresse IP / CIDR ou IP + masque<input type="text" id="sc-in" value="192.168.10.77/27" size="28"></label>
  <button class="btn primary" id="sc-go">Calculer</button>
 </div>
 <div id="sc-out"></div>
</section>

<section class="tool" id="t-split">
 <h2>✂️ Découper un réseau en sous-réseaux égaux</h2>
 <div class="form-row">
  <label>Réseau de départ<input type="text" id="sp-net" value="192.168.1.0/24"></label>
  <label>Nombre de sous-réseaux voulus<input type="number" id="sp-n" value="4" min="1" max="4096"></label>
  <button class="btn primary" id="sp-go">Découper</button>
 </div>
 <div id="sp-out"></div>
</section>

<section class="tool" id="t-vlsm">
 <h2>📐 Calculateur VLSM</h2>
 <p class="muted">Une ligne par besoin : <code>nom: nombre d'hôtes</code>. Les besoins sont triés automatiquement du plus grand au plus petit.</p>
 <div class="form-row">
  <label>Réseau disponible<input type="text" id="vl-net" value="192.168.50.0/24"></label>
 </div>
 <textarea id="vl-req" rows="6" style="width:100%;max-width:420px;padding:10px;border-radius:9px;border:1px solid var(--border);background:var(--card2);color:var(--text);font-family:monospace">Admin: 100
Ventes: 50
Labo: 20
WAN1: 2
WAN2: 2</textarea>
 <div class="form-row"><button class="btn primary" id="vl-go">Calculer le plan</button></div>
 <div id="vl-out"></div>
</section>

<section class="tool" id="t-conv">
 <h2>🔁 Convertisseur décimal / binaire / hexadécimal</h2>
 <div class="form-row">
  <label>Décimal<input type="text" id="cv-dec" value="192"></label>
  <label>Binaire<input type="text" id="cv-bin"></label>
  <label>Hexadécimal<input type="text" id="cv-hex"></label>
 </div>
 <div class="form-row">
  <label>Adresse IPv4 complète → binaire<input type="text" id="cv-ip" value="172.16.254.1" size="22"></label>
 </div>
 <div class="bits" id="cv-ipout"></div>
 <h3>Tableau des puissances de 2</h3>
 <div class="table-wrap"><table id="pow2"></table></div>
</section>

<section class="tool" id="t-v6">
 <h2>6️⃣ Outils IPv6</h2>
 <div class="form-row">
  <label>Adresse IPv6<input type="text" id="v6-in" value="2001:0db8:0000:0000:0000:ff00:0042:8329" size="44"></label>
  <button class="btn primary" id="v6-go">Analyser</button>
 </div>
 <div id="v6-out"></div>
 <div class="form-row">
  <label>MAC → identifiant EUI-64<input type="text" id="eui-in" value="00:1A:2B:3C:4D:5E"></label>
  <button class="btn" id="eui-go">Convertir</button>
 </div>
 <div id="eui-out" class="mono"></div>
</section>

<section class="tool" id="t-bw">
 <h2>⏱️ Calcul de temps de transfert</h2>
 <div class="form-row">
  <label>Taille<input type="number" id="bw-size" value="4" min="0" step="any"></label>
  <label>Unité<select id="bw-su"><option value="1e6">Mo</option><option value="1e9" selected>Go</option><option value="1e12">To</option><option value="1048576">Mio</option><option value="1073741824">Gio</option></select></label>
  <label>Débit<input type="number" id="bw-rate" value="100" min="0" step="any"></label>
  <label>Unité<select id="bw-ru"><option value="1e3">kbit/s</option><option value="1e6" selected>Mbit/s</option><option value="1e9">Gbit/s</option></select></label>
  <label>Efficacité (%)<input type="number" id="bw-eff" value="90" min="1" max="100"></label>
  <button class="btn primary" id="bw-go">Calculer</button>
 </div>
 <div id="bw-out" class="feedback"></div>
</section>`;

const $=id=>el.querySelector("#"+id);
el.querySelectorAll("[data-jump]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();$(a.dataset.jump).scrollIntoView({behavior:"smooth"});}));

function calc(){ const p=IP.parseCidr($("sc-in").value); const out=$("sc-out");
  if(!p){ $("sc-in").classList.add("bad"); out.innerHTML=`<p class="feedback bad">Format attendu : 192.168.1.10/24 ou 192.168.1.10 255.255.255.0</p>`; return; }
  $("sc-in").classList.remove("bad"); const i=IP.info(p.ip,p.cidr);
  out.innerHTML=`<div class="result-grid">
   <div><small>Adresse</small><b>${IP.str(i.ip)}</b></div>
   <div><small>Masque</small><b>${IP.str(i.mask)} (/${i.cidr})</b></div>
   <div><small>Masque générique (wildcard)</small><b>${IP.str(i.wildcard)}</b></div>
   <div><small>Adresse réseau</small><b>${IP.str(i.net)}/${i.cidr}</b></div>
   <div><small>Broadcast</small><b>${i.cidr>=31?"— (aucun)":IP.str(i.bc)}</b></div>
   <div><small>Premier hôte</small><b>${IP.str(i.first)}</b></div>
   <div><small>Dernier hôte</small><b>${IP.str(i.last)}</b></div>
   <div><small>Hôtes utilisables</small><b>${i.hosts.toLocaleString("fr-FR")}</b></div>
   <div><small>Total d'adresses</small><b>${i.size.toLocaleString("fr-FR")}</b></div>
   <div><small>Classe (historique)</small><b>${IP.cls(i.ip)}</b></div>
   <div><small>Type</small><b>${IP.kind(i.ip)}</b></div>
   <div><small>Pas (nombre magique)</small><b>${i.cidr%8===0&&i.cidr>0?"256 (octet "+(i.cidr/8)+")":(256-((i.mask>>>(8*(3-Math.floor(Math.min(i.cidr,31)/8))))&255))+" sur l'octet "+(Math.floor(Math.min(i.cidr,31)/8)+1)}</b></div>
  </div>
  <h3>Représentation binaire <small class="muted">(<span style="color:var(--accent2)">réseau</span> / <span style="color:var(--warn)">hôte</span>)</small></h3>
  <div class="bits">Adresse&nbsp;&nbsp; ${colorBits(i.ip,i.cidr)}<br>Masque&nbsp;&nbsp;&nbsp; ${colorBits(i.mask,i.cidr)}<br>Réseau&nbsp;&nbsp;&nbsp; ${colorBits(i.net,i.cidr)}<br>Broadcast ${colorBits(i.bc,i.cidr)}</div>`; }
$("sc-go").onclick=calc; $("sc-in").addEventListener("keydown",e=>{if(e.key==="Enter")calc();}); calc();

function split(){ const p=IP.parseCidr($("sp-net").value), n=parseInt($("sp-n").value,10), out=$("sp-out");
  if(!p||!(n>=1)){ out.innerHTML=`<p class="feedback bad">Entrée invalide.</p>`; return; }
  const bits=Math.ceil(Math.log2(n)), nc=p.cidr+bits; if(nc>32){ out.innerHTML=`<p class="feedback bad">Impossible : il faudrait un /${nc}.</p>`; return; }
  const base=(p.ip&IP.mask(p.cidr))>>>0, step=2**(32-nc), count=2**bits;
  let rows=""; const max=Math.min(count,256);
  for(let k=0;k<max;k++){ const i=IP.info((base+k*step)>>>0,nc); rows+=`<tr><td>${k+1}</td><td>${IP.str(i.net)}/${nc}</td><td>${IP.str(i.first)}</td><td>${IP.str(i.last)}</td><td>${nc>=31?"—":IP.str(i.bc)}</td><td>${i.hosts}</td></tr>`; }
  out.innerHTML=`<p class="feedback ok">${bits} bit(s) emprunté(s) → nouveau masque /${nc} (${IP.str(IP.mask(nc))}), ${count} sous-réseaux de ${IP.info(base,nc).hosts} hôtes.</p>
  <div class="table-wrap"><table><tr><th>#</th><th>Réseau</th><th>1er hôte</th><th>Dernier hôte</th><th>Broadcast</th><th>Hôtes</th></tr>${rows}</table></div>${count>max?`<p class="muted">Affichage limité aux ${max} premiers sous-réseaux.</p>`:""}`; }
$("sp-go").onclick=split; split();

function vlsm(){ const p=IP.parseCidr($("vl-net").value), out=$("vl-out");
  if(!p){ out.innerHTML=`<p class="feedback bad">Réseau invalide.</p>`; return; }
  const reqs=$("vl-req").value.split("\n").map(l=>l.trim()).filter(Boolean).map((l,idx)=>{ const m=l.match(/^(.*?)[:=\s]\s*(\d+)$/); return m?{name:m[1].trim()||("Réseau "+(idx+1)),h:+m[2]}:null; });
  if(reqs.some(r=>!r)||!reqs.length){ out.innerHTML=`<p class="feedback bad">Format de ligne attendu : <code>nom: hôtes</code></p>`; return; }
  reqs.sort((a,b)=>b.h-a.h);
  const base=(p.ip&IP.mask(p.cidr))>>>0, end=base+2**(32-p.cidr); let cur=base, rows="", ok=true;
  for(const r of reqs){ let c=32; while(c>0 && (2**(32-c)-2)<r.h) c--; if(r.h<=2&&c>30) c=30;
    const size=2**(32-c); cur=Math.ceil(cur/size)*size;
    if(cur+size>end){ rows+=`<tr><td>${esc(r.name)}</td><td>${r.h}</td><td colspan="5" style="color:var(--bad)">Plus assez d'espace dans ${IP.str(base)}/${p.cidr}</td></tr>`; ok=false; continue; }
    const i=IP.info(cur>>>0,c); rows+=`<tr><td>${esc(r.name)}</td><td>${r.h}</td><td>${IP.str(i.net)}/${c}</td><td>${IP.str(i.mask)}</td><td>${IP.str(i.first)} – ${IP.str(i.last)}</td><td>${IP.str(i.bc)}</td><td>${i.hosts} (${i.hosts-r.h} libres)</td></tr>`; cur+=size; }
  const used=cur-base, total=2**(32-p.cidr);
  out.innerHTML=`<div class="table-wrap"><table><tr><th>Nom</th><th>Besoin</th><th>Réseau</th><th>Masque</th><th>Plage</th><th>Broadcast</th><th>Capacité</th></tr>${rows}</table></div>
  <p class="feedback ${ok?"ok":"bad"}">${ok?"Plan valide.":"Plan incomplet."} Espace utilisé : ${used} / ${total} adresses (${Math.round(used/total*100)} %). ${ok&&cur<end?"Prochaine adresse libre : "+IP.str(cur>>>0):""}</p>`; }
$("vl-go").onclick=vlsm; vlsm();

const dec=$("cv-dec"),bin=$("cv-bin"),hex=$("cv-hex");
function fromN(n,src){ if(src!=="dec")dec.value=n; if(src!=="bin")bin.value=n.toString(2); if(src!=="hex")hex.value=n.toString(16).toUpperCase(); [dec,bin,hex].forEach(x=>x.classList.remove("bad")); }
dec.oninput=()=>{ /^\d+$/.test(dec.value)?fromN(parseInt(dec.value,10),"dec"):dec.classList.add("bad"); };
bin.oninput=()=>{ /^[01]+$/.test(bin.value)?fromN(parseInt(bin.value,2),"bin"):bin.classList.add("bad"); };
hex.oninput=()=>{ /^[0-9a-f]+$/i.test(hex.value)?fromN(parseInt(hex.value,16),"hex"):hex.classList.add("bad"); };
fromN(192,"dec");
const ipin=$("cv-ip"); const ipconv=()=>{ const n=IP.parse(ipin.value); $("cv-ipout").innerHTML=n===null?`<span style="color:var(--bad)">Adresse invalide</span>`:`${IP.bin(n)}<br><span class="muted">Hex : ${[n>>>24,(n>>>16)&255,(n>>>8)&255,n&255].map(o=>o.toString(16).toUpperCase().padStart(2,"0")).join(".")} — Entier : ${n}</span>`; };
ipin.oninput=ipconv; ipconv();
let pr="<tr><th>n</th>",pv="<tr><th>2<sup>n</sup></th>"; for(let k=0;k<=16;k++){pr+=`<td>${k}</td>`;pv+=`<td>${(2**k).toLocaleString("fr-FR")}</td>`;} $("pow2").innerHTML=pr+"</tr>"+pv+"</tr>";

function v6(){ const s=$("v6-in").value, f=IPv6.expand(s), out=$("v6-out");
  if(!f){ out.innerHTML=`<p class="feedback bad">Adresse IPv6 invalide (rappel : « :: » une seule fois).</p>`; return; }
  const addr=f.split("/")[0], first=parseInt(addr.slice(0,4),16); let type="Global unicast";
  if(addr==="0000:0000:0000:0000:0000:0000:0000:0001") type="Loopback (::1)"; else if(/^0{4}(:0{4}){7}$/.test(addr)) type="Non spécifiée (::)";
  else if((first&0xffc0)===0xfe80) type="Link-local (fe80::/10)"; else if((first&0xfe00)===0xfc00) type="Unique local / ULA (fc00::/7)";
  else if((first&0xff00)===0xff00) type="Multicast (ff00::/8)"; else if(addr.startsWith("2001:0db8")) type="Documentation (2001:db8::/32)";
  else if((first&0xe000)!==0x2000) type="Réservée / autre";
  out.innerHTML=`<div class="result-grid"><div><small>Forme complète</small><b>${f}</b></div><div><small>Forme compressée</small><b>${IPv6.compress(s)}</b></div><div><small>Type</small><b>${type}</b></div></div>`; }
$("v6-go").onclick=v6; v6();
const eui=()=>{ const r=IPv6.eui64($("eui-in").value); $("eui-out").innerHTML=r?`ID d'interface : <b>${r}</b> → adresse link-local : <b>fe80::${r}</b>`:`<span style="color:var(--bad)">MAC invalide</span>`; };
$("eui-go").onclick=eui; eui();

function bw(){ const bytes=parseFloat($("bw-size").value)*parseFloat($("bw-su").value), rate=parseFloat($("bw-rate").value)*parseFloat($("bw-ru").value)*(parseFloat($("bw-eff").value)/100);
  if(!(bytes>=0)||!(rate>0)){ $("bw-out").textContent="Valeurs invalides."; return; }
  let s=bytes*8/rate; const h=Math.floor(s/3600), m=Math.floor(s%3600/60), sec=(s%60);
  $("bw-out").className="feedback ok"; $("bw-out").textContent=`Durée estimée : ${h?h+" h ":""}${m||h?m+" min ":""}${sec.toFixed(sec<10&&!m&&!h?2:0)} s (rappel : taille × 8 ÷ débit utile).`; }
$("bw-go").onclick=bw; bw();
}
window.renderTools = renderTools;
})();
