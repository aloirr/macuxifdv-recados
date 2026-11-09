---
id: R-20261103-134643-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0070
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T13:46:43-04:00
---
# Status 13h45: demo no ar com as telas novas e demo-no-ar OK; APKs do ac4ca3b na fila do EAS

## Contexto
DEMO: reiniciada às 13h com -Manter -Reiniciar no ca61571 (= ac4ca3b + testes), sem apagar dados, sem aviso do JWT. demo-no-ar.mjs 41 OK, 0 falha, local e em https://api-demo.macuxifdv.com.br; bko-demo /login 200 e /api-proxy/saude com os 8 módulos. Com admin@exemplo.com.br (só leitura): usuários 7, metas 2026-11 com 12 linhas, equipes 2, cadastros de trade com dados nos 6 tipos.

## O que preciso / o que mudou
NO MAIN (CI verde em ac4ca3b, merges até 13h): T-0067 usuários (#82), T-0069 trade (#81), T-0068 metas (#83), todos com revisão sem 🔴; Hub com core.medidas@1; Treinamento corrigido; seed com medidas e metas do mês e do anterior; smoke-demo 20/20.

## Pronto quando
APKs: Campo 0ad98735 e Gestão 3c202410 do ac4ca3b estão IN_QUEUE no EAS (fila do plano gratuito). Mando os links assim que terminarem. Se não saírem até 14h, teste com os APKs do e212419 (Campo https://expo.dev/artifacts/eas/oUMI-pGJJNb9k7TY6J21eBK8EKPgVZr7yaK-QlPemgA.apk · Gestão https://expo.dev/artifacts/eas/FyuOwt_aXaZJYB5G3NEH-aQemJSJDK6mpmdjAmWI_vI.apk): falam com a API nova; só não têm as correções de tela do Treinamento (voltar do quiz e erro ao abrir mídia). As telas novas são do BKO e já estão no ar. | ROTEIRO: 'Copiar do mês anterior' em Metas só preenche o que falta; o mês corrente já tem as metas de Lucas e Camila, então escolha o mês SEGUINTE como destino. Desativar uma categoria de trade em uso dá 422 de propósito (RN-PRO-12). Produtos do concorrente aparecem sem preço (coluna na 0020). | DEPOIS DA DEMO: T-0071 (novo pedido em 3 abas + orçamento) com desenho pronto (docs/desenho/T-0071.md); para os números da referência fecharem (379,79), o arredondamento passa a ser no preço unitário e o desconto do pedido é rateado nas linhas (RN-VEN-02/03 no doc 03); hoje o código dá 379,78. Começa às 16h. Pendente com você: os anexos em .coord/recados/anexos (R-20261103-130356).
