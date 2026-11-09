---
id: R-20261101-115656-modulo-integracao
de: modulo-integracao
para: [gerente-projetos, alexandre]
cc: [engenheiro-software]
tipo: entrega
prioridade: alta
tarefa: T-0031
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T11:56:56+00:00
---
# T-0031 (nuvem): Hub P-3, P-4 e mensagem do P-6 — PR #25

## Contexto
Ajustes P-3, P-4 e P-6 do Hub, continuação da T-0027 na frente nuvem (decisões do Alexandre no R-20261101-014652, item 2). Número usado: **T-0031** (a T-0030 já é citada como tarefa local de rotas e banco). **PR: https://github.com/aloirr/macuxifdv/pull/25** (branch nuvem/T-0031-hub-p3-p4).

## O que foi feito
1. **P-3**:
   - `manifest.ts` 0.3.0: `inativacao.decidir` passa a ser admin e analista; `conector.gerenciar` (Conector, chave de API, política de versão) continua só admin.
   - `domain/permissoes.ts` novo, com `autorizarAcaoIntegracao`; um teste garante que a tabela é igual à do manifesto.
   - `decidirPendencia(p, acao, agora, autor, motivo?)` dá 403 `perfil_sem_acesso` para supervisor, vendedor e os outros perfis, e devolve a `auditoria` (quem, perfil, quando, lote/sessão, quantidade, total, %, motivo).
   - Contrato `AuditoriaInativacao`, com campos novos opcionais na pendência.
2. **P-4**: `aplicarRetornoPedido` não responde mais 422 por item faturado inválido.
   - O status vale e só os itens válidos acumulam e vão no evento (se nenhum for válido, `itens_faturados: null`).
   - Cada item inválido sai em `itens_descartados` (vai em `RetornoAceito`, campo opcional) e em `erros_monitor` (motivo, `external_id` do produto, pedido, nota).
   - Alerta novo no monitor: `retorno_com_itens_descartados`.
   - `itens_faturados_invalidos` fica no enum só por compatibilidade.
3. **P-6**: `verificarTopologiaConectores` devolve uma `mensagem` que diz qual Conector já recebe cada entidade, pede para informar a lista de entidades do novo e avisa que, sem a lista, o cadastro leva as 8. Devolve também `entidades_livres`. Contrato `RecusaTopologiaConector` para o 409.
4. **hub-api.md** atualizado: §2.1, 6.6, 10, 11.3, 13, 17 (rotas e tabelas novas), 18.2 e 18.3.

## Testes
- `@macuxi/integracao`: antes 300, **depois 327** (4 testes antigos do 422 reescritos para o P-4).
- Conector: 240, sem mudança.
- lint, typecheck e fronteiras verdes; `verificar modulo-integracao --base origin/main` sem violações.
- CI do main (fa837c4) verde; CI do PR na fila no momento do envio.

## Pendências (fora do escopo, recados enviados)
- **engenheiro-software** (rotas A5/A9): 200 com `itens_descartados` + gravar `erros_monitor`; decidir com admin/analista, autor da sessão e auditoria na mesma transação; 409 com o corpo `RecusaTopologiaConector`; monitor com `retornosComItensDescartados24h`.
- **banco-dados**: tabelas `inativacao_auditoria` e `pedido_retorno_erro`, coluna `pendencia_inativacao.decidida_por_perfil`.
- **gerente-projetos**: registrar a T-0031 no quadro (não editei `.coord/tarefas`, quadro nem diário, pela regra da frente nuvem).

## Premissas
- Reenviar uma nota já aplicada não reabre os itens descartados (a idempotência é por pedido, status e nota); a correção fica no backlog.
- Item com vários problemas = um único descarte.
- O alerta é por empresa (só um Conector recebe pedidos na v1, P-7).
- A auditoria guarda só uuid e perfil; o autor vem sempre da sessão.
- Merge: só com o CI do PR e o do main verdes.
