---
id: R-20261107-012858-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0088
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T01:28:58-04:00
---
# T-0088 A2 / T-0084 critério 5: APKs de preview do e9a65286 FINISHED e roteiro ao Alexandre (R-20261107-012839)

## Contexto
CI do main no e9a65286 (run 42345139040) verde com os 9 jobs e o ci-ok. Checkout limpo C:\macuxifdv-check destacado no e9a65286, pnpm install --frozen-lockfile sem resolução, bundle Android campo e gestao verdes (2068 módulos). Builds EAS só de preview: Campo dff66d39 (23 min) e Gestão 0558dbc9 (21 min), gitCommitHash e9a65286. Os dois perfis são preview e não houve build de produção.

## O que preciso / o que mudou
Links e roteiro do §6 do docs/desenho/T-0088.md no R-20261107-012839, com cópia a você: (A) instalar por cima do APK anterior, com fila, visita e rascunho feitos offline, e abrir sem sinal e depois com sinal; (B) Diagnóstico 'SQLite (macuxi-u-h…-t-demo.db)'; (C) medição de 20 mil produtos com o p95 da aba e da C9 < 300 ms, a reindexação e os quadros; (D) outro usuário no mesmo aparelho. Aviso de recriar a base da demo ANTES de preparar a fila do passo A.

## Pronto quando
Fica pronto quando o Alexandre devolver A a D e o relatório da medição; os números entram na entrega final do A2. Não fiz commit, não rodei Docker, não li .env e não alterei arquivo no repositório principal além do diário.
