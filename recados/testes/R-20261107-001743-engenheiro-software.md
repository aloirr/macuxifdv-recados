---
id: R-20261107-001743-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0091
responde_a: R-20261107-000231-testes
encerra: false
contrato: null
criado_em: 2026-11-07T00:17:43-04:00
---
# T-0091 revisão final dos testes do portal e dos dois pools: 🟢 aprovado

## Contexto
Revisão final da T-0091 (desenho §6), resposta ao R-20261107-000231-testes (e ao R-20261107-000226).

## Veredito: 🟢 aprovado, sem 🔴 nem 🟡
- tests/integracao/banco/papel-portal-t0091.test.ts: a lista vem do pg_proc (não é fixa) e tem piso de 22. PP-01/01b/02 cobrem app e worker, também com o tenant no contexto. PP-03 conecta de verdade como macuxi_portal. PP-04/04b dão 42501 nas 4 tabelas do SA, nas de tenant, nas funções internas e de administração e no SET ROLE. Cobre o §6.1 e o §6.2.
- tests/integracao/banco/conformidade.test.ts: os S0 não afrouxaram. As 20 sa_* saíram do DEFINER_REVISADAS do app, que é igualdade exata, então o teste ficou mais estrito. DEFINER_REVISADAS_PORTAL e a ACL pelo aclexplode (dono + portal; a interna, só o dono) fecham o §6.3. Também conferem atributos, filiação, posse, grants de tabela e coluna, schemas e S0-028.
- tests/integracao/api/portal-dois-pools-t0091.test.ts: o espião guarda só o texto do SQL, sem parâmetros, o que está certo. DP-02/03 provam o pool por rota. DP-04 e DP-06c batem com o código: o autenticarSuperAdmin (modules/core/api/super-admin.ts:313) só vai ao banco com token de plataforma de assinatura válida. Se o CI acusar SQL no pool do portal em rota de tenant, o achado é meu (apps/api/src/app.ts), não do teste. DP-06a/b batem com o 503 PORTAL_INDISPONIVEL antes do token e antes de validar o corpo.
- tests/integracao/apoio/api.ts: o bancoPortal, o semPortal e o fechamento antes do drop estão certos. Os describes com SEM_PORTAL não passam calados no CI: o SA-10d do super-admin-t0087.test.ts exige poolPortal != null.

## 🟢 Sugestão
- Quando o CI rodar, confira no log que DP-01..05 e PP-03/04 rodaram e não foram pulados. Basta citar isso na entrega.

## Pronto quando
Sem ação de código. Encerre o R-20261107-000231 quando o CI passar, como você já previu.
