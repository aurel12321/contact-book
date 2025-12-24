// ======================
// Sélecteurs
// ======================
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const validateBtn = document.getElementById("validateBtn");

const tableBody = document.getElementById("contactTable");

const nomInput = document.getElementById("nom");
const prenomInput = document.getElementById("prenom");
const emailInput = document.getElementById("email");
const telInput = document.getElementById("telephone");

const inputs = [nomInput, prenomInput, emailInput, telInput];

// ======================
// URL du serveur
// ======================
const SERVER_URL = "http://localhost:3000/contacts";

// ======================
// Fonctions utilitaires
// ======================
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^(0[1-9])([ .-]?\d{2}){4}$/.test(phone);
}

function resetErrors() {
  [emailInput, telInput].forEach(input => input.classList.remove("error"));
  emailInput.placeholder = "Email";
  telInput.placeholder = "Téléphone";
}

function toggleValidateButton() {
  const allFilled = inputs.every(input => input.value.trim() !== "");
  validateBtn.disabled = !allFilled;
}

function addContactToTable(contact) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${contact.nom}</td>
    <td>${contact.prenom}</td>
    <td>${contact.email}</td>
    <td>${contact.telephone}</td>
  `;
  tableBody.appendChild(row);
}

// ======================
// Ouverture / fermeture modale
// ======================
openModalBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModalBtn.addEventListener("click", () => {
  closeModal();
});

function closeModal() {
  resetErrors();
  inputs.forEach(input => input.value = "");
  validateBtn.disabled = true;
  modal.style.display = "none";
}

// ======================
// Activation bouton Valider
// ======================
inputs.forEach(input => input.addEventListener("input", toggleValidateButton));

// ======================
// Lecture contacts au chargement
// ======================
window.addEventListener("load", () => {
  fetch(SERVER_URL)
    .then(res => res.json())
    .then(data => {
      data.forEach(contact => addContactToTable(contact));
    })
    .catch(err => console.error("Erreur fetch contacts:", err));
});

// ======================
// Ajouter un contact
// ======================
validateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  resetErrors();

  const nom = nomInput.value.trim();
  const prenom = prenomInput.value.trim();
  const email = emailInput.value.trim();
  const tel = telInput.value.trim();

  let hasError = false;

  if (!isValidEmail(email)) {
    emailInput.value = "";
    emailInput.placeholder = "Email invalide";
    emailInput.classList.add("error");
    hasError = true;
  }

  if (!isValidPhone(tel)) {
    telInput.value = "";
    telInput.placeholder = "Téléphone invalide";
    telInput.classList.add("error");
    hasError = true;
  }

  if (hasError) return;

  const newContact = { nom, prenom, email, telephone: tel };

  fetch(SERVER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newContact)
  })
  .then(res => res.json())
  .then(contact => {
    addContactToTable(contact);
    closeModal();
  })
  .catch(err => console.error("Erreur ajout contact:", err));
});

