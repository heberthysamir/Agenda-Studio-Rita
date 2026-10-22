# Agenda Studio Rita

## Sobre o Projeto:  
Sistema web que busca desenvolver uma agenda online do "Studio Rita", parte do processo de Trainee da Empresa Júnior: **calang.io**. O programa permite o cliente escolher o serviço e agendar em um horário do dia selecionado. A empresa tem acesso aos agendamentos realizados ordenados por ordem, podendo cancelar e liberar um horário.

## Tecnologias Utilizadas

O projeto foi construído seguindo as seguintes tecnologias exigidas na especificação:
* **HTML** (Estruturação semântica)
* **CSS** (Estilização customizada e layout flexível)
* **JavaScript (Vanilla / ES6 Modules)** (Lógica da aplicação e manipulação do DOM)
* **LocalStorage** (Persistência local dos agendamentos)
* **Node.js (`node --test`)** (Testes automatizados para as funções)

## Requisitos aplicados:
- RF01: Cliente vê os serviços com duração e preço Obrigatório
- RF02: Cliente vê os horários livres do dia para o serviço Obrigatório
- RF03: Cliente agenda com nome e telefone Obrigatório
- RF04: Sistema nunca aceita atendimentos sobrepostos Obrigatório
- RF05: Rita vê a agenda do dia em ordem de horário Obrigatório
- RF06: Rita cancela um agendamento Obrigatório

## Critérios de cada requisito (regras de negócio):
- RF01 Ao abrir o sistema, os 4 serviços aparecem com nome, duração e preço
- RF02 Com um corte às 10:00, a escova não oferece 10:00 nem 10:30 no mesmo dia
- RF02 Domingo não tem horários; nenhum serviço termina depois das 18:00
- RF03 Sem nome ou telefone, o agendamento não é salvo e a cliente vê o motivo
- RF04 A regra de conflito é uma função pura em src/regras/, com testes
- RF05 O painel lista o dia em ordem de horário, com nome, telefone e serviço
- RF06 Depois de cancelar, o horário volta a aparecer como livre
- Critério geral: Os dados continuam lá depois de recarregar a página

## Como Executar o Projeto:
- Certifique-se de ter o VS Code instalado.
- Abra o projeto no servidor local
- Execute o arquivo "index.html"

## Estrutura do projeto:
```text
agenda-studio-rita/
├── assets/
│   ├── css/
│   │   └── style.css
│   └── imgs/
├── src/
│   └── regras/
│       └── agenda.js
│       └── sobreposicao.js
├── test/
│   └── agenda.test.js
├── DECISOES.md
├── index.html
└── README.md
```
## Equipe:
- Heberthy Samir Oliveira Furtado de Souza
- André Lucas de Souza Lima
- Emanuel Mendes de Sousa Silva
