export const services = [
    { id: 1, name: "Corte", duration: "1h", price: "R$ 50" },
    { id: 2, name: "Escova", duration: "30 min", price: "R$ 35" },
    { id: 3, name: "Manicure", duration: "30 min", price: "R$ 25" },
    { id: 4, name: "Coloração", duration: "1h30", price: "R$ 120" }
];

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

export function temSobreposicao(novoAgendamento, agendamentosSalvos, listaServicos) {
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

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        horarioParaMinutos,
        duracaoParaMinutos,
        temSobreposicao
    };
}