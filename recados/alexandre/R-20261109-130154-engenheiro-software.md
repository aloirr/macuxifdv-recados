---
id: R-20261109-130154-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0139
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T13:01:54-04:00
---
# Telegram recusa com HTTP 403 (bot sem permissão no chat): /start no bot, conferir TELEGRAM_CHAT_ID e publicar a correção

## Contexto
Resposta ao R-20261109-121702-alexandre, item 2 (Telegram), e ao R-20261109-115502-gerente-projetos.

**Causa:** o Telegram recusou todas as mensagens com **HTTP 403**:
- o aviso da migração (run 42594210632) teve 11 tentativas recusadas;
- o resumo das 07h19 (run 42608108894) também foi recusado;
- uma execução manual de hoje às 13h31 (run 42665391542) foi recusada de novo, então a falha **não é transitória**.

O que o 403 descarta:
- **Não é token errado:** daria 401.
- **Não é volume nem limite da API:** daria 429, e o resumo manda uma mensagem só.
- **Não é parse de recado nem secret ausente:** os dois secrets existem e o script chegou a chamar a API.

O 403 quer dizer que o bot está proibido de escrever no chat do `TELEGRAM_CHAT_ID`. As causas possíveis são três:
- (a) você nunca mandou `/start` ao bot;
- (b) o bot está bloqueado;
- (c) o `TELEGRAM_CHAT_ID` é o id do próprio bot, ou seja, o número antes de `:` no token.

O resumo das 22h35 de 08/11 deu verde só porque não tinha novidade e não chamou o Telegram. O Telegram nunca entregou nenhuma mensagem.

**Correção:** está no desenho `docs/desenho/T-0139-repo-recados/`, com 25/25 testes verdes:
- O erro agora traz a mensagem do Telegram e o que fazer, sem token e sem chat id.
- Um chat id igual ao id do bot é recusado antes da chamada, com uma mensagem clara.
- No HTTP 429, o script espera e tenta mais uma vez.
- Um push com mais de 10 recados vira uma mensagem só, com 1 s entre os avisos. A migração de 295 recados teria mandado 11 mensagens seguidas.
- O README ganhou a seção "Telegram falhou?".
- O `telegram-recado.yml` NÃO entra, porque espera a sua decisão.

## O que preciso / o que mudou
1. **No Telegram:**
   - Abra o bot e mande `/start`. Se ele estiver bloqueado, desbloqueie antes.
   - Confira o `TELEGRAM_CHAT_ID` em Settings → Secrets and variables → Actions do `macuxifdv-recados`. Ele NÃO pode ser o número antes de `:` no token.
   - Para achar o id certo: depois do `/start`, abra no navegador `https://api.telegram.org/bot<TOKEN>/getUpdates` e use o número de `"chat":{"id":...}`.
   - Não cole esse endereço em lugar nenhum, porque ele leva o token.
2. **Publicação da correção.** Os agentes não podem gravar no clone. No PowerShell:
```powershell
$d = 'C:\macuxifdv\docs\desenho\T-0139-repo-recados'; $r = 'C:\macuxifdv-recados'
git -C $r pull --rebase --autostash
Copy-Item "$d\.github\scripts\recados-lib.mjs","$d\.github\scripts\recados-lib.test.mjs","$d\.github\scripts\aviso-telegram.mjs" "$r\.github\scripts\" -Force
Copy-Item "$d\README.md" "$r\README.md" -Force
Push-Location $r; node --test .github/scripts/recados-lib.test.mjs; Pop-Location
git -C $r add .github/scripts/recados-lib.mjs .github/scripts/recados-lib.test.mjs .github/scripts/aviso-telegram.mjs README.md
git -C $r commit -m "telegram: erro com a mensagem do Telegram e a dica, 429 com nova tentativa, carga em lote numa mensagem (T-0139)"
git -C $r push
```
   - Não use `robocopy .github /E`: ele levaria o `telegram-recado.yml`.
   - No clone, o `node --test` roda 12 testes: os 2 que dependem do coord.mjs ficam pulados.
3. **Teste:** depois do passo 1, abra Actions → resumo de hora em hora → Run workflow, ou rode `gh workflow run --repo aloirr/macuxifdv-recados status-horario.yml`.
   - O marcador está parado em 22h35 de 08/11, então o resumo traz tudo o que ficou pendente desde então.
   - Se o resumo falhar de novo, o log, já com a correção publicada, diz qual das causas (a), (b) ou (c) é.

## Pronto quando
- O "resumo de hora em hora" fica verde com a mensagem no seu Telegram.
- O próximo recado para `alexandre` chega como aviso.

Observação: o cron do resumo só disparou 2 vezes entre a criação, às 18h48 de 08/11, e 13h30 de 09/11 (22h35 e 07h19). O GitHub descarta agendamentos sob carga. O resumo seguinte recupera tudo, porque o marcador só avança depois de um envio que deu certo.
