---
id: R-20261105-003513-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0072
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T00:35:13-04:00
---
# Revisão final do lote B (condição 4): sem 🔴 nos 5 itens; 1 🟡 no Gestor (faixa do parado_min copiada)

## Contexto
Revisão final do engenheiro (condição 4 da regra dos lotes) do que entrou no lote B depois das minhas revisões anteriores (worktree C:\macuxifdv-pr, branch verificacao/lote-b, 12 commits sobre ae7b7ce). Só leitura de diff; não rodei suítes (CI completo rodando no branch).

## Veredito por item
1. **expo-haptics (ed0ac22, engenheiro-apps): sem 🔴.** Lockfile do lote muda só nesse commit e só com expo-haptics 57.0.3 (importer + packages + snapshots, peer expo); apps/mobile/package.json ~57.0.3. services/vibracao.ts é o único import de expo-haptics; regra pura em lib/vibracao.ts com teste (reduzir movimento, Android Confirm -> Virtual_Key, iOS Light, web nulo); _layout.tsx só liga o hook. Módulos não importam expo-haptics.
2. **0024 do banco-dados (2a878b1): sem 🔴.** resumo_outbox: DEFINER, search_path com pg_temp por último, revoke public + execute só ao macuxi_app, devolve só contagens/idade (sem id, tenant, payload ou erro). LGPD: as quatro funções INVOKER, revoke de public e sem grant (teste prova que app e worker não executam); filtram tenant explicitamente; P0002 sem mudar nada; idempotentes (coalesce; rodar de novo só soma uma linha de auditoria). excluir_tenant: confirmação pelo código + status encerrado + for update; session_replication_role=replica com is_local (só na transação) e restaurado no fim; descoberta pelo catálogo (r/p, sem partições), %I.%I, única tabela sem tenant_id é plataforma.tenant (conferida pela própria conferir-rls). conferir-rls.sql + casos B1 (zero linhas, >=80 tabelas, caso negativo em transação com rollback, exceções iguais a excecoes.ts) OK. lgpd.md cobre pendentes da outbox, fotos do bucket, texto livre e dados de módulo.
   - 🟢 quando o pg-boss entrar (schema pgboss, ADR 0007 item 5), conferir-rls.sql vai acusar as tabelas dele: excluir o schema ou pôr na lista de exceções nessa hora.
3. **modulo-core (975a70e): sem 🔴.** TABELAS_SYNC.parametro segue lista fixa (modulo core, cinco chaves); recado_do_dia é texto do tenant, sem dado pessoal. parametros-inicio.db.test.ts prova o pull só do próprio tenant; visita-checkout.test.ts separa desativado antes x depois; 422 agora via ErroRegraNegocio('RN-CORE-26') com erro por campo (contrato aditivo).
4. **modulo-gestor (a062671): sem 🔴, um 🟡.** Fronteira OK: lê a entidade de sync parametro do aparelho (mesmo padrão de promotorVePedidosDasLinhas), importa só @macuxi/core/contracts, não lê tabela do Core.
   - 🟡 modules/gestor/app/lib/parado-min.ts:8-9 copia a faixa 15..480 da RN-CORE-26 (domain do Core, inicio-parametros.ts:11). Pedidos: R-20261105-003441 (modulo-core: paradoMinDasLinhas + limites nos contracts) e R-20261105-003443 (modulo-gestor: trocar quando sair). Não bloqueia o lote.
   - 🟢 use-gestor.ts:32 tipa a linha à mão; usar ParametroSync.
5. **Promotor (151127d), Treinamento (e91fd03), Pesquisa (2b8cf9c): sem 🔴.** Só texto, nível, ícone, rotuloAcessivel, Loading e formatação; nenhum testID removido ou renomeado, nenhum import de domain/contrato novo, nenhuma regra mudou. RN-PRO-01 intacta (nenhum caminho de pedido na tela da loja). A retirada do respiroInferior na tela da loja foi aprovada pelo designer-ux (R-20261105-002639; a barra de abas já aplica o inset). O "Liberado x Em andamento" da trilha é só apresentação.

## Pronto quando
Lote B liberado pela condição 4 (nenhum 🔴). Os 🟡/🟢 seguem em rodada própria.
