---
id: R-20261110-110653-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: alta
tarefa: T-0152
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T11:06:53-04:00
---
# v1.0.3: T-0146, T-0155, T-0149/T-0147 (banco) e imagens T-0150/T-0148 v2 liberadas; seguram T-0151 (RD-0058, 0064, 0076) e T-0144/T-0145/T-0153 (RD-0072, 0073, 0078)

## Fila da v1.0.3: retestes e pareceres de 10/11 (até ~11h30), regra "uma informação, um lugar" (RN-VEN-42)
Relatório: `docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md` §10 a §12. Catálogo: `docs/qualidade/redundancias/catalogo.md` (RD-0075 a RD-0078 novos).

| Tarefa | Dono | Parecer |
|---|---|---|
| T-0146 (ficha) | modulo-core | **liberada**: RD-0065 e RD-0075 (novo: "Cadastro incompleto" 2× na ficha) corrigidos (R-20261110-110301) |
| T-0155 | banco-dados | **liberada**: RD-0074 corrigido (R-20261110-110318) |
| T-0149/T-0147 (migrações, seed, views) | banco-dados | **liberadas**, sem RD (R-20261110-104408) |
| T-0150/T-0148 v2 (imagens) | designer-ux | **liberadas** (pontos a-d mantidos; R-20261110-104230) |
| T-0151 | modulo-vendedor | os RD dela corrigidos; **segura** pelos acrescentados hoje: RD-0058 alta (selo no topo do detalhe = última etapa do Histórico; alçada no cartão `order-approval`), RD-0064 (gaveta do BKO) e RD-0076 (faixas de sinal) (R-20261110-110448) |
| T-0153 (tela Pedidos, print do dono) | modulo-vendedor · designer-ux · engenheiro-apps | parecer ao dono (R-20261110-104610). RD-0068, RD-0077 e a faixa da fila corrigidos no código. Faltam RD-0078 (badge da aba, engenheiro-apps), RD-0076 (faixas de sinal: texto do designer-ux) e a imagem T-0153 (chips sem número; recusa com a frase do RD-0071) |
| T-0144 / T-0145 | engenheiro-apps | **seguram**: RD-0072 e RD-0073 sem mudança (R-20261110-101225, R-20261110-104329) |
| T-0149/T-0147 (telas do BKO e da ficha) | modulo-core | aguardando a entrega |

Observações:
- Ao testes (R-20261110-104441): o badge "2" da aba Pedidos conta itens da fila do módulo, e a faixa diz "1 pedido". Sem RD.
- O print do anexo do dono não abriu aqui: o guardião bloqueia baixar arquivo com o nome dele. O parecer saiu do código e da imagem T-0153.
- A frase única do RD-0071 passou a ser "AGU-1500 acima do desconto máximo" (exemplo da RN-VEN-42), já no código do Vendedor.

## Pronto quando
Reteste dos 3 pontos do Vendedor e dos 3 do engenheiro-apps quando chegarem; parecer da T-0149/T-0147 do Core quando a entrega chegar.
