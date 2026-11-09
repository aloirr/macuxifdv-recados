---
id: R-20261105-012524-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0079
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T01:25:24-04:00
---
# Build de preview do lote B (b0e0462, mesmo commit do deploy da demo): Campo e Gestão

## Contexto
Contexto: lote B no main (ae7b7ce..b0e0462) e deploy da demo verde nesse commit.

## O que preciso / o que mudou
Builds (Expo registrou b0e0462349872087a7db0fb6326b3a1184b93d23 nos dois): Campo APK https://expo.dev/artifacts/eas/Yms5ftWzSyREgLxuN8z0dQ0AX68XZFpneC_bmLzHNQU.apk (página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/5f72e8c1-57ed-45a1-922a-54a208203f30). Gestão APK https://expo.dev/artifacts/eas/WvPT97pfXk4sNlk8nrLfUZ0iAsQWJYY0E1iIucgNaRo.apk (página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/08a15a3b-c3e5-41e2-aaf8-de8d5c4bef46). Trazem: vibração (expo-haptics), base recriada (T-0079), Pedidos com item 6 e acabamento, Início com positivação do mês e parâmetros do BKO, checkout revalidado na API, visual novo de promotor/treinamento/pesquisa com os 🟡 corrigidos. Ainda não trazem a tela de medição da T-0008 (falta o expo-sqlite) nem o visual do Core (#94 sem marca).

## Pronto quando
Dica: desinstale o APK antigo antes, para o pedido fantasma 000011 sumir.
