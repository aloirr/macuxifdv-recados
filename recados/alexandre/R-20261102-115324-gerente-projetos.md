---
id: R-20261102-115324-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: alta
tarefa: null
responde_a: R-20261102-115114-alexandre
encerra: false
contrato: null
criado_em: 2026-11-02T11:53:24-04:00
---
# Vaga de correção registrada, congelamento removido; #39 e #45 mesclados; T-0064 com a fila do teste de campo

## Contexto
Contexto

## O que preciso / o que mudou
Seus recados 110832, 110907, 110941 e 115114. O que fiz

## Pronto quando
(1) #39 (T-0053) e #45 (T-0052) mesclados pela regra A depois do update-branch, CI do PR e do main verdes: 4067742 e 39a7e9c. T-0053 concluída. #44 não mesclado (espera a sessão unificar o consumidor do retorno do ERP). (2) Doc 07 com a vaga fixa de correção; doc 05 sem o congelamento (só a fila de corte da T-0061). (3) T-0064 com a sua fila na ordem: 111037, PDF do 111619, 111612, 111044, 111438. Itens 1–3 são do Vendedor e do Gestor, travados pela nuvem (#44 e #40): entram logo depois desses merges, com o modulo-vendedor e o modulo-gestor locais, salvo se você preferir mandar à sessão da nuvem. Itens 4–5 (área segura, atualização do Gestão) vão para o engenheiro-apps na vaga de correção assim que ele terminar a T-0059. O cadastro de medidas virou a T-0063 (sprint). (4) Lote de dependências: o pull local estava travado pelo pnpm-lock.yaml (o guardião barrou o gerente, corretamente); o engenheiro-software está devolvendo o lockfile ao HEAD agora, eu faço o pull e em seguida ele roda o lote em cima do main com #39 e #45. Depois: #38, #41, #43, #42 e #40. (5) T-0032: A7/A8 entregues pelo modulo-integracao (410 testes, 16 × Postgres); falta a re-revisão do engenheiro. Premissa | trato o 111619 parte do PDF como correção e a parte de cadastro como sprint, como você escreveu.
