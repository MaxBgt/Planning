// Sélectionnez tous les éléments <select> dans le tableau
const selects = document.querySelectorAll('select');

// Ajoutez un écouteur d'événements à chaque élément <select>
selects.forEach(select => {
  select.addEventListener('change', function() {
    // Trouvez les éléments associés
    const p = document.getElementById(`${this.id}-text`);
    const validateBtn = this.nextElementSibling.nextElementSibling;
    const cancelBtn = validateBtn.nextElementSibling;

    // Mettez à jour le contenu de l'élément <p>
    p.textContent = this.options[this.selectedIndex].text;

    // Cachez l'élément <select> et affichez les boutons et le <p>
    this.style.display = 'none';
    p.style.display = 'inline';
    validateBtn.style.display = 'inline';
    cancelBtn.style.display = 'inline';
  });
});

// Ajoutez des écouteurs pour les boutons "Annuler" et "Valider"
document.querySelectorAll('.cancel').forEach(btn => {
  btn.addEventListener('click', function() {
    const select = this.previousElementSibling.previousElementSibling.previousElementSibling;
    const p = select.nextElementSibling;

    // Réinitialisez l'élément <select> et cachez le <p> et les boutons
    select.style.display = 'inline';
    select.selectedIndex = 0; 
    p.style.display = 'none';
    this.style.display = 'none';
    this.previousElementSibling.style.display = 'none';
    this.parentElement.style.backgroundColor = '';
  });
});

document.querySelectorAll('.validate').forEach(btn => {
  btn.addEventListener('click', function() {
    const td = this.parentElement;
    const cell = this.parentElement;
    const select = cell.querySelector('select');
    const selectedValue = select.value;
    const key = select.id;

    // Sauvegarder la valeur dans localStorage
    saveData(key, selectedValue);

    // Changer le fond en vert
    cell.style.backgroundColor = 'green';

    // Cacher le select et afficher le texte
    select.style.display = 'none';
    const p = cell.querySelector('p');
    p.textContent = selectedValue;
    p.style.display = 'block';

    // Changez le fond en vert
    td.style.backgroundColor = '#32CD32';


    // Cachez les boutons
    this.style.display = 'none';
    this.nextElementSibling.style.display = 'none';
  });
});

const saveData = (key, value) => {
    const expirationDate = new Date().getTime() + (10 * 1000)
    const data = {value, expirationDate}
    localStorage.setItem(key, JSON.stringify(data))
}

const loadData = (key) => {
    const data = JSON.parse(localStorage.getItem(key))
    if(!data) return null;

    const now = new Date().getTime();
    if(now > data.expirationDate) {
        localStorage.removeItem(key);
        return null;
    }
    return data.value
}

  // Fonction pour charger l'état initial des cellules à partir de localStorage

function loadInitialState() {
    document.querySelectorAll('select').forEach(select => {
      const key = select.id;
      const cell = select.parentElement;
      const p = cell.querySelector('p');
  
      const value = loadData(key);  // loadData est votre fonction pour récupérer des données de localStorage
      if (value !== null) {
        // Les données existent et n'ont pas expiré
        select.value = value;
        select.style.display = 'none';
        p.textContent = value;
        p.style.display = 'block';
        cell.style.backgroundColor = '#32CD32';
      }
    });
  }
  
  // Charger l'état initial lorsque la page est chargée
  window.addEventListener('DOMContentLoaded', (event) => {
    loadInitialState();
  });
  
  


// Fonction pour vérifier si aujourd'hui est dimanche
const nextSunday = new Date();
nextSunday.setDate(nextSunday.getDate() + (7 - nextSunday.getDay()));
function isAfterNextSunday() {
    const today = new Date();
    return today >= nextSunday;
  }
function isSunday() {
    const today = new Date();
    return today.getDay() === 0;  // 0 correspond à dimanche
  }
  
  // Fonction pour vider les données du dimanche
  function clearSundayTasks() {
    if (isSunday()&& isAfterNextSunday()) {
      document.querySelectorAll('[name*="dimanche"]').forEach(select => {
        const key = select.id;
        localStorage.removeItem(key);  // Supprimer de localStorage
        select.value = '';  // Réinitialiser le select
        const cell = select.parentElement;
        cell.style.backgroundColor = '';  // Réinitialiser le fond
        const p = cell.querySelector('p');
        p.style.display = 'none';  // Cacher le texte
        p.textContent = '';  // Réinitialiser le texte
        select.style.display = 'block';  // Afficher le select
      });
    }
  }
  
  // Vérifier toutes les minutes
  setInterval(clearSundayTasks, 60 * 1000);


