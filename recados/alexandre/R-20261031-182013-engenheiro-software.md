---
id: R-20261031-182013-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0016
responde_a: R-20261031-172619-alexandre
encerra: false
contrato: null
criado_em: 2026-10-31T18:20:13-04:00
---
# zod: alerta GHSA-mrhx-c7xc-m3w5 nos afetava (push sem login); mitigado na API agora, migração zod 4 na Sprint 2

## Contexto
Item 3 do R-20261031-172619-alexandre: avaliar o alerta do zod antes de migrar. Alerta: GHSA-mrhx-c7xc-m3w5 (high, CVSS A:H, sem autenticação) — "Zod can exhaust memory while validating oversized constrained collections": o ZodArray acumula um problema por elemento inválido, sem teto e sem parar cedo. Corrigido só na 4.6.6 (linha 4).

## O que preciso / o que mudou
**Resultado: o alerta nos afeta de verdade, mas a exposição foi fechada nesta rodada no código da API; a migração para o zod 4 fica para a Sprint 2.**
- Versão instalada: zod 3.25.76 em todos os pacotes (api, platform-sdk, conector, mock-api e os 8 módulos). O pnpm audit aponta o caminho via @expo/cli, mas o nosso 3.25.76 também está na faixa (< 4.6.6).
- A função atingida existe no zod 3 que usamos (`import { z } from 'zod'` = API clássica, não o `zod/v4`). Medi no 3.25.76: um `{"itens":[0,0,…]}` de ~1 MB com 500 mil elementos contra o `PushRequestSchema` (que tem `.max(500)`, mas o zod 3 valida todos os elementos mesmo assim) gera 500.001 problemas, +182 MB de heap e 1,6 s de CPU por requisição.
- Exposição real: `POST /v1/sync/push` validava o lote ANTES da sessão, ou seja, sem login. Algumas requisições em paralelo derrubariam a API por falta de memória. As rotas de módulo já autenticavam antes do Zod. As rotas públicas (login/refresh) validam o corpo antes do limitador.
- Correção feita agora (apps/api, meu caminho; não precisou de tarefa nova):
  1. `createApp` recusa com 413 `CORPO_GRANDE_DEMAIS`, antes de qualquer schema, todo corpo JSON com mais de 50 mil elementos de array somados, em qualquer profundidade (gancho `preValidation`). Vale para todas as rotas, inclusive login e push.
  2. O `POST /v1/sync/push` exige a sessão antes do schema (401 sem login).
  3. O 400 de validação devolve no máximo 50 problemas, com `total_problemas`.
  Testes em `apps/api/test/arquivos.test.ts` ("proteção do Zod"). Com o teto, o pior caso cai para ~50 mil problemas (~18 MB, ~0,2 s), só com sessão, e dentro do bodyLimit de 1 MB do Fastify.
- Restam o app (valida respostas do nosso servidor: entrada confiável) e o Conector (lê o ERP do próprio cliente; o Hub ainda não tem rotas). Quando o Hub /integracao/v1 existir, ele herda o mesmo teto do createApp.
- Proposta: tarefa na **Sprint 2**, engenheiro-software + donos dos contracts, "Migrar para zod 4 (>= 4.6.6)", com ADR. Ela mexe em todos os contracts (`z.record`, `.passthrough`, `ZodTypeAny`, mensagens) e precisa de uma rodada sem outras mudanças nos contracts. Gravidade residual baixa, por isso não entra na Sprint 1.
- De passagem, no mesmo audit: tinypool (crítico) e vitest/@vitest/mocker (moderados) só entram em teste, nunca em produção. Proponho subir para o vitest 4 na mesma tarefa da Sprint 2. Os demais alertas são de ferramentas do Expo e do drizzle-kit (só desenvolvimento).

## Pronto quando
Informativo: avaliação feita e mitigação no main na próxima subida do gerente. Peço ao gerente-projetos (cópia) que abra a tarefa da Sprint 2.
