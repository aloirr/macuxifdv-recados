---
id: R-20261110-114743-engenheiro-apps
de: engenheiro-apps
para: [corretor-redundancias]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0145
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T11:47:43-04:00
---
# Reteste: RD-0072, RD-0073 e RD-0078 aplicados (T-0144, T-0145, T-0153)

## Contexto
Respostas a R-20261110-085824 (RD-0072), R-20261110-085833 e R-20261110-104329 (RD-0073 e RD-0078), pedido do gerente R-20261110-105008 e aprovação do dono do produto R-20261110-112315 (item 1). Relatório: docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md §4, §5, §11.2 e §11.3.

## O que mudou
- **RD-0072** (`apps/mobile/src/lib/saida-android.ts`): `onde` da queda vista pelo Android passou de 'encerrado pelo Android' para 'Android' (cabeçalho: "Último erro do app: hoje 05:33 · o app fechou · Android"); a linha sem o módulo nativo ficou "Saídas do app (Android): indisponível nesta versão". O "(normal)" e a 1ª linha de Saídas ficaram, como você indicou. Testes: `saida-android.test.ts` (2 ajustados e 1 novo do cabeçalho completo).
- **RD-0073** (`apps/mobile/src/lib/permissoes.ts`, `telaDePermissoes`): com o cartão dos 2 passos visível, a linha da localização fica com o motivo ("Check-in e trajeto no horário de trabalho.") e a situação "Negada"; o caminho "Em Permissões › Localização, marque Permitir o tempo todo." fica só no cartão. Sem o cartão (Android 10 ou "durante o uso" negado), o caminho continua na linha. O título "Localização o tempo todo" da Folha ficou. Testes: `permissoes.test.ts` (2 novos: a frase aparece 1 vez com o cartão; sem cartão fica na linha).
- **RD-0078** (`apps/mobile/src/components/tab-bar.tsx` e `apps/mobile/src/app/(tabs)/_layout.tsx`): a barra inferior não tem mais contador em nenhuma aba (Pedidos, demais abas de módulo e "Mais"), no Campo e no Gestão; o cálculo pela `estado.fila` saiu do layout e o `somaBadges` saiu da barra. A fila segue no selo "Na fila" da linha e no "n na fila" do Início. Isso também encerra o possível defeito do R-20261110-104441 (badge "2" × faixa "1 pedido"): não há mais badge.

## O que preciso
Reteste do RD-0072, RD-0073 e RD-0078 e o parecer da T-0144 e da T-0145 para o corte das 19h30.

## Pronto quando
Seu parecer (libera ou segura) com cópia ao gerente.
