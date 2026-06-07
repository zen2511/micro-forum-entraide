# Micro-Forum d'Entraide — Mini StackOverflow
**Projet Full-Stack | ENSPM | Informatique et Telecommunications | Annee Acade 2025-2026**  
Sous la Supervision de: **Dr MANAODA DEUHWE Yves Hermann**

---

## Description
Application web permettant aux étudiants de poser des questions académiques et d'y répondre — une alternative structurée aux groupes WhatsApp.

**Stack technique :** 

* Front-end: React.js
* Backend: Node.js + Express + MongoDB(pour la base de donnees)

---

## Prérequis
- [Node.js](https://nodejs.org) v18+
- [MongoDB](https://www.mongodb.com) installé et actif localement
- Git

---

## Lancement de l'application

### 1. Cloner le projet
```bash
git clone https://github.com/zen2511/micro-forum-entraide.git/
```
### 2. Ouvrir le projet dossier du projet dans un terminal

### 3. Lancer le Frontend
```bash
cd client
npm install
npm run dev
```
Dans le navigateur, coller l'adresse obtenue dans le terminal [http://localhost:5173](http://localhost:5173) par defaut.

### 4. Lancer le Backend
Ouvrir une autre instance du terminal pour le dossier du projet micro-forum-entraide
tapez cette fois ci:
```bash
cd  server
npm install
node index.js
```
ou bien:
```bash
cd  server
npm install
npm run dev
```
vu que nodemon fait partie des dependances

#### Resultat attendu:

```bash
Serveur démarré sur le port 5000
MongoDB connecté avec succès
```
