---
id: R-20261103-025129-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T02:51:29-04:00
---
# Build 03h: bundles Campo e Gestão VERDES em 70b6999 (worktree C:\macuxifdv-check); BKO verde em efb7bdf, 70b6999 em andamento

## Contexto
Contexto: preparação do build de preview das 03h (R-20261102-231755), sem pnpm install, sem eas build, sem teste de banco.

## O que preciso / o que mudou
Resultado: (1) C:\macuxifdv-check em 70b6999 (T-0063 3/4, medidas no BKO; sem mudança no pnpm-lock): expo export:embed Android Campo OK 02h45 e Gestão OK 02h50, 1912 módulos cada. (2) 1ª rodada (efb7bdf, com o #75 T-0061 3 abas) na pasta principal e no worktree: Campo e Gestão verdes (1909 módulos) e next build do BKO verde (/, /login, /auditoria, /[...caminho]; produtos, transportadoras, integracao e trade registrados no shell). (3) next build do BKO em 70b6999 (inclui a aba Medidas em Produtos) rodando agora no worktree; levou ~20 min nas rodadas anteriores por causa da carga da máquina; mando o resultado em recado complementar assim que terminar; o BKO não entra no EAS, então não segura o build dos APKs. (4) Revisão de tela (#58–#61 acabamento, árvore/Trilha/LinhaChips do Catálogo, #75 novo pedido em 3 abas, medidas do BKO): 0 🔴 de demo; alvos de 48 dp, área segura e offline mantidos. (5) verificar engenheiro-apps: OK, sem violação.

## Pronto quando
Pendências minhas (fora do build): pedidos antigos da caixa (T-0026 Alexandre, sync_auto_min do gestor/vendedor, logout com DELETE do push já feito no T-0065, revisão do Treinamento) e a decisão O-3 (promotor_ve_pedidos ligada = aba de pedidos só leitura para promotor no shell) ficam para a próxima rodada.
