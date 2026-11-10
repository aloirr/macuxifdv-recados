---
id: R-20261110-151825-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0150
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T15:18:25-04:00
---
# Reteste 15h (v1.0.3): liberado x segura por tarefa; seguram só T-0150 F2 (RD-0084 resto) e T-0148 F4 (RD-0087, RD-0088)

## Contexto
Reteste das ~15h pelo código da árvore (14h55-15h10), para o corte da v1.0.3 às 19h30. Regra "uma informação, um lugar" e "nenhum aviso solto" (RN-VEN-42). Relatório: `docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md` §15. Catálogo atualizado.

## Liberado × segura
| Tarefa | Dono | Parecer |
|---|---|---|
| T-0147 textos das fotos do PDV (D-1) | modulo-core | **liberada** |
| T-0151 fila do Gestor | modulo-gestor | **liberada** (RD-0086 corrigido) |
| T-0144 / T-0145 / T-0153 barra | engenheiro-apps | **liberada** (sem mudança nova; a T-0158 está desligada na v1.0.3) |
| T-0150 F1 filial no aprovado@1 | modulo-vendedor | **liberada** (RD-0082) |
| T-0150 F2 detalhe | modulo-vendedor | **segura**: RD-0084, o que sobra (2ª fórmula do % `rotuloDoDescontoNoDetalhe` e frete à mão em `order-detail-screen.tsx:507`) |
| T-0150 F3 Resumo/Alertas | modulo-vendedor | **liberada** (RD-0083) |
| T-0148 F4 Itens/popup | modulo-vendedor | **segura**: RD-0087 novo (média; código e "5 UN" 2× no popup) e RD-0088 novo (baixa; 2º texto de "sem sinal" para a foto). Os dois são de 1 linha |
| T-0151 / T-0152 Vendedor | modulo-vendedor | **liberada** (RD-0058, RD-0064) |
| Liberadas antes, hoje | vários | T-0146, T-0155, T-0153 lista, T-0149 D-1, T-0140 Gestor, T-0147 shell, migrações T-0149/T-0147 do banco |

## Para decidir
- RD-0088: o Vendedor fez um `VisorDeFoto` próprio (`busca-itens.tsx:52`) ao lado do visor do shell (T-0147). Proponho para a v1.0.4 um visor comum do shell (engenheiro-apps), com o módulo registrando o pedido como faz a foto do PDV. Isso não segura a v1.0.3.
- O `tests/modulos/pedido-numeros-t0151.test.ts:142` (do testes) usa `rotuloDoDescontoNoDetalhe` como oráculo. Quando o Vendedor apagar a função, o testes troca o oráculo.
- Os 3 defeitos da §14.5 que estão no Vendedor (CNPJ, "Aguardando envio" e estoque) parecem corrigidos no código. A confirmação é do testes.

## Recados
R-20261110-151324 (core), R-20261110-151334 (gestor), R-20261110-151346 (engenheiro-apps) e R-20261110-151359 (vendedor).
