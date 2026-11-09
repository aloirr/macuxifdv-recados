---
id: R-20261031-145337-2-modulo-treinamento
de: modulo-treinamento
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0011
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T14:53:37+00:00
---
# T-0011 ajustes: decisões do Alexandre (premissas 1-11) aplicadas no Treinamento

## Contexto
T-0011 (ajustes): decisões do Alexandre sobre as premissas 1 a 11 aplicadas no domínio, contracts, manifesto e regras.md do Treinamento. Sem git, sem tocar outros módulos.

## O que fiz
- Aprovadas (1, 2, 4, 5, 6, 7, 8, 9): já estavam implementadas; agora registradas como regra no regras.md (seção de premissas removida; entrou "Decisões do Alexandre" e "Pendências"). Parâmetros do tenant listados com o padrão.
- Ajuste A: `xp_max_por_desafio` (padrão do tenant 500 por vendedor e desafio; 0 = sem teto; o cadastro do desafio pode trazer o seu, com prioridade). O pedido que cruza o teto paga só o saldo; esgotado, lançamento de 0. Continua fora do teto diário. Implementado via `CandidatoXp.teto_desafio` em `proporLancamento` (vale também dentro do lote).
- Ajuste B: streak só com lição concluída ou quiz respondido até o fim (`atividadesQueContam`, `quizRespondidoAteOFim`; `registrarTentativaQuiz` devolve `quiz_finalizado` e não paga streak se faltar resposta).
- Ajuste C: `PedidoCriadoLido` virou `PedidoFaturadoLido` (`faturado_em`); `PedidoLido` virou `PedidoFaturadoLido` no domain; pedido sem faturamento = `PEDIDO_NAO_FATURADO`; vigência e dia do XP pelo faturamento; idempotência por pedido_id; sem estorno. Manifesto: `consome` PROVISÓRIO `vendedor.pedido.faturado@1` (era `vendedor.pedido.criado@1`); pendência registrada no regras.md e perguntas enviadas a modulo-vendedor e modulo-integracao (cc engenheiro-software).
- Ajuste D: `tempo_min_licao_seg` virou `segundos_minimos_licao` (30) + `pct_minimo_duracao_licao` (50, validado 0–100); `tempoMinimoDaLicao` = max(piso, ceil(pct x duração)); `LicaoDef.duracao_estimada_seg` opcional.

## Arquivos
modules/treinamento/domain/{desafio,parametros,progresso,quiz,streak,trilha,xp}.ts (+ testes desafio, parametros, progresso, streak, xp, quiz, ranking), contracts/{parametros,pedido-lido,index}.ts + index.test.ts, manifest.ts + manifest.test.ts, docs/modulos/treinamento/regras.md. Comentários "premissa T-0011" trocados por "decisão 31/10" em medalhas.ts, niveis.ts e testes.

## Testes
215 no pacote (186 antes + 29 novos). Lint, typecheck, test do pacote, `pnpm fronteiras` e `coord verificar modulo-treinamento` verdes. Testes antigos alterados: desafio.test.ts (criado_em para faturado_em, tipo PedidoFaturadoLido e o toEqual do candidato agora inclui `teto_desafio`), progresso.test.ts (parâmetro renomeado para `segundos_minimos_licao`), parametros.test.ts e contracts/index.test.ts (padrões com os parâmetros renomeados/novos; PedidoCriadoLido para PedidoFaturadoLido), manifest.test.ts (consome o evento provisório). Nenhuma asserção de regra aprovada foi relaxada.

## Pendências
- Nome/payload final do evento de pedido faturado (Vendedor + Integração + engenheiro): trocar o `consome` e, se divergir, o schema. O registro .coord/contratos/eventos.md e packages/platform-sdk/src/manifestos-referencia.test.ts (cópia) ainda citam `vendedor.pedido.criado@1` para o treinamento (donos: engenheiro-software).
- Banco (quando houver API): `desafio_vendas.xp_max_por_desafio` e `licao.duracao_estimada_seg`.
