---
id: R-20261113-101646-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [gerente-projetos]
tipo: bloqueio
prioridade: alta
tarefa: null
responde_a: R-20261113-081825-alexandre
encerra: false
contrato: null
criado_em: 2026-11-13T10:16:46-04:00
---
# BLOQUEIO: desde a reabertura o guardião trata todo subagente como gerente-projetos; nenhum agente local grava. Escolha A (guardião off), B (nuvem) ou C (patch)

## Contexto
Resposta às cobranças R-20261113-074128 e R-20261113-081825. A sessão local está **parada numa permissão**.

**O que aconteceu:**
- O "PRONTO PARA MIGRAR" saiu às 8h07 (R-20261113-080735, branch `agente/migracao-2026-11-13` em `e48d3a05`).
- Às 8h10 você pediu para não migrar. Retomei e lancei 5 agentes às 8h30 (R-20261113-083639).
- **Desde a reabertura do VS Code, o guardião trata todo subagente como `gerente-projetos`.** O modulo-core tentou editar `modules/core/contracts/sync.ts` e foi recusado com "pertence a modulo-core". Ele não contornou.
- O guardião (`identificarAgente` em `scripts/coord-lib.mjs`) só reconhece o subagente se o hook receber o `agent_id` e o `agent_type` dele. Nesta sessão, o hook está recebendo a identidade da sessão principal. **Nenhum agente local consegue gravar.**
- É governança (`.claude/` e `scripts/coord*`), e o conserto é seu. Não contornei.

**Achado do core, que segura o M0:** em `modules/core/contracts/sync.ts`, o regex de `ultima_visita_data` está `/^d{4}-d{2}-d{2}$/`, sem a barra invertida. Ele recusa toda data válida e pode quebrar o sync da T-0171. O certo é `/^\d{4}-\d{2}-\d{2}$/`.

## O que preciso: escolha um caminho agora
- **(A) O mais rápido para as 13h:**
  1. Feche o VS Code.
  2. Abra de novo com o guardião desligado. No PowerShell: `$env:MACUXI_GUARDA="off"; code C:\macuxifdv`.
  3. Mande "retome a esteira".

  Os agentes seguem só os próprios caminhos por disciplina. O CI de governança do main continua conferindo donos e trailer no push.
- **(B) O M0 vai pela nuvem:**
  - uma sessão parte da branch `agente/migracao-2026-11-13`, com os arquivos de governança do main, e monta o lote com o CI decidindo (R-20261113-074157);
  - a sessão do modulo-core da nuvem corrige o regex.
- **(C) Conserto do guardião:** o engenheiro-software prepara o patch e você aplica pelo rito. É mais lento e passa das 13h.

**Previsão, se você responder agora:**
- **com (A):** M0 até as 11h30 e Campo-Demo-v1.0.5 por volta das 13h30;
- **com (B):** por volta das 14h.

## Pronto quando
Caminho escolhido, e a sessão local voltando a gravar.
