---
id: R-20261109-141433-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0143
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T14:14:33-04:00
---
# T-0143 entregue: desenho, ADR 0039 e patch dos recados direto no GitHub (aguarda aprovação do dono do produto)

## Contexto
T-0143: os recados vão direto ao GitHub, sem sincronização pelo PC (pedido do dono do produto no chat, 09/11 ~12h30).

## O que fiz
- **Caminho:** API do GitHub.
  - Escrita: GraphQL `createCommitOnBranch` com `expectedHeadOid`. É atômica, nunca sobrescreve e tenta de novo quando há concorrência. Só diz "enviado" com o commit confirmado.
  - Leitura: o main na hora, com índice local por commit (REST `compare` + blobs em lote, conferidos pelo hash do git).
  - HTTP pelo `fetch` do Node, num worker síncrono. Com proxy (nuvem), vai por processo filho.
  - Token: `MACUXI_RECADOS_TOKEN`, `GH_TOKEN`, `GITHUB_TOKEN` ou `gh auth token`.
  - O clone com commit e push síncronos foi descartado (ver o desenho).
- **Desenho:** docs/desenho/T-0143.md (inclui o passo a passo do corte para você). **ADR:** docs/decisoes/0039-recados-direto-no-github.md, nova, mais o índice e uma nota na 0035.
- **Patch de governança:** docs/desenho/T-0143.patch (`git apply` sobre o main 9d097404).
  - Arquivos: scripts/coord.mjs, scripts/coord-lib.mjs, scripts/coord-recados.test.mjs (novo, 19 testes), scripts/recados/subir-pendentes.mjs (novo), .claude/hooks/guarda-merge-lib.mjs, .claude/hooks/guarda-juncao.test.mjs, .claude/hooks/sincronizar-recados.mjs (removido), .claude/settings.json (sem os hooks de sessão e sem o clone) e .github/workflows/ci.yml (roda os testes novos).
  - `git apply --check` passa no índice e na árvore de hoje.
- **Pedido ao alexandre:** R-20261109-132526-engenheiro-software, com cópia para você. Foi enviado **pelo código novo, direto no GitHub** (commit fc179fe, verificado). Você não vê essa cópia na caixa local até a subida, porque a sua caixa ainda lê a junção.

## Testes
Rodei numa cópia temporária (clone em scratchpad, já apagado):
- scripts/coord-recados.test.mjs: 19/19.
- coord-verificar + coord-recados: 95 passaram, 0 falharam, 1 pulado.
- .claude/hooks/*.test.mjs: 131 de 135. As 3 falhas não vêm do patch:
  - desempenho: tempo, com o PC carregado;
  - os dois testes "gh fora do ar": falham igual no main sem o patch (rodei numa cópia limpa), porque este PC tem gh de verdade.
- O patch aplicou limpo (git apply) numa cópia nova do main. Os arquivos ficaram idênticos aos da cópia de desenvolvimento, e coord-recados passou 19/19 lá.

## Medições (PC carregado; `node -e 1` leva 1,3 s)
- caixa: 5 min 17 s pela junção; 8 s pelo GitHub com MACUXI_RECADOS_TOKEN; 13 s com `gh auth token`.
- enviar ao vivo: 26,7 s. Inclui o `gh auth token` (~5 s), o delta de 40 min de recados e a suíte de testes rodando ao mesmo tempo. Hoje passa de 120 s.

## Pendências e observações
1. **Aplicação:** o dono do produto aprova, e você segue a seção "Corte" do desenho: apply, subir-pendentes, rmdir das junções, commit com Agente: alexandre e CI.
   - O subir-pendentes --simular de 12h50 achou 193 recados e 11 lidos (88 linhas) presos no clone, sem conflito.
   - Rode-o logo depois do apply, porque os agentes continuam gravando na junção até lá.
2. **Telegram:** o aviso-telegram disparou com o commit pela API e achou "1 recado novo na caixa do dono do produto". Mas o envio falhou com **HTTP 403** do Telegram. Os runs anteriores (resumo de hora em hora e o aviso da migração) falham igual. É o 403 já diagnosticado na T-0139 (o bot não consegue escrever no chat: falta o /start ou o chat id está errado), e a outra sessão já pediu o ajuste ao dono do produto. Não é do patch.
3. **Relógio do PC atrasado uns 41 min:** às 17:31:27 UTC do PC, o cabeçalho Date do api.github.com marcava 18:12:37. Os ids e o `criado_em` dos recados do PC ficam "mais velhos" que os do formulário e do Telegram, e a ordem da caixa sai trocada. Sugiro sincronizar o relógio do Windows.
4. **Doc 07, CLAUDE.md e quadro** ficam com você.
5. **Caixa antiga:** a minha caixa tem 51 pedidos com 7 a 9 dias. Não tratei nesta tarefa.

## Pronto quando
O dono do produto aprova o patch, você aplica pelo rito, e o testes confere os critérios 1 a 6 e 8 no PC.
