/* RéseauAcadémie — partie 3 : zéro, transport, services, sans-fil, sécurité, pratique */
LESSONS.unshift({
id:"zero", cat:"fond", icon:"🐣", level:0, duration:15,
title:"Les réseaux pour les nuls (partir de zéro)",
summary:"Aucune connaissance requise : comprendre Internet avec l'analogie de la poste, sans jargon.",
content:`
<p class="lead">Vous n'y connaissez rien ? Parfait, ce chapitre est fait pour vous. On va comprendre <b>comment votre téléphone affiche une vidéo YouTube</b> sans un seul mot compliqué… ou presque.</p>

<h2>Un réseau, c'est comme la poste</h2>
<div class="table-wrap"><table>
<tr><th>Dans la vraie vie</th><th>Dans un réseau</th><th>Le vrai nom</th></tr>
<tr><td>Une lettre</td><td>Un petit morceau de données</td><td><b>Paquet</b></td></tr>
<tr><td>L'adresse postale de la maison</td><td>L'adresse de l'ordinateur sur le réseau</td><td><b>Adresse IP</b></td></tr>
<tr><td>Le nom de la personne dans la maison</td><td>Le programme qui reçoit (navigateur, jeu…)</td><td><b>Port</b></td></tr>
<tr><td>Le numéro de série de la boîte aux lettres</td><td>L'identifiant gravé dans la carte réseau</td><td><b>Adresse MAC</b></td></tr>
<tr><td>Le bureau de poste du quartier</td><td>Votre box Internet</td><td><b>Routeur / passerelle</b></td></tr>
<tr><td>Les centres de tri</td><td>Les routeurs des opérateurs</td><td><b>Routeurs</b></td></tr>
<tr><td>L'annuaire téléphonique</td><td>Ce qui transforme « google.fr » en adresse IP</td><td><b>DNS</b></td></tr>
<tr><td>Le facteur qui attribue un numéro de boîte aux nouveaux arrivants</td><td>Ce qui donne automatiquement une adresse à votre téléphone</td><td><b>DHCP</b></td></tr>
<tr><td>La lettre recommandée avec accusé de réception</td><td>Envoi fiable, on vérifie que tout est arrivé</td><td><b>TCP</b></td></tr>
<tr><td>La carte postale (on l'envoie et on espère)</td><td>Envoi rapide sans vérification</td><td><b>UDP</b></td></tr>
</table></div>

<h2>Que se passe-t-il quand vous ouvrez YouTube ?</h2>
<ol>
<li>📱 Votre téléphone se connecte au Wi-Fi. La box lui donne une adresse (<b>DHCP</b>), comme un numéro de chambre à l'hôtel.</li>
<li>📖 Vous tapez « youtube.com ». Le téléphone demande à l'annuaire (<b>DNS</b>) : « Quelle est l'adresse de youtube.com ? » Réponse : un numéro comme <code>142.250.74.238</code>.</li>
<li>✉️ Le téléphone écrit une demande « Envoie-moi la page d'accueil » et la découpe en petites lettres (<b>paquets</b>).</li>
<li>🏤 Les paquets partent vers la box (<b>routeur</b>), qui les envoie à votre opérateur (Orange, Free, SFR…).</li>
<li>🚚 Les paquets passent par plusieurs centres de tri (<b>routeurs</b>) à travers le monde jusqu'aux serveurs de YouTube.</li>
<li>🎬 YouTube répond en envoyant des milliers de paquets contenant la vidéo, qui font le chemin inverse.</li>
<li>🧩 Votre téléphone remet les paquets dans l'ordre et affiche la vidéo. Le tout en <b>quelques millisecondes</b> !</li>
</ol>

<h2>Le vocabulaire minimum</h2>
<ul>
<li><b>Internet</b> : le réseau mondial qui relie tous les réseaux entre eux. Le <b>Web</b> n'est qu'un service d'Internet (les sites), comme l'e-mail en est un autre.</li>
<li><b>Wi-Fi</b> : réseau sans fil (ondes radio) dans la maison. Ce n'est pas « Internet » : c'est juste le dernier mètre entre votre appareil et la box.</li>
<li><b>Câble Ethernet</b> : le câble réseau avec une prise « RJ45 » (plus large qu'une prise téléphone).</li>
<li><b>Débit</b> : la vitesse, en Mbit/s (mégabits par seconde). <b>Ping / latence</b> : le temps de réaction, en millisecondes (important pour les jeux).</li>
<li><b>Serveur</b> : un ordinateur qui rend un service (site web, jeu, e-mail). <b>Client</b> : celui qui le demande (vous).</li>
<li><b>Bande passante</b> : la largeur de « l'autoroute ». Plus elle est large, plus de données passent en même temps.</li>
</ul>

<h2>Votre première commande réseau</h2>
<p>Ouvrez la <a href="#/sandbox">sandbox terminal</a> de ce site et tapez :</p>
<pre><code>ping google.fr</code></pre>
<p>Vous envoyez un petit « coucou » à Google, qui répond. Le temps affiché (par ex. <code>time=12 ms</code>) est le temps d'un aller-retour. Bravo, vous venez de faire votre premier diagnostic réseau ! 🎉</p>
<div class="callout tip"><b>Et maintenant ?</b>Suivez le <a href="#/parcours">parcours Débutant</a> : chaque notion vue ici (IP, DNS, routeur…) y est expliquée en détail, avec des quiz pour vérifier.</div>
`,
keypoints:["Un paquet = une lettre ; l'adresse IP = l'adresse postale.","Le DNS est l'annuaire qui traduit un nom en adresse IP.","La box est le routeur : la porte de sortie vers Internet.","TCP = recommandé (fiable), UDP = carte postale (rapide).","Wi-Fi ≠ Internet : le Wi-Fi n'est que la liaison avec la box."],
quiz:[
{q:"Dans l'analogie de la poste, l'adresse IP correspond à…",o:["Le timbre","L'adresse postale","Le facteur","L'enveloppe"],a:1,e:"L'adresse IP indique où livrer le paquet."},
{q:"Quel service transforme « google.fr » en adresse IP ?",o:["Le Wi-Fi","Le DNS","Le câble","Le navigateur"],a:1,e:"Le DNS est l'annuaire d'Internet."},
{q:"Le Web et Internet, c'est…",o:["Exactement la même chose","Le Web est un service qui fonctionne sur Internet","Internet est un site web","Le Wi-Fi"],a:1,e:"Internet est le réseau, le Web un des services qui l'utilisent."},
{q:"La commande ping sert à…",o:["Télécharger un fichier","Tester si une machine répond et mesurer le temps","Changer son adresse IP","Couper le Wi-Fi"],a:1,e:"Ping envoie un écho et mesure l'aller-retour."}
]});

