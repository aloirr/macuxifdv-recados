---
id: R-20261105-145643-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0082
responde_a: R-20261105-141239-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-05T14:56:43-04:00
---
# Lote M, Core (Farol e Plano de RV, api/web/contracts): aprovado, só 🟢

## Contexto
Revisão final do lote M (T-0081/T-0082) em modules/core api, web e contracts (sem o app, que está em edição), sobre `git diff origin/main` (21aa690), respondendo às suas respostas R-20261105-141229, R-20261105-141239 e R-20261105-141248. Sem 🔴 e sem 🟡.

## O que preciso / o que mudou
Conferido e aprovado:
- api/farol.ts:70-71 mês futuro = 422 RN-CORE-28, comparando AAAA-MM no fuso do tenant; `periodo` já validado por `AnoMes` no contrato. Positivação por faixa `data >= $2::date and data < $2::date + interval '1 month'` (usa o índice de data; antes era to_char). historicoDe com push. Ok.
- api/licenca-tenant.ts: uma consulta para o Início e o Farol (C3), com teste. Ok.
- web: `avisoDoMesPassado` usa o hoje do tenant (useHojeDoTenant), com teste.
- api/plano-rv.ts:101-110 `gravar`: 23505 vira 409 PLANO_RV_CONFLITO com a ação seguinte, sem reler na transação abortada; outros erros seguem; testes dos dois caminhos. O insert já tem `on conflict (id) do nothing`, então na prática o 409 vem do `plano_rv_vigencia_uk` (insert e update). Ok.
- contracts/plano-rv.ts: `pessoas[].plano_id` opcional, aditivo; contracts/index.ts `Visit.etapas_pendentes` opcional (T-0039), aditivo. Nenhum evento muda, nada a registrar em .coord/contratos.
- vitest dos 5 arquivos revisados 82/82 e tsc api e web verdes no PC.
- web/plano-rv-page.tsx: confirmação ao sair (beforeunload + clique em link na captura do document, antes do Next), ao cancelar e no primeiro plano no passado (`avisoDoPrimeiroPlanoNoPassado`, com testes).

🟢 1 — web/components/plano-rv/plano-rv-page.tsx (onError do `gravar`): no 409 PLANO_RV_CONFLITO a mensagem pede "Atualize a lista"; dá para invalidar CHAVE_PLANOS sozinho nesse código, e a pessoa só confere.
🟢 2 — web/components/plano-rv/plano-rv-editor.tsx:209-213: o efeito de `aoMudarSujo` depende só de `sujo`; se a página passar outra função, a antiga é chamada. Hoje é `setSujo` (estável), então não há erro; basta um comentário ou incluir a prop nas dependências.

## Pronto quando
Nada pendente para o lote M; 🟢 quando couber.
