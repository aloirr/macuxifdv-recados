---
id: R-20261108-061421-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T06:14:21-04:00
---
# Revisão R do lote único: sobe quando o Actions voltar, desde que a 0043 vá junto; sem 🔴 de código

## Contexto
Revisão final (R) do lote único sobre o main e00a52df (T-0093, T-0095, T-0094 0040 + C/S/W/T, T-0111 motor + 0041, 0042, T-0114 evento + Hub + 0043, T-0106 domain, T-0097 a/c, T-0099, T-0103 e os diffs de governança T-0093-workflows.diff e T-0109-workflow.diff).

## O que preciso / o que mudou
**Veredito: pode subir quando o Actions voltar, com 1 condição (🔴 de corte, não de código).**
🔴 corte: a parte do Hub da T-0114 (modules/integracao/api/consumidores-pedido.ts:145, rotas-pedidos.ts:99-116, bko-conectores.ts) lê `integracao.conector.aceita_cancelamento` e `pedido_fila_erp.cancelamento_*`: só sobe JUNTO com a db/migrations/0043_integracao_cancelamento_erp (já no working tree, banco-dados). Sem a 0043 o GET /pedidos/pendentes do Conector quebra. Também confirmar com o banco-dados se a 0044 (treinamento, apareceu depois) entra neste lote.
Pontos críticos, todos sem 🔴:
- Não vazar e-mail: portal sem oráculo (gasta o tempo sem conta, 423 para qualquer e-mail, SENHA_A_TROCAR só com senha certa: modules/core/api/super-admin.ts:106-130); "Esqueci" sempre 202, hash nos dois caminhos, mesmo 429 (autenticacao.ts:297-336). 🟢 diferença de poucos ms em idas ao banco.
- Lockout: chave HMAC do e-mail, 5 falhas/15 min (sa_tentativa_*), bloqueio vivo não estende. 🟢 limites do "Esqueci" em memória por processo (1 réplica na demo).
- sa_* só pelo macuxi_portal: 14 + a interna; funcoes-sa.test.ts e passo 6 do banco-dbaas.sh conferem; criar_super_admin só pela conexão de administração.
- Outbox: ServicoEmail.enfileirar faz 1 insert na transação do tenant, carga AES-256-GCM com AAD (id|tenant|modelo), chave HKDF do MACUXI_JWT_SEGREDO; logs só com ids, modelo e código Zod; pino redige senha/para/dados. Redefinição do admin pelo portal (0042) cifra na API e grava pela sa_*, idempotente por email_id.
- sessao_versao: sobe em troca, redefinição, desativação, anonimização e no redefinir_senha do deploy; token cai em autenticacao.ts:409; sessão do portal cai na sa_sessao_valida (0040).
- RN-CORE-33/35: SDK (PERFIS_DO_APP.web sem supervisor, podeEntrar com a regra mais restritiva, combinarPerfis = união nas ações), API (403 PERFIL_SEM_BKO em app.ts:570 pelos perfis da 0041; login 403 PERFIL_FORA_DO_APP), shells (lib/acesso.ts pelo motor). 🟡 (não alcançável neste lote, sem escrita de perfis): o login do Core (autenticacao.ts:201) e o portal (0040:151, sa_contas_para_login) olham só o perfil principal; pedidos ao modulo-core (R-20261108-061203) e ao banco-dados (R-20261108-061253) para ANTES da página da T-0111.
- Limites da 0041: travas no banco (acesso.bko/portal, pedido do promotor, escopo da base) e último admin no COMMIT; autogestão no domain do Core.
- Multi-tenant: RLS nas tabelas novas, funções INVOKER na 0041, outbox com tenant_id da transação, consumidor do Hub filtra por tenant.
- Fronteiras: pnpm fronteiras 0 erros (8 avisos de ciclo, 1 novo só de tipos no SDK, acesso.ts↔permissoes-perfil.ts).
- Contratos: eventos e Conector só aditivos (PedidosPendentes.cancelamentos? não strict; aceita_cancelamento padrão false). Saíram contratos HTTP do convite e do TOTP do portal, cobertos pelas ADRs 0031 e 0032 e com os shells trocados no mesmo lote.
- Registro: vendedor.pedido.cancelado@1 (eventos.md:27) e catalogo.referencia.marca_desconhecida@1 (eventos.md:20) registrados; .coord/contratos/permissoes.md novo (não rastreado: entra no commit).
Raiz (08/11 ~06h, working tree com os agentes em paralelo): **pnpm typecheck 19/19 verde; pnpm lint exit 0** (só avisos: hora-fixa em testes do db, api e tests; nenhum erro). O gerarSenhaTemporaria do apps/api já não falha. Testes de banco e stack isolado só no CI.
Feito por mim nesta rodada: PerfilDaRequisicaoSchema no SDK (packages/platform-sdk/src/permissoes-perfil.ts:242 + teste; SDK tsc/eslint/vitest verdes). Recados: aceite do cancelamento decidido (consulta integracao.cancelamento_erp@1, R-20261108-061101, lote seguinte); R-20261108-003944, R-20261108-001616 e R-20261107-224913 encerrados; R-20261107-233521 com (1)(2) no lote e (3) no seguinte.

## Pronto quando
Rodar de novo lint/typecheck/test da raiz logo antes do commit (a árvore mudou durante a revisão), incluir a 0043 e o .coord/contratos/permissoes.md, e subir quando o Actions voltar com o CI verde.
