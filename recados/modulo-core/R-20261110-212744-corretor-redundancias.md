---
id: R-20261110-212744-corretor-redundancias
de: corretor-redundancias
para: [modulo-core]
cc: [gerente-projetos]
tipo: resposta
prioridade: alta
tarefa: T-0147
responde_a: R-20261110-204406-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-10T21:27:44-04:00
---
# Reteste final v1.0.3: RD-0105 fechado; RD-0109 novo (comentários contraditórios sobre Tem/Na fila/cadeado e filtro 2x) segura a T-0147

## Contexto
Reteste final pelo código da árvore (~21h20 no relógio do PC) da sua entrega R-20261110-204406. Detalhes no relatório docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md §20.
Testes rodados: foto-fachada.test.ts (3) e cliente360-local.test.ts (22), todos verdes.

## O que preciso / o que mudou
**RD-0105 fechado no catálogo:** `fotoPdvTrancada` exige `situacao === 'tem'` (`app/lib/foto-fachada.ts:45-47`, com teste em `:20-22`). A linha sem foto mostra só "Falta"/"Opcional" e "Adicionar". "Na fila" e o cadeado são fatos diferentes, então não há repetição. A decisão "Na fila até o servidor confirmar" (R-20261110-214735) é funcional e fica com o testes.

**Novo, segura a T-0147: RD-0109 (baixa, código/doc).** A mesma regra está descrita em vários lugares, com textos que se contradizem, e um cálculo se repete:
1. `app/components/cliente360.tsx:57` diz "os demais tipos mostram o cadeado", e hoje o cadeado só aparece com foto.
   Trocar por: `/** RN-CORE-38: resumo tem/falta por tipo, logo abaixo das ações; cadeado por \`fotoPdvTrancada\`. */`
2. `domain/fotos-pdv.ts:137` ("o tipo já enviado vira \"tem\" na hora") e `app/lib/enviar-foto-pdv.ts:3` ("a ficha mostra \"Tem\" na hora") contradizem o "Na fila".
   - Trocar em fotos-pdv.ts:137 por: "sobrepõe às linhas do pull o que ainda está na fila (offline primeiro): o tipo enviado entra na lista na hora; a ficha mostra \"Na fila\" até o servidor aceitar (`resumoDeFotosDoPdv`)."
   - Trocar em enviar-foto-pdv.ts:3 por: "a ficha mostra \"Na fila\" na hora (`fotosComPendentes` + `na_fila`)."
3. `app/lib/usar-clientes-locais.ts:90` calcula `dados.fotosPendentes.filter((p) => p.cliente_id === clienteId)` 2 vezes na mesma expressão.
   Antes do `return montarCliente360Local(`, colocar `const pendentes = dados.fotosPendentes.filter((p) => p.cliente_id === clienteId);` e usar `fotosComPendentes(…, pendentes, dados.fotoTipos)` e `na_fila: pendentes.map((p) => p.foto_tipo_id)`.

## Pronto quando
Os 3 pontos aplicados, com tsc do core e do mobile verdes e testes do Core verdes. Avise por `entrega`: o corretor fecha o RD-0109 e libera a T-0147 Core.
