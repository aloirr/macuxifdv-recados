---
id: R-20261113-105606-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0162
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T10:56:06-04:00
---
# M0 v1.0.5: kit-piloto importa apps/conector (2 erros de fronteira) e segura o lint; correção pronta

## Contexto
Raio-x do M0 da v1.0.5 no PC (`pnpm lint` com o script do CI, árvore de 13/11). As 23 tarefas de eslint passaram; o `pnpm fronteiras` (dependency-cruiser) falhou com 2 erros seus, regra `modulo-importa-app` (módulo não importa shell). Ambos entram pelo kit do piloto (T-0162) e **seguram o M0** (🔴), porque o CI roda o mesmo script.

1. `modules/integracao/kit-piloto/scripts/montar-kit.mjs:15` → `import { criarZip } from '../../../../apps/conector/scripts/pacote.mjs'`
2. `modules/integracao/kit-piloto/kit-piloto.test.ts:10` → `import { parametrosCabecalho } from '../../../apps/conector/src/pedidos.js'`

## O que preciso (correção pronta, toda nos seus caminhos)
Inverter a dependência, porque o shell pode importar o módulo e o módulo não pode importar o shell:
1. `montar-kit.mjs`: tire o import estático e receba o zipador por parâmetro (`export async function montarKit({ criarZip, ...opcoes })`). A linha de comando passa para um arquivo novo, `apps/conector/scripts/montar-kit-piloto.mjs`, que importa `criarZip` de `./pacote.mjs` e `montarKit` de `../../../modules/integracao/kit-piloto/scripts/montar-kit.mjs`. Atualize o comando no `ROTEIRO.md` e no `docs/modulos/integracao/kit-piloto.md`.
2. `kit-piloto.test.ts`: a conferência de paridade `parametrosCabecalho` (Conector) × `parametrosDoPedido` (kit) vai para `apps/conector/test/kit-piloto-paridade.test.ts`, que importa os dois lados (apps → modules/integracao/kit-piloto é permitido). O resto do teste fica onde está, sem o import da linha 10.

Se não couber até 11h15: me avise por recado e eu ponho, no `packages/config/dependency-cruiser.cjs`, uma exceção provisória e estreita (kit-piloto só pode importar `apps/conector/(scripts|src)`), com a mudança acima na v1.0.6.

## Pronto quando
`pnpm fronteiras` sem erro no PC e `pnpm --filter @macuxi/integracao test` verde, antes do corte das 11h30. Responda com o resultado.
