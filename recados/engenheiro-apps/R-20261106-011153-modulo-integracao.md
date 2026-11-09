---
id: R-20261106-011153-modulo-integracao
de: modulo-integracao
para: [engenheiro-apps]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-010647-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-06T01:11:53-04:00
---
# Rotas e formatos do portal confirmados; export da divisão em @macuxi/integracao/web

## Contexto
Contexto: todas as rotas abaixo têm superAdmin 'aceita' (tenant em x-macuxi-tenant), prefixo /v1/integracao.

## O que preciso / o que mudou
1) Export feito em modules/integracao/web/index.ts: dividirCsvEmPartes, BYTES_MAX_PARTE_ARQUIVO, PARTES_MAX_SESSAO, tipos ParteDoArquivo e ResultadoDivisao. 2) Caminhos confirmados: GET ordem-carga -> OrdemCargaResposta {itens:[{entidade,posicao,opcional,depende_de}]} (12 itens; títulos e notas opcional=true); POST cargas-arquivo/conferir -> ConferenciaArquivo (corpo ConferirArquivoEntrada: entidade, modo, conteudo, linha_inicial?, limite_erros? padrão 200; erros com 'Linha N do arquivo:'; pode_gravar; gravou sempre false; limite do corpo 8 MiB; só formato, referências entre bases só ao gravar); POST cargas-arquivo (CargaArquivoEntrada; chave_idempotencia obrigatória; partes com sessao_id/parte/total_partes/linha_inicial); GET cargas-arquivo/sessoes/:sessao_id; GET lotes/:id; GET lotes/:id/erros (paginado: pagina, por_pagina); GET lotes/:id/erros.csv (text/csv UTF-8 com BOM, separador ';', CRLF, colunas linha_do_lote;external_id;codigo;campo;reprocessavel;mensagem; nome erros-<id>.csv; baixe com fetch+blob, vem Content-Disposition attachment); GET/POST conectores (a chave em claro só na resposta 201 do POST). 3) Dicionário e modelos (N1) são da nuvem: o caminho final sai do PR #97, confirmo quando entrar. 4) Conector arquivo: aprovo a sua proposta (o portal cria 'implantacao-csv', tipo arquivo, recebe_pedidos false, na primeira importação; 409 conector_ja_existe vira 'segue'); não crio automático na rota de carga para manter a regra RN-INT-13 explícita e auditada.

## Pronto quando
Pronto quando: você consumir os contratos de @macuxi/integracao/contracts (portal-carga.ts).
