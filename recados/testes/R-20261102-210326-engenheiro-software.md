---
id: R-20261102-210326-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-integracao, testes]
tipo: revisao
prioridade: normal
tarefa: T-0032
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T21:03:26-04:00
---
# Revisão PR #53 (T-0032 carga por arquivo + e2e ERP): sem 🔴 no código; CI vermelho em db/testes/sessao.test.ts (fora do diff)

## Contexto
Revisão de código do PR #53 (T-0032: carga por arquivo, e2e com ERP simulado e correções da revisão; branch nuvem/T-0032-carga-arquivo-e2e, último commit ec9375a), antes do merge. 25 arquivos, +2590/-163.

## Resultado: sem 🔴 no código. O merge espera o CI (testes dos pacotes e governança estão vermelhos, ver abaixo).
- Fronteiras: só contracts e domain do próprio módulo, `@macuxi/platform-sdk` e `zod`.
- Multi-tenant: `gravarLote`, `lerResultadoLote` e `rotaErrosLote` filtram por `tenant_id` dentro de `ctx.comTenant` (RLS); o Conector do arquivo é resolvido entre os do tenant (RN-INT-13).
- Idempotência (RN-INT-12): a chave é obrigatória no corpo; o mesmo caminho do lote do Hub (`on conflict (tenant_id, conector_id, chave_idempotencia) do nothing` mais o hash do conteúdo) devolve 409 com conteúdo diferente e `repetido` com conteúdo igual. A sessão vem da chave (`sessaoDoArquivo`), então o RN-INT-06 vale na carga completa por arquivo.
- RN-INT-04: o arquivo passa pelo mesmo A7 (`aplicar-lote.ts`), então `referencia_ausente` continua reprocessável e nada fica órfão.
- A8 (fila do ERP): pedido aprovado sem chave do ERP deixa de lançar erro (a outbox desistiria e o pedido sumiria) e passa a ficar RETIDO, com mensagem só de códigos e sequências, sem nome, documento nem valor. Correção certa, testada em `pedido-fila.test.ts`.
- Log e auditoria: só ids, entidade, modo e contagens; nada do conteúdo do CSV.

## 🟡 Corrigir
1. Donos: `tests/integracao/demo/ciclo-erp.test.ts` é do agente `testes` (`coord dono`), e o PR veio da sessão do modulo-integracao. Se a sessão da nuvem rodou o agente testes para isso, tudo bem. Se não, registre um recado ao `testes` (ciência e revisão do e2e) antes do merge, para o `verificar` não acusar.
2. `modules/integracao/domain/pedido-fila.ts`: a retenção por cadastro reaproveita o código `mapeamento_ausente` e é separada pelo prefixo da mensagem (`ehRetencaoPorCadastro`). Funciona, mas é frágil: qualquer mudança no texto quebra o monitor. Peça ao banco-dados um código próprio (`cadastro_incompleto`) no CHECK da `pedido_fila_erp` na próxima migração e troque.
3. Fluxo do pedido retido: o texto manda "cancele e refaça". Na demo, o Vendedor precisa ter o cancelar disponível para um pedido aprovado ainda não entregue (o `status_alterado@1` tira da fila, ok). Confirme com o modulo-vendedor que o botão existe, senão o pedido fica preso.

## 🟡 Meu (plataforma, não bloqueia este PR)
4. O CSV vai no corpo JSON de uma rota de módulo. O `bodyLimit` padrão do Fastify (1 MiB) corta antes do `limiteCorpoLoteBytes` (8 MiB), e um arquivo entre 1 e 8 MiB recebe 413 genérico, sem a mensagem amigável `corpo_grande`. Eu abro no SDK um `limiteCorpoBytes` por rota de módulo, como já existe no Conector (`apps/api/src/conector.ts:164`). Até lá, documente o limite de 1 MiB em `docs/modulos/integracao/carga-arquivo.md`.

## CI (run 41546585309)
- "testes dos pacotes": a única falha é `db/testes/sessao.test.ts` > "RN-CORE-15: aparelho bloqueado recusa outro usuário do mesmo tenant e não vaza para o outro tenant" (AssertionError deep equal), fora do diff deste PR. É do banco-dados/modulo-core: ou é intermitente (rode de novo) ou é regressão no main. Os testes da carga por arquivo e do Conector passaram.
- Governança vermelha: não consegui ler o motivo; pode ser o item 1 (dono do `tests/`).
