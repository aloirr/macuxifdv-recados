---
id: R-20261105-200025-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T20:00:25-04:00
---
# Status das 20h (05/11): lotes P, Q e R no main, demo no 0263f9f, Adicionar ao pedido pronto, 7 pendências suas

## Contexto
Status das 20h de 05/11. Se a rodada seguir, o próximo sai às 22h, também por recado.

## Entrou no main desde as 18h (doc 07: CI verde no commit exato, sem force, verificar --por-commit e trailer OK, revisões sem 🔴)
| Lote | Hashes | Conteúdo |
|---|---|---|
| P | f702090..158bdec | Coordenação: quadro, T-0081 e T-0083 concluídas, diários e recados |
| Q | 158bdec..dce8f39 | **Seed da demo sem número de pedido repetido** (era a causa do 000011 duplicado): pedido do seed sempre acima do maior número já emitido, número do aparelho preservado. **Catálogo:** vitrine com um só botão principal por tela. **Kit:** rodapé sem "puxe para sincronizar" no modo sem sinal |
| R | dce8f39..0263f9f | **"Adicionar ao pedido" a partir do Catálogo:** o item entra no editor certo (pedido novo, em edição ou aberto pela ficha do cliente), com Desfazer e aviso quando o produto não tem preço. O promotor nunca vê o botão (regra 7), e há teste que prova isso. **Pedidos:** atualização automática e rodapé de última sincronização |

**Demo publicada no 0263f9f** (api 200, bko 200).

As revisões pegaram dois 🔴 no "Adicionar ao pedido" antes de ele subir:
1. o voltar levava 2 toques e o produto podia voltar ao pedido;
2. no pedido em edição, o item ia parar num pedido novo.

Os dois foram corrigidos e reconferidos.

## Número 000011 na demo
A correção do seed está no main, mas **a base da VM só muda se a base for recriada** pelo workflow manual "demo — recriar base demo". O deploy normal não roda o seed. Recriar a base é decisão sua: apaga os dados da demo e os semeia de novo. Hoje o banco já não aceita dois pedidos com o mesmo número. O 000011 repetido que você viu era um pedido que só existia no aparelho, e o app já limpa esse caso quando a base é recriada.

## Builds
- **APK do f0dcf03** (enviado às 18h10, R-20261105-181001): etapa pendente, Minha RV, "‹ Início", Catálogo. O roteiro continua valendo.
- **APK do 0263f9f:** build rodando agora na Expo, com o "Adicionar ao pedido". Mando os links por recado assim que terminar.

## % por sprint (tarefas concluídas no quadro)
- Sprints 0, 3 e 5 a 8: 100%.
- Sprint 1: 94%.
- Sprint 2: 96%.
- Sprint 4: 80%.
- Sprint 9: 2 de 10 (T-0081 e T-0083). As outras fecham com a sua conferência no APK e os números da medição.

## Preciso de você (pendentes)
1. **Conferência no APK** do f0dcf03 e, depois, do 0263f9f. Com o seu "ok", fecho T-0039, T-0082, T-0071, T-0072, T-0076, T-0077 e T-0079.
2. **Números da tela de medição** (fecha a T-0008).
3. **Custo do BV1-4-10** (fecha a T-0075 e torna a ADR 0024 aceita).
4. **Autorização do job do CI sem superusuário** (ci.yml).
5. **Cor do selo do orçamento:** roxo, como está, ou âmbar, como na referência.
6. **Resposta ao R-20261105-124257** (trailer do 108e18a, sem mexer no histórico).
7. **Se quer recriar a base da demo agora**, para a numeração nova valer lá.
