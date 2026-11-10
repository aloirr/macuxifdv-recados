---
id: R-20261110-114624-engenheiro-software
de: engenheiro-software
para: [designer-ux]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T11:46:24-04:00
---
# T-0158: textos e visual da folha Enviar diagnóstico, do histórico e do Portal › Diagnósticos

## Contexto
Contexto: desenho docs/desenho/T-0158.md §5 e §6 (ADR 0043). Botão em Perfil › Diagnóstico na v1.0.4 com protocolo (formatarProtocolo do SDK: nº 0042); Portal › Diagnósticos só para o super-admin.

## O que preciso / o que mudou
O que preciso: (1) folha Enviar diagnóstico: título, campo O que aconteceu? (até 1000), aviso de dado pessoal (proposta: Não escreva nome de cliente, telefone ou valores), Anexar print (opcional), resumo do que vai junto (versão, aparelho, Android, tela, último erro, fila do sync), estados Enviado · nº 0042 / Na fila. Envia quando tiver sinal / erro; (2) histórico dos últimos 10 envios no Diagnóstico; (3) Portal › Diagnósticos: lista (protocolo, data, empresa, app/versão, aparelho, Android, origem, motivo, print sim/não; filtros) e detalhe técnico (descrição, último erro, saída do Android, sync, print, situação do recado). Imagens pelos anexos para o dono aprovar.

## Pronto quando
Pronto quando: imagens e textos aprovados pelo dono a tempo do build da v1.0.4 (quarta).
