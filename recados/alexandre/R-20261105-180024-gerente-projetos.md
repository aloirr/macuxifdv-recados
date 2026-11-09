---
id: R-20261105-180024-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T18:00:24-04:00
---
# Status das 18h (05/11): lotes N e O no main, demo no f702090, T-0081 e T-0083 concluídas, build em andamento

## Contexto
Status das 18h de 05/11. O próximo sai às 20h, por recado, se a rodada continuar.

## Entrou no main desde as 16h (doc 07: CI verde no commit exato, sem force, verificar --por-commit e trailer OK, revisões sem 🔴)
| Lote | Hashes | Conteúdo |
|---|---|---|
| N | 8ce8733..f0dcf03 | **T-0039 no app:** chip "Etapa pendente" na Rota e aviso na ficha; check-in que não prende o vendedor numa falha; folha da justificativa com o teclado. **T-0082:** cartão "Minha RV" em Metas (vendedor e promotor veem a própria RV, offline com o último cálculo). **Motor de sync:** a fila grava no disco antes da memória, sem perder item, e a edição feita durante o envio vai no envio seguinte. **Catálogo:** busca sem acerto acima de 5 mil produtos responde na hora, com o vazio novo. **Shell:** "‹ Início" no voltar. **Testes:** do aparelho e de permissão da RV |
| O | f0dcf03..f702090 | Nome da tabela de preço na consulta de preços, forma do SKU numa só função, PDF com CPF ou CNPJ e "não informado" |

**Demo publicada no f702090**, com CI e "demo — publicar" verdes (api 200, bko 200). Todo o trabalho de hoje já está na demo.

No lote N, o CI pegou uma regressão que a correção da fila tinha criado. Depois de um checkout sem sinal, o Sincronizar feito em seguida não enviava nada, e a foto da fachada era recusada (S1-047). O engenheiro-software corrigiu antes de o lote subir.

## Build
O build de preview do **f0dcf03** (Campo e Gestão) está rodando na Expo agora. Mando os links e o roteiro por recado assim que terminar. O APK anterior, do 21aa690, continua valendo para o que já estava nele.

## Fechadas hoje
- **T-0081 Farol de clientes:** concluída.
- **T-0083 Onboarding de tenant:** concluída.

## % por sprint (tarefas concluídas no quadro)
- Sprints 0, 3 e 5 a 8: 100%.
- Sprint 1: 94%.
- Sprint 2: 96%.
- Sprint 4: 80%. A T-0071 e a T-0072 estão prontas no código e falta a conferência no APK.
- **Sprint 9: 2 de 10 concluídas (T-0081 e T-0083).** Em teste: T-0039, T-0082, T-0008, T-0079, T-0080, T-0076 e T-0077, todas esperando a conferência no APK. Em andamento: T-0075, que só espera o custo.

## O que falta para fechar a Sprint 9
1. **A sua conferência no APK do f0dcf03**, com o roteiro que vai junto dos links. Ela fecha T-0039, T-0082, T-0071, T-0072, T-0076, T-0077 e T-0079.
2. **T-0008:** os números da tela de medição.
3. **T-0075:** o custo do BV1-4-10.
4. **T-0074 e T-0078** (demo e robustez): seguem em andamento e não bloqueiam o uso.

## Preciso de você (pendentes)
1. Custo do BV1-4-10.
2. Autorização do job do CI sem superusuário (`ci.yml`).
3. Cor do selo do orçamento: roxo, como está, ou âmbar, como na referência.
4. Resposta ao R-20261105-124257: regularização do trailer sem mexer no histórico.
5. Os números da tela de medição.

## Backlog novo de hoje (docs/backlog.md)
- **Etapa pendente:** "Ver fila", aviso no Gestão e selo no BKO.
- **Catálogo:** 🟢.
- **Plano de RV:** fim da vigência por perfil, gatilho normalizado e confirmação no voltar do navegador.
- **Triagem do Vendedor:**
  - pedido em nome do vendedor;
  - "Adicionar ao pedido" do Catálogo;
  - atualização automática em Pedidos;
  - número 000011 duplicado na demo.
- **Job do CI sem superusuário.**
