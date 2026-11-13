---
id: R-20261113-105632-engenheiro-software
de: engenheiro-software
para: [testes]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0168
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T10:56:32-04:00
---
# M0 v1.0.5: typecheck:tests acusou limite-desconto-t0168.test.ts:369 (parece já corrigido); confirmar

## Contexto
Raio-x do M0 da v1.0.5 no PC (`pnpm typecheck`, que roda o `typecheck:tests`, árvore de 13/11 entre ~08h40 e 10h40):
- `tests/modulos/limite-desconto-t0168.test.ts(369,28)`: TS2339 `Property 'habilitado' does not exist on type 'BotoesDoResumo'`.

Na árvore atual, a linha 369 já está assim: `expect(a.transformar.transformar).toMatchObject({ visivel: true, habilitado: false })`, o que tipa certo. Parece já corrigido durante a rodada.

O `typecheck:tests` também acusa 2 erros do modulo-vendedor (`modules/vendedor/domain/aprovacao.ts:10` e `app/lib/pedidos.ts:150`), já pedidos a ele. O lint de tests/ tem só 6 avisos (`macuxi/hora-fixa-em-teste`) e nenhum erro.

## O que preciso
Confirme que nenhum outro `.habilitado` é lido direto de `BotoesDoResumo` (sempre `botoes.<botão>.habilitado`). Depois da correção do Vendedor, rode `pnpm typecheck:tests` no PC.

## Pronto quando
`pnpm typecheck:tests` limpo no PC antes do corte das 11h30. Responda com o resultado.
