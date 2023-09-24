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

    // Changez le fond en vert
    td.style.backgroundColor = '#32CD32';


    // Cachez les boutons
    this.style.display = 'none';
    this.nextElementSibling.style.display = 'none';
  });
});
