const services = [
    { id: 1, name: "Corte", duration: "1h", price: "R$ 50" },
    { id: 2, name: "Escova", duration: "30 min", price: "R$ 35" },
    { id: 3, name: "Manicure", duration: "30 min", price: "R$ 25" },
    { id: 4, name: "Coloração", duration: "1h30", price: "R$ 120" }
];

const agendaListDays = document.getElementById("agenda__list-days");
const agendaDays = document.querySelectorAll(".agenda__day");
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

function horarioParaMinutos(horarioStr) {
    if (!horarioStr) return 0;
    const [horas, minutos] = horarioStr.split(":").map(Number);
    return horas * 60 + minutos;
}

function duracaoParaMinutos(duracaoStr) {
    if (!duracaoStr) return 0;
    
    let totalMinutos = 0;

    if (duracaoStr.includes("h")) {
        const partes = duracaoStr.split("h");
        totalMinutos += parseInt(partes[0], 10) * 60;
        if (partes[1] && partes[1].trim() !== "") {
            totalMinutos += parseInt(partes[1], 10);
        }
    } else if (duracaoStr.includes("min")) {
        totalMinutos += parseInt(duracaoStr.replace("min", "").trim(), 10);
    }

    return totalMinutos;
}

function temSobreposicao(novoAgendamento, agendamentosSalvos, listaServicos) {
    const servicoNovo = listaServicos.find(s => s.id === novoAgendamento.serviceId);
    if (!servicoNovo) return false;

    const inicioNovo = horarioParaMinutos(novoAgendamento.horario);
    const duracaoNova = duracaoParaMinutos(servicoNovo.duration);
    const fimNovo = inicioNovo + duracaoNova;

    const agendamentosMesmoDia = agendamentosSalvos.filter(a => a.dia === novoAgendamento.dia);

    for (let agendamento of agendamentosMesmoDia) {
        const servicoExistente = listaServicos.find(s => s.id === agendamento.serviceId);
        if (!servicoExistente) continue;

        const inicioExistente = horarioParaMinutos(agendamento.horario);
        const duracaoExistente = duracaoParaMinutos(servicoExistente.duration);
        const fimExistente = inicioExistente + duracaoExistente;

        if (inicioNovo < fimExistente && fimNovo > inicioExistente) {
            return true;
        }
    }

    return false;
}

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

    if (temSobreposicao(agendamentoAtual, agendamentosSalvos, services)) {
        alert(`O horário das ${agendamentoAtual.horario} para ${agendamentoAtual.dia} possui sobreposição com outro agendamento.`);
        return;
    }

    agendamentosSalvos.push(agendamentoAtual);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentosSalvos));

    alert(`Agendamento de ${agendamentoAtual.serviceName} para ${agendamentoAtual.dia} às ${agendamentoAtual.horario} confirmado.`);

    formCliente.reset();
    agendaListDays.classList.remove("ativa");
    agendaListHours.classList.remove("ativa");
    agendaListClient.classList.remove("ativa");
};

window.onload = loadServices;

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        horarioParaMinutos,
        duracaoParaMinutos,
        temSobreposicao,
        ordenarAgendamentos
    };
}
const ordemDias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function ordenarAgendamentos(agendamentosSalvos) {
    return agendamentosSalvos.map((agendamento, index) => ({ agendamento, index })).sort((a, b) => {
        const diferencaDia = ordemDias.indexOf(a.agendamento.dia) - ordemDias.indexOf(b.agendamento.dia);
        if (diferencaDia !== 0) return diferencaDia;
        return horarioParaMinutos(a.agendamento.horario) - horarioParaMinutos(b.agendamento.horario);
    });
}

function carregarPainelDaRita() {
    const containerPainel = document.getElementById("painel-rita-agendamentos");
    if (!containerPainel) return; 
    const agendamentosSalvos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    containerPainel.innerHTML = "";

    if (agendamentosSalvos.length === 0) {
        containerPainel.innerHTML = "<p>Nenhum agendamento registrado até o momento.</p>";
        return;
    }

    const agendamentosOrdenados = ordenarAgendamentos(agendamentosSalvos);

    agendamentosOrdenados.forEach(({ agendamento, index }) => {
        const cardAgendamento = document.createElement("div");
        cardAgendamento.className = "painel__card-agendamento";
        
        cardAgendamento.innerHTML = `
            <h3>${agendamento.serviceName}</h3>
            <p><strong>Cliente:</strong> ${agendamento.nomeCliente}</p>
            <p><strong>Telefone:</strong> ${agendamento.telefoneCliente}</p>
            <p><strong>Dia:</strong> ${agendamento.dia}</p>
            <p><strong>Horário:</strong> ${agendamento.horario}</p>
            <button class="btn-remover" data-index="${index}">Remover Agendamento</button>
        `;
        containerPainel.appendChild(cardAgendamento);
    });

    const botoesRemover = containerPainel.querySelectorAll(".btn-remover");
    botoesRemover.forEach(botao => {
        botao.onclick = (e) => {
            const indexParaRemover = e.target.getAttribute("data-index");
            removerAgendamento(indexParaRemover);
        };
    });
}

function removerAgendamento(index) {
    let agendamentosSalvos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    agendamentosSalvos.splice(index, 1);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentosSalvos));
    carregarPainelDaRita();
}

window.addEventListener("DOMContentLoaded", () => {
    loadServices();
    carregarPainelDaRita();
});