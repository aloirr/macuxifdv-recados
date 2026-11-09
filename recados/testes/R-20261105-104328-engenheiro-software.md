---
id: R-20261105-104328-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: [testes, gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0082
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T10:43:28-04:00
---
# D-T0082a: tx.consultar(def, entrada, { licenca: 'tenant' }) pronto (ADR 0025); como usar na RV, no painel, no Início e no Farol

## Contexto
Este recado fecha o D-T0082a pelo caminho (a) (R-20261105-101645): `tx.consultar(def, entrada, { licenca: 'tenant' })` já existe na árvore. Está no `platform-sdk` (`OpcoesConsulta`, `LicencaConsulta` em `packages/platform-sdk/src/api.ts`) e na API (`apps/api/src/outbox.ts`, `app.ts`, `despachante.ts`, `agendador.ts`). As regras estão na ADR 0025 (`docs/decisoes/0025-consulta-pela-licenca-do-tenant.md`, complemento da ADR 0012). Os testes ficam em `apps/api/test/consultas.test.ts`, bloco "ADR 0025".

O que a opção faz e o que não faz:
- Com `'tenant'`, o dono vale se estiver ativo NO TENANT (efetivos do tenant, RN-CORE-03), e não nos módulos de quem consulta. Se o Vendedor estiver desligado no tenant, a consulta continua dando `ConsultaIndisponivel`, e o plano B segue o mesmo.
- A implementação recebe o MESMO usuário da requisição (id e perfil), e não o usuário de sistema. Não há elevação de escopo: o `vendedor.pedidos_da_meta@1` continua recortando vendedor e promotor ao próprio número. Os `usuario_ids` que o Core manda continuam escopados por `usuariosVisiveis()`.
- Só vale em GET/HEAD. Em rota de escrita (PUT, POST, DELETE e o push do sync), pedir `'tenant'` é erro de programação (500). No consumidor de evento e na tarefa periódica a opção é aceita e não muda nada, porque a licença ali já é a do tenant.

## O que preciso / o que mudou
1. **`fontePorConsulta` (`modules/core/api/metas.ts:99`)** é o jeito mais simples de ligar a opção num lugar só, porque todos os usos atuais são GET: `metas/painel`, `indicadores`, `inicio` e, com o R1 corrigido, o GET `rv`.
   - Troque `tx.consultar(CONSULTA_PEDIDOS_DA_META, q)` por `tx.consultar(CONSULTA_PEDIDOS_DA_META, q, { licenca: 'tenant' })`.
   - O tipo do parâmetro `Partial<Pick<TransacaoTenant, 'consultar'>>` não muda, porque o 3º argumento é opcional.
   - Se algum dia `fontePorConsulta` for usada em rota de escrita, aceite um parâmetro `licenca` em vez de fixar o valor.
2. **GET `rv` (`plano-rv.ts`)**: com o item 1, a RV passa a sair pelo pedido para qualquer perfil, sempre que o tenant tiver o Vendedor. Analista sem o Vendedor no perfil e supervisor com o Vendedor passam a ver a mesma RV. Volte o teste "admin e analista veem a mesma RV" de `it.skip` para `it`.
3. **Início (`inicio.ts:94`)**: `fontePorConsulta(tx)` já pega a opção pelo item 1. A RN-CORE-27 diz que a venda do Início vem do pedido com o Vendedor ligado no tenant.
4. **Farol (`farol.ts`)**: hoje não chama consulta; lê o `indicador_diario` ou o `nota_erp` e decide pela `plataforma.tenant_modulo`. Não precisa de nada agora. Se passar a ler o Vendedor por `tx.consultar`, use a opção.
5. **Fora do escopo da opção**: escrita, decisão de permissão e dado de módulo que a pessoa não tem (preço, lista de pedidos). Use a opção só em leitura agregada de indicador da RN-CORE-27 (ADR 0025, item 4). Caso novo precisa de complemento da ADR.
6. **Teste sugerido no Core**: um `tx` falso que lança `ConsultaIndisponivel` quando a chamada vem sem `{ licenca: 'tenant' }` e responde quando vem com ela. Isso prova que a RV, o painel e o Início não dependem do perfil de quem olha.

## Pronto quando
- `fontePorConsulta` (ou cada chamada GET) passa `{ licenca: 'tenant' }`;
- o teste da mesma RV para admin e analista vira `it`, e o vitest do core, o eslint e o tsc estão verdes;
- você me avisa para o testes trocar o R-08a (`tests/integracao/api/plano-rv-t0082.test.ts`) por `it`; o critério é o CI do lote.
