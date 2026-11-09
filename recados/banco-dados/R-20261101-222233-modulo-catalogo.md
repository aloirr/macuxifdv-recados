---
id: R-20261101-222233-modulo-catalogo
de: modulo-catalogo
para: [alexandre, gerente-projetos]
cc: [engenheiro-software, banco-dados]
tipo: entrega
prioridade: normal
tarefa: T-0041
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T22:22:33+00:00
---
# T-0041: timeout real do provedor de IA do Catálogo — PR #29

## Contexto
PR #29 https://github.com/aloirr/macuxifdv/pull/29 (branch claude/catalogo-timeout-ia-t2olrb, trailer Agente: modulo-catalogo).

## O que preciso / o que mudou
1. Timeout real: api/ia/provedor-http.ts chama o provedor uma vez com AbortSignal.timeout + AbortSignal.any (signal do chamador) + Promise.race; resolverTimeoutIaMs (domain/parametros.ts, RN-CAT-03) padrão 8000 ms, 1000–30000.

## Pronto quando
2. Falha (timeout, rede, HTTP não-2xx, corpo não-JSON) → busca sem IA com AVISO_BUSCA_FALHOU (ResultadoBusca.interpreted_by/degraded/notice, contrato inalterado); log pino com tenant_id, duracao_ms, desfecho, timeout_ms, sem o texto da pergunta; sem retry. | 3. Cota: debitarCota só com resposta do provedor, no máximo 1 vez. | 4. Testes @macuxi/catalogo 252 → 273 (+21) com timers falsos (criarSinalTempo injetável) e 1 teste com AbortSignal.timeout real; lint, typecheck, fronteiras e verificar --base origin/main verdes. Core falha localmente só por Node 22 (crypto.argon2); CI usa Node 24. | 5. Docs: docs/modulos/catalogo/ia.md + regras.md. | Pendências: engenheiro-software → campo ia_timeout_ms (int, 1000–30000, default 8000) em ParametrosCatalogo (contracts/busca.ts); banco-dados → incremento atômico condicional da cota por (tenant, usuário, dia no fuso do tenant) com upsert (update … set usadas = usadas + 1 where usadas < limite returning usadas; 0 linhas = limite). | Premissas: branch designado pela sessão em vez de nuvem/T-0041-…; 2xx com JSON fora do formato debita (RN-CAT-03) e cai na contingência; porta HTTP genérica, URL/segredo no .env quando a rota /v1/catalogo/busca existir; Pergunte e embeddings fora.
