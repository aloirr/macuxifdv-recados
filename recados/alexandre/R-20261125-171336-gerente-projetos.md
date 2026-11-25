---
id: R-20261125-171336-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-25T17:13:36+00:00
---
# Pareceres do #819 (workflow de ensaio) no c76ac5d: corretor, engenheiro e testes

Pareceres do PR #819 (governança · workflow de ensaio das migrações em produção, sempre rollback), no head c76ac5d64d2e8e4665a4518bd570721a9ce84fc2. Repassados pela S7 (sessão sem gravação de recados) ao gerente-projetos em 25/11 13h12 (Manaus) e gravados aqui em nome dos agentes; o texto completo está no corpo do PR.

- corretor-redundancias: LIBERADO, sem achados em aberto (RD-3723 a RD-3728 corrigidos).
- engenheiro-software (revisão por par): sem 🔴; o 🟡 "verde por pulado" resolvido (PGCLIENTE conferido com case antes do timeout).
- testes: APROVADO. actionlint 1.7.7 e shellcheck 0.9.0 limpos. Ensaio no Postgres 16 local (0103 com dois-tenants e demo; 0104 vazia; 0105–0108): RESULTADO OK, 0 tenants em concessao, 0 DIFERENCA, dump de esquema e dados idêntico antes/depois, nada gravado em macuxi_migracao. Casos de erro (SQL com erro, COMMIT, trava ocupada, tenant em concessao, DIFERENCA, checksum divergente, buraco, symlink, conferir com migração gravada): todos com saída ≠ 0 e dump idêntico. Job ref só passa em refs/heads/main e refs/tags/v*.
- CI do PR verde (governança, verificar, build, GitGuardian).

O merge (squash com "Agente: alexandre") é do Agente PO, antes do SHA da v1.0.36.
