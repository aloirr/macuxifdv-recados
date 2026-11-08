# macuxifdv-recados

Recados do time Macuxi FDV, fora do repositório de código. Decisão: ADR 0035 do repositório `aloirr/macuxifdv` (T-0139). **Repositório privado.**

## Estrutura

Igual à de antes, em `.coord/` do repositório de código:

- `recados/<destino>/R-AAAAMMDD-HHMMSS[-n]-<remetente>.md`: um arquivo por recado e por destino. Recados são imutáveis.
- `recados/anexos/`: anexos citados nos recados do dono do produto.
- `estado/`: marcadores das Actions (hoje, o último update do Telegram já gravado). Fora das junções do PC.
- `lidos/<agente>.txt`: um id por linha. No `.gitattributes`, `merge=union`, então dois agentes marcando ao mesmo tempo não geram conflito.

O formato do recado é o do `node scripts/coord.mjs enviar` (doc 07, "Protocolo de recados").

## Como chega e sai

- **PC do dono do produto:** `C:\macuxifdv\.coord\recados` e `.coord\lidos` são junções (`mklink /J`) para este clone, em `C:\macuxifdv-recados`.
  - Os agentes usam o `coord.mjs` como sempre.
  - O `scripts\sincronizar-recados.ps1` do repositório de código faz pull --rebase, commit e push a cada 2 min (Agendador de Tarefas) e no início e no fim de cada sessão.
- **Celular:** a issue com o formulário **Recado** vira o arquivo do recado (`issue-recado.yml`), e a issue é fechada com o link.
  - Vale só para issue aberta pela conta `domontecristo`.
- **Telegram:**
  - `aviso-telegram.yml`: avisa cada recado novo em `recados/alexandre/`, com o título e as primeiras linhas.
  - `status-horario.yml`: manda um resumo de hora em hora das novidades de `todos/` e da caixa do dono do produto, só quando há novidade.
  - `telegram-recado.yml`: a cada 5 min, as mensagens do dono do produto ao bot viram recado `R-...-alexandre.md`:
    - resposta a um aviso de recado volta para quem mandou, com `responde_a`;
    - mensagem solta vai para o `gerente-projetos`;
    - `/para <agente> <texto>` vai para o agente; `/ajuda` mostra como usar.
    - Só o chat `TELEGRAM_CHAT_ID` é aceito. O bot confirma com o id do recado.
    - `estado/telegram-ultimo-update.txt` guarda o último update gravado, no mesmo commit dos recados. Não edite.

## Secrets (Settings → Secrets and variables → Actions)

- `TELEGRAM_BOT_TOKEN`: o token do bot (BotFather).
- `TELEGRAM_CHAT_ID`: o id do chat do dono do produto com o bot.

Nenhum segredo fica em arquivo. Os workflows mascaram os dois valores no log.

## Regras

- Não edite nem apague recado: responda com um recado novo.
- Não faça force push: a sincronização do PC e o Actions só fazem push normal, com rebase.
- Os testes dos scripts das Actions são `node --test .github/scripts/recados-lib.test.mjs .github/scripts/telegram-recado.test.mjs` (Node 24).
