---
id: R-20261109-081828-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: T-0141
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T08:18:28-04:00
---
# Plano e previsão dos 4 recados de 09/11 (T-0141 Novo pedido v3, T-0142 Catálogo pela hierarquia)

## Contexto
Lidos e marcados: R-20261109-054659, -064818, -065241, -065415, -065619.

## O que preciso / o que mudou
Docs (feito 09/11 ~08h30): RN-VEN-17 endereço editável só no pedido; RN-VEN-18/32 orçamento e pedido sem expiração, preço congelado 7 dias e depois Transformar reprecifica e mostra a diferença, etiqueta 'preço de dd/mm'; RN-VEN-30 sem 'Vencido'; RN-VEN-38 nenhuma saída perde o pedido; novas RN-VEN-39 Rascunhos (24 h), RN-VEN-40 motivo da recusa em português, RN-VEN-41 nome do PDF ORC-/PED-XXXX-DDMMAAAA; RF-VEN-11 (sem botão Catálogo, crédito em tabela, sem frase do frete); RF-CAT-09 (hierarquia, 4 decisões).

## Pronto quando
Plano e previsão: (1) designer-ux, já em andamento: specs com imagem do crédito em tabela, Entrega sem frases, endereço editável, Itens sem Catálogo, Rascunhos, etiqueta e Catálogo pela hierarquia; previsão: imagens para você aprovar hoje de manhã. (2) modulo-vendedor, já em andamento, sem esperar a imagem: tirar Catálogo, defeito do Voltar que perde o pedido, sem expiração, causa da recusa de 05h50 (com recado explicando) e motivo real na tela, nome do PDF, regra dos rascunhos; previsão: hoje até o meio da tarde. (3) modulo-catalogo, já em andamento: hierarquia (função única app/BKO, 4 casos), causa dos níveis misturados (Freios/Filtros/Suspensão) e telas; previsão: hoje à tarde. (4) Depois da sua aprovação das imagens: crédito, Entrega, endereço editável (contrato do pedido e devolução ao ERP) e lista de Rascunhos; previsão: no mesmo dia da aprovação. (5) testes + corretor-redundancias + revisão do engenheiro, lote no CI e build Campo-Demo-v1.0.2 / Gestao-Demo-v1.0.2 com os 9 pontos; previsão: hoje à noite se a aprovação vier até o início da tarde. | Premissas: 'Apenas salvar' grava o mesmo rascunho de 24 h; rascunho só no aparelho; a pergunta 'Sair do pedido?' continua. | Pendência sua: cadastrar o agendador da sincronização (agendar-sincronizacao.ps1, sem -Repo); sem ele, este recado e as respostas dos agentes não sobem ao GitHub.
