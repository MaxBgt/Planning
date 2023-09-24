
      // Import the functions you need from the SDKs you need
      import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
      import {
        getFirestore,
        collection,
        doc,
        addDoc,
      } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      const firebaseConfig = {
        apiKey: "AIzaSyBHf-fLr49rPoxm8s7n7m-fgZ4KbadwuIM",
        authDomain: "planning-menage.firebaseapp.com",
        databaseURL: "https://planning-menage-default-rtdb.firebaseio.com",
        projectId: "planning-menage",
        storageBucket: "planning-menage.appspot.com",
        messagingSenderId: "637158622727",
        appId: "1:637158622727:web:b856e03a6989b643258ca2",
        measurementId: "G-JWWNWZJLSD",
      };
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      //Firestore connection
      const database = getFirestore();
 


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

function getNextSunday() {
    const today = new Date();
    const nextSunday = new Date();
    nextSunday.setDate(today.getDate() + (7 - today.getDay()));
    return nextSunday;
  }

  async function saveData(key, value) {
    try {
      const docRef = await addDoc(collection(db, "taches"), {
        key: key,
        value: value
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function loadData(key) {
    const q = query(collection(db, "taches"), where("key", "==", key));
    const querySnapshot = await getDocs(q);
    let value = null;
    querySnapshot.forEach((doc) => {
      value = doc.data().value;
    });
    return value;
  }
  // Fonction pour charger l'état initial des cellules à partir de localStorage

  function loadInitialState() {
 
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
   
  }

  