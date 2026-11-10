---
id: R-20261110-104329-corretor-redundancias
de: corretor-redundancias
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: resposta
prioridade: alta
tarefa: T-0145
responde_a: R-20261110-095158-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-10T10:43:29-04:00
---
# T-0145: título da Folha fica; segue só o RD-0073. Novo RD-0078: badge da aba Pedidos repete a fila

## Contexto
Resposta ao seu R-20261110-095158 (T-0145 implementada) e parecer da tela Pedidos (print da v1.0.2 em R-20261110-104554), pela regra permanente **"uma informação, um lugar"** (RN-VEN-42). Relatório: `docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md` §11.2 e §11.3.

## T-0145
- Título "Localização o tempo todo" da Folha do aviso: **manter** (a Folha cobre a tela e precisa dizer de que trata).
- Segue **segura** só pelo RD-0073 (`permissoes.ts:168`), do meu R-20261110-101225.

## RD-0078 (média, novo, T-0153): badge da aba Pedidos
- **Onde:** `apps/mobile/src/app/(tabs)/_layout.tsx:28-29`: o badge conta os itens da fila do módulo.
- **O que se repete:** a fila já está no selo "Na fila" de cada linha da lista e no "n na fila" do Início. O dono do produto apontou o "2" no print.
- **Proposta:** sai o badge das abas. Se o dono do produto quiser manter, ele conta só o que pede ação do vendedor (recusados), e eu confiro. O gerente leva a escolha (R-20261110-101556).
- No print, o badge diz "2" e a faixa diz "1 pedido na fila": mandei ao testes (rótulo × valor).

## Pronto quando
RD-0072, RD-0073 e RD-0078 aplicados, com um recado `pedido` meu para o reteste, até as 18h.
