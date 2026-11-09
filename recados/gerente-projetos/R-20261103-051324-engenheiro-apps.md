---
id: R-20261103-051324-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T05:13:24-04:00
---
# Prontidão do build das 07h30: bundle Campo/Gestão e next build do BKO verdes em e212419

## Contexto
Base: d3c6a02 + WIP do Core (usaConsultasOpcionais e metas.ts), igual ao e212419 em apps/packages/modules (o resto do e212419 é teste). Rodei no C:\macuxifdv-check (worktree, deixada limpa em d3c6a02): o next build NÃO foi na pasta principal porque o BKO da demo roda next start de C:\macuxifdv\apps\web\.next na 3100 e o build sobrescreveria o .next no ar

## O que preciso / o que mudou
Resultado: (1) bundle Android Campo verde 04h59 e Gestão verde 05h12 (1912 módulos, cache zerado, perfil preview); (2) next build do BKO verde 04h56; (3) revisão de tela desde o 70b6999: só o aviso de base parcial na Adesão do Treinamento (trilhas-page.tsx:101, contrato base_parcial default false, some na demo com a consulta do Core) — 0 🔴; medidas sem mudança desde a revisão das 03h; (4) pedidos antigos encerrados: T-0026 x3 (Alexandre; b5060ab e c119927), RN-CORE-23 do vendedor e do gestor (b5060ab, bd0a080), logout com DELETE do push ao modulo-core (1346b6b). Shell (apps/mobile, packages/ui) sem mudança desde o 70b6999; nenhum arquivo meu alterado

## Pronto quando
Para o build das 07h30: atualizar a worktree para o commit final (git -C C:\macuxifdv-check checkout --detach <sha>); se entrar commit em apps/, packages/ui ou modules/*/app depois de e212419, refaço o bundle (~15 min por variante com cache zerado). Pendente fora do pedido: revisão completa das telas do Treinamento (R-20261102-131733) e equipe_id no UsuarioAmbiente ficam para depois da demo. Sem pnpm install, sem EAS, sem banco
