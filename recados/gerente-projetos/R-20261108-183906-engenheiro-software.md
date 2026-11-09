---
id: R-20261108-183906-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0119
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T18:39:06-04:00
---
# Revisão final T-0119/T-0097 fotos: sem 🔴; 🟡 retrato da busca com corrida na invalidação (repositorio-postgres.ts:113-145)

## Contexto
Revisão final da T-0119 (busca com 20 mil, R-20261108-111524) e da T-0097 parte fotos (R-20261108-140616), feita no código atual do disco. Sem 🔴.

Conferido e ok:
- fronteiras: o cadastro vem só pelo `core.cadastro_resumo@1`, sem ler `core.*`;
- retrato por tenant: a chave é `ctx.usuario.tenant_id` e a carga roda dentro da transação do tenant;
- preço e estoque ficam fora do retrato;
- rota da foto com `produto.enriquecer`, 404 e auditoria;
- o contrato aditivo do Core (marca, categoria, ean) já está registrado em `.coord/contratos/modulos.md`.

## O que preciso
🟡 1 — A invalidação do retrato tem corrida (modules/catalogo/api/repositorio-postgres.ts:113-145; chamadas em :163, :263, :423, :436 e :441).
- (a) O descarte roda ANTES da gravação e do COMMIT. Se outra requisição buscar entre o descarte e o COMMIT, recarrega o catálogo ainda sem a mudança (isolamento da transação) e guarda esse retrato por 60 s. Resultado: o analista salva e a busca continua velha por até 1 minuto.
- (b) Uma carga que já estava em andamento quando chega o descarte termina depois e grava o retrato velho de volta (`RETRATOS.set` no `.then`, :136). Ela pode até sobrescrever uma carga mais nova que terminou antes.
- Esperado:
  - um contador de geração por tenant: `esquecerRetratoCatalogo` incrementa o contador, a carga anota a geração no início e só grava se ela não mudou;
  - descartar também DEPOIS do commit, na rota, quando `ctx.comTenant(...)` resolve (ou num gancho pós-commit). O descarte de antes pode ficar.
- Dois testes unitários com o repositório falso:
  - um descarte durante a carga não deixa o retrato velho;
  - uma gravação seguida de busca devolve o dado novo.

🟢 Sugestões (não bloqueiam):
- 2. `MAX_TENANTS_RETRATO = 20` (:111), com até 20 mil produtos cada, pode passar de 1 GB de heap numa só instância. Sugiro limitar pelo total de produtos em memória (ou usar LRU com teto menor) e registrar a decisão no busca-desempenho.md.
- 3. modules/catalogo/api/cadastro-core.ts:9: a interface `ProdutoDoCore` repete o tipo do contrato. Use `z.infer<typeof CadastroResumoSaidaSchema>['produtos'][number]` de `@macuxi/core/contracts` (regra 3: tipos só de contracts).
- 4. modules/catalogo/api/demo/carregar-fotos.ts é um script com `process.exit` dentro de `api/`. Confira que o `api/index.ts` não o exporta, ou mova o script para `modules/catalogo/scripts/`.
- 5. O arquivo é registrado antes do upload dos bytes (carregar-fotos.ts:66-76). Se o upload falhar, a vitrine aponta para um arquivo sem bytes até alguém rodar o script de novo. O script já é idempotente; falta só escrever isso no cabeçalho.

## Pronto quando
- O 🟡 1 está corrigido, com os 2 testes unitários verdes, e o `busca-volume.db.test.ts` passa no CI.
- Responda com --responde-a citando este recado. Os 🟢 ficam a seu critério.
