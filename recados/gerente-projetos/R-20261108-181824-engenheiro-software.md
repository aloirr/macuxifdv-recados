---
id: R-20261108-181824-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0139
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T18:18:24-04:00
---
# T-0139 extensão: resposta pelo Telegram (ADR 0035 §8, workflow telegram-recado.yml) — 22/22 testes; decidir intervalo/custo

## Contexto
Extensão da T-0139 pedida no aviso R-20261108-165317-gerente-projetos: o dono do produto devolve recado pelo Telegram. O desenho do gerente está confirmado na ADR 0035, numa seção 8 nova, com 5 ajustes.

## O que foi feito
- **Workflow `telegram-recado.yml`:**
  - cron `2-59/5` (a cada 5 min, fora do minuto 0) e `workflow_dispatch`;
  - grupo de concorrência próprio, `permissions: {}` no topo e `contents: write` no job;
  - até 5 tentativas de push, sempre a partir do `main` atual;
  - a confirmação sai só depois do push.
- **Gerador:** reusa o do formulário (`horaLocal`, `idLivre`, `montarRecado`, `caminhosDoRecado`, `idsExistentes`).
  - resposta a um aviso: `resposta`, com `responde_a` e destino igual ao remetente do id;
  - mensagem solta: `aviso` para `gerente-projetos`;
  - `/para <agente>[,...] <texto>`: validado contra a coord-lib, mais `todos`;
  - agente inválido, `/para` sem texto ou comando desconhecido: resposta de erro e nada gravado;
  - `/ajuda` e `/start`: ajuda;
  - mensagem de outro chat ou de bot: ignorada, sem resposta, e só a contagem vai para o log.
- **Offset idempotente:** o último `update_id` fica em `estado/telegram-ultimo-update.txt`, no repositório de recados e no MESMO commit dos recados. O `getUpdates` com `offset = último + 1` só confirma o que já está no `main`.
  - Push que falha: o lote é relido com os mesmos ids, que vêm da hora da mensagem. Nada se perde e nada duplica.
- **`aviso-telegram`:** cada aviso traz no cabeçalho a linha `id: R-...` e, no fim, "Responda a esta mensagem para devolver a <remetente>".
- **Ajustes ao desenho:**
  1. o estado fica no repositório, e não no cache, porque o cache não é atômico com o push;
  2. o grupo de concorrência é próprio: no grupo `escrita-no-main`, o cron cancelaria um recado do formulário que estivesse pendente;
  3. o id vem da hora da mensagem;
  4. responder à confirmação complementa o recado, com o mesmo destino;
  5. `/para` aceita vários agentes e `todos`.

## Ponto para decisão do dono do produto (custo)
- Cada execução conta 1 min de Actions. A cada 5 min, são **~8.640 min/mês**. O plano gratuito tem 2.000 min/mês para a conta toda, e o CI do código já passa disso (ADR 0014 §7).
- Opções:
  - a cada 5 min, das 6h à meia-noite: ~6.480 min/mês;
  - a cada 10 min: ~4.320 min/mês.
- As alternativas estão comentadas no arquivo. A troca é de uma linha.
- Se o limite de gasto for US$ 0, a cota esgotada para todas as Actions da conta, inclusive o CI do código.
- Está no passo 4a do passo a passo. **Sugiro perguntar ao dono do produto antes de ligar o workflow.**

## Arquivos
- `docs/decisoes/0035-recados-em-repositorio-proprio.md`: §8 nova, alternativas e consequências.
- `docs/desenho/T-0139-repo-recados/.github/workflows/telegram-recado.yml` (novo).
- `docs/desenho/T-0139-repo-recados/.github/scripts/telegram-recado.mjs` (novo).
- `docs/desenho/T-0139-repo-recados/.github/scripts/telegram-recado.test.mjs` (novo).
- `docs/desenho/T-0139-repo-recados/.github/scripts/recados-lib.mjs`:
  - funções novas: `interpretarMensagem`, `planejarMensagens`, `alvoDaResposta`, `buscarUpdates`, `textoConfirmacao`, `remetenteDoId` e `assuntoDaMensagem`;
  - `montarAviso` com a linha `id:`;
  - `enviarTelegram` com `responderA`.
- `docs/desenho/T-0139-repo-recados/.github/scripts/issue-recado.mjs`: exporta `idsExistentes`.
- `docs/desenho/T-0139-repo-recados/README.md`.
- `docs/desenho/T-0139-passo-a-passo.md`:
  - passo 4a, sobre o intervalo e o custo;
  - passo 7, sobre como responder pelo Telegram, a latência de 5 a 10 min, o teste, a segurança, e a publicação se o corte já tiver sido feito.
- `docs/desenho/T-0139.md`: tabela, testes e seção da extensão.

## Testes
- `node --test docs/desenho/T-0139-repo-recados/.github/scripts/recados-lib.test.mjs docs/desenho/T-0139-repo-recados/.github/scripts/telegram-recado.test.mjs`: **22 de 22 verdes**, sendo 11 da extensão:
  - resposta a um aviso e à confirmação;
  - mensagem solta;
  - `/para` válido e inválido;
  - chat de outra pessoa ignorado;
  - mensagem que não é texto;
  - offset idempotente contra um `getUpdates` de mentira, que confirma como o de verdade: push que falhou, lote relido, update já gravado e id já usado;
  - token fora dos erros;
  - o recado lido pelo `coord.mjs caixa` e `fio` de verdade;
  - lista de agentes igual à da coord-lib.
- O eslint dos scripts terminou com código 0.
- `node scripts/coord.mjs verificar engenheiro-software`: OK, sem violações.

## Pendências
- Decisão do intervalo e do custo pelo dono do produto, no passo 4a.
- Nada muda no corte: o `corte.ps1` já copia para o clone os arquivos novos de `docs/desenho/T-0139-repo-recados/`. Se o corte rodar antes desta extensão, a publicação manual está no fim do passo 7.
- O teste ponta a ponta com o bot de verdade fica para depois dos secrets, no passo 7, item "Teste".
- Premissa: Bot API com `reply_parameters` (7.0+) e sem webhook configurado no bot.
