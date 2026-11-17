/* RéseauAcadémie — contenu des cours (partie 1 : fondamentaux & adressage) */
window.CATEGORIES = [
  {id:"fond", name:"Fondamentaux"},
  {id:"addr", name:"Adressage IP"},
  {id:"lan", name:"Commutation & Routage"},
  {id:"svc", name:"Transport & Services"},
  {id:"sec", name:"Sans-fil & Sécurité"},
  {id:"pra", name:"Pratique & Administration"}
];
window.LESSONS = [];

LESSONS.push({
id:"introduction", cat:"fond", icon:"🌐", level:1, duration:20,
title:"Introduction aux réseaux",
summary:"Qu'est-ce qu'un réseau ? Types (LAN, WAN…), topologies, équipements et modes de communication.",
content:`
<p class="lead">Un <b>réseau informatique</b> est un ensemble d'équipements (ordinateurs, serveurs, téléphones, imprimantes, objets connectés…) reliés entre eux afin d'<b>échanger des données</b> et de <b>partager des ressources</b>.</p>

<h2>Pourquoi des réseaux ?</h2>
<ul>
<li><b>Partage de ressources</b> : imprimantes, fichiers, connexion Internet, applications.</li>
<li><b>Communication</b> : e-mail, messagerie, visioconférence, VoIP.</li>
<li><b>Centralisation</b> : sauvegardes, annuaire d'utilisateurs, bases de données.</li>
<li><b>Accès distant</b> : télétravail, cloud, services web.</li>
</ul>

<h2>Les types de réseaux selon la taille</h2>
<div class="table-wrap"><table>
<tr><th>Type</th><th>Signification</th><th>Étendue</th><th>Exemple</th></tr>
<tr><td><b>PAN</b></td><td>Personal Area Network</td><td>Quelques mètres</td><td>Bluetooth entre téléphone et écouteurs</td></tr>
<tr><td><b>LAN</b></td><td>Local Area Network</td><td>Bâtiment, maison</td><td>Réseau d'une entreprise ou d'une box</td></tr>
<tr><td><b>WLAN</b></td><td>Wireless LAN</td><td>Bâtiment</td><td>Wi-Fi</td></tr>
<tr><td><b>CAN</b></td><td>Campus Area Network</td><td>Campus, site</td><td>Université avec plusieurs bâtiments</td></tr>
<tr><td><b>MAN</b></td><td>Metropolitan Area Network</td><td>Une ville</td><td>Réseau métropolitain d'une collectivité</td></tr>
<tr><td><b>WAN</b></td><td>Wide Area Network</td><td>Pays, continents</td><td>Internet, réseau d'un opérateur</td></tr>
</table></div>

<h2>Les topologies</h2>
<p>La <b>topologie physique</b> décrit la façon dont les équipements sont câblés ; la <b>topologie logique</b> décrit comment les données circulent.</p>
<div class="diagram">
<svg viewBox="0 0 760 170" width="760">
 <g font-size="13" text-anchor="middle">
  <!-- bus -->
  <line x1="20" y1="80" x2="160" y2="80" stroke="#4f8cff" stroke-width="4"/>
  <g fill="#22d3ee"><circle cx="40" cy="45" r="10"/><circle cx="90" cy="45" r="10"/><circle cx="140" cy="45" r="10"/><circle cx="65" cy="115" r="10"/><circle cx="115" cy="115" r="10"/></g>
  <g stroke="#4f8cff" stroke-width="2"><line x1="40" y1="55" x2="40" y2="80"/><line x1="90" y1="55" x2="90" y2="80"/><line x1="140" y1="55" x2="140" y2="80"/><line x1="65" y1="80" x2="65" y2="105"/><line x1="115" y1="80" x2="115" y2="105"/></g>
  <text x="90" y="155">Bus</text>
  <!-- star -->
  <g stroke="#4f8cff" stroke-width="2"><line x1="280" y1="80" x2="230" y2="40"/><line x1="280" y1="80" x2="330" y2="40"/><line x1="280" y1="80" x2="230" y2="120"/><line x1="280" y1="80" x2="330" y2="120"/><line x1="280" y1="80" x2="280" y2="30"/></g>
  <rect x="266" y="68" width="28" height="24" rx="4" fill="#f59e0b"/>
  <g fill="#22d3ee"><circle cx="230" cy="40" r="10"/><circle cx="330" cy="40" r="10"/><circle cx="230" cy="120" r="10"/><circle cx="330" cy="120" r="10"/><circle cx="280" cy="25" r="10"/></g>
  <text x="280" y="155">Étoile</text>
  <!-- ring -->
  <circle cx="460" cy="78" r="45" fill="none" stroke="#4f8cff" stroke-width="2"/>
  <g fill="#22d3ee"><circle cx="460" cy="33" r="10"/><circle cx="505" cy="78" r="10"/><circle cx="460" cy="123" r="10"/><circle cx="415" cy="78" r="10"/></g>
  <text x="460" y="155">Anneau</text>
  <!-- mesh -->
  <g stroke="#4f8cff" stroke-width="2"><line x1="610" y1="40" x2="700" y2="40"/><line x1="610" y1="40" x2="610" y2="120"/><line x1="610" y1="40" x2="700" y2="120"/><line x1="700" y1="40" x2="700" y2="120"/><line x1="700" y1="40" x2="610" y2="120"/><line x1="610" y1="120" x2="700" y2="120"/></g>
  <g fill="#22d3ee"><circle cx="610" cy="40" r="10"/><circle cx="700" cy="40" r="10"/><circle cx="610" cy="120" r="10"/><circle cx="700" cy="120" r="10"/></g>
  <text x="655" y="155">Maillée</text>
 </g>
</svg>
</div>
<div class="table-wrap"><table>
<tr><th>Topologie</th><th>Avantages</th><th>Inconvénients</th></tr>
<tr><td>Bus</td><td>Simple, peu de câble</td><td>Une coupure paralyse tout, collisions</td></tr>
<tr><td>Étoile</td><td>Facile à gérer, une panne de poste n'affecte pas les autres</td><td>Point central critique (switch)</td></tr>
<tr><td>Anneau</td><td>Accès équitable (jeton)</td><td>Une coupure peut tout bloquer (sauf double anneau)</td></tr>
<tr><td>Maillée</td><td>Très tolérante aux pannes</td><td>Coûteuse : n(n-1)/2 liens pour un maillage complet</td></tr>
<tr><td>Hybride</td><td>Combine les avantages (étoile étendue…)</td><td>Plus complexe</td></tr>
</table></div>
<div class="callout tip"><b>À retenir</b>Aujourd'hui, les LAN filaires utilisent presque toujours une <b>étoile (étendue)</b> autour de switches, et les cœurs de réseau d'opérateurs une topologie <b>maillée</b>.</div>

<h2>Les équipements réseau</h2>
<div class="table-wrap"><table>
<tr><th>Équipement</th><th>Couche OSI</th><th>Rôle</th></tr>
<tr><td><b>Carte réseau (NIC)</b></td><td>1-2</td><td>Interface entre l'hôte et le support ; possède une adresse MAC.</td></tr>
<tr><td><b>Répéteur / Hub</b></td><td>1</td><td>Régénère et diffuse le signal sur tous les ports (obsolète).</td></tr>
<tr><td><b>Switch (commutateur)</b></td><td>2</td><td>Transmet les trames uniquement vers le port de destination grâce à sa table MAC.</td></tr>
<tr><td><b>Routeur</b></td><td>3</td><td>Relie des réseaux IP différents et choisit le meilleur chemin.</td></tr>
<tr><td><b>Switch L3</b></td><td>2-3</td><td>Switch capable de router entre VLAN.</td></tr>
<tr><td><b>Point d'accès (AP)</b></td><td>1-2</td><td>Connecte les clients Wi-Fi au réseau filaire.</td></tr>
<tr><td><b>Pare-feu (firewall)</b></td><td>3-7</td><td>Filtre le trafic selon des règles de sécurité.</td></tr>
<tr><td><b>Modem / Box</b></td><td>1-3+</td><td>Convertit le signal de l'opérateur (ADSL, fibre ONT…) et fait souvent routeur, NAT, DHCP, Wi-Fi.</td></tr>
</table></div>

<h2>Modes de communication</h2>
<ul>
<li><b>Simplex</b> : un seul sens (radio FM).</li>
<li><b>Half-duplex</b> : deux sens mais pas en même temps (talkie-walkie, hub, Wi-Fi).</li>
<li><b>Full-duplex</b> : deux sens simultanément (téléphone, Ethernet commuté).</li>
</ul>
<h3>Types de diffusion</h3>
<ul>
<li><b>Unicast</b> : d'un émetteur vers un destinataire unique.</li>
<li><b>Broadcast</b> : vers tous les hôtes du réseau local.</li>
<li><b>Multicast</b> : vers un groupe d'abonnés (IPTV, protocoles de routage).</li>
<li><b>Anycast</b> : vers le plus proche d'un groupe (DNS racine, CDN).</li>
</ul>

<h2>Architectures</h2>
<p><b>Client/serveur</b> : des clients demandent des services à un serveur centralisé (web, mail). <b>Pair-à-pair (P2P)</b> : chaque machine est à la fois client et serveur (BitTorrent).</p>

<h2>Mesurer un réseau</h2>
<ul>
<li><b>Bande passante / débit</b> : quantité de données par seconde (bit/s, Mbit/s, Gbit/s). Attention : 1 octet = 8 bits.</li>
<li><b>Latence</b> : temps de trajet d'un paquet (ms).</li>
<li><b>Gigue (jitter)</b> : variation de la latence, critique pour la voix/vidéo.</li>
<li><b>Perte de paquets</b> : pourcentage de paquets perdus.</li>
</ul>
<div class="callout"><b>Exemple de calcul</b>Télécharger un fichier de 100 Mo avec une connexion de 100 Mbit/s : 100 Mo × 8 = 800 Mbit → 800 / 100 = <b>8 secondes</b> (en théorie).</div>
`,
keypoints:["Un réseau relie des équipements pour échanger des données et partager des ressources.","LAN = local, WAN = étendu (Internet est le plus grand WAN).","La topologie en étoile autour d'un switch est la norme des LAN modernes.","Hub = couche 1, switch = couche 2, routeur = couche 3.","Débit en bits/s ; 1 octet = 8 bits."],
quiz:[
{q:"Quel équipement relie deux réseaux IP différents ?",o:["Hub","Switch","Routeur","Répéteur"],a:2,e:"Le routeur travaille en couche 3 et achemine les paquets entre réseaux."},
{q:"Quelle topologie est la plus utilisée dans les LAN actuels ?",o:["Bus","Anneau","Étoile","Maillée complète"],a:2,e:"Les postes sont reliés à un switch central : topologie en étoile."},
{q:"Combien de liens faut-il pour un maillage complet de 5 nœuds ?",o:["5","10","20","25"],a:1,e:"n(n-1)/2 = 5×4/2 = 10."},
{q:"Une communication où les deux parties parlent en même temps est :",o:["Simplex","Half-duplex","Full-duplex","Broadcast"],a:2,e:"Full-duplex = les deux sens simultanément."},
{q:"Combien de temps (théorique) pour 50 Mo à 10 Mbit/s ?",o:["5 s","40 s","50 s","400 s"],a:1,e:"50 × 8 = 400 Mbit ; 400 / 10 = 40 s."}
]});

