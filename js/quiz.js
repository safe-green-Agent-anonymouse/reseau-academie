/* Quiz, examen et exercices générés */
(function(){
const store = {
  get(){ try{ return JSON.parse(localStorage.getItem("ra-progress")||"{}"); }catch(e){ return {}; } },
  set(d){ localStorage.setItem("ra-progress", JSON.stringify(d)); },
  score(id,pct){ const d=store.get(); d.scores=d.scores||{}; d.scores[id]=Math.max(d.scores[id]||0,pct); store.set(d); },
  done(id,v=true){ const d=store.get(); d.done=d.done||{}; d.done[id]=v; store.set(d); }
};
window.STORE = store;
const shuffle=a=>{ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
window.shuffle=shuffle;
const esc=s=>String(s).replace(/[&<>"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));

/* Quiz à choix multiples. Les options sont mélangées à chaque rendu. */
function renderQuiz(container, questions, opts={}){
  const qs = questions.map(q=>{ const order=shuffle(q.o.map((_,i)=>i)); return {...q, order}; });
  let answered=0, good=0;
  container.innerHTML = `<div class="quiz"><h3>${opts.title||"📝 Quiz de validation"}</h3>${opts.intro?`<p class="muted">${opts.intro}</p>`:""}
   ${qs.map((q,qi)=>`<div class="q" data-q="${qi}"><div class="qt">${qi+1}. ${esc(q.q)}${q.src?` <span class="tag">${esc(q.src)}</span>`:""}</div>
     ${q.order.map(oi=>`<button class="opt" data-o="${oi}">${esc(q.o[oi])}</button>`).join("")}
     <div class="explain">${esc(q.e||"")}</div></div>`).join("")}
   <div class="score" aria-live="polite"></div>
   <button class="btn small" data-retry>↻ Recommencer</button></div>`;
  const scoreEl=container.querySelector(".score");
  container.querySelectorAll(".q").forEach(qel=>{
    const q=qs[+qel.dataset.q];
    qel.querySelectorAll(".opt").forEach(b=>b.addEventListener("click",()=>{
      const o=+b.dataset.o; qel.querySelectorAll(".opt").forEach(x=>{ x.disabled=true; if(+x.dataset.o===q.a) x.classList.add("correct"); });
      if(o===q.a) good++; else b.classList.add("wrong");
      qel.querySelector(".explain").classList.add("show"); answered++;
      scoreEl.textContent=`Score : ${good} / ${answered}${answered===qs.length?" — "+Math.round(good/qs.length*100)+" %":""}`;
      if(answered===qs.length){ const pct=Math.round(good/qs.length*100);
        scoreEl.textContent += pct>=80?" 🎉 Excellent, chapitre validé !":pct>=50?" 👍 Pas mal, relisez les points manqués.":" 📖 Relisez le cours et réessayez.";
        if(opts.onDone) opts.onDone(pct,good,qs.length); }
    }));
  });
  container.querySelector("[data-retry]").onclick=()=>renderQuiz(container,questions,opts);
}
window.renderQuiz=renderQuiz;

/* Examen blanc */
function renderExam(el){
  el.innerHTML=`<div class="breadcrumbs"><a href="#/">Accueil</a> › Examen</div>
  <h1>🎓 Examen blanc</h1>
  <p class="lead">Questions tirées au hasard dans tous les chapitres. Choisissez votre niveau et le nombre de questions.</p>
  <div class="tool"><div class="form-row">
   <label>Niveau<select id="ex-lvl"><option value="0">🐣 Zéro (grand débutant)</option><option value="1">🟢 Débutant</option><option value="2" selected>🟠 Pro (jusqu'au niveau pro)</option><option value="3">🔴 Expert (tout)</option><option value="only3">🔴 Expert uniquement</option></select></label>
   <label>Questions<select id="ex-n"><option>10</option><option selected>20</option><option>40</option><option value="999">Toutes</option></select></label>
   <label>Chrono<select id="ex-t"><option value="0">Sans</option><option value="60" selected>1 min / question</option><option value="30">30 s / question</option></select></label>
   <button class="btn primary" id="ex-go">Démarrer</button></div></div>
  <div id="ex-timer" class="feedback"></div><div id="ex-zone"></div>`;
  let timer=null;
  el.querySelector("#ex-go").onclick=()=>{
    const lv=el.querySelector("#ex-lvl").value, n=+el.querySelector("#ex-n").value, t=+el.querySelector("#ex-t").value;
    const pool=[]; LESSONS.filter(l=>lv==="only3"?l.level===3:l.level<=+lv).forEach(l=>l.quiz.forEach(q=>pool.push({...q,src:l.title})));
    const qs=shuffle(pool).slice(0,n); const zone=el.querySelector("#ex-zone"), tEl=el.querySelector("#ex-timer");
    clearInterval(timer); tEl.textContent="";
    renderQuiz(zone,qs,{title:`Examen — ${qs.length} questions`,onDone:(pct)=>{ clearInterval(timer); store.score("examen-"+lv,pct); tEl.className="feedback "+(pct>=70?"ok":"bad"); tEl.textContent=`Résultat final : ${pct} % ${pct>=70?"— Réussi ✅":"— Seuil de réussite : 70 %"}`; }});
    if(t){ let left=t*qs.length; const tick=()=>{ const m=Math.floor(left/60),s=left%60; tEl.className="feedback"; tEl.textContent=`⏳ Temps restant : ${m}:${String(s).padStart(2,"0")}`; if(left--<=0){ clearInterval(timer); zone.querySelectorAll(".opt").forEach(b=>b.disabled=true); tEl.className="feedback bad"; tEl.textContent="⌛ Temps écoulé !"; } }; tick(); timer=setInterval(tick,1000);
      const stop=()=>{ clearInterval(timer); window.removeEventListener("hashchange",stop); }; window.addEventListener("hashchange",stop); }
    zone.scrollIntoView({behavior:"smooth"});
  };
}
window.renderExam=renderExam;

/* Exercices générés aléatoirement */
const PORTS=[["FTP (contrôle)",21],["SSH",22],["Telnet",23],["SMTP",25],["DNS",53],["DHCP serveur",67],["TFTP",69],["HTTP",80],["POP3",110],["NTP",123],["IMAP",143],["SNMP",161],["LDAP",389],["HTTPS",443],["SMB",445],["Syslog",514],["IMAPS",993],["RDP",3389],["MySQL",3306],["BGP",179]];
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));

function renderExercises(el){
  el.innerHTML=`<div class="breadcrumbs"><a href="#/">Accueil</a> › Exercices</div>
  <h1>🏋️ Exercices d'entraînement illimités</h1>
  <p class="lead">Des exercices générés aléatoirement, avec correction détaillée. Votre série de bonnes réponses est comptabilisée.</p>

  <section class="tool"><h2>✂️ Subnetting</h2>
   <div class="form-row"><label>Difficulté<select id="sn-lvl"><option value="1">Facile (/24 à /30)</option><option value="2" selected>Moyen (/16 à /30)</option><option value="3">Difficile (/8 à /30)</option></select></label><button class="btn" id="sn-new">Nouvelle question</button></div>
   <p>Pour l'adresse <b class="mono" id="sn-q"></b>, trouvez :</p>
   <div class="form-row">
    <label>Adresse réseau<input type="text" id="sn-net"></label>
    <label>Broadcast<input type="text" id="sn-bc"></label>
    <label>Premier hôte<input type="text" id="sn-first"></label>
    <label>Dernier hôte<input type="text" id="sn-last"></label>
    <label>Nb d'hôtes<input type="text" id="sn-h" size="8"></label>
   </div>
   <div class="form-row"><button class="btn primary" id="sn-check">Vérifier</button><button class="btn" id="sn-show">Voir la correction</button></div>
   <div id="sn-fb"></div><p class="muted">Série : <b id="sn-streak">0</b></p>
  </section>

  <section class="tool"><h2>🎭 Masque ↔ CIDR</h2>
   <p id="mk-q" class="mono" style="font-size:1.1rem"></p>
   <div class="form-row"><label>Votre réponse<input type="text" id="mk-a"></label><button class="btn primary" id="mk-check">Vérifier</button><button class="btn" id="mk-new">Suivante</button></div>
   <div id="mk-fb"></div>
  </section>

  <section class="tool"><h2>🔢 Conversion binaire</h2>
   <p id="bn-q" style="font-size:1.1rem"></p>
   <div class="form-row"><label>Votre réponse<input type="text" id="bn-a"></label><button class="btn primary" id="bn-check">Vérifier</button><button class="btn" id="bn-new">Suivante</button></div>
   <div id="bn-fb"></div><p class="muted">Série : <b id="bn-streak">0</b></p>
  </section>

  <section class="tool"><h2>🚪 Mémorisation des ports</h2>
   <p id="pt-q" style="font-size:1.1rem"></p>
   <div id="pt-opts"></div><div id="pt-fb"></div><p class="muted">Série : <b id="pt-streak">0</b></p>
  </section>

  <section class="tool"><h2>🧩 Même réseau ou pas ?</h2>
   <p id="sm-q" style="font-size:1.05rem"></p>
   <div class="form-row"><button class="btn" data-sm="1">✅ Même réseau</button><button class="btn" data-sm="0">❌ Réseaux différents</button><button class="btn" id="sm-new">Suivante</button></div>
   <div id="sm-fb"></div>
  </section>`;
  const $=id=>el.querySelector("#"+id); const fb=(id,ok,msg)=>{ $(id).className="feedback "+(ok?"ok":"bad"); $(id).innerHTML=msg; };

  // Subnetting
  let sn=null, snStreak=0;
  function newSn(){ const lv=+$("sn-lvl").value; const minC=lv===1?24:lv===2?16:8; const c=rnd(minC,30);
    const first=lv===3?rnd(1,223):[10,172,192][rnd(0,2)]; let ip;
    if(first===10) ip=IP.parse(`10.${rnd(0,255)}.${rnd(0,255)}.${rnd(1,254)}`); else if(first===172) ip=IP.parse(`172.${rnd(16,31)}.${rnd(0,255)}.${rnd(1,254)}`);
    else if(first===192) ip=IP.parse(`192.168.${rnd(0,255)}.${rnd(1,254)}`); else ip=IP.parse(`${first===127?126:first}.${rnd(0,255)}.${rnd(0,255)}.${rnd(1,254)}`);
    sn=IP.info(ip,c); $("sn-q").textContent=`${IP.str(ip)}/${c}  (${IP.str(sn.mask)})`;
    ["sn-net","sn-bc","sn-first","sn-last","sn-h"].forEach(i=>{$(i).value="";$(i).classList.remove("bad");}); $("sn-fb").innerHTML=""; }
  function corr(){ const step=256-((sn.mask>>>(8*(3-Math.floor(sn.cidr/8))))&255);
    return `Masque /${sn.cidr} → octet intéressant n°${Math.floor(sn.cidr/8)+1}, pas = ${sn.cidr%8===0?"256":step}.<br>Réseau <b>${IP.str(sn.net)}</b>, broadcast <b>${IP.str(sn.bc)}</b>, plage <b>${IP.str(sn.first)} – ${IP.str(sn.last)}</b>, <b>${sn.hosts}</b> hôtes (2<sup>${32-sn.cidr}</sup> − 2).`; }
  $("sn-new").onclick=newSn; $("sn-lvl").onchange=newSn;
  $("sn-check").onclick=()=>{ const exp={"sn-net":IP.str(sn.net),"sn-bc":IP.str(sn.bc),"sn-first":IP.str(sn.first),"sn-last":IP.str(sn.last),"sn-h":String(sn.hosts)}; let ok=true;
    for(const k in exp){ const v=$(k).value.trim().replace(/\s/g,""); const good=v===exp[k]; $(k).classList.toggle("bad",!good); if(!good) ok=false; }
    if(ok){ snStreak++; fb("sn-fb",true,"✅ Parfait ! "+corr()); setTimeout(newSn,2500);} else { snStreak=0; fb("sn-fb",false,"❌ Certaines réponses sont fausses (en rouge). Réessayez ou affichez la correction."); }
    $("sn-streak").textContent=snStreak; };
  $("sn-show").onclick=()=>{ snStreak=0; $("sn-streak").textContent=0; fb("sn-fb",true,corr()); };
  newSn();

  // Masque/CIDR
  let mk=null;
  function newMk(){ const c=rnd(8,30); const dir=Math.random()<.5; mk={c,dir}; $("mk-q").textContent=dir?`Quel est le masque décimal de /${c} ?`:`Quelle est la notation CIDR de ${IP.str(IP.mask(c))} ?`; $("mk-a").value=""; $("mk-fb").innerHTML=""; }
  $("mk-new").onclick=newMk;
  $("mk-check").onclick=()=>{ const v=$("mk-a").value.trim().replace("/",""); const exp=mk.dir?IP.str(IP.mask(mk.c)):String(mk.c); const ok=v===exp; fb("mk-fb",ok,ok?"✅ Correct !":`❌ Réponse : <b>${mk.dir?exp:"/"+exp}</b>`); if(ok) setTimeout(newMk,1200); };
  newMk();

  // Binaire
  let bn=null, bnStreak=0;
  function newBn(){ const n=rnd(0,255), d=Math.random()<.5; bn={n,d}; $("bn-q").innerHTML=d?`Convertir <b>${n}</b> en binaire (8 bits)`:`Convertir <b class="mono">${n.toString(2).padStart(8,"0")}</b> en décimal`; $("bn-a").value=""; $("bn-fb").innerHTML=""; $("bn-a").focus({preventScroll:true}); }
  $("bn-new").onclick=newBn;
  const bnCheck=()=>{ const v=$("bn-a").value.trim(); const ok=bn.d?(/^[01]{1,8}$/.test(v)&&parseInt(v,2)===bn.n):(+v===bn.n&&v!=="");
    const det=[128,64,32,16,8,4,2,1].filter(p=>bn.n&p).join(" + ")||"0";
    if(ok){ bnStreak++; fb("bn-fb",true,`✅ Correct ! ${bn.n} = ${det}`); setTimeout(newBn,1200);} else { bnStreak=0; fb("bn-fb",false,`❌ ${bn.n} = ${bn.n.toString(2).padStart(8,"0")} (${det})`); }
    $("bn-streak").textContent=bnStreak; };
  $("bn-check").onclick=bnCheck; $("bn-a").addEventListener("keydown",e=>{if(e.key==="Enter")bnCheck();});
  newBn();

  // Ports
  let ptStreak=0;
  function newPt(){ const [name,port]=PORTS[rnd(0,PORTS.length-1)]; const ask=Math.random()<.5;
    const others=shuffle(PORTS.filter(p=>p[1]!==port)).slice(0,3); const choices=shuffle([[name,port],...others]);
    $("pt-q").innerHTML=ask?`Quel est le port de <b>${name}</b> ?`:`Quel service utilise le port <b>${port}</b> ?`; $("pt-fb").innerHTML="";
    $("pt-opts").innerHTML=choices.map(c=>`<button class="opt" data-v="${c[1]}">${ask?c[1]:c[0]}</button>`).join("");
    $("pt-opts").querySelectorAll(".opt").forEach(b=>b.onclick=()=>{ const ok=+b.dataset.v===port; $("pt-opts").querySelectorAll(".opt").forEach(x=>{x.disabled=true; if(+x.dataset.v===port)x.classList.add("correct");}); if(!ok)b.classList.add("wrong");
      ptStreak=ok?ptStreak+1:0; $("pt-streak").textContent=ptStreak; fb("pt-fb",ok,ok?"✅ Bravo !":`❌ ${name} = port ${port}`); setTimeout(newPt,1300); }); }
  newPt();

  // Même réseau
  let sm=null;
  function newSm(){ const c=rnd(20,29); const a=IP.parse(`192.168.${rnd(0,255)}.${rnd(1,254)}`); const same=Math.random()<.5; const info=IP.info(a,c);
    let b; if(same){ b=info.first+rnd(0,Math.max(0,info.hosts-1)); } else { b=(a+ (2**(32-c))*rnd(1,3))>>>0; }
    sm={a,b,c,same:((a&IP.mask(c))>>>0)===((b&IP.mask(c))>>>0)}; $("sm-q").innerHTML=`<span class="mono">${IP.str(a)}/${c}</span> et <span class="mono">${IP.str(b)}/${c}</span> sont-elles dans le même sous-réseau ?`; $("sm-fb").innerHTML=""; }
  el.querySelectorAll("[data-sm]").forEach(b=>b.onclick=()=>{ const ans=b.dataset.sm==="1"; const ok=ans===sm.same; fb("sm-fb",ok,`${ok?"✅ Correct":"❌ Faux"} — réseau de A : ${IP.str((sm.a&IP.mask(sm.c))>>>0)}, réseau de B : ${IP.str((sm.b&IP.mask(sm.c))>>>0)}`); });
  $("sm-new").onclick=newSm; newSm();
}
window.renderExercises=renderExercises;
})();
