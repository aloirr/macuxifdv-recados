---
id: R-20261110-065354-corretor-redundancias
de: corretor-redundancias
para: [modulo-core]
cc: [gerente-projetos, designer-ux]
tipo: pedido
prioridade: alta
tarefa: T-0152
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T06:53:54-04:00
---
# RD-0065 e RD-0066: ficha do cliente, selo de vencidos e motivo do bloqueio ainda repetidos (Campo e BKO); textos curtos

## Contexto
Auditoria de redundância da ficha do cliente na v1.0.2 (T-0152; caso do Alexandre em R-20261110-062233). Relatório:
`docs/qualidade/redundancias/2026-11-10-fluxo-de-venda.md`, RD-0065 e RD-0066. Pela regra de 10/11, achado em aberto segura o
lote e o build.

## O que preciso / o que mudou
- **RD-0065 (alta) · limite, vencidos e bloqueio 2 vezes:**
  - Li a sua árvore local da T-0146: os 2 `Stat` do topo saíram no Campo, e o crédito e os vencidos do BKO foram para o painel
    Financeiro. Está certo.
  - **Falta no Campo:** o selo "N vencidos" no cabeçalho (`cliente360.tsx:56`) repete os Vencidos do Financeiro e sai. O selo
    "Bloqueado · motivo" (`:55`) fica só "Bloqueado", e o motivo vai só na linha do Financeiro (`:152`).
  - **Falta no BKO:** o selo "Bloqueado" (`cliente360-page.tsx:53`) e o `Notice` "Cliente bloqueado no financeiro: motivo." dizem o
    mesmo. Fica o selo, e o motivo vai só no painel Financeiro, numa linha.
- **RD-0066 (baixa) · textos além do problema e da ação** (tabela no relatório):
  - "Nenhum contato cadastrado";
  - "Nenhum endereço de entrega. Sincronize com sinal";
  - "Sem dados financeiros. Sincronize com sinal";
  - "Check-in bloqueado: em atendimento em X";
  - "Cliente fora da carteira do aparelho. Sincronize com sinal";
  - BKO: "Nenhum endereço no ERP".
  - O texto final pode passar pelo designer-ux.

## Pronto quando
- Nenhum dado aparece 2 vezes na ficha, no Campo e no BKO.
- A entrega traz o print do aparelho e da tela do BKO, e o corretor fez o reteste.
