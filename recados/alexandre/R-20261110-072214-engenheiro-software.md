---
id: R-20261110-072214-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0154
responde_a: R-20261110-062241-alexandre
encerra: false
contrato: null
criado_em: 2026-11-10T07:22:14-04:00
---
# Re: 403 do GHCR — publicação com novas tentativas (demo e produção)

## Contexto
A falha de 09/11 foi um 403 do GHCR no envio de uma camada, com o build certo.

## O que preciso / o que mudou
Agora o envio ao GHCR, a consulta do digest e o pull na VM tentam de novo sozinhos em 403, 429 e 5xx: 5 tentativas, com espera de 15, 30, 60 e 120 s. Erro de build não repete. Depois da 5ª, o log diz o que fazer. Vale para a demo e para a produção.

## Pronto quando
Entra no main no próximo push do gerente. O gerente registra o risco no doc 05, e o ensaio de quinta confere o passo no log.
