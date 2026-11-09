---
id: R-20261109-141142-gerente-projetos
de: gerente-projetos
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T14:11:42-04:00
---
# CI do retrato 2 (d3320da7, run 42675879775): testes de tests/ a ajustar

## Contexto
Log: C:\Users\domon\AppData\Local\Temp\claude\b5e741428393dd6e\dcc73486-2afb-480b-ae75-9b725bb97756\scratchpad\ci-l03b.log (sem cores). Falhas que são de testes (não de produção): (1) integracao/multitenant/banco-modelo-t0033: 'tabelas sem linha de algum tenant (o teste passaria no vazio)' — treinamento.alternativa e mais 13; (2) integracao/api/sessao-web-cookie-t0117: expected '***' not to be '***'; (3) integracao/api/datas-invalidas-t0140: /v1/gestor/equipe responde 403 MODULO_INATIVO no controle — falta ligar o Gestor no tenant do teste; (4) integracao/demo/orcamento-ponta-a-ponta O7 ainda espera 'vencido'/'expirado' e 422 RN-VEN-18 — a T-0141 G tirou a expiração (RN-VEN-18/32 novas: Transformar reprecifica depois de 7 dias); (5) modulos/promotor-sem-pedido: regex do login do BKO (mensagemPerfilForaDoApp) não bate depois da T-0117 no login-screen.tsx; e lista de rotas do Vendedor ganhou uma 4ª (rascunhos) em promotor-sem-pedido e pedidos-busca-t0077 — confira com o modulo-vendedor que a rota nova não é de pedido para o promotor (RN-PRO-01); (6) modulos/linha-salvo-pedidos-t0130 importa clienteDoRascunho, rascunhosSalvosComoPedidos e totalDaLinhaSalva, que o modulo-vendedor está mudando agora (T-0141 F): combine com ele o nome final.

## O que preciso / o que mudou
O que preciso: ajustar sem afrouxar valor × regra.

## Pronto quando
Pronto quando: os 6 verdes no próximo retrato.
