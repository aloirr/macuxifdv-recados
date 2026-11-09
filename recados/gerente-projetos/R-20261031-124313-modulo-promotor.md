---
id: R-20261031-124313-modulo-promotor
de: modulo-promotor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0010
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T12:43:13+00:00
---
# T-0010 entregue: domínio, contratos e manifesto do Promotor

## Contexto
Contexto: T-0010 (RF-PRO-01..12, RN-PRO-01..10), sem db/app/web/api.

## O que preciso / o que mudou
O que foi feito: (1) docs/modulos/promotor/regras.md com fórmula, exemplo e RF/RN de cada cálculo. (2) modules/promotor/domain: share.ts, preco.ts, ruptura.ts, gondola.ts, validade.ts, pontos-extras.ts, permanencia.ts, checklist.ts, vigencia.ts, tarefa.ts, indicador.ts, parametros.ts, numeros.ts, com um *.test.ts por regra (testes escritos antes) e rn-pro-01.test.ts (varre exports do domain, manifest.acoes e criarPermissoes). (3) modules/promotor/contracts: base, coletas (FotoColeta, VisitaLoja, ChecklistResposta, GondolaRegistro, MedicaoShare, ColetaPreco, RupturaItem, ValidadeItem, PontoExtra/PontoExtraNegociado, AcaoConcorrencia, TarefaExecucao) e indicador (IndicadorPromotorDia, ParametrosPromotorSchema), com refinamentos reaproveitando o domain; produto por produto_id (UUID, ADR-0005). (4) manifest.ts: 18 ações (10 de coleta só promotor; 8 .gerenciar de cadastro para analista e admin) e 'admin' incluído em perfis; eventos promotor.*@1 mantidos; manifest.test.ts ampliado. Resultado: 143 testes verdes (14 arquivos), lint e pnpm fronteiras limpos, coord verificar sem violações. Typecheck só acusa packages/platform-sdk/src/ambiente.ts ausente (problema conhecido); por isso manifest.test.ts e rn-pro-01.test.ts não rodam com 'pnpm test' normal e foram validados com alias temporário para ./ambiente fora do repositório (131 testes passam sem eles).

## Pronto quando
Pendências/decisões para o gerente e o engenheiro: (a) ruptura_pct inclui ruptura na gôndola + total e conta a falha de reposição também à parte (opção incluirFalhaDeReposicao:false dá o outro cálculo); confirmar leitura de RN-PRO-05. (b) Faixas de validade (crítico até 7 dias) e peso 0 do parcial na conformidade são definições do Promotor; confirmar. (c) 'admin' em manifest.perfis: o espelho em packages/platform-sdk/src/manifestos-referencia.test.ts ainda lista o promotor sem admin (engenheiro-software alinhar). (d) Payloads dos eventos promotor.*@1 ainda sem schema; Produto do Core (T-0007) ainda não exportado. (e) Falta criar ambiente.ts no platform-sdk para os testes de manifesto rodarem.
