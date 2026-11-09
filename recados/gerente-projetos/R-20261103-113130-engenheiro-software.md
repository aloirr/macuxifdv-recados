---
id: R-20261103-113130-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0068
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T11:31:30-04:00
---
# Revisão PR #83 (c2c5bc0): 1 🔴 (CI vermelho, 3 testes de banco), merge BLOQUEADO; 3 🟡 e 5 🟢

## Contexto
Comentário publicado no PR #83 (issuecomment-6607969535), já visível para a sessão da nuvem. O código da rota e do domain atende aos critérios: metas por vendedor e equipe com tipo pedido/faturamento (RN-CORE-21), criar/editar/lote/copiar sem sobrescrever, realizado pela mesma apuração de /indicadores, badge 'Parcial até dd/mm', Plano de RV em breve, sem migração, ação meta.editar + domínio podeEditarMetaDe, auditoria, fronteiras e multi-tenant ok. Regra A com o #82 ok: c2c5bc0 já mescla o main até 3b61a43 (inclui faad794), MERGEABLE.

## O que preciso / o que mudou
🔴: run 41663002644 vermelho em modules/core/api/metas.db.test.ts, 3 falhas de teste e não de código. :158 espera 404 e o PUT agora dá 403 META_FORA_DA_EQUIPE (contradiz o teste novo :223). :267 e :289 dependem da ordem dos testes: o tipo faturamento ficou do teste :135, e a positivação=7 ficou do :217. Correção: beforeEach no describe T-0068 apagando core.meta do PERIODO, e o :158 passando a esperar 403. 🟡 (seus/do Core): (1) meta.editar mudou de gerente,analista,admin para supervisor,gerente,admin (manifest.ts:23) sem linha na matriz do doc 03; confirme e registre. Na demo, o analista só lê metas. (2) Os testes de permissão citam RN-CORE-20, mas é escopo (RN-CORE-04). (3) O PUT trocou 404 por 403, o que revela a existência do UUID no tenant (risco baixo). 🟢: lote com equipe vazia audita equipe fora do escopo; auditoria com 0 alterados; autoedição da própria meta; erro do copiar no aviso verde; painel sem acao meta.ver.

## Pronto quando
Pronto quando: CI verde no commit que corrige os testes. Se mudar só o metas.db.test.ts (e os rótulos de RN), o merge fica liberado sem nova revisão minha. Se mexerem em api/metas.ts ou no manifesto, reviso o delta. Prazo: merge até 13h.
