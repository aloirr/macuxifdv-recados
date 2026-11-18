---
id: R-20261117-235747-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [todos, gerente-projetos]
tipo: bloqueio
prioridade: alta
tarefa: null
responde_a: R-20261117-233629-alexandre
encerra: false
contrato: null
criado_em: 2026-11-17T23:57:47-04:00
---
# Bloco 3: 7 de 8 no main; #485 com frase caída (2878f90b); CI do main vermelho por infraestrutura (job morto, código 137): rerun precisa do senhor

## Bloco 3: 7 de 8 no main
| # | Squash no main |
|---|---|
| #481 | 8e13f488136f7db13b802e8f495f784fa1942a65 |
| #482 | 4bef5bbebeb513f5b9b6b2526f160273c6e5fd1b |
| #414 | ca81fbdec73dc0c6c348d04662173e86d2af13c8 |
| #416 | b724f08b2850801225ed1d5bfe8c2e74ca07cb0c |
| #415 | 6c95fc3aca905efb6e79350f715cb54fd27d4c3e |
| #488 | fc52ad752c9f46d45c8299c01a5764bf9b30e189 |
| #489 | 555c719a8884a7f1fd7fc9046b28417dc7161fb6 (por último, como pedido) |

Todos às 23h44 de Manaus, cada um no SHA da frase, `clean` e com o CI do head verde. O #345 foi fechado, porque o #488 o substitui.

**#485: sem merge, porque a frase caiu.** Depois do #481, o `docs/testes/T-0173.md` passou a existir dos dois lados e o #485 ficou com conflito. Como mandam os recados de 23h36 e 23h39, não fiz o merge. Juntei o main no branch: ficou o doc do #485 com a seção N8 do #481, sem perder nenhuma linha. O head novo é **2878f90b97fbc5a3b64d7e8983a3a1216427b279**, com parecer LIBERADO nesse SHA (comentário 6968424282). A frase nova fica para o dono do produto pela manhã, depois que o CI desse head ficar verde.

## ⚠️ CI do main VERMELHO em 555c719a (run 44232491470): parece infraestrutura, não código
- **O que caiu:** só o job "estático (verificar)", no passo **typecheck**. Ele foi **morto** (código 137, "Killed"; "The runner has received a shutdown signal"). Nenhum erro de TypeScript aparece no log.
- **O resto passou:** os 3 shards dos testes de pacotes, os 3 de integração, o lint, as fronteiras e o build.
- **Conferido aqui:** `pnpm typecheck` com o main 555c719a (e só os testes do #485 por cima): **19 de 19 verdes**.
- **Rerun:** não consegui. A API respondeu **403**, porque o token desta sessão não tem permissão de Actions. A regra permite um rerun só, para falha de infraestrutura, e este é o caso.
- **Saídas:**
  1. **o senhor**, de manhã, clica em "Re-run failed jobs" no run 44232491470 (só o job "estático (verificar)", uns 6 minutos); ou
  2. o CI agendado das **03h de Manaus** (dias úteis) roda tudo no main sozinho. Se ficar verde, vale como main verde.

**Enquanto o main estiver vermelho:** nenhum merge novo, nenhum deploy e nenhum "PRONTO PARA LIBERAR". Confiro o agendado das 03h e conto o resultado na próxima atualização.

## O que falta para "PRONTO PARA LIBERAR v1.0.14"
1. Main verde (rerun ou agendado).
2. Frase nova do #485 (2878f90b) e o merge dele.
3. Reteste do corretor e da marca sobre o main, e quadro com o escopo do cenário A e a tarefa da v1.0.15 (login e e-mails, catálogo v2).

**Nova previsão:** "PRONTO PARA LIBERAR" de manhã, por volta de 1 hora depois da frase do #485 e do main verde. O deploy e a tag continuam com o senhor.
