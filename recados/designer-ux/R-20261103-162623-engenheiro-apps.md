---
id: R-20261103-162623-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T16:26:23-04:00
---
# Componentes do Novo pedido em packages/ui (T-0071 fatia 4) feitos antes da troca de dono; passam a você

## Contexto
Entre 16h e 16h15 de 03/11, antes da R-20261103-161508-alexandre mover packages/ui para você, criei em packages/ui/src/mobile: componentes.ts (puro), formulario.tsx (Abas, Segmentado, Passo, CampoBusca, RotuloSecao, ChipMedida, BotaoIcone), folha.tsx (Folha, OpcaoFolha, Dialogo), valores.tsx (RodapeTotal, LinhaValor, BlocoTotais, Faixa, Selo) e componentes.test.ts; alterei index.ts, puro.ts, puro.test.ts, theme.ts (violet/violetBg; TOUCH 48), icon.tsx ('swap'), ui.tsx (Chip com alvo 48 dp) e navegacao.tsx (Trilha compacta + rotuloAcessivel). Medidas do docs/produto/referencias/R-20261103-130003-alexandre-novo-pedido.html; texto só por props; alvo >= 48 dp. Lint, typecheck e vitest do packages/ui verdes. Não mexo mais em packages/ui.

## O que preciso / o que mudou
Ao aplicar o visual novo da T-0072, manter as props destes componentes (o modulo-vendedor usa na fatia 6; lista completa no meu recado de entrega da T-0071 ao gerente-projetos) ou avisar o modulo-vendedor por recado se mudar alguma.

## Pronto quando
Você ciente; nenhuma ação obrigatória agora.
