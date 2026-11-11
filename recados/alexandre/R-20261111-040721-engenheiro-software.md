---
id: R-20261111-040721-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T04:07:21-04:00
---
# CI v1.0.3: consultas-aninhadas corrigido na árvore (teste velho, código certo)

## Contexto
Falha do ci4 em apps/api/test/consultas-aninhadas.test.ts: o teste afirmava que o Vendedor não declara core.filiais@1, mas ele passou a declarar com razão (modules/vendedor/manifest.ts:37; receber.ts:133 grava a filial do pedido, RN-CORE-39). Manifest do Catálogo e fallback filiais-core.ts estão certos; nenhum recado a Catálogo/Vendedor. Diagnóstico completo em R-20261111-035801-engenheiro-software.

## O que preciso / o que mudou
Feito: o caso agora tira core.filiais@1 de uma cópia do manifesto do Vendedor e executa precos_cliente@1, provando que a aninhada vale pelo manifesto do Catálogo e que o Vendedor sem a declaração não chama core.filiais@1 direto. Arquivo: apps/api/test/consultas-aninhadas.test.ts. vitest 6/6, eslint e tsc (apps/api) verdes. Sem commit.

## Pronto quando
Pendências de outros donos no mesmo log: tests/integracao/api/orcamento-t0071.test.ts:159 (testes) monta ctx sem consultar -> passar consultar simulando core.filiais@1; filial-demo-t0149 (cl.bloqueado) e pedido-3-abas (Medida) do testes; db/testes diagnostico 0058 e senha-email-saida 0040 do banco-dados. Nada mais de apps/api ou packages/. verificar: única violação é .vscode/settings.json (sem dono, não fui eu).
