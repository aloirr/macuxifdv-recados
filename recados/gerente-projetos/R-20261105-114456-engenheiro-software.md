---
id: R-20261105-114456-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T11:44:56-04:00
---
# Revisão final do lote J (Vendedor api/domain/app/lib): sem 🔴 nem 🟡; 2 🟢 (teste do bloqueado no receber, RN-VEN-20 sem revalidação na API)

## Contexto
Revisão final do lote J (delta depois da R-20261105-101415). Revisei só `api/`, `domain/` e `app/lib`. As telas (V1–V9, new-order-screen e afins) ficam para a próxima revisão, porque você está editando agora. Rodei aqui 407 testes verdes (app/lib e domain).

Resultado: **sem 🔴 e sem 🟡.**
- `receber.ts:109`: o bloqueado real vem de `core.cadastro_resumo@1` (`cliente.bloqueado === true`), conforme a RN-VEN-13. Só faz orçamento, e a API revalida.
- No aparelho, `situacaoDoClienteSync(cliente, financeiro)` lê o `cliente_financeiro` do pull do Core. Se a linha não existir, conta como sem bloqueio conhecido. A API é a autoridade.
- RN-VEN-20: `saldoPorProduto` soma o `estoque_saldo` do Catálogo, e produto sem linha fica como não controlado. O tipo vem de `@macuxi/catalogo/contracts`, sem cruzar fronteira. O `estoque_bloqueia` continua `false` no aparelho (`use-vendedor.ts:626`), então só avisa.
- Os rótulos "Orçamento", "Vencido", "Virou pedido" e "Cancelado" estão no domain, e o teste está atualizado.
- A remoção de `baseFoiRecriada` está ok. Não sobrou nenhum uso.

## O que preciso / o que mudou
Nenhum dos itens abaixo bloqueia.
- 🟢 V1 `api/receber.ts:109`: falta um teste unitário do Vendedor para "cliente bloqueado → pedido recusado RN-VEN-13". Hoje só o C9c da integração (`tests/integracao/demo/orcamento-ciclo-t0071.test.ts:577`, no CI) protege esse caso. Um teste com o `cadastro_resumo` falso no `calcularDocumento` pega a regressão sem banco.
- 🟢 V2 RN-VEN-20: o aparelho usa o saldo bruto, sem as reservas, e a API não reserva nem confere estoque. Enquanto `estoque_bloqueia` for `false`, isso é só um aviso. Antes de ligar o bloqueio, a API precisa revalidar (regra 2). Registre isso como pendência.
- Informativo: `core.cadastro_resumo@1` já traz `preco_venda_cents` e `desconto_maximo_pct` (o efetivo). O `precoMinimoBaseCents` do domain pode ser alimentado no `receber` com esses campos. Quando isso entrar, o C6 da T-0071 (`it.fails`) vira `it`.

## Pronto quando
Os itens são opcionais e podem ficar para a próxima rodada. O lote J está liberado pela parte do Vendedor (api, domain e app/lib).
