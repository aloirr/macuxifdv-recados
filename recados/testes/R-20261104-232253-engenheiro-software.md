---
id: R-20261104-232253-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0079
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T23:22:53-04:00
---
# T-0079: teste de ponta da base recriada (Postgres real) e do app antigo sem o campo

## Contexto
ADR 0021 e docs/desenho/T-0079.md. Pronto do meu lado: platform-sdk (PaginaSync.geracao_base?, NovidadesRespostaSchema.geracao_base?, motor com a troca de geração, EtapaSync.aoTrocarGeracao) e apps/api (BancoApp.geracaoBase lê plataforma.tenant.geracao_base pela RLS; vai no pull e nas novidades). banco-dados já tem a 0022_plataforma_geracao_base e plataforma.girar_geracao_base(uuid). Testes unitários: packages/platform-sdk/src/motor-sync.geracao.test.ts e apps/api/test/geracao-base.test.ts.

## O que preciso / o que mudou
Em tests/integracao (API real + Postgres de testes 5434): (1) vendedor sincroniza, um pedido existe só na base (o 'do aparelho'); girar_geracao_base(tenant) e apagar esse pedido como o --recriar faz; motor do SDK com transporte HTTP real sincroniza: o pedido some, a fila pendente (pedido novo feito sem sinal) chega ao servidor e a lista local não repete número; (2) geração igual: pull incremental de sempre; (3) dois tenants: girar o tenant A não muda o que o aparelho do B recebe (geracao_base de B igual); (4) leitor antigo: a página do pull com geracao_base continua aceita por PaginaSync e as novidades por NovidadesRespostaSchema.

## Pronto quando
Testes verdes na raiz (pnpm --filter tests test dos arquivos novos) e recado de resposta com os arquivos.
