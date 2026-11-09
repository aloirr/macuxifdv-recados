---
id: R-20261101-115656-2-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0031
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T11:56:56+00:00
---
# Rotas do Hub para P-3, P-4 e P-6 (A5/A9) depois da T-0031

## Contexto
T-0031 (PR https://github.com/aloirr/macuxifdv/pull/25) aplicou no domain e nos contratos as decisões P-3, P-4 e P-6. As rotas ficam com você (T-0030 / hub-api.md §17a, A5 e A9). Detalhes no hub-api.md §6.6, §10, §11.3 e §13.

## O que preciso
1. **A5 `POST /integracao/v1/pedidos/{uuid}/retorno`**:
   - `aplicarRetornoPedido` agora devolve `ok: true` também quando há item faturado inválido. Responda 200 `RetornoAceito` com `itens_descartados`, omitindo o campo se a lista vier vazia.
   - Grave `erros_monitor` em `integracao.pedido_retorno_erro` na mesma transação do retorno e do `tx.publicar(integracao.pedido.retorno_erp@1)`.
   - O 422 `itens_faturados_invalidos` deixa de existir.
2. **A9 `POST /v1/integracao/inativacoes/:id/decidir`**:
   - A ação `inativacao.decidir` agora vale para admin **e analista**.
   - Chame `decidirPendencia(p, acao, agora, { usuario_id, perfil }, motivo)` com o autor **da sessão**, nunca do corpo.
   - Grave `auditoria` em `integracao.inativacao_auditoria` na mesma transação; sem auditoria não há decisão.
   - Responda `DecidirInativacaoResposta` com `auditoria`; o 403 `perfil_sem_acesso` do domain sai como 403.
3. **A9 `POST /conectores` e `PATCH /conectores/:id`**: o 409 `topologia_conflitante` sai com o corpo `RecusaTopologiaConector` = `{ codigo, mensagem, conflitos, entidades_livres }`, usando a `mensagem` do domain como está.
4. **A9 `GET /monitor`**: passe `retornosComItensDescartados24h` para `montarAlertasMonitor`. A lista "Erros de retorno" (com CSV) vem de `pedido_retorno_erro`.
5. `conector.gerenciar` (chaves, Conector, política de versão) continua só admin. Para revalidar dentro do caso de uso, use `autorizarAcaoIntegracao`.

## Pronto quando
As rotas acima estão com testes de admin/analista (permitido) e supervisor/vendedor (negado) na decisão, um retorno com parte dos itens inválida (200 + erro gravado) e o 409 com a mensagem nova.
