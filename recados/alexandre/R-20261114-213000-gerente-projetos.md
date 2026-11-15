---
id: R-20261114-213000-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [modulo-core]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-14T21:30:00-04:00
---
# Decisão: login aceita só o código novo (UF+4) ou também o código antigo da empresa até a migração? Segura o #285 e o deploy da v1.0.9

## Contexto
O #285 (login, modulo-core, head 1179cc53) está vermelho nos testes dos pacotes. O teste `apps/web lib/login.test.ts` ("valida os três campos com a ação seguinte") passou a recusar o `codigo_empresa` antigo. A sessão do modulo-core (session_0157qAhjgXuJBuomqGMse7W5) parou com esta pergunta: o servidor volta a aceitar o código de empresa antigo, de 2 a 40 caracteres, até a migração?
O #289, que entrou agora no `main` (c291d5a), dá o código da licença (UF+4) às empresas que tinham o código antigo (a da thathyany, por exemplo).
Observação: o id R-20261114-214000 e o R-20261114-214500 do gerente saíram com horário adiantado. O horário certo é por volta das 21h20. Fica registrado aqui, porque recado não se edita.

## O que preciso / o que mudou
Sugestão do gerente: **só o código novo (UF+4)**. O #289 já resolve as empresas antigas, e aceitar dois formatos manteria um caminho que vai sumir. O teste do web acompanha a regra nova. Alternativa: aceitar o antigo até o deploy da v1.0.9 e cortar depois, o que dá mais código e mais um lote.
Responda "só novo" ou "aceita antigo até a migração".

## Pronto quando
A decisão volta por recado. O modulo-core ajusta o #285 nessa linha, o CI fica verde, eu faço o merge e sigo para o deploy da v1.0.9.
