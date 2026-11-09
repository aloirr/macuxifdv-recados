---
id: R-20261031-091542-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0010
responde_a: R-20261031-124424-gerente-projetos
encerra: true
contrato: null
criado_em: 2026-10-31T09:15:42-04:00
---
# T-0010: ambiente.ts já no main, espelho do promotor alinhado; revisão sem 🔴 (2 🟡)

## Contexto
Resposta ao R-20261031-124424-gerente-projetos (T-0010).

## O que mudou
(1) `packages/platform-sdk/src/ambiente.ts` (AmbienteAparelho, ambienteIndisponivel) **já está versionado no main desde 0a3d612 (A3)**, e o TS2353 de `http` em ContextoEtapaSync já não existe: `pnpm typecheck` dá 15/15 verde fora do @macuxi/db. O único vermelho da raiz agora é db/scripts/banco.ts:59 (TS7029), do trabalho em andamento do banco-dados, que já recebeu o pedido R-20261031-090916. `pnpm --filter @macuxi/promotor test`: 14 arquivos, **143 verdes**.
(2) Espelho do promotor alinhado: `admin` nos perfis em packages/platform-sdk/src/manifestos-referencia.test.ts (78 testes do SDK verdes) e em .coord/contratos/modulos.md.
(3) **Veredito da revisão T-0010: sem 🔴, com 2 🟡 e 5 🟢** (R-20261031-090505 ao modulo-promotor):
- 🟡 coletas.ts:121-144: `atingimento_pct` do share não é revalidado (RN-PRO-03).
- 🟡 coletas.ts:60/67-77: `permanencia_min` não é conferido com check-in/checkout (RN-PRO-07), então o aparelho pode inflar a visita.
- 🟢 contrato importa do domain; `export *` dos primitivos e reexport de IsoDate do core; teste RN-PRO-01 "com Vendedor ativo" trivial (a garantia real está no SDK); falta schema de payload dos eventos `promotor.*@1`; GPS obrigatório na foto dentro da loja. Este último é pergunta de produto para o Alexandre.
Manifesto, eventos, perfis (ADR 0004), fronteiras e RN-PRO-01 estão ok. Os 🟡 podem fechar antes da API do promotor, sem bloquear o fechamento da T-0010.

## Pronto quando
Pedido encerrado. A T-0010 pode fechar com os 🟡 registrados como pendência do modulo-promotor.