LESSONS.push({
id:"transport", cat:"svc", icon:"🚚", level:1, duration:35,
title:"Couche transport : TCP et UDP",
summary:"Ports, sockets, TCP (handshake, fiabilité, fenêtre, fermeture), UDP, QUIC et ports à connaître.",
content:`
<p class="lead">La couche 4 assure la communication <b>de bout en bout</b> entre <b>applications</b>. Elle identifie les applications grâce aux <b>ports</b> et peut garantir la fiabilité (TCP) ou privilégier la rapidité (UDP).</p>

<h2>Ports et sockets</h2>
<ul>
<li>Un <b>port</b> est un numéro sur 16 bits (0 à 65 535).</li>
<li><b>0 – 1023</b> : ports bien connus (well-known), réservés aux services standards.</li>
<li><b>1024 – 49151</b> : ports enregistrés.</li>
<li><b>49152 – 65535</b> : ports dynamiques/éphémères, choisis par le client.</li>
<li>Un <b>socket</b> = IP + port (ex. <code>192.168.1.10:51544</code>). Une connexion TCP est identifiée par 5 éléments : protocole, IP source, port source, IP destination, port destination.</li>
</ul>

<h2>TCP vs UDP</h2>
<div class="table-wrap"><table>
<tr><th></th><th>TCP</th><th>UDP</th></tr>
<tr><td>Connexion</td><td>Orienté connexion (handshake)</td><td>Sans connexion</td></tr>
<tr><td>Fiabilité</td><td>Accusés de réception, retransmission</td><td>Aucune garantie</td></tr>
<tr><td>Ordre</td><td>Remise dans l'ordre (numéros de séquence)</td><td>Pas d'ordre garanti</td></tr>
<tr><td>Contrôle de flux / congestion</td><td>Oui (fenêtre glissante)</td><td>Non</td></tr>
<tr><td>En-tête</td><td>20 octets minimum</td><td>8 octets</td></tr>
<tr><td>Usage</td><td>Web, e-mail, transfert de fichiers, SSH</td><td>DNS, DHCP, VoIP, streaming, jeux, TFTP, SNMP</td></tr>
</table></div>

<h2>Le three-way handshake (établissement TCP)</h2>
<div class="diagram">
<svg viewBox="0 0 520 230" width="520">
 <g font-size="14">
  <text x="60" y="20" text-anchor="middle" font-weight="bold">Client</text>
  <text x="460" y="20" text-anchor="middle" font-weight="bold">Serveur</text>
  <line x1="60" y1="30" x2="60" y2="220" stroke="#4f8cff" stroke-width="3"/>
  <line x1="460" y1="30" x2="460" y2="220" stroke="#4f8cff" stroke-width="3"/>
  <defs><marker id="ar" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#22d3ee"/></marker></defs>
  <line x1="60" y1="50" x2="460" y2="90" stroke="#22d3ee" stroke-width="2" marker-end="url(#ar)"/>
  <text x="260" y="58" text-anchor="middle">1. SYN (seq=100)</text>
  <line x1="460" y1="110" x2="60" y2="150" stroke="#22d3ee" stroke-width="2" marker-end="url(#ar)"/>
  <text x="260" y="118" text-anchor="middle">2. SYN-ACK (seq=300, ack=101)</text>
  <line x1="60" y1="170" x2="460" y2="210" stroke="#22d3ee" stroke-width="2" marker-end="url(#ar)"/>
  <text x="260" y="178" text-anchor="middle">3. ACK (ack=301)</text>
 </g>
</svg>
</div>
<p>La fermeture se fait en 4 étapes : <b>FIN → ACK → FIN → ACK</b> (ou brutalement par un <b>RST</b>).</p>

<h2>Les drapeaux (flags) TCP</h2>
<ul>
<li><b>SYN</b> : synchronisation, ouverture de connexion.</li>
<li><b>ACK</b> : accusé de réception.</li>
<li><b>FIN</b> : fin de connexion.</li>
<li><b>RST</b> : réinitialisation (port fermé, erreur).</li>
<li><b>PSH</b> : transmettre immédiatement à l'application. <b>URG</b> : données urgentes.</li>
</ul>

<h2>Fiabilité et contrôle de flux</h2>
<ul>
<li><b>Numéros de séquence</b> : numérotent chaque octet envoyé.</li>
<li><b>Accusés (ACK)</b> : indiquent le prochain octet attendu. Sans ACK après un délai (RTO), le segment est retransmis.</li>
<li><b>Fenêtre glissante</b> (window) : quantité de données envoyables sans attendre d'ACK ; le récepteur l'ajuste (contrôle de flux).</li>
<li><b>Contrôle de congestion</b> : slow start, congestion avoidance (algorithmes Reno, CUBIC, BBR).</li>
</ul>

<h2>QUIC et HTTP/3</h2>
<p><b>QUIC</b> fonctionne au-dessus d'<b>UDP</b> (port 443) et intègre fiabilité, multiplexage et chiffrement TLS 1.3. Il réduit la latence d'établissement et évite le blocage en tête de file de TCP. HTTP/3 repose sur QUIC.</p>

<h2>Ports à connaître absolument</h2>
<div class="table-wrap"><table>
<tr><th>Port</th><th>Protocole</th><th>Service</th></tr>
<tr><td>20, 21</td><td>TCP</td><td>FTP (données, contrôle)</td></tr>
<tr><td>22</td><td>TCP</td><td>SSH, SFTP, SCP</td></tr>
<tr><td>23</td><td>TCP</td><td>Telnet (non chiffré, à éviter)</td></tr>
<tr><td>25</td><td>TCP</td><td>SMTP (envoi de mail entre serveurs)</td></tr>
<tr><td>53</td><td>UDP/TCP</td><td>DNS</td></tr>
<tr><td>67, 68</td><td>UDP</td><td>DHCP (serveur, client)</td></tr>
<tr><td>69</td><td>UDP</td><td>TFTP</td></tr>
<tr><td>80</td><td>TCP</td><td>HTTP</td></tr>
<tr><td>110</td><td>TCP</td><td>POP3</td></tr>
<tr><td>123</td><td>UDP</td><td>NTP</td></tr>
<tr><td>143</td><td>TCP</td><td>IMAP</td></tr>
<tr><td>161, 162</td><td>UDP</td><td>SNMP, traps SNMP</td></tr>
<tr><td>389 / 636</td><td>TCP</td><td>LDAP / LDAPS</td></tr>
<tr><td>443</td><td>TCP/UDP</td><td>HTTPS (et QUIC)</td></tr>
<tr><td>445</td><td>TCP</td><td>SMB (partage Windows)</td></tr>
<tr><td>514</td><td>UDP</td><td>Syslog</td></tr>
<tr><td>587 / 465</td><td>TCP</td><td>SMTP soumission (STARTTLS / TLS)</td></tr>
<tr><td>993 / 995</td><td>TCP</td><td>IMAPS / POP3S</td></tr>
<tr><td>1812, 1813</td><td>UDP</td><td>RADIUS</td></tr>
<tr><td>3306</td><td>TCP</td><td>MySQL</td></tr>
<tr><td>3389</td><td>TCP</td><td>RDP (bureau à distance)</td></tr>
<tr><td>5060/5061</td><td>UDP/TCP</td><td>SIP (VoIP)</td></tr>
</table></div>
<div class="callout tip"><b>Révisez</b>Un <a href="#/exercices">jeu de mémorisation des ports</a> est disponible dans les exercices.</div>
`,
keypoints:["Port = 16 bits ; 0-1023 bien connus ; éphémères ≥ 49152.","TCP : fiable, ordonné, orienté connexion ; UDP : léger, rapide, sans garantie.","Handshake TCP : SYN, SYN-ACK, ACK.","Fermeture : FIN/ACK ; RST = refus brutal.","QUIC = transport fiable chiffré au-dessus d'UDP (HTTP/3).","22 SSH, 53 DNS, 80 HTTP, 443 HTTPS, 3389 RDP."],
quiz:[
{q:"Quel est l'ordre du three-way handshake ?",o:["SYN, ACK, SYN-ACK","SYN, SYN-ACK, ACK","ACK, SYN, FIN","SYN, FIN, ACK"],a:1,e:"SYN → SYN-ACK → ACK."},
{q:"Quel protocole utilise le DNS pour les requêtes classiques ?",o:["TCP 53","UDP 53","UDP 67","TCP 80"],a:1,e:"UDP 53 (TCP 53 pour les grosses réponses et les transferts de zone)."},
{q:"Quel port utilise SSH ?",o:["21","22","23","443"],a:1,e:"SSH = TCP 22."},
{q:"Quelle application préfère UDP ?",o:["Transfert de fichier","E-mail","Appel VoIP","Page web HTTPS (HTTP/1.1)"],a:2,e:"La voix tolère quelques pertes mais pas la latence."},
{q:"Quel drapeau TCP indique un refus de connexion ?",o:["FIN","SYN","RST","PSH"],a:2,e:"Un port fermé répond par RST."},
{q:"Quelle est la taille de l'en-tête UDP ?",o:["8 octets","20 octets","40 octets","4 octets"],a:0,e:"Ports source/destination, longueur, checksum : 8 octets."},
{q:"Sur quel protocole de transport repose QUIC ?",o:["TCP","UDP","SCTP","ICMP"],a:1,e:"QUIC est construit au-dessus d'UDP."}
]});

