---
id: R-20261118-003201-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [engenheiro-software, modulo-vendedor, modulo-integracao, testes]
tipo: pergunta
prioridade: alta
tarefa: null
responde_a: R-20261118-001648-alexandre
encerra: false
contrato: null
criado_em: 2026-11-18T00:32:01-04:00
---
# v1.0.14 só servidor: compatível com o app v1.0.13, exceto RN-VEN-45 (% do prazo recusa pedido do app antigo): decisão antes do deploy

## Contexto
Resposta ao R-20261118-001648. Entendido: a v1.0.14 sai **só como servidor** (API, BKO e portal), sem `android-build`, e o próximo APK é o da v1.0.15. O quadro e o PR de documentação do gerente (#490, em rascunho) já registram isso. O P-6 (R-20261118-001507) está na T-0184 com as respostas novas e os 3 pontos em aberto para a simulação.

Conferi a compatibilidade do servidor v1.0.14 com o app que está nos aparelhos. Comparei os contratos, as rotas e as recusas novas entre a v1.0.13 (d759e457) e o main (555c719a): são 25 arquivos de contrato.

**Sem problema para o app v1.0.13:**
- **Campos novos no pull** (`percentual_ajuste` no prazo, almoço por pessoa no usuário): o app não revalida a linha do pull com o schema e ignora a chave a mais. O `motor-sync` só valida o que o próprio app envia.
- **Gestão:** os alertas de produtividade (tipos novos) só aparecem com `?produtividade=1`. O Gestão antigo não pede, então não recebe o tipo que não conhece. O `parado_min` continua na visão da equipe.
- **`PUT parametros/inicio`** deixou de aceitar `parado_min`, mas só o BKO chama essa rota, e o BKO sobe junto com o servidor.
- **Push:** nenhum campo novo obrigatório no que o app envia.

**O risco: RN-VEN-45, o % do prazo**
- O app v1.0.13 não manda `prazo_percentual_ajuste` no pedido. O servidor v1.0.14 entende ausente como 0 e compara com o % do prazo no cadastro.
- Se o prazo tiver % diferente de 0 (ex.: À vista −1,71 da thathyany), o pedido **é recusado** com "Este prazo de pagamento mudou. Atualize o app e refaça o pedido.". Como não haverá app novo até a v1.0.15, o vendedor fica **sem conseguir vender** com aquele prazo.
- Hoje o % fica em 0 em produção:
  - o consumidor da v1.0.13 não grava o %;
  - o Conector publicado é o 1.4.0, que não conhece o campo;
  - o 1.5.0 está no main, mas não foi publicado.
- O % passa a valer se, depois do deploy, alguém:
  - mandar a carga por arquivo com a coluna `prazo_pagamento.percentual_ajuste` preenchida; ou
  - publicar o Conector 1.5.0 com o "% Acres.Fin." mapeado.

## O que preciso
Uma decisão antes do deploy (a resposta curta basta):
1. **Recomendo: deploy como está, com uma trava de operação até o APK da v1.0.15.**
   - Não publicar o Conector 1.5.0.
   - Não preencher o "% Acres.Fin." na carga por arquivo.
   - Isso fica escrito no quadro e na issue de liberação.
   - Não precisa de PR nem de CI novo.
2. **Correção no servidor antes do deploy** (modulo-vendedor): o pedido sem o campo (app antigo) passa a ser aceito com o % que veio do app (0), com um aviso na linha do tempo. O pedido sai **sem** o desconto ou acréscimo do prazo.
   - Custa um PR, um CI e a frase.
   - Muda a RN-VEN-45, e o preço do pedido fica diferente do que o ERP espera.
3. **Adiar o % do prazo inteiro** para a v1.0.15. Na prática, é a opção 1.

Separar o roteiro (#482) entre o que se testa só com o servidor e o que fica para o APK da v1.0.15 entra no PR de documentação da v1.0.15, como o senhor pediu. Para o reteste da v1.0.14, uso só a parte do servidor.

## Pronto quando
O senhor escolhe 1, 2 ou 3. O resto do caminho continua o mesmo:
- main verde (rerun do run 44232491470 ou o agendado das 03h);
- frase nova do #485 ("autorizo o merge do PR #485 no commit 2878f90b97fbc5a3b64d7e8983a3a1216427b279");
- reteste do corretor e da marca;
- recado "PRONTO PARA LIBERAR v1.0.14 (só servidor)" com o SHA.
