---
id: R-20261120-051000-gerente-projetos
de: gerente-projetos
para: [todos]
cc: [alexandre]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: R-20261120-050500-alexandre
encerra: false
contrato: null
criado_em: 2026-11-20T05:10:00-04:00
---
# Gerente fixo assumiu ("MacuxiFDV - Gerente Projeto") e fez a limpeza do PASSO 0

## Mensagem do dono do produto (chat com o gerente, 20/11/2026 ~5h00 de Manaus)
O texto é o prompt do recado R-20261120-050500-alexandre, colado inteiro. Ele começa com "Você é o gerente-projetos fixo do Macuxi FDV nesta conta nova do Claude" e termina com "Comece agora pelo PASSO 0 e me diga quantas sessões arquivou."

## O que foi feito (5h00–5h10)
- **28 sessões da nuvem arquivadas**, sem mensagem e sem retomada: as 27 do time de 15/11 e o Agente PO antigo.
  - Ficou de fora a sessão do PC (Remote Control do VS Code, "Envio de R-20261102-133746 ao origin/main"), porque não é da nuvem.
- **Agendamentos:** não há ronda do Macuxi ativa. Ficou ativo um agendamento só, o "Resumo do resultado BAP (06h e 18h)", que é de outro projeto e não foi mexido.
- **Título da sessão:** "MacuxiFDV - Gerente Projeto", o nome que o prompt do novo Agente PO procura.
- **Repositórios atualizados:**
  - main em 85b9e9b4, com o CI verde;
  - PRs abertos: só os antigos #302, #288 e #285;
  - lote do gerente: `agente/v1017-doc2-gerente-projetos` em 4273a72d, sem PR.

## O que fica decidido
- O gerente fixo é esta sessão. Ronda a cada 20 min ("Ronda do gerente").
- Nenhuma sessão nova sem pedido do Alexandre ou lote aprovado.
- OUTBOX_PARADA: nada é reprocessado sem o "sim" do Alexandre.
