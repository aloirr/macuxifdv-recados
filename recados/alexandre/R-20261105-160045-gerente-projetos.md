---
id: R-20261105-160045-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0082
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T16:00:45-04:00
---
# Status das 16h (05/11): lote M2 e #94 no main, demo no 8ce8733, lote N em montagem

## Contexto
Status das 16h de 05/11. O próximo sai às 18h, também por recado.

## Entrou no main desde as 14h (doc 07: CI verde no commit exato, sem force, verificar --por-commit e trailer OK, revisões sem 🔴)
| Lote / PR | Hashes | Conteúdo |
|---|---|---|
| L | 9e5e931..c8326fe | Preço mínimo arredondado para cima, orçamentos no Gestão, valor digitado ao Salvar, histórico de telas por aba (ADR 0026) |
| **PR #94** | **21aa690** | Visual novo do Core no app, mesclado pela regra A |
| M2 | 21aa690..8ce8733 | Catálogo: busca e sync com as tabelas da 0013 (sinônimos, estoque, ficha, IA, BKO sem 503), busca offline com 2 mil produtos de até 14 s para ~50 ms, índices v2 do aparelho. Também: motor de sync com leituras novas, kit (rótulo do voltar, botão sobre escuro, folha com rolagem), Farol e Plano de RV no BKO |

**Demo publicada no 8ce8733** (api /v1/saude 200, bko 200). O CI do main voltou ao verde desde o c8326fe.

## Build
- O APK do 21aa690 (Campo e Gestão) foi enviado às 15h24, com o roteiro de 8 itens (R-20261105-152431).
- O próximo build sai depois do lote N. Ele traz:
  - o chip "Etapa pendente" na Rota e o aviso na ficha;
  - o cartão "Minha RV" em Metas;
  - o "‹ Início" no voltar;
  - o vazio novo da busca do Catálogo;
  - a fila do motor que não perde item.

## Lote N (montando agora; falta a revisão final e o CI)
- **T-0082:** o vendedor e o promotor veem a própria RV no app (cartão "Minha RV", offline com o último cálculo). A RN-CORE-30 foi atualizada no doc 03.
- **T-0039 no app:** chip na Rota, aviso na ficha (visita mais recente com pendência, plural certo), check-in que não prende o vendedor numa falha e folha com o teclado.
- **D-T0039d (achado do testes):** a fila do motor de sync atualizava a memória antes do disco. Com o disco cheio e o app fechando, um item podia se perder. Agora grava o disco primeiro, em todos os pontos da fila. De quebra, foi corrigido um defeito antigo na troca de geração da base.
- **Catálogo:** acima de 5 mil produtos, uma busca sem nenhum acerto devolve "Nada encontrado" sem varrer. Com 20 mil produtos no PC, caiu de 8,6 s para 80 ms. O vazio ganhou os textos do designer.
- **Shell:** "Início › Novo pedido" mostra "‹ Início".
- **Testes:** de ponta a ponta da etapa pendente no aparelho e de permissão da RV pela regra nova.

## % por sprint (tarefas concluídas no quadro)
- Sprints 0, 3 e 5 a 8: 100%.
- Sprint 1: 94%.
- Sprint 2: 96%.
- Sprint 4: 80%. A T-0071 e a T-0072 estão prontas no código e falta a conferência no APK.
- Sprint 9: as tarefas fecham com o lote N, o APK e os testes de banco no CI. Em teste estão T-0039, T-0079, T-0080, T-0081, T-0082 e T-0083, e a T-0052 está perto.

## O que falta para fechar a Sprint 9
1. O lote N no main, seguido do APK.
2. A sua conferência no APK: o roteiro dos 8 itens, mais o chip, a "Minha RV" e o voltar.
3. **T-0075:** o custo do BV1-4-10.
4. **T-0008:** os números da tela de medição.

## Preciso de você (pendentes)
1. **Custo do BV1-4-10.**
2. **Autorização do job do CI sem superusuário** (`ci.yml`).
3. **Cor do selo do orçamento:** roxo, como está, ou âmbar, como na referência.
4. **Resposta ao R-20261105-124257:** regularização do trailer sem mexer no histórico.

## Decisões tomadas por mim (pode corrigir)
- **RN-CORE-30:** vendedor e promotor veem a própria RV; o assistente continua sem ver.
- **Busca sem acerto acima de 5 mil produtos:** responde vazio. Quando a busca falha, continua varrendo.
- **Backlog (docs/backlog.md):**
  - o botão "Ver fila" no aviso;
  - o aviso no app Gestão;
  - o selo da etapa pendente no Cliente 360 do BKO;
  - o 🟢 do código compacto no Catálogo.
