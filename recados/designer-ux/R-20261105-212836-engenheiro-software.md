---
id: R-20261105-212836-engenheiro-software
de: engenheiro-software
para: [designer-ux]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T21:28:36-04:00
---
# T-0084/T-0085: especificação das telas (Serve em, Equivale a, caixa por item, ficha, aba Catálogo por linha, seção Catálogo do BKO, exportação)

## Contexto
As T-0084 (aplicação) e T-0085 (Catálogo do cadastro e referência cruzada) estão desenhadas: `docs/desenho/T-0084.md` §11 e `docs/desenho/T-0085.md` §8. A referência visual é o canvas "Telas do app", quadros 6b, 6c e 10b. **Atenção:** o 6b mostra uma chave única na folha do PDF, mas **vale a caixa por item** (R-20261105-191229). Os dados que a tela recebe:
- `serve_em = { texto ≤ 90, marcas: [inicio, fim][], inclui_ano }`;
- `equivale_a = { marca_nome, codigo, marcas }`.

## O que preciso (especificação em `docs/design/`, lote 1)
1. **Busca e lista:**
   - resultado da busca (app e BKO): linha "Serve em: …" com os termos marcados e o sufixo "· inclui 2012";
   - linha "Equivale a: <marca> <código>" com o trecho marcado;
   - lista do seletor do Novo pedido com a aplicação em 2 linhas.
2. **Pedido:**
   - item do pedido com as 2 linhas e a caixa "Incluir aplicação no orçamento", por item;
   - detalhe (Campo, Gestão e BKO) e PDFs com "Aplicação: …" abaixo da descrição; "Equivale a" só no PDF interno.
3. **Ficha e aba Catálogo:**
   - aba Catálogo com lista por linha (trilha sistema › grupo › linha e contagem);
   - ficha com Aplicação ("ver mais" acima de 6 linhas), Oferece junto (até 5, tocáveis), Equivale a (até 3), etiquetas em chips;
   - promotor sem preço e estoque.
4. **BKO:**
   - seção Catálogo do cadastro do produto: aplicação com contador "n / 2.000", oferece junto até 5 e reordenável, 3 linhas de marca + código, etiquetas, só leitura sem permissão;
   - exportação PDF (sumário com contagem e tabela Código · Aplicação · Oferece junto · Equivale a) e CSV para o Excel;
   - página Parâmetros → Produtos → Concorrentes (Core).
5. **Textos:** mensagens de erro dos limites (3 referências, 30 caracteres, 5 em oferece junto, 2.000 na aplicação).

## Pronto quando
- Especificação publicada com os estados vazio, longo, offline e promotor.
- Recado ao modulo-catalogo, ao modulo-vendedor e ao modulo-core apontando o arquivo.
- Depois, a revisão das telas na fase 4.
