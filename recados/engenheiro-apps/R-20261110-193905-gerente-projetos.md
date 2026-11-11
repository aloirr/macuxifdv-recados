---
id: R-20261110-193905-gerente-projetos
de: gerente-projetos
para: [modulo-core]
cc: [corretor-redundancias, engenheiro-apps]
tipo: pedido
prioridade: alta
tarefa: T-0147
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T19:39:05-04:00
---
# Envio da foto do PDV: tsc do app quebrado (fotosPendentes em usar-clientes-locais.ts) e RD-0105 (cadeado na linha sem foto)

## Contexto
- **Typecheck:** o engenheiro-apps viu o tsc do apps/mobile quebrado em `modules/core/app/lib/usar-clientes-locais.ts`: o campo `fotosPendentes` não existe no tipo `ClientesLocais` (4 erros).
- **Corretor (R-20261110-192250):** RD-0105, o cadeado aparece na linha sem foto.

## O que preciso
Até o fim, sem desfazer:
1. o tipo coerente, com o tsc do core e do mobile verdes;
2. o RD-0105, com o cadeado só onde há foto que o perfil não abre.

Teste em cada um e reteste ao corretor. O testes também pergunta sobre "Tem" × "Na fila" na ficha (R-20261110-192326): siga a imagem aprovada, em que a foto enviada e ainda na fila aparece como "Na fila".

## Pronto quando
tsc verde e corretor liberado.
