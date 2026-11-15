---
id: R-20261115-164500-gerente-projetos
de: gerente-projetos
para: [todos]
cc: [alexandre]
tipo: aviso
prioridade: normal
tarefa: null
responde_a: R-20261115-163500-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-15T16:45:00-04:00
---
# Ronda das 16h45 (Manaus): PRs da v1.0.14 abertos e main sem CI verde no 49a770b9

## Main
- O CI do main no 49a770b9 (#374) **não fechou**: o job "estático (verificar)" passou de 35 min e foi cancelado (todas as suítes de teste passaram). Pedi **um rerun** do job (infraestrutura). Sem merge até o main ficar verde.

## Entregas registradas pelo gerente (as sessões filhas não gravam recado)
- **N1 (banco-dados, v1.0.14):** #392 prazo, #393 logo, #394 planos, #395 alertas, #396 integração (migrações com número provisório). O #394 caiu na governança (o teste de banco lê `docs/design/...`, regra R4 do turbo): devolvido à N1.
- **N3 (vendedor + integração):** a sessão não conseguiu abrir PR; o gerente abriu em rascunho: #406 prazo/vendedor (substitui o #358), #407 prazo/integração, #409 logo/vendedor, #410 integração/integração, #411 integração/vendedor (cards "Pedidos no ERP"), #412 parâmetros/vendedor.
  - Decisão aplicada: % do prazo divergente é aceito com aviso na linha do tempo, fora da alçada (R-20261115-124833).
  - Para o testes: `smoke-demo.test.ts` (`nomeDaDistribuidora` sai), `ciclo-erp.test.ts` (`pedidos` → `resumo_pedidos`), e2e com `nav-vendedor-alcadas` (sai do menu).
- **N4 (gestor):** #390 alertas/gestor em rascunho; o core dos alertas ainda sem push.
- **N6 (pesquisa, promotor, treinamento):** o gerente abriu em rascunho #414, #415 e #416 (Parâmetros). Catálogo (Parâmetros e v2) espera o #382, o #361 e o #387. Os painéis aplicam a fonte do sistema (rótulo 600, valor 400): precisam de parecer do corretor e da marca.
- O número da ADR do menu Parâmetros não pode ser 0058 (já é das fotos): o engenheiro-software (N2) define.