LESSONS.push({
id:"osi", cat:"fond", icon:"🧱", level:1, duration:30,
title:"Le modèle OSI",
summary:"Les 7 couches du modèle OSI, leur rôle, leurs protocoles et leurs unités de données (PDU).",
content:`
<p class="lead">Le modèle <b>OSI</b> (Open Systems Interconnection), normalisé par l'ISO en 1984, découpe la communication réseau en <b>7 couches</b>. Chaque couche rend un service à la couche supérieure et utilise les services de la couche inférieure.</p>
<div class="callout tip"><b>Moyen mnémotechnique (de 1 à 7)</b><b>P</b>our <b>L</b>e <b>R</b>éseau, <b>T</b>out <b>S</b>e <b>P</b>asse <b>A</b>utomatiquement — Physique, Liaison, Réseau, Transport, Session, Présentation, Application.</div>

<h2>Les 7 couches (cliquez sur une couche)</h2>
<div class="osi" id="osiDiagram"></div>
<div class="osi-detail" id="osiDetail">Cliquez sur une couche pour afficher ses détails.</div>

<h2>Tableau récapitulatif</h2>
<div class="table-wrap"><table>
<tr><th>#</th><th>Couche</th><th>PDU</th><th>Rôle</th><th>Exemples</th></tr>
<tr><td>7</td><td>Application</td><td>Données</td><td>Interface avec les applications</td><td>HTTP, DNS, SMTP, FTP, SSH</td></tr>
<tr><td>6</td><td>Présentation</td><td>Données</td><td>Format, chiffrement, compression</td><td>TLS, JPEG, ASCII, UTF-8</td></tr>
<tr><td>5</td><td>Session</td><td>Données</td><td>Ouverture, gestion et fermeture des sessions</td><td>RPC, NetBIOS, SMB</td></tr>
<tr><td>4</td><td>Transport</td><td>Segment / Datagramme</td><td>Communication de bout en bout, ports, fiabilité</td><td>TCP, UDP</td></tr>
<tr><td>3</td><td>Réseau</td><td>Paquet</td><td>Adressage logique et routage</td><td>IP, ICMP, OSPF</td></tr>
<tr><td>2</td><td>Liaison de données</td><td>Trame</td><td>Adressage physique (MAC), détection d'erreurs</td><td>Ethernet, Wi-Fi 802.11, PPP</td></tr>
<tr><td>1</td><td>Physique</td><td>Bit</td><td>Transmission des signaux sur le support</td><td>Câbles, fibre, ondes radio</td></tr>
</table></div>

<h2>Encapsulation et désencapsulation</h2>
<p>Lors de l'envoi, chaque couche ajoute son <b>en-tête</b> (et parfois une <b>queue</b>) aux données de la couche supérieure : c'est l'<b>encapsulation</b>. À la réception, chaque couche retire son en-tête : c'est la <b>désencapsulation</b>.</p>
<div class="encap" id="encapDemo">
 <div class="encap-row"><span class="lbl">7-5 Données</span><span class="blk" style="background:#a855f7">DONNÉES</span></div>
 <div class="encap-row"><span class="lbl">4 Segment</span><span class="blk" style="background:#3b82f6">En-tête TCP</span><span class="blk" style="background:#a855f7">DONNÉES</span></div>
 <div class="encap-row"><span class="lbl">3 Paquet</span><span class="blk" style="background:#22c55e">En-tête IP</span><span class="blk" style="background:#3b82f6">TCP</span><span class="blk" style="background:#a855f7">DONNÉES</span></div>
 <div class="encap-row"><span class="lbl">2 Trame</span><span class="blk" style="background:#f97316">En-tête Eth</span><span class="blk" style="background:#22c55e">IP</span><span class="blk" style="background:#3b82f6">TCP</span><span class="blk" style="background:#a855f7">DONNÉES</span><span class="blk" style="background:#f97316">FCS</span></div>
 <div class="encap-row"><span class="lbl">1 Bits</span><span class="blk" style="background:#ef4444">0101101001110100101100101011010…</span></div>
</div>
<button class="btn small" id="encapBtn">▶ Animer l'encapsulation</button>

<h2>Communication entre couches homologues</h2>
<p>Chaque couche d'un hôte « dialogue » logiquement avec la <b>même couche</b> de l'hôte distant (communication d'égal à égal, <i>peer-to-peer</i>), en utilisant le protocole propre à cette couche. Physiquement, les données descendent toute la pile chez l'émetteur et la remontent chez le récepteur.</p>
<div class="callout"><b>Et les équipements intermédiaires ?</b>Un <b>switch</b> désencapsule jusqu'à la couche 2 (il lit l'adresse MAC), un <b>routeur</b> jusqu'à la couche 3 (il lit l'adresse IP et reconstruit une nouvelle trame pour le lien suivant).</div>

<h2>Pourquoi un modèle en couches ?</h2>
<ul>
<li>Découper un problème complexe en sous-problèmes simples.</li>
<li>Permettre l'<b>interopérabilité</b> entre constructeurs.</li>
<li>Faire évoluer une couche sans toucher aux autres (ex. passer du cuivre à la fibre sans changer HTTP).</li>
<li>Faciliter le <b>dépannage</b> : on vérifie couche par couche (« bottom-up »).</li>
</ul>
`,
keypoints:["7 couches : Physique, Liaison, Réseau, Transport, Session, Présentation, Application.","PDU : bit (1), trame (2), paquet (3), segment (4), données (5-7).","Encapsulation = ajout d'en-têtes en descendant la pile.","Switch = couche 2 (MAC), routeur = couche 3 (IP).","Le dépannage se fait souvent couche par couche, du bas vers le haut."],
quiz:[
{q:"Quelle est la PDU de la couche 3 ?",o:["Trame","Segment","Paquet","Bit"],a:2,e:"Couche réseau = paquet."},
{q:"À quelle couche appartient TCP ?",o:["2","3","4","7"],a:2,e:"TCP et UDP sont des protocoles de transport (couche 4)."},
{q:"Quelle couche gère le chiffrement et le format des données ?",o:["Session","Présentation","Application","Transport"],a:1,e:"La couche 6 Présentation gère le format, la compression et le chiffrement."},
{q:"Les adresses MAC sont utilisées à la couche :",o:["1","2","3","4"],a:1,e:"Couche 2 liaison de données."},
{q:"Le FCS (contrôle d'erreur) est ajouté en queue de :",o:["Segment","Paquet","Trame","Données"],a:2,e:"La trame Ethernet se termine par le FCS (CRC sur 4 octets)."}
]});

