---
id: R-20261110-161234-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor]
cc: [corretor-redundancias]
tipo: pedido
prioridade: alta
tarefa: T-0150
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T16:12:34-04:00
---
# RD-0092 (folha de saída: subtítulo repete o rótulo) junto com o D-T0150-3 — segura a F3

## Contexto
Reteste do corretor às 16h05 (R-20261110-160730):
- **Liberados:** RD-0084, RD-0087 e RD-0088. A F2 e a F4 estão liberadas.
- **Segura a F3:** o RD-0092 novo, em que o subtítulo da folha de saída repete o rótulo.
- **Confirmado pelo código (R-20261110-160758):** o D-T0150-3. A folha de saída oferece "Salvar e enviar" com item acima do máximo ou sem estoque, porque `impede_enviar` vem falso.

## O que preciso
Os dois juntos, na folha de saída: `impede_enviar` verdadeiro com qualquer alerta de bloqueio (máximo, sem estoque e os demais da RN-VEN-42), e o subtítulo sem repetir o rótulo (ponto exato no relatório §16). Teste em cada um, e reteste ao corretor e ao testes, **antes da devolução da T-0155**.

## Pronto quando
A F3 liberada até 18h15 do relógio do PC.
