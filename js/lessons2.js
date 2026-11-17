/* RéseauAcadémie — partie 2 : adressage IP, commutation & routage */
LESSONS.push({
id:"ipv4", cat:"addr", icon:"🔢", level:1, duration:35,
title:"Adressage IPv4",
summary:"Structure d'une adresse IPv4, binaire, masque, classes, adresses privées et spéciales, passerelle.",
content:`
<p class="lead">Une adresse <b>IPv4</b> est un nombre de <b>32 bits</b>, écrit en <b>notation décimale pointée</b> : 4 octets séparés par des points, chacun de 0 à 255. Exemple : <code>192.168.1.10</code>.</p>

<h2>Le binaire, indispensable</h2>
<p>Chaque octet = 8 bits, avec les poids :</p>
<div class="table-wrap"><table>
<tr><th>Bit</th><td>7</td><td>6</td><td>5</td><td>4</td><td>3</td><td>2</td><td>1</td><td>0</td></tr>
<tr><th>Poids</th><td>128</td><td>64</td><td>32</td><td>16</td><td>8</td><td>4</td><td>2</td><td>1</td></tr>
<tr><th>192 =</th><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
<tr><th>168 =</th><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>
</table></div>
<p><code>192.168.1.10</code> = <code class="mono">11000000.10101000.00000001.00001010</code></p>
<div class="callout tip"><b>Astuce</b>Utilisez le <a href="#/outils">convertisseur binaire</a> et l'<a href="#/exercices">entraînement à la conversion</a> pour automatiser ce calcul.</div>

<h2>Partie réseau et partie hôte</h2>
<p>Une adresse IP se divise en deux : la <b>partie réseau</b> (identique pour tous les hôtes du même réseau) et la <b>partie hôte</b> (unique pour chaque machine). Le <b>masque de sous-réseau</b> indique où se trouve la frontière : bits à 1 = réseau, bits à 0 = hôte.</p>
<div class="table-wrap"><table>
<tr><th></th><th>Décimal</th><th>Binaire</th></tr>
<tr><td>Adresse</td><td>192.168.1.10</td><td class="mono">11000000.10101000.00000001.00001010</td></tr>
<tr><td>Masque /24</td><td>255.255.255.0</td><td class="mono">11111111.11111111.11111111.00000000</td></tr>
<tr><td>Réseau (ET logique)</td><td>192.168.1.0</td><td class="mono">11000000.10101000.00000001.00000000</td></tr>
</table></div>
<p>La <b>notation CIDR</b> <code>/24</code> indique le nombre de bits à 1 dans le masque.</p>

<h2>Adresses particulières d'un réseau</h2>
<ul>
<li><b>Adresse réseau</b> : tous les bits hôte à 0 (ex. <code>192.168.1.0</code>) — identifie le réseau, non attribuable.</li>
<li><b>Adresse de broadcast</b> : tous les bits hôte à 1 (ex. <code>192.168.1.255</code>) — non attribuable.</li>
<li><b>Hôtes utilisables</b> : 2<sup>n</sup> − 2 où n = nombre de bits hôte. Pour /24 : 2<sup>8</sup> − 2 = <b>254</b>.</li>
</ul>

<h2>Les classes (historique)</h2>
<div class="table-wrap"><table>
<tr><th>Classe</th><th>1er octet</th><th>Bits de tête</th><th>Masque par défaut</th><th>Usage</th></tr>
<tr><td>A</td><td>1 – 126</td><td>0</td><td>/8 (255.0.0.0)</td><td>Très grands réseaux</td></tr>
<tr><td>B</td><td>128 – 191</td><td>10</td><td>/16 (255.255.0.0)</td><td>Réseaux moyens</td></tr>
<tr><td>C</td><td>192 – 223</td><td>110</td><td>/24 (255.255.255.0)</td><td>Petits réseaux</td></tr>
<tr><td>D</td><td>224 – 239</td><td>1110</td><td>—</td><td>Multicast</td></tr>
<tr><td>E</td><td>240 – 255</td><td>1111</td><td>—</td><td>Expérimental</td></tr>
</table></div>
<div class="callout warn"><b>Attention</b>Le système de classes est obsolète depuis 1993 (CIDR), mais reste connu et demandé en examen.</div>

<h2>Adresses privées (RFC 1918)</h2>
<p>Non routées sur Internet, utilisables librement dans les réseaux internes (avec du <b>NAT</b> pour sortir).</p>
<div class="table-wrap"><table>
<tr><th>Plage</th><th>CIDR</th><th>Nombre d'adresses</th></tr>
<tr><td>10.0.0.0 – 10.255.255.255</td><td>10.0.0.0/8</td><td>16 777 216</td></tr>
<tr><td>172.16.0.0 – 172.31.255.255</td><td>172.16.0.0/12</td><td>1 048 576</td></tr>
<tr><td>192.168.0.0 – 192.168.255.255</td><td>192.168.0.0/16</td><td>65 536</td></tr>
</table></div>

<h2>Autres adresses spéciales</h2>
<div class="table-wrap"><table>
<tr><th>Adresse / plage</th><th>Usage</th></tr>
<tr><td>127.0.0.0/8 (127.0.0.1)</td><td>Boucle locale (<i>loopback</i>, localhost)</td></tr>
<tr><td>169.254.0.0/16</td><td>APIPA / link-local : auto-attribuée quand aucun DHCP ne répond</td></tr>
<tr><td>0.0.0.0</td><td>« Cet hôte » / route par défaut (0.0.0.0/0)</td></tr>
<tr><td>255.255.255.255</td><td>Broadcast limité (réseau local)</td></tr>
<tr><td>100.64.0.0/10</td><td>CGNAT (NAT chez l'opérateur)</td></tr>
<tr><td>224.0.0.0/4</td><td>Multicast</td></tr>
<tr><td>192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24</td><td>Documentation / exemples</td></tr>
</table></div>

<h2>La passerelle par défaut</h2>
<p>Pour communiquer, un hôte compare l'IP de destination à son propre réseau (avec son masque) :</p>
<ul>
<li><b>Même réseau</b> → envoi direct (ARP pour la MAC de la destination).</li>
<li><b>Réseau différent</b> → envoi à la <b>passerelle par défaut</b> (le routeur), qui transmettra.</li>
</ul>
<p>Configuration minimale d'un hôte : <b>adresse IP + masque + passerelle + serveur DNS</b>.</p>
<div class="term-cli"><span class="p">C:\\&gt;</span> ipconfig
Carte Ethernet Ethernet :
   Adresse IPv4. . . . . . . . . . . . . .: 192.168.1.10
   Masque de sous-réseau. . . . . . . . . : 255.255.255.0
   Passerelle par défaut. . . . . . . . . : 192.168.1.1

<span class="p">$</span> ip addr show eth0      <span style="color:#888"># Linux</span>
    inet 192.168.1.10/24 brd 192.168.1.255 scope global eth0</div>

<h2>L'en-tête IPv4 (principaux champs)</h2>
<div class="table-wrap"><table>
<tr><th>Champ</th><th>Rôle</th></tr>
<tr><td>Version</td><td>4</td></tr>
<tr><td>IHL</td><td>Longueur de l'en-tête (20 octets minimum)</td></tr>
<tr><td>DSCP / ECN</td><td>Qualité de service</td></tr>
<tr><td>Longueur totale</td><td>Taille du paquet</td></tr>
<tr><td>Identification, Flags, Fragment offset</td><td>Fragmentation</td></tr>
<tr><td><b>TTL</b></td><td>Décrémenté à chaque routeur ; à 0 le paquet est détruit (évite les boucles)</td></tr>
<tr><td>Protocole</td><td>1 = ICMP, 6 = TCP, 17 = UDP, 89 = OSPF</td></tr>
<tr><td>Somme de contrôle</td><td>Vérifie l'en-tête</td></tr>
<tr><td>IP source / destination</td><td>32 bits chacune</td></tr>
</table></div>
`,
keypoints:["IPv4 = 32 bits, 4 octets en décimal pointé.","Masque : bits à 1 = réseau ; adresse réseau = IP ET masque.","Hôtes utilisables = 2^n − 2.","Privées : 10/8, 172.16/12, 192.168/16.","169.254.x.x = pas de DHCP ; 127.0.0.1 = loopback.","Destination hors réseau → passerelle par défaut."],
quiz:[
{q:"Combien de bits compte une adresse IPv4 ?",o:["16","32","48","128"],a:1,e:"4 octets × 8 bits."},
{q:"Laquelle est une adresse privée ?",o:["172.32.1.1","192.169.0.1","10.200.3.4","11.0.0.1"],a:2,e:"10.0.0.0/8 est privé ; 172.32 est hors de 172.16/12."},
{q:"Combien d'hôtes utilisables dans un /24 ?",o:["254","255","256","252"],a:0,e:"2^8 − 2 = 254."},
{q:"Un PC a l'IP 169.254.12.5. Que s'est-il probablement passé ?",o:["IP statique","Le serveur DHCP n'a pas répondu","Il est en IPv6","Il est sur Internet"],a:1,e:"APIPA : auto-configuration en l'absence de DHCP."},
{q:"Quelle est l'adresse réseau de 192.168.5.77/24 ?",o:["192.168.5.1","192.168.0.0","192.168.5.0","192.168.5.255"],a:2,e:"On met les 8 bits hôte à 0."},
{q:"Que signifie un TTL qui atteint 0 ?",o:["Le paquet est prioritaire","Le paquet est détruit","Le paquet est fragmenté","Le paquet est chiffré"],a:1,e:"Le routeur le supprime et renvoie un ICMP Time Exceeded."},
{q:"Quelle est la valeur binaire de 172 ?",o:["10101100","10110100","11001010","10101010"],a:0,e:"128+32+8+4 = 172."}
]});

