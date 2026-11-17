/* RéseauAcadémie — partie 4 : niveau expert */
window.CATEGORIES.push({id:"exp", name:"Expert"});

LESSONS.push({
id:"bgp", cat:"exp", icon:"🌐", level:3, duration:45,
title:"BGP avancé et routage Internet",
summary:"Systèmes autonomes, eBGP/iBGP, attributs et sélection du meilleur chemin, peering/transit, RPKI et sécurité du routage.",
content:`
<p class="lead"><b>BGP-4</b> (RFC 4271) est le protocole qui relie les ~75 000 <b>systèmes autonomes</b> (AS) d'Internet. C'est un protocole à <b>vecteur de chemin</b>, conçu pour appliquer des <b>politiques</b> plutôt que pour trouver le chemin le plus court.</p>

<h2>Notions clés</h2>
<ul>
<li><b>AS</b> : ensemble de réseaux sous une administration unique, identifié par un <b>ASN</b> (16 ou 32 bits ; privés : 64512-65534 et 4200000000-4294967294).</li>
<li><b>eBGP</b> : entre AS différents (AD 20). <b>iBGP</b> : à l'intérieur d'un AS (AD 200).</li>
<li>Sessions sur <b>TCP 179</b>, voisins configurés manuellement. États : Idle → Connect → Active → OpenSent → OpenConfirm → <b>Established</b>.</li>
<li>Messages : OPEN, UPDATE, KEEPALIVE, NOTIFICATION (et ROUTE-REFRESH).</li>
<li>Règle de <b>split horizon iBGP</b> : une route apprise d'un pair iBGP n'est pas réannoncée à un autre pair iBGP → full mesh, ou <b>route reflectors</b> / confédérations.</li>
<li>Prévention des boucles eBGP : un routeur rejette une route contenant son propre ASN dans l'<b>AS_PATH</b>.</li>
</ul>

<h2>Sélection du meilleur chemin (Cisco, simplifié)</h2>
<ol>
<li>Plus grand <b>Weight</b> (Cisco, local au routeur).</li>
<li>Plus grand <b>LOCAL_PREF</b> (dans tout l'AS — contrôle du trafic <b>sortant</b>).</li>
<li>Route originée localement.</li>
<li><b>AS_PATH</b> le plus court.</li>
<li>Origin la plus basse (IGP &lt; EGP &lt; incomplete).</li>
<li>Plus petit <b>MED</b> (suggestion à l'AS voisin — trafic <b>entrant</b>).</li>
<li>eBGP préféré à iBGP.</li>
<li>Plus proche next hop IGP, puis plus ancienne route eBGP, puis plus petit Router ID.</li>
</ol>
<div class="callout tip"><b>Mnémotechnique</b>« <b>W</b>e <b>L</b>ove <b>O</b>ranges <b>AS</b> <b>O</b>ranges <b>M</b>ean <b>P</b>ure <b>R</b>efreshment » — Weight, Local pref, Originate, AS path, Origin, MED, Paths (eBGP), Router ID.</div>
<p>Influencer le trafic entrant : <b>AS-path prepending</b>, MED, annonces de préfixes plus spécifiques, communautés BGP fournies par le transitaire.</p>

<h2>Configuration</h2>
<div class="term-cli"><span class="p">R1(config)#</span> router bgp 65001
<span class="p">R1(config-router)#</span> bgp router-id 1.1.1.1
<span class="p">R1(config-router)#</span> neighbor 203.0.113.2 remote-as 64500
<span class="p">R1(config-router)#</span> neighbor 203.0.113.2 password S3cr3t
<span class="p">R1(config-router)#</span> address-family ipv4 unicast
<span class="p">R1(config-router-af)#</span> network 198.51.100.0 mask 255.255.255.0
<span class="p">R1(config-router-af)#</span> neighbor 203.0.113.2 prefix-list OUT-PFX out
<span class="p">R1(config-router-af)#</span> neighbor 203.0.113.2 route-map SET-LP in
<span class="p">R1#</span> show ip bgp summary
<span class="p">R1#</span> show ip bgp 198.51.100.0/24</div>

<h2>L'économie d'Internet</h2>
<ul>
<li><b>Transit</b> : un client paie un fournisseur pour atteindre tout Internet.</li>
<li><b>Peering</b> : deux AS échangent gratuitement le trafic de leurs clients, souvent dans un <b>IXP</b> (point d'échange, ex. France-IX, DE-CIX, AMS-IX).</li>
<li><b>Tier 1</b> : opérateurs qui atteignent tout Internet sans payer de transit.</li>
<li>Politique de <b>Gao-Rexford</b> : on préfère les routes clients &gt; peers &gt; fournisseurs, et on n'annonce les routes de peers/fournisseurs qu'à ses clients.</li>
</ul>

<h2>Sécurité du routage</h2>
<ul>
<li><b>Détournements (hijacks)</b> et <b>fuites de routes</b> : annonces illégitimes de préfixes (incidents célèbres : Pakistan Telecom / YouTube en 2008).</li>
<li><b>RPKI / ROV</b> : des certificats (ROA) indiquent quel AS est autorisé à originer un préfixe ; les routeurs rejettent les annonces <b>invalid</b>.</li>
<li>Filtrage par <b>prefix-lists</b> (bases IRR), max-prefix, GTSM (TTL security), authentification TCP-AO/MD5.</li>
<li>Initiative <b>MANRS</b> : normes communes de bonne hygiène du routage.</li>
</ul>
`,
keypoints:["BGP = vecteur de chemin, TCP 179, relie les AS d'Internet.","eBGP AD 20, iBGP AD 200 ; iBGP nécessite full mesh ou route reflectors.","LOCAL_PREF contrôle le trafic sortant ; AS-path prepending/MED le trafic entrant.","Ordre : Weight, LOCAL_PREF, origine locale, AS_PATH, Origin, MED, eBGP>iBGP…","RPKI/ROV protège contre l'usurpation d'origine des préfixes."],
quiz:[
{q:"Quel port utilise BGP ?",o:["UDP 179","TCP 179","TCP 520","IP 89"],a:1,e:"BGP fonctionne sur TCP 179."},
{q:"Quel attribut sert à influencer le trafic sortant d'un AS ?",o:["MED","AS_PATH","LOCAL_PREF","Origin"],a:2,e:"LOCAL_PREF est partagé dans tout l'AS ; le plus grand gagne."},
{q:"Comment un routeur eBGP évite-t-il les boucles ?",o:["TTL","Il rejette les routes contenant son ASN dans l'AS_PATH","Split horizon","Route poisoning"],a:1,e:"L'AS_PATH liste les AS traversés."},
{q:"Quelle technologie valide l'AS d'origine d'un préfixe ?",o:["DNSSEC","RPKI","IPsec","MPLS"],a:1,e:"Les ROA de la RPKI."},
{q:"Quel est l'état final d'une session BGP fonctionnelle ?",o:["Active","OpenConfirm","Established","Full"],a:2,e:"« Full » est un état OSPF."}
]});

