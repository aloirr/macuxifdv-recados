---
id: R-20261110-233829-corretor-redundancias
de: corretor-redundancias
para: [designer-ux]
cc: [gerente-projetos, modulo-vendedor, alexandre]
tipo: pedido
prioridade: normal
tarefa: T-0159
responde_a: R-20261110-225949-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-10T23:38:29-04:00
---
# T-0159 PDF: segura por 3 baixos (RD-0111 Total do pedido, RD-0112 Histórico só com Salvo, RD-0113 §1 da spec repete §2-§4)

## Contexto
T-0159, seu R-20261110-225949. O parecer vale também para o R-20261110-215245 e para o parecer a posteriori das 3 propostas (R-20261110-194932, R-20261110-211048). Relatório: `docs/qualidade/redundancias/2026-11-10-T-0159-pdf.md`.

**Resultado: segura.** Não há achado alto nem médio, mas há 3 baixos, e achado em aberto segura (R-20261110-062506). As imagens só sobem ao dono do produto depois do reteste.

Suas 2 perguntas:
- (a) CNPJ da filial no cabeçalho e CNPJ do cliente na ficha: não é repetição, são documentos de pessoas diferentes.
- (b) "Tabela" na ficha, na coluna e no rodapé: não é repetição, são 3 dados diferentes.
- Cabeçalho com a filial nas 4 versões e a ficha do escritório sem "Filial": sem achado.

## O que preciso
1. **RD-0111 (baixa · texto).** O rodapé dos totais repete a palavra do cabeçalho (`PEDIDO 000014` / `ORÇAMENTO 000015`):
   - Onde: `T-0159-pdf-proposta-2-cliente.html:87`, `-escritorio.html:102`, `-orcamento-cliente.html:87`, `-orcamento-escritorio.html:100` e `pdf-pedido.md:31`.
   - Antes: `Total do pedido` / `Total do orçamento`.
   - Depois: `Total`, nas 4 versões. Spec §2 linha 8: `"Total"` (cliente) e `Tabela · Desconto (ou Acréscimo) x,x% − R$ y · Total` (escritório).
2. **RD-0112 (baixa · texto).** No orçamento do escritório, a faixa Histórico tem uma etapa só, `10/11 05:55 Salvo` (`-orcamento-escritorio.html:104`; `pdf-pedido.md:33` e `:47`):
   - A etapa repete a data do cabeçalho, que é o `created_at`, e só diz o que o documento já prova. Não serve para agir.
   - Proposta: o Histórico sai só com 2 etapas ou mais, como os Alertas. Spec §2 linha 10: `sim, com 2 etapas ou mais; só "Salvo", não sai`.
   - Novo caso de teste: "Orçamento só salvo: o escritório não tem a faixa Histórico".
   - Na imagem do orçamento do escritório, tire a faixa ou mostre `Salvo → Transformado em pedido nº 000016`.
3. **RD-0113 (baixa · doc).** A linha 11 e a §1 da spec (`pdf-pedido.md:15-19`) repetem com outras palavras regras que já estão em §2–§4:
   - Emb./Qtd: `:16` × `:44`.
   - Marca vazia: `:17` × `:74`.
   - Orçamento sem Alertas: `:18` × `:29` × `:71`.
   - Filial no cabeçalho: `:3`, `:11`, `:19`, `:25`, `:39-43`.
   - Filial fora da ficha: `:19` × `:28`.
   Proposta:
   - Apagar a linha 11.
   - A §1 fica só com os ponteiros: `1. Emb. e Qtd separadas (§3). 2. Marca depois da Descrição (§2 linha 7; §4 Marca). 3. Orçamento sem Alertas (§2 linha 6; §4 Alertas). 4. Filial de faturamento no cabeçalho das 4 versões e sem a célula Filial na ficha (§2 linhas 2 e 5; §3 Filial).`
   - "Alinhada à esquerda" (Emb.) e "à direita" (Qtd) passam para o `:44`.

Fica como está (`manter`, sem achado):
- as colunas Tabela, Desc./Acr. e Líquido, porque cada uma é conferida contra uma fonte diferente;
- "· uso interno", que é a trava para a versão interna não ir ao cliente;
- a nota do cliente;
- "Desconto 0,8% − R$ 0,92", com 2 representações.

## Pronto quando
As 4 imagens (html e png) e a spec com os 3 ajustes. Responda a este recado para eu retestar. Com o reteste limpo, aviso você e o gerente, e o gerente sobe as 4 imagens para o dono do produto.
