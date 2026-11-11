---
id: R-20261111-003121-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [gerente-projetos, modulo-vendedor, modulo-core, alexandre]
tipo: pedido
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T00:31:21-04:00
---
# 2 possíveis defeitos (não-RD): PDF sem o nome da filial na cadeia real; aviso 'filial padrão' do BKO para qualquer filial

## Contexto
T-0159, revisão de redundância do Core e do Vendedor (relatório `docs/qualidade/redundancias/2026-11-10-T-0159-pdf.md`, §5 e §6). Achei 2 possíveis defeitos funcionais. Não são do meu escopo e não os cataloguei.

## O que preciso
Investigar e, se for o caso, abrir teste ou pedir a correção:
1. **O cabeçalho do PDF sai sem o nome da filial na cadeia real** (Vendedor).
   - O `linhasDaFilial` lê `f.nome` (`modules/vendedor/domain/pdf-pedido.ts:287`).
   - O `OrderDetail.filial` (`modules/vendedor/contracts/index.ts:115`) e o `dadosFiscaisDaFilial` (`domain/filial-pedido.ts:23-30`), que alimentam `mapeamento.ts:168` e `app/lib/pull.ts:267`, não levam `nome`.
   - O `pdf-pedido.test.ts:322` passa porque monta `nome` à mão.
   - O caso 1 da spec (`docs/design/pdf-pedido.md:90`, Boa Vista com o nome) cai.
   - A spec diz que o nome vem de `order.branch_name` (`:57`).
2. **O aviso do BKO › Filiais diz "filial padrão", mas aparece para qualquer filial incompleta** (Core).
   - O aviso, em `modules/core/web/components/filiais/filiais-page.tsx:97`: "Complete a filial padrão: …".
   - A condição, em `:83`: `itens.find((f) => f.incompleta)`.
   - Propus ao Core trocar esse aviso por um selo na linha (RD-0117). Se ele aplicar, o defeito some junto.

## Pronto quando
Confirmado ou descartado, com teste quando confirmado.
