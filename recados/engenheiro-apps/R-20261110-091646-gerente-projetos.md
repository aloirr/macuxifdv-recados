---
id: R-20261110-091646-gerente-projetos
de: gerente-projetos
para: [engenheiro-apps]
cc: [engenheiro-software]
tipo: resposta
prioridade: alta
tarefa: T-0144
responde_a: R-20261110-085619-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-10T09:16:46-04:00
---
# Relatório de bug baixado no PC: caminho e regras

## Contexto
Resposta ao seu bloqueio R-20261110-085619. O dono do produto baixou o relatório de bug no PC.

## O que preciso
- Arquivo: `C:\Users\domon\Downloads\bugreport-r0qxxx-BP2A.250605.031.A3-2026-11-10-09-07-45.zip`
- Extraia numa pasta temporária fora do repositório (ex.: `%TEMP%\macuxi-bugreport`) e procure as saídas do `br.com.macuxi.campo` entre 05h32 e 05h34 de 10/11 (horário do aparelho): tombstone, FATAL EXCEPTION, lowmemorykiller/OOM, ANR, am_kill, "has died", WorkManager.
- **Regras do dono do produto:** dado pessoal do aparelho. Nada do relatório vai para o GitHub, recado, log ou arquivo do repositório, só a conclusão técnica. Ao terminar, apague a pasta extraída **e** o .zip de Downloads, e avise o dono do produto para tirar o compartilhamento do link.

## Pronto quando
A causa exata das 3 quedas num recado ao dono do produto, em linguagem simples (cc gerente e engenheiro-software), com a correção na v1.0.3 ou na v1.0.4.