LESSONS.push({
id:"services", cat:"svc", icon:"⚙️", level:1, duration:40,
title:"Services réseau : DHCP, DNS, NAT",
summary:"Processus DORA, fonctionnement du DNS (récursif, itératif, enregistrements), NAT/PAT et redirection de ports.",
content:`
<p class="lead">Trois services font fonctionner quasiment tous les réseaux : <b>DHCP</b> (configuration automatique), <b>DNS</b> (résolution de noms) et <b>NAT</b> (partage d'une IP publique).</p>

<h2>DHCP : Dynamic Host Configuration Protocol</h2>
<p>Attribue automatiquement : <b>IP, masque, passerelle, serveurs DNS</b>, durée de bail, et d'autres options (NTP, nom de domaine, TFTP…). Utilise <b>UDP 67</b> (serveur) et <b>UDP 68</b> (client).</p>
<h3>Le processus DORA</h3>
<ol>
<li><b>D</b>iscover : le client diffuse (broadcast) « Y a-t-il un serveur DHCP ? ».</li>
<li><b>O</b>ffer : le serveur propose une adresse.</li>
<li><b>R</b>equest : le client demande officiellement l'adresse proposée (en broadcast, pour informer les autres serveurs).</li>
<li><b>A</b>cknowledge : le serveur confirme le bail.</li>
</ol>
<p>Le client renouvelle son bail à <b>50 %</b> de sa durée (T1), puis à 87,5 % (T2).</p>
<div class="callout"><b>Relais DHCP</b>Les broadcasts ne traversent pas les routeurs. Pour un serveur DHCP situé sur un autre réseau, on configure un <b>relais</b> (<code>ip helper-address</code> chez Cisco) sur la passerelle.</div>
<div class="term-cli"><span class="p">Router(config)#</span> ip dhcp excluded-address 192.168.1.1 192.168.1.10
<span class="p">Router(config)#</span> ip dhcp pool LAN
<span class="p">Router(dhcp-config)#</span> network 192.168.1.0 255.255.255.0
<span class="p">Router(dhcp-config)#</span> default-router 192.168.1.1
<span class="p">Router(dhcp-config)#</span> dns-server 1.1.1.1 8.8.8.8
<span class="p">Router(dhcp-config)#</span> lease 7

<span class="p">C:\\&gt;</span> ipconfig /release  &amp;&amp;  ipconfig /renew     <span style="color:#888">REM Windows</span>
<span class="p">$</span> sudo dhclient -r eth0 &amp;&amp; sudo dhclient eth0        <span style="color:#888"># Linux</span></div>

<h2>DNS : Domain Name System</h2>
<p>Le DNS est un <b>annuaire distribué et hiérarchique</b> qui traduit les noms (www.exemple.fr) en adresses IP. Il utilise <b>UDP/TCP 53</b> (et DoH/DoT pour les versions chiffrées : HTTPS 443, TLS 853).</p>
<h3>La hiérarchie</h3>
<pre><code>.                     (racine — 13 identités de serveurs racines, a à m)
└── fr.               (TLD : domaine de premier niveau, géré par l'AFNIC)
    └── exemple.fr.   (domaine, serveurs faisant autorité)
        └── www.exemple.fr.  (hôte)</code></pre>
<h3>Résolution d'un nom</h3>
<ol>
<li>Le client vérifie son cache et le fichier <code>hosts</code>.</li>
<li>Il interroge son <b>résolveur récursif</b> (box, FAI, 1.1.1.1, 8.8.8.8…) : requête <b>récursive</b>.</li>
<li>Le résolveur interroge, de façon <b>itérative</b>, un serveur racine → qui renvoie vers les serveurs de <code>.fr</code> → qui renvoient vers ceux de <code>exemple.fr</code> → qui donnent la réponse <b>faisant autorité</b>.</li>
<li>Le résolveur met la réponse en cache pendant le <b>TTL</b> et la renvoie au client.</li>
</ol>
<h3>Types d'enregistrements</h3>
<div class="table-wrap"><table>
<tr><th>Type</th><th>Rôle</th><th>Exemple</th></tr>
<tr><td><b>A</b></td><td>Nom → IPv4</td><td>www IN A 203.0.113.10</td></tr>
<tr><td><b>AAAA</b></td><td>Nom → IPv6</td><td>www IN AAAA 2001:db8::10</td></tr>
<tr><td><b>CNAME</b></td><td>Alias vers un autre nom</td><td>blog IN CNAME www.exemple.fr.</td></tr>
<tr><td><b>MX</b></td><td>Serveur de messagerie (avec priorité)</td><td>@ IN MX 10 mail.exemple.fr.</td></tr>
<tr><td><b>NS</b></td><td>Serveurs faisant autorité pour la zone</td><td>@ IN NS ns1.exemple.fr.</td></tr>
<tr><td><b>PTR</b></td><td>Résolution inverse IP → nom</td><td>10.113.0.203.in-addr.arpa PTR www…</td></tr>
<tr><td><b>TXT</b></td><td>Texte libre (SPF, DKIM, vérifications)</td><td>"v=spf1 mx -all"</td></tr>
<tr><td><b>SOA</b></td><td>Informations sur la zone (serial, timers)</td><td>—</td></tr>
<tr><td><b>SRV</b></td><td>Localisation d'un service (port, priorité)</td><td>_sip._tcp …</td></tr>
<tr><td><b>CAA</b></td><td>Autorités de certification autorisées</td><td>0 issue "letsencrypt.org"</td></tr>
</table></div>
<div class="term-cli"><span class="p">$</span> dig www.exemple.fr A +short
<span class="p">$</span> dig exemple.fr MX
<span class="p">$</span> dig -x 8.8.8.8                       <span style="color:#888"># résolution inverse</span>
<span class="p">C:\\&gt;</span> nslookup www.exemple.fr 1.1.1.1
<span class="p">PS&gt;</span> Resolve-DnsName exemple.fr -Type MX</div>
<p><b>DNSSEC</b> signe cryptographiquement les réponses DNS pour empêcher leur falsification (empoisonnement de cache).</p>

<h2>NAT : Network Address Translation</h2>
<p>Le NAT traduit des adresses IP <b>privées</b> en adresse(s) <b>publique(s)</b>. Il a permis de prolonger la vie d'IPv4.</p>
<ul>
<li><b>NAT statique</b> : 1 IP privée ↔ 1 IP publique (pour un serveur accessible de l'extérieur).</li>
<li><b>NAT dynamique</b> : un pool d'IP publiques partagé.</li>
<li><b>PAT / NAT overload</b> (le plus courant, celui de votre box) : <b>plusieurs IP privées ↔ une seule IP publique</b>, différenciées par les <b>ports</b>.</li>
</ul>
<div class="table-wrap"><table>
<tr><th>IP:port interne</th><th>IP:port traduite (publique)</th><th>Destination</th></tr>
<tr><td>192.168.1.10:51000</td><td>203.0.113.5:40001</td><td>142.250.74.238:443</td></tr>
<tr><td>192.168.1.11:51000</td><td>203.0.113.5:40002</td><td>142.250.74.238:443</td></tr>
<tr><td>192.168.1.12:60122</td><td>203.0.113.5:40003</td><td>1.1.1.1:53</td></tr>
</table></div>
<p><b>Redirection de port (port forwarding / DNAT)</b> : rendre accessible un service interne, ex. <code>IP_publique:8080 → 192.168.1.50:80</code>.</p>
<p>Terminologie Cisco : <b>inside local</b> (IP privée de l'hôte), <b>inside global</b> (IP publique qui le représente), <b>outside global</b> (IP réelle du serveur distant).</p>
<div class="term-cli"><span class="p">Router(config)#</span> access-list 1 permit 192.168.1.0 0.0.0.255
<span class="p">Router(config)#</span> ip nat inside source list 1 interface g0/1 overload
<span class="p">Router(config)#</span> interface g0/0
<span class="p">Router(config-if)#</span> ip nat inside
<span class="p">Router(config)#</span> interface g0/1
<span class="p">Router(config-if)#</span> ip nat outside
<span class="p">Router#</span> show ip nat translations</div>
<div class="callout warn"><b>Le NAT n'est pas un pare-feu</b>Il cache les adresses internes, mais la sécurité doit être assurée par un vrai pare-feu (filtrage avec état).</div>

<h2>Autres services d'infrastructure</h2>
<ul>
<li><b>NTP</b> (UDP 123) : synchronisation de l'heure — indispensable pour les logs, Kerberos, certificats.</li>
<li><b>SNMP</b> (UDP 161/162) : supervision des équipements (préférer SNMPv3, chiffré et authentifié).</li>
<li><b>Syslog</b> (UDP 514) : centralisation des journaux.</li>
<li><b>LDAP / Active Directory</b> : annuaire des utilisateurs.</li>
</ul>
`,
keypoints:["DHCP : DORA (Discover, Offer, Request, Ack), UDP 67/68.","Relais DHCP (ip helper-address) pour traverser un routeur.","DNS hiérarchique : racine → TLD → domaine ; récursif côté client, itératif côté résolveur.","Enregistrements : A, AAAA, CNAME, MX, NS, PTR, TXT, SOA.","PAT : plusieurs IP privées derrière une IP publique grâce aux ports.","Le NAT ne remplace pas un pare-feu."],
quiz:[
{q:"Quel est l'ordre du processus DHCP ?",o:["Request, Offer, Discover, Ack","Discover, Offer, Request, Ack","Discover, Request, Offer, Ack","Offer, Discover, Ack, Request"],a:1,e:"DORA."},
{q:"Quel enregistrement DNS indique le serveur de messagerie ?",o:["A","CNAME","MX","PTR"],a:2,e:"MX = Mail eXchanger."},
{q:"Quel enregistrement permet la résolution inverse ?",o:["PTR","AAAA","NS","SOA"],a:0,e:"PTR, dans la zone in-addr.arpa."},
{q:"Quel type de NAT utilise une box Internet domestique ?",o:["NAT statique","NAT dynamique","PAT (overload)","NAT64"],a:2,e:"Tous les appareils partagent une IP publique, différenciés par port."},
{q:"Quelle commande Cisco configure un relais DHCP ?",o:["ip dhcp relay","ip helper-address","dhcp forward","ip nat inside"],a:1,e:"ip helper-address <IP du serveur DHCP> sur l'interface côté clients."},
{q:"Quel enregistrement donne une adresse IPv6 ?",o:["A","A6","AAAA","IPV6"],a:2,e:"AAAA (quad-A)."},
{q:"Quel port utilise NTP ?",o:["UDP 123","TCP 123","UDP 161","TCP 389"],a:0,e:"NTP = UDP 123."}
]});

