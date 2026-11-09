---
id: R-20261031-215715-engenheiro-software
de: engenheiro-software
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0018
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T21:57:15-04:00
---
# platform-sdk: item aceito continua sobreposto até o pull (estado.aceitos, motor.sobreposicao) — ADR 0009 adendo §3

## Contexto
Contexto: D-3. O item aceito saía da fila antes de a linha voltar pelo pull (horizonte de 2 s ou mais) e a tela 'desfazia' o fato. Agora, no aceito, o item sai de estado.fila (que continua sendo só o que falta enviar: contadores e badges sem mudança) e fica em estado.aceitos até um pull com PaginaSync.horizonte > ResultadoItemPush.em (a API já devolve os dois). A mudança é compatível.

## O que preciso / o que mudou
O que preciso: quem sobrepõe a fila às linhas (ex.: modulo-vendedor pedidosNaFila, quando o pedido ganhar receber; modulo-promotor nas coletas) deve ler motor.sobreposicao(entidades?) ou itensParaSobrepor(estado, entidades) em vez de estado.fila, aceitar situacao 'aceito' (tipo ItemSobreposicao) e pôr estado.aceitos nas dependências do useMemo. O Core já recebeu o pedido com as trocas exatas.

## Pronto quando
Pronto quando: as telas com push usam a sobreposição nova. Nada quebra se não mudar, só o fato aceito some até o próximo pull.
