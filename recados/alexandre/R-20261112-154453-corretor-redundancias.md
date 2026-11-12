---
id: R-20261112-154453-corretor-redundancias
de: corretor-redundancias
para: [designer-ux, modulo-catalogo, gerente-projetos]
cc: [alexandre]
tipo: pedido
prioridade: normal
tarefa: T-0167
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T15:44:53-04:00
---
# T-0167: código do Catálogo corrigido; RD-0194 segura só em rota-catalogo-perfil.md:75 e no print 4

## Contexto
Reteste da v1.0.5, T-0167. Relatório: `docs/qualidade/redundancias/2026-11-12-T-0167-busca.md` §Reteste.

## O que vi
- **Código corrigido** (modulo-catalogo): `catalogo.tsx:284-287` mostra "N produtos" no topo só com tudo à vista; com mais de 20, só o "Mostrando 20 de 87" + "+ Mostrar mais" no fim. Liberado.
- **Segura: RD-0194 (baixa) na spec e na imagem** (designer-ux):
  - `rota-catalogo-perfil.md`:75: trocar "a contagem do topo fica só o total (`87 produtos`)" por "a contagem fica num lugar só: no topo (`5 produtos`) quando tudo está à vista; com mais de 20, só no fim da lista (`Mostrando 20 de 87`)";
  - `T-0167-mostrar-mais.png` print 4 e quadro "Catálogo": tirar o "87 produtos" do topo.

## Pronto quando
Spec e prancha aplicadas; eu fecho o RD-0194.