LESSONS.push({
id:"qos", cat:"exp", icon:"🎚️", level:3, duration:30,
title:"Qualité de service (QoS)",
summary:"Classification et marquage (DSCP, CoS), files d'attente, policing/shaping, prérequis voix et vidéo.",
content:`
<p class="lead">La <b>QoS</b> gère la congestion en donnant la priorité au trafic sensible (voix, vidéo, applications critiques) au détriment du trafic tolérant (sauvegardes, téléchargements).</p>

<h2>Les paramètres à maîtriser</h2>
<div class="table-wrap"><table>
<tr><th>Trafic</th><th>Latence (sens unique)</th><th>Gigue</th><th>Perte</th></tr>
<tr><td>Voix</td><td>&lt; 150 ms</td><td>&lt; 30 ms</td><td>&lt; 1 %</td></tr>
<tr><td>Vidéo interactive</td><td>&lt; 150-200 ms</td><td>&lt; 30-50 ms</td><td>&lt; 0,1-1 %</td></tr>
<tr><td>Données</td><td>Tolérante</td><td>Tolérante</td><td>Retransmise par TCP</td></tr>
</table></div>

<h2>Modèles</h2>
<ul>
<li><b>Best effort</b> : aucune QoS (Internet).</li>
<li><b>IntServ</b> : réservation de bout en bout (RSVP) — peu évolutif.</li>
<li><b>DiffServ</b> : chaque paquet est marqué, chaque routeur applique un traitement par saut (PHB) — le modèle standard.</li>
</ul>

<h2>Classification et marquage</h2>
<ul>
<li><b>Couche 2</b> : <b>CoS / PCP</b> (3 bits dans le tag 802.1Q, valeurs 0-7).</li>
<li><b>Couche 3</b> : <b>DSCP</b> (6 bits de l'octet ToS/Traffic Class, valeurs 0-63).</li>
</ul>
<div class="table-wrap"><table>
<tr><th>DSCP</th><th>Valeur</th><th>Usage typique</th></tr>
<tr><td><b>EF</b> (Expedited Forwarding)</td><td>46</td><td>Voix (file prioritaire)</td></tr>
<tr><td><b>AF41</b></td><td>34</td><td>Visioconférence</td></tr>
<tr><td><b>AF31</b></td><td>26</td><td>Signalisation / données critiques</td></tr>
<tr><td><b>CS6</b></td><td>48</td><td>Contrôle réseau (routage)</td></tr>
<tr><td><b>AF11</b> / CS1</td><td>10 / 8</td><td>Données en masse / « scavenger »</td></tr>
<tr><td><b>BE / DF</b></td><td>0</td><td>Best effort</td></tr>
</table></div>
<p>Classes <b>AFxy</b> : x = classe (1-4), y = probabilité de rejet (1 faible à 3 forte). Valeur = 8x + 2y.</p>
<p>On marque au plus près de la source et on définit une <b>frontière de confiance</b> (trust boundary), souvent au téléphone IP ou au switch d'accès.</p>

<h2>Gestion de la congestion</h2>
<ul>
<li><b>FIFO</b> : par défaut, aucune différenciation.</li>
<li><b>CBWFQ</b> : bande passante garantie par classe.</li>
<li><b>LLQ</b> : CBWFQ + une file <b>strictement prioritaire</b> (limitée) pour la voix.</li>
<li><b>WRED</b> : rejet anticipé et aléatoire pour éviter la synchronisation TCP (tail drop).</li>
<li><b>Policing</b> : jette ou remarque le trafic excédentaire. <b>Shaping</b> : le met en tampon pour lisser le débit (ajoute de la latence).</li>
</ul>
<div class="term-cli"><span class="p">R1(config)#</span> class-map match-any VOIX
<span class="p">R1(config-cmap)#</span> match dscp ef
<span class="p">R1(config)#</span> policy-map WAN-OUT
<span class="p">R1(config-pmap)#</span> class VOIX
<span class="p">R1(config-pmap-c)#</span> priority percent 20
<span class="p">R1(config-pmap)#</span> class class-default
<span class="p">R1(config-pmap-c)#</span> fair-queue
<span class="p">R1(config)#</span> interface g0/1
<span class="p">R1(config-if)#</span> service-policy output WAN-OUT</div>
`,
keypoints:["Voix : < 150 ms de latence, < 30 ms de gigue, < 1 % de perte.","DiffServ marque les paquets avec DSCP (6 bits) ; CoS en couche 2 (3 bits).","EF (46) pour la voix, AF41 (34) pour la vidéo.","LLQ = file prioritaire stricte + CBWFQ.","Policing jette, shaping met en tampon."],
quiz:[
{q:"Quelle valeur DSCP est recommandée pour la voix ?",o:["AF41 (34)","EF (46)","CS1 (8)","0"],a:1,e:"Expedited Forwarding."},
{q:"Combien de bits pour le champ DSCP ?",o:["3","6","8","12"],a:1,e:"6 bits → 64 valeurs."},
{q:"Quelle différence entre policing et shaping ?",o:["Aucune","Le policing jette l'excédent, le shaping le met en tampon","Le shaping jette, le policing met en tampon","Le policing chiffre"],a:1,e:"Le shaping lisse au prix de latence."},
{q:"Quel mécanisme évite la synchronisation globale TCP ?",o:["LLQ","WRED","FIFO","CoS"],a:1,e:"Weighted Random Early Detection."}
]});

