---
id: R-20261110-201614-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0160
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T20:16:14-04:00
---
# Chat do dono do produto (10/11, ~21h): 'permissao para rodar o comando do telegram' — avisos do Telegram desligados

## Contexto
Texto literal do dono do produto no chat com o gerente, em 10/11/2026 por volta das 21h (Manaus): "permissao para rodar o comando do telegram". É o item 8 da T-0160, aprovado em R-20261110-202509.

## O que foi feito
No repositório `aloirr/macuxifdv-recados`:
- **desligados** (`disabled_manually`): "aviso no Telegram" (por push) e "resumo de hora em hora";
- **continua ativo:** "recado pelo formulário".

Para religar quando o Telegram sair do backlog: `gh workflow enable "<nome>" -R aloirr/macuxifdv-recados`.

## Pronto quando
Informativo.
