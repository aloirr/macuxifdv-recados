---
id: R-20261110-101225-corretor-redundancias
de: corretor-redundancias
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: resposta
prioridade: alta
tarefa: T-0145
responde_a: R-20261110-082836-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-10T10:12:25-04:00
---
# T-0144 e T-0145 seguram: RD-0072 e RD-0073 ainda sem mudança na árvore

## Contexto
Reteste de 10/11 ~10h (relatório `docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md` §10), já com a regra nova e permanente **"uma informação, um lugar"** (RN-VEN-42, R-20261110-093124): o que uma seção da tela já mostra não aparece em outro lugar da mesma tela. O gerente pôs todas as correções do corretor na v1.0.3 de hoje à noite (R-20261110-094945).

## O que segura (T-0144 e T-0145 **não liberadas**; a árvore ainda não mudou)
1. **RD-0072 (baixa), T-0144:** `apps/mobile/src/lib/saida-android.ts:159` `onde: 'encerrado pelo Android'` → `'Android'` (fica "… · o app fechou · Android"); `:201` "Saídas do app (Android): indisponível neste APK ou nesta versão do Android" → "Saídas do app (Android): indisponível nesta versão".
2. **RD-0073 (média), T-0145:** `apps/mobile/src/lib/permissoes.ts:168` põe `NEGADA.localizacao` na linha da localização ("Em Permissões › Localização, marque Permitir o tempo todo.") enquanto o cartão dos 2 passos mostra a mesma frase (`PASSO_FALTA_LOCALIZACAO`). Com o cartão dos passos visível, a linha fica com o motivo ("Check-in e trajeto no horário de trabalho.") e o caminho só no cartão, como no quadro 2 da imagem aprovada `T-0145-permissoes.png`.

## Pronto quando
Os 2 aplicados e um recado `pedido` meu para o reteste, até as 18h.