LESSONS.push({
id:"modern", cat:"exp", icon:"🏗️", level:3, duration:40,
title:"MPLS, SD-WAN, VXLAN et SDN",
summary:"Commutation par labels, VPN MPLS L3, SD-WAN, architecture spine-leaf, VXLAN/EVPN, SDN et cloud networking.",
content:`
<p class="lead">Les réseaux d'opérateurs, de data centers et d'entreprises multi-sites utilisent des technologies qui dépassent le routage IP classique.</p>

<h2>MPLS</h2>
<p><b>MPLS</b> (Multiprotocol Label Switching) ajoute un <b>label</b> de 32 bits (dont 20 bits de label) entre les en-têtes de couche 2 et 3. Les routeurs du cœur commutent sur le label au lieu de consulter la table IP.</p>
<ul>
<li><b>LER / PE</b> (Provider Edge) : imposent et retirent les labels. <b>LSR / P</b> : commutent les labels (swap).</li>
<li><b>LSP</b> : chemin à commutation de labels. Distribution des labels par <b>LDP</b> ou <b>RSVP-TE</b> ; aujourd'hui <b>Segment Routing</b> (SR-MPLS, SRv6).</li>
<li><b>L3VPN (RFC 4364)</b> : VRF par client sur les PE, <b>MP-BGP</b> transporte les routes VPNv4 avec Route Distinguisher (RD) et Route Targets (RT). Les clients peuvent réutiliser les mêmes plages privées.</li>
<li><b>L2VPN</b> : VPLS, pseudowires, EVPN.</li>
<li><b>Traffic Engineering</b> : forcer des chemins selon la bande passante disponible ; Fast Reroute (&lt; 50 ms).</li>
</ul>

<h2>SD-WAN</h2>
<p>Le <b>SD-WAN</b> remplace ou complète le MPLS en agrégeant plusieurs liens (fibre, 4G/5G, MPLS, Internet) avec des tunnels chiffrés (IPsec) pilotés par un <b>contrôleur centralisé</b>. Il sélectionne dynamiquement le meilleur lien par application (latence, perte, gigue) et simplifie le déploiement (zero-touch provisioning). Souvent combiné à <b>SASE</b> (sécurité fournie depuis le cloud : SWG, CASB, ZTNA).</p>

<h2>Data center : spine-leaf</h2>
<pre><code>   [Spine1]     [Spine2]
    /  |  \\     /  |  \\
[Leaf1] [Leaf2] [Leaf3] [Leaf4]
   |       |       |       |
 serveurs serveurs serveurs serveurs</code></pre>
<p>Chaque leaf est relié à chaque spine : nombre de sauts constant, trafic est-ouest optimisé, <b>ECMP</b> sur tous les liens (underlay routé en BGP ou OSPF, sans STP).</p>

<h2>VXLAN et EVPN</h2>
<ul>
<li><b>VXLAN</b> (RFC 7348) encapsule des trames Ethernet dans <b>UDP (port 4789)</b> : un réseau L2 « overlay » au-dessus d'un réseau IP « underlay ».</li>
<li>Identifiant <b>VNI</b> sur 24 bits → ~16 millions de segments (contre 4094 VLAN).</li>
<li>Les <b>VTEP</b> encapsulent/désencapsulent. Ajoute ~50 octets → augmenter la MTU de l'underlay (≥ 1550, souvent 9000).</li>
<li><b>BGP EVPN</b> sert de plan de contrôle : il distribue les adresses MAC/IP au lieu d'apprendre par inondation.</li>
</ul>

<h2>SDN</h2>
<p>Le <b>SDN</b> (Software-Defined Networking) sépare le <b>plan de contrôle</b> (décision, centralisé dans un contrôleur) du <b>plan de données</b> (transmission, dans les équipements).</p>
<ul>
<li><b>API Northbound</b> (REST) : applications ↔ contrôleur. <b>API Southbound</b> : contrôleur ↔ équipements (OpenFlow, NETCONF, gNMI).</li>
<li>Exemples : Cisco ACI / Catalyst Center, VMware NSX, ONOS, OpenDaylight.</li>
<li><b>NFV</b> : virtualiser les fonctions réseau (pare-feu, routeur, load balancer) sur des serveurs standards.</li>
</ul>

<h2>Réseau dans le cloud</h2>
<ul>
<li><b>VPC / VNet</b> : réseau privé virtuel isolé, découpé en sous-réseaux publics/privés.</li>
<li><b>Security groups</b> (stateful, par instance) et <b>NACL</b> (stateless, par sous-réseau).</li>
<li>Internet Gateway, <b>NAT Gateway</b>, peering de VPC, Transit Gateway, VPN et liaisons dédiées (Direct Connect, ExpressRoute).</li>
<li>Load balancers L4/L7, DNS géré, CDN.</li>
<li>Conteneurs : réseaux Docker (bridge, host, overlay), Kubernetes (CNI : Calico, Cilium ; Services, Ingress).</li>
</ul>
`,
keypoints:["MPLS commute sur des labels ; L3VPN = VRF + MP-BGP (RD/RT).","SD-WAN : plusieurs liens, contrôleur central, choix du lien par application.","Spine-leaf + ECMP dans les data centers.","VXLAN : L2 sur UDP 4789, VNI 24 bits ; EVPN = plan de contrôle BGP.","SDN sépare plan de contrôle et plan de données."],
quiz:[
{q:"Combien de bits pour l'identifiant VXLAN (VNI) ?",o:["12","16","24","32"],a:2,e:"24 bits → ~16 millions de segments."},
{q:"Quel port UDP utilise VXLAN ?",o:["4789","4500","179","8472"],a:0,e:"4789 (IANA)."},
{q:"Dans un MPLS L3VPN, qu'est-ce qui contrôle l'import/export des routes entre VRF ?",o:["Route Distinguisher","Route Target","Label LDP","AS_PATH"],a:1,e:"Le RD rend les préfixes uniques, les RT pilotent l'import/export."},
{q:"Que sépare le SDN ?",o:["LAN et WAN","Plan de contrôle et plan de données","IPv4 et IPv6","TCP et UDP"],a:1,e:"Le contrôle est centralisé dans un contrôleur logiciel."},
{q:"Dans une architecture spine-leaf, un leaf est relié…",o:["À un seul spine","À tous les spines","Aux autres leafs uniquement","Au routeur Internet"],a:1,e:"Chaque leaf est connecté à chaque spine."}
]});

