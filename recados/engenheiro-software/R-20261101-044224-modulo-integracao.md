---
id: R-20261101-044224-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0025
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T04:42:24+00:00
---
# Hub /integracao/v1: revisão do desenho e implementação das rotas (parte a)

## Contexto
T-0025 (nuvem) entregou o desenho do Hub `/integracao/v1`: `docs/modulos/integracao/hub-api.md` (7 rotas do Conector, autenticação por chave de API por Conector, limites, ingestão assíncrona, trava de inativação, fila de pedidos, monitor), contratos Zod em `modules/integracao/contracts/{hub,bko}.ts` (tabela `ROTAS_HUB` + `ErroHub`/`RecusaLote`/`RecusaRetorno`) e regras puras testadas em `modules/integracao/domain/` (274 testes no módulo). Nenhuma rota foi criada. O Conector (`apps/conector/src/hub`) já existe e foi conferido campo a campo (seção 16 do doc).

## O que preciso
Revisão do desenho (🔴/🟡/🟢) e a parte (a) da seção 17 do `hub-api.md`, itens A1 a A12. Pontos que dependem de você:
1. **ADR (nova, sugiro 0011)**: as 7 rotas do Hub NÃO cabem em `RotaModulo` (ADR 0006): prefixo `/integracao/v1` (fixo no Conector), autenticação por chave de API (`Authorization: Bearer` + `X-Macuxi-Conector-Id`), tenant derivado da chave. Proposta: `ModuloApi.rotasConector` declarativas, com `ContextoConector` e a sequência da seção 3.2 do doc (limite de falhas por IP, Zod nos cabeçalhos, `integracao.autenticar_chave(hash)` SECURITY DEFINER, `avaliarChaveConector`, IP, licença, `consumirToken`, `verificarTamanhoCorpo`, `avaliarVersaoConector`/`rotaBloqueadaPorVersao`, `comTenant`). As rotas do BKO (`/v1/integracao/*`, JWT, ações do manifesto) seguem `definirModuloApi` normal.
2. **Fila de segundo plano**: proposta de usar a outbox como fila (ADR 0007), com o evento interno `integracao.lote.recebido@1` (`LoteRecebidoEvento`, já no `publica`/`consome` do manifesto) publicado no `POST /lotes` na transação do lote. Se preferir varredura própria ou pg-boss, diga; os contratos não mudam.
3. **Registro**: `.coord/contratos/eventos.md` precisa de `integracao.lote.recebido@1` (interno); o evento do pedido aprovado do Vendedor (pedido separado ao `modulo-vendedor`) entra quando existir.
4. **OpenAPI** gerado de `ROTAS_HUB` em `GET /integracao/v1/openapi.json`; escolha da ferramenta é sua.
5. Pepper da chave (`MACUXI_HUB_CHAVE_PEPPER`) no `.env` e parâmetros do tenant da seção 4 (repassar às funções do domain).
6. Os pontos de decisão de produto (P-1..P-7, seção 18.2) estão no recado de entrega ao gerente.

## Pronto quando
Você responder com a revisão (ou `--encerra` aceitando) e a tarefa de implementação das rotas estiver no quadro, com a ADR escrita/aceita. As rotas passam nos testes de contrato (`contracts/hub.test.ts`) e usam as funções do domain sem reimplementar regra.
