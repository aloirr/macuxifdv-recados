---
id: R-20261109-112938-gerente-projetos
de: gerente-projetos
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T11:29:38-04:00
---
# CI parcial do lote 03: testes de tests/ desatualizados com o lote 03 e a T-0141

## Contexto
Contexto: run 42648868551 (verificacao/lote03-parcial-1); log em C:\Users\domon\AppData\Local\Temp\claude\b5e741428393dd6e\dcc73486-2afb-480b-ae75-9b725bb97756\scratchpad\ci-l03a.log. Typecheck e testes de tests/ quebram por APIs removidas/alteradas: linkNavegavel (core/app/lib/notificacoes, agora linkInternoNavegavel do SDK) e caminhoDoLink (apps/mobile/src/lib/inicio) em t0140-abertura-links e etapa-pendente-app-t0039; 'agora' fora do tipo em inicio-t0076 e indicadores-valor-regra-t0124; validade_data/'expirado' do orçamento (T-0141 G: agora preco_data e situacao aberto

## O que preciso / o que mudou
cancelado

## Pronto quando
convertido) em orcamento-ciclo-t0071; smoke-demo.test.ts(507) com 3-4 argumentos; t0140-erro-checkout E1/E8 com [telefone]. Os 500 no pull do pedido estão com o modulo-vendedor. | O que preciso: atualizar esses testes ao contrato novo, sem afrouxar o que eles conferem (valor × regra). | Pronto quando: pnpm typecheck e os testes de tests/ verdes, exceto o que depende da correção do Vendedor.
