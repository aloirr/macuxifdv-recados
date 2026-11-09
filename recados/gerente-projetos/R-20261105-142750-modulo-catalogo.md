---
id: R-20261105-142750-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0052
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T14:27:50-04:00
---
# T-0052: 🟢5/7/8, caso lento do FTS5, leituras com versão do motor, correção do db.test do busca_log

## Contexto
Contexto: escopo pós-lote M.

## O que preciso / o que mudou
O que fiz: (1) CORREÇÃO DO CI (R-20261105-140444): causa = repositorio-postgres.db.test.ts limpava catalogo.busca_log com o papel macuxi_app, que na 0013 tem só select+insert; agora a limpeza usa urlAdmin (nenhuma mudança de migração). Arquivo alterado: modules/catalogo/api/repositorio-postgres.db.test.ts. (2) 🟢5 + caso lento: app/lib/local.ts, preselecionar — termo sem acerto no FTS5 é refeito pelo prefixo de 4 e depois de 3 letras (porPrefixo); a varredura só entra se nada achar. Semântica OR/quem casa mais termos primeiro intacta. Medido com 20 mil produtos no FTS5 real: 'pastiilha' 2,6 s com FTS (varredura: 145 s); sem tolerância no começo da palavra, e consulta sem nenhum acerto ('xyzqw') ainda varre (93 s) — proposta: acima de ~5 mil produtos devolver vazio nesse caso (muda a semântica, decisão sua). (3) 🟢7 api/rotas.ts: registrarBusca em try/catch, warn sem o termo; teste novo api/rotas-busca-log.test.ts. (4) 🟢8 contracts/rotas.ts: selling_points recusa quebra de linha; teste em contracts/busca.test.ts. (5) B4 do motor (recado do engenheiro-software 141459): local.ts usa versaoLinhas (memória de produtos, vocabulário, sinônimos, depósitos), linhasPorCampo (estoque, preço e vínculo do cliente só dos candidatos) e linhasPorIds, todos opcionais com fallback; 2 testes novos em local.test.ts. Tempos 20 mil produtos (PC carregado, sem o índice v2 ainda): 1ª busca 1,4 s e seguintes 0,3 a 0,7 s (antes 1,4 a 2,6 s por busca). Pedi ao banco-dados a v2 dos índices (R-20261105-141833); com eles espera-se 15 a 30 ms de leitura. (6) docs/modulos/catalogo/ponta-a-ponta.md ajustado. Pendências: 🟢6 (codigoCompacto único) mexe em domain/ranking.ts e app/indice.ts, que estão no lote M — fica para depois; contarLinhas não usado (o vocabulário memorizado já exige os produtos).

## Pronto quando
Testes: vitest do catálogo 471 verdes (33 de banco pulados, rodam no CI), eslint e tsc do catálogo limpos (sem erro de folha.tsx), coord verificar modulo-catalogo OK. Pronto quando: próximo CI do lote M verde no db.test e o indicador de 20 mil conferido pelo testes.