LESSONS.push({
id:"applications", cat:"svc", icon:"🌍", level:1, duration:30,
title:"Protocoles applicatifs : HTTP, TLS, mail, SSH…",
summary:"HTTP et ses méthodes, codes d'état, HTTPS/TLS et certificats, SMTP/IMAP/POP3, FTP/SFTP, SSH, Telnet.",
content:`
<p class="lead">La couche application fournit les services utilisés directement par les logiciels : navigateur, client mail, terminal…</p>

<h2>HTTP</h2>
<p>HTTP est un protocole <b>client-serveur, sans état</b>, basé sur des requêtes/réponses textuelles (HTTP/1.1) ou binaires (HTTP/2, HTTP/3).</p>
<pre><code>GET /index.html HTTP/1.1
Host: www.exemple.fr
User-Agent: Mozilla/5.0
Accept: text/html

HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 1256
Set-Cookie: session=abc123

&lt;!DOCTYPE html&gt;…</code></pre>
<h3>Méthodes</h3>
<p><b>GET</b> (lire), <b>POST</b> (créer/envoyer), <b>PUT</b> (remplacer), <b>PATCH</b> (modifier), <b>DELETE</b> (supprimer), <b>HEAD</b> (en-têtes seuls), <b>OPTIONS</b> (méthodes autorisées, CORS).</p>
<h3>Codes d'état</h3>
<div class="table-wrap"><table>
<tr><th>Famille</th><th>Sens</th><th>Exemples</th></tr>
<tr><td>1xx</td><td>Information</td><td>101 Switching Protocols</td></tr>
<tr><td>2xx</td><td>Succès</td><td>200 OK, 201 Created, 204 No Content</td></tr>
<tr><td>3xx</td><td>Redirection</td><td>301 Moved Permanently, 302 Found, 304 Not Modified</td></tr>
<tr><td>4xx</td><td>Erreur client</td><td>400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests</td></tr>
<tr><td>5xx</td><td>Erreur serveur</td><td>500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout</td></tr>
</table></div>
<h3>Évolutions</h3>
<ul>
<li><b>HTTP/1.1</b> : connexions persistantes (keep-alive).</li>
<li><b>HTTP/2</b> : binaire, multiplexage de plusieurs requêtes sur une connexion, compression des en-têtes.</li>
<li><b>HTTP/3</b> : sur QUIC (UDP).</li>
</ul>

<h2>HTTPS et TLS</h2>
<p><b>HTTPS = HTTP + TLS</b> (port 443). TLS garantit :</p>
<ul>
<li><b>Confidentialité</b> : chiffrement symétrique (AES, ChaCha20) des échanges.</li>
<li><b>Authentification</b> : le serveur prouve son identité avec un <b>certificat X.509</b> signé par une autorité de certification (AC/CA) de confiance.</li>
<li><b>Intégrité</b> : les données ne peuvent pas être modifiées en transit.</li>
</ul>
<p>Le handshake TLS 1.3 : le client envoie <i>ClientHello</i> (versions, suites, clé éphémère), le serveur répond <i>ServerHello</i> + certificat ; les deux dérivent une clé de session (échange Diffie-Hellman éphémère) — en 1 aller-retour seulement.</p>
<div class="term-cli"><span class="p">$</span> curl -I https://www.exemple.fr
<span class="p">$</span> openssl s_client -connect www.exemple.fr:443 -servername www.exemple.fr</div>

<h2>La messagerie électronique</h2>
<ul>
<li><b>SMTP</b> (25 entre serveurs, 587 en soumission avec STARTTLS, 465 en TLS) : <b>envoi</b> des messages.</li>
<li><b>IMAP</b> (143 / 993 en TLS) : consultation, les messages restent sur le serveur (synchronisation multi-appareils).</li>
<li><b>POP3</b> (110 / 995) : téléchargement puis suppression du serveur (ancien).</li>
<li>Authentification des expéditeurs : <b>SPF</b>, <b>DKIM</b>, <b>DMARC</b> (enregistrements DNS TXT).</li>
</ul>

<h2>Transfert de fichiers et accès distant</h2>
<div class="table-wrap"><table>
<tr><th>Protocole</th><th>Port</th><th>Sécurisé ?</th><th>Remarque</th></tr>
<tr><td>FTP</td><td>21 (+20 / ports passifs)</td><td>Non</td><td>Modes actif et passif</td></tr>
<tr><td>FTPS</td><td>990 / 21 + TLS</td><td>Oui</td><td>FTP sur TLS</td></tr>
<tr><td>SFTP</td><td>22</td><td>Oui</td><td>Sous-système de SSH (rien à voir avec FTP)</td></tr>
<tr><td>TFTP</td><td>UDP 69</td><td>Non</td><td>Simple, utilisé pour démarrer/configurer des équipements</td></tr>
<tr><td>Telnet</td><td>23</td><td>Non</td><td>Tout circule en clair, y compris les mots de passe</td></tr>
<tr><td>SSH</td><td>22</td><td>Oui</td><td>Shell distant chiffré, tunnels, authentification par clé</td></tr>
<tr><td>RDP</td><td>3389</td><td>Oui (TLS)</td><td>Bureau à distance Windows</td></tr>
<tr><td>SMB</td><td>445</td><td>SMB3 chiffrable</td><td>Partages de fichiers Windows</td></tr>
</table></div>
<div class="term-cli"><span class="p">$</span> ssh-keygen -t ed25519
<span class="p">$</span> ssh-copy-id admin@192.168.1.50
<span class="p">$</span> ssh admin@192.168.1.50
<span class="p">$</span> scp fichier.txt admin@192.168.1.50:/tmp/
<span class="p">$</span> ssh -L 8080:intranet:80 admin@bastion     <span style="color:#888"># tunnel local</span></div>
`,
keypoints:["HTTP est sans état ; méthodes GET, POST, PUT, DELETE.","Codes : 2xx succès, 3xx redirection, 4xx erreur client, 5xx erreur serveur.","HTTPS = HTTP + TLS : confidentialité, authentification (certificat), intégrité.","SMTP envoie, IMAP/POP3 récupèrent les e-mails.","Telnet et FTP sont en clair : utilisez SSH et SFTP."],
quiz:[
{q:"Que signifie le code HTTP 404 ?",o:["Erreur serveur","Ressource introuvable","Redirection","Accès refusé"],a:1,e:"404 Not Found."},
{q:"Quel protocole sert à envoyer des e-mails ?",o:["IMAP","POP3","SMTP","SNMP"],a:2,e:"SMTP = Simple Mail Transfer Protocol."},
{q:"Quel protocole remplacer par SSH pour l'administration ?",o:["FTP","Telnet","HTTP","DNS"],a:1,e:"Telnet transmet tout en clair."},
{q:"Qu'est-ce qui prouve l'identité d'un site HTTPS ?",o:["Son adresse IP","Son certificat X.509","Son enregistrement MX","Son port"],a:1,e:"Le certificat signé par une autorité de confiance."},
{q:"Quelle méthode HTTP est utilisée pour envoyer un formulaire ?",o:["GET","HEAD","POST","OPTIONS"],a:2,e:"POST envoie des données dans le corps de la requête."},
{q:"Quel code indique une erreur côté serveur ?",o:["301","403","502","204"],a:2,e:"La famille 5xx concerne le serveur (502 Bad Gateway)."}
]});

