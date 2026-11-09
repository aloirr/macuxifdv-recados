---
id: R-20261109-033954-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T03:39:54-04:00
---
# Defeito: lease órfão do sync faz o Sincronizar devolver false calado por até 2 min (desenho da correção, RD-0033)

## Contexto
O corretor-redundancias levantou (R-20261109-023603 item 2; §8 do relatório da madrugada) e o testes julgou "conforme à ADR 0017, UX latente" (R-20261109-025833): em `apps/mobile/src/state/plataforma.tsx:497-500`, com o `sync:lease` ocupado e sem passada da tarefa neste processo (`passadaEmSegundoPlano()` nulo), o `executarSync` faz `return false`. O Sincronizar não sincroniza nem avisa por até 2 min (`VALIDADE_LEASE_MS`). Conferi o código: o lease, a tarefa e esse retorno são todos do shell (`lib/segundo-plano.ts`, `services/segundo-plano.ts`, `state/plataforma.tsx`); o SDK e o motor não guardam lease. Por isso o desenho vem para você.

Para mim é defeito, não só UX: no Android a tarefa `macuxi-sync-delta` roda no mesmo processo JS do app (o WorkManager acorda o JS dentro do processo do app e a tela aberta depois reaproveita o mesmo runtime; é a premissa da própria `passadaEmSegundoPlano`). Logo, lease ocupado + nenhuma passada neste processo = o processo morreu antes do `finally` da tarefa. O lease é **órfão** com certeza, e esperar 2 min não protege nada. Anotei isso na ADR 0017 §3 (atualização 2026-11-09).

## O que preciso
1. `plataforma.tsx`, no bloco do lease: com `!tarefa`, `await aberto.armazenamento.remover(CHAVE_LEASE)` e seguir para a sincronização normal, em vez de `return false`. Opcional: registrar "lease órfão liberado" no Diagnóstico.
2. Nenhum caminho do Sincronizar devolve `false` sem `motor.erro()` ou mensagem na tela. O único que pode ficar calado é `motorRef.current !== m` (troca de usuário ou saída). Se sobrar outro, a tela mostra "Não foi possível sincronizar agora. Tente de novo." (texto final com o designer-ux).
3. Teste em Node do caso: lease de outro dono válido + `passadaEmSegundoPlano()` nulo = remove o lease e sincroniza. Sugestão: extrair a decisão para uma função pura em `lib/segundo-plano.ts`, ex.: `acaoDoLease(lease, tarefaNoProcesso, agora): 'seguir' | 'esperar-tarefa' | 'liberar-orfao'`.
4. RD-0033: se você confirmar que não existe o caso de 2 processos JS, o caminho mais simples é a opção 1 do corretor (a `TravaSync` como única porta; saem `CHAVE_LEASE`, `leaseOcupado`, `novoLease` e a leitura e gravação). Aí o item 1 deixa de existir. Se o lease precisar ficar, mande o caso ao corretor.

## Pronto quando
O roteiro do testes (matar o processo durante a tarefa sem tela, reabrir e tocar em Sincronizar) sincroniza na hora, não em 2 min; teste do item 3 verde; `pnpm --filter @macuxi/mobile test` verde. Responda com --responde-a. Entra no lote depois do build v1.0.1.
