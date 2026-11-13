---
id: R-20261112-232916-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: alta
tarefa: null
responde_a: R-20261112-220838-alexandre
encerra: false
contrato: null
criado_em: 2026-11-12T23:29:16-04:00
---
# Lidos e confirmados; kit ~2h (corretor achou comando quebrado no roteiro); BUILD PRONTO v1.0.5 com tudo: domingo 15/11 (firme até 1h); reabrir 13/11 7h

## Contexto
Resposta ao R-20261112-220838. Você tem razão: a minha caixa estava atrasada. Li agora os recados 183709, 204134, 204602, 204639, 210236, 212507 e 211903, além dos do Catálogo (180555, 181237 e 181527). Peço desculpas pelo recado das 21h08, que repetiu pedidos que você já tinha respondido.

## Confirmações e o que já fiz
- **T-0168 aprovada.** O doc 03 está atualizado com a frase única "Pedido acima do desconto máximo (X%)", a trava pelo valor exibido e a saída da ajuda da linha "por pedido".
  - O core já implementa a aba Parâmetros e o sync. O vendedor implementa a trava no app e na API.
  - O engenheiro troca a regra para o valor exibido, com teste: 8,04% não trava, 8,05% trava.
- **T-0171 aprovada,** com "Devendo", "Pré-Cadastro" e o filtro "Devendo". A regra nova RN-CORE-41 está no doc 03. O core já começou a implementar.
- **Catálogo sem cliente:** o preço vem da filial padrão do vendedor e, se não houver, aparece "Sem preço". Está no doc 03 (RN-VEN-01). A imagem nova do Catálogo é a próxima do designer-ux, depois da marca.
- **Tudo na v1.0.5.** O engenheiro-software está montando o plano realista, com as horas, a ordem, o caminho crítico e os **prompts das frentes da nuvem** com caminho exclusivo. Entrega até 1h.
- **Regras do corretor aprovadas.** O engenheiro prepara o patch do arquivo do agente e eu aplico pelo rito, citando o seu 212507, junto com o doc 07 e o CLAUDE.md.

## As 4 respostas
1. **Link do kit:** ainda não. O testes liberou, mas o corretor não: achou 15 ajustes, 1 deles alto, e 7 defeitos. Um dos defeitos é um comando quebrado no roteiro (`ROTEIRO.md:39-40`), que pararia você no notebook. A integração está corrigindo até 0h30, e depois vêm o reteste e o pré-release. **Previsão do link: 13/11, por volta das 2h.**
2. **Previsão do BUILD PRONTO da v1.0.5, com tudo dentro:** a estimativa preliminar é **domingo, 15/11, à tarde**. A T-0170 sozinha traz tela nova, aba nova, tarefas do BKO, metas de produtividade, frase do dia e avatar. O número firme, com a ordem e quem faz o quê, vem do plano do engenheiro até 1h; mando assim que chegar.
3. **Hora de reabrir o VS Code:** **13/11 às 7h.** Às 6h30 eu gravo `docs/status/retomada-2026-11-12.md` e mando "pode reabrir". Aí você:
   - fecha o VS Code inteiro;
   - abre em `C:\macuxifdv`;
   - escreve: "Retome a esteira: leia docs/status/retomada-2026-11-12.md e a caixa do gerente".
4. **Merge dos desenhos da nuvem** (`nuvem/T-0170-tarefas-consultor`, `-inicio-desenho`, `-performance-desenho`) **e do PR #116 (marca):** o GitHub está recusando a conferência do guardião (TLS timeout). Tento a cada rodada. Se quiser adiantar, faça pelo navegador:
   - Squash and merge;
   - na descrição, `Agente: <dono>`. No PR #116, o dono é `design-de-marca`.

## Pronto quando
O link do kit e o plano firme chegam à sua caixa.
