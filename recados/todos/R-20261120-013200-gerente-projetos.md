---
id: R-20261120-013200-gerente-projetos
de: gerente-projetos
para: [todos]
cc: [alexandre, engenheiro-software, engenheiro-apps, modulo-core, modulo-vendedor, modulo-gestor, modulo-pesquisa, designer-ux, testes]
tipo: aviso
prioridade: alta
tarefa: T-0187
responde_a: R-20261119-181423-alexandre
encerra: false
contrato: null
criado_em: 2026-11-20T05:32:00Z
---
# PRONTO PARA LIBERAR v1.0.16 (servidor + APK), SHA 85b9e9b47f5a8e08708d86367363a1c34b5ed44c

## SHA para o deploy e o APK
**85b9e9b47f5a8e08708d86367363a1c34b5ed44c**: main, squash do #519 (PR conjunto, um commit por dono), de 20/11 à 1h18 de Manaus. O APK Campo e Gestão v1.0.16 sai deste mesmo SHA, pelo `android-build.yml`.

## O que entra
- **T-0187, supervisor em campo no app Gestão:**
  - rota com check-in e checkout (RN-CORE-13 e 37);
  - rastreamento interno: a permissão é pedida logo depois do login e só o gerente autorizado vê;
  - ficha do cliente com Check-in, Pesquisa e Novo pedido em nome do vendedor (RN-VEN-35). O padrão é o vendedor da carteira, a lista traz só a equipe e a API revalida. Ninguém aprova o próprio pedido.
- **PDF na ficha:** abre NF e Documentação (ADR 0064), sem guardar nada no aparelho.
- **Tabela Carteira do Gestão:** Ligar e WhatsApp, com o contato buscado online (T-0168).
- **Barra do Gestão:** 6 abas fixas, com o resto no menu do Perfil (Mc161 A). Ícone novo "equipe".
- **Diagnóstico só leitura da outbox** (#518, já no main): espera o §6 e os códigos das empresas.

## Conferido
1. **Main verde** em 85b9e9b4: CI do push, run 44680009884, com o `ci-ok` verde.
2. **corretor-redundancias:** **LIBERADO** no 22958228, a mesma árvore do head 953d4cd9 do #519, sem nenhum achado em aberto. Os RD-2468 e RD-2469, de código de teste, foram corrigidos antes do lote.
3. **design-de-marca:** **LIBERADO**, com MC-0160, MC-0161 e MC-0162 fechadas.
4. **engenheiro-software:** sem 🔴 nem 🟡. Lint e typecheck verdes no core, no gestor e no mobile. As fronteiras deram 0 erros e o `install --frozen-lockfile` passou.
5. **testes:**
   - `tests/` com Postgres: 2.252 verdes e 0 vermelhos;
   - `*.db.test.ts` verdes: core 411, vendedor 115, gestor 6, pesquisa 36 e db 353;
   - critérios 1 a 21 da T-0187 cobertos. As partes de tela e aparelho ficam no roteiro manual.

## Para o lote seguinte (sem segurar)
- Só em comentário: RD-2379, RD-2413, RD-2448, RD-2450 e o comentário do teste do trajeto.
- `db/testes/empresa-acoes.db.test.ts:415` (banco-dados): caiu uma vez por deadlock no Postgres local e passou nas repetições.
- SSH comum dos workflows, o 🟢 do "Enviando…" e as RN-VEN-43 a 46 no doc 03.

## Próximo passo
- **Alexandre:** o deploy da v1.0.16 ainda **não está aprovado**. O "Acelere" aprovou o escopo. Para liberar, ele escreve "aprovo deploy v1.0.16".
- **Ponte**, com essa frase:
  - disparar o "producao — liberar versão" com `versao=v1.0.16` e `sha=85b9e9b47f5a8e08708d86367363a1c34b5ed44c`;
  - o Alexandre comenta "aprovado v1.0.16" na issue.
- **Gerente**, depois da publicação:
  - conferir o /v1/saude, o BKO e o portal;
  - disparar o APK pelo `android-build.yml` no mesmo SHA;
  - gravar o recado "v1.0.16 no ar" com os minutos do Actions.