LESSONS.push({
id:"tcpip", cat:"fond", icon:"📚", level:1, duration:25,
title:"Le modèle TCP/IP",
summary:"Le modèle réellement utilisé sur Internet : 4 couches, comparaison avec OSI, parcours d'une requête web.",
content:`
<p class="lead">Le modèle <b>TCP/IP</b> (ou modèle DoD), conçu dans les années 1970 pour ARPANET, est le modèle <b>réellement implémenté</b> sur Internet. Il compte <b>4 couches</b> (parfois présenté en 5 en séparant physique et liaison).</p>

<h2>Correspondance OSI ↔ TCP/IP</h2>
<div class="table-wrap"><table>
<tr><th>OSI</th><th>TCP/IP</th><th>Protocoles</th></tr>
<tr><td>7 Application<br>6 Présentation<br>5 Session</td><td><b>Application</b></td><td>HTTP(S), DNS, DHCP, FTP, SMTP, IMAP, SSH, SNMP</td></tr>
<tr><td>4 Transport</td><td><b>Transport</b></td><td>TCP, UDP, QUIC</td></tr>
<tr><td>3 Réseau</td><td><b>Internet</b></td><td>IPv4, IPv6, ICMP, IPsec</td></tr>
<tr><td>2 Liaison<br>1 Physique</td><td><b>Accès réseau</b></td><td>Ethernet, Wi-Fi, ARP*, PPP, fibre, cuivre</td></tr>
</table></div>
<p class="muted">* ARP est souvent placé « entre » les couches 2 et 3.</p>

<h2>OSI vs TCP/IP</h2>
<div class="table-wrap"><table>
<tr><th></th><th>OSI</th><th>TCP/IP</th></tr>
<tr><td>Nombre de couches</td><td>7</td><td>4</td></tr>
<tr><td>Nature</td><td>Modèle théorique de référence</td><td>Modèle pratique, issu des protocoles</td></tr>
<tr><td>Usage</td><td>Pédagogie, vocabulaire (« un switch L2 »)</td><td>Internet et quasiment tous les réseaux</td></tr>
</table></div>

<h2>Ce qui se passe quand vous tapez une URL</h2>
<p>Exemple : vous tapez <code>https://www.exemple.fr</code> dans votre navigateur.</p>
<ol>
<li><b>DHCP</b> (déjà fait au démarrage) : votre PC a reçu une IP, un masque, une passerelle et un DNS.</li>
<li><b>DNS</b> : le PC demande au serveur DNS l'adresse IP de <code>www.exemple.fr</code> (UDP 53).</li>
<li><b>ARP</b> : la destination est hors du réseau local, le PC cherche l'adresse MAC de sa <b>passerelle par défaut</b>.</li>
<li><b>TCP</b> : établissement de la connexion avec le <b>three-way handshake</b> (SYN, SYN-ACK, ACK) vers le port 443.</li>
<li><b>TLS</b> : négociation du chiffrement, vérification du certificat du serveur.</li>
<li><b>HTTP</b> : envoi de la requête <code>GET /</code>, réception de la page HTML.</li>
<li><b>Routage</b> : chaque routeur entre vous et le serveur examine l'IP de destination et transmet le paquet au saut suivant.</li>
<li>Le navigateur affiche la page, puis télécharge CSS, images, scripts…</li>
</ol>
<div class="callout tip"><b>Point clé</b>Les adresses <b>IP</b> source/destination restent les mêmes de bout en bout (hors NAT), mais les adresses <b>MAC</b> changent à chaque saut (chaque lien a sa propre trame).</div>

<h2>Les organismes de normalisation</h2>
<ul>
<li><b>IETF</b> : publie les RFC (protocoles Internet : IP, TCP, HTTP…).</li>
<li><b>IEEE</b> : normes 802 (802.3 Ethernet, 802.11 Wi-Fi, 802.1Q VLAN).</li>
<li><b>ISO</b> : modèle OSI.</li>
<li><b>IANA / ICANN</b> : attribution des adresses IP, numéros de ports, noms de domaine.</li>
<li><b>RIR</b> (RIPE NCC pour l'Europe, ARIN, APNIC, LACNIC, AFRINIC) : distribuent les blocs d'adresses.</li>
</ul>
`,
keypoints:["TCP/IP a 4 couches : Accès réseau, Internet, Transport, Application.","La couche Application TCP/IP regroupe les couches 5-6-7 OSI.","Une requête web implique DHCP, DNS, ARP, TCP, TLS puis HTTP.","Les IP restent identiques de bout en bout, les MAC changent à chaque saut.","Les RFC de l'IETF définissent les protocoles Internet."],
quiz:[
{q:"Combien de couches compte le modèle TCP/IP (version classique) ?",o:["3","4","5","7"],a:1,e:"Accès réseau, Internet, Transport, Application."},
{q:"À quelle couche TCP/IP correspond la couche Session OSI ?",o:["Transport","Internet","Application","Accès réseau"],a:2,e:"Les couches 5, 6 et 7 OSI sont regroupées dans Application."},
{q:"Quel protocole résout un nom de domaine en adresse IP ?",o:["ARP","DHCP","DNS","ICMP"],a:2,e:"DNS = Domain Name System."},
{q:"Lors d'un trajet à travers 3 routeurs, qu'est-ce qui change à chaque saut ?",o:["L'IP source","L'IP destination","Les adresses MAC","Le port TCP"],a:2,e:"Chaque lien a une nouvelle trame avec de nouvelles adresses MAC."},
{q:"Quel organisme publie les RFC ?",o:["IEEE","IETF","ISO","W3C"],a:1,e:"L'Internet Engineering Task Force."}
]});

