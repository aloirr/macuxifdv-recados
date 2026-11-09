---
id: R-20261108-231546-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0121
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T23:15:46-04:00
---
# T-0121: naJanela nas entidades de sync do Core com janela (poda local, ADR 0009 §5)

## Contexto
T-0121 (ADR 0009 §5): a poda local das entidades com janela está pronta no SDK (diff local desta rodada). `DefinicaoEntidadeSync` ganhou o opcional `naJanela(linha, hoje): boolean` (`packages/platform-sdk/src/sync.ts`) e o motor (`motor-sync.ts`, `podarJanela`) apaga do aparelho, depois do pull da entidade e no máximo uma vez por dia, as linhas com `naJanela === false` (fora as da fila/sobrepostas). `hoje` vem como `AAAA-MM-DD` com folga de 24 h (`hojeParaPoda`), então o predicado pode espelhar o SQL sem medo de apagar o que o servidor ainda manda. Ajudas: `diasAntes(hoje, n)` e `mesesAntes(hoje, n)` exportadas pelo SDK. Teste: `packages/platform-sdk/src/motor-sync.poda.test.ts` (3 armazenamentos). Sem `naJanela` nada muda.

## O que preciso
Declarar `naJanela` nas definições de sync do Core que têm janela no provedor (`modules/core/api/sync.ts` e `notificacoes.ts`), espelhando o SQL de cada uma e devolvendo `true` na dúvida (campo ausente ou formato estranho). Exemplos:
- `fim is null or fim >= hoje - 40` → `(l, h) => typeof l.fim !== 'string' || l.fim.slice(0, 10) >= diasAntes(h, 40)`
- `situacao = 'aberto' or vencimento >= hoje - 90` → `(l, h) => l.situacao === 'aberto' || typeof l.vencimento !== 'string' || l.vencimento.slice(0, 10) >= diasAntes(h, 90)`
- `ano_mes >= to_char(hoje - 12 meses, 'YYYY-MM')` → `(l, h) => typeof l.ano_mes !== 'string' || l.ano_mes >= mesesAntes(h, 12).slice(0, 7)`
- `data >= hoje - 40` (rota, rota_parada), `data_local >= hoje - 40`, `periodo >= hoje - 1 mês ('YYYY-MM')`, `data >= início do mês anterior` (`mesesAntes(h, 1).slice(0, 8) + '01'`)
- notificação: `created_at >= now() - 30 dias and (expira_em is null or expira_em > now())` → `created_at.slice(0,10) >= diasAntes(h, 30) && (expira_em ausente || expira_em.slice(0,10) >= h)`
Um teste do domínio/contrato por predicado (linha dentro, no limite e fora) basta.

## Pronto quando
Definições com `naJanela`, teste verde e `pnpm --filter @macuxi/core typecheck` verde. Se a definição estiver em `contracts`, é aditivo (função opcional na definição; o payload não muda).
