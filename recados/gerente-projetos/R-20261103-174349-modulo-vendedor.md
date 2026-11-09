---
id: R-20261103-174349-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T17:43:49-04:00
---
# T-0071 fatia 5 (API do orçamento, pré-venda SQL, R$ no receber e pull, PDF): entrega parcial 17h42

## Contexto
T-0071, fatia 5 (API) do desenho docs/desenho/T-0071.md (§1.4, §1.5, §2.1, §5). Entrega PARCIAL das 17h42 (Manaus): código e testes escritos; typecheck, vitest e lint do @macuxi/vendedor estão rodando (máquina lenta) e eu mando o resultado em outro recado. Nada foi commitado (git é do gerente). Nenhum teste rodou no 5432.

## O que foi feito (todos os itens, incluindo o 6 depois do aviso da 0020 do banco-dados R-20261103-163613)
1. §1.4 a: `api/pre-venda.ts` ganhou `preVendaSql` (mesma interface; o `fuso` do tenant entrou como argumento de `buscarOrcamento`/`lerDocumentos`). Mapeamento: `validade_data` = `orcamento_validade::text`; `validade_ate` = início do dia seguinte no fuso, em UTC (derivado, não gravado); `orcamento_origem_id` = `orcamento_id`; `convertido_pedido_id` = pedido cujo `orcamento_id` é o orçamento (pedido_orcamento_uk); `marcarConvertido` grava `convertido_em`. Ligado em `api/index.ts` (`usarPreVenda(preVendaSql)`). Parâmetro `orcamento.ativo` agora vale ligado por padrão (`app/lib/pre-venda.ts`, só `false` desliga).
2. §1.4 b: pull (`api/sync.ts`) com `tipo`, `validade_data`, `validade_ate`, `orcamento_origem_id`, `convertido_pedido_id`, `desconto_valor_cents`, `acrescimo_valor_cents`, `ajuste_em` no pedido e `desconto_unitario_cents`, `acrescimo_unitario_cents`, `ajuste_em` no item. Janela: criado há <= 90 dias OU (pedido não final) OU (orçamento não convertido, não cancelado e `orcamento_validade >= hoje` no fuso). `sqlPedido/sqlPedidoItem/sqlPedidoEvento` ganharam o parâmetro `fuso` ($8).
3. §1.4 e: RN-VEN-13 no receber para inativo, cadastro incompleto (lê `cadastro_incompleto`/`cadastro_campos_faltantes` de core.cadastro_resumo@1) e bloqueado; 422 RN-VEN-13 com os campos na mensagem; orçamento é aceito. Observação: `core.cadastro_resumo@1` não tem campo `bloqueado` (só o cliente360 tem); hoje passo `bloqueado: false` e conto com `ativo`. Se o Core quiser que o bloqueio entre aqui, precisa acrescentar o campo ao contrato.
4. §1.4 g: `GET /v1/vendedor/pedidos` com `tipo` (padrão `pedido`) e `situacao` (aberto/expirado/convertido/cancelado, calculada no SQL como `situacaoDoOrcamento`). `consultaPedidosDaMeta` já filtrava `tipo='pedido'`; aprovações só existem em pedido (check pedido_orcamento_status). Não há rota de KPI no servidor: o painel do BKO calcula pela lista, que agora vem só com pedidos.
5. Rotas novas em `api/orcamentos.ts`: `PUT /v1/vendedor/orcamentos/:id` (ação pedido.criar; só o dono, senão 404; cliente fora da carteira 403; vencido/convertido/cancelado 422 RN-VEN-18; `atualizado_em` diferente do `updated_at` 409 ORCAMENTO_ALTERADO; refaz preço pela tabela do momento, mantém validade e número; itens antigos saem por exclusão lógica; não publica evento) e `POST /v1/vendedor/orcamentos/:id/cancelar` (ação pedido.cancelar; idempotente; 422 RN-VEN-18 se vencido/convertido). Promotor 403 pela ação do manifesto (RN-PRO-01). Conversão: o código de recusa passou de RN-VEN-32 para RN-VEN-18 (enum mantém o 32).
6. 0020 no receber: `receber.ts` foi dividido em `calcularDocumento` (cadastro, medida, frete, endereço, preço, condição, alçada; usado também pelo PUT) e a gravação; grava `desconto_unitario_cents`/`acrescimo_unitario_cents`/`ajuste_em` no item (sempre preenchido, digitado ou tabela − final) e `desconto_valor_cents`/`acrescimo_valor_cents`/`ajuste_em` no pedido. `revalidarPedido` (domain) aceita R$ no item e no pedido, `ajuste_invalido` (% e R$ juntos; R$ acima da tabela ou do total), preço mínimo em R$, e agora devolve `preco_unitario_cents` = depois do ajuste do item e antes do ajuste do pedido (semântica do §2.1). §1.4 f: `embalagens[]` de catalogo.precos_cliente@1 entram em `precoTabelaDaUnidade` via `precos_embalagem`.
7. PDF (`domain/pdf-pedido.ts`): orçamento sai com título "Orçamento" (cliente e BKO) e "Válido até dd/mm/aaaa"; arquivo `orcamento-<n>-cliente.pdf`. Funciona nas telas do app e do BKO porque o detalhe já traz `tipo` e `validade_data`.
8. Correção: regex de `validade_data` em contracts/index.ts estava sem a barra invertida (`d{4}`).

## Testes
- Novos/alterados: `domain/revalidar-ajuste-valor.test.ts` (10), `domain/pdf-pedido.test.ts` (+3), `domain/orcamento.test.ts` (RN-VEN-18), `app/lib/pre-venda.test.ts` (padrão ligado), `api/orcamentos.test.ts` (rotas, promotor 403 em criar/cancelar, licença, repositório SQL com banco falso, colunas e janela do pull), `api/pre-venda.db.test.ts` (reescrito para o repositório SQL + cadastro incompleto, R$ no item/pedido, PUT, 409, 422 RN-VEN-18, 404 de outro vendedor e outro tenant, cancelar idempotente, lista por tipo/situação). Os testes de domain anteriores (303) estavam verdes antes do PDF e da API.
- Testes de banco: só pelo harness do 5434 (padrão do globalSetup); nunca o 5432.

## Pendências
- Aplicar a 0020 na demo (5432) é decisão do gerente: sem ela, o receber/pull novos quebram na demo (colunas inexistentes). Ordem: 0020 antes de subir esta árvore.
- App: ligar `PUT /orcamentos/:id` e `/cancelar` no `use-vendedor.ts` e enviar R$/`atualizado_em` (fatia de telas).
- Resultado de typecheck/vitest/lint: segue em outro recado.

## Pronto quando
Revisão do engenheiro-software desta fatia; gerente decide a 0020 na demo.
