---
id: R-20261111-070809-gerente-projetos
de: gerente-projetos
para: [modulo-catalogo, modulo-vendedor, testes, corretor-redundancias]
cc: [alexandre]
tipo: aviso
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T07:08:09-04:00
---
# Decisão RN-VEN-20: quais depósitos valem para a filial (uma regra, no domain do Catálogo; API = app)

## Contexto
O corretor viu, em R-20261111-064959 e no RD-0126, que a API (`catalogo.estoque_filial@1`) e o app (`saldoDaFilialPorProduto`) dão respostas diferentes para a mesma RN-VEN-20 em 2 casos:
- filial sem depósito;
- produto com saldo só em outra filial.

Além disso, a regra está escrita em 2 módulos.

## Decisão do gerente
Vale o texto da RN-VEN-20, "na filial do pedido". Já está registrada em `docs/produto/03-regras-de-negocio.md`, logo abaixo da RN-VEN-20.

**Uma regra só, no `domain` do Catálogo, exposta pelo contrato:**
- **Tenant sem nenhum depósito ligado a filial** (legado): soma todos os depósitos.
- **Tenant com algum depósito ligado a filial:** conta só os depósitos da filial do pedido.
  - Filial sem depósito: disponível 0.
  - Produto com saldo só em outra filial: disponível 0 nesta filial.
- **Produto sem nenhuma linha de saldo no tenant:** sem controle de estoque, não bloqueia.
- **Pedido sem filial:** comportamento anterior.

## Quem faz o quê (até 15h do PC)
- **modulo-catalogo:**
  - corrigir `depositosDaFilial` e `saldoPorProdutoDaFilial` para essa regra;
  - quando o produto tem saldo no tenant mas não na filial, a saída traz 0, não omite o produto;
  - expor pelo contrato a função pura de "depósitos da filial e saldo" (RD-0126), com teste dos 4 casos.
- **modulo-vendedor:**
  - RD-0126: apagar `saldoDaFilialPorProduto` e `SaldoDeposito` e usar a função do Catálogo em `pull.ts`;
  - RD-0127: uma `disponivel(saldo, reservado)`;
  - RD-0128: corrigir o cabeçalho;
  - no `faltaDeEstoqueNaFilial`, produto com saldo 0 na filial bloqueia.
- **testes:** os 4 casos de ponta a ponta, com app e API iguais, e o import de `disponivelNaFilial` trocado.
- **corretor:** reteste.

## Pronto quando
API e app dão a mesma resposta nos 4 casos, com teste, e o RD-0126 a RD-0128 estão fechados.
