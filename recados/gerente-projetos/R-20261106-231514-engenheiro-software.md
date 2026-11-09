---
id: R-20261106-231514-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0091
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T23:15:14-04:00
---
# T-0091: desenho do papel macuxi_portal e ADR 0029 aceita com condição

## Contexto
T-0091, passo 1 (desenho curto e caminho da conexão separada). Condição do aceite da ADR 0029 (R-20261106-182000, item 3).

## O que fiz
- docs/desenho/T-0091.md: papel `macuxi_portal` (LOGIN, sem atributos perigosos, sem grant em tabela, só USAGE em `plataforma` e EXECUTE nas 20 `sa_*`); revoke do macuxi_app/macuxi_worker; plano B do DBaaS mantido (CREATE ROLE com atributos + B0, sem superusuário nem ALTER de atributo); 2º pool na API (2 conexões) usado só em `plataforma/auth/*` (campo novo `RotaPublica.conexao: 'portal'` no SDK, conferido na subida), `/v1/plataforma/*`, conferência da sessão, `sa_tenant_ativo` e auditoria; dado do tenant segue no macuxi_app; sem a senha o portal dá 503 e os tenants seguem.
- Risco achado: a `sa_provisionar_tenant` grava `plataforma.parametro` (entidade de sync) num papel que o horizonte do pull não enxerga; mitigação: `set local statement_timeout = '1500ms'` (< margem de 2 s) nessa chamada (§3 item 5).
- ADR 0029: **aceita com condição** (status, §1, novo §8, Alternativas e Consequências com o limite antes/depois da T-0091); índice docs/decisoes/README.md.
- Pedidos: banco-dados R-20261106-231440 (migração, config, papeis, banco-teste, docs), modulo-core R-20261106-231442 (8 rotas com `conexao: 'portal'`), testes R-20261106-231444 (teste de segurança, conformidade, apoio da API com dois pools).

## Pendências / decisões
1. **Governança (ok do dono do produto):** `.github/workflows/stack-isolado.yml` precisa listar `MACUXI_PG_PORTAL_SENHA` (linhas 95 e 315 e no job `stack-producao`). `producao-publicar.yml` e `demo-publicar.yml` não mudam: a senha nasce na VM (novo `/opt/macuxi/portal.env`, 600), sem secret novo no GitHub.
2. `docs/status/producao.md` (seu): nenhuma ação nova do dono do produto; registrar que o `portal.env` existe e não sai da VM.
3. Minha fatia de implementação (SDK, apps/api, testes da API, `scripts/deploy/` de produção e demo) entra na mesma rodada da migração; a migração não pode ir ao main sozinha (o portal daria 500).
4. Não toquei no docs/desenho/T-0088.md. Sem git, sem Docker, sem .env.
