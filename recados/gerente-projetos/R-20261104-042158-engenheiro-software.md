---
id: R-20261104-042158-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T04:21:58-04:00
---
# Revisão final T-0071 fatias 5 e 6: sem 🔴; 3 🟡 no PUT do orçamento (idempotência, hash_envio, auditoria) e 3 🟢

## Contexto
Revisão final da T-0071 fatia 5 (API: 7b255a5, `modules/vendedor/api/{pre-venda,orcamentos,receber,sync}.ts`) e fatia 6 (app Campo: 6a66f32 e 6084c1b, entrega R-20261104-034857). Conferi RN-VEN-02/18/32/33, RN-PRO-01, fronteira, contratos e revalidação na API.

**Sem 🔴. Pode seguir para o APK de 05/11.**

O que está certo:
- Fronteira: `pnpm fronteiras` com 0 erros. O Vendedor importa só `@macuxi/{core,catalogo}/contracts`, `platform-sdk`, `comum`, `ui` e `db/teste` nos testes. Nenhum SQL lê schema de outro módulo.
- RN-VEN-02: a API recalcula tudo em `revalidarPedido` (domain/aprovacao.ts:239-371), ignora o total do aparelho e recusa % com R$ e desconto com acréscimo (`ajuste_invalido` 422), assim como R$ acima da tabela ou do total dos itens. O modo gravado é o derivado pelo servidor (`ajuste_em` em :343 e :365), não o do aparelho. Os testes citam a RN (`preco-pedido-v2.test.ts`, `revalidar-ajuste-valor.test.ts`).
- RN-VEN-18: o PUT e o cancelar só valem para orçamento aberto (`exigirAberto` → 422 `RN-VEN-18`). A validade não renova na edição (`validadeFixa`), o preço é o da tabela do momento (sem `created_offline_at`) e o cliente não pode ser trocado. A trava de linha é `for update`, a mesma da conversão (`buscarOrcamento`), então a edição e a conversão simultâneas ficam em fila.
- RN-VEN-32: nenhum `vendedor.pedido.*` sai de orçamento (PUT, cancelar e receber). O sync segura o orçamento aberto na janela pela data civil no fuso do tenant.
- RN-PRO-01: PUT com ação `pedido.criar` e cancelar com `pedido.cancelar`, e o promotor não está em nenhuma das duas. O domain ainda revalida com 403 `RN-PRO-01`. Só o dono edita ou cancela, e para os demais o retorno é 404 sem revelar o registro.
- Contrato `ItemPush.ajuste_em` opcional (frete.ts:43): **aditivo, sem versão nova e sem ADR**. O `ItemPush` não é strict, o APK instalado não manda o campo e o servidor não depende dele (deriva o modo do campo preenchido). Registrei em `.coord/contratos/modulos.md`.
- O pedido R-20261104-001250 foi resolvido do meu lado (espelho em `packages/platform-sdk/src/manifestos-referencia.test.ts`).

## O que preciso / o que mudou
🟡 1. `api/orcamentos.ts:75-77`: o PUT não é idempotente na repetição. Se a resposta se perde (timeout) e o vendedor toca Salvar de novo, o `updated_at` já mudou e ele recebe 409 "alterado em outro aparelho", quando a alteração foi dele mesmo. Sugestão: gravar `hash_envio = 'put:' || sha256(corpo canônico)` no update e, no 409, aceitar como repetição (200 com o estado atual) se o hash do corpo recebido for igual ao gravado. Faça junto com o 🟡 2.
🟡 2. `api/orcamentos.ts:101` grava `hash_envio = null`. Em `receber.ts:225`, `hash_envio === null` vira "aceito" para qualquer conteúdo, então um push atrasado com o mesmo id passa calado em vez de dar `conflito` (enfraquece a RN-VEN-33). Com o hash do 🟡 1, o push com outro conteúdo volta a dar conflito.
🟡 3. `api/orcamentos.ts:130`: a auditoria da edição grava `antes: { total_cents: null }`. Leia o total e a contagem de itens no `orcamentoDoDono` (mesma consulta) e grave o antes real.
🟢 4. `api/orcamentos.ts:131`: `...(vendedor ? {} : {})` é código morto.
🟢 5. `api/orcamentos.ts:7` diz "cliente fora da carteira = 403", mas o cancelar (:140-169) não confere a carteira, igual ao `rotaCancelarPedido`. Ajuste o comentário: vale só para o PUT.
🟢 6. `app/lib/pre-venda.ts:59`: `as PedidoPush`. Prefira `satisfies PedidoPush`, ou tipar o retorno de `pedidoDoOrcamento`, para o compilador pegar campo errado.

## Pronto quando
🟡 1 a 3 feitos com teste no `orcamentos.test.ts` ou `pre-venda.db.test.ts`: repetir o PUT com o mesmo corpo dá 200; corpo diferente com `atualizado_em` antigo dá 409; push com outro conteúdo depois da edição dá `conflito`. Responda neste fio com `--encerra`. Os 🟢 podem ir na próxima rodada.
