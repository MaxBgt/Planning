// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Your web app's Firebase configuration
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

// Function to save data to Firestore
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

// Function to load data from Firestore
async function loadData(key) {
  const q = query(collection(db, "taches"), where("key", "==", key));
  const querySnapshot = await getDocs(q);
  let value = null;
  querySnapshot.forEach((doc) => {
    value = doc.data().value;
  });
  return value;
}

// Function to load the initial state of cells from Firestore
async function loadInitialState() {
  const q = query(collection(db, "taches"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const key = data.key;
    const value = data.value;

    const select = document.getElementById(key);
    if (select) {
      const cell = select.parentElement;
      const p = cell.querySelector('p');

      select.value = value;
      select.style.display = 'none';
      p.textContent = value;
      p.style.display = 'block';
      cell.style.backgroundColor = '#32CD32';
    }
  });
}

// Your existing code to handle change and validation events
const selects = document.querySelectorAll('select');

selects.forEach(select => {
  select.addEventListener('change', function() {
    const p = document.getElementById(`${this.id}-text`);
    const validateBtn = this.nextElementSibling.nextElementSibling;
    const cancelBtn = validateBtn.nextElementSibling;

    p.textContent = this.options[this.selectedIndex].text;

    this.style.display = 'none';
    p.style.display = 'inline';
    validateBtn.style.display = 'inline';
    cancelBtn.style.display = 'inline';
  });
});

document.querySelectorAll('.cancel').forEach(btn => {
  btn.addEventListener('click', function() {
    const select = this.previousElementSibling.previousElementSibling.previousElementSibling;
    const p = select.nextElementSibling;

    select.style.display = 'inline';
    select.selectedIndex = 0; 
    p.style.display = 'none';
    this.style.display = 'none';
    this.previousElementSibling.style.display = 'none';
    this.parentElement.style.backgroundColor = '';
  });
});

document.querySelectorAll('.validate').forEach(btn => {
  btn.addEventListener('click', async function() {
    const td = this.parentElement;
    const cell = this.parentElement;
    const select = cell.querySelector('select');
    const selectedValue = select.value;
    const key = select.id;

    await saveData(key, selectedValue);

    cell.style.backgroundColor = 'green';
    select.style.display = 'none';
    const p = cell.querySelector('p');
    p.textContent = selectedValue;
    p.style.display = 'block';
    td.style.backgroundColor = '#32CD32';

    this.style.display = 'none';
    this.nextElementSibling.style.display = 'none';
  });
});

function isSunday() {
  const today = new Date();
  return today.getDay() === 0;
}

async function clearSundayTasks() {
  if (isSunday()) {
    const q = query(collection(db, "taches"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      const data = doc.data();
      const key = data.key;

      // Supprimer de Firestore
      await deleteDoc(doc(db, "taches", doc.id));

      // Réinitialiser le DOM
      const select = document.getElementById(key);
      if (select) {
        const cell = select.parentElement;
        cell.style.backgroundColor = '';  // Réinitialiser le fond
        const p = cell.querySelector('p');
        p.style.display = 'none';  // Cacher le texte
        p.textContent = '';  // Réinitialiser le texte
        select.style.display = 'block';  // Afficher le select
        select.selectedIndex = 0;  // Réinitialiser le select
      }
    });
  }
}


setInterval(clearSundayTasks, 60 * 1000);

window.addEventListener('DOMContentLoaded', (event) => {
  loadInitialState();
});

  

