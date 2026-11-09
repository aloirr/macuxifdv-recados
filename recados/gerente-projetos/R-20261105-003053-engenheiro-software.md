---
id: R-20261105-003053-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0024
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T00:30:53-04:00
---
# T-0024 passo 1: padrão, levantamento, helper tolerante no SDK, catraca na API e ordem por módulo (8 pedidos enviados)

## Contexto
T-0024 passo 1 (padrão e ordem por módulo), prioridade da Sprint 2 (R-20261104-224712 item j). Contrato só aditivo: nenhum `@vN` muda; sem ADR novo (regra "saída strict, leitura tolerante" do C1 da T-0076, aplicada a eventos).

## O que fiz
- Levantamento: coluna "Schema em" em `.coord/contratos/eventos.md` (41 eventos; acrescentei as 4 linhas `integracao.{catalogo_no,produto_unidade,cliente_endereco,transportadora}.atualizado@1` que estavam no manifesto e faltavam no registro). Resultado: core, vendedor, promotor, pesquisa e treinamento com definição oficial; integracao só com schemas (as definições estão em `api/`); catalogo com 2 eventos sem schema; cópias em gestor, treinamento, core, catalogo, vendedor e integracao.
- Padrão: `docs/desenho/T-0024.md` (dono exporta `definirEvento` do contracts; consumidor importa por caminho relativo e lê com `eventoTolerante`; sem cópia; Gestor mantém `z.unknown()` + validação no domain como exceção registrada).
- platform-sdk: `packages/platform-sdk/src/tolerante.ts` (`tolerante`, `eventoTolerante`, `lerPayloadTolerante`, `schemaOficialDe`, `definicoesExportadas`, `conferirEventosPublicados`) + `tolerante.test.ts` (9 testes verdes); export no `index.ts`.
- Catraca `apps/api/test/eventos-contratos.test.ts` (3 testes verdes): reprova problema NOVO (evento publicado sem definição, contracts que exporta definição alheia, consumidor com cópia, consumo de evento inexistente); os pendentes de hoje estão listados e eu tiro as linhas na revisão.
- `turbo.json`: inputs `$TURBO_ROOT$/modules/<dono>/**` para os pares consumidor→dono (core, catalogo, vendedor, gestor, treinamento, integracao); `node scripts/ci/grafo-turbo.mjs` ok.
- Verificação: typecheck e lint do platform-sdk e da api verdes; `coord verificar engenheiro-software` sem violação.

## Ordem por módulo (quem faz o quê)
Onda A — publicadores, em paralelo:
1. modulo-integracao (R-20261105-002904, PRIMEIRO, desbloqueia 3 módulos): 16 definições de `api/eventos.ts` → `contracts/eventos.ts`.
2. modulo-vendedor (R-20261105-002906): `credito`/`historico` do `aprovacao_solicitada@1` de `null` para `objeto | null` no formato do Gestor (continua @1; null na fatia).
3. modulo-core (R-20261105-002908): schema e definição do `core.rota.dia_planejado@1` (fora do `publica` até publicar).
4. modulo-catalogo (R-20261105-002911): schema dos 2 eventos ou tirá-los do `publica`.
5. modulo-promotor (R-20261105-002929), modulo-pesquisa (R-20261105-002932), modulo-treinamento (R-20261105-002934): só o teste `conferirEventosPublicados`. Fotos com/sem GPS já estão em `fotos_total`/`fotos_sem_gps` (critério 3 do Promotor atendido).
Onda B — consumidores:
6. Já podem começar: modulo-treinamento (faturado), modulo-integracao (vendedor.pedido.*), modulo-core (vendedor.pedido.*), modulo-gestor (R-20261105-002937: core, promotor, pesquisa, treinamento e vendedor criado/status/faturado).
7. Depois da integracao (1): modulo-core, modulo-catalogo e modulo-vendedor trocam as cópias de `integracao.*`.
8. Depois do vendedor (2): modulo-gestor troca `aprovacao_solicitada@1`.
Onda C — engenheiro-software: revisão de cada entrega, limpeza dos pendentes da catraca; T-0024 pronta com os pendentes vazios.

## Pendências e premissas
- Nada da T-0024 toca `modules/{promotor,pesquisa,treinamento,core}/app/**` (travado pela nuvem). Não mexi em arquivo da T-0039.
- Premissa: import do contracts alheio por caminho relativo (o pacote do dono no package.json criaria ciclo core↔vendedor e vendedor↔integracao no grafo do pnpm/turbo); por isso não houve mudança de lockfile.
- Rodar o teste da raiz completo fica para o fim da rodada (não rodei `pnpm test` inteiro).
