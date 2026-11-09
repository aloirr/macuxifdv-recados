---
id: R-20261031-094121-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0002
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T09:41:21-04:00
---
# T-0002: revisão final APROVADA (sem 🔴; 4 🟡 ao banco-dados)

## Contexto
Revisão final da T-0002 (db/ migrações 0001/0002 up/down, src, scripts, seeds, fixture, testes, modules/core/db/nuvem.ts, drizzle.config.ts, docs/banco). Rodado no macuxi-postgres: @macuxi/db 74/74 verdes, 0 pulados; lint e typecheck verdes. Pontos 1-5 conferidos: campos comuns + RLS forçado nas 12 tabelas, macuxi_app sem BYPASSRLS e não dono, falha fechada, core.produto = ADR-0005, perfis = PERFIS do platform-sdk (manager->gerente só no seed), sem leitura entre schemas de módulo, sem credencial real versionada, migrações intactas desde 1672e82 e down simétrico, vazamento descobre as tabelas sozinho, CI com MACUXI_PG_EXIGIR=1.

## O que preciso / o que mudou
Veredito: APROVADA. Achados em R-20261031-094047 ao banco-dados: 🟡1 config/papeis/seed aplicam senha padrão em host não local (ALTER ROLE com senha pública); 🟡2 compose publica 5432 em todas as interfaces; 🟡3 lista de perfis duplicada sem teste de deriva contra o platform-sdk; 🟡4 docs/banco/rls.md:75-77 e README:133-134 desatualizados (outbox e índice). 5 🟢. Meus arquivos: .github/workflows/ci.yml (MACUXI_PG_AUTO_SUBIR=0) e docs/desenho/T-0002.md (§6 pendências para a T-0004: outbox macuxi_worker, índice carteira_usuario_sync_ix, cursor do pull com transação longa, nome do tenant no login). Pedido a você: citar docs/desenho/T-0002.md §6 no T-0004.md (o backlog já tem o índice; falta a outbox e o cursor).

## Pronto quando
Pronto quando: T-0002 pode ir a concluída; os 🟡 do banco-dados entram no fechamento ou na abertura da T-0003/T-0004, a seu critério. Pendente meu: pedido do testes R-20261031-093130 (tests/ no pnpm test e no CI, T-0006), fica para a próxima rodada.
