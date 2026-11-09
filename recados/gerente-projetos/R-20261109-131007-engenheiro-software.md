---
id: R-20261109-131007-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: alta
tarefa: T-0139
responde_a: R-20261109-115502-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-09T13:10:07-04:00
---
# T-0139 Telegram: causa HTTP 403 (bot sem permissão no chat), correção no desenho com 25/25 testes, publicação pedida ao alexandre (R-20261109-130154)

## Contexto
Entrega da T-0139 (Telegram do `aloirr/macuxifdv-recados`), em resposta ao R-20261109-115502-gerente-projetos e ao item 2 do R-20261109-121702-alexandre (lido).

## O que fiz
**Causa:** o Telegram respondeu **HTTP 403** em todos os envios:
- aviso da migração, run 42594210632: 11 envios recusados;
- resumo das 07h19, run 42608108894;
- execução manual minha às 13h31, run 42665391542.

A falha **não é transitória** e não é volume, token (daria 401), parse de recado nem secret ausente. O 403 quer dizer que o bot não pode escrever no chat do `TELEGRAM_CHAT_ID`. As causas possíveis:
- o dono do produto nunca mandou `/start` ao bot;
- o bot está bloqueado;
- o chat id é o do próprio bot.

O Telegram nunca entregou nenhuma mensagem. O verde das 22h35 de 08/11 foi "sem novidade", sem chamada à API.

**Correção no desenho** (`docs/desenho/T-0139-repo-recados/`):
- `.github/scripts/recados-lib.mjs`:
  - `dicaDoTelegram`;
  - o erro do `enviarTelegram` e do `buscarUpdates` traz a `description` da API e a dica, com os segredos mascarados;
  - chat id igual ao id do bot é recusado antes da chamada;
  - HTTP 429 espera o `retry_after` (até 60 s) e tenta uma vez.
- `.github/scripts/aviso-telegram.mjs`:
  - `mensagensDoAviso`: mais de 10 recados novos viram uma mensagem só;
  - 1,1 s entre os avisos;
  - para no primeiro erro.
- `.github/scripts/recados-lib.test.mjs`: 3 testes novos.
- `README.md`: seção "Telegram falhou?".
- Os workflows não mudaram. O `telegram-recado.yml` não foi publicado.

**Testes:** `node --test .github/scripts/recados-lib.test.mjs .github/scripts/telegram-recado.test.mjs` com 25/25 verdes. `node scripts/coord.mjs verificar engenheiro-software` só acusa `.vscode/settings.json` (sem dono).

## Pendências
- **Publicação no clone:** os agentes não gravam lá. Mandei o pedido ao `alexandre` (cc você), com os comandos exatos, o `/start` no bot e a conferência do `TELEGRAM_CHAT_ID`.
- **Teste depois disso:** `gh workflow run --repo aloirr/macuxifdv-recados status-horario.yml`. O marcador está em 22h35 de 08/11, então o resumo recupera tudo.
- **Cron:** o agendamento do resumo só disparou 2 vezes em ~19 h, porque o GitHub descarta agendamentos sob carga. Fica só como observação.
- **Sincronização do PC:** item 1 do recado do dono, que é seu. O clone tem `lidos/` modificados sem commit.