LESSONS.push({
id:"subnetting", cat:"addr", icon:"✂️", level:2, duration:45,
title:"Sous-réseaux, CIDR et VLSM",
summary:"Découper un réseau en sous-réseaux : méthode, nombre magique, tableau des masques, VLSM et agrégation de routes.",
content:`
<p class="lead">Le <b>subnetting</b> consiste à découper un réseau en plusieurs <b>sous-réseaux</b> plus petits en « empruntant » des bits à la partie hôte. Objectifs : limiter les broadcasts, organiser (un sous-réseau par service/VLAN), sécuriser et économiser les adresses.</p>

<h2>Tableau des masques à connaître</h2>
<div class="table-wrap"><table>
<tr><th>CIDR</th><th>Masque</th><th>Adresses</th><th>Hôtes utilisables</th><th>Pas (nombre magique)</th></tr>
<tr><td>/24</td><td>255.255.255.0</td><td>256</td><td>254</td><td>1 (3e octet)</td></tr>
<tr><td>/25</td><td>255.255.255.128</td><td>128</td><td>126</td><td>128</td></tr>
<tr><td>/26</td><td>255.255.255.192</td><td>64</td><td>62</td><td>64</td></tr>
<tr><td>/27</td><td>255.255.255.224</td><td>32</td><td>30</td><td>32</td></tr>
<tr><td>/28</td><td>255.255.255.240</td><td>16</td><td>14</td><td>16</td></tr>
<tr><td>/29</td><td>255.255.255.248</td><td>8</td><td>6</td><td>8</td></tr>
<tr><td>/30</td><td>255.255.255.252</td><td>4</td><td>2</td><td>4</td></tr>
<tr><td>/31</td><td>255.255.255.254</td><td>2</td><td>2 (liens point à point, RFC 3021)</td><td>2</td></tr>
<tr><td>/32</td><td>255.255.255.255</td><td>1</td><td>1 (hôte unique, loopback)</td><td>1</td></tr>
</table></div>
<p>Valeurs possibles d'un octet de masque : <code>0, 128, 192, 224, 240, 248, 252, 254, 255</code>.</p>

<h2>Formules</h2>
<ul>
<li>Nombre de sous-réseaux = <b>2<sup>s</sup></b> (s = bits empruntés).</li>
<li>Hôtes par sous-réseau = <b>2<sup>h</sup> − 2</b> (h = bits hôte restants).</li>
<li><b>Nombre magique</b> (pas) = 256 − valeur de l'octet « intéressant » du masque.</li>
</ul>

<h2>Méthode rapide (nombre magique)</h2>
<p>Exemple : trouver le réseau, le broadcast et la plage de <code>192.168.10.77/27</code>.</p>
<ol>
<li>/27 → masque 255.255.255.<b>224</b> ; octet intéressant = 4e.</li>
<li>Pas = 256 − 224 = <b>32</b>. Les sous-réseaux commencent à 0, 32, 64, 96, 128…</li>
<li>77 est entre 64 et 96 → <b>réseau = 192.168.10.64</b>.</li>
<li>Broadcast = prochain réseau − 1 = <b>192.168.10.95</b>.</li>
<li>Hôtes : <b>192.168.10.65 → 192.168.10.94</b> (30 hôtes).</li>
</ol>
<div class="callout tip"><b>Entraînez-vous !</b>Le <a href="#/exercices">générateur d'exercices de subnetting</a> crée des questions aléatoires illimitées, et le <a href="#/outils">calculateur</a> vérifie vos réponses.</div>

<h2>Découper un réseau en N sous-réseaux</h2>
<p>Exemple : découper <code>192.168.1.0/24</code> en <b>4 sous-réseaux</b> égaux.</p>
<ol>
<li>2<sup>s</sup> ≥ 4 → s = 2 bits empruntés → nouveau masque /26.</li>
<li>Pas = 64 ; hôtes = 2<sup>6</sup> − 2 = 62 par sous-réseau.</li>
</ol>
<div class="table-wrap"><table>
<tr><th>Sous-réseau</th><th>Réseau</th><th>1er hôte</th><th>Dernier hôte</th><th>Broadcast</th></tr>
<tr><td>1</td><td>192.168.1.0/26</td><td>.1</td><td>.62</td><td>.63</td></tr>
<tr><td>2</td><td>192.168.1.64/26</td><td>.65</td><td>.126</td><td>.127</td></tr>
<tr><td>3</td><td>192.168.1.128/26</td><td>.129</td><td>.190</td><td>.191</td></tr>
<tr><td>4</td><td>192.168.1.192/26</td><td>.193</td><td>.254</td><td>.255</td></tr>
</table></div>

<h2>Sous-réseaux sur le 3e octet (et plus)</h2>
<p>Exemple : <code>172.16.0.0/16</code> → <code>/20</code>. Masque = 255.255.<b>240</b>.0, pas = 16 sur le 3e octet : 172.16.0.0, 172.16.16.0, 172.16.32.0… Chaque /20 contient 2<sup>12</sup> − 2 = <b>4094</b> hôtes.</p>
<p>Pour <code>10.5.37.200/20</code> : 37 est entre 32 et 48 → réseau <b>10.5.32.0</b>, broadcast <b>10.5.47.255</b>.</p>

<h2>VLSM (masques de longueur variable)</h2>
<p>Le <b>VLSM</b> permet d'utiliser des masques différents selon les besoins de chaque sous-réseau, pour <b>ne pas gaspiller</b> d'adresses.</p>
<p>Méthode : <b>trier les besoins du plus grand au plus petit</b>, puis allouer dans l'ordre.</p>
<p>Exemple avec <code>192.168.50.0/24</code> : Admin 100 hôtes, Ventes 50, Labo 20, 2 liens routeur-routeur (2 hôtes chacun).</p>
<div class="table-wrap"><table>
<tr><th>Besoin</th><th>Hôtes</th><th>Masque</th><th>Réseau</th><th>Plage</th><th>Broadcast</th></tr>
<tr><td>Admin</td><td>100</td><td>/25 (126)</td><td>192.168.50.0</td><td>.1 – .126</td><td>.127</td></tr>
<tr><td>Ventes</td><td>50</td><td>/26 (62)</td><td>192.168.50.128</td><td>.129 – .190</td><td>.191</td></tr>
<tr><td>Labo</td><td>20</td><td>/27 (30)</td><td>192.168.50.192</td><td>.193 – .222</td><td>.223</td></tr>
<tr><td>Lien WAN 1</td><td>2</td><td>/30 (2)</td><td>192.168.50.224</td><td>.225 – .226</td><td>.227</td></tr>
<tr><td>Lien WAN 2</td><td>2</td><td>/30 (2)</td><td>192.168.50.228</td><td>.229 – .230</td><td>.231</td></tr>
</table></div>
<p class="muted">Il reste 192.168.50.232/29 et suivants pour de futurs besoins. Le <a href="#/outils">calculateur VLSM</a> automatise ce découpage.</p>

<h2>Agrégation de routes (supernetting)</h2>
<p>L'inverse du subnetting : regrouper plusieurs réseaux contigus en une seule route pour alléger les tables de routage.</p>
<p>Exemple : 192.168.0.0/24, 192.168.1.0/24, 192.168.2.0/24, 192.168.3.0/24.</p>
<pre><code>192.168.000000|00.0
192.168.000000|01.0
192.168.000000|10.0
192.168.000000|11.0
→ 22 bits communs → route résumée : 192.168.0.0/22</code></pre>
`,
keypoints:["Nombre de sous-réseaux = 2^s ; hôtes = 2^h − 2.","Pas (nombre magique) = 256 − octet intéressant du masque.","Broadcast = adresse du sous-réseau suivant − 1.","/30 = 2 hôtes, idéal pour les liens point à point.","VLSM : allouer du plus grand besoin au plus petit.","Agrégation = trouver les bits communs les plus à gauche."],
quiz:[
{q:"Quel est le masque décimal d'un /27 ?",o:["255.255.255.192","255.255.255.224","255.255.255.240","255.255.255.248"],a:1,e:"/27 → 3 bits dans le dernier octet : 128+64+32 = 224."},
{q:"Combien d'hôtes utilisables dans un /28 ?",o:["16","14","30","12"],a:1,e:"2^4 − 2 = 14."},
{q:"Quelle est l'adresse réseau de 10.1.1.130/26 ?",o:["10.1.1.64","10.1.1.128","10.1.1.0","10.1.1.192"],a:1,e:"Pas de 64 : 128 ≤ 130 < 192."},
{q:"Quel est le broadcast de 192.168.1.50/29 ?",o:["192.168.1.55","192.168.1.56","192.168.1.63","192.168.1.51"],a:0,e:"Pas de 8 : réseau .48, broadcast .55."},
{q:"Quel masque pour un sous-réseau de 60 hôtes en gaspillant le moins ?",o:["/25","/26","/27","/24"],a:1,e:"/26 = 62 hôtes."},
{q:"Combien de sous-réseaux /26 dans un /24 ?",o:["2","4","8","6"],a:1,e:"2 bits empruntés → 2² = 4."},
{q:"Quelle est la route résumée de 10.0.4.0/24 à 10.0.7.0/24 ?",o:["10.0.4.0/22","10.0.0.0/21","10.0.4.0/23","10.0.4.0/21"],a:0,e:"4 à 7 = 000001|00 à 000001|11 → 22 bits communs."},
{q:"Quel est le dernier hôte utilisable de 172.16.32.0/20 ?",o:["172.16.47.255","172.16.47.254","172.16.32.254","172.16.63.254"],a:1,e:"Pas de 16 sur le 3e octet : broadcast 172.16.47.255."}
]});

