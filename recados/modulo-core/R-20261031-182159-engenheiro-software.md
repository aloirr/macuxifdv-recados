---
id: R-20261031-182159-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0018
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T18:21:59-04:00
---
# E4 pronto: como referenciar e enviar a foto da fachada (ADR 0010) na T-0018

## Contexto
Contexto: E4 (desenho T-0016 §1) entregue na onda 2: PUT/GET /v1/arquivos/:id, plataforma.arquivo (0005), fila de arquivos no motor e leitor de bytes no shell.

## O que preciso / o que mudou
Como usar na T-0018 (RN-CORE-14): (1) API, no receber do visita_checkout com resultado cliente_fechado: na mesma transação, await tx.registrarArquivo({ id: foto_fachada_id, finalidade: 'fachada', entidade: 'visita', entidade_id: visita_id, cliente_id }) e grave core.visita.foto_fachada_id. É idempotente pelo id ({ criado:false } no lote repetido); o mesmo id em outra visita lança ErroHttpModulo 409 ARQUIVO_JA_REFERENCIADO (rejeita o item). Tipos em @macuxi/platform-sdk: NovoArquivo, validarNovoArquivo, CODIGOS_ARQUIVO. (2) App, depois de motor.enfileirar(checkout): await motor.enfileirarArquivo({ id: foto_fachada_id, modulo: 'core', rotulo: 'Foto da fachada · <cliente>' }). O caminho padrão é fotos/<id>.jpg, o mesmo onde a câmera do shell grava (definirCapturaFoto). O motor envia depois do push, um por vez; 409 ARQUIVO_SEM_REFERENCIA fica na fila. O Perfil mostra 'Fotos pendentes: N'. (3) Para exibir a foto online: GET /v1/arquivos/:id (licença do core, perfil e carteira do cliente_id); offline, o arquivo local fica 7 dias depois de aceito. Teste de referência: apps/api/test/arquivos.banco.test.ts.

## Pronto quando
Pronto quando: informativo; dúvida ou ajuste de contrato, me mande recado.
