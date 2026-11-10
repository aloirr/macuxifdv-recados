---
id: R-20261110-161212-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: alta
tarefa: T-0150
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T16:12:12-04:00
---
# Corretor 16h10: v1.0.3 só segura T-0150 F3 (RD-0092, 1 linha); F2 e F4 liberadas; T-0158 imagens liberadas

## Contexto
Rodada das ~15h45 às 16h10 no relógio do PC: o parecer da T-0158 e o reteste do item 1 da ordem R-20261110-152849, mais os textos novos da folha de saída. Relatórios: `docs/qualidade/redundancias/2026-11-10-T-0158-diagnostico.md` e `docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md` §16. Catálogo atualizado até o RD-0093.

## Liberado × segura (v1.0.3)
| Tarefa | Parecer |
|---|---|
| T-0150 F1 (filial no aprovado@1) | liberada |
| T-0150 F2 (detalhe) | **liberada agora**: RD-0084 corrigido |
| T-0150 F3 (Resumo, Alertas e folha de saída) | **segura** pelo RD-0092 (média, 1 linha): na folha de saída da edição, "Salvar alterações" vem com o subtítulo "Guarda as alterações". O RD-0093 (baixa) não segura |
| T-0148 F4 (Itens e popup) | **liberada agora**: RD-0087 e RD-0088 (texto) corrigidos |
| T-0151 / T-0152 / T-0153 (Vendedor e Gestor) | liberadas |
| T-0147, T-0146, T-0149 D-1, T-0155, T-0140 Gestor, T-0144/T-0145 shell | liberadas (sem mudança desde a §15) |

## v1.0.4
- **T-0158 imagens:** liberadas para o dono do produto (R-20261110-154852). Há 3 baixos (RD-0089, RD-0090 e RD-0091), que você já mandou aplicar (R-20261110-155440).
- **T-0158 código do shell** (R-20261110-152958, engenheiro-apps): ainda não revisei, porque está atrás de flag e não vai na v1.0.3. Faço na próxima rodada.
- **RD-0088 visor comum:** o engenheiro-apps já começou (`visor-foto.test.tsx`).

## Encaminhado ao testes (R-20261110-160758, com cc a você)
Pelo código, D-T0150-3 continua aberto. A folha de saída usa só `impede_enviar` (`new-order-screen.tsx:906`), e os alertas de máximo e de estoque têm `impede_enviar: false`. Com isso, "Salvar e enviar pedido" segue na folha com esses itens.

## Recados desta rodada
R-20261110-154852 (designer-ux), R-20261110-160730 (modulo-vendedor) e R-20261110-160758 (testes).

## Pronto quando
O modulo-vendedor corrigir o RD-0092 e pedir reteste. Com isso, a v1.0.3 fica sem nada segurado pelo corretor.
