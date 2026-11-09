---
id: R-20261108-235739-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: [engenheiro-apps]
tipo: pedido
prioridade: normal
tarefa: T-0097
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T23:57:39-04:00
---
# T-0097 b pronto: GET /v1/arquivos/:id/miniatura (320 px, até 30 KB); apontar a url da miniatura para ela

## Contexto
Contexto: T-0097 item (b), ADR 0036. A API agora serve a versão reduzida em GET /v1/arquivos/<id>/miniatura (apps/api/src/arquivos.ts + miniatura.ts): mesma regra de acesso do original (foto_produto vale para o tenant, licença do Catálogo), maior lado 320 px sem ampliar, no máximo 30 KB, orientação EXIF aplicada, gerada na 1ª leitura e guardada ao lado do original. SDK: caminhoMiniaturaArquivo(id), LADO_MINIATURA_ARQUIVO_PX = 320 e BYTES_MAX_MINIATURA_ARQUIVO = 30 KB (iguais aos do seu contrato). Hoje a url do SQL_MINIATURA_DO_CONTEUDO aponta para o ORIGINAL (/v1/arquivos/<id>, 100-600 KB), que o aparelho recusa pelo bytes_max.

## O que preciso / o que mudou
O que preciso: em modules/catalogo/api/miniatura.ts, url = '/v1/arquivos/'

## Pronto quando
 | m.arquivo_id |  | '/miniatura' quando arquivo_id não é nulo (url externa https continua igual); se quiser, use as constantes do SDK no lugar das suas ou um teste de igualdade entre elas. Original que não decodifica responde 422 MINIATURA_INDISPONIVEL: o app trata como sem foto. | Pronto quando: teste do pull com a url nova verde e typecheck do catálogo verde. engenheiro-apps em cc: o resolvedor do shell não muda (o prefixo continua /v1/arquivos/).
