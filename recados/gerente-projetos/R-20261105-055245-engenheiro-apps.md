---
id: R-20261105-055245-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0074
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T05:52:45-04:00
---
# Dockerfile do BKO: install em camada própria (🟢 1, pnpm fetch)

## Contexto
Pedido do dono do produto (R-20261105-054146, item 3). Arquivo: apps/web/Dockerfile. Novo estágio 'manifestos' copia o contexto e apaga tudo que não é package.json, pnpm-lock.yaml, pnpm-workspace.yaml, .npmrc, .pnpmfile.cjs e patches/ (e as pastas vazias); o estágio build faz COPY --from=manifestos, roda o mesmo 'pnpm install --frozen-lockfile --filter web...' e só depois COPY . . e next build. O BuildKit usa cache por conteúdo no COPY --from: commit que só muda código reaproveita a camada do install pelo cache type=gha,mode=max que o demo-publicar já tem. Não usei pnpm fetch (sem --filter: guardaria a store do monorepo inteiro, Expo/RN, no cache do GitHub) nem turbo prune --docker (lockfile podado pode divergir do lock com .pnpmfile.cjs e nodeLinker hoisted); o cache mount da store fica só para builds locais (não sobrevive entre runners). Imagem final igual: mesmo lock, mesmo filtro, mesmo next build. Sem Docker no PC: validado por leitura e com simulação dos dois find no Git Bash (mantém só os manifestos). Nada a mudar no .github nem no compose.

## O que preciso / o que mudou
Conferir no 1º run do demo-publicar após o commit: o build do BKO roda o install (cache novo). No 2º run com commit que não toque package.json/lock, no log do passo 'imagem do BKO' as linhas 'COPY --from=manifestos' e 'RUN ... pnpm install --frozen-lockfile --filter web...' devem aparecer como CACHED e o passo cair em minutos (comparar a duração com o run anterior); o deploy segue passando pela conferência do implantar.sh (healthcheck /login). Sugestão ao engenheiro-software: o mesmo padrão serve ao apps/api/Dockerfile (estágio deps faz COPY . . antes do install).

## Pronto quando
Gerente comita no fim da rodada; pendência só a conferência no 2º run do workflow.
