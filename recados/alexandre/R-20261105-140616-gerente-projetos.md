---
id: R-20261105-140616-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0072
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T14:06:16-04:00
---
# Status das 14h (05/11): lotes K, J e L e o PR #94 no main, demo no c8326fe, 4 pedidos para você

## Contexto
Status das 14h de 05/11. O próximo sai às 16h, também por recado.

## Entrou no main desde as 12h (doc 07: CI verde no commit exato, sem force, verificar --por-commit e trailer de governança OK, revisões sem 🔴)
| Lote / PR | Hashes | Conteúdo |
|---|---|---|
| K + J | fb1ef19..9e5e931 | Farol (T-0081), Plano de RV com a RV pela licença do tenant (T-0082, ADR 0025), onboarding `pnpm tenant:criar` (T-0083), alerta de etapa pendente no Gestão (T-0039), cliente bloqueado, estoque e "Vencido" (T-0071), novo pedido pela referência, kit, arnês de banco sem superusuário, imagem teste-db (T-0075) |
| L | 9e5e931..c8326fe | Preço mínimo arredondado para cima (RN-VEN-11), orçamentos da equipe no Gestão só leitura, valor digitado vale ao Salvar, histórico de telas por aba no shell (ADR 0026), aba acesa certa |
| **PR #94** | **21aa690** (squash, regra A) | Visual novo do Core no app: carteira, rota, visita, metas, notificações. Revisões do designer-ux e do engenheiro-software sem 🔴; `modules/core/app` destravado |

- **CI do main vermelho de 12h34 a 13h50:** foi o meu erro no trailer do commit de governança 108e18a, explicado no R-20261105-124257. Voltou ao verde no c8326fe sem mexer no histórico. Falta a sua resposta sobre aceitar assim.
- **Demo publicada no c8326fe** (api /v1/saude 200, bko 200), já com os lotes K, J e L. A publicação do 21aa690 (#94) sai quando o CI dele terminar; está rodando.

## Builds
O próximo build de preview (Campo e Gestão) sai do commit do main com o #94, assim que a demo publicar. O engenheiro-apps dispara, e eu mando os links por recado. Ele traz:
- o visual novo do Core;
- o novo pedido pela referência e o histórico de telas;
- o alerta de etapa pendente no Gestão.

O que conferir no APK com toque real:
1. Os campos de baixo do pedido ficam acima do teclado.
2. Digitar a quantidade e tocar direto em Salvar.
3. O voltar do Android: Início › Novo pedido › Salvar orçamento › voltar leva ao Início.
4. "Transformar em pedido" aparece sem rolar.
5. A tela de medição.

## % por sprint (tarefas concluídas no quadro)
- Sprints 0, 3 e 5 a 8: 100%.
- Sprint 1: 94%.
- Sprint 2: 96%.
- Sprint 4: 80%. A T-0071 está pronta no código e falta a conferência no APK; a T-0072 teve o último PR (#94) mesclado.
- Sprint 9: as tarefas fecham com o APK e os testes de banco no CI. Em teste: T-0039, T-0081, T-0082, T-0083, T-0079 e T-0080.

## O que falta para fechar a Sprint 9
1. **Lote M (Catálogo T-0052):** a busca usa as tabelas da 0013 (sinônimos, estoque, ficha, IA) e a busca offline com 2 mil produtos caiu de até 14 s para ~50 ms. O CI pegou 4 falhas de teste de banco que rodaram pela primeira vez (permissão em busca_log e 3 casos do sync); o modulo-catalogo e o testes estão nelas.
2. **Depois do #94, no Core do app:**
   - o chip "Etapa pendente" na Rota;
   - o selo no Cliente 360;
   - o 🟡 da folha de check-in que pode prender o vendedor numa falha de gravação;
   - os 6 🟡 de UX da revisão;
   - a RV do vendedor no app.
3. **T-0075:** o custo do BV1-4-10.
4. **T-0008:** os números da medição, no novo APK.

## Preciso de você (pendentes)
1. **Custo do BV1-4-10.**
2. **Autorização do job do CI sem superusuário** no `.github/workflows/ci.yml`.
3. **Cor do selo do orçamento:** roxo, como está, ou âmbar, como na referência.
4. **Resposta ao R-20261105-124257:** aceitar a regularização sem mexer no histórico.

## Decisões tomadas por mim (pode corrigir)
- Preço mínimo arredondado para cima ao centavo, igual no BKO, no app e na API (RN-VEN-11 no doc 03).
- O histórico de telas usa uma API instável do expo-router (`UNSTABLE_router`), com teste de guarda. A espera de 1 s foi trocada por uma marca interna do roteador (ADR 0026).
- Aprovei a melhoria do motor de sync do SDK para a busca com 20 mil produtos: três funções novas, cerca de meio dia.
