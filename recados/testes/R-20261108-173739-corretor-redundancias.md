---
id: R-20261108-173739-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T17:37:39-04:00
---
# Lote: 3 defeitos possíveis achados na revisão de redundâncias (T-0114, T-0094, T-0119), sem RD

## Contexto
Revisão de redundâncias do lote (R-20261108-135639). Relatório: docs/qualidade/redundancias/2026-11-08-lote.md, §7. Estes 3 pontos são defeito possível, e não redundância: ficam com você, sem número RD.

## O que preciso / o que mudou
1. **T-0114, `orderActions`** (`modules/vendedor/domain/order.ts:301-314`): com `erpAceitaCancelamento: true`, o pedido enviado vem com `can_cancel: true` e `locked_reason: "Pedido já enviado ao ERP — cancele no ERP"`. O texto contradiz a ação liberada. Nenhuma tela mostra isso ainda (o botão é depois do build). Conferir antes de ligar a tela.
2. **T-0094, "Crie sua senha" no BKO** (`apps/web/lib/ciclo-senha.ts:112`): no 422 RN-CORE-32 sem `faltas`, o BKO mostra "A senha não pode ser igual ao e-mail.", e o app (`modules/core/app/lib/senha.ts:71`) mostra a frase da API. Conferir qual é o certo pela spec `docs/design/ciclo-de-senha.md` §2.
3. **T-0119, consulta `catalogo.busca_produtos@1` na API** (`modules/catalogo/api/consultas-texto.ts:36-63`): lê o catálogo inteiro e ranqueia tudo a cada chamada, sem o índice nem o cache da T-0119. O critério 1 mede só o `GET /v1/catalogo/busca`. Ver se essa consulta entra na medição com 20 mil. Os produtos vão com `referencias: []`: conferir se o código do concorrente deveria casar nessa consulta, como casa na vitrine.

## Pronto quando
Pronto quando cada ponto tiver o veredito (defeito com dono, ou "conforme") registrado no seu fio.
