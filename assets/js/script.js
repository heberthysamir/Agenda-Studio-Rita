const services = [
    { id: 1, name: "Corte", duration: "1h", price: "R$ 50" },
    { id: 2, name: "Escova", duration: "30 min", price: "R$ 35" },
    { id: 3, name: "Manicure", duration: "30 min", price: "R$ 25" },
    { id: 4, name: "Coloração", duration: "1h30", price: "R$ 120" }
];

const agendaListDays = document.getElementById("agenda__list-days");
const agendaDays = document.querySelectorAll(".agenda__day, .agenda__dom");
const agendaListHours = document.getElementById("agenda__list-hours");
const agendaListClient = document.getElementById("agenda__list-client");
const btnFecharAgenda = document.getElementById("btn-fechar-agenda");
const formCliente = document.getElementById("form-cliente");
const agendaHours = document.querySelectorAll(".agenda__hour");

let agendamentoAtual = {
    serviceId: null,
    serviceName: null,
    dia: null,
    horario: null
};

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
            agendamentoAtual.serviceId = service.id;
            agendamentoAtual.serviceName = service.name;
            agendaListDays.classList.add("ativa");
        }

        container.appendChild(card);
    });
}

agendaDays.forEach(day => {
    day.onclick = (e) => {
        agendamentoAtual.dia = e.target.getAttribute("data-dia") || e.target.innerText;
        agendaListHours.classList.add("ativa");
    }
});

agendaHours.forEach(hour => {
    hour.onclick = (e) => {
        agendamentoAtual.horario = e.target.innerText;
        agendaListClient.classList.add("ativa");
    }
});

if (btnFecharAgenda) {
    btnFecharAgenda.onclick = () => {
        agendaListDays.classList.remove("ativa");
        agendaListHours.classList.remove("ativa");
        agendaListClient.classList.remove("ativa");
    }
}

formCliente.onsubmit = (e) => {
    e.preventDefault();

    const nome = document.getElementById("input-nome").value.trim();
    const telefone = document.getElementById("input-telefone").value.trim();

    if (!nome || !telefone) {
        alert("Por favor, preencha o nome e o telefone.");
        return;
    }

    agendamentoAtual.nomeCliente = nome;
    agendamentoAtual.telefoneCliente = telefone;

    const agendamentosSalvos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    agendamentosSalvos.push(agendamentoAtual);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentosSalvos));

    alert(`Agendamento de ${agendamentoAtual.serviceName} para ${agendamentoAtual.dia} às ${agendamentoAtual.horario} confirmado.`);

    formCliente.reset();
    agendaListDays.classList.remove("ativa");
    agendaListHours.classList.remove("ativa");
    agendaListClient.classList.remove("ativa");
};

window.onload = loadServices;