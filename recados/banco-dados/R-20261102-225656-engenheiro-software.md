---
id: R-20261102-225656-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [banco-dados]
tipo: revisao
prioridade: normal
tarefa: T-0063
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T22:56:56-04:00
---
# Revisão PR #69 (0018 medidas): 2 🔴 de ordem (S0-025 exige o #68 antes; #54 tem outra 0018 e deve ser fechado); migração em si ok

## Contexto
Revisão do PR #69 (T-0063 2/4, nuvem/T-0063-medidas-0018 @ 5469469) contra origin/main 1fceee7, por diff (sem banco local). Conferi up/down, colunas padrão, RLS, numeração e o CI.

## Resultado
### 🔴 Bloqueia o merge
1. **CI vermelho isolado: S0-025** (tests/integracao/multitenant/vazamento-escrita.test.ts, "em cada FK composta... 23503"): `produto_embalagem_medida_fk` dá 23514 (`produto_embalagem_completa`) em vez de 23503. É exatamente o que o PR #68 (testes, CI verde) corrige. **Ordem obrigatória: #68 antes do #69** (ou os dois juntos) — sozinho o #69 deixa o main vermelho.
2. **PR #54 (nuvem/T-0063-medidas) também traz `db/migrations/0018_medidas.{up,down}.sql` e `modules/core/db/nuvem.ts`.** Duas 0018 diferentes = conflito/migração aplicada com conteúdo errado. Fechar o #54 como substituído pelo #69/#70 antes do merge (não mesclar os dois).

### 🟡 Corrigir
1. **Dependência com o Hub:** a partir da FK `produto_medida_fk`, produto do ERP com sigla não cadastrada é recusado pelo banco (23503). O PR #62 transforma isso em `referencia_ausente` reprocessável; sem o #62, a carga do ERP falha a linha com erro genérico. Mesclar #62 junto com o #69.
2. **Normalização só no `core`:** `upper(btrim(unidade))` em core.produto/produto_unidade, mas `catalogo.tabela_preco_item.unidade` (0013) não é normalizada nem tem FK (pendência declarada). Preço por unidade "cx" × produto "CX" deixa de casar. Normalizar também na 0018 (ou na próxima) e a API do Catálogo validar a sigla.

### 🟢 Sugestões
1. Backfill `update vendedor.pedido_item set quantidade = quantidade` com o gatilho de updated_at desligado: certo para não forçar re-pull. Os gatilhos `pedido_item_quantidade_base` e `pedido_item_medida` rodam em todas as linhas — ok no volume atual; em tenant grande, lote por tenant.
2. `core.semear_medidas` liga `app.tenant_id` por set_config e restaura — mesmo padrão da 0006; ok.

### Conferido sem ressalva
- Numeração: 0018 logo depois da 0017_treinamento do main; par up/down.
- `core.medida` com `id, tenant_id, created_at, updated_at, deleted_at, external_id`, trigger de updated_at, índice de sync `(tenant_id, updated_at, id)`, external_id único parcial, RLS `enable` + `force` com política do tenant (using + with check), sem DELETE para o macuxi_app.
- "Não apaga em uso" pelo gatilho `medida_em_uso` (23503); inativar permitido.
- FKs compostas (tenant_id, sigla) — nunca cruzam tenant; `vendedor.pedido_item.medida` é retrato sem FK entre schemas (regra 1, ADR 0005/0012); derivadas por gatilho + CHECKs.
- Migração aborta com lista legível se houver sigla fora do formato (nada adivinhado).
- Down desfaz tudo na ordem inversa (constraints, gatilho, funções, colunas, tabela); a normalização de unidade fica (declarado).

## Pronto quando
#68 mesclado antes (ou junto) e #54 fechado; então o #69 pode entrar com o #62.
