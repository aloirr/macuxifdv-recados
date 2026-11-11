---
id: R-20261110-212844-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [testes]
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T21:28:44-04:00
---
# Índice das entregas do testes de hoje (estavam só na caixa do gerente); de agora em diante, com cópia para você

## Contexto
Você perguntou pelos recados do testes. Eles **existem e estão completos**, mas foram enviados só para a caixa do gerente (`recados/gerente-projetos/` no repositório de recados), e não para a sua (`recados/alexandre/`). Por isso o seu agente PO não os via. Para abrir qualquer um: `node scripts/coord.mjs ler <id>`.

A partir de agora, **toda entrega do testes vai com cópia para você** (R-20261110-212608).

## Entregas do testes em 10/11
| Recado | Tarefa | Resumo |
|---|---|---|
| R-20261110-084811-testes | T-0155 | Os e2e da demo não precisaram mudar; teste dos faturados (CI) cobre BKO, aparelho, contagens e meta |
| R-20261110-084844-testes | T-0151 | Números iguais em Novo pedido, Resumo, detalhe e PDF (5 itens, conta à mão); defeito do % na gaveta do BKO |
| R-20261110-085730-testes | T-0146 | D-1 da média/mês corrigido (RN-CORE-40), 13/13 verdes |
| R-20261110-111338-testes | T-0151 | D-1 virou `it`; frase única da recusa; 5 itens conferidos |
| R-20261110-112137-testes | T-0146 | Ficha verde; casos do RD-0075 |
| R-20261110-120213-testes | T-0149/T-0147 | Casos de filial e fotos entre módulos; defeito: vendedor abria tipo não sensível (decidido: só a fachada) |
| R-20261110-120225-testes | T-0149 | Conector 1.4.0: suíte completa verde (338) |
| R-20261110-120847-testes | T-0144/T-0145 | Testes do shell verdes |
| R-20261110-125927-testes | T-0147 | Fotos do PDV com `fachadaDoPdv`; D-1 virado |
| R-20261110-145320-testes | T-0150 | 3 defeitos das telas novas: 2 corrigidos, 1 aberto (CNPJ), 1 sem efeito |
| R-20261110-145346-testes | T-0147 | Textos das fotos alinhados ao D-1 |
| R-20261110-145757-testes | T-0150/T-0148 | Critérios das telas novas: 57 verdes; 3 defeitos de PDF e folha de saída abertos |
| R-20261110-152417-testes | T-0071/T-0077/T-0155 | Ensaio 2: 2 testes ajustados; devolução do p02 era defeito do código (corrigido depois) |
| R-20261110-153455-testes | T-0158 | Shell: 125/125 verdes |
| R-20261110-183408-testes | T-0155 e outros | 0058 na conformidade; folha de saída, unidade do PDF e CNPJ viraram `it`; devolução do p02 valendo |

**Em andamento agora:** critério da filial na demo (\"um cliente de cada filial\"), envio da foto do PDV e PDF com acréscimo.

## Pronto quando
Informativo.
