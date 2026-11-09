---
id: R-20261106-013549-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-011201-modulo-integracao
encerra: true
contrato: null
criado_em: 2026-11-06T01:35:49-04:00
---
# T-0087 P (Integração): aprovada sem 🔴 contra o desenho §5.2; 1 🟡 (limite de inativação do tenant no aplicar-lote) e 3 🟢

## Contexto
Contexto: revisão de api/bko-carga-arquivo.ts, bko-conectores.ts, aplicar-lote.ts, index.ts, contracts/portal-carga.ts, domain/portal-carga.ts, web/index.ts e rotas-portal.test.ts, contra docs/desenho/T-0087.md §3 e §5.2. Vitest do módulo: 43 arquivos e 548 testes verdes.

## O que preciso / o que mudou
O que está aprovado: - superAdmin 'aceita' só nas rotas do §5.2: cargas-arquivo, conferir, sessões, lotes, erros, erros.csv, ordem-carga e GET/POST conectores. O PATCH e a decisão de inativação, que gravam usuario.id, ficaram de fora. Conferi: nenhuma rota com superAdmin grava ctx.usuario.id (o único uso é o bko-conectores.ts:145, no PATCH). - erros.csv: tipoConteudo da lista fechada do SDK; o nome erros-<uuid>.csv bate com NOME_ARQUIVO_ROTA_RE; o CSV tem BOM, ';' e CRLF, com proteção contra fórmula; o log só leva id e contagem; o teto é de 100 mil linhas. - conferir: não grava nada, o log só leva contagens e o contrato traz gravou: literal(false). - O prazo da sessão vem do parâmetro do tenant (aplicar-lote.ts:416), com teste. - Contratos aditivos. - O 403 por falta de licença no tenant é coberto pela API: apps/api/test/super-admin.test.ts:85-92 (MODULO_INATIVO). Não precisa repetir no módulo. 🟡 1, aplicar-lote.ts:441 e :460: limitePct ainda usa PARAMETROS_PADRAO.limiteInativacaoPct. É o mesmo defeito que você corrigiu no TTL: um tenant com limite de 10% fica sem a trava e inativa até 100% numa carga completa. Use parametros.limiteInativacaoPct (já lido na linha 416) nos dois pontos, com um teste que mostre o tenant em 10% barrando a inativação. 🟢 2: ordemDeCargaDoPortal lança erro na requisição se ENTIDADES mudar. Isso está certo e coberto pelo teste do domain; só não remova o teste. 🟢 3: as rotas da N1/N2/N3 (item 3 do R-20261106-002315) entram depois do merge dos PRs da nuvem. Com o merge, mande a lista que declaro ajv, ajv-formats e tsx no lockfile (as versões são as do lock do PR #99; não declare antes). 🟢 4: o celula() põe apóstrofo também em mensagem que começa com '-' (ex.: '-5 unidades'). É aceitável, só deixe registrado.

## Pronto quando
Encerrado; o 🟡 1 vai na próxima entrega da Integração, antes do push do lote do portal.
