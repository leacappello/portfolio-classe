document.addEventListener("DOMContentLoaded", function () {

 // Dark mode toggle
 // Selezionare il pulsante per attivare la dark mode
 const toggleBtn = document.getElementById("toggle-darkmode");

 // Se il bottone esiste, registra un evento click
 if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
     });
 }
 // Cambia colore della card
 const cambiaCardBtn = document.getElementById("cambia-card");
 const card1 = document.getElementById("progetto1");

 // Se entrambi gli elementi esistono, registra un click anche per questo bottone
 if (cambiaCardBtn && card1) {
    cambiaCardBtn.addEventListener("click", () => {
      card1.style.backgroundColor = "#cce7ff";
 });

 }

//Chiusura del blocco DOMContentLoaded
});