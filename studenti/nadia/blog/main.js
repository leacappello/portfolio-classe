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

    //ESPANDERE CARDS AL CLICK
    const cards = document.querySelectorAll('.card');

    // Rende attiva la card cliccata
    function activateCard(card) {
        cards.forEach(c => {
            if (c !== card) {
                c.classList.remove('active');
            }
        });

        // Toggle se già attiva
        card.classList.toggle('active');
    }

    // Clic su una card
    cards.forEach(card => {
        card.addEventListener('click', function (e) {
            e.stopPropagation(); // Evita che il click venga "preso" anche dal body
            activateCard(card);
        });
    });

    // Clic su qualunque punto della pagina (tranne le card)
    document.addEventListener('click', function () {
        cards.forEach(card => card.classList.remove('active'));
    });

    //valutazione stelle
    let currentRating = 0;
    const starContainer = document.getElementById("star-rating");
    const starElements = starContainer.querySelectorAll(".fa-star");
    const hiddenRatingInput = document.getElementById("selected-rating");

    // Assegna evento click alle stelle
    starElements.forEach((star, index) => {
        star.addEventListener("click", () => {
            currentRating = index + 1;
            updateStars(currentRating);
            hiddenRatingInput.value = currentRating;
        });
    });

    // Funzione per aggiornare la grafica delle stelle
    function updateStars(rating) {
        starElements.forEach((star, index) => {
            if (index < rating) {
                star.classList.add("checked");
            } else {
                star.classList.remove("checked");
            }
        });
    }


    //pubblicazione di una nuova recensione
    const form = document.getElementById("new-review");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        //prendo i valori dell'utente
        const rating = parseInt(hiddenRatingInput.value, 10);
        const titolo = document.getElementById("title").value.trim();
        const corpo = document.getElementById("article-body").value.trim();
        const poster = document.getElementById("poster");

        if (!titolo || rating === 0) {
            alert("Il titolo e la valutazione sono necessari.");
            return;
        }
        // Ottieni immagine selezionata
        const file = poster.files[0];
        let posterUrl = "";
        if (file) {
            posterUrl = URL.createObjectURL(file); // crea URL temporaneo per l'immagine
        }
        // Genera nuova card dinamica
        const nuovaCard = document.createElement("div");
        nuovaCard.classList.add("card");
        // Costruisco il contenuto HTML
        nuovaCard.innerHTML = `
            <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            <h3>${titolo}</h3>
            <img src="${posterUrl}" alt="Locandina di ${titolo}" />
            <p class="card-text">${corpo}</p>
            <div class="star-rating">
            ${generateStarHTML(rating)}
            </div>
        `;
        // Aggiungo in cima alla griglia
        const griglia = document.querySelector(".griglia");
        griglia.prepend(nuovaCard);
        abilitaEliminazioneCards();

        // Reset campi
        form.reset();
        updateStars(0); // reset stelle
    });

    function generateStarHTML(rating) {
        let html = "";
        for (let i = 1; i <= 5; i++) {
            html += `<span class="fa fa-star${i <= rating ? ' checked' : ''}"></span>`;
        }
        return html;
    }

    function abilitaEliminazioneCards() {
        const deleteButtons = document.querySelectorAll('.delete-btn');

        deleteButtons.forEach(btn => {
            btn.removeEventListener('click', handleDelete); // evita doppio bind
            btn.addEventListener('click', handleDelete);
        });

        function handleDelete(e) {
            e.stopPropagation();

            const conferma = confirm("Vuoi davvero eliminare questa recensione?");
            if (conferma) {
                const button = e.target.closest('.delete-btn');
                const card = button.closest('.card');
                if (card) {
                    card.remove();
                }
            }
        }
    }

    abilitaEliminazioneCards();
    //chiusura DOM
});