LESSONS.push({
id:"automation", cat:"exp", icon:"🤖", level:3, duration:40,
title:"Automatisation et programmabilité réseau",
summary:"Python (Netmiko, NAPALM), Ansible, API REST, NETCONF/RESTCONF, YANG, JSON/YAML, Infrastructure as Code et NetDevOps.",
content:`
<p class="lead">Configurer 500 switches à la main, c'est lent et source d'erreurs. L'<b>automatisation</b> rend les changements rapides, reproductibles et vérifiables.</p>

<h2>Formats de données</h2>
<pre><code># JSON
{"interface": {"name": "GigabitEthernet0/1", "ip": "10.0.0.1", "mask": "255.255.255.252", "enabled": true}}

# YAML
interface:
  name: GigabitEthernet0/1
  ip: 10.0.0.1
  mask: 255.255.255.252
  enabled: true</code></pre>
<p>Également XML (NETCONF). <b>YANG</b> est un langage de <b>modélisation</b> qui décrit la structure des données de configuration (modèles OpenConfig, IETF, natifs constructeurs).</p>

<h2>Interfaces de programmation</h2>
<div class="table-wrap"><table>
<tr><th>Interface</th><th>Transport</th><th>Format</th></tr>
<tr><td>CLI via SSH (screen scraping)</td><td>SSH</td><td>Texte</td></tr>
<tr><td><b>NETCONF</b> (RFC 6241)</td><td>SSH, port 830</td><td>XML / YANG</td></tr>
<tr><td><b>RESTCONF</b> (RFC 8040)</td><td>HTTPS</td><td>JSON ou XML / YANG</td></tr>
<tr><td><b>gNMI</b></td><td>gRPC (HTTP/2)</td><td>Protobuf / YANG, streaming telemetry</td></tr>
<tr><td>API REST de contrôleurs</td><td>HTTPS</td><td>JSON</td></tr>
</table></div>

<h2>Python : Netmiko</h2>
<pre><code>from netmiko import ConnectHandler

switch = {
    "device_type": "cisco_ios",
    "host": "192.168.1.2",
    "username": "admin",
    "password": "motdepasse",
}
with ConnectHandler(**switch) as conn:
    print(conn.send_command("show ip interface brief"))
    commandes = ["vlan 30", "name INVITES"]
    print(conn.send_config_set(commandes))
    conn.save_config()</code></pre>
<p>Autres bibliothèques : <b>NAPALM</b> (abstraction multi-constructeurs, getters, diff de configuration), <b>Nornir</b> (framework Python parallèle), <b>ncclient</b> (NETCONF), <b>requests</b> (REST), <b>TextFSM / Genie</b> (parsing de sorties CLI), <b>Scapy</b> (fabrication de paquets).</p>

<h2>Python : RESTCONF avec requests</h2>
<pre><code>import requests
url = "https://192.168.1.1/restconf/data/ietf-interfaces:interfaces"
r = requests.get(url, auth=("admin", "motdepasse"),
                 headers={"Accept": "application/yang-data+json"}, verify=False)
for itf in r.json()["ietf-interfaces:interfaces"]["interface"]:
    print(itf["name"], itf.get("enabled"))</code></pre>

<h2>Ansible</h2>
<p>Outil <b>sans agent</b> (via SSH/API), <b>déclaratif</b> et <b>idempotent</b>, avec des playbooks en YAML.</p>
<pre><code># inventaire.ini
[switches]
sw1 ansible_host=192.168.1.2
sw2 ansible_host=192.168.1.3
[switches:vars]
ansible_network_os=cisco.ios.ios
ansible_connection=ansible.netcommon.network_cli

# vlans.yml
- name: Déployer les VLAN
  hosts: switches
  gather_facts: no
  tasks:
    - name: Créer les VLAN
      cisco.ios.ios_vlans:
        config:
          - vlan_id: 10
            name: COMPTA
          - vlan_id: 20
            name: RH
        state: merged</code></pre>
<pre><code>ansible-playbook -i inventaire.ini vlans.yml --check --diff</code></pre>

<h2>NetDevOps et Infrastructure as Code</h2>
<ul>
<li><b>Source de vérité</b> : la configuration désirée est stockée dans Git et/ou un IPAM/DCIM (NetBox, Nautobot).</li>
<li><b>Templates</b> Jinja2 pour générer les configurations.</li>
<li><b>CI/CD</b> : chaque changement passe par une revue (merge request), des tests (Batfish, pyATS, labs Containerlab) puis un déploiement automatique.</li>
<li><b>Terraform</b> pour le réseau cloud et certains équipements.</li>
<li><b>Observabilité</b> : streaming telemetry, Prometheus, Grafana, alerting.</li>
</ul>
`,
keypoints:["JSON/YAML pour les données, YANG pour les modèles.","NETCONF (SSH 830, XML) et RESTCONF (HTTPS, JSON).","Netmiko automatise la CLI via SSH en Python.","Ansible : sans agent, idempotent, playbooks YAML.","NetDevOps : Git comme source de vérité, tests et CI/CD."],
quiz:[
{q:"Quel port utilise NETCONF sur SSH ?",o:["22","443","830","8080"],a:2,e:"NETCONF over SSH = 830."},
{q:"Qu'est-ce que YANG ?",o:["Un protocole de transport","Un langage de modélisation de données","Un format de fichier de log","Un algorithme de routage"],a:1,e:"YANG modélise les données de configuration et d'état."},
{q:"Quelle caractéristique décrit Ansible ?",o:["Nécessite un agent sur chaque équipement","Sans agent et idempotent","Uniquement pour Windows","Basé sur XML"],a:1,e:"Ansible se connecte via SSH/API sans agent."},
{q:"Quelle bibliothèque Python automatise la CLI des équipements via SSH ?",o:["Flask","Netmiko","Pandas","Requests"],a:1,e:"Netmiko (basé sur Paramiko)."}
]});
