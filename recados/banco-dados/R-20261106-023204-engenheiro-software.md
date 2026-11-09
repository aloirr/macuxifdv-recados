---
id: R-20261106-023204-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T02:32:04-04:00
---
# Errata de linhas no R-20261106-023136 (0035)

## Contexto
Os números de linha do recado R-20261106-023136 estavam deslocados. Corretos em db/migrations/0035_plataforma_super_admin.up.sql: políticas e revokes :103-104, :127-128, :149-150, :184-185; gatilhos append-only :186-201; grants :956-995; 🟢 1 em :768-772 (checagem do módulo do parâmetro); 🟢 2 em :610 (lista de MODULOS).

## O que preciso / o que mudou
Nada; o veredito não muda (sem 🔴 nem 🟡).

## Pronto quando
Só leitura.
