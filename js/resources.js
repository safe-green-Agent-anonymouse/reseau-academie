/* Ressources publiques et gratuites */
window.RESOURCES = [
 {cat:"Livres et cours libres en ligne (gratuits)", items:[
  {t:"Computer Networks: A Systems Approach — Peterson & Davie",u:"https://book.systemsapproach.org/",d:"Ouvrage de référence universitaire, publié en accès libre (licence CC BY).",lvl:"Pro / Expert",lang:"EN"},
  {t:"An Introduction to Computer Networks — Peter L. Dordal",u:"https://intronetworks.cs.luc.edu/",d:"Manuel complet et gratuit (Loyola University Chicago) : Ethernet, IP, TCP, routage, QoS.",lvl:"Débutant → Expert",lang:"EN"},
  {t:"The TCP/IP Guide — Charles M. Kozierok",u:"http://www.tcpipguide.com/free/",d:"Encyclopédie en ligne de la pile TCP/IP, version web gratuite.",lvl:"Débutant → Pro",lang:"EN"},
  {t:"Beej's Guide to Network Programming",u:"https://beej.us/guide/bgnet/",d:"Programmation réseau en C avec les sockets, gratuit.",lvl:"Pro",lang:"EN"},
  {t:"Linux Network Administrator's Guide (TLDP)",u:"https://tldp.org/LDP/nag2/index.html",d:"Guide historique d'administration réseau sous Linux (The Linux Documentation Project).",lvl:"Pro",lang:"EN"},
  {t:"Ressources du livre Kurose & Ross (Computer Networking: A Top-Down Approach)",u:"https://gaia.cs.umass.edu/kurose_ross/",d:"Exercices interactifs, labs Wireshark et vidéos fournis gratuitement par les auteurs.",lvl:"Débutant → Pro",lang:"EN"}
 ]},
 {cat:"Cours en français",items:[
  {t:"FrameIP",u:"https://www.frameip.com/",d:"Site francophone historique : protocoles TCP/IP détaillés, en-têtes, outils.",lvl:"Débutant → Pro",lang:"FR"},
  {t:"OpenClassrooms — cours réseaux",u:"https://openclassrooms.com/fr/search?query=r%C3%A9seau",d:"Cours en ligne gratuits (TCP/IP, administration, sécurité).",lvl:"Zéro → Débutant",lang:"FR"},
  {t:"Zeste de Savoir — tutoriels réseau",u:"https://zestedesavoir.com/rechercher/?q=r%C3%A9seau",d:"Plateforme communautaire libre, tutoriels sur les réseaux et TCP/IP.",lvl:"Zéro → Débutant",lang:"FR"},
  {t:"Wikipédia — Portail Réseaux informatiques",u:"https://fr.wikipedia.org/wiki/Portail:R%C3%A9seaux_informatiques",d:"Articles de synthèse sur chaque protocole.",lvl:"Tous niveaux",lang:"FR"},
  {t:"ANSSI — guides et recommandations",u:"https://cyber.gouv.fr/publications",d:"Guides officiels de sécurisation (pare-feu, Wi-Fi, administration sécurisée…).",lvl:"Pro / Expert",lang:"FR"}
 ]},
 {cat:"Normes et documentation officielle",items:[
  {t:"RFC Editor — toutes les RFC",u:"https://www.rfc-editor.org/",d:"Textes officiels des protocoles Internet. Ex. RFC 791 (IPv4), 9293 (TCP), 8200 (IPv6), 1918 (adresses privées), 4271 (BGP).",lvl:"Pro / Expert",lang:"EN"},
  {t:"IANA — registres des ports et protocoles",u:"https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml",d:"Liste officielle des numéros de port.",lvl:"Tous niveaux",lang:"EN"},
  {t:"IEEE 802 — normes Ethernet, Wi-Fi",u:"https://www.ieee802.org/",d:"Groupes de travail 802.3, 802.11, 802.1.",lvl:"Expert",lang:"EN"},
  {t:"Microsoft Learn — documentation réseau Windows Server",u:"https://learn.microsoft.com/fr-fr/windows-server/networking/",d:"DNS, DHCP, commandes et cmdlets réseau PowerShell.",lvl:"Pro",lang:"FR"},
  {t:"man7.org — pages de manuel Linux (ip, ss, tcpdump…)",u:"https://man7.org/linux/man-pages/",d:"Référence des commandes réseau Linux.",lvl:"Pro",lang:"EN"},
  {t:"Wireshark — documentation et captures d'exemple",u:"https://wiki.wireshark.org/SampleCaptures",d:"Fichiers pcap gratuits pour s'entraîner à l'analyse de trafic.",lvl:"Débutant → Expert",lang:"EN"}
 ]},
 {cat:"Vidéos et formations gratuites",items:[
  {t:"Jeremy's IT Lab — cours CCNA complet",u:"https://www.youtube.com/@JeremysITLab",d:"Cours CCNA vidéo gratuit et complet, avec labs Packet Tracer.",lvl:"Débutant → Pro",lang:"EN"},
  {t:"Professor Messer — CompTIA Network+",u:"https://www.professormesser.com/",d:"Formation vidéo gratuite Network+ / Security+.",lvl:"Débutant → Pro",lang:"EN"},
  {t:"Practical Networking",u:"https://www.practicalnetworking.net/",d:"Articles et vidéos très pédagogiques (subnetting, parcours d'un paquet).",lvl:"Débutant → Pro",lang:"EN"},
  {t:"Cisco Networking Academy",u:"https://www.netacad.com/",d:"Cours en ligne gratuits (Networking Basics, etc.) et téléchargement de Packet Tracer.",lvl:"Zéro → Pro",lang:"FR/EN"}
 ]},
 {cat:"Simulateurs et labs (pour pratiquer en vrai)",items:[
  {t:"Cisco Packet Tracer",u:"https://www.netacad.com/",d:"Simulateur gratuit (compte NetAcad) : routeurs, switches, PC, idéal pour débuter.",lvl:"Débutant → Pro",lang:"FR/EN"},
  {t:"GNS3",u:"https://www.gns3.com/",d:"Émulateur open source d'équipements réels (images IOS, Linux, pare-feu).",lvl:"Pro / Expert",lang:"EN"},
  {t:"EVE-NG (Community)",u:"https://www.eve-ng.net/",d:"Plateforme de lab multi-constructeurs, édition communautaire gratuite.",lvl:"Pro / Expert",lang:"EN"},
  {t:"Containerlab",u:"https://containerlab.dev/",d:"Labs réseau en conteneurs décrits en YAML (FRR, Nokia SR Linux, Arista cEOS).",lvl:"Expert",lang:"EN"},
  {t:"Wireshark",u:"https://www.wireshark.org/",d:"Analyseur de paquets open source de référence.",lvl:"Tous niveaux",lang:"EN"},
  {t:"Nmap",u:"https://nmap.org/book/",d:"Scanner réseau ; le livre officiel est en partie consultable gratuitement.",lvl:"Pro",lang:"EN"},
  {t:"FRRouting",u:"https://frrouting.org/",d:"Suite de routage open source (OSPF, BGP, IS-IS) pour Linux.",lvl:"Expert",lang:"EN"}
 ]},
 {cat:"Certifications (pour se repérer)",items:[
  {t:"CompTIA Network+",u:"https://www.comptia.org/certifications/network",d:"Certification neutre, niveau débutant/intermédiaire.",lvl:"Débutant",lang:"EN"},
  {t:"Cisco CCNA / CCNP / CCIE",u:"https://www.cisco.com/site/us/en/learn/training-certifications/index.html",d:"Le parcours de certification réseau le plus reconnu.",lvl:"Pro → Expert",lang:"EN"},
  {t:"Juniper JNCIA / JNCIS",u:"https://www.juniper.net/us/en/training/certification.html",d:"Certifications Junos.",lvl:"Pro",lang:"EN"}
 ]}
];

window.BOOKS = [
 {t:"Réseaux (Computer Networks)",a:"Andrew Tanenbaum, Nick Feamster, David Wetherall",d:"La « bible » universitaire, traduite en français (Pearson)."},
 {t:"Computer Networking: A Top-Down Approach",a:"James Kurose, Keith Ross",d:"Approche descendante (application → physique), très pédagogique."},
 {t:"TCP/IP Illustrated, Vol. 1",a:"W. Richard Stevens, Kevin Fall",d:"Analyse détaillée des protocoles avec des captures réelles."},
 {t:"Interconnections",a:"Radia Perlman",d:"Ponts, routeurs et protocoles de routage expliqués par l'inventrice de STP."},
 {t:"Internet Routing Architectures",a:"Sam Halabi",d:"Référence sur BGP et le routage inter-domaines."},
 {t:"Network Programmability and Automation",a:"Matt Oswalt, Christian Adell, Scott Lowe, Jason Edelman",d:"Python, Ansible, APIs et NetDevOps."}
];
