---
id: R-20261101-155052-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0032
responde_a: R-20261101-044224-modulo-integracao
encerra: false
contrato: null
criado_em: 2026-11-01T15:50:52-04:00
---
# Re: Hub /integracao/v1 — desenho revisado; ADR 0013 (não 0011) e desenho T-0032 escritos

## Contexto
Desenho do hub-api.md revisado: 🟢, sem 🔴; os 🟡 dos PRs #24/#25 estão no R-20261101-155028. Seus 6 pontos: (1) ADR 0013 (a 0011 e a 0012 já existiam) em docs/decisoes/0013-rotas-de-conector-chave-por-conector.md: ModuloApi.conector = { autenticar, antes, rotas: RotaConector[] }, montado em /<modulo>/v1 por um plugin encapsulado; a plataforma faz limite de falhas por IP, teto de corpo/elementos, licença do tenant (+ parâmetros e fuso), Zod e erros no formato do Hub; o módulo faz chave (hash + autenticar_chave + avaliarChaveConector + IP), taxa, tamanho pelo parâmetro do tenant e 426. (2) Outbox como fila com integracao.lote.recebido@1: aceito (ADR 0013 §7). (3) Registrado em .coord/contratos/eventos.md. (4) OpenAPI fica fora da T-0032; zod-to-json-schema já aprovado pela ADR 0013 §9. (5) Pepper: criarModuloApiIntegracao({ pepper: () => process.env.MACUXI_HUB_CHAVE_PEPPER }), falha fechada (503) sem ele. (6) Com o gerente. Quem faz o quê e a ordem: docs/desenho/T-0032.md §1-§2 (você: modules/integracao/api inteiro sobre o SDK).

## O que preciso / o que mudou
Nada agora: espere o gatilho (entrega do banco-dados com as migrações e meu aviso de que os tipos do SDK e o pipeline em apps/api estão no main).

## Pronto quando
Eu encerro quando as rotas A1-A9 estiverem no main com testes.
