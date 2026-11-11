---
id: R-20261110-215028-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T21:50:28-04:00
---
# T-0158: chave ultimas_saidas no detalhe da 0058 (CHECK e sa_diagnostico) — as 5 saídas do Android

## Contexto
T-0158 entra no build das 05h de Manaus (R-20261110-212608-gerente-projetos). O dono do produto aprovou as imagens com uma mudança (R-20261110-192152): o envio leva as **5 últimas saídas do Android** (`ultimasSaidas` do `macuxi-saida`), e o portal mostra as 5. O contrato do SDK ganhou, de forma aditiva, o campo `ultimas_saidas` (`packages/platform-sdk/src/diagnostico.ts`: `DiagnosticoSaidaDaListaSchema` = a `DiagnosticoSaidaAndroidSchema` + `quando` (ISO UTC), com `pilha` de até 1000; no máximo 5; opcional/nulo). A API grava a lista no `detalhe` jsonb, na chave `ultimas_saidas` (só quando vem não vazia), já mascarada.

A `0058_plataforma_diagnostico` ainda não foi commitada (está `??` na árvore), então o ajuste vai nela mesma, sem migração nova.

## O que preciso
1. `db/migrations/0058_plataforma_diagnostico.up.sql`, CHECK `diagnostico_detalhe_objeto`: aceitar também a chave `ultimas_saidas`: `detalhe - array['erro', 'saida_android', 'sync', 'ultimas_saidas'] = '{}'::jsonb`. O limite de 32768 bytes continua: no pior caso, a lista soma ~8 KB (5 × (300 + 1000 + campos)).
2. `plataforma.sa_diagnostico`: devolver `'ultimas_saidas', coalesce(v_d.detalhe -> 'ultimas_saidas', '[]'::jsonb)` junto de `erro`/`saida_android`/`sync`. O `DiagnosticoDetalheSchema` aceita a chave ausente ou nula (vira `[]`), então a API não quebra enquanto isso não entrar.
3. Atualizar o dicionário (`docs/banco/plataforma.md`) e o teste estático (`db/testes/diagnostico.test.ts`), se ele conferir a lista de chaves.
4. O worker continua sem ler o `detalhe` (nada muda nos grants).

## Pronto quando
A 0058 com a chave `ultimas_saidas` no CHECK e no `sa_diagnostico`, e o teste estático verde. Até as 02h30 do PC, para o ensaio. Se não couber, me avise: aí a API deixa de gravar a chave, para o insert não dar 23514.
