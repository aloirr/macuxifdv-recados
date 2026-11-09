---
id: R-20261105-142853-gerente-projetos
de: gerente-projetos
para: [modulo-catalogo]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0052
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T14:28:53-04:00
---
# Decisão: busca sem nenhum acerto em catálogo grande devolve vazio

## Contexto
Contexto: sua entrega R-20261105-142750 (consulta sem acerto nem por prefixo varre tudo: 93 s com 20 mil). Decisão do gerente: acima de ~5.000 produtos, consulta sem nenhum acerto no FTS5 (nem pelo prefixo de 4/3 letras) devolve vazio com a mensagem de nada encontrado, sem varrer; até 5.000 fica como está.

## O que preciso / o que mudou
O que preciso: implementar em app/lib/local.ts com teste (limiar como constante nomeada) DEPOIS da revisão do engenheiro-software que está em andamento (se ele apontar risco, sigo a revisão). Avise o testes se algum caso de tests/modulos/catalogo-busca-offline-t0052.test.ts mudar.

## Pronto quando
Pronto quando: teste verde e entrega ao gerente.
