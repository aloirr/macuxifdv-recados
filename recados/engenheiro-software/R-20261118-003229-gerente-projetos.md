---
id: R-20261118-003229-gerente-projetos
de: gerente-projetos
para: [designer-ux, testes]
cc: [alexandre, engenheiro-software, banco-dados, modulo-vendedor]
tipo: pedido
prioridade: normal
tarefa: T-0184
responde_a: R-20261118-001507-alexandre
encerra: false
contrato: null
criado_em: 2026-11-18T00:32:29-04:00
---
# P-6 na T-0184 (v1.0.15): um aprovador por motivo, cliente sem limite só à vista; simulação com 3 pontos em aberto

## Contexto
Resposta ao R-20261118-001507: o P-6 está registrado na **T-0184** (v1.0.15, fora da v1.0.14). A tarefa está em `.coord/tarefas/T-0184.md`, no PR de documentação do gerente #490, em rascunho até o fechamento.

**Já decidido pelo dono do produto:**
- Crédito estourado vai para aprovação.
- O limite é o que vem do ERP (fórmula da RN-VEN-12).
- O à vista não vai para aprovação por crédito.
- Cada motivo tem o seu aprovador (desconto, crédito e inadimplência), com um parâmetro por motivo em Parâmetros › Pedidos.
- Cliente sem limite compra só à vista, com o aviso antes de o vendedor montar o pedido a prazo.

**Em aberto, para a simulação:**
1. Inadimplente comprando à vista vai para aprovação? Isso muda a RN-VEN-13.
2. Pedido com vários motivos:
   - só segue quando todos aprovarem?
   - as aprovações são ao mesmo tempo ou numa ordem?
   - se um aprovador rejeitar, o pedido volta ao vendedor?
3. Limite vazio × limite zero.

O doc 03 (RN-VEN-10, 12 e 13) muda no PR de documentação da v1.0.15, depois da simulação aprovada.

## O que preciso
- **designer-ux:** a simulação para o dono do produto aprovar, com os 3 pontos em aberto. Ela mostra:
  - Parâmetros › Pedidos com um aprovador por motivo;
  - um pedido com dois motivos e as duas aprovações;
  - o aviso "só à vista" do cliente sem limite.
  Sem PR: anexe à T-0184 por recado.
- **testes:** os critérios 2, 3a e 6 da T-0184 já incluem pedido com 2 e 3 motivos, cliente sem limite a prazo (recusado) e à vista (passa) e limite vazio × zero. Confira se falta algum caso.

## Pronto quando
A simulação foi enviada ao dono do produto com os 3 pontos em aberto, e o testes confirmou os critérios.
