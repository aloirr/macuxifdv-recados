---
id: R-20261106-033843-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T03:38:43-04:00
---
# Seletor do Novo pedido: SDK liberou a C9 no aparelho (falta o Catálogo); reserva local só em ConsultaIndisponivel

Contexto: critério 3 da T-0084 (seletor do Novo pedido, online e offline). Até agora `catalogo.busca_produtos@1` caía sempre em `ConsultaIndisponivel` no aparelho, porque a consulta não podia ler o `produto` do Core. O SDK passou a permitir que a consulta do aparelho leia as entidades dos módulos em `depende` do provedor (complemento T-0084 da ADR 0012; `packages/platform-sdk/src/consultas.ts`; teste em `consultas.test.ts`, bloco "T-0084"). Falta o modulo-catalogo trocar `app/texto-consultas.ts:43-49` (recado enviado agora). Quando ele entregar, a C9 responde offline.

| O que preciso: nada muda na API do lado do Vendedor. Continue chamando `ambiente.consultar(CONSULTA_BUSCA_PRODUTOS, { q, produto_ids?, limite? })`, com reserva local só quando `ehConsultaIndisponivel(e)` for verdadeiro. O SDK lança `ConsultaIndisponivel` em três casos: o Catálogo inativo para o usuário, a consulta sem implementação no aparelho, e (novo) o Core inativo, o que na prática não acontece. Qualquer outro `Error` é bug: não esconda com reserva, deixe aparecer em teste e no log. Não leia `produto` do Core no seletor para filtrar resultado da consulta. Também não leia `produto_conteudo` do Catálogo direto: isso fura a regra 1.

| Pronto quando: o seletor usar a C9 como caminho principal e a reserva local só no `ConsultaIndisponivel`, com teste do Vendedor cobrindo os dois caminhos. O teste ponta a ponta offline 'pastilha uno 2012' fica com os `testes` e o APK de preview com o engenheiro-apps.