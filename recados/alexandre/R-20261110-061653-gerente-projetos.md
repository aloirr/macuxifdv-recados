---
id: R-20261110-061653-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: alta
tarefa: null
responde_a: R-20261110-062242-alexandre
encerra: false
contrato: null
criado_em: 2026-11-10T06:16:53-04:00
---
# Os 11 lidos e na esteira (T-0144 a T-0155); plano por dia até sexta e riscos

## Contexto
Rodada de 10/11 às 06h22 (teste da v1.0.2). Os 11 recados, o 062506 e os 2 de 09/11 às 20h22 foram lidos e distribuídos. As 7 vagas estão ocupadas desde agora.

## O que foi feito
Tarefas abertas:
- **T-0144:** queda na 1ª abertura (engenheiro-apps; prioridade 1, bloqueia a v1.0.5).
- **T-0145:** permissões obrigatórias (designer-ux faz a imagem; engenheiro-apps a lógica; engenheiro-software a base LGPD do tracking).
- **T-0146:** ficha sem repetição (modulo-core).
- **T-0147:** fotos do PDV (engenheiro-software desenha → banco → core → shell).
- **T-0148:** aba Itens com popup (imagem → modulo-vendedor).
- **T-0149:** filial (engenheiro-software desenha → banco → integração → catálogo → core → vendedor).
- **T-0150:** Resumo e detalhe em tabela (imagem → modulo-vendedor).
- **T-0151:** regras e defeitos do pedido (modulo-vendedor, já começou).
- **T-0152:** auditoria do corretor.
- **T-0153:** revisão de todas as telas (fluxo de venda primeiro).
- **T-0154:** novas tentativas no 403 do GHCR.
- **T-0155:** demo com os 3 faturados (a meta não muda).

Docs:
- RN-CORE-13 reescrita (sai o "nunca rastro"; tracking só com a base LGPD).
- Novas RN-CORE-37 (permissões), RN-CORE-38 (fotos do PDV, com as suas 2 premissas) e RN-CORE-39 (filial).
- RN-VEN-10, RN-VEN-11 e RN-VEN-18 atualizadas.
- Novos RF-CORE-15, RF-CORE-16 e RF-CORE-17.
- Doc 05 com o plano abaixo.

## Plano por dia
- **Ter 10/11 → v1.0.3 (noite):**
  - T-0144 (se a causa sair hoje), T-0151, T-0146, T-0155 (base recriada), T-0154;
  - correções da auditoria T-0152 no texto do fluxo de venda;
  - aviso "Pedido guardado em Rascunhos", data do preço no PDF do BKO e RD do lote 03;
  - hoje mesmo, para você aprovar: as imagens do Resumo e do detalhe, da aba Itens, das permissões e das fotos do PDV;
  - o desenho da filial e das fotos do PDV.
- **Qua 11/11 → v1.0.4 (noite):**
  - T-0150 e T-0148 (se as imagens forem aprovadas na terça), T-0145, T-0147 e T-0149;
  - robustez: T-0078, T-0107 e T-0119 ("lento, nunca travado", no aparelho).
- **Qui 12/11:** congelamento (só correção) e ensaio da produção (publicar com as novas tentativas no GHCR, tenant, carga inicial, restauração do backup).
- **Sex 13/11:** v1.0.5 oficial. **Sáb 14/11:** produção.

## Riscos ao cronograma
1. **T-0144:** sem a causa, não há v1.0.5. É a prioridade 1, com a investigação começando agora.
2. **Filial:** toca 6 donos e o contrato do ERP (Hub e Conector). É o maior risco da semana.
3. **Fotos do PDV:** banco, API, BKO e app, em paralelo com a filial.
4. **Imagens:** cada uma não aprovada no mesmo dia empurra a tela em um dia.
5. **GHCR:** 403 na publicação de sábado. As novas tentativas mitigam, e o ensaio confere.

## Decisões que preciso de você
1. Se a filial ou as fotos do PDV não estiverem verdes na v1.0.4 (quarta, 23h), proponho terminá-las na quinta como **única exceção ao congelamento** e ensaiá-las na própria quinta. A alternativa é deixá-las fora da v1.0.5 e lançá-las na v1.0.6, na segunda 16/11, com a produção já no ar. Qual prefere?
2. T-0112 (multiperfil), T-0091 (super-admin) e a revisão das telas fora do fluxo de venda (T-0153: Rota, Catálogo, Treinamento, Pesquisa, Promotor, Perfil, Gestão e BKO) seguem na esteira **depois** do fluxo de venda, sem prazo de sexta. Ok?

## Pronto quando
Você responde às 2 decisões. O status vai no recado diário das 18h.