LESSONS.push({
id:"physique", cat:"fond", icon:"🔌", level:1, duration:25,
title:"Couche physique : câbles et supports",
summary:"Cuivre (paires torsadées, catégories), fibre optique, connecteurs RJ45, normes Ethernet et codage.",
content:`
<p class="lead">La couche physique transporte les <b>bits</b> sous forme de signaux : <b>électriques</b> (cuivre), <b>lumineux</b> (fibre) ou <b>radio</b> (sans-fil).</p>

<h2>La paire torsadée (cuivre)</h2>
<p>Le câble Ethernet le plus courant contient <b>4 paires</b> de fils torsadés (8 fils), terminés par des connecteurs <b>RJ45</b> (8P8C). La torsion réduit les interférences (diaphonie).</p>
<ul>
<li><b>UTP</b> : non blindé. <b>FTP / STP / S/FTP</b> : blindé (écran global et/ou par paire), pour les environnements perturbés.</li>
<li>Longueur maximale d'un segment : <b>100 mètres</b> (90 m de câble fixe + 10 m de cordons).</li>
</ul>
<div class="table-wrap"><table>
<tr><th>Catégorie</th><th>Fréquence</th><th>Débit typique</th><th>Usage</th></tr>
<tr><td>Cat 5e</td><td>100 MHz</td><td>1 Gbit/s</td><td>Minimum actuel</td></tr>
<tr><td>Cat 6</td><td>250 MHz</td><td>1 Gbit/s (10 G sur 55 m)</td><td>Standard en entreprise</td></tr>
<tr><td>Cat 6a</td><td>500 MHz</td><td>10 Gbit/s sur 100 m</td><td>Recommandé aujourd'hui</td></tr>
<tr><td>Cat 7 / 7a</td><td>600-1000 MHz</td><td>10 Gbit/s</td><td>Blindé, connecteurs spécifiques</td></tr>
<tr><td>Cat 8</td><td>2000 MHz</td><td>25-40 Gbit/s sur 30 m</td><td>Data centers</td></tr>
</table></div>

<h3>Câblage T568A / T568B</h3>
<div class="table-wrap"><table>
<tr><th>Broche</th><th>T568A</th><th>T568B</th></tr>
<tr><td>1</td><td>Blanc-vert</td><td>Blanc-orange</td></tr>
<tr><td>2</td><td>Vert</td><td>Orange</td></tr>
<tr><td>3</td><td>Blanc-orange</td><td>Blanc-vert</td></tr>
<tr><td>4</td><td>Bleu</td><td>Bleu</td></tr>
<tr><td>5</td><td>Blanc-bleu</td><td>Blanc-bleu</td></tr>
<tr><td>6</td><td>Orange</td><td>Vert</td></tr>
<tr><td>7</td><td>Blanc-marron</td><td>Blanc-marron</td></tr>
<tr><td>8</td><td>Marron</td><td>Marron</td></tr>
</table></div>
<ul>
<li><b>Câble droit</b> : même norme aux deux extrémités (PC ↔ switch).</li>
<li><b>Câble croisé</b> : A d'un côté, B de l'autre (PC ↔ PC, switch ↔ switch) — aujourd'hui rarement nécessaire grâce à l'<b>Auto-MDI/MDIX</b>.</li>
</ul>

<h2>La fibre optique</h2>
<p>Transmet la lumière dans un cœur en verre. Insensible aux perturbations électromagnétiques, très haut débit, longues distances.</p>
<div class="table-wrap"><table>
<tr><th></th><th>Multimode (MMF)</th><th>Monomode (SMF)</th></tr>
<tr><td>Cœur</td><td>50 ou 62,5 µm</td><td>9 µm</td></tr>
<tr><td>Source</td><td>LED / VCSEL (850 nm)</td><td>Laser (1310 / 1550 nm)</td></tr>
<tr><td>Distance</td><td>Jusqu'à ~550 m (OM3/OM4)</td><td>Plusieurs dizaines de km</td></tr>
<tr><td>Usage</td><td>Intra-bâtiment, data center</td><td>Inter-bâtiments, opérateurs, FTTH</td></tr>
</table></div>
<p>Connecteurs courants : <b>LC</b> (le plus fréquent), SC, ST, MPO. Les switches utilisent des modules <b>SFP / SFP+ / QSFP</b>.</p>

<h2>Normes Ethernet (IEEE 802.3)</h2>
<div class="table-wrap"><table>
<tr><th>Nom</th><th>Débit</th><th>Support</th><th>Distance max</th></tr>
<tr><td>10BASE-T</td><td>10 Mbit/s</td><td>Cat 3</td><td>100 m</td></tr>
<tr><td>100BASE-TX (Fast Ethernet)</td><td>100 Mbit/s</td><td>Cat 5</td><td>100 m</td></tr>
<tr><td>1000BASE-T (Gigabit)</td><td>1 Gbit/s</td><td>Cat 5e/6</td><td>100 m</td></tr>
<tr><td>1000BASE-SX / LX</td><td>1 Gbit/s</td><td>Fibre MM / SM</td><td>550 m / 5-10 km</td></tr>
<tr><td>10GBASE-T</td><td>10 Gbit/s</td><td>Cat 6a</td><td>100 m</td></tr>
<tr><td>10GBASE-SR / LR</td><td>10 Gbit/s</td><td>Fibre MM / SM</td><td>300-400 m / 10 km</td></tr>
<tr><td>40G / 100G / 400G</td><td>40-400 Gbit/s</td><td>Fibre (QSFP)</td><td>Data centers, backbones</td></tr>
</table></div>
<p class="muted">Lecture : <b>1000BASE-T</b> = 1000 Mbit/s, transmission en bande de base, sur paire Torsadée.</p>

<h2>PoE (Power over Ethernet)</h2>
<p>Permet d'alimenter un équipement (téléphone IP, caméra, point d'accès) via le câble réseau : <b>802.3af</b> (15,4 W), <b>802.3at PoE+</b> (30 W), <b>802.3bt PoE++</b> (60-100 W).</p>

<h2>Perturbations du signal</h2>
<ul>
<li><b>Atténuation</b> : perte de puissance avec la distance.</li>
<li><b>Bruit / interférences (EMI, RFI)</b> : moteurs, néons, câbles électriques.</li>
<li><b>Diaphonie (crosstalk)</b> : un fil perturbe son voisin.</li>
</ul>
`,
keypoints:["Paire torsadée : 4 paires, RJ45, 100 m maximum.","Cat 6a = 10 Gbit/s sur 100 m.","Fibre monomode = longue distance (laser), multimode = courte distance.","1000BASE-T = Gigabit Ethernet sur cuivre.","PoE alimente les équipements via le câble réseau."],
quiz:[
{q:"Quelle est la longueur maximale d'un segment en paire torsadée ?",o:["50 m","100 m","185 m","500 m"],a:1,e:"100 m pour 10BASE-T à 10GBASE-T."},
{q:"Quel type de fibre est utilisé sur de longues distances ?",o:["Multimode","Monomode","Coaxiale","UTP"],a:1,e:"Le cœur fin (9 µm) de la monomode limite la dispersion."},
{q:"Que signifie le « T » dans 1000BASE-T ?",o:["Token","Twisted pair","Terabit","Transport"],a:1,e:"Paire torsadée (twisted pair)."},
{q:"Quelle catégorie minimum pour du 10 Gbit/s sur 100 m ?",o:["Cat 5e","Cat 6","Cat 6a","Cat 3"],a:2,e:"La Cat 6 ne garantit 10G que sur ~55 m."},
{q:"Quelle fonctionnalité évite d'avoir besoin de câbles croisés ?",o:["PoE","Auto-MDI/MDIX","STP","CSMA/CD"],a:1,e:"Auto-MDIX détecte et inverse automatiquement les paires."}
]});

