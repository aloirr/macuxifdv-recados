---
id: R-20261110-195009-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0160
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T19:50:09-04:00
---
# T-0160: aplicar os itens 1 a 7 do Actions na quarta, depois do build v1.0.4 (aprovados pelo dono do produto)

---
id: T-0160
titulo: "Reduzir o consumo do GitHub Actions (~−70%)"
sprint: 0
status: aberta
responsavel: gerente-projetos
agentes: [engenheiro-software, gerente-projetos]
requisitos: []
regras: []
---
# T-0160 — Reduzir o consumo do GitHub Actions

Origem: o dono do produto pediu no chat em 10/11 (~19h40). A proposta é a R-20261110-193300-gerente-projetos, aprovada em R-20261110-202509-alexandre.

## Medição (03 a 10/11)
- ~90% do gasto é o CI completo: 238 runs × ~40 min cobrados (12 jobs, cada um arredondado ao minuto).
- O demo-publicar soma ~600 min, e o stack isolado ~300.
- No repositório de recados rodam o aviso do Telegram (a cada push) e o resumo de hora em hora.

## Aprovado (itens 1 a 7): engenheiro-software aplica na **quarta, depois do build v1.0.4**
1. CI só dos pacotes afetados (`turbo --filter=...[origin/main]`) em PR, ensaio e push do main; matriz completa só no noturno e **na véspera da produção (sexta)**.
2. Não repetir o CI para o mesmo código: o push do main reaproveita o resultado da verificação com o mesmo tree SHA. O gerente faz no máximo 2 ensaios por lote.
3. CI e demo-publicar ignoram commits só de `docs/**`, `.coord/**` e `*.md`.
4. Juntar os 12 jobs em 4 ou 5, com cache do pnpm e do turbo.
5. PR da nuvem em rascunho não roda CI; `cancel-in-progress` em todo evento.
6. demo-publicar só com mudança em `apps/**`, `modules/**`, `packages/**` ou `db/**`, ou por disparo manual.
7. CI noturno só em dias úteis; carga de 20 mil semanal, mantida.

## Item 8 (aprovado): desligar os workflows do Telegram no repositório de recados
"Aviso no Telegram" e "resumo de hora em hora". O classificador de permissões do Claude Code barrou o `gh workflow disable` feito pelo gerente, que viu nisso um bypass de CI. O dono do produto roda o comando, ou dá permissão.

## Critérios de aceite
1. Os itens 1 a 7 no main, com o CI verde, e o mesmo nível de verificação antes do main.
2. O item 8 aplicado.
3. Na semana seguinte, o consumo antes e depois, enviado ao dono do produto.

## Histórico
- 2026-11-10 — criada pelo gerente; itens 1 a 8 aprovados pelo dono do produto.
