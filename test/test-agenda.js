import { test } from "node:test";
import assert from "node:assert/strict"
import { temSobreposicao, services } from "../src/regras/sobreposicao.js";

test('recusa horarios sobrepostos', () => {
    const marcados = [
        {serviceId: 4, serviceName: "Coloração", dia: "Seg", horario: "09:00"}
    ];
    const novo = {serviceId: 2, serviceName: "Escova", dia: "Seg", horario: "10:00"};

    assert.equal(temSobreposicao(novo, marcados, services), true);
})

test('recusa horarios iniciados na mesma hora', () => {
    const marcados = [
        {serviceId: 3, serviceName: "Manicure", dia: "Ter", horario: "09:00"},
    ];
    const novo = {serviceId: 1, serviceName: "Corte", dia: "Ter", horario: "09:00"};

    assert.equal(temSobreposicao(novo, marcados, services), true);
})

test('recusa horario novo apos antigo', () => {
    const marcados = [
        {serviceId: 1, serviceName: "Corte", dia: "Qua", horario: "14:00"},
    ];
    const novo = {serviceId: 4, serviceName: "Coloração", dia: "Qua", horario: "14:30"};

    assert.equal(temSobreposicao(novo, marcados, services), true);
})

test('recusa horarios ultrapassando limite de hora', () => {
    const marcados = [
        {serviceId: 4, serviceName: "Coloração", dia: "Seg", horario: "16:30"},
    ];
    const novo = {serviceId: 3, serviceName: "Manicure", dia: "Seg", horario: "17:00"};

    assert.equal(temSobreposicao(novo, marcados, services), true);
})

test('recusa horario sobrepondo outros dois', () => {
    const marcados = [
        {serviceId: 2, serviceName: "Escova", dia: "Sex", horario: "16:30"},
        {serviceId: 2, serviceName: "Escova", dia: "Sex", horario: "17:00"}
    ];
    const novo = {serviceId: 4, serviceName: "Coloração", dia: "Sex", horario: "16:00"};

    assert.equal(temSobreposicao(novo, marcados, services), true);
})

test('aceita horarios colados', () => {
    const marcados = [
        {serviceId: 1, serviceName: "Corte", dia: "Qui", horario: "16:00"}
    ];
    const novo = {serviceId: 3, serviceName: "Manicure", dia: "Qui", horario: "15:30"};

    assert.equal(temSobreposicao(novo, marcados, services), false);
})

test('aceita horario entre outros dois', () => {
    const marcados = [
        {serviceId: 3, serviceName: "Manicure", dia: "Ter", horario: "09:30"},
        {serviceId: 4, serviceName: "Coloração", dia: "Ter", horario: "11:00"}
    ];
    const novo = {serviceId: 1, serviceName: "Corte", dia: "Ter", horario: "10:00"};

    assert.equal(temSobreposicao(novo, marcados, services), false);
})

test('aceita horarios se sobrepondo mas em dias diferentes', () => {
    const marcados = [
        {serviceId: 2, serviceName: "Escova", dia: "Qua", horario: "15:30"},
    ];
    const novo = {serviceId: 1, serviceName: "Corte", dia: "Seg", horario: "15:00"};

    assert.equal(temSobreposicao(novo, marcados, services), false);
})
