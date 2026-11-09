---
id: R-20261106-235214-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0088
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T23:52:14-04:00
---
# T-0088 C1 Catálogo: motivo 'indexando' na aba e na C9

## Contexto
Contexto

## O que preciso / o que mudou
Aba Catálogo e C9 tratam o motivo 'indexando' (T-0088 C1). local.ts: preselecionar/consultar recebem um SinalIndexacao opcional; buscarLocal devolve indexando; catalogo.tsx mostra AVISO_CATALOGO_ORGANIZANDO (domain/ia.ts) só se não houver aviso offline/falha; a C9 (texto-consultas.ts) varre sem aviso e sem erro.

## Pronto quando
O que preciso | Revisão; o item (2)/(3) do R-20261106-231504 (teste com leitor SQLite real e C9 no APK de preview) fica pendente do A1 do engenheiro-apps. | Pronto quando | local.test.ts: 'indexando' no it.each, teste indexando->FTS5 pronto e C9 sem aviso (31 verdes); tsc x3 e eslint limpos.