LESSONS.push({
id:"ipv6", cat:"addr", icon:"6️⃣", level:2, duration:35,
title:"IPv6",
summary:"Pourquoi IPv6, notation et simplification, types d'adresses, préfixes, SLAAC, NDP, EUI-64, cohabitation avec IPv4.",
content:`
<p class="lead"><b>IPv6</b> utilise des adresses de <b>128 bits</b>, soit environ 3,4 × 10<sup>38</sup> adresses, pour résoudre l'<b>épuisement des adresses IPv4</b> (l'IANA a distribué ses derniers blocs IPv4 en 2011).</p>

<h2>Notation</h2>
<p>8 groupes de 4 chiffres hexadécimaux (16 bits chacun, appelés <i>hextets</i>), séparés par « : ».</p>
<pre><code>2001:0db8:0000:0000:0000:ff00:0042:8329</code></pre>
<h3>Règles de simplification</h3>
<ol>
<li>Supprimer les <b>zéros de tête</b> de chaque groupe : <code>0db8 → db8</code>, <code>0042 → 42</code>, <code>0000 → 0</code>.</li>
<li>Remplacer <b>une seule</b> suite de groupes à zéro par <code>::</code> (une seule fois par adresse !).</li>
</ol>
<pre><code>2001:0db8:0000:0000:0000:ff00:0042:8329
→ 2001:db8:0:0:0:ff00:42:8329
→ 2001:db8::ff00:42:8329</code></pre>
<p>Exemples : <code>::1</code> = loopback ; <code>::</code> = adresse non spécifiée.</p>
<div class="callout tip"><b>Outil</b>Le <a href="#/outils">compresseur/décompresseur IPv6</a> vous permet de vérifier vos simplifications.</div>

<h2>Préfixe et structure</h2>
<p>IPv6 utilise uniquement la notation CIDR (pas de masque décimal). Structure typique d'une adresse globale :</p>
<div class="table-wrap"><table>
<tr><th>Préfixe global de routage</th><th>ID de sous-réseau</th><th>ID d'interface</th></tr>
<tr><td>48 bits (attribué par le FAI/RIR)</td><td>16 bits (65 536 sous-réseaux)</td><td>64 bits</td></tr>
</table></div>
<p>Un réseau local IPv6 utilise presque toujours un <b>/64</b>.</p>

<h2>Types d'adresses</h2>
<div class="table-wrap"><table>
<tr><th>Type</th><th>Préfixe</th><th>Description</th></tr>
<tr><td><b>Global unicast (GUA)</b></td><td>2000::/3</td><td>Routable sur Internet (équivalent des IP publiques)</td></tr>
<tr><td><b>Link-local</b></td><td>fe80::/10</td><td>Valable uniquement sur le lien local, toujours présente sur chaque interface IPv6</td></tr>
<tr><td><b>Unique local (ULA)</b></td><td>fc00::/7 (fd00::/8)</td><td>Équivalent des adresses privées</td></tr>
<tr><td><b>Multicast</b></td><td>ff00::/8</td><td>ff02::1 = tous les nœuds, ff02::2 = tous les routeurs</td></tr>
<tr><td>Loopback</td><td>::1/128</td><td>Boucle locale</td></tr>
<tr><td>Documentation</td><td>2001:db8::/32</td><td>Exemples</td></tr>
</table></div>
<div class="callout"><b>Pas de broadcast en IPv6 !</b>Il est remplacé par le <b>multicast</b> (ex. ff02::1). L'<b>anycast</b> existe aussi.</div>

<h2>Auto-configuration</h2>
<ul>
<li><b>SLAAC</b> (Stateless Address Autoconfiguration) : le routeur annonce le préfixe (<b>Router Advertisement</b>), l'hôte génère lui-même son identifiant d'interface.</li>
<li><b>EUI-64</b> : l'ID d'interface est dérivé de la MAC : on insère <code>FFFE</code> au milieu et on inverse le 7e bit. <code>00:1A:2B:3C:4D:5E → 021a:2bff:fe3c:4d5e</code>. (Les OS modernes préfèrent des ID aléatoires pour la vie privée.)</li>
<li><b>DHCPv6</b> : avec état (stateful) ou sans état (stateless, pour le DNS seulement).</li>
</ul>

<h2>NDP (Neighbor Discovery Protocol)</h2>
<p>Basé sur ICMPv6, il remplace ARP et plus :</p>
<ul>
<li><b>RS / RA</b> (Router Solicitation / Advertisement) : découverte des routeurs et préfixes.</li>
<li><b>NS / NA</b> (Neighbor Solicitation / Advertisement) : résolution d'adresse (comme ARP) et <b>DAD</b> (détection d'adresse dupliquée).</li>
<li><b>Redirect</b> : indique un meilleur premier saut.</li>
</ul>

<h2>En-tête IPv6</h2>
<p>Simplifié et de taille fixe (<b>40 octets</b>) : Version, Traffic Class, Flow Label, Payload Length, <b>Next Header</b>, <b>Hop Limit</b> (équivalent du TTL), adresses source et destination. Pas de checksum, et la fragmentation n'est faite que par la source.</p>

<h2>Cohabitation IPv4 / IPv6</h2>
<ul>
<li><b>Double pile (dual stack)</b> : les équipements parlent IPv4 et IPv6 en parallèle (le plus courant).</li>
<li><b>Tunnels</b> : encapsuler IPv6 dans IPv4 (6in4, 6rd, Teredo).</li>
<li><b>Traduction</b> : NAT64 / DNS64 pour qu'un client IPv6 seul joigne un serveur IPv4.</li>
</ul>
<div class="term-cli"><span class="p">Router(config)#</span> ipv6 unicast-routing
<span class="p">Router(config)#</span> interface g0/0
<span class="p">Router(config-if)#</span> ipv6 address 2001:db8:acad:1::1/64
<span class="p">Router(config-if)#</span> ipv6 address fe80::1 link-local</div>
`,
keypoints:["IPv6 = 128 bits, 8 groupes hexadécimaux.","Supprimer les zéros de tête ; « :: » une seule fois.","Global unicast 2000::/3, link-local fe80::/10, ULA fc00::/7, multicast ff00::/8.","Pas de broadcast en IPv6, remplacé par le multicast.","SLAAC + NDP (RS/RA, NS/NA) remplacent DHCP/ARP.","LAN IPv6 standard : /64."],
quiz:[
{q:"Combien de bits compte une adresse IPv6 ?",o:["64","96","128","256"],a:2,e:"128 bits."},
{q:"Quelle est la forme compressée correcte de 2001:0db8:0000:0000:0000:0000:0000:0001 ?",o:["2001:db8::1","2001:db8:0::0:1","2001:db8::0::1","21:db8::1"],a:0,e:"On supprime les zéros de tête et on utilise :: une seule fois."},
{q:"Quel préfixe correspond aux adresses link-local ?",o:["2000::/3","fc00::/7","fe80::/10","ff00::/8"],a:2,e:"fe80::/10."},
{q:"Quel protocole remplace ARP en IPv6 ?",o:["DHCPv6","NDP","RIPng","SLAAC"],a:1,e:"Neighbor Discovery Protocol (messages NS/NA)."},
{q:"Quel type d'adresse n'existe pas en IPv6 ?",o:["Unicast","Multicast","Anycast","Broadcast"],a:3,e:"Le broadcast est remplacé par le multicast."},
{q:"Quelle est la taille de l'en-tête IPv6 de base ?",o:["20 octets","32 octets","40 octets","64 octets"],a:2,e:"Taille fixe de 40 octets."}
]});

