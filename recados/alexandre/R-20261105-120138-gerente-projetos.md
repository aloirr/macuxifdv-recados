---
id: R-20261105-120138-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0081
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T12:01:38-04:00
---
# Status das 12h (05/11): lote J no CI (1 teste a ajustar), DBaaS concluído, 4 pedidos para você

## Contexto
Status das 12h de 05/11. O próximo sai às 14h, também por recado.

## Main e demo
- O main continua em **fb1ef19**, com o lote I. A demo também está nele: api /v1/saude 200 e bko 200.
- **Lote K** (verificacao/lote-k, 108e18a; CI verde): imagem de teste do banco (teste-db), dbaas-teste com job de imagem e itens A9, A11 e A12. Sobe junto com o lote J.
- **Lote J** (verificacao/lote-j, aea1e36), com 12 commits por dono e a conferência por commit OK:
  - Farol de clientes, Plano de RV, onboarding de tenant e o alerta de etapa pendente no Gestão;
  - consulta pela licença do tenant (ADR 0025);
  - cliente bloqueado recusado, estoque no Transformar e o rótulo "Vencido";
  - as telas novas do pedido pela referência;
  - a correção da tabela do kit, o arnês de banco sem superusuário e os testes novos.

  A revisão final do engenheiro-software saiu sem 🔴 nem 🟡. **O CI teve 1 falha:** um teste da T-0077 que lia o código da tela de Pedidos por regex quebrou porque a lista agora é virtualizada. O comportamento continua no código (ListEmptyComponent). O testes está ajustando o teste. Também faltam a conferência das telas do pedido pelo designer-ux e pelo engenheiro-apps; as duas estão rodando.

## T-0075 DBaaS
- Resultado enviado às 10h32 (R-20261105-103212): **compatível com o plano B, e pode apagar a instância.**
- O ajuste dos testes para rodarem sem superusuário está pronto e vai no lote J.
- **Falta de você:** o custo do BV1-4-10.

## Builds
- Os APKs do 68ea7d9 com a tela de medição seguem valendo (status das 8h).
- O próximo build de preview sai logo depois do lote J no main. Ele traz o Gestão com o alerta de etapa pendente e o novo pedido pela referência, com teclado, Vencido e detalhe do orçamento.
- No APK vale conferir com toque real duas coisas: digitar a quantidade e tocar direto em Avançar; e os campos de baixo acima do teclado.

## % por sprint (tarefas concluídas no quadro)
- Sprints 0, 3 e 5 a 8: 100%.
- Sprint 1: 94%.
- Sprint 2: 96%.
- Sprint 4: 80%. A T-0071 está perto de fechar: falta o preço mínimo, em andamento, e a conferência no APK.
- Sprint 9: nenhuma tarefa fechada. Seis estão em teste e fecham com o lote J no main e o CI verde: T-0039, T-0081, T-0082, T-0083, T-0079 e T-0080.

## O que falta para fechar a Sprint 9
1. Lote J no main: falta o teste da T-0077 e as duas conferências das telas do pedido.
2. A T-0075 fechar, com o custo e a ADR 0024 aceita.
3. A T-0008, com os seus números da tela de medição.
4. O que depende do #94, que segue aberto sem a marca de pronto: o chip "Etapa pendente" na Rota, o selo no Cliente 360, o acabamento do Core no app e a RV no app.

## Preciso de você
1. **Custo do BV1-4-10**, no console da Magalu.
2. **Números da tela de medição** (APK do 68ea7d9).
3. **Autorização para um job novo no CI** (`.github/workflows/ci.yml`, caminho de governança). Ele roda a suíte do @macuxi/db com um admin sem superusuário, igual ao do DBaaS. Assim a regressão aparece no CI, sem a instância. O custo é um runner paralelo de 6 a 10 minutos. O banco-dados e o engenheiro-software apoiam. Responda "autorizo o job sem superusuário no ci.yml" e o engenheiro-software implementa com o seu trailer.
4. **Selo do orçamento:** o designer-ux manteve o selo "Orçamento · até dd/mm" em roxo, embora a tela 5 da referência use âmbar, porque na lista o âmbar já é "Aguardando aprovação". Confirme ou peça âmbar.

## Decisões tomadas por mim (pode corrigir)
- O D-T0082a (RV diferente conforme o perfil de quem olha) foi resolvido pela plataforma: `tx.consultar(..., { licenca: 'tenant' })` só para leitura de indicadores (ADR 0025), e não exigindo o Vendedor em todo perfil do BKO.
- RN-CORE-29: no mês aberto, o gatilho de venda e visitas vale pela projeção, e positivação e cobertura pelo realizado, com o texto "Ainda não atingido: se o mês fechar assim, a RV zera".
- A RV usa a mesma apuração do painel de metas, inclusive a meta de faturamento pela consulta do Vendedor.
