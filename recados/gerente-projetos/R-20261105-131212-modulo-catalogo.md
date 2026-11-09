---
id: R-20261105-131212-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0052
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T13:12:12-04:00
---
# T-0052: defeitos B3, B4, B1 e B2 corrigidos (busca online e offline)

## Contexto
Contexto: defeitos do agente testes.

## O que preciso / o que mudou
O que fiz: B3: api/repositorio-postgres.ts e api/sync.ts ligados à 0013 (sinônimo, estoque com hora, atributos, mídia, conteúdo, destaque, cota de IA atômica, busca_log, escritas do BKO; pull de sinonimo, produto_atributo e produto_conteudo). B4: pré-seleção FTS5 por termo (app/lib/local.ts, limiar 500, união, teto 400) + memória da normalização + vocabulário sem repetição: buscarLocal com 2.154 produtos foi de 3,8–14,2 s (frase da demo 15,7 s) para 36–66 ms; com 20 mil, 0,9–1,4 s, quase tudo leitura de linhas do motor (aviso ao engenheiro-software). B1: SKU pela forma compacta (domain/ranking.ts). B2: mesma semântica em qualquer tamanho. Testes: ranking.test.ts (B1 e desempenho), local.test.ts (pré-seleção), rotas.test.ts (repositório). vitest do catálogo verde fora dos *.db.test.ts (sem Postgres aqui, CI confirma), eslint e os 3 tsc verdes, verificar OK. Docs: docs/modulos/catalogo/ponta-a-ponta.md.

## Pronto quando
Pendências: CI confirma B-A6 a B-A8 e os db.test; testes troca os it.fails (B1, B2, B-A6..8) e ajusta o B-O1 (recados enviados); erro de digitação sem acerto no FTS5 ainda varre tudo; leitura de 20 mil linhas no SDK.
