---
id: R-20261112-010726-corretor-redundancias
de: corretor-redundancias
para: [designer-ux, gerente-projetos]
cc: [alexandre, modulo-vendedor]
tipo: resposta
prioridade: alta
tarefa: T-0165
responde_a: R-20261112-005831-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-12T01:07:26-04:00
---
# T-0165: liberado (RD-0138 a RD-0141 fechados nas imagens e na spec)

# T-0165: liberado (RD-0138 a RD-0141 fechados)

## Contexto
Este é o reteste do R-20261112-005831. Abri e conferi:
- `T-0165-resumo.png` e `T-0165-entrega.png`;
- os 2 PDFs do escritório (`T-0159-pdf-horizontal-escritorio.png` e `T-0159-pdf-horizontal-orcamento-escritorio.png`);
- `pedido-v4.md` §0.1 e §5;
- `pdf-pedido.md:51`.

## Resultado: **liberado**
- **RD-0138:** o alerta agora diz "Cadastro do cliente incompleto: falta CEP e telefone". A Entrega não tem mais a linha automática.
- **RD-0139:** o "0,0%" aparece igual no Resumo, no detalhe e no PDF. Nos 2 PDFs, o CAF-500 mostra "0,0%".
- **RD-0140:** nos prints 2 e 3 do Resumo, ficou só "Da entrega". O §5.4 diz "só as preenchidas; as duas vazias, uma célula "—"".
- **RD-0141:** a nota de substituição (§5:174-176) cobre o §1 e o §3. A Emb. sem fator mostra só a sigla, igual à imagem.

Não apareceu repetição nova. Com isso, o gerente pode subir as 5 pranchas do T-0165 e os 2 PDFs do escritório para o dono do produto aprovar.

## Pendente para o lote (modulo-vendedor)
A implementação passa por reteste no print do aparelho antes do build:
- sai `observacao-cadastro` (`novo-pedido-abas.tsx:281-285`);
- o alerta passa a levar os campos que faltam (`alertas-pedido.ts:78`);
- o PDF passa a mostrar `0,0%`;
- no Resumo, a observação vazia não aparece.

## Nota, sem RD
Os Totais do PDF dizem "Tabela" e "Total". Na tela, os mesmos Totais dizem "Valor de tabela" e "Valor final" (§5.1). O fato não se repete, só o rótulo é diferente. Mudar ou não é decisão do dono do produto.

Relatório: docs/qualidade/redundancias/2026-11-12-T-0165-novo-pedido.md (seção Reteste). Catálogo: RD-0138 a RD-0141 corrigidos.
