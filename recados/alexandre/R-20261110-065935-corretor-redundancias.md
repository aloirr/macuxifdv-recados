---
id: R-20261110-065935-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0152
responde_a: R-20261110-062239-alexandre
encerra: false
contrato: null
criado_em: 2026-11-10T06:59:35-04:00
---
# T-0152: auditoria do fluxo de venda v1.0.2, 15 RD (5 altos) com recado a cada dono; v1.0.3 segurada até o reteste; parecer prévio das pranchas T-0150

## Contexto
T-0152, auditoria de redundância e de excesso de texto no fluxo de venda da v1.0.2 (`main` a987c6df; o código é igual ao da
cbc35ead). Pedido do Alexandre em R-20261110-062239, com a regra permanente de R-20261110-062506.
- Relatório: `docs/qualidade/redundancias/2026-11-10-fluxo-de-venda.md`.
- Catálogo: RD-0055 a RD-0069 em `docs/qualidade/redundancias/catalogo.md`.

## O que foi feito
**15 achados: 5 altos, 7 médios e 3 baixos.** Os 5 casos do Alexandre estão cobertos:

| Caso | RD |
|---|---|
| Alçada 3 vezes no Resumo | RD-0055 |
| Caixa repetindo o % | RD-0056 |
| Recusa junto com a alçada | RD-0057 |
| Limite e vencidos na ficha | RD-0065 |
| Mensagens longas | RD-0067 (e RD-0066 na ficha) |

**Mais 10:**
- detalhe aguardando aprovação, com "aguardando", o % e "supervisor" 3 vezes cada (RD-0058, alta);
- lista de Pedidos, selo × nota (RD-0059);
- "(RN-VEN-13)" na tela (RD-0060);
- "só orçamento" 4 vezes no Novo pedido (RD-0061);
- "disponível" 2 vezes na aba Venda (RD-0062);
- confirmação do envio (RD-0063);
- BKO, gaveta e painel de aprovação (RD-0064);
- contagens 2 vezes (RD-0068);
- prancha T-0150, "ITENS (3)" (RD-0069).

**Recados aos donos:**
- modulo-vendedor: R-20261110-065020 (12 RD, a maior parte dentro da T-0150 e da T-0151);
- modulo-core: R-20261110-065354 (T-0146 na árvore local: o topo da ficha está certo; faltam os selos "N vencidos" e o motivo do
  "Bloqueado", no Campo e no BKO);
- designer-ux: R-20261110-065430, parecer prévio das pranchas T-0150, já dado. Só RD-0069 (baixa), mas a prancha **não deve ir ao
  Alexandre**: os totais dos itens não fecham (39,80 → 39,60; 38,12 → 36,12; 53,80 → 53,60);
- testes: R-20261110-065439, 4 defeitos funcionais. O principal: a tela diz "Vai para aprovação" no limite excedido, e o servidor
  não manda para aprovação por crédito.

**Premissas:**
- Sem aparelho e sem print da v1.0.2: o parecer saiu do código das telas, nos estados relatados, e das pranchas.
- O reteste de cada RD vai pedir o print do aparelho (Campo, Gestão e BKO).

**Regra permanente aceita:**
- daqui em diante, dou parecer em toda entrega que muda tela, texto, relatório ou regra, antes do lote e do build;
- achado em aberto segura a entrega;
- o relatório vai junto com o roteiro do testes em cada build.
- Hoje a v1.0.3 está **segurada** pelos 15 RD em aberto.

## Pronto quando
- Os donos entregam com print, eu faço o reteste e fecho os RD no catálogo.
- O parecer final das pranchas T-0150 sai antes de elas irem ao Alexandre.
