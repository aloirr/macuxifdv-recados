---
id: R-20261113-080735-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [todos]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: R-20261113-070758-alexandre
encerra: false
contrato: null
criado_em: 2026-11-13T08:07:35-04:00
---
# PRONTO PARA MIGRAR: branch agente/migracao-2026-11-13 @ e48d3a05; retomada em docs/status/retomada-2026-11-13.md

## Contexto
Resposta ao R-20261113-070758 (migração de notebook). **PRONTO PARA MIGRAR.**

- **Branch:** `agente/migracao-2026-11-13`, link https://github.com/aloirr/macuxifdv/tree/agente/migracao-2026-11-13
- **Último commit:** `e48d3a05`

**O que foi feito:**
1. **Esteira parada.** Não há agente rodando nesta sessão. O modulo-core e o testes foram interrompidos no fechamento do VS Code das 7h. O ponto em que pararam e o próximo passo estão na retomada (seção 4), porque o guardião não deixa o gerente escrever no diário de outro agente.
2. **Commit `7ae93e54` com toda a árvore sem commit:** 468 arquivos, incluindo o que está incompleto.
   - **Fora:**
     - `.github/workflows/*`, cópias locais mais antigas que o main;
     - tudo o que o `.gitignore` exclui. Nenhum `.env`, chave, token ou certificado entrou; conferi o `git status` antes.
3. **Commit `e48d3a05`:**
   - `docs/status/retomada-2026-11-13.md`;
   - `.coord/ferramentas-gerente/`, com as ferramentas do gerente que só existiam no PC: lote, ensaio, timer e anexos.
4. **O main não foi tocado.**
5. **Recados:** não há recado só local. Todos vão direto ao repositório de recados.

## A retomada (`docs/status/retomada-2026-11-13.md`) traz
- O que cada agente fazia, o que está pronto, o que está pela metade e o próximo passo.
- O estado do M0:
  - T-0165 e T-0167 liberadas;
  - T-0166 em reteste;
  - T-0168: vendedor, gestor e banco prontos; core pela metade;
  - T-0171: core pela metade;
  - T-0172: código pronto, falta a validação do design-de-marca no print.
- Os prazos:
  - v1.0.5 às 13h, com corte às 11h30;
  - v1.0.6 às 20h, com corte às 18h30;
  - Oficial sábado às 12h;
  - BKO e web fora do build.
- As regras de hoje (R-20261113-062739).
- **Atenção:** os `scripts/coord*.mjs` da branch são mais antigos que o main. No lote, mantenha os do main. Não faça merge da branch inteira.

## Levar à mão (fora do git)
**Arquivos de segredo** (copie o arquivo inteiro, com segurança):
- `C:\macuxifdv\.env`;
- `C:\Users\domon\.ssh\macuxi-deploy` e `.pub` (VM de demo);
- `C:\Users\domon\.ssh\macuxi-prod-deploy` e `.pub` (VM de produção);
- `C:\Users\domon\.ssh\known_hosts` (opcional).

**Logins para refazer:**
- `gh auth login` (conta aloirr, repo; para macuxifdv e macuxifdv-recados);
- `npx eas login` (Expo; a assinatura Android fica no EAS);
- a conta do Claude Code / VS Code.

**Pastas:**
- **`C:\Users\domon\dev\forca-vendas`** (Fase M): copie inteira; os testes contam com ela.
- `C:\macuxifdv-check` (checkout auxiliar do EAS): dá para recriar.
- O kit (`Downloads`) e os APKs da v1.0.4 já estão no GitHub e no EAS.

## O que preciso
Retomar no notebook novo com: "Retome a esteira: leia docs/status/retomada-2026-11-13.md (branch agente/migracao-2026-11-13) e a caixa do gerente".

## Pronto quando
A sessão está retomada no notebook novo.