LESSONS.push({
id:"ethernet", cat:"fond", icon:"🔀", level:1, duration:30,
title:"Ethernet, adresses MAC et switches",
summary:"Trame Ethernet, adresse MAC, fonctionnement d'un switch (table CAM), domaines de collision et de broadcast, ARP.",
content:`
<p class="lead">La couche 2 (liaison de données) organise les bits en <b>trames</b> et les achemine sur un même réseau local grâce aux <b>adresses MAC</b>.</p>

<h2>L'adresse MAC</h2>
<p>Identifiant de <b>48 bits</b> (6 octets) gravé dans chaque carte réseau, noté en hexadécimal : <code>00:1A:2B:3C:4D:5E</code> ou <code>001A.2B3C.4D5E</code> (Cisco).</p>
<ul>
<li>Les <b>3 premiers octets</b> = <b>OUI</b> (Organizationally Unique Identifier) : identifie le fabricant.</li>
<li>Les <b>3 derniers</b> = numéro unique attribué par le fabricant.</li>
<li><code>FF:FF:FF:FF:FF:FF</code> = adresse de <b>broadcast</b>.</li>
<li>Si le bit de poids faible du 1er octet vaut 1 → adresse <b>multicast</b> (ex. <code>01:00:5E:…</code>).</li>
</ul>

<h2>La trame Ethernet II</h2>
<div class="table-wrap"><table>
<tr><th>Préambule + SFD</th><th>MAC destination</th><th>MAC source</th><th>EtherType</th><th>Données (payload)</th><th>FCS</th></tr>
<tr><td>8 octets</td><td>6 octets</td><td>6 octets</td><td>2 octets</td><td>46 à 1500 octets</td><td>4 octets</td></tr>
</table></div>
<ul>
<li><b>EtherType</b> : <code>0x0800</code> = IPv4, <code>0x86DD</code> = IPv6, <code>0x0806</code> = ARP, <code>0x8100</code> = tag VLAN 802.1Q.</li>
<li><b>MTU</b> Ethernet standard : <b>1500 octets</b> de données. Trame de 64 à 1518 octets (hors préambule). Les <i>jumbo frames</i> vont jusqu'à ~9000.</li>
<li><b>FCS</b> : CRC-32 pour détecter les erreurs. Une trame corrompue est jetée.</li>
</ul>

<h2>Fonctionnement d'un switch</h2>
<p>Le switch maintient une <b>table d'adresses MAC</b> (table CAM) associant chaque MAC à un port.</p>
<ol>
<li><b>Apprentissage</b> : à la réception d'une trame, il note « MAC source ↔ port d'entrée ».</li>
<li><b>Transmission</b> : il cherche la MAC destination dans sa table.
 <ul><li>Trouvée → envoi uniquement sur ce port (<b>forwarding</b>).</li>
 <li>Inconnue, broadcast ou multicast → envoi sur tous les ports sauf celui d'entrée (<b>flooding</b>).</li>
 <li>Destination sur le même port que la source → trame ignorée (<b>filtering</b>).</li></ul></li>
<li><b>Vieillissement</b> : les entrées expirent (300 s par défaut chez Cisco).</li>
</ol>
<div class="term-cli"><span class="p">Switch#</span> show mac address-table
          Mac Address Table
-------------------------------------------
Vlan    Mac Address       Type        Ports
----    -----------       --------    -----
   1    0050.7966.6800    DYNAMIC     Fa0/1
   1    0050.7966.6801    DYNAMIC     Fa0/2
  10    001a.2b3c.4d5e    DYNAMIC     Gi0/1</div>

<h3>Modes de commutation</h3>
<ul>
<li><b>Store-and-forward</b> : reçoit toute la trame, vérifie le FCS puis la transmet (le plus courant).</li>
<li><b>Cut-through</b> : transmet dès lecture de la MAC destination (latence minimale, erreurs propagées).</li>
<li><b>Fragment-free</b> : attend les 64 premiers octets.</li>
</ul>

<h2>Domaines de collision et de broadcast</h2>
<div class="table-wrap"><table>
<tr><th>Équipement</th><th>Domaine de collision</th><th>Domaine de broadcast</th></tr>
<tr><td>Hub</td><td>1 seul pour tous les ports</td><td>1 seul</td></tr>
<tr><td>Switch</td><td><b>1 par port</b></td><td>1 seul (par VLAN)</td></tr>
<tr><td>Routeur</td><td>1 par interface</td><td><b>1 par interface</b></td></tr>
</table></div>
<div class="callout"><b>CSMA/CD</b>Sur un média partagé (hub, half-duplex), Ethernet utilisait CSMA/CD : écouter avant d'émettre, détecter les collisions, puis attendre un temps aléatoire. En full-duplex commuté, il n'y a plus de collisions.</div>

<h2>ARP : de l'IP à la MAC</h2>
<p><b>ARP</b> (Address Resolution Protocol) permet de trouver l'adresse MAC correspondant à une adresse IPv4 <b>du réseau local</b>.</p>
<ol>
<li>PC-A veut joindre 192.168.1.20 et ne connaît pas sa MAC.</li>
<li>Il envoie en <b>broadcast</b> : « Qui a 192.168.1.20 ? Répondez à 192.168.1.10 ».</li>
<li>Seul PC-B (192.168.1.20) répond en <b>unicast</b> avec sa MAC.</li>
<li>PC-A met la réponse en <b>cache ARP</b>.</li>
</ol>
<div class="term-cli"><span class="p">C:\\&gt;</span> arp -a
Interface : 192.168.1.10 --- 0x5
  Adresse Internet      Adresse physique      Type
  192.168.1.1           a4-2b-b0-11-22-33     dynamique
  192.168.1.20          00-50-79-66-68-01     dynamique</div>
<div class="callout warn"><b>Si la destination est sur un autre réseau</b>le PC fait une requête ARP pour la MAC de sa <b>passerelle par défaut</b>, pas pour celle de la destination finale.</div>
<p>En IPv6, ARP est remplacé par <b>NDP</b> (Neighbor Discovery Protocol) via ICMPv6.</p>
`,
keypoints:["Adresse MAC : 48 bits, OUI fabricant sur 24 bits.","Le switch apprend les MAC sources et transmet selon la MAC destination.","Trame inconnue ou broadcast → flooding.","Switch : 1 domaine de collision par port ; routeur : sépare les domaines de broadcast.","ARP résout IP → MAC par broadcast ; en IPv6 c'est NDP."],
quiz:[
{q:"Combien de bits compte une adresse MAC ?",o:["32","48","64","128"],a:1,e:"6 octets = 48 bits."},
{q:"Que fait un switch avec une trame dont la MAC destination est inconnue ?",o:["Il la jette","Il l'envoie au routeur","Il la diffuse sur tous les ports sauf l'entrée","Il envoie une requête ARP"],a:2,e:"C'est le flooding."},
{q:"Quel champ de la table d'un switch est appris ?",o:["MAC destination","MAC source","IP source","Port TCP"],a:1,e:"Le switch apprend à partir de la MAC source."},
{q:"Quelle est la MTU Ethernet standard ?",o:["1024","1460","1500","9000"],a:2,e:"1500 octets de charge utile."},
{q:"Quel équipement sépare les domaines de broadcast ?",o:["Hub","Switch","Routeur","Répéteur"],a:2,e:"Le routeur ne relaie pas les broadcasts."},
{q:"Quel EtherType correspond à IPv4 ?",o:["0x0806","0x0800","0x86DD","0x8100"],a:1,e:"0x0806 = ARP, 0x86DD = IPv6, 0x8100 = VLAN."}
]});