LESSONS.push({
id:"wifi", cat:"sec", icon:"📶", level:1, duration:30,
title:"Réseaux sans fil (Wi-Fi)",
summary:"Normes 802.11 (Wi-Fi 4 à 7), bandes et canaux, SSID, CSMA/CA, sécurité WPA2/WPA3, architecture d'entreprise.",
content:`
<p class="lead">Le <b>Wi-Fi</b> (IEEE <b>802.11</b>) transmet les données par ondes radio. C'est un média <b>partagé</b> et <b>half-duplex</b> : un seul appareil émet à la fois sur un canal.</p>

<h2>Les normes</h2>
<div class="table-wrap"><table>
<tr><th>Norme</th><th>Nom commercial</th><th>Année</th><th>Bandes</th><th>Débit max théorique</th></tr>
<tr><td>802.11b</td><td>—</td><td>1999</td><td>2,4 GHz</td><td>11 Mbit/s</td></tr>
<tr><td>802.11a</td><td>—</td><td>1999</td><td>5 GHz</td><td>54 Mbit/s</td></tr>
<tr><td>802.11g</td><td>—</td><td>2003</td><td>2,4 GHz</td><td>54 Mbit/s</td></tr>
<tr><td>802.11n</td><td><b>Wi-Fi 4</b></td><td>2009</td><td>2,4 / 5 GHz</td><td>600 Mbit/s</td></tr>
<tr><td>802.11ac</td><td><b>Wi-Fi 5</b></td><td>2013</td><td>5 GHz</td><td>~3,5-6,9 Gbit/s</td></tr>
<tr><td>802.11ax</td><td><b>Wi-Fi 6 / 6E</b></td><td>2019 / 2021</td><td>2,4 / 5 / 6 GHz</td><td>9,6 Gbit/s</td></tr>
<tr><td>802.11be</td><td><b>Wi-Fi 7</b></td><td>2024</td><td>2,4 / 5 / 6 GHz</td><td>~46 Gbit/s</td></tr>
</table></div>
<p>Technologies clés : <b>MIMO / MU-MIMO</b> (plusieurs antennes et flux simultanés), <b>OFDMA</b> (Wi-Fi 6 : partage d'un canal entre plusieurs clients), <b>beamforming</b> (focalisation du signal), MLO (Wi-Fi 7 : plusieurs bandes à la fois).</p>

<h2>Bandes et canaux</h2>
<ul>
<li><b>2,4 GHz</b> : meilleure portée, traverse mieux les murs, mais saturée (micro-ondes, Bluetooth) et seulement <b>3 canaux non chevauchants : 1, 6, 11</b> (en largeur 20 MHz).</li>
<li><b>5 GHz</b> : plus de canaux, plus de débit, portée plus faible. Certains canaux soumis au <b>DFS</b> (radars).</li>
<li><b>6 GHz</b> (Wi-Fi 6E/7) : bande propre et large, faible portée.</li>
</ul>

<h2>Fonctionnement</h2>
<ul>
<li><b>SSID</b> : nom du réseau. <b>BSSID</b> : MAC du point d'accès pour ce SSID.</li>
<li>Association : le client écoute les <b>beacons</b> (ou envoie des probe requests), s'authentifie puis s'associe.</li>
<li><b>CSMA/CA</b> (Collision Avoidance) : écouter avant d'émettre, attendre un délai aléatoire, chaque trame est acquittée. Option RTS/CTS contre le problème du « nœud caché ».</li>
<li>Modes : <b>infrastructure</b> (via un AP) ou <b>ad hoc</b> (direct entre appareils).</li>
</ul>

<h2>Sécurité Wi-Fi</h2>
<div class="table-wrap"><table>
<tr><th>Protocole</th><th>Chiffrement</th><th>Statut</th></tr>
<tr><td>Ouvert</td><td>Aucun</td><td>À éviter (ou OWE / Enhanced Open)</td></tr>
<tr><td>WEP</td><td>RC4</td><td><b>Cassé</b> en quelques minutes</td></tr>
<tr><td>WPA (TKIP)</td><td>RC4 / TKIP</td><td>Obsolète</td></tr>
<tr><td>WPA2</td><td>AES-CCMP</td><td>Correct (si mot de passe robuste)</td></tr>
<tr><td>WPA3</td><td>AES, SAE</td><td><b>Recommandé</b> (résiste aux attaques par dictionnaire hors ligne)</td></tr>
</table></div>
<ul>
<li><b>Personal (PSK / SAE)</b> : une clé partagée — maison, petites structures.</li>
<li><b>Enterprise (802.1X)</b> : chaque utilisateur s'authentifie via un serveur <b>RADIUS</b> (EAP-TLS, PEAP).</li>
<li>Désactivez <b>WPS</b> (vulnérable). Masquer le SSID ou filtrer les MAC n'est <b>pas</b> une vraie sécurité.</li>
</ul>

<h2>Wi-Fi en entreprise</h2>
<ul>
<li><b>AP autonomes</b> vs <b>AP légers</b> gérés par un <b>contrôleur WLC</b> (protocole CAPWAP) ou depuis le cloud.</li>
<li><b>Itinérance (roaming)</b> entre AP avec 802.11r/k/v.</li>
<li>Un SSID par usage, chacun associé à un <b>VLAN</b> (employés, invités, IoT).</li>
<li>Faire une <b>étude de site</b> (site survey) pour placer les AP et choisir les canaux.</li>
</ul>
`,
keypoints:["Wi-Fi = IEEE 802.11, half-duplex, CSMA/CA.","Wi-Fi 4 = n, 5 = ac, 6 = ax, 7 = be.","2,4 GHz : canaux 1, 6, 11 ; 5/6 GHz : plus de débit, moins de portée.","WEP cassé, WPA2-AES correct, WPA3 recommandé.","Entreprise : 802.1X + RADIUS, contrôleur WLC, un SSID par VLAN."],
quiz:[
{q:"Quelle norme correspond au Wi-Fi 6 ?",o:["802.11n","802.11ac","802.11ax","802.11be"],a:2,e:"802.11ax."},
{q:"Quels canaux 2,4 GHz ne se chevauchent pas ?",o:["1, 5, 9","1, 6, 11","2, 7, 12","1, 2, 3"],a:1,e:"1, 6 et 11 en 20 MHz."},
{q:"Quelle méthode d'accès utilise le Wi-Fi ?",o:["CSMA/CD","CSMA/CA","Jeton","TDMA"],a:1,e:"Collision Avoidance, car on ne peut pas détecter les collisions en radio."},
{q:"Quel protocole de sécurité Wi-Fi est le plus robuste ?",o:["WEP","WPA-TKIP","WPA2","WPA3"],a:3,e:"WPA3 avec SAE."},
{q:"En mode Enterprise, qui authentifie les utilisateurs ?",o:["Le DHCP","Un serveur RADIUS","Le DNS","Le switch seul"],a:1,e:"802.1X s'appuie sur RADIUS."}
]});

