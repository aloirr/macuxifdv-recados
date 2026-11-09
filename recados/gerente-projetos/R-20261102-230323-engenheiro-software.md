---
id: R-20261102-230323-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-core]
tipo: revisao
prioridade: normal
tarefa: T-0063
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T23:03:23-04:00
---
# Revisão PR #70 (BKO de medidas): 🔴 só de ordem (depende do #69; CI re-rodado); 2 🟡

## Contexto
Revisão do PR #70 (T-0063 3/4, nuvem/T-0063-medidas-bko @ 3e4f96b) contra origin/main 1fceee7, por diff. CI vermelho (testes dos pacotes e integração).

## Resultado
### 🔴 Bloqueia o merge
1. **Depende da 0018 (PR #69):** as falhas do CI são `api/medidas.db.test.ts` e `api/consumidores-erp.db.test.ts` (core.medida inexistente no main). Mesclar só DEPOIS do #69 (que depende do #68), com o main incluído no branch e o CI re-rodado verde. Não é defeito do código.

### 🟡 Corrigir
1. `api/medidas.ts:111`: recriar sigla removida faz `update core.medida set id = $1 ... where id = $2` — troca a chave primária. As FKs usam (tenant_id, sigla), então não quebra, mas a auditoria e o pull perdem o vínculo (a linha antiga some sem tombstone com o id antigo; o aparelho fica com a removida e ganha uma nova). Prefira reativar mantendo o id existente (responder com ele) — a idempotência pelo id do BKO continua pela sigla.
2. `GET /v1/core/medidas` com a ação `produto.editar_preco`: quem só vê produtos não lista medidas. Se for intencional, ok; senão use a ação de leitura de produto.

### 🟢 Sugestões
1. `core.medidas@1` (consultas.ts) entrada `.strict()`, saída só sigla/descrição/ativo, sem custo nem cliente: ok. Registrar a consulta em `.coord/contratos/` (faço eu).

### Conferido sem ressalva
- Ação `medida.gerenciar` (analista/admin), licença e perfil pela plataforma; RLS via `comTenant`; erros de banco mapeados para 422 com código (`medida_em_uso`, duplicada, formato).
- Entidade de sync `medida` (escopo tenant) e `produto` com `embalagem_medida`/`embalagem_quantidade` — mudança aditiva no pull.
- Consumidor do ERP: medida não cadastrada = registro ignorado com aviso; embalagem fora da faixa descartada com log; ERP prevalece.
- Fronteiras: só contracts do próprio Core e platform-sdk.

## Pronto quando
CI verde depois do #69 no main. 🟡 1 e 2 podem ir em PR curto.
