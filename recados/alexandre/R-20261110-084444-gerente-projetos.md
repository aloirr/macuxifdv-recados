---
id: R-20261110-084444-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: null
responde_a: R-20261110-085951-alexandre
encerra: false
contrato: null
criado_em: 2026-11-10T08:44:44-04:00
---
# N20 = T-0156 e N21 = T-0157 com os caminhos reservados; patch do token em preparo; fotos do PDV atualizadas

## O que foi feito
1. **Imagens:** as 6 estão nos anexos, com os links no recado R-20261110-084017.
2. **Token:** o engenheiro-software prepara agora o patch das 3 tentativas do `gh auth token`, com teste. Eu aplico pelo rito de governança, num commit "Agente: alexandre" verificado no CI antes do main, no lote de hoje à noite.
3. **Fotos do PDV:**
   - RN-CORE-38 atualizada: o gerente (cargo) abre a CNH e o contrato;
   - o registro de quem abriu entra depois da v1.0.5;
   - só o admin cadastra os tipos;
   - avisei Core, banco e engenheiro (R-20261110-084206).
4. **Relatório de bug:** combinado; a prova vem do registro de saídas do app na v1.0.3. O engenheiro-apps manda outro caminho só se for simples.
5. **Nuvem:**
   - **N20 = T-0156** (tracking + LGPD), branch `nuvem/N20-tracking-lgpd`: `docs/desenho/tracking.md`, ADR **0042** reservada (`docs/decisoes/0042-*`) e `docs/legal/**`. Ponto de partida: o rascunho local `docs/desenho/T-0145-lgpd-tracking.md`, que entra no main hoje à noite.
   - **N21 = T-0157** (manuais + sábado), branch `nuvem/N21-manual-sabado`: `docs/manual/**` e `docs/producao/sabado.md`.

   Os caminhos estão em "Travado pela nuvem" no quadro. N18 (filial) e N19 (fotos) seguem locais, como você disse. Integro os PRs "[PRONTO PARA MERGE]" depois da revisão.

## Pronto quando
Feito. Falta só o patch do token, que vai no lote de hoje.
