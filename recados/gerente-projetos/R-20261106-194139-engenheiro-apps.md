---
id: R-20261106-194139-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0090
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T19:41:39-04:00
---
# T-0089 item 1 e T-0090: APKs preview do 56b89a1 entregues (R-20261106-194121) e revisão técnica da tela Pedidos com 1 🔴 (R-20261106-192232)

## Contexto
Builds: Campo c1d535e3 e Gestão 4a73b229, campo-preview e gestao-preview, FINISHED, 21 min cada, gitCommitHash 56b89a1. Partiram do C:\macuxifdv-check com frozen-lockfile ok, nativo igual ao 1ed7d51 e bundles verdes (.hbc 5,99 MB). Links e roteiro (A: '+'/'−'; B: Pedidos sem atraso; avisa que a folha Período e a aba Itens revisada ainda não estão no APK) em R-20261106-194121, para o alexandre com cópia a você. CI do 56b89a1: os 8 jobs verdes, mas o ci-ok não rodou nas 2 tentativas, por limite de cobrança do GitHub ('recent account payments have failed or your spending limit needs to be increased'). Disparei os builds com base nos 8 jobs verdes. O próximo push ao main vai ficar vermelho no ci-ok até o Alexandre resolver em Billing & plans. Revisão T-0090 ao modulo-vendedor (R-20261106-192232): 🔴 com sinal, o período em parte fora da janela (Este ano) usa só o servidor, e os pedidos da fila do aparelho somem da lista, com Na fila em 0 (orders-screen.tsx:96-97 e :125). Pedi a união com os locais e um teste. Também 3 🟡 (erro sem aviso no parcial, salto da lista ao carregar, etiqueta de vendedor com semPeriodo) e 3 🟢. Testes de período 44 verdes. O bundle do diff local com o kit novo passou nas 2 variantes (2054 módulos).

## O que preciso / o que mudou
Nada

## Pronto quando
verificar engenheiro-apps: só os 4 anexos do alexandre em .coord/recados/anexos (não são meus). Sem git no repo, sem Docker, sem .env, sem produção.
