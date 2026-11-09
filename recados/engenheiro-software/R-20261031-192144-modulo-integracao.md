---
id: R-20261031-192144-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0013
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T19:21:44+00:00
---
# T-0013: revisão do Conector, mudança do pnpm-lock.yaml/dependências e o que o Hub precisa expor

## Contexto
T-0013 entregou o Conector v1 (apps/conector, pacote @macuxi/conector, docs/modulos/integracao/conector.md). O Hub /integracao/v1 ainda não tem rotas; o Conector foi escrito contra @macuxi/integracao/contracts e define o cliente HTTP. Preciso de (1) revisão, (2) ciência da mudança do pnpm-lock.yaml e (3) a lista do que a futura tarefa da API do Hub precisa expor.

## O que preciso / o que mudou
1. Revisão do Conector. Pontos para olhar: fronteiras (só importa @macuxi/integracao/contracts; pnpm fronteiras sem violação); node:sqlite por createRequire (src/util/sqlite.ts) com supressão apenas do aviso de SQLite; segredos (src/segredos/provedores.ts, leitura/gravação do Credential Manager por PowerShell com o valor por stdin); máscara de log (src/log/mascara.ts); idempotência (lotes.ts) e dois cursores (sincronizador.ts/remetente.ts, RN-INT-05/06).
2. pnpm-lock.yaml mudou (aceito pelo gerente nesta rodada). Dependências novas, todas só em apps/conector/package.json: dependencies - @macuxi/integracao (workspace), mssql ^12.7.13 (tedious, JS puro), pg 8.23.1 (igual ao da API), yaml ^2.9.1, zod ^3.25.76; devDependencies - @macuxi/config (workspace), @types/mssql ^12.3.0, @types/node ^22.20.5, @types/pg 8.23.1, esbuild ^0.28.2 (empacotamento dist/conector.mjs), tsx ^4.23.15, typescript ~5.9.3, vitest ^3.2.7. Instalado com pnpm add --filter respeitando minimumReleaseAge. O pnpm mostrou "-166 packages" removidos da árvore hoisted (limpeza do node_modules); lint/typecheck/testes da raiz seguiram como antes.
3. Sugestão para turbo.json (fora do meu escopo): tarefa "@macuxi/conector#test" com cache false e env MACUXI_PG_* como a de api#test, porque o resultado depende de haver Postgres (sem ele os testes de integração pulam; no CI MACUXI_PG_EXIGIR=1 faz falhar).
4. O que o Hub precisa expor ao Conector (rotas sob https://<hub>/integracao/v1, Authorization Bearer com chave de API rotacionável por Conector; 401/403 em credencial inválida/revogada):
 - POST /lotes: corpo LoteEnvelope; cabeçalho Idempotency-Key (SHA-256 hex, 64 caracteres): mesma chave devolve o MESMO LoteAceito/lote_id sem reprocessar. 202 LoteAceito; 400/413/422 com RecusaEnvelope = recusa definitiva (o Conector não reenvia e bloqueia a entidade); 408/425/429/5xx = transitório (retry; Retry-After respeitado). Aceitar corpo de pelo menos 8 MiB (Conector envia até 4 MiB e até 5.000 linhas).
 - GET /lotes/{id}: LoteResultado (recebido/processando até estado final; erros[] por linha com indice, external_id, codigo, campo, mensagem, reprocessavel). Só estado final avança o cursor. 404 = Hub não conhece o lote (Conector reenvia com a mesma chave). Campo opcional novo inativacao {situacao: aplicada|aguardando_confirmacao|nao_aplicavel, motivo?, candidatos?} no resultado do último lote da sessão completa (trava RN-INT-06: o Conector só avisa no status/log; nunca força).
 - Comportamento de erro por linha esperado: falhou com erros por linha não reprocessáveis = lote tratado (a linha corrigida volta pelo delta); apenas falha_processamento é reenviada pelo Conector (lote delta só com essas linhas, até 3 vezes); referencia_ausente fica no staging do Hub (reprocesso pelo BKO) e o Conector não reenvia.
 - GET /cursores/{entidade}: CursorEntidade (cursor null = nunca recebeu = carga completa; cursor existente = delta direto). Nota: Cursor.external_id tem min(1) no contrato.
 - Sessão de carga completa: partes podem ser processadas em qualquer ordem, mas só fecham a sessão quando 1..ultimo estiverem concluídas; o Conector envia em ordem e com ultimo=true só na última parte, sem lote vazio.
 - GET /pedidos/pendentes: PedidosPendentes; ao entregar marca enviado; reentrega com tentativa+1 após o timeout de 10 min sem retorno (o Conector deduplica por pedido_uuid, gravando antes de qualquer outra coisa).
 - POST /pedidos/{pedido_uuid}/retorno: RetornoErp (+ itens_faturados?: [{sequencia, quantidade}]). 200 RetornoAceito (repetido true se idempotente); 422 {erros:[{codigo,mensagem}]} para transição inválida ou pedido desconhecido (definitivo; o Conector não repete).
 - POST /sinal: batimento a cada 60 s: { versao_conector, versao_contrato, em, fila[{estado,lotes,linhas,maisAntigo}], entidades[{entidade,fase,ultimo_sucesso,bloqueada,lotes_na_fila}] } sem dado pessoal; qualquer 2xx serve. O Hub define o schema final (alerta se > 15 min sem sinal).
 - POST /reconciliacoes: ReconciliacaoEnvio; qualquer 2xx.
 - Cabeçalhos informativos: User-Agent macuxi-conector/<versão>, X-Macuxi-Conector-Versao.

## Pronto quando
Revisão devolvida (sem 🔴) e a lista do item 4 considerada no desenho da tarefa da API do Hub. Detalhes e premissas: docs/modulos/integracao/conector.md seção 9.
