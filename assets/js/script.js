const services = [
        { id: 1, name: "Corte", duration: "1h", price: "R$ 50" },
        { id: 2, name: "Escova", duration: "30 min", price: "R$ 35" },
        { id: 3, name: "Manicure", duration: "30 min", price: "R$ 25" },
        { id: 4, name: "Coloração", duration: "1h30", price: "R$ 120" }
];

const agendaListDays = document.getElementById("agenda__list-days");
const agendaDays = document.querySelectorAll(".agenda__day");
const agendaListHours = document.getElementById("agenda__list-hours");

function loadServices() {
    const container = document.getElementById("services__list");
    container.innerHTML = "";

    services.forEach(service => {
        const card = document.createElement("div");
        card.className = "services__card";
        card.innerHTML = `
            <h3>${service.name}</h3>
            <div class="services__card-details">
                <span>⏱️ Duração: ${service.duration}</span> | 
                <span>💰 Preço: ${service.price}</span>
            </div>
        `;

        card.onclick = () => {
            agendaListDays.style.opacity = "1";
        }

        container.appendChild(card);
    });
}

agendaDays.forEach(day => {
    day.onclick = () => {
        agendaListHours.style.opacity = "1";
    }
})

// Executa ao abrir o sistema para cumprir o critério de aceitação do RF01[cite: 8]
window.onload = loadServices;