LESSONS.push({
id:"securite", cat:"sec", icon:"🛡️", level:2, duration:45,
title:"Sécurité réseau",
summary:"Principes CIA, attaques courantes, pare-feu et ACL, DMZ, VPN/IPsec, IDS/IPS, sécurisation des switches, Zero Trust.",
content:`
<p class="lead">La sécurité réseau vise à protéger la <b>Confidentialité</b>, l'<b>Intégrité</b> et la <b>Disponibilité</b> (triade <b>CIA / DIC</b>) des données et des services.</p>

<h2>Attaques courantes</h2>
<div class="table-wrap"><table>
<tr><th>Attaque</th><th>Principe</th><th>Contre-mesures</th></tr>
<tr><td><b>Reconnaissance / scan</b></td><td>Découvrir hôtes et ports ouverts (nmap)</td><td>Pare-feu, IDS, réduire la surface d'attaque</td></tr>
<tr><td><b>DoS / DDoS</b></td><td>Saturer un service (SYN flood, amplification DNS/NTP)</td><td>Anti-DDoS, rate limiting, SYN cookies, CDN</td></tr>
<tr><td><b>Man-in-the-Middle</b></td><td>S'interposer dans une communication</td><td>Chiffrement (TLS, SSH, VPN), DAI</td></tr>
<tr><td><b>ARP spoofing / poisoning</b></td><td>Fausses réponses ARP pour détourner le trafic</td><td><b>Dynamic ARP Inspection</b>, ARP statiques</td></tr>
<tr><td><b>DHCP spoofing / starvation</b></td><td>Faux serveur DHCP ou épuisement du pool</td><td><b>DHCP Snooping</b>, port security</td></tr>
<tr><td><b>MAC flooding</b></td><td>Saturer la table MAC pour que le switch diffuse tout</td><td><b>Port security</b></td></tr>
<tr><td><b>VLAN hopping</b></td><td>Accéder à un autre VLAN (switch spoofing, double tagging)</td><td>Désactiver DTP, VLAN natif inutilisé</td></tr>
<tr><td><b>DNS spoofing</b></td><td>Fausses réponses DNS</td><td>DNSSEC, DoH/DoT</td></tr>
<tr><td><b>Phishing / ingénierie sociale</b></td><td>Tromper l'utilisateur</td><td>Sensibilisation, MFA, filtrage mail</td></tr>
<tr><td><b>Brute force</b></td><td>Essayer tous les mots de passe</td><td>MFA, verrouillage, clés SSH, fail2ban</td></tr>
</table></div>

<h2>Pare-feu (firewall)</h2>
<ul>
<li><b>Filtrage de paquets sans état</b> : règles sur IP, ports, protocole (ACL).</li>
<li><b>Filtrage avec état (stateful)</b> : suit les connexions ; les réponses aux connexions sortantes sont autorisées automatiquement.</li>
<li><b>Pare-feu applicatif / NGFW</b> : inspecte jusqu'à la couche 7 (applications, utilisateurs, IPS intégré, filtrage URL).</li>
<li><b>WAF</b> : protège les applications web (injections SQL, XSS).</li>
</ul>
<div class="callout tip"><b>Principe du moindre privilège</b>Politique par défaut : <b>tout refuser</b>, puis autoriser uniquement le nécessaire.</div>

<h3>Les ACL Cisco</h3>
<ul>
<li><b>Standard</b> (1-99) : filtrent sur l'IP source uniquement → placer <b>près de la destination</b>.</li>
<li><b>Étendues</b> (100-199) : IP source/destination, protocole, ports → placer <b>près de la source</b>.</li>
<li>Lues de haut en bas, la première correspondance s'applique ; <b>deny implicite</b> à la fin.</li>
</ul>
<div class="term-cli"><span class="p">R1(config)#</span> ip access-list extended WEB-ONLY
<span class="p">R1(config-ext-nacl)#</span> permit tcp 192.168.10.0 0.0.0.255 any eq 443
<span class="p">R1(config-ext-nacl)#</span> permit udp 192.168.10.0 0.0.0.255 host 192.168.1.53 eq 53
<span class="p">R1(config-ext-nacl)#</span> deny ip any any log
<span class="p">R1(config)#</span> interface g0/0.10
<span class="p">R1(config-if)#</span> ip access-group WEB-ONLY in</div>
<div class="term-cli"><span class="p">#</span> Linux (nftables / iptables)
<span class="p">$</span> sudo iptables -P INPUT DROP
<span class="p">$</span> sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
<span class="p">$</span> sudo iptables -A INPUT -p tcp --dport 22 -s 192.168.1.0/24 -j ACCEPT
<span class="p">$</span> sudo ufw allow from 192.168.1.0/24 to any port 22 proto tcp
<span class="p">PS&gt;</span> New-NetFirewallRule -DisplayName "SSH LAN" -Direction Inbound -Protocol TCP -LocalPort 22 -RemoteAddress 192.168.1.0/24 -Action Allow</div>

<h2>Architecture : DMZ et segmentation</h2>
<p>La <b>DMZ</b> (zone démilitarisée) héberge les serveurs exposés à Internet (web, mail, reverse proxy), isolés du réseau interne par un pare-feu. Si un serveur de la DMZ est compromis, l'attaquant n'accède pas directement au LAN.</p>
<pre><code>Internet ── [Pare-feu] ── LAN interne
                │
               DMZ (web, mail, VPN)</code></pre>
<p>La <b>segmentation</b> (VLAN + filtrage entre zones) limite les mouvements latéraux. Le modèle <b>Zero Trust</b> va plus loin : « ne jamais faire confiance, toujours vérifier », chaque accès est authentifié et autorisé, quel que soit l'emplacement.</p>

<h2>VPN</h2>
<ul>
<li><b>VPN site-à-site</b> : relie deux réseaux via Internet (souvent <b>IPsec</b>).</li>
<li><b>VPN d'accès distant</b> : un utilisateur nomade rejoint le réseau (SSL/TLS VPN, <b>WireGuard</b>, OpenVPN, IPsec IKEv2).</li>
<li><b>IPsec</b> : <b>IKE</b> négocie les clés (UDP 500 / 4500 avec NAT-T), <b>ESP</b> chiffre et authentifie (protocole IP 50), AH authentifie seulement (protocole 51). Modes <b>tunnel</b> (tout le paquet) et <b>transport</b> (charge utile seulement).</li>
</ul>

<h2>Détection : IDS / IPS, SIEM</h2>
<ul>
<li><b>IDS</b> (détection) : analyse une copie du trafic et alerte (ex. Snort, Suricata, Zeek).</li>
<li><b>IPS</b> (prévention) : en coupure, bloque le trafic malveillant.</li>
<li><b>SIEM</b> : centralise et corrèle les journaux (Syslog) pour détecter les incidents.</li>
</ul>

<h2>Sécuriser les équipements</h2>
<div class="term-cli"><span class="p">Switch(config)#</span> enable secret MotDePasseFort!
<span class="p">Switch(config)#</span> service password-encryption
<span class="p">Switch(config)#</span> ip domain-name lab.local
<span class="p">Switch(config)#</span> crypto key generate rsa modulus 2048
<span class="p">Switch(config)#</span> username admin privilege 15 secret Admin!2024
<span class="p">Switch(config)#</span> line vty 0 15
<span class="p">Switch(config-line)#</span> transport input ssh
<span class="p">Switch(config-line)#</span> login local
<span class="p">Switch(config)#</span> interface fa0/5
<span class="p">Switch(config-if)#</span> switchport port-security
<span class="p">Switch(config-if)#</span> switchport port-security maximum 2
<span class="p">Switch(config-if)#</span> switchport port-security violation restrict
<span class="p">Switch(config-if)#</span> switchport port-security mac-address sticky
<span class="p">Switch(config)#</span> ip dhcp snooping
<span class="p">Switch(config)#</span> ip dhcp snooping vlan 10,20
<span class="p">Switch(config)#</span> ip arp inspection vlan 10,20</div>
<p>Bonnes pratiques : désactiver les ports inutilisés (et les mettre dans un VLAN « parking »), désactiver les services inutiles (HTTP, CDP vers l'extérieur), utiliser <b>802.1X</b> sur les ports, AAA avec RADIUS/TACACS+, sauvegarder les configurations, mettre à jour les firmwares.</p>
`,
keypoints:["Triade CIA : Confidentialité, Intégrité, Disponibilité.","Pare-feu stateful : suit les connexions ; politique par défaut : tout refuser.","ACL standard près de la destination, étendue près de la source ; deny implicite final.","DMZ = zone isolée pour les serveurs exposés.","IPsec : IKE (UDP 500/4500) + ESP ; WireGuard pour l'accès distant moderne.","Port security, DHCP snooping, DAI protègent la couche 2."],
quiz:[
{q:"Que signifie le « A » de la triade CIA ?",o:["Authentification","Availability (disponibilité)","Autorisation","Audit"],a:1,e:"Confidentiality, Integrity, Availability."},
{q:"Quelle fonctionnalité protège contre les faux serveurs DHCP ?",o:["Port security","DHCP snooping","BPDU Guard","PortFast"],a:1,e:"DHCP snooping n'autorise les offres DHCP que sur les ports de confiance."},
{q:"Où placer une ACL étendue ?",o:["Près de la destination","Près de la source","Au cœur du réseau","N'importe où"],a:1,e:"On filtre au plus tôt pour économiser la bande passante."},
{q:"Que se passe-t-il pour un paquet qui ne correspond à aucune ligne d'une ACL ?",o:["Il est autorisé","Il est refusé (deny implicite)","Il est journalisé","Il est routé par défaut"],a:1,e:"Deny any implicite à la fin de chaque ACL."},
{q:"Quelle zone héberge les serveurs accessibles depuis Internet ?",o:["LAN","DMZ","VLAN natif","Zone WAN"],a:1,e:"La DMZ isole les serveurs exposés."},
{q:"Quel protocole IPsec chiffre les données ?",o:["AH","ESP","IKE","GRE"],a:1,e:"ESP assure confidentialité + intégrité ; AH n'authentifie que."},
{q:"L'ARP spoofing permet surtout…",o:["Un déni de service DNS","Une attaque Man-in-the-Middle","De casser WPA3","Un scan de ports"],a:1,e:"L'attaquant se fait passer pour la passerelle et intercepte le trafic."}
]});

