---
id: R-20261104-195455-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0077
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T19:54:55-04:00
---
# T-0076 ajuste A faturar + T-0077 busca e período (Campo)

PRONTO: (1) T-0076: A faturar = pedido pending_approval/approved/sent_to_erp/integrated, fora faturado, cancelado, rejeitado, orçamento e na fila (domain/resumo-inicio.ts + testes; mesma regra no ?filtro=a_faturar). (2) T-0077 domain: busca-periodo.ts com 19 testes (busca sem acento/zeros, período Dia/Mês/Ano no fuso, emitido OU mudou de status, 31/10->02/11, busca ignora período, contagem por situação, periodoForaDaJanela). Tela orders-screen.tsx pela referência (busca com destaque e razão social, SeletorDePeriodo com calendário e marcas, chips em uma linha, resumo, 'Disponível com conexão' fora dos 90 dias sem sinal); export em contracts; recado R-20261104-195207 ao modulo-gestor para o filtro de vendedor. Testes: vitest modules/vendedor/domain+app 36 arquivos/512 verdes; eslint e tsc (3 tsconfigs) verdes; CRLF->LF. FALTA: consulta ao servidor fora da janela (item 6, depois do APK; a rota de listagem não foi verificada); revisão de UX/técnica e teste em aparelho do calendário; não tratei o bug do número duplicado (banco-dados) nem order-detail-screen.tsx.