LESSONS.push({
id:"vlan", cat:"lan", icon:"🏷️", level:2, duration:35,
title:"VLAN, trunk et Spanning Tree",
summary:"Segmenter un LAN avec les VLAN, ports access/trunk, 802.1Q, routage inter-VLAN, STP et agrégation de liens.",
content:`
<p class="lead">Un <b>VLAN</b> (Virtual LAN) découpe un switch physique en plusieurs réseaux logiques isolés. Chaque VLAN est un <b>domaine de broadcast</b> distinct, généralement associé à un sous-réseau IP.</p>

<h2>Pourquoi des VLAN ?</h2>
<ul>
<li><b>Sécurité</b> : isoler les services (Compta, RH, invités, caméras…).</li>
<li><b>Performance</b> : réduire la taille des domaines de broadcast.</li>
<li><b>Souplesse</b> : regrouper des utilisateurs par fonction, indépendamment de leur emplacement physique.</li>
<li>Séparer voix (VoIP) et données.</li>
</ul>

<h2>Ports access et trunk</h2>
<ul>
<li><b>Port access</b> : appartient à <b>un seul VLAN</b> ; relie un équipement final (PC, imprimante). Les trames sont non taguées.</li>
<li><b>Port trunk</b> : transporte <b>plusieurs VLAN</b> entre switches (ou vers un routeur/serveur). Les trames sont <b>taguées 802.1Q</b>.</li>
</ul>
<h3>Le tag 802.1Q</h3>
<p>4 octets insérés dans la trame Ethernet après la MAC source : TPID (0x8100), priorité PCP (3 bits, QoS 802.1p), DEI (1 bit) et <b>VLAN ID sur 12 bits</b> → VLAN 1 à 4094.</p>
<p>Le <b>VLAN natif</b> (VLAN 1 par défaut) circule <b>sans tag</b> sur un trunk. Bonne pratique : le changer pour un VLAN inutilisé.</p>

<h2>Configuration Cisco</h2>
<div class="term-cli"><span class="p">Switch(config)#</span> vlan 10
<span class="p">Switch(config-vlan)#</span> name COMPTA
<span class="p">Switch(config)#</span> vlan 20
<span class="p">Switch(config-vlan)#</span> name RH
<span class="p">Switch(config)#</span> interface fa0/1
<span class="p">Switch(config-if)#</span> switchport mode access
<span class="p">Switch(config-if)#</span> switchport access vlan 10
<span class="p">Switch(config)#</span> interface g0/1
<span class="p">Switch(config-if)#</span> switchport mode trunk
<span class="p">Switch(config-if)#</span> switchport trunk native vlan 99
<span class="p">Switch(config-if)#</span> switchport trunk allowed vlan 10,20,99
<span class="p">Switch#</span> show vlan brief
<span class="p">Switch#</span> show interfaces trunk</div>

<h2>Routage inter-VLAN</h2>
<p>Deux VLAN ne peuvent communiquer qu'en passant par un équipement de <b>couche 3</b>.</p>
<ol>
<li><b>Routeur avec une interface par VLAN</b> (méthode historique, peu évolutive).</li>
<li><b>Router-on-a-stick</b> : un seul lien trunk vers le routeur, avec des <b>sous-interfaces</b>.</li>
<li><b>Switch de couche 3</b> avec des interfaces <b>SVI</b> (la méthode moderne, la plus performante).</li>
</ol>
<div class="term-cli"><span class="p">! Router-on-a-stick</span>
<span class="p">Router(config)#</span> interface g0/0.10
<span class="p">Router(config-subif)#</span> encapsulation dot1Q 10
<span class="p">Router(config-subif)#</span> ip address 192.168.10.1 255.255.255.0
<span class="p">Router(config)#</span> interface g0/0.20
<span class="p">Router(config-subif)#</span> encapsulation dot1Q 20
<span class="p">Router(config-subif)#</span> ip address 192.168.20.1 255.255.255.0

<span class="p">! Switch L3 (SVI)</span>
<span class="p">SwitchL3(config)#</span> ip routing
<span class="p">SwitchL3(config)#</span> interface vlan 10
<span class="p">SwitchL3(config-if)#</span> ip address 192.168.10.1 255.255.255.0</div>

<h2>Spanning Tree Protocol (STP, 802.1D)</h2>
<p>La redondance entre switches crée des <b>boucles de couche 2</b> : tempêtes de broadcast, instabilité des tables MAC, trames dupliquées. Ethernet n'a pas de TTL, une trame peut tourner à l'infini ! <b>STP</b> bloque logiquement certains ports pour obtenir un arbre sans boucle.</p>
<ol>
<li><b>Élection du pont racine (root bridge)</b> : le switch avec le plus petit <b>Bridge ID</b> (priorité 32768 par défaut + adresse MAC).</li>
<li><b>Ports racines</b> : sur chaque autre switch, le port au plus faible coût vers la racine.</li>
<li><b>Ports désignés</b> : un par segment, celui le plus proche de la racine.</li>
<li>Les autres ports sont <b>bloqués</b> (alternate).</li>
</ol>
<div class="table-wrap"><table>
<tr><th>Débit</th><th>Coût STP (court)</th></tr>
<tr><td>10 Mbit/s</td><td>100</td></tr><tr><td>100 Mbit/s</td><td>19</td></tr><tr><td>1 Gbit/s</td><td>4</td></tr><tr><td>10 Gbit/s</td><td>2</td></tr>
</table></div>
<p>États des ports (802.1D) : Blocking → Listening → Learning → Forwarding (≈ 30 à 50 s). <b>RSTP (802.1w)</b> converge en quelques secondes ; <b>MSTP (802.1s)</b> et <b>PVST+</b> permettent un arbre par VLAN / groupe de VLAN.</p>
<div class="term-cli"><span class="p">Switch(config)#</span> spanning-tree mode rapid-pvst
<span class="p">Switch(config)#</span> spanning-tree vlan 10 root primary
<span class="p">Switch(config)#</span> interface fa0/1
<span class="p">Switch(config-if)#</span> spanning-tree portfast
<span class="p">Switch(config-if)#</span> spanning-tree bpduguard enable</div>
<div class="callout tip"><b>PortFast & BPDU Guard</b>PortFast fait passer immédiatement un port access en forwarding ; BPDU Guard le désactive s'il reçoit un BPDU (quelqu'un a branché un switch).</div>

<h2>Agrégation de liens (EtherChannel / LACP)</h2>
<p>Regroupe plusieurs liens physiques en un seul lien logique : plus de bande passante, redondance, et STP ne bloque pas les liens. Protocoles : <b>LACP (802.3ad)</b> standard, PAgP (Cisco).</p>
<div class="term-cli"><span class="p">Switch(config)#</span> interface range g0/1 - 2
<span class="p">Switch(config-if-range)#</span> channel-group 1 mode active</div>
`,
keypoints:["Un VLAN = un domaine de broadcast = généralement un sous-réseau.","Access = 1 VLAN non tagué ; trunk = plusieurs VLAN tagués 802.1Q.","VLAN ID sur 12 bits (1-4094) ; VLAN natif non tagué.","Le routage inter-VLAN nécessite la couche 3 (router-on-a-stick ou SVI).","STP élit un root bridge (plus petit Bridge ID) et bloque les ports redondants.","LACP agrège des liens physiques en un lien logique."],
quiz:[
{q:"Quel standard définit le tagging des VLAN ?",o:["802.3","802.11","802.1Q","802.1X"],a:2,e:"IEEE 802.1Q."},
{q:"Quel type de port relie deux switches et transporte plusieurs VLAN ?",o:["Access","Trunk","Natif","Console"],a:1,e:"Un port trunk transporte plusieurs VLAN tagués."},
{q:"Combien de bits pour le VLAN ID ?",o:["8","10","12","16"],a:2,e:"12 bits → 4096 valeurs (1-4094 utilisables)."},
{q:"Comment STP choisit-il le root bridge ?",o:["Plus grande MAC","Plus petit Bridge ID","Plus de ports","Plus haut débit"],a:1,e:"Priorité + MAC : le plus petit gagne."},
{q:"Quel est le rôle principal de STP ?",o:["Router entre VLAN","Éviter les boucles de couche 2","Chiffrer les trames","Attribuer des IP"],a:1,e:"Il bloque des ports pour supprimer les boucles."},
{q:"Quelle méthode utilise des sous-interfaces sur un routeur ?",o:["SVI","Router-on-a-stick","EtherChannel","PortFast"],a:1,e:"Une sous-interface par VLAN avec encapsulation dot1Q."}
]});