LESSONS.push({
id:"depannage", cat:"pra", icon:"🔧", level:1, duration:40,
title:"Outils et dépannage réseau",
summary:"ping, traceroute, ipconfig/ip, nslookup/dig, netstat/ss, arp, curl, nmap, tcpdump, Wireshark et méthodologie de dépannage.",
content:`
<p class="lead">Savoir <b>diagnostiquer</b> est la compétence la plus utile d'un administrateur réseau. Voici les outils indispensables sous <b>Windows</b> et <b>Linux</b>, puis une méthode.</p>
<div class="callout tip"><b>Pratiquez en direct</b>Toutes ces commandes fonctionnent dans la <a href="#/sandbox">sandbox terminal</a> (Linux, Windows CMD, PowerShell).</div>

<h2>Équivalences Windows / Linux / macOS</h2>
<div class="table-wrap"><table>
<tr><th>Besoin</th><th>Windows (CMD / PowerShell)</th><th>Linux</th></tr>
<tr><td>Configuration IP</td><td><code>ipconfig /all</code> · <code>Get-NetIPConfiguration</code></td><td><code>ip addr</code> (<code>ifconfig</code> ancien)</td></tr>
<tr><td>Tester la connectivité</td><td><code>ping</code> · <code>Test-Connection</code></td><td><code>ping -c 4</code></td></tr>
<tr><td>Chemin réseau</td><td><code>tracert</code> · <code>pathping</code></td><td><code>traceroute</code> · <code>mtr</code> · <code>tracepath</code></td></tr>
<tr><td>Résolution DNS</td><td><code>nslookup</code> · <code>Resolve-DnsName</code></td><td><code>dig</code> · <code>host</code> · <code>nslookup</code></td></tr>
<tr><td>Table de routage</td><td><code>route print</code> · <code>Get-NetRoute</code></td><td><code>ip route</code></td></tr>
<tr><td>Cache ARP / voisins</td><td><code>arp -a</code> · <code>Get-NetNeighbor</code></td><td><code>ip neigh</code></td></tr>
<tr><td>Connexions / ports ouverts</td><td><code>netstat -ano</code> · <code>Get-NetTCPConnection</code></td><td><code>ss -tulpn</code> (<code>netstat</code> ancien)</td></tr>
<tr><td>Tester un port TCP</td><td><code>Test-NetConnection host -Port 443</code></td><td><code>nc -zv host 443</code></td></tr>
<tr><td>Vider le cache DNS</td><td><code>ipconfig /flushdns</code></td><td><code>resolvectl flush-caches</code></td></tr>
<tr><td>Requête HTTP</td><td><code>curl.exe</code> · <code>Invoke-WebRequest</code></td><td><code>curl</code> · <code>wget</code></td></tr>
<tr><td>Nom de l'hôte</td><td><code>hostname</code></td><td><code>hostname</code></td></tr>
</table></div>

<h2>ping (ICMP)</h2>
<p>Envoie des <b>ICMP Echo Request</b> et attend des <b>Echo Reply</b>. Mesure la latence (RTT) et la perte.</p>
<ul>
<li><code>Request timed out</code> / <code>100% packet loss</code> : hôte éteint, filtrage pare-feu, ou problème de route retour.</li>
<li><code>Destination host unreachable</code> : pas de route ou pas de réponse ARP sur le réseau local.</li>
<li><code>TTL expired in transit</code> : boucle de routage.</li>
</ul>
<div class="callout warn"><b>Attention</b>Beaucoup de serveurs bloquent ICMP : un ping qui échoue ne prouve pas que le service est en panne. Testez aussi le port (<code>nc</code>, <code>Test-NetConnection</code>).</div>

<h2>traceroute / tracert</h2>
<p>Envoie des paquets avec un <b>TTL croissant</b> (1, 2, 3…). Chaque routeur qui décrémente le TTL à 0 renvoie un <b>ICMP Time Exceeded</b>, révélant ainsi son adresse. Linux utilise UDP par défaut, Windows ICMP. Des <code>* * *</code> = routeur qui ne répond pas (souvent normal).</p>

<h2>Les messages ICMP importants</h2>
<div class="table-wrap"><table>
<tr><th>Type</th><th>Message</th></tr>
<tr><td>0</td><td>Echo Reply</td></tr><tr><td>3</td><td>Destination Unreachable (code 3 = port, 4 = fragmentation nécessaire)</td></tr>
<tr><td>5</td><td>Redirect</td></tr><tr><td>8</td><td>Echo Request</td></tr><tr><td>11</td><td>Time Exceeded</td></tr>
</table></div>

<h2>Analyse de trafic</h2>
<ul>
<li><b>Wireshark</b> : capture et décode graphiquement les paquets. Filtres d'affichage : <code>ip.addr == 192.168.1.10</code>, <code>tcp.port == 443</code>, <code>dns</code>, <code>http.request</code>, <code>tcp.flags.syn == 1 &amp;&amp; tcp.flags.ack == 0</code>, <code>tcp.analysis.retransmission</code>.</li>
<li><b>tcpdump</b> : capture en ligne de commande : <code>sudo tcpdump -i eth0 -n port 53</code>, <code>sudo tcpdump -i any host 10.0.0.5 -w capture.pcap</code>.</li>
<li><b>nmap</b> : scan de réseau et de ports (uniquement sur <b>vos</b> réseaux ou avec autorisation) : <code>nmap -sn 192.168.1.0/24</code>, <code>nmap -sV 192.168.1.50</code>.</li>
<li><b>iperf3</b> : mesure du débit entre deux machines.</li>
</ul>

<h2>Méthodologie de dépannage</h2>
<ol>
<li><b>Identifier</b> le problème : qui est touché ? depuis quand ? qu'est-ce qui a changé ?</li>
<li><b>Établir une hypothèse</b>, puis <b>la tester</b>.</li>
<li><b>Établir un plan</b> d'action et l'appliquer.</li>
<li><b>Vérifier</b> le fonctionnement complet et prendre des mesures préventives.</li>
<li><b>Documenter</b> la cause, la solution et le résultat.</li>
</ol>
<h3>Approche « bottom-up » (couches OSI)</h3>
<ol>
<li><b>Couche 1</b> : câble branché ? voyant de lien ? Wi-Fi connecté ?</li>
<li><b>Couche 2</b> : bon VLAN ? port actif ? (<code>show interfaces status</code>)</li>
<li><b>Couche 3</b> : IP/masque/passerelle corrects ? <code>ping 127.0.0.1</code> → <code>ping</code> son IP → <code>ping</code> la passerelle → <code>ping 8.8.8.8</code>.</li>
<li><b>DNS</b> : <code>ping 8.8.8.8</code> fonctionne mais pas <code>ping google.fr</code> ? → problème de DNS.</li>
<li><b>Couche 4-7</b> : le port est-il ouvert ? le service tourne-t-il ? pare-feu ? certificat ?</li>
</ol>
<div class="callout"><b>Cas typiques</b>
• IP en 169.254.x.x → DHCP injoignable.<br>
• Accès aux IP mais pas aux noms → DNS.<br>
• Accès au LAN mais pas à Internet → passerelle, NAT ou route par défaut.<br>
• Un seul site inaccessible → DNS, pare-feu, ou problème côté serveur.<br>
• Lenteur intermittente → duplex mismatch, saturation, Wi-Fi, perte de paquets (<code>mtr</code>).</div>
`,
keypoints:["ping teste la connectivité (ICMP), traceroute révèle le chemin (TTL).","ipconfig / ip addr pour la configuration ; nslookup / dig pour le DNS.","netstat / ss pour les connexions et ports ouverts.","Wireshark et tcpdump pour analyser les paquets.","Dépanner du bas vers le haut : physique, liaison, IP, DNS, application.","Ping vers IP OK mais pas vers nom → DNS."],
quiz:[
{q:"Quelle commande Windows affiche la configuration IP complète ?",o:["ifconfig","ipconfig /all","ip addr","netsh show"],a:1,e:"ipconfig /all."},
{q:"Sur quel mécanisme repose traceroute ?",o:["Les ports TCP","Le TTL et les messages ICMP Time Exceeded","ARP","DNS"],a:1,e:"Le TTL est incrémenté à chaque envoi."},
{q:"ping 8.8.8.8 fonctionne mais pas ping google.fr. Le problème est…",o:["Le câble","La passerelle","Le DNS","La carte réseau"],a:2,e:"La connectivité IP est OK, seule la résolution de noms échoue."},
{q:"Quelle commande Linux moderne liste les ports en écoute ?",o:["ss -tulpn","ipconfig","arp -a","route print"],a:0,e:"ss remplace netstat."},
{q:"Quel type ICMP correspond à Echo Request ?",o:["0","3","8","11"],a:2,e:"8 = request, 0 = reply."},
{q:"Quel filtre Wireshark affiche le trafic DNS ?",o:["port 53","dns","udp.dns","proto dns"],a:1,e:"Le filtre d'affichage est simplement « dns »."}
]});

