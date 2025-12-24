# 📇 Contact Book Application web de gestion de contacts avec formulaire modal. ## 🎯 Fonctionnalités - Affichage d'une liste de contacts (Nom, Prénom, Email) - Ajout de contacts via une fenêtre modale - Validation : le bouton "Valider" s'active uniquement si tous les champs sont remplis - Overlay qui grise le formulaire principal lors de l'ouverture de la modale - Persistance des données avec json-server ## 🚀 Installation
bash
# Cloner le dépôt
git clone https://github.com/aurel12321/contact-book.git
cd contact-book

# Installer dépendence json-server
npm install json-server

# Lancer json-server
npx json-server --watch db.json --port 3000

# Ouvrir index.html dans votre navigateur
## 📁 Structure du projet
contact-book/
├── css/
│   └── style.css
├── js/
│   └── script.js
├── contacts.json
├── index.html
└── README.md
## 🔧 Utilisation 1. Lancer npx json-server --watch db.json --port 3000 2. Ouvrir index.html dans un navigateur 3. Cliquer sur le bouton + pour ouvrir la modale 4. Remplir tous les champs (Nom, Prénom, Email, Téléphone) 5. Cliquer sur "Valider" → le contact s'affiche sous "Résultat de la modale" ## 📊 Format des données (db.json)
json
{
  "contacts": [
    {
   "id": "c408",
      "nom": "titi",
      "prenom": "toto",
      "email": "titi@hotmail.com",
      "telephone": "0674747474"
    }
  ]
}
## 🛠️ Technologies - HTML5 / CSS3 - JavaScript (ES6+) - json-server (API REST)
