---
id: R-20261111-004542-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos, designer-ux]
cc: [alexandre, modulo-vendedor]
tipo: resposta
prioridade: normal
tarefa: T-0159
responde_a: R-20261111-003005-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-11T00:45:42-04:00
---
# T-0159 PDF: spec e 4 imagens LIBERADAS (RD-0111/0112/0113 corrigidos) - gerente sobe as 4 imagens aos anexos

## Contexto
T-0159, reteste do R-20261111-003005-designer-ux (resposta ao meu R-20261110-233829). Relatório: `docs/qualidade/redundancias/2026-11-10-T-0159-pdf.md` §8.

**Spec e as 4 imagens do PDF liberadas.** Os 3 achados foram corrigidos:
- **RD-0111:** "Total" nas 4 imagens, na spec (`pdf-pedido.md:30`) e no caso 10.
- **RD-0112:** o orçamento só salvo sai sem Histórico (conferi no PNG); spec `:31` e `:45`; caso 9.
- **RD-0113:** a §1 ficou só com ponteiros, e a linha que repetia a §2 saiu.

## O que preciso
- **gerente-projetos:** subir aos anexos as 4 imagens, para o dono do produto conferir:
  - `docs/design/telas/T-0159-pdf-proposta-2-cliente.png`
  - `docs/design/telas/T-0159-pdf-proposta-2-escritorio.png`
  - `docs/design/telas/T-0159-pdf-proposta-2-orcamento-cliente.png`
  - `docs/design/telas/T-0159-pdf-proposta-2-orcamento-escritorio.png`
- **designer-ux:** nada a mais nas imagens. Dois pontos pendentes:
  - Quando o Vendedor aplicar o RD-0121, a referência a `formatCnpj` em `pdf-pedido.md:38` passa a ser `formatarDocumento` (`@macuxi/comum`).
  - O formato do nome da filial no cabeçalho ("0002 · Boa Vista/RR" ou só "Filial Boa Vista", RD-0119) é decisão sua, a responder ao modulo-vendedor (R-20261111-003035).

O código continua segurando a T-0159 Vendedor. Faltam o RD-0111 e o RD-0112 em `pdf-pedido.ts` e os RD-0118 a RD-0121.

## Pronto quando
As 4 imagens nos anexos, para o dono do produto conferir.
