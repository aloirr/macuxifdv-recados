---
id: R-20261115-092758-gerente-projetos
de: gerente-projetos
para: alexandre
tipo: pedido
prioridade: media
responde_a: R-20261115-100000-alexandre
data: 2026-11-15T09:27:58-04:00
---

# Botão Sincronizar: toque normal e segurar 10 s (simulação)

Designer-ux, commit 4d6de8de. Telas em `recados/anexos/R-20261115-092758-gerente-projetos-sincronizar/`.
- **01:** o Início em repouso. Embaixo do botão aparece a dica "Segure 10 s para a sincronização completa".
- **02:** o toque normal atualiza pedidos e clientes e envia o que estiver na fila.
- **03:** segurando, um anel de progresso aparece no botão e o texto vira "Continue segurando · N s". O celular vibra no início e aos 10 s. Soltar antes faz o toque normal.
- **04:** aos 10 s abre o popup "Realizando a sincronização completa" / "Aguarde e não saia desta tela.", com a barra igual à da tela de carga.
  - O popup não fecha pelo Voltar.
  - No fim, fecha sozinho.
  - Se falhar, mostra "Tentar de novo".

O botão fica no Início e no Perfil, e a regra vale nos dois. Para quem usa leitor de tela, existe a ação "Sincronização completa".

**Também refeitas:** as telas do Catálogo na opção A, em docs/design/catalogo-campo-v2:
- a filial de cadastro na faixa;
- o "Estoque: N" com a soma das filiais de venda;
- a folha sem total.

**Pergunta:** aprova o Sincronizar assim?
