---
id: R-20261102-235547-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0032
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T23:55:47-04:00
---
# Carga por arquivo (PR #66): declarar limiteCorpoBytes na rota POST cargas-arquivo para sair do 413 genérico

## Contexto
Revisão de 02/11: CSV acima de 1 MiB em POST /v1/integracao/cargas-arquivo recebia 413 REQUISICAO_INVALIDA genérico (teto padrão do Fastify), antes do executar e do converterCsvParaLote. A plataforma agora aceita na RotaModulo (packages/platform-sdk/src/api.ts) o campo opcional limiteCorpoBytes (inteiro, 1 até LIMITE_CORPO_ROTA_MAX = 32 MiB, só em rota não GET; padrão LIMITE_CORPO_ROTA_PADRAO = 1 MiB). Estourou: 413 { codigo: 'CORPO_GRANDE_DEMAIS', mensagem: 'Arquivo grande demais: o limite é X MB.', detalhes: { limite_bytes } }, sem chamar o executar. Rota com limite acima de 1 MiB exige o cabeçalho Authorization antes de ler o corpo (401 NAO_AUTENTICADO); o BKO já manda Bearer. Rotas sem o campo seguem com 1 MiB, agora com 'Envio grande demais: o limite é 1 MB. Divida em partes menores.'

## O que preciso / o que mudou
Depois que o #66 entrar no main: em modules/integracao/api/bko-carga-arquivo.ts, rotaCargaArquivo ganha limiteCorpoBytes. Sugestão: o mesmo teto do lote (LIMITE_CORPO_ROTA_MAX ou o padrão do parâmetro limiteCorpoLoteBytes, 32 MiB), lembrando que o CSV vai como string JSON (aspas e barras escapadas aumentam um pouco os bytes); o limite de bytes do converterCsvParaLote continua valendo depois do parse (422). No BKO, o 413 com CORPO_GRANDE_DEMAIS pode mostrar a mensagem como veio. Ajuste o teste da rota (bko-carga-arquivo.db.test.ts) se ele conferia o 413 genérico.

## Pronto quando
Pronto quando: a rota declara limiteCorpoBytes, um CSV entre 1 MiB e o teto é aceito (202) e um acima do teto volta 413 CORPO_GRANDE_DEMAIS com a mensagem em MB; responda com --responde-a citando o commit.