LESSONS.push({
id:"cisco", cat:"pra", icon:"💻", level:2, duration:40,
title:"Configurer un routeur et un switch Cisco",
summary:"Modes IOS, configuration de base, interfaces, sauvegarde, commandes show essentielles et un lab complet.",
content:`
<p class="lead">Cisco IOS est le système des routeurs et switches Cisco, très utilisé en entreprise et dans les certifications (CCNA). Sa logique (modes, commandes show) se retrouve chez de nombreux constructeurs.</p>
<div class="callout tip"><b>Pratiquez</b>Le mode <b>Cisco IOS</b> de la <a href="#/sandbox">sandbox</a> simule ces commandes, y compris les modes et l'aide « ? ».</div>

<h2>Les modes IOS</h2>
<div class="table-wrap"><table>
<tr><th>Mode</th><th>Invite</th><th>Accès</th><th>Usage</th></tr>
<tr><td>Utilisateur</td><td><code>Router&gt;</code></td><td>Connexion</td><td>Commandes de base limitées</td></tr>
<tr><td>Privilégié</td><td><code>Router#</code></td><td><code>enable</code></td><td>show, debug, copy, reload</td></tr>
<tr><td>Configuration globale</td><td><code>Router(config)#</code></td><td><code>configure terminal</code></td><td>Paramètres de l'équipement</td></tr>
<tr><td>Interface</td><td><code>Router(config-if)#</code></td><td><code>interface g0/0</code></td><td>Configuration d'un port</td></tr>
<tr><td>Ligne</td><td><code>Router(config-line)#</code></td><td><code>line vty 0 4</code></td><td>Console, accès distant</td></tr>
<tr><td>Routage</td><td><code>Router(config-router)#</code></td><td><code>router ospf 1</code></td><td>Protocoles de routage</td></tr>
</table></div>
<p><code>exit</code> remonte d'un niveau, <code>end</code> (ou Ctrl+Z) revient au mode privilégié. <b>?</b> affiche l'aide contextuelle ; <b>Tab</b> complète ; les abréviations sont acceptées (<code>conf t</code>, <code>sh ip int br</code>).</p>

<h2>Configuration de base</h2>
<div class="term-cli"><span class="p">Router&gt;</span> enable
<span class="p">Router#</span> configure terminal
<span class="p">Router(config)#</span> hostname R1
<span class="p">R1(config)#</span> no ip domain-lookup
<span class="p">R1(config)#</span> enable secret Class!2024
<span class="p">R1(config)#</span> banner motd #Acces reserve au personnel autorise#
<span class="p">R1(config)#</span> line console 0
<span class="p">R1(config-line)#</span> password Cisco!Con
<span class="p">R1(config-line)#</span> login
<span class="p">R1(config-line)#</span> logging synchronous
<span class="p">R1(config-line)#</span> exit
<span class="p">R1(config)#</span> interface g0/0
<span class="p">R1(config-if)#</span> description Vers LAN
<span class="p">R1(config-if)#</span> ip address 192.168.1.1 255.255.255.0
<span class="p">R1(config-if)#</span> no shutdown
<span class="p">R1(config-if)#</span> end
<span class="p">R1#</span> copy running-config startup-config</div>
<div class="callout warn"><b>running-config vs startup-config</b>La <b>running-config</b> est en RAM (perdue au redémarrage). Sauvegardez-la dans la <b>startup-config</b> (NVRAM) avec <code>copy run start</code> ou <code>write memory</code>.</div>

<h2>Switch : IP de management</h2>
<div class="term-cli"><span class="p">S1(config)#</span> interface vlan 1
<span class="p">S1(config-if)#</span> ip address 192.168.1.2 255.255.255.0
<span class="p">S1(config-if)#</span> no shutdown
<span class="p">S1(config)#</span> ip default-gateway 192.168.1.1</div>

<h2>Commandes show indispensables</h2>
<div class="table-wrap"><table>
<tr><th>Commande</th><th>Affiche</th></tr>
<tr><td><code>show running-config</code></td><td>Configuration active</td></tr>
<tr><td><code>show ip interface brief</code></td><td>Résumé des interfaces, IP et état (up/down)</td></tr>
<tr><td><code>show interfaces g0/0</code></td><td>Détails, erreurs, duplex, débit</td></tr>
<tr><td><code>show ip route</code></td><td>Table de routage</td></tr>
<tr><td><code>show vlan brief</code></td><td>VLAN et ports associés</td></tr>
<tr><td><code>show mac address-table</code></td><td>Table MAC du switch</td></tr>
<tr><td><code>show cdp neighbors</code> / <code>show lldp neighbors</code></td><td>Équipements voisins</td></tr>
<tr><td><code>show version</code></td><td>Version IOS, uptime, matériel</td></tr>
<tr><td><code>show ip ospf neighbor</code></td><td>Voisins OSPF</td></tr>
<tr><td><code>show ip nat translations</code></td><td>Traductions NAT</td></tr>
</table></div>

<h2>Interpréter l'état d'une interface</h2>
<div class="table-wrap"><table>
<tr><th>Status / Protocol</th><th>Signification</th></tr>
<tr><td>up / up</td><td>Fonctionnel</td></tr>
<tr><td>administratively down / down</td><td>Interface désactivée : manque <code>no shutdown</code></td></tr>
<tr><td>down / down</td><td>Problème physique : câble, équipement distant éteint</td></tr>
<tr><td>up / down</td><td>Problème de couche 2 : encapsulation, keepalive, horloge (série)</td></tr>
</table></div>

<h2>Lab complet : deux réseaux reliés</h2>
<pre><code>PC1 (192.168.1.10/24) ── S1 ── [g0/0 192.168.1.1] R1 [g0/1 10.0.0.1/30] ── [g0/1 10.0.0.2/30] R2 [g0/0 192.168.2.1] ── S2 ── PC2 (192.168.2.10/24)</code></pre>
<div class="term-cli"><span class="p">R1(config)#</span> interface g0/1
<span class="p">R1(config-if)#</span> ip address 10.0.0.1 255.255.255.252
<span class="p">R1(config-if)#</span> no shutdown
<span class="p">R1(config)#</span> ip route 192.168.2.0 255.255.255.0 10.0.0.2

<span class="p">R2(config)#</span> interface g0/1
<span class="p">R2(config-if)#</span> ip address 10.0.0.2 255.255.255.252
<span class="p">R2(config-if)#</span> no shutdown
<span class="p">R2(config)#</span> interface g0/0
<span class="p">R2(config-if)#</span> ip address 192.168.2.1 255.255.255.0
<span class="p">R2(config-if)#</span> no shutdown
<span class="p">R2(config)#</span> ip route 192.168.1.0 255.255.255.0 10.0.0.1</div>
<p>Vérification : depuis PC1, <code>ping 192.168.2.10</code> et <code>tracert 192.168.2.10</code> (2 sauts : 192.168.1.1 puis 10.0.0.2).</p>
<p class="muted">Pour pratiquer sur de vrais IOS virtuels : <b>Cisco Packet Tracer</b> (gratuit via Cisco Networking Academy), <b>GNS3</b>, <b>EVE-NG</b> ou <b>Containerlab</b> (voir <a href="#/ressources">Ressources</a>).</p>
`,
keypoints:["Modes : utilisateur (>), privilégié (#), configuration (config)#.","conf t, interface, ip address, no shutdown.","copy running-config startup-config pour sauvegarder.","show ip interface brief et show ip route sont les commandes clés.","administratively down = manque no shutdown."],
quiz:[
{q:"Quelle commande permet de passer en mode privilégié ?",o:["configure terminal","enable","privilege","login"],a:1,e:"enable → invite #."},
{q:"Une interface est « administratively down ». Que faire ?",o:["Changer le câble","no shutdown","reload","ip routing"],a:1,e:"L'interface a été désactivée manuellement (état par défaut sur les routeurs)."},
{q:"Comment sauvegarder la configuration ?",o:["save config","copy running-config startup-config","write terminal","show startup"],a:1,e:"Ou « write memory »."},
{q:"Quelle commande affiche un résumé des interfaces et de leurs IP ?",o:["show interfaces","show ip interface brief","show running-config","show ip route"],a:1,e:"show ip int br."},
{q:"Où est stockée la running-config ?",o:["NVRAM","Flash","RAM","ROM"],a:2,e:"En RAM : perdue sans sauvegarde."}
]});
