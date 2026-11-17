# RéseauAcadémie

Site gratuit et interactif, en français, pour **apprendre les réseaux informatiques** — du grand débutant (« pour les nuls ») jusqu'au niveau expert.

## Contenu

- **22 chapitres en 4 parcours**
  - 🐣 **Zéro** : Internet expliqué sans jargon (analogie de la poste).
  - 🟢 **Débutant** : OSI, TCP/IP, câblage, Ethernet/MAC/ARP, IPv4, TCP/UDP, DHCP/DNS/NAT, HTTP/TLS, Wi-Fi, outils de dépannage.
  - 🟠 **Pro** : subnetting/VLSM, IPv6, VLAN/trunk/STP, routage (statique, OSPF…), sécurité réseau, configuration Cisco IOS.
  - 🔴 **Expert** : BGP, QoS, MPLS/SD-WAN/VXLAN/SDN, automatisation (Python, Ansible, NETCONF/RESTCONF).
- **Sandbox terminal** simulée avec missions guidées : Linux (bash), Windows CMD, PowerShell et routeur Cisco IOS.
- **125 questions de quiz**, examen blanc chronométré par niveau.
- **Exercices générés à l'infini** : subnetting, conversion binaire, masques/CIDR, ports, « même réseau ou pas ».
- **Outils** : calculateur IPv4, découpage en sous-réseaux, VLSM, IPv6 (compression, EUI-64), convertisseur, temps de transfert.
- **Ressources publiques** : livres libres en ligne, RFC, cours francophones, vidéos, simulateurs (Packet Tracer, GNS3, Containerlab).
- Glossaire, recherche, thème clair/sombre, progression enregistrée localement.

## Utilisation

Aucune dépendance ni build : c'est un site statique (HTML/CSS/JavaScript).

- En local : ouvrez `index.html` dans un navigateur, ou lancez `python3 -m http.server 8080` puis http://localhost:8080.
- En ligne : déployé automatiquement sur **GitHub Pages** à chaque push sur `main` (workflow `.github/workflows/pages.yml`).

## Structure

```
index.html
css/style.css
js/lessons*.js   contenu des cours
js/quiz.js       quiz, examen, exercices
js/tools.js      calculateurs
js/sandbox.js    terminaux simulés
js/resources.js  ressources publiques
js/app.js        navigation, pages, recherche
```

> Les terminaux sont des simulations pédagogiques : pour de vrais systèmes, utilisez WSL/une VM Linux, Packet Tracer, GNS3 ou Containerlab.
