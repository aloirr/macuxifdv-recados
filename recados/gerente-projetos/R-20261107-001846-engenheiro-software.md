---
id: R-20261107-001846-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0091
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T00:18:46-04:00
---
# T-0091 revisão final: 🟢 em banco, core e testes; lote sobe com o CI verde

## Contexto
Revisão final da T-0091 contra o desenho docs/desenho/T-0091.md (ADR 0029 e ADR 0024). Também conferi a passagem SQLite da T-0088 (S1, minha).

## Vereditos (por recado aos donos)
- banco-dados, R-20261107-001721, 🟢. A 0038 dá EXECUTE só ao macuxi_portal (as 20 sa_* com as assinaturas da 0035). App, worker e PUBLIC ficam sem, e a conferência final pelo catálogo confirma. Nenhum ALTER ROLE; o papel nasce com os atributos no CREATE e, se já existe, só recebe login/senha SCRAM pelo B0. O portal não recebe grant de tabela nem política, e a trava de filiação dá 42501. O down volta ao estado da 0035 e o papel fica. config, papeis, banco-teste e banco.ts estão coerentes.
- modulo-core, R-20261107-001733, 🟢. As 8 rotas plataforma/auth/* têm conexao 'portal'. O SDK recusa na subida uma rota mal marcada. O autenticarSuperAdmin só vai ao banco com token de plataforma de assinatura válida, então rota de tenant nunca toca o pool do portal.
- testes, R-20261107-001743, 🟢. PP-01..04 tiram a lista do catálogo. A conformidade ficou mais estrita: as sa_* saíram da lista exata do app e ganharam lista exata do portal, mais ACL, atributos, filiação, posse e grants. DP-01..06 provam qual pool cada rota usa, inclusive DP-04 e DP-06c. O SA-10d impede que os describes do portal passem pulados no CI.
- T-0088 S1 (minha): passagem.test.ts e arquivo.test.ts cobrem o desenho §1 a §4 (detalhe na resposta final). Lacuna 🟢: não há caso explícito de divergência no grupo B; ela cai na mesma conferência do A. Fica comigo como pendência.

## Lote da T-0091
Pode subir quando o CI do pré-lote passar (testes de banco e stack isolado), com estas condições:
1. Tudo no mesmo commit: migração 0038, @macuxi/db, API/SDK, Core, testes e scripts/deploy. A 0038 sozinha deixa o portal em 42501.
2. No log do CI, DP-01..05 e PP-03/04 rodaram e não foram pulados.
3. O .github/workflows/stack-isolado.yml só muda com o ok do dono do produto (diff em docs/desenho/T-0091-stack-isolado.diff). Sem ele o CI passa.
4. Os publicar (demo e produção) já rodam o preparar-vm.sh antes do implantar.sh, então o portal.env nasce na VM antes de o implantar exigi-lo.

## Testes rodados localmente (sem banco)
- api: 222 verdes, 62 pulados.
- platform-sdk: 609 verdes.
- @macuxi/db: 677 verdes, 451 pulados.
- verificar engenheiro-software: só as 4 violações conhecidas dos anexos do dono do produto em .coord/recados/anexos/, nenhuma minha.

## Pendências
- R-20261107-000958-engenheiro-apps (T-0088 A1, revisão técnica do shell sobre SQLite) chegou durante esta revisão e fica para a próxima rodada da T-0088.
- O R-20261106-235212-modulo-catalogo (T-0088 C1, 'indexando') também está aberto.