LESSONS.push({
id:"routage", cat:"lan", icon:"🧭", level:2, duration:45,
title:"Le routage IP",
summary:"Table de routage, longest prefix match, routes statiques et par défaut, distance administrative, RIP, OSPF, EIGRP, BGP.",
content:`
<p class="lead">Le <b>routage</b> consiste à choisir le chemin qu'un paquet emprunte pour aller d'un réseau à un autre. Chaque routeur prend une décision <b>saut par saut</b> en consultant sa <b>table de routage</b>.</p>

<h2>La table de routage</h2>
<p>Chaque entrée indique : un <b>réseau de destination</b> (préfixe), le <b>prochain saut</b> (next hop) ou l'interface de sortie, la <b>distance administrative</b> et la <b>métrique</b>.</p>
<div class="term-cli"><span class="p">R1#</span> show ip route
Codes: C - connected, L - local, S - static, R - RIP, O - OSPF, D - EIGRP, B - BGP
Gateway of last resort is 203.0.113.1 to network 0.0.0.0

S*    0.0.0.0/0 [1/0] via 203.0.113.1
      192.168.1.0/24 is variably subnetted, 2 subnets, 2 masks
C        192.168.1.0/24 is directly connected, GigabitEthernet0/0
L        192.168.1.1/32 is directly connected, GigabitEthernet0/0
O     10.10.0.0/16 [110/20] via 192.168.12.2, 00:05:12, Serial0/0/0
S     172.16.0.0/16 [1/0] via 192.168.12.2</div>
<p>Dans <code>[110/20]</code> : 110 = distance administrative, 20 = métrique.</p>

<h2>Comment un routeur choisit-il une route ?</h2>
<ol>
<li><b>Longest prefix match</b> : la route avec le <b>préfixe le plus long</b> (le plus spécifique) qui correspond à la destination l'emporte. Pour 10.10.5.3 : /24 bat /16, qui bat /0.</li>
<li>À préfixe égal provenant de sources différentes : la plus petite <b>distance administrative</b> (fiabilité de la source).</li>
<li>À source égale : la plus petite <b>métrique</b>. En cas d'égalité : partage de charge (ECMP).</li>
</ol>
<div class="table-wrap"><table>
<tr><th>Source de la route</th><th>Distance administrative (Cisco)</th></tr>
<tr><td>Directement connecté</td><td>0</td></tr>
<tr><td>Statique</td><td>1</td></tr>
<tr><td>eBGP</td><td>20</td></tr>
<tr><td>EIGRP (interne)</td><td>90</td></tr>
<tr><td>OSPF</td><td>110</td></tr>
<tr><td>IS-IS</td><td>115</td></tr>
<tr><td>RIP</td><td>120</td></tr>
<tr><td>iBGP</td><td>200</td></tr>
</table></div>

<h2>Routage statique</h2>
<p>Configuré manuellement. Simple, sécurisé, sans surcharge, mais ne s'adapte pas aux pannes et devient ingérable sur un grand réseau.</p>
<div class="term-cli"><span class="p">R1(config)#</span> ip route 172.16.0.0 255.255.0.0 192.168.12.2
<span class="p">R1(config)#</span> ip route 0.0.0.0 0.0.0.0 203.0.113.1        <span style="color:#888">! route par défaut</span>
<span class="p">R1(config)#</span> ip route 172.16.0.0 255.255.0.0 10.0.0.2 5   <span style="color:#888">! route flottante (AD 5, secours)</span>

<span class="p">$</span> sudo ip route add 172.16.0.0/16 via 192.168.12.2   <span style="color:#888"># Linux</span>
<span class="p">C:\\&gt;</span> route add 172.16.0.0 mask 255.255.0.0 192.168.12.2  <span style="color:#888">REM Windows</span></div>
<p>La <b>route par défaut</b> <code>0.0.0.0/0</code> correspond à toutes les destinations : utilisée quand aucune route plus précise n'existe (typiquement vers Internet).</p>

<h2>Routage dynamique</h2>
<p>Les routeurs échangent automatiquement leurs informations et s'adaptent aux changements de topologie.</p>
<div class="table-wrap"><table>
<tr><th>Protocole</th><th>Type</th><th>Métrique</th><th>Caractéristiques</th></tr>
<tr><td><b>RIP v2</b></td><td>IGP, vecteur de distance</td><td>Nombre de sauts (max 15)</td><td>Simple, lent, mises à jour toutes les 30 s, petits réseaux</td></tr>
<tr><td><b>OSPF</b></td><td>IGP, état de liens</td><td>Coût (basé sur la bande passante)</td><td>Standard ouvert, convergence rapide, zones (area 0 = backbone), algorithme de Dijkstra (SPF)</td></tr>
<tr><td><b>EIGRP</b></td><td>IGP, vecteur de distance avancé</td><td>Bande passante + délai</td><td>Cisco (ouvert partiellement), algorithme DUAL, routes de secours précalculées</td></tr>
<tr><td><b>IS-IS</b></td><td>IGP, état de liens</td><td>Coût</td><td>Opérateurs</td></tr>
<tr><td><b>BGP</b></td><td>EGP, vecteur de chemin</td><td>Attributs (AS-PATH, LOCAL_PREF…)</td><td>Le protocole d'Internet, entre systèmes autonomes (AS), TCP 179</td></tr>
</table></div>
<ul>
<li><b>IGP</b> (Interior Gateway Protocol) : à l'intérieur d'une organisation (un AS).</li>
<li><b>EGP</b> (Exterior) : entre organisations — BGP est le seul utilisé aujourd'hui.</li>
<li><b>Vecteur de distance</b> : « routage par rumeur », chaque routeur connaît la distance et la direction (risque de boucles, atténué par split horizon, route poisoning).</li>
<li><b>État de liens</b> : chaque routeur a une carte complète du réseau (LSDB) et calcule lui-même les meilleurs chemins.</li>
</ul>

<h2>OSPF en détail</h2>
<ul>
<li>Voisins découverts par des paquets <b>Hello</b> (multicast 224.0.0.5), toutes les 10 s sur Ethernet.</li>
<li>Échange de <b>LSA</b> pour construire la base LSDB identique sur tous les routeurs d'une zone.</li>
<li>Coût = bande passante de référence (100 Mbit/s par défaut) / bande passante de l'interface.</li>
<li>Sur un réseau multi-accès : élection d'un <b>DR</b> et d'un <b>BDR</b>.</li>
<li><b>Router ID</b> : identifiant 32 bits (manuel, plus haute loopback, ou plus haute IP active).</li>
</ul>
<div class="term-cli"><span class="p">R1(config)#</span> router ospf 1
<span class="p">R1(config-router)#</span> router-id 1.1.1.1
<span class="p">R1(config-router)#</span> network 192.168.1.0 0.0.0.255 area 0
<span class="p">R1(config-router)#</span> network 192.168.12.0 0.0.0.3 area 0
<span class="p">R1(config-router)#</span> passive-interface g0/0
<span class="p">R1#</span> show ip ospf neighbor</div>
<p class="muted">OSPF utilise un <b>masque générique</b> (wildcard) : l'inverse du masque. 255.255.255.0 → 0.0.0.255.</p>

<h2>Redondance de passerelle (FHRP)</h2>
<p><b>HSRP</b> (Cisco), <b>VRRP</b> (standard) et <b>GLBP</b> permettent à deux routeurs de partager une <b>IP de passerelle virtuelle</b> : si le routeur actif tombe, le second prend le relais de façon transparente pour les hôtes.</p>
`,
keypoints:["Le routeur choisit d'abord le préfixe le plus long (longest prefix match).","Puis la plus petite distance administrative, puis la plus petite métrique.","Route par défaut : 0.0.0.0/0.","RIP = sauts (max 15), OSPF = coût / état de liens, BGP = entre AS.","OSPF : area 0, Hello, LSA, DR/BDR, Dijkstra.","HSRP/VRRP fournissent une passerelle redondante."],
quiz:[
{q:"Pour la destination 10.1.1.5, quelle route est choisie ?",o:["10.0.0.0/8","10.1.0.0/16","10.1.1.0/24","0.0.0.0/0"],a:2,e:"Le préfixe le plus long l'emporte."},
{q:"Quelle est la distance administrative d'OSPF ?",o:["90","100","110","120"],a:2,e:"OSPF = 110."},
{q:"Quelle est la métrique de RIP ?",o:["Bande passante","Délai","Nombre de sauts","Coût"],a:2,e:"Nombre de sauts, 16 = inaccessible."},
{q:"Quel protocole est utilisé entre les opérateurs d'Internet ?",o:["OSPF","RIP","EIGRP","BGP"],a:3,e:"BGP échange les routes entre systèmes autonomes."},
{q:"Comment s'écrit la route par défaut ?",o:["255.255.255.255/32","0.0.0.0/0","127.0.0.0/8","192.168.0.0/16"],a:1,e:"0.0.0.0/0 correspond à toutes les destinations."},
{q:"Quel algorithme utilise OSPF ?",o:["Bellman-Ford","DUAL","Dijkstra (SPF)","Path vector"],a:2,e:"Shortest Path First de Dijkstra."},
{q:"Quel est le masque générique (wildcard) de 255.255.255.252 ?",o:["0.0.0.3","0.0.0.252","0.0.0.4","255.255.255.3"],a:0,e:"255 − 252 = 3."}
]});
