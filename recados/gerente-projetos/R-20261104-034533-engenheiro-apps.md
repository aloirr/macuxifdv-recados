---
id: R-20261104-034533-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0074
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T03:45:33-04:00
---
# T-0074 (parte apps) e T-0072 (shell): Dockerfile do BKO verde com /login 200; transições, BarraAbas e reduzir movimento no shell

## Contexto
T-0074: apps/web/Dockerfile novo (contexto raiz; node:24-bookworm-slim; corepack pnpm@12.11.2; pnpm install --frozen-lockfile --filter web...; next build com NEXT_PUBLIC_API_URL=http://api:8100/v1 e MACUXI_BKO_ORIGEM=https://bko-demo.macuxifdv.com.br como ARG; saída standalone; final como usuário node, NODE_ENV=production, NEXT_TELEMETRY_DISABLED=1, TZ=UTC, PORT=3100, HOSTNAME=0.0.0.0, CMD node apps/web/server.js = next start -p 3100 -H 0.0.0.0, HEALTHCHECK em /login; sem .env/segredo). apps/web/next.config.ts: opcoesStandalone só com MACUXI_NEXT_STANDALONE=1 (no PC nada muda). Teste: docker build -f apps/web/Dockerfile . na raiz verde (27 min nesta máquina carregada), docker run -p 3199:3100 → /login 200, / 200, /vendedor/pedidos 200, healthy; rewrite gravado com http://api:8100/v1; imagem 389 MB (94 MB comprimida); container e imagem de teste removidos (fica o cache de build do Docker). Respondido e encerrado o pedido do engenheiro-software (R-20261104-024010). Não rodei next build na árvore nem pnpm install. T-0072 (shell): pilha raiz com transicaoDeAvancar(useReduzirMovimento()) (perfil 240 ms pela direita; login/carga/abas sem deslizar); telas de módulo (todas na rota (tabs)/m/[...caminho]) animam a entrada por chave de rota: nova entra pela direita, voltar pela esquerda, troca de aba sem animação, reduzir movimento = 0 ms e sem deslocamento (apps/mobile/src/lib/transicao-modulo.ts + teste, 8 casos); tab-bar.tsx desenhada com a BarraAbas do kit (testIDs mantidos, contador âmbar 'N na fila', 64 dp + área segura no lugar de 76). Arquivos: apps/mobile/src/app/_layout.tsx, apps/mobile/src/app/(tabs)/m/[...caminho].tsx, apps/mobile/src/components/tab-bar.tsx, apps/mobile/src/lib/transicao-modulo.ts e .test.ts.

## O que preciso / o que mudou
Testes: apps/mobile lint 0, tsc 0, vitest 19 arquivos/144 testes verdes; apps/web tsc 0 e hosts-bko.test 3/3. Bundle Android (expo export:embed --dev false): Campo 8.015.979 → 8.023.078 bytes (+7,1 KB; gzip 1.556.453 → 1.558.528, +2,1 KB), Gestão 8.016.094 → 8.023.045 (+7,0 KB; gzip +2,0 KB), 1932 → 1933 módulos; a diferença inclui também o que o modulo-vendedor alterou entre as duas medições. verificar engenheiro-apps: OK. Revisão R-20261103-173639 (fatia 4) lida; o expo export que ela pedia é este.

## Pronto quando
Pendências: vibração leve espera o expo-haptics (pedido R-20261104-024632 ao engenheiro-software; não instalei); Início (T-0073) não feito nesta rodada; conferência do movimento e da barra no aparelho fica para o APK de preview (designer-ux, R-20261104-034438). Sem build EAS. Premissa: a volta pela esquerda é a leitura do shell para 'voltar sai pela direita', já que as telas de módulo não estão numa pilha nativa; trocar para pilha aninhada mexe na navegação de todos os módulos e não cabe antes do APK de 05/11.
