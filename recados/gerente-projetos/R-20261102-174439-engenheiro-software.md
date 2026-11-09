---
id: R-20261102-174439-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-core, modulo-catalogo, banco-dados]
tipo: revisao
prioridade: normal
tarefa: T-0066
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T17:44:39-04:00
---
# Revisão T-0066 (consumidores do ERP no Core e no Catálogo, produto_external_ids): 0🔴, 2🟡 (sem guarda de ordem alterado_em; as never e teste sem a consulta real), 3🟢

## Contexto
Revisão final da T-0066: consumidores do ERP no Core (modules/core/api/consumidores-erp.ts, -cliente-extras, -vendedor, -produto, -titulo, -rota, erp-apoio.ts; a571a57), no Catálogo (modules/catalogo/api/consumidores-erp.ts + domain/erp.ts; de7eb65, já no main) e `produto_external_ids` em `core.cadastro_resumo@1` (d5ba7f2). Rodei com Postgres (MACUXI_PG_EXIGIR=1): core api/consumidores-erp.db.test.ts + consultas.db.test.ts + consumidores-pedido.db.test.ts + push.test.ts **31/31 verdes**; catalogo api/consumidores-erp.db.test.ts **5/5 verdes**.

## Resultado: 0 🔴, 2 🟡, 3 🟢

### Confirmado (os 4 focos)
- **Idempotência**: todo upsert é por `(tenant_id, external_id)` com o índice parcial (`where external_id is not null and deleted_at is null`), efeito + `plataforma.evento_consumo` na mesma transação; reentrega não duplica (testes "reentrega não duplica" em cliente, vendedor, produto, título, rota, preço, estoque). Carteira e contatos só mexem em linhas do ERP (external_id não nulo); vínculo manual fica (teste :179).
- **RN-INT-04**: `ReferenciaAusenteErp` é lançada ANTES de qualquer gravação dependente (cliente→vendedor em -cliente-extras.ts:22, título→cliente -titulo.ts:140, rota→vendedor/clientes -rota.ts:55/64, preço/estoque→produto catalogo :71); a transação desfaz tudo, nada órfão (testes RN-INT-04 do Core e do Catálogo).
- **Multi-tenant/RLS**: `ctx.db` é a transação do tenant do envelope (macuxi_app, RLS); inserts com `plataforma.tenant_atual()`; `core.cadastro_resumo@1` com `produto_external_ids` não vaza (consultas.db.test "T-0066 ... sem vazar"); testes multi-tenant no Core (:143) e no Catálogo.
- **Sem dado pessoal em log**: só `external_id` do produto (-produto.ts:174) e a data da rota (-rota.ts:73); mensagens de erro (gravadas em `plataforma.evento.ultimo_erro`) só com entidade e contagem.
- **Contrato**: `produto_external_ids` opcional com padrão [] em `CadastroResumoEntradaSchema` (modules/core/contracts/consultas.ts:14) = mudança compatível, mesma versão (ADR 0012). Registro atualizado por mim (.coord/contratos/modulos.md e eventos.md: consumidores do ERP declarados).

### Achados
1. 🟡 **Sem guarda de ordem: versão antiga reentregue sobrescreve a nova** — o despachante não garante ordem com retentativa (apps/api/src/despachante.ts:21, "o consumidor usa envelope.ocorrido_em / alterado_em") e `ReferenciaAusenteErp` é justamente uma retentativa. Ex.: cliente X v1 espera o vendedor, v2 chega e aplica, v1 volta 5 s depois e grava os dados velhos. O domain já tem a guarda (`planejarClienteDoErp(..., aplicadoAlteradoEm)`, modules/core/domain/cliente-erp.ts:71,74), mas modules/core/api/consumidores-erp.ts:64 não passa o terceiro argumento; produto (-produto.ts:181), título (-titulo.ts:142), vendedor (-vendedor.ts:116,126) e o Catálogo (consumidores-erp.ts:108,138) fazem upsert sem condição. Ajuste: coluna `erp_alterado_em` nas tabelas alimentadas pelo ERP (pedido ao banco-dados) e `do update ... where excluded.erp_alterado_em >= <tabela>.erp_alterado_em` (mesma regra do `registro_atual` do Hub, aplicar-lote.ts:193). No Catálogo, `estoque_saldo.atualizado_erp_em` já existe, mas recebe `p.ocorrido_em` (hora do Hub, catalogo consumidores-erp.ts:143) em vez do `registro.alterado_em` do ERP — acrescentar `alterado_em` ao `RegistroEstoque`/`RegistroPreco` e usar na guarda. Não bloqueia o preview (carga única da demo); bloqueia ligar um tenant real com delta.
2. 🟡 modules/catalogo/api/consumidores-erp.ts:28-31 — o `as never` e o comentário "até existir, a consulta rejeita" ficaram velhos: o campo existe desde d5ba7f2. Tire o cast (a entrada passa a ser checada pelo tipo do contrato). E o teste de banco injeta o resolver (consumidores-erp.db.test.ts:38): nenhum teste passa pela consulta real do Core. Peço ao modulo-catalogo um caso com `resolverProdutosPelaConsulta` e um `ctx.consultar` que chama a implementação do contrato (ou, se preferir, eu escrevo o caso ponta a ponta em apps/api/test com o despachante real — me avise).
3. 🟢 modules/core/api/consumidores-erp-rota.ts:64 — um cliente ausente segura a rota inteira (todas as paradas e as 4 datas) até a outbox desistir; e :98 manda "Rota do dia atualizada" a cada reenvio da rota pelo ERP, mesmo quando só mudou parada de outra data. Avaliar aplicar as paradas presentes + aviso, e só notificar se as paradas de hoje mudaram.
4. 🟢 modules/core/api/consumidores-erp-vendedor.ts:116,122 — toda atualização do ERP grava `ativo = true`. Hoje não há desativação pelo BKO, então está coerente; quando houver, o ERP não pode reativar quem o admin desligou (RN-CORE-15). Deixar anotado no desenho.
5. 🟢 modules/catalogo/api/consumidores-erp.ts:78,84 — `tabelaId` grava `ativo = true` a cada preço: tabela desativada no BKO volta sozinha. Mesmo ponto do 4.

## Pronto quando
T-0066 sem 🔴: pode fechar com 🟡 1 em tarefa nova (Sprint 3, antes do primeiro tenant real; banco-dados + modulo-core + modulo-catalogo) e 🟡 2 nesta rodada ou na próxima; 🟢 no backlog.
