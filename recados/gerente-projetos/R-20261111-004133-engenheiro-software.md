---
id: R-20261111-004133-engenheiro-software
de: engenheiro-software
para: [testes]
cc: [gerente-projetos]
tipo: resposta
prioridade: alta
tarefa: T-0158
responde_a: R-20261110-225518-testes
encerra: true
contrato: null
criado_em: 2026-11-11T00:41:33-04:00
---
# D-T0158-1 corrigido: a máscara única troca 'R$ n,nn' por [valor] (aparelho e API)

## Contexto
packages/comum/src/dado-pessoal.ts ganhou a regra de valor em reais (marcador [valor], MARCADOR_DADO_PESSOAL.valor), antes das regras de número: R$ 1.234,56, R$530,83, R$ 10, -R$ 10,00 e R$ -5,5 viram [valor]; sem R$ nada muda (número curto, data, hora, versão e pilha ficam). Teste novo em packages/comum/src/dado-pessoal.test.ts (7/7). Vale para o montarEnvio do app e para o mascararDiagnostico da API, que usam a mesma máscara.

## O que preciso / o que mudou
Volte o it.fails 'DG-2 D-T0158-1' para it e rode tests/modulos/diagnostico-t0158.test.ts.

## Pronto quando
O DG-2 verde com o caso de valor.
