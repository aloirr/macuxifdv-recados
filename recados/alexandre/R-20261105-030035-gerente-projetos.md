---
id: R-20261105-030035-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0024
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T03:00:35-04:00
---
# Status das 3h: main estável em b0e0462; lote C barrado pelo CI e já corrigido, sobe após a revisão final

## Contexto
Status das 3h da noite autônoma de 04→05/11.

## Entrou no main desde a 1h
Nada novo: o main segue em **b0e0462** (lote B). O lote C foi barrado pelo CI antes do main e do deploy — a demo continua no b0e0462, estável.

## Builds
- Preview do lote B (b0e0462, mesmo commit do deploy): Campo https://expo.dev/artifacts/eas/Yms5ftWzSyREgLxuN8z0dQ0AX68XZFpneC_bmLzHNQU.apk · Gestão https://expo.dev/artifacts/eas/WvPT97pfXk4sNlk8nrLfUZ0iAsQWJYY0E1iIucgNaRo.apk (enviados no R-20261105-012524).
- Roteiro de teste do build final: docs/testes/roteiro-build-05-11.md (34 passos).

## O que travou (e o que fiz)
1. **Lote C (a628541) vermelho no CI:** o seed demo do Gestor gerava 31 eventos fora do contrato oficial (a T-0024 passou a validar pelo schema de cada dono). Corrigido pelo banco-dados (0 recusados, base da demo igual).
2. **Revisão final deu 🔴** no remendo que o Core fez nos consumidores do ERP para "ignorar com aviso" (aceitava qualquer payload como válido). **Já desfeito e confirmado sem 🔴** pelo engenheiro-software; os 3 testes passaram a refletir que o publicador já valida pelo contrato.
2b. **Defeito D-T0080a** (achado pelo testes): a positivação pelas notas só ligava se o usuário tivesse a licença de Integração no perfil. Decidi: vale a licença do **tenant**. O Core está corrigindo.
2c. **Migrações prontas (sem aplicar):** 0025 (vendedor da nota, T-0080) e 0026 (pendência de etapa do checkout, T-0039). Revisão final da 0026 e da regra pura da tolerância em andamento. Especificação de UX da pendência: docs/design/checkout-pendencia.md.
3. **expo-sqlite (T-0008):** o install mexeu no drizzle-orm da API e exigiu um `.pnpmfile.cjs` na raiz. **Não subiu nada disso**; fica para a sua decisão (abaixo). A tela de medição está pronta e revisada (sem 🔴), fora dos lotes.
4. **#94 (visual do Core):** sem a marca [PRONTO PARA MERGE]; `modules/core/app/**` continua travado.
5. **Erro meu:** por alguns minutos houve 5 agentes ao mesmo tempo (limite 4); registrado no diário.
6. **Docker do PC desligado:** testes de banco só no CI; d40267d (backup no deploy) continua bloqueado.

## Pronto e revisado, esperando o lote C (sobe assim que o 🔴 for desfeito e o CI ficar verde)
T-0024 completa (eventos de todos os módulos no contracts, catraca sem pendentes, subpath leve do SDK para o Conector); T-0078 log seguro (D-L1a: erro do Postgres sem dado pessoal no log) e D-C1a; D-T0039a (push processado na ordem da fila — checkout não passa mais na frente da resposta da pesquisa); T-0039 consulta `pesquisa.etapas_checkout@1` (ainda não chamada); T-0073 positivação gravada pelos eventos do Vendedor; T-0080 positivação pelas notas do ERP com o Vendedor desligado (com a migração 0025, em andamento); fuso do tenant no SDK; telas do Gestão (4 🟡 + Tentar de novo), ícone câmera no Promotor, chip "Não se aplica" na Pesquisa, carregamento do kit em cartão; seed demo corrigido.

## % por sprint (quadro)
Sprint 0 100% · 1 94% (T-0008 bloqueada pela sua decisão do expo-sqlite) · 2 93% (T-0024 pronta para o lote; T-0039 em teste) · 3 100% · 4 80% (T-0071/T-0072/T-0073 em fechamento; T-0072 espera o #94) · 5–8 100% · 9: 0/7 concluídas (T-0076, T-0077, T-0079, T-0039 em teste; T-0078 e T-0080 com a maior parte pronta; T-0075 depois de 06/11).

## Decisões novas que tomei (premissas para você confirmar)
1. **T-0039:** no servidor, etapa de outro módulo que ainda não chegou **não recusa** o checkout: aceita com pendência, que vira alerta em 24h (complemento da RN-CORE-12 no doc 03).
2. **T-0080:** com o Vendedor desligado, positivação = cliente com nota faturada não cancelada no mês, uma vez (RN-CORE-27 no doc 03); lida na hora das notas, sem cópia no indicador. Devolução não retira (premissa).
3. **expo-sqlite fora dos lotes** até você escolher: (a) aceitar o `.pnpmfile.cjs` (o drizzle da API deixa de puxar expo/react-native), ou (b) desfazer e buscar outra saída.

## Pronto quando
Próximo status às 5h, com o build final e o roteiro.
