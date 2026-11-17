/* Sandbox terminal simulée : Linux, Windows CMD, PowerShell, Cisco IOS */
(function(){
const NET = () => ({ ip:"192.168.1.10", cidr:24, gw:"192.168.1.1", dns:"192.168.1.1", mac:"08:00:27:4e:66:a1", host:"pc-etudiant", dhcp:true, dnsCache:{} });
const LAN = {"192.168.1.1":{mac:"a4:2b:b0:11:22:33",name:"box.lan"},"192.168.1.20":{mac:"00:50:79:66:68:01",name:"imprimante.lan"},"192.168.1.30":{mac:"3c:52:82:aa:bb:cc",name:"nas.lan"}};
const KNOWN = {"google.fr":"142.250.74.227","www.google.fr":"142.250.74.227","google.com":"142.250.179.110","youtube.com":"142.250.74.238","exemple.fr":"203.0.113.10","www.exemple.fr":"203.0.113.10","wikipedia.org":"185.15.58.224","fr.wikipedia.org":"185.15.58.224","cloudflare.com":"104.16.132.229","one.one.one.one":"1.1.1.1","dns.google":"8.8.8.8","box.lan":"192.168.1.1","nas.lan":"192.168.1.30","imprimante.lan":"192.168.1.20","localhost":"127.0.0.1"};
const REV = {"8.8.8.8":"dns.google","1.1.1.1":"one.one.one.one","142.250.74.227":"par21s19-in-f3.1e100.net","203.0.113.10":"www.exemple.fr","192.168.1.1":"box.lan"};
function hash(s){ let h=2166136261; for(const c of s){ h^=c.charCodeAt(0); h=Math.imul(h,16777619);} return h>>>0; }
function resolve(name, st){ name=name.toLowerCase().replace(/\.$/,""); if(IP.parse(name)!==null) return name;
  if(/(^|\.)(inexistant|invalid|example-nx)(\.|$)/.test(name)) return null;
  if(KNOWN[name]) return KNOWN[name]; if(!/\.[a-z]{2,}$/.test(name)) return null;
  const h=hash(name); return `${[151,185,93,104,172][h%5]}.${(h>>8)&255}.${(h>>16)&255}.${(h>>24)%254+1}`; }
function inLan(ip,st){ const a=IP.parse(ip), b=IP.parse(st.ip); if(a===null||b===null) return false; const m=IP.mask(st.cidr); return ((a&m)>>>0)===((b&m)>>>0); }
function reach(ip,st){ if(!st.ip) return "noip"; if(ip.startsWith("127.")||ip===st.ip) return "ok"; if(inLan(ip,st)) return LAN[ip]?"ok":"unreach";
  if(/^10\.99\./.test(ip)||ip.startsWith("192.0.2.")) return "timeout"; return "ok"; }
function rtt(ip,st){ if(ip.startsWith("127.")||ip===st.ip) return 0.04; if(inLan(ip,st)) return 1+Math.random()*2; return 8+(hash(ip)%40)+Math.random()*4; }
function hops(ip,st){ const h=[["box.lan",st.gw],["bras-par.fai.net","10.0.0.1"],["ae1.par-core1.fai.net","80.10.2.1"],["*",null],["ix-paris.franceix.net","37.49.236.10"]]; if(inLan(ip,st)) return [[REV[ip]||ip,ip]]; return [...h,[REV[ip]||ip,ip]]; }
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

/* ---------- Linux ---------- */
const linux = {
 prompt:st=>`<span style="color:#86efac">etudiant@${st.host}</span>:<span style="color:#93c5fd">~</span>$ `,
 banner:"Sandbox Linux (bash simulé) — tapez <b>help</b> pour la liste des commandes. Réseau : 192.168.1.10/24, passerelle 192.168.1.1.",
 cmds:["help","clear","ip addr","ip route","ip neigh","ip link","ifconfig","ping","traceroute","tracepath","mtr","nslookup","dig","host","ss -tulpn","netstat -tulpn","arp -a","curl -I","wget","hostname","whoami","uname -a","cat /etc/resolv.conf","cat /etc/hosts","nmap -sn","nc -zv","sudo dhclient","sudo dhclient -r","sudo ip addr add","sudo ip route add","resolvectl flush-caches","history","echo","date","pwd","ls"],
 async run(line,io,st){ let a=line.trim().split(/\s+/); if(a[0]==="sudo"){ a.shift(); if(!a.length) return io.out("usage: sudo commande"); }
  const c=a[0], A=a.slice(1).join(" ");
  switch(c){
   case "help": return io.out(`Commandes disponibles :
  ip addr | ip route | ip neigh | ip link     configuration réseau (iproute2)
  ifconfig                                    ancienne commande de configuration
  ping [-c N] hôte                            tester la connectivité (ICMP)
  traceroute | tracepath | mtr hôte           chemin vers une destination
  nslookup | dig | host nom                   requêtes DNS (dig -x IP : inverse)
  ss -tulpn | netstat -tulpn                  ports en écoute
  arp -a                                      cache ARP
  curl -I url | wget url                      requêtes HTTP
  nmap -sn 192.168.1.0/24 | nc -zv hôte port  scan / test de port
  sudo dhclient [-r]                          renouveler / libérer le bail DHCP
  sudo ip addr add IP/CIDR dev eth0           IP statique
  sudo ip route add default via IP            passerelle
  cat /etc/resolv.conf | cat /etc/hosts       fichiers de configuration
  hostname, whoami, uname -a, history, clear`);
   case "clear": return io.clear();
   case "ip": { const sub=a[1]||"";
     if(/^a/.test(sub)&&a[2]==="add"){ const m=a[3]&&IP.parseCidr(a[3]); if(!m) return io.out("Error: any valid prefix is expected rather than \""+(a[3]||"")+"\"."); st.ip=IP.str(m.ip); st.cidr=m.cidr; st.dhcp=false; return; }
     if(/^a/.test(sub)&&(a[2]==="flush"||a[2]==="del")){ st.ip=null; return; }
     if(/^a/.test(sub)) return io.out(`1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt; mtu 65536 qdisc noqueue state UNKNOWN
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
    inet6 ::1/128 scope host
2: eth0: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu 1500 qdisc fq_codel state UP qlen 1000
    link/ether ${st.mac} brd ff:ff:ff:ff:ff:ff
${st.ip?`    inet ${st.ip}/${st.cidr} brd ${IP.str(IP.info(IP.parse(st.ip),st.cidr).bc)} scope global ${st.dhcp?"dynamic ":""}eth0\n`:""}    inet6 fe80::${IPv6.eui64(st.mac)}/64 scope link`);
     if(/^r/.test(sub)&&a[2]==="add"){ const vi=a.indexOf("via"); if(vi<0) return io.out("Error: syntaxe : ip route add default via 192.168.1.1"); if(a[3]==="default") st.gw=a[vi+1]; return; }
     if(/^r/.test(sub)){ if(!st.ip) return; const net=IP.info(IP.parse(st.ip),st.cidr); return io.out(`${st.gw?`default via ${st.gw} dev eth0 proto ${st.dhcp?"dhcp":"static"} metric 100\n`:""}${IP.str(net.net)}/${st.cidr} dev eth0 proto kernel scope link src ${st.ip} metric 100`); }
     if(/^n/.test(sub)) return io.out(Object.entries(LAN).map(([ip,v])=>`${ip} dev eth0 lladdr ${v.mac} ${ip===st.gw?"REACHABLE":"STALE"}`).join("\n"));
     if(/^l/.test(sub)) return io.out(`1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt; mtu 65536 state UNKNOWN\n2: eth0: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu 1500 state UP\n    link/ether ${st.mac} brd ff:ff:ff:ff:ff:ff`);
     return io.out("Usage: ip [ addr | route | neigh | link ] ..."); }
   case "ifconfig": return io.out(`eth0: flags=4163&lt;UP,BROADCAST,RUNNING,MULTICAST&gt;  mtu 1500
${st.ip?`        inet ${st.ip}  netmask ${IP.str(IP.mask(st.cidr))}  broadcast ${IP.str(IP.info(IP.parse(st.ip),st.cidr).bc)}\n`:""}        inet6 fe80::${IPv6.eui64(st.mac)}  prefixlen 64  scopeid 0x20&lt;link&gt;
        ether ${st.mac}  txqueuelen 1000  (Ethernet)
lo: flags=73&lt;UP,LOOPBACK,RUNNING&gt;  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0`);
   case "ping": { let n=4; const ci=a.indexOf("-c"); if(ci>0){ n=Math.min(+a[ci+1]||4,20); a.splice(ci,2); } const tgt=a[1]; if(!tgt) return io.out("ping: usage error: Destination address required");
     const ip=resolve(tgt,st); if(!ip) return io.out(`ping: ${tgt}: Nom ou service inconnu`); if(!st.ip&&!ip.startsWith("127.")) return io.out("ping: connect: Le réseau n'est pas accessible");
     io.out(`PING ${tgt} (${ip}) 56(84) bytes of data.`); const r=reach(ip,st); let ok=0,times=[];
     for(let i=1;i<=n;i++){ await sleep(450); if(io.stopped()) break; if(r==="ok"){ const t=rtt(ip,st); times.push(t); ok++; io.out(`64 bytes from ${REV[ip]&&tgt!==ip?REV[ip]+" ("+ip+")":ip}: icmp_seq=${i} ttl=${inLan(ip,st)||ip.startsWith("127.")?64:115} time=${t.toFixed(t<1?3:1)} ms`); } else if(r==="unreach") io.out(`From ${st.ip} icmp_seq=${i} Destination Host Unreachable`); }
     const sent=times.length+(n-ok); return io.out(`\n--- ${tgt} ping statistics ---\n${n} packets transmitted, ${ok} received, ${Math.round((n-ok)/n*100)}% packet loss${times.length?`\nrtt min/avg/max = ${Math.min(...times).toFixed(3)}/${(times.reduce((x,y)=>x+y,0)/times.length).toFixed(3)}/${Math.max(...times).toFixed(3)} ms`:""}`); }
   case "traceroute": case "tracepath": case "mtr": { const tgt=a[1]; if(!tgt) return io.out("Usage: traceroute hôte"); const ip=resolve(tgt,st); if(!ip) return io.out(`${tgt}: Nom ou service inconnu`);
     io.out(`traceroute to ${tgt} (${ip}), 30 hops max, 60 byte packets`); let i=1;
     for(const [n,h] of hops(ip,st)){ await sleep(350); if(io.stopped()) break; if(!h) io.out(` ${i}  * * *`); else { const base=i===1?1:4+i*3; io.out(` ${i}  ${n} (${h})  ${(base+Math.random()).toFixed(3)} ms  ${(base+Math.random()).toFixed(3)} ms  ${(base+Math.random()*2).toFixed(3)} ms`); } i++; } return; }
   case "nslookup": { const n=a[1]; if(!n) return io.out("Usage: nslookup nom [serveur]"); const srv=a[2]||st.dns; const ip=resolve(n,st);
     if(IP.parse(n)!==null) return io.out(REV[n]?`${n.split(".").reverse().join(".")}.in-addr.arpa\tname = ${REV[n]}.`:`** server can't find ${n.split(".").reverse().join(".")}.in-addr.arpa: NXDOMAIN`);
     return io.out(`Server:\t\t${srv}\nAddress:\t${srv}#53\n\n${ip?`Non-authoritative answer:\nName:\t${n}\nAddress: ${ip}`:`** server can't find ${n}: NXDOMAIN`}`); }
   case "host": { const n=a[1]; if(!n) return io.out("Usage: host nom"); const ip=resolve(n,st); return io.out(ip?`${n} has address ${ip}`:`Host ${n} not found: 3(NXDOMAIN)`); }
   case "dig": { if(a[1]==="-x"){ const ip=a[2]; return io.out(`;; ANSWER SECTION:\n${(ip||"").split(".").reverse().join(".")}.in-addr.arpa. 3600 IN PTR ${REV[ip]||"(aucun)"}.`); }
     const n=a.find((x,i)=>i>0&&!x.startsWith("+")&&!/^(A|AAAA|MX|NS|TXT|CNAME|SOA)$/i.test(x)&&!x.startsWith("@")); const type=(a.find(x=>/^(A|AAAA|MX|NS|TXT|CNAME|SOA)$/i.test(x))||"A").toUpperCase(); const short=a.includes("+short");
     if(!n) return io.out("Usage: dig nom [type] [+short]"); const ip=resolve(n,st); if(!ip) return io.out(`;; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: NXDOMAIN`);
     const d=n.replace(/^www\./,""); const ans={A:`${n}.\t300\tIN\tA\t${ip}`,AAAA:`${n}.\t300\tIN\tAAAA\t2001:db8::${(hash(n)%65535).toString(16)}`,MX:`${d}.\t3600\tIN\tMX\t10 mail.${d}.`,NS:`${d}.\t86400\tIN\tNS\tns1.${d}.\n${d}.\t86400\tIN\tNS\tns2.${d}.`,TXT:`${d}.\t3600\tIN\tTXT\t"v=spf1 mx -all"`,CNAME:`${n}.\t300\tIN\tCNAME\t${d}.`,SOA:`${d}.\t3600\tIN\tSOA\tns1.${d}. hostmaster.${d}. 2026111701 7200 3600 1209600 3600`}[type];
     if(short) return io.out(ans.split("\n").map(l=>l.split("\t").pop()).join("\n"));
     return io.out(`; &lt;&lt;&gt;&gt; DiG 9.18 &lt;&lt;&gt;&gt; ${n} ${type}\n;; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: NOERROR\n;; flags: qr rd ra; QUERY: 1, ANSWER: ${ans.split("\n").length}\n\n;; QUESTION SECTION:\n;${n}.\t\t\tIN\t${type}\n\n;; ANSWER SECTION:\n${ans}\n\n;; Query time: 12 msec\n;; SERVER: ${st.dns}#53(${st.dns}) (UDP)`); }
   case "ss": case "netstat": return io.out(`Netid State  Recv-Q Send-Q Local Address:Port  Peer Address:Port Process
udp   UNCONN 0      0      127.0.0.53%lo:53         0.0.0.0:*     users:(("systemd-resolve",pid=512))
udp   UNCONN 0      0      ${st.ip||"0.0.0.0"}%eth0:68     0.0.0.0:*     users:(("dhclient",pid=640))
tcp   LISTEN 0      128          0.0.0.0:22         0.0.0.0:*     users:(("sshd",pid=801))
tcp   LISTEN 0      511          0.0.0.0:80         0.0.0.0:*     users:(("nginx",pid=902))
tcp   LISTEN 0      80         127.0.0.1:3306       0.0.0.0:*     users:(("mysqld",pid=955))
tcp   ESTAB  0      0      ${st.ip||"0.0.0.0"}:51544  142.250.74.227:443  users:(("firefox",pid=2210))`);
   case "arp": return io.out(Object.entries(LAN).map(([ip,v])=>`${v.name} (${ip}) at ${v.mac} [ether] on eth0`).join("\n"));
   case "curl": case "wget": { const u=a.filter(x=>!x.startsWith("-"))[1]; if(!u) return io.out(`${c}: try '${c} --help'`); const host=u.replace(/^https?:\/\//,"").split("/")[0]; const ip=resolve(host,st);
     if(!ip) return io.out(`${c}: (6) Could not resolve host: ${host}`); if(!st.ip||reach(ip,st)!=="ok") return io.out(`${c}: (28) Failed to connect to ${host} port 443: Connection timed out`);
     await sleep(300); const https=!u.startsWith("http://"); if(c==="wget") return io.out(`Résolution de ${host}… ${ip}\nConnexion à ${host}|${ip}|:${https?443:80}… connecté.\nrequête HTTP transmise, en attente de la réponse… 200 OK\nLongueur : 15342 (15K) [text/html]\nSauvegarde en : « index.html »\n\nindex.html  100%[===================&gt;]  14,98K  --.-KB/s    ds 0,02s`);
     return io.out(!https?`HTTP/1.1 301 Moved Permanently\nServer: nginx\nLocation: https://${host}/`:`HTTP/2 200\ncontent-type: text/html; charset=UTF-8\nserver: nginx\nstrict-transport-security: max-age=31536000\ncache-control: max-age=3600\ndate: ${new Date().toUTCString()}`); }
   case "nmap": { const t=a.find((x,i)=>i>0&&!x.startsWith("-")); if(!t) return io.out("Usage: nmap -sn 192.168.1.0/24 | nmap hôte"); io.out(`Starting Nmap 7.94 ( https://nmap.org )`); await sleep(900);
     if(t.includes("/")) return io.out(Object.entries({...LAN,[st.ip]:{mac:st.mac,name:st.host}}).map(([ip,v])=>`Nmap scan report for ${v.name} (${ip})\nHost is up (0.0021s latency).`).join("\n")+`\nNmap done: 256 IP addresses (4 hosts up) scanned in 2.31 seconds`);
     return io.out(`Nmap scan report for ${t}\nPORT    STATE  SERVICE\n22/tcp  open   ssh\n80/tcp  open   http\n443/tcp open   https\n3389/tcp closed ms-wbt-server\n\nNmap done: 1 IP address (1 host up) scanned in 1.12 seconds\n<span style="color:#fbbf24">Rappel : ne scannez que des réseaux qui vous appartiennent ou avec autorisation.</span>`); }
   case "nc": { const h=a[a.length-2], p=a[a.length-1]; if(!h||!/^\d+$/.test(p)) return io.out("Usage: nc -zv hôte port"); const ip=resolve(h,st); const open=[22,25,53,80,443,587,993].includes(+p);
     return io.out(ip&&open&&reach(ip,st)==="ok"?`Connection to ${h} (${ip}) ${p} port [tcp/*] succeeded!`:`nc: connect to ${h} (${ip||"?"}) port ${p} (tcp) failed: ${open?"Connection timed out":"Connection refused"}`); }
   case "dhclient": if(a.includes("-r")){ st.ip=null; st.dhcp=false; return io.out("Bail DHCP libéré : eth0 n'a plus d'adresse IPv4."); }
     io.out("DHCPDISCOVER on eth0 to 255.255.255.255 port 67"); await sleep(400); io.out("DHCPOFFER of 192.168.1.10 from 192.168.1.1"); await sleep(300); io.out("DHCPREQUEST for 192.168.1.10 on eth0 to 255.255.255.255 port 67"); await sleep(300); io.out("DHCPACK of 192.168.1.10 from 192.168.1.1\nbound to 192.168.1.10 -- renewal in 43200 seconds.");
     Object.assign(st,{ip:"192.168.1.10",cidr:24,gw:"192.168.1.1",dns:"192.168.1.1",dhcp:true}); return;
   case "resolvectl": case "systemd-resolve": st.dnsCache={}; return io.out("Cache DNS vidé.");
   case "cat": if(a[1]==="/etc/resolv.conf") return io.out(`# Généré par systemd-resolved\nnameserver ${st.dns}\nsearch lan`); if(a[1]==="/etc/hosts") return io.out(`127.0.0.1\tlocalhost\n127.0.1.1\t${st.host}\n::1\tlocalhost ip6-localhost`); if(a[1]==="/etc/network/interfaces"||a[1]==="/etc/netplan/01-netcfg.yaml") return io.out(`network:\n  version: 2\n  ethernets:\n    eth0:\n      dhcp4: true`); return io.out(`cat: ${a[1]||""}: Aucun fichier ou dossier de ce type`);
   case "hostname": if(a[1]){ st.host=a[1]; return; } return io.out(st.host);
   case "whoami": return io.out("etudiant");
   case "uname": return io.out("Linux "+st.host+" 6.8.0-45-generic #45-Ubuntu SMP x86_64 GNU/Linux");
   case "date": return io.out(new Date().toString());
   case "pwd": return io.out("/home/etudiant");
   case "ls": return io.out("captures  configs  notes-reseau.txt");
   case "echo": return io.out(A.replace(/</g,"&lt;"));
   case "history": return io.out(io.history().map((h,i)=>`  ${i+1}  ${h.replace(/</g,"&lt;")}`).join("\n"));
   case "exit": return io.out("Astuce : changez de terminal avec les onglets ci-dessus.");
   default: return io.out(`${c.replace(/</g,"&lt;")}: commande introuvable. Tapez <b>help</b>.`);
  } }
};

/* ---------- Windows CMD ---------- */
function ipconfigOut(st,all){ return `\nConfiguration IP de Windows\n${all?`\n   Nom de l'hôte . . . . . . . . . . : ${st.host.toUpperCase()}\n   Type de nœud. . . . . . . . . . . : Hybride\n   Routage IP activé . . . . . . . . : Non\n`:""}\nCarte Ethernet Ethernet :\n\n   Suffixe DNS propre à la connexion. : lan\n${all?`   Description. . . . . . . . . . . . : Intel(R) Ethernet Connection I219-V\n   Adresse physique . . . . . . . . . : ${st.mac.toUpperCase().replace(/:/g,"-")}\n   DHCP activé. . . . . . . . . . . . : ${st.dhcp?"Oui":"Non"}\n`:""}   Adresse IPv6 de liaison locale. . .: fe80::${IPv6.eui64(st.mac)}%12\n   Adresse IPv4. . . . . . . . . . . .: ${st.ip||"169.254.83.17"}${st.ip?"":" (APIPA — aucun serveur DHCP !)"}\n   Masque de sous-réseau. . . . . . . : ${st.ip?IP.str(IP.mask(st.cidr)):"255.255.0.0"}\n   Passerelle par défaut. . . . . . . : ${st.ip?st.gw:""}${all&&st.ip?`\n   Serveur DHCP . . . . . . . . . . . : 192.168.1.1\n   Bail obtenu. . . . . . . . . . . . : ${new Date().toLocaleString("fr-FR")}\n   Serveurs DNS. . . . . . . . . . . .: ${st.dns}`:""}`; }
async function winPing(a,io,st,ps){ let n=4; const ni=a.findIndex(x=>/^[-/]n$/i.test(x)); if(ni>0){ n=Math.min(+a[ni+1]||4,20); a.splice(ni,2); } if(a.some(x=>/^[-/]t$/i.test(x))) n=20; const tgt=a.filter(x=>!x.startsWith("-")&&!x.startsWith("/"))[1];
  if(!tgt) return io.out("Utilisation : ping [-t] [-n nombre] nom_cible"); const ip=resolve(tgt,st); if(!ip) return io.out(`La requête Ping n'a pas pu trouver l'hôte ${tgt}. Vérifiez le nom et essayez à nouveau.`);
  io.out(`\nEnvoi d'une requête 'Ping'  ${tgt}${tgt!==ip?" ["+ip+"]":""} avec 32 octets de données :`); const r=st.ip?reach(ip,st):(ip.startsWith("127.")?"ok":"fail"); let ok=0,t=[];
  for(let i=0;i<n;i++){ await sleep(450); if(io.stopped()) break; if(r==="ok"){ const x=Math.max(1,Math.round(rtt(ip,st))); t.push(x); ok++; io.out(`Réponse de ${ip} : octets=32 temps${x<=1?"&lt;1":"="+x}ms TTL=${inLan(ip,st)?128:115}`);} else if(r==="unreach") io.out(`Réponse de ${st.ip} : Impossible de joindre l'hôte de destination.`); else if(r==="fail") io.out("La transmission a échoué. Défaillance générale."); else io.out("Délai d'attente de la demande dépassé."); }
  const cnt=t.length?n:n; io.out(`\nStatistiques Ping pour ${ip}:\n    Paquets : envoyés = ${cnt}, reçus = ${r==="unreach"?cnt:ok}, perdus = ${r==="unreach"?0:cnt-ok} (perte ${r==="unreach"?0:Math.round((cnt-ok)/cnt*100)}%),${t.length?`\nDurée approximative des boucles en millisecondes :\n    Minimum = ${Math.min(...t)}ms, Maximum = ${Math.max(...t)}ms, Moyenne = ${Math.round(t.reduce((x,y)=>x+y,0)/t.length)}ms`:""}`); }
async function winTracert(tgt,io,st){ if(!tgt) return io.out("Utilisation : tracert nom_cible"); const ip=resolve(tgt,st); if(!ip) return io.out(`Impossible de résoudre le nom du système cible ${tgt}.`);
  io.out(`\nDétermination de l'itinéraire vers ${tgt} [${ip}]\navec un maximum de 30 sauts :\n`); let i=1; for(const [n,h] of hops(ip,st)){ await sleep(350); if(io.stopped()) break; const b=i===1?1:4+i*3; io.out(h?`  ${String(i).padStart(2)}    ${b} ms    ${b+1} ms    ${b} ms  ${n!==h?n+" ["+h+"]":h}`:`  ${String(i).padStart(2)}     *        *        *     Délai d'attente de la demande dépassé.`); i++; } io.out("\nItinéraire déterminé."); }
function winNslookup(n,io,st){ if(!n) return io.out(`Serveur par défaut :   box.lan\nAddress:  ${st.dns}\n\n(mode interactif non simulé — utilisez : nslookup nom)`); const ip=resolve(n,st);
  if(IP.parse(n)!==null) return io.out(`Serveur :   box.lan\nAddress:  ${st.dns}\n\n${REV[n]?`Nom :    ${REV[n]}\nAddress:  ${n}`:`*** box.lan ne parvient pas à trouver ${n} : Non-existent domain`}`);
  return io.out(`Serveur :   box.lan\nAddress:  ${st.dns}\n\n${ip?`Réponse ne faisant pas autorité :\nNom :    ${n}\nAddress:  ${ip}`:`*** box.lan ne parvient pas à trouver ${n} : Non-existent domain`}`); }
const NETSTAT=st=>`\nConnexions actives\n\n  Proto  Adresse locale         Adresse distante       État          PID\n  TCP    0.0.0.0:135            0.0.0.0:0              LISTENING     1012\n  TCP    0.0.0.0:445            0.0.0.0:0              LISTENING     4\n  TCP    0.0.0.0:3389           0.0.0.0:0              LISTENING     1288\n  TCP    ${st.ip||"0.0.0.0"}:51544    142.250.74.227:443     ESTABLISHED   6420\n  TCP    ${st.ip||"0.0.0.0"}:51560    20.190.159.2:443       ESTABLISHED   3904\n  UDP    0.0.0.0:5353           *:*                                  2216`;
const ARPW=st=>`\nInterface : ${st.ip||"169.254.83.17"} --- 0xc\n  Adresse Internet      Adresse physique      Type\n${Object.entries(LAN).map(([ip,v])=>`  ${ip.padEnd(22)}${v.mac.replace(/:/g,"-").padEnd(22)}dynamique`).join("\n")}\n  192.168.1.255         ff-ff-ff-ff-ff-ff     statique\n  224.0.0.251           01-00-5e-00-00-fb     statique`;
const ROUTEW=st=>`===========================================================================\nIPv4 Table de routage\n===========================================================================\nItinéraires actifs :\nDestination réseau    Masque réseau  Adr. passerelle   Adr. interface Métrique\n          0.0.0.0          0.0.0.0      ${st.gw.padEnd(15)}  ${(st.ip||"-").padEnd(14)} 25\n        127.0.0.0        255.0.0.0         On-link         127.0.0.1    331\n      192.168.1.0    255.255.255.0         On-link      ${(st.ip||"-").padEnd(14)} 281\n===========================================================================`;

const cmd = {
 prompt:()=>"C:\\Users\\Etudiant&gt; ",
 banner:"Microsoft Windows [version 10.0.22631] — Invite de commandes simulée. Tapez <b>help</b>.",
 cmds:["help","cls","ipconfig","ipconfig /all","ipconfig /release","ipconfig /renew","ipconfig /flushdns","ipconfig /displaydns","ping","tracert","pathping","nslookup","arp -a","netstat -ano","route print","hostname","getmac","whoami","netsh interface ip show config","ver","powershell"],
 async run(line,io,st){ const a=line.trim().split(/\s+/); const c=a[0].toLowerCase(); const opt=(a[1]||"").toLowerCase();
  switch(c){
   case "help": return io.out(`Commandes réseau disponibles :
  ipconfig [/all | /release | /renew | /flushdns | /displaydns]
  ping [-n N] [-t] cible        tracert cible        pathping cible
  nslookup nom [serveur]        arp -a               netstat -ano
  route print                   getmac               hostname
  netsh interface ip show config
  cls, ver, whoami, powershell (bascule vers l'onglet PowerShell)`);
   case "cls": return io.clear();
   case "ipconfig": if(opt==="/release"){ st.ip=null; return io.out("\nConfiguration IP de Windows\n\nCarte Ethernet Ethernet :\n   Adresse IPv4 libérée."); }
     if(opt==="/renew"){ io.out("\nConfiguration IP de Windows\n(Échange DHCP : Discover → Offer → Request → Ack…)"); await sleep(1000); Object.assign(st,{ip:"192.168.1.10",cidr:24,gw:"192.168.1.1",dhcp:true}); return io.out(ipconfigOut(st,false)); }
     if(opt==="/flushdns"){ st.dnsCache={}; return io.out("\nConfiguration IP de Windows\n\nCache de résolution DNS vidé."); }
     if(opt==="/displaydns") return io.out(`\nConfiguration IP de Windows\n\n    google.fr\n    ----------------------------------------\n    Nom d'enregistrement . : google.fr\n    Type d'enregistrement. : 1\n    Durée de vie . . . . . : 187\n    Enregistrement A (hôte) : 142.250.74.227`);
     return io.out(ipconfigOut(st,opt==="/all"));
   case "ping": return winPing(a,io,st);
   case "tracert": return winTracert(a.filter(x=>!x.startsWith("-"))[1],io,st);
   case "pathping": io.out("Calcul des statistiques sur 25 secondes (simulé)…"); return winTracert(a[1],io,st);
   case "nslookup": return winNslookup(a[1],io,st);
   case "arp": return io.out(ARPW(st));
   case "netstat": return io.out(NETSTAT(st));
   case "route": return io.out(ROUTEW(st));
   case "hostname": return io.out(st.host.toUpperCase());
   case "getmac": return io.out(`\nAdresse physique    Nom du transport\n=================== ==========================================================\n${st.mac.toUpperCase().replace(/:/g,"-")}   \\Device\\Tcpip_{4E6B1A2C-9F1D-4D8B-A1E2-7C3B9F0A1D22}`);
   case "whoami": return io.out(st.host.toLowerCase()+"\\etudiant");
   case "ver": return io.out("\nMicrosoft Windows [version 10.0.22631.4460]");
   case "netsh": return io.out(`\nConfiguration pour l'interface « Ethernet »\n    DHCP activé :                         ${st.dhcp?"Oui":"Non"}\n    Adresse IP :                          ${st.ip||"-"}\n    Préfixe de sous-réseau :              ${st.ip?IP.str(IP.info(IP.parse(st.ip),st.cidr).net)+"/"+st.cidr+" (masque "+IP.str(IP.mask(st.cidr))+")":"-"}\n    Passerelle par défaut :               ${st.gw}\n    Serveurs DNS configurés via DHCP :    ${st.dns}`);
   case "powershell": io.switchTo("ps"); return;
   default: return io.out(`'${a[0].replace(/</g,"&lt;")}' n'est pas reconnu en tant que commande interne\nou externe, un programme exécutable ou un fichier de commandes. (Tapez help)`);
  } }
};

/* ---------- PowerShell ---------- */
const ps = {
 prompt:()=>"PS C:\\Users\\Etudiant&gt; ",
 banner:"Windows PowerShell (simulé) — tapez <b>Get-Help</b> ou <b>help</b>. Les commandes CMD ipconfig/ping fonctionnent aussi.",
 cmds:["Get-Help","Clear-Host","Get-NetIPConfiguration","Get-NetIPAddress","Get-NetAdapter","Get-NetRoute","Get-NetNeighbor","Get-NetTCPConnection","Get-DnsClientServerAddress","Test-Connection","Test-NetConnection","Resolve-DnsName","Clear-DnsClientCache","New-NetIPAddress","Get-NetFirewallProfile","ipconfig","ping","tracert"],
 async run(line,io,st){ const a=line.trim().split(/\s+/); const c=a[0].toLowerCase(); const arg=(n)=>{ const i=a.findIndex(x=>x.toLowerCase()===n.toLowerCase()); return i>=0?a[i+1]:undefined; }; const pos=a.slice(1).filter((x,i,arr)=>!x.startsWith("-")&&!(i>0&&arr[i-1].startsWith("-")))[0];
  switch(c){
   case "help": case "get-help": return io.out(`Cmdlets réseau disponibles :
  Get-NetIPConfiguration                Get-NetIPAddress [-AddressFamily IPv4]
  Get-NetAdapter                        Get-NetRoute    Get-NetNeighbor
  Get-NetTCPConnection [-State Listen]  Get-DnsClientServerAddress
  Test-Connection cible [-Count N]      Test-NetConnection cible [-Port N] [-TraceRoute]
  Resolve-DnsName nom [-Type MX]        Clear-DnsClientCache
  New-NetIPAddress -InterfaceAlias Ethernet -IPAddress IP -PrefixLength N -DefaultGateway GW
  Get-NetFirewallProfile                Clear-Host (cls)
  + ipconfig, ping, tracert, nslookup, arp, netstat`);
   case "clear-host": case "cls": case "clear": return io.clear();
   case "get-netipconfiguration": case "gip": return io.out(`\nInterfaceAlias       : Ethernet\nInterfaceIndex       : 12\nInterfaceDescription : Intel(R) Ethernet Connection I219-V\nNetProfile.Name      : Réseau 2\nIPv4Address          : ${st.ip||"169.254.83.17"}\nIPv6DefaultGateway   :\nIPv4DefaultGateway   : ${st.gw}\nDNSServer            : ${st.dns}`);
   case "get-netipaddress": return io.out(`\nIPAddress         : ${st.ip||"169.254.83.17"}\nInterfaceIndex    : 12\nInterfaceAlias    : Ethernet\nAddressFamily     : IPv4\nType              : Unicast\nPrefixLength      : ${st.ip?st.cidr:16}\nPrefixOrigin      : ${st.dhcp?"Dhcp":"Manual"}\nAddressState      : Preferred\n\nIPAddress         : 127.0.0.1\nInterfaceAlias    : Loopback Pseudo-Interface 1\nAddressFamily     : IPv4\nPrefixLength      : 8`);
   case "get-netadapter": return io.out(`\nName      InterfaceDescription                 ifIndex Status  MacAddress         LinkSpeed\n----      --------------------                 ------- ------  ----------         ---------\nEthernet  Intel(R) Ethernet Connection I219-V       12 Up      ${st.mac.toUpperCase().replace(/:/g,"-")}  1 Gbps\nWi-Fi     Intel(R) Wi-Fi 6 AX201 160MHz             9 Disconnected 7C-B2-7D-11-22-33  0 bps`);
   case "get-netroute": return io.out(`\nifIndex DestinationPrefix  NextHop      RouteMetric ifMetric PolicyStore\n------- -----------------  -------      ----------- -------- -----------\n12      0.0.0.0/0          ${st.gw.padEnd(12)} 0           25       ActiveStore\n12      192.168.1.0/24     0.0.0.0      256         25       ActiveStore\n1       127.0.0.0/8        0.0.0.0      256         75       ActiveStore`);
   case "get-netneighbor": return io.out(`\nifIndex IPAddress       LinkLayerAddress   State\n------- ---------       ----------------   -----\n${Object.entries(LAN).map(([ip,v])=>`12      ${ip.padEnd(15)} ${v.mac.toUpperCase().replace(/:/g,"-")}  ${ip===st.gw?"Reachable":"Stale"}`).join("\n")}`);
   case "get-nettcpconnection": { const listen=(arg("-State")||"").toLowerCase()==="listen"; const rows=[["0.0.0.0",135,"0.0.0.0",0,"Listen"],["0.0.0.0",445,"0.0.0.0",0,"Listen"],["0.0.0.0",3389,"0.0.0.0",0,"Listen"],[st.ip||"0.0.0.0",51544,"142.250.74.227",443,"Established"]].filter(r=>!listen||r[4]==="Listen");
     return io.out(`\nLocalAddress    LocalPort RemoteAddress    RemotePort State\n------------    --------- -------------    ---------- -----\n${rows.map(r=>`${String(r[0]).padEnd(15)} ${String(r[1]).padEnd(9)} ${String(r[2]).padEnd(16)} ${String(r[3]).padEnd(10)} ${r[4]}`).join("\n")}`); }
   case "get-dnsclientserveraddress": return io.out(`\nInterfaceAlias  Interface Address ServerAddresses\n                Index     Family\n--------------  --------- ------- ---------------\nEthernet        12        IPv4    {${st.dns}}`);
   case "clear-dnsclientcache": st.dnsCache={}; return;
   case "test-connection": { const t=arg("-TargetName")||arg("-ComputerName")||pos; if(!t) return io.out("Test-Connection : paramètre -TargetName requis."); const n=Math.min(+arg("-Count")||4,10); const ip=resolve(t,st);
     if(!ip) return io.out(`Test-Connection : Impossible de résoudre le nom de la cible « ${t} ».`); io.out(`\n   Destination: ${t}\n\nPing Source       Address          Latency BufferSize Status\n                                    (ms)       (B)\n---- ------       -------          ------- ---------- ------`);
     const r=reach(ip,st); for(let i=1;i<=n;i++){ await sleep(450); if(io.stopped()) break; io.out(`   ${i} ${st.host.toUpperCase().padEnd(12)} ${ip.padEnd(16)} ${r==="ok"?String(Math.round(rtt(ip,st))).padStart(7):"      *"}         32 ${r==="ok"?"Success":"TimedOut"}`); } return; }
   case "test-netconnection": case "tnc": { const t=arg("-ComputerName")||pos||"internetbeacon.msedge.net"; const port=arg("-Port"); const ip=resolve(t,st);
     if(!ip) return io.out(`AVERTISSEMENT : Name resolution of ${t} failed`);
     if(a.some(x=>x.toLowerCase()==="-traceroute")) return io.out(`\nComputerName           : ${t}\nRemoteAddress          : ${ip}\nInterfaceAlias         : Ethernet\nSourceAddress          : ${st.ip}\nPingSucceeded          : True\nTraceRoute             : ${hops(ip,st).map(h=>h[1]||"0.0.0.0").join("\n                         ")}`);
     await sleep(600); const ok=reach(ip,st)==="ok"; const pok=ok&&(!port||[22,25,53,80,443,587,993,3389].includes(+port));
     return io.out(`\nComputerName     : ${t}\nRemoteAddress    : ${ip}\n${port?`RemotePort       : ${port}\n`:""}InterfaceAlias   : Ethernet\nSourceAddress    : ${st.ip||"169.254.83.17"}\n${port?`TcpTestSucceeded : ${pok?"True":"False"}`:`PingSucceeded    : ${ok?"True":"False"}\nPingReplyDetails (RTT) : ${ok?Math.round(rtt(ip,st)):0} ms`}`); }
   case "resolve-dnsname": { const n=arg("-Name")||pos; const type=(arg("-Type")||"A").toUpperCase(); if(!n) return io.out("Resolve-DnsName : paramètre -Name requis."); const ip=resolve(n,st);
     if(!ip) return io.out(`Resolve-DnsName : ${n} : Nom DNS inexistant`); const d=n.replace(/^www\./,"");
     if(type==="MX") return io.out(`\nName          Type TTL  Section NameExchange       Preference\n----          ---- ---  ------- ------------       ----------\n${d.padEnd(13)} MX   3600 Answer  mail.${d.padEnd(13)} 10`);
     return io.out(`\nName                Type   TTL   Section    IPAddress\n----                ----   ---   -------    ---------\n${n.padEnd(19)} A      300   Answer     ${ip}`); }
   case "new-netipaddress": { const ipA=arg("-IPAddress"), pl=+arg("-PrefixLength"), gw=arg("-DefaultGateway"); if(!ipA||IP.parse(ipA)===null||!(pl>=1&&pl<=32)) return io.out("New-NetIPAddress : paramètres -IPAddress et -PrefixLength valides requis.");
     Object.assign(st,{ip:ipA,cidr:pl,dhcp:false}); if(gw) st.gw=gw; return io.out(`\nIPAddress         : ${ipA}\nInterfaceAlias    : Ethernet\nAddressFamily     : IPv4\nPrefixLength      : ${pl}\nPrefixOrigin      : Manual\nAddressState      : Tentative`); }
   case "get-netfirewallprofile": return io.out(`\nName    Enabled DefaultInboundAction DefaultOutboundAction\n----    ------- -------------------- ---------------------\nDomain  True    Block                Allow\nPrivate True    Block                Allow\nPublic  True    Block                Allow`);
   case "ipconfig": case "nslookup": case "arp": case "netstat": case "route": case "tracert": case "hostname": return cmd.run(line,io,st);
   case "ping": return winPing(a,io,st,true);
   default: return io.out(`<span style="color:#f87171">${a[0].replace(/</g,"&lt;")} : Le terme « ${a[0].replace(/</g,"&lt;")} » n'est pas reconnu comme nom d'applet de commande, fonction, fichier de script ou programme exécutable.</span> (Tapez Get-Help)`);
  } }
};

/* ---------- Cisco IOS ---------- */
function iosState(){ return { hostname:"Router", mode:"user", iface:null, secret:null, saved:false, routes:[], vlans:{1:"default"},
  ifs:{"GigabitEthernet0/0":{ip:null,mask:null,up:false,desc:""},"GigabitEthernet0/1":{ip:null,mask:null,up:false,desc:""},"Serial0/0/0":{ip:null,mask:null,up:false,desc:""}} }; }
function ifName(s){ s=(s||"").toLowerCase().replace(/\s+/g,""); const m=s.match(/^(g|gi|gig|giga|gigabitethernet)(\d\/\d)$/)||[]; if(m[2]) return "GigabitEthernet"+m[2]; const n=s.match(/^(s|se|ser|serial)(\d\/\d\/\d)$/); if(n) return "Serial"+n[2]; return null; }
const ios = {
 prompt(st){ const r=st.ios, h=r.hostname; return {user:`${h}&gt;`,priv:`${h}#`,config:`${h}(config)#`,if:`${h}(config-if)#`,vlan:`${h}(config-vlan)#`,line:`${h}(config-line)#`,router:`${h}(config-router)#`}[r.mode]+" "; },
 banner:"Cisco IOS (simulé) — routeur avec G0/0, G0/1, S0/0/0. Utilisez <b>?</b> pour l'aide, abréviations acceptées (conf t, sh ip int br…).",
 cmds:["enable","disable","configure terminal","show running-config","show ip interface brief","show ip route","show vlan brief","show version","show interfaces","copy running-config startup-config","write memory","hostname","interface GigabitEthernet0/0","interface GigabitEthernet0/1","ip address","no shutdown","shutdown","description","ip route","vlan","name","exit","end","ping","enable secret","router ospf","network","line vty 0 4","reload"],
 async run(line,io,st){ const r=st.ios; let s=line.trim().replace(/\s+/g," "); if(!s) return; const l=s.toLowerCase(); const w=l.split(" ");
  const is=(p,min)=>{ const pw=p.split(" "); if(w.length<pw.length) return false; return pw.every((x,i)=>x.startsWith(w[i])&&w[i].length>=Math.min(min||1,x.length)); };
  const help=list=>io.out(list.map(([c,d])=>`  ${c.padEnd(22)}${d}`).join("\n"));
  if(l==="end"||l==="\u001a"){ if(r.mode!=="user"&&r.mode!=="priv") r.mode="priv"; return; }
  if(is("exit")){ r.mode={if:"config",vlan:"config",line:"config",router:"config",config:"priv",priv:"user",user:"user"}[r.mode]; return; }
  if(w[0]==="do"&&r.mode!=="user"&&r.mode!=="priv"){ const save=r.mode; r.mode="priv"; await ios.run(s.slice(3),io,st); r.mode=save; return; }
  if(is("ping")&&(r.mode==="user"||r.mode==="priv")){ const t=w[1]; if(!t||IP.parse(t)===null) return io.out("% Adresse IP requise"); const ok=Object.values(r.ifs).some(i=>i.up&&i.ip&&((IP.parse(i.ip)&IP.parse(i.mask))>>>0)===((IP.parse(t)&IP.parse(i.mask))>>>0))||r.routes.some(x=>((IP.parse(t)&IP.parse(x.mask))>>>0)===IP.parse(x.net));
    io.out(`Type escape sequence to abort.\nSending 5, 100-byte ICMP Echos to ${t}, timeout is 2 seconds:`); let b=""; for(let i=0;i<5;i++){ await sleep(300); b+=ok?(i===0&&!r._arp?".":"!"):"."; } r._arp=true; return io.out(`${b}\nSuccess rate is ${ok?(b.split("!").length-1)*20:0} percent (${ok?b.split("!").length-1:0}/5)${ok?", round-trip min/avg/max = 1/2/4 ms":""}`); }
  if(r.mode==="user"){ if(l==="?") return help([["enable","Passer en mode privilégié"],["ping","Tester la connectivité"],["show","Afficher des informations"],["exit","Quitter"]]);
    if(is("enable",2)){ r.mode="priv"; return; } if(is("show",2)) return ios.show(w,io,st); return io.out("% Commande inconnue ou incomplète en mode utilisateur. Tapez « enable » puis « ? »."); }
  if(r.mode==="priv"){ if(l==="?") return help([["configure terminal","Mode de configuration globale"],["show","Afficher (running-config, ip interface brief, ip route, vlan brief, version)"],["copy running-config startup-config","Sauvegarder"],["write memory","Sauvegarder"],["ping","Tester la connectivité"],["reload","Redémarrer"],["disable","Revenir au mode utilisateur"]]);
    if(is("configure terminal",2)||l==="conf t"||l==="configure"){ r.mode="config"; return io.out("Enter configuration commands, one per line.  End with CNTL/Z."); }
    if(is("disable",3)){ r.mode="user"; return; }
    if(is("show",2)) return ios.show(w,io,st);
    if(is("copy running-config startup-config",2)||l==="copy run start"||is("write memory",2)||l==="wr"){ r.saved=JSON.stringify(r.ifs)+JSON.stringify(r.routes)+r.hostname; io.out("Destination filename [startup-config]?\nBuilding configuration..."); await sleep(500); return io.out("[OK]"); }
    if(is("reload",3)){ io.out("Proceed with reload? [confirm]"); await sleep(600); const saved=r.saved; if(!saved){ Object.assign(r,iosState()); return io.out("\n%SYS-5-RELOAD: Reload requested\n... Système redémarré. <span style='color:#fbbf24'>La configuration non sauvegardée a été perdue !</span>"); } r.mode="user"; return io.out("\n%SYS-5-RELOAD: Reload requested\n... Système redémarré avec la startup-config."); }
    return io.out("% Invalid input detected at '^' marker. (Tapez ?)"); }
  // modes de configuration
  if(l==="?"){ if(r.mode==="config") return help([["hostname NOM","Nom de l'équipement"],["interface g0/0","Configurer une interface"],["ip route RÉSEAU MASQUE NEXT-HOP","Route statique"],["vlan N","Créer un VLAN"],["enable secret MDP","Mot de passe du mode privilégié"],["router ospf N","Configurer OSPF"],["line vty 0 4","Lignes d'accès distant"],["banner motd #texte#","Bannière"],["exit / end","Remonter / quitter"]]);
    if(r.mode==="if") return help([["ip address IP MASQUE","Adresse IPv4"],["no shutdown","Activer l'interface"],["shutdown","Désactiver"],["description TEXTE","Description"],["exit / end",""]]);
    if(r.mode==="vlan") return help([["name NOM","Nom du VLAN"],["exit",""]]); if(r.mode==="router") return help([["network RÉSEAU WILDCARD area N","Annoncer un réseau"],["router-id A.B.C.D","Identifiant"],["exit",""]]); return help([["password MDP",""],["login",""],["transport input ssh",""],["exit",""]]); }
  if(w[0]==="interface"||w[0]==="int"){ const n=ifName(w.slice(1).join("")); if(!n||!r.ifs[n]) return io.out("% Interface invalide (essayez g0/0, g0/1 ou s0/0/0)"); r.iface=n; r.mode="if"; return; }
  if(r.mode==="config"){
    if(is("hostname",4)&&w[1]){ r.hostname=s.split(" ")[1]; return; }
    if(is("ip route",2)){ const [net,mask,nh]=w.slice(2); if([net,mask,nh].some(x=>IP.parse(x||"")===null)) return io.out("% Syntaxe : ip route 172.16.0.0 255.255.0.0 10.0.0.2"); r.routes.push({net,mask,nh}); return; }
    if(is("vlan")&&/^\d+$/.test(w[1]||"")){ const id=+w[1]; if(id<1||id>4094) return io.out("% VLAN ID invalide (1-4094)"); r.vlans[id]=r.vlans[id]||("VLAN"+String(id).padStart(4,"0")); r.curVlan=id; r.mode="vlan"; return; }
    if(is("enable secret",2)){ r.secret=w[2]||""; return; }
    if(is("router ospf",3)){ r.mode="router"; return; }
    if(is("line")){ r.mode="line"; return; }
    if(is("banner")||is("no ip domain-lookup",2)||is("service password-encryption",3)) return;
    return io.out("% Invalid input detected at '^' marker. (Tapez ?)"); }
  if(r.mode==="if"){ const i=r.ifs[r.iface];
    if(is("ip address",2)){ const [ip,mask]=w.slice(2); if(IP.parse(ip||"")===null||IP.parse(mask||"")===null||IP.cidrFromMask(IP.parse(mask))<0) return io.out("% Syntaxe : ip address 192.168.1.1 255.255.255.0"); i.ip=ip; i.mask=mask; return; }
    if(is("no shutdown",2)||l==="no shut"){ i.up=true; const t=new Date().toTimeString().slice(0,8); return io.out(`%LINK-5-CHANGED: Interface ${r.iface}, changed state to up\n%LINEPROTO-5-UPDOWN: Line protocol on Interface ${r.iface}, changed state to up`); }
    if(is("shutdown",4)){ i.up=false; return io.out(`%LINK-5-CHANGED: Interface ${r.iface}, changed state to administratively down`); }
    if(is("description",4)){ i.desc=s.split(" ").slice(1).join(" "); return; }
    return io.out("% Invalid input detected at '^' marker. (Tapez ?)"); }
  if(r.mode==="vlan"){ if(is("name")&&w[1]){ r.vlans[r.curVlan]=s.split(" ")[1]; return; } return io.out("% Commande invalide en mode VLAN"); }
  return; },
 show(w,io,st){ const r=st.ios, sub=w.slice(1).join(" ");
  const ifcfg=()=>Object.entries(r.ifs).map(([n,i])=>`interface ${n}\n${i.desc?" description "+i.desc+"\n":""}${i.ip?` ip address ${i.ip} ${i.mask}\n`:" no ip address\n"}${i.up?"":" shutdown\n"}!`).join("\n");
  if(/^r(u|un|unn|unni|unnin|unning)?(-c.*)?$/.test(w[1]||"")||/^run/.test(sub)) return io.out(`Building configuration...\n\nCurrent configuration : 1024 bytes\n!\nversion 15.4\n!\nhostname ${r.hostname}\n!\n${r.secret!==null?"enable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0\n!\n":""}${ifcfg()}\n${Object.entries(r.vlans).filter(([k])=>k!=="1").map(([k,v])=>`vlan ${k}\n name ${v}\n!`).join("\n")}\n${r.routes.map(x=>`ip route ${x.net} ${x.mask} ${x.nh}`).join("\n")}\n!\nline con 0\nline vty 0 4\n login\n!\nend`);
  if(/^ip i/.test(sub)) return io.out(`Interface              IP-Address      OK? Method Status                Protocol\n${Object.entries(r.ifs).map(([n,i])=>`${n.padEnd(23)}${(i.ip||"unassigned").padEnd(16)}YES ${i.ip?"manual":"unset "} ${(i.up?"up":"administratively down").padEnd(22)}${i.up?"up":"down"}`).join("\n")}`);
  if(/^ip r/.test(sub)){ const lines=[]; Object.entries(r.ifs).forEach(([n,i])=>{ if(i.up&&i.ip){ const c=IP.cidrFromMask(IP.parse(i.mask)); const net=IP.str((IP.parse(i.ip)&IP.parse(i.mask))>>>0); lines.push(`C        ${net}/${c} is directly connected, ${n}`); lines.push(`L        ${i.ip}/32 is directly connected, ${n}`); } });
    r.routes.forEach(x=>lines.push(`S        ${x.net}/${IP.cidrFromMask(IP.parse(x.mask))} [1/0] via ${x.nh}`)); const def=r.routes.find(x=>x.net==="0.0.0.0");
    return io.out(`Codes: L - local, C - connected, S - static, R - RIP, O - OSPF, B - BGP\n\nGateway of last resort is ${def?def.nh+" to network 0.0.0.0":"not set"}\n\n${lines.join("\n")||"(table vide : configurez une IP et « no shutdown » sur une interface)"}`); }
  if(/^v(l|la|lan)?( b.*)?$/.test(sub)||/^vlan/.test(sub)) return io.out(`VLAN Name                             Status    Ports\n---- -------------------------------- --------- -------------------------------\n${Object.entries(r.vlans).map(([k,v])=>`${k.padEnd(5)}${v.padEnd(33)}active    ${k==="1"?"Fa0/1-24, Gi0/1-2":""}`).join("\n")}`);
  if(/^ver/.test(sub)) return io.out(`Cisco IOS Software, ISR Software (X86_64_LINUX_IOSD-UNIVERSALK9-M), Version 15.4(3)M (simulation RéseauAcadémie)\nROM: Bootstrap program is IOSv\n${r.hostname} uptime is 2 hours, 14 minutes\nProcessor board ID 9S7FKXHE9LQ\n3 Gigabit/Serial interfaces\nConfiguration register is 0x2102`);
  if(/^int/.test(sub)) return io.out(Object.entries(r.ifs).map(([n,i])=>`${n} is ${i.up?"up":"administratively down"}, line protocol is ${i.up?"up":"down"}\n  Hardware is iGbE, address is 5254.0012.${(hash(n)%9000+1000)}\n${i.desc?"  Description: "+i.desc+"\n":""}  Internet address is ${i.ip?i.ip+"/"+IP.cidrFromMask(IP.parse(i.mask)):"not set"}\n  MTU 1500 bytes, BW 1000000 Kbit/sec, DLY 10 usec\n  Full-duplex, 1000Mb/s, media type is RJ45\n     0 input errors, 0 CRC, 0 frame, 0 overrun\n     0 output errors, 0 collisions, 0 interface resets`).join("\n"));
  if(/^start/.test(sub)) return io.out(r.saved?"(startup-config présente — identique à la dernière sauvegarde)":"startup-config is not present");
  return io.out("% Options : running-config, ip interface brief, ip route, vlan brief, version, interfaces, startup-config"); }
};

/* ---------- Missions guidées ---------- */
const MISSIONS = {
 linux:[
  {t:"Affichez votre adresse IP avec la commande moderne",h:"ip addr (ou ip a)",ok:(c)=>/^(sudo )?ip a(ddr)?( show)?/.test(c)},
  {t:"Affichez votre passerelle par défaut (table de routage)",h:"ip route",ok:c=>/^ip r(oute)?$/.test(c)},
  {t:"Testez la connectivité vers google.fr avec 3 paquets",h:"ping -c 3 google.fr",ok:c=>/^ping .*-c 3|^ping -c 3/.test(c)&&/google\.fr/.test(c)},
  {t:"Trouvez l'adresse IP de exemple.fr avec dig (+short)",h:"dig exemple.fr +short",ok:c=>/^dig .*exemple\.fr/.test(c)},
  {t:"Trouvez le serveur mail (MX) de exemple.fr",h:"dig exemple.fr MX",ok:c=>/^dig .*exemple\.fr.* mx/i.test(c)||/^dig mx/i.test(c)},
  {t:"Affichez le chemin vers 8.8.8.8",h:"traceroute 8.8.8.8",ok:c=>/^(traceroute|tracepath|mtr) 8\.8\.8\.8/.test(c)},
  {t:"Listez les ports en écoute",h:"ss -tulpn",ok:c=>/^(ss|netstat) -?t?u?l?p?n?/.test(c)},
  {t:"Libérez votre bail DHCP puis essayez de pinguer 1.1.1.1 (que se passe-t-il ?)",h:"sudo dhclient -r puis ping 1.1.1.1",ok:(c,st)=>/^ping/.test(c)&&!st.ip},
  {t:"Récupérez une adresse via DHCP",h:"sudo dhclient",ok:c=>/^(sudo )?dhclient$/.test(c)}],
 cmd:[
  {t:"Affichez la configuration IP complète (avec MAC et DNS)",h:"ipconfig /all",ok:c=>/^ipconfig \/all/i.test(c)},
  {t:"Pinguez votre passerelle 192.168.1.1",h:"ping 192.168.1.1",ok:c=>/^ping .*192\.168\.1\.1$/i.test(c)},
  {t:"Affichez le cache ARP",h:"arp -a",ok:c=>/^arp -a/i.test(c)},
  {t:"Résolvez www.exemple.fr avec nslookup",h:"nslookup www.exemple.fr",ok:c=>/^nslookup .*exemple\.fr/i.test(c)},
  {t:"Tracez la route vers wikipedia.org",h:"tracert wikipedia.org",ok:c=>/^tracert .*wikipedia/i.test(c)},
  {t:"Affichez les connexions actives avec les PID",h:"netstat -ano",ok:c=>/^netstat -ano/i.test(c)},
  {t:"Libérez puis renouvelez votre adresse IP",h:"ipconfig /release puis ipconfig /renew",ok:c=>/^ipconfig \/renew/i.test(c)},
  {t:"Videz le cache DNS",h:"ipconfig /flushdns",ok:c=>/^ipconfig \/flushdns/i.test(c)}],
 ps:[
  {t:"Affichez la configuration IP",h:"Get-NetIPConfiguration",ok:c=>/^get-netipconfiguration|^gip$/i.test(c)},
  {t:"Testez si le port 443 de google.fr est ouvert",h:"Test-NetConnection google.fr -Port 443",ok:c=>/^(test-netconnection|tnc) .*-port 443/i.test(c)},
  {t:"Résolvez les serveurs MX de exemple.fr",h:"Resolve-DnsName exemple.fr -Type MX",ok:c=>/^resolve-dnsname .*-type mx/i.test(c)},
  {t:"Listez les ports TCP en écoute",h:"Get-NetTCPConnection -State Listen",ok:c=>/^get-nettcpconnection .*-state listen/i.test(c)},
  {t:"Configurez l'IP statique 192.168.1.50/24 avec la passerelle 192.168.1.1",h:"New-NetIPAddress -InterfaceAlias Ethernet -IPAddress 192.168.1.50 -PrefixLength 24 -DefaultGateway 192.168.1.1",ok:(c,st)=>st.ip==="192.168.1.50"&&st.cidr===24}],
 ios:[
  {t:"Passez en mode privilégié",h:"enable",ok:(c,st)=>st.ios.mode==="priv"},
  {t:"Entrez en mode de configuration globale",h:"configure terminal (ou conf t)",ok:(c,st)=>st.ios.mode==="config"},
  {t:"Renommez le routeur en R1",h:"hostname R1",ok:(c,st)=>st.ios.hostname==="R1"},
  {t:"Configurez G0/0 en 192.168.1.1/24",h:"interface g0/0 → ip address 192.168.1.1 255.255.255.0",ok:(c,st)=>st.ios.ifs["GigabitEthernet0/0"].ip==="192.168.1.1"&&st.ios.ifs["GigabitEthernet0/0"].mask==="255.255.255.0"},
  {t:"Activez l'interface G0/0",h:"no shutdown",ok:(c,st)=>st.ios.ifs["GigabitEthernet0/0"].up},
  {t:"Ajoutez une route par défaut vers 192.168.1.254",h:"exit puis ip route 0.0.0.0 0.0.0.0 192.168.1.254",ok:(c,st)=>st.ios.routes.some(x=>x.net==="0.0.0.0"&&x.nh==="192.168.1.254")},
  {t:"Créez le VLAN 10 nommé COMPTA",h:"vlan 10 → name COMPTA",ok:(c,st)=>st.ios.vlans[10]==="COMPTA"},
  {t:"Revenez en mode privilégié et vérifiez les interfaces",h:"end puis show ip interface brief",ok:(c,st)=>st.ios.mode==="priv"&&/^sh(o|ow)? ip i/.test(c)},
  {t:"Sauvegardez la configuration",h:"copy running-config startup-config (ou wr)",ok:(c,st)=>!!st.ios.saved}]
};

const SHELLS={linux,cmd,ps,ios};
const LABELS={linux:"🐧 Linux (bash)",cmd:"🪟 Windows CMD",ps:"⚡ PowerShell",ios:"🔷 Cisco IOS"};

function renderSandbox(el, start){
  el.innerHTML=`<div class="breadcrumbs"><a href="#/">Accueil</a> › Sandbox</div>
  <h1>🖥️ Sandbox terminal</h1>
  <p class="lead">Entraînez-vous aux commandes réseau sans rien installer et sans risque : un terminal <b>Linux</b>, <b>Windows</b> (CMD et PowerShell) et un routeur <b>Cisco IOS</b> simulés, avec un petit réseau virtuel (box 192.168.1.1, imprimante .20, NAS .30, Internet simulé).</p>
  <div class="sb-tabs">${Object.keys(SHELLS).map(k=>`<button class="btn small sb-tab" data-sh="${k}">${LABELS[k]}</button>`).join("")}<button class="btn small" id="sb-reset" title="Réinitialiser">↺ Réinitialiser</button></div>
  <div class="sb-wrap">
   <div class="sb-term" id="sb-term" tabindex="0"><div id="sb-out"></div><div class="sb-line"><span id="sb-prompt"></span><input id="sb-in" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Commande"></div></div>
   <aside class="sb-side"><h3>🎯 Missions</h3><div id="sb-missions"></div><p class="muted" style="font-size:.85rem">Astuces : <kbd>Tab</kbd> complète, <kbd>↑</kbd>/<kbd>↓</kbd> historique, <kbd>Ctrl</kbd>+<kbd>C</kbd> interrompt, <kbd>Ctrl</kbd>+<kbd>L</kbd> efface.</p></aside>
  </div>
  <div class="callout tip"><b>Pour aller plus loin avec un vrai système</b>Cette sandbox est une simulation pédagogique. Pour un vrai terminal : WSL ou une machine virtuelle Linux, et pour de vrais équipements : Cisco Packet Tracer, GNS3 ou Containerlab (voir <a href="#/ressources">Ressources</a>).</div>`;
  const out=el.querySelector("#sb-out"), inp=el.querySelector("#sb-in"), pr=el.querySelector("#sb-prompt"), term=el.querySelector("#sb-term");
  let st={...NET(),ios:iosState()}, cur=start&&SHELLS[start]?start:"linux", busy=false, stop=false; const hist={linux:[],cmd:[],ps:[],ios:[]}; let hi=0; const buf={};
  const done=JSON.parse(localStorage.getItem("ra-missions")||"{}");
  const io={ out:(t)=>{ const d=document.createElement("div"); d.innerHTML=t; out.appendChild(d); term.scrollTop=term.scrollHeight; }, clear:()=>{ out.innerHTML=""; }, stopped:()=>stop, history:()=>hist[cur], switchTo:(k)=>select(k) };
  function renderMissions(){ const box=el.querySelector("#sb-missions"); if(!out.isConnected||!box) return; const ms=MISSIONS[cur]; box.innerHTML=`<ol class="sb-m">${ms.map((m,i)=>{ const d=done[cur+i]; return `<li class="${d?"done":""}"><span>${d?"✅ ":""}${m.t}</span><details><summary>Indice</summary><code>${m.h}</code></details></li>`; }).join("")}</ol><p class="muted">${ms.filter((m,i)=>done[cur+i]).length} / ${ms.length} réussies</p>`; }
  function setPrompt(){ pr.innerHTML=SHELLS[cur].prompt(st); }
  function select(k){ buf[cur]=out.innerHTML; cur=k; el.querySelectorAll(".sb-tab").forEach(b=>b.classList.toggle("primary",b.dataset.sh===k)); out.innerHTML=buf[k]||`<div style="color:#94a3b8">${SHELLS[k].banner}</div>`; term.classList.toggle("win",k==="cmd"); term.classList.toggle("ps",k==="ps"); setPrompt(); renderMissions(); hi=hist[k].length; inp.focus(); history.replaceState(null,"","#/sandbox/"+k); }
  el.querySelectorAll(".sb-tab").forEach(b=>b.onclick=()=>select(b.dataset.sh));
  el.querySelector("#sb-reset").onclick=()=>{ st={...NET(),ios:iosState()}; Object.keys(buf).forEach(k=>delete buf[k]); out.innerHTML=""; select(cur); };
  term.addEventListener("click",()=>{ if(!window.getSelection().toString()) inp.focus(); });
  inp.addEventListener("keydown",async e=>{
    if(e.key==="c"&&e.ctrlKey){ if(busy){ stop=true; io.out("^C"); } e.preventDefault(); return; }
    if(e.key==="l"&&e.ctrlKey){ e.preventDefault(); io.clear(); return; }
    if(e.key==="ArrowUp"){ e.preventDefault(); if(hi>0){ hi--; inp.value=hist[cur][hi]; } return; }
    if(e.key==="ArrowDown"){ e.preventDefault(); if(hi<hist[cur].length-1){ hi++; inp.value=hist[cur][hi]; } else { hi=hist[cur].length; inp.value=""; } return; }
    if(e.key==="Tab"){ e.preventDefault(); const v=inp.value.toLowerCase(); if(!v) return; const m=SHELLS[cur].cmds.filter(c=>c.toLowerCase().startsWith(v)); if(m.length===1) inp.value=m[0]+" "; else if(m.length>1) io.out(`<span style="color:#94a3b8">${m.join("   ")}</span>`); return; }
    if(e.key!=="Enter"||busy) return;
    const line=inp.value; inp.value=""; io.out(`${SHELLS[cur].prompt(st)}${line.replace(/</g,"&lt;")}`);
    if(line.trim()){ hist[cur].push(line); }
    hi=hist[cur].length; busy=true; stop=false; inp.disabled=true;
    try{ if(line.trim()) await SHELLS[cur].run(line,io,st); }catch(err){ io.out(`<span style="color:#f87171">Erreur de simulation : ${err.message}</span>`); }
    busy=false; inp.disabled=false; inp.focus(); setPrompt();
    const c=line.trim().replace(/\s+/g," "); const lc=c.toLowerCase(); let changed=false;
    MISSIONS[cur].forEach((m,i)=>{ if(!done[cur+i]&&c&&m.ok(cur==="linux"?c.replace(/^sudo /,""):lc,st)){ done[cur+i]=true; changed=true; io.out(`<span style="color:#fbbf24">🎯 Mission réussie : ${m.t}</span>`); } });
    if(changed){ localStorage.setItem("ra-missions",JSON.stringify(done)); renderMissions(); }
  });
  select(cur);
}
window.renderSandbox=renderSandbox;
})();
