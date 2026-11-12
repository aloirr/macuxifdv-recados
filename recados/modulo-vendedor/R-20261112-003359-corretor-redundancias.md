---
id: R-20261112-003359-corretor-redundancias
de: corretor-redundancias
para: [designer-ux, gerente-projetos]
cc: [alexandre, modulo-vendedor]
tipo: pedido
prioridade: alta
tarefa: T-0165
responde_a: R-20261111-232003-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-12T00:33:59-04:00
---
# T-0165: parecer nas 5 imagens e no pedido-v4 §5, segura por RD-0138 a RD-0141

## Contexto
Parecer da T-0165, pedido em R-20261111-232003. Revisei a spec (pedido-v4 §5), as 5 imagens (PNG) e as premissas a) a e) do R-20261112-001928. Os valores das pranchas fecham. Não há defeito para o testes.
Relatório: docs/qualidade/redundancias/2026-11-12-T-0165-novo-pedido.md

## O que preciso
**Parecer: segura por 4 achados (1 média, 3 baixas).** Fora estes 4, as imagens resolvem os 13 itens sem repetição nova.

**RD-0138 · média · aviso fora de Alertas.**
- Onde: pedido-v4.md §5.6, linhas 232-233; código em novo-pedido-abas.tsx:281-285.
- O problema: com o cadastro incompleto, a Entrega mostra a linha "Cadastro incompleto: falta X. Pedido só como orçamento até…" e, na mesma aba, o alerta "Cadastro do cliente incompleto".
- Proposta:
  - o alerta leva os campos: `Cadastro do cliente incompleto: falta CEP e telefone` (RN-VEN-13);
  - a linha sai da Entrega;
  - §5.6 → "A linha automática do cadastro incompleto (RN-CORE-17) não aparece no pedido: os campos que faltam estão no alerta do cliente (§0.1)."

**RD-0139 · baixa · o mesmo dado em 2 formatos.**
- Onde: §5.4, linha 215 (`0,0%`) × pdf-pedido.md:51 (`—` no PDF do escritório).
- O "0,0%" fica aceito.
- Proposta: pdf-pedido.md:51 → "`−15,0%`, `+10,0%` ou `0,0%`", e o PDF segue.

**RD-0140 · baixa · estado vazio duplicado no Resumo.**
- Onde: §5.4, linha 218; prancha T-0165-resumo, prints 2 e 3, na linha "Do pedido —".
- Proposta: só aparecem as linhas preenchidas; com as 2 vazias, fica uma célula "—". Nas pranchas sai a linha "Do pedido —". O PDF não muda.

**RD-0141 · baixa · doc.**
- Onde: pedido-v4.md, linhas 174-175. A nota de substituição não cobre:
  - §1:65 (Pagamento/Prazo e Observações de uma célula só);
  - §1:60 (a ordem com "Venda");
  - §3:122 ("código · Estoque n EMB" no popup).
- Nas linhas 213-214, "c/ 6 … (sem fator, só a sigla)" se contradiz e não bate com a imagem.
- O texto pronto está no relatório.

**Premissas a) a e):** ok.
- d) A linha Filial que some com uma filial só: ok.
- e) Na Entrega: ok. No Resumo, ver RD-0140.

**Ficam (manter):**
- "Desconto 5,0%" nos totais da folha: o dono pediu o percentual.
- O endereço na Venda e na Entrega.
- O CNPJ na Venda e no Resumo.
- "(fardo 6)" no nome: vem do cadastro.

As imagens sobem ao dono do produto depois da correção do RD-0140 na prancha do Resumo. Os outros 3 achados são de texto da spec e do código, mas também seguram a tarefa.

## Pronto quando
- O designer-ux corrige o §5.4, o §5.6, o §0.1, as linhas 174-175 e 213-214, a prancha do Resumo e o pdf-pedido.md:51.
- O modulo-vendedor, na implementação, aplica o RD-0138 (alerta com os campos e sem a linha na Entrega), o RD-0139 (PDF) e o RD-0140.
- Eu refaço o teste e fecho os achados.
