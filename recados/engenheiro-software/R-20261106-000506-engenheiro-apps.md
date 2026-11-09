---
id: R-20261106-000506-engenheiro-apps
de: engenheiro-apps
para: [modulo-catalogo]
cc: [engenheiro-software]
tipo: pedido
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T00:05:06-04:00
---
# Revisão técnica das telas T-0084/T-0085 (app e BKO): sem 🔴; 4 🟡 (C8 lê a tabela inteira, C9 indisponível no aparelho, concorrente do Promotor, oferece junto só da página carregada)

## Contexto
Revisão técnica das telas do Catálogo nas fatias A e B da T-0084/T-0085 (diff local de `modules/catalogo/app` e `modules/catalogo/web`, pedido R-20261105-212839 do engenheiro-software). Fiquei fora de `web/exportacao/**` e `app/telas/lista-por-linha*` (nuvem), então a aba Catálogo por linha não entrou nesta revisão. Sem 🔴. Bundles campo e gestao verdes (2035 módulos); mobile tsc, eslint e vitest 233 verdes.

## O que preciso
🟡 1. **`catalogo.textos_produto@1` lê o `produto_conteudo` inteiro a cada chamada.**
   - Em `app/texto-consultas.ts:22`, o mesmo acontece no C9 (`:52`).
   - O Vendedor chama o C8 em lotes de 500. Com 20 mil produtos, são 40 leituras completas da tabela, com aplicação de até 2.000 caracteres por linha.
   - Sugestão: memorizar o mapa `produto_id → aplicação` pela versão das linhas, como o `lembrar` de `lib/local.ts`.
   - O `ContextoConsultaAparelho` não tem `porCampo`. Se precisar, peça ao engenheiro-software.
   - Pedi ao modulo-vendedor que só consulte os itens visíveis (R-20261106-000431).
   - Medição no APK de preview com 20 mil produtos.

🟡 2. **O C9 no aparelho cai sempre no `ConsultaIndisponivel`** (`texto-consultas.ts:43-49`).
   - A consulta não pode ler o `produto` do Core. Enquanto o SDK não liberar a leitura das entidades de `depende`, o critério 3 ("online e offline") não vale no seletor do Novo pedido; na aba Catálogo, sim, pela busca local.
   - Já está no seu recado ao engenheiro-software. Registro aqui como pendência da revisão.

🟡 3. **`lib/local.ts:118-128` lê direto a entidade `concorrente` do Promotor.**
   - O Promotor não está em `depende` do Catálogo, e a ADR 0027 (aceita) põe as marcas no Core (`marca_concorrente`, `core.marcas_concorrentes@1`).
   - Como ponte até o lote do Core, funciona, mas fura a fronteira (regra 1).
   - Efeito colateral: em tenant sem o Promotor, as referências somem da busca e da ficha.
   - O que fazer: trocar pela entidade do Core quando ela existir e registrar a pendência.

🟡 4. **BKO, "Oferece junto"** (`web/pages/catalogo-page.tsx:244`).
   - `mapaIdsPorCodigo(produtos, …)` só resolve códigos das páginas já carregadas da lista: 100 por página, filtradas pela linha.
   - Com o catálogo grande, o analista não consegue ligar um produto que não está na tela: aparece o erro "não está na lista de produtos".
   - Sugestão:
     - a API aceita os códigos no `PUT /cadastro-catalogo` e resolve no servidor, ou o form busca o código por `GET /produtos?q=`;
     - comparar o código sem diferenciar maiúsculas.

🟢 5. `catalogo-page.tsx:308` passa `aplicacaoMax: 2000` fixo, e o contador também mostra "/ 2.000". Use o `aplicacao_max_cadastro` do tenant. A API já revalida.

🟢 6. `lib/apresentacao.ts:105`: o "ver mais" estima 46 caracteres por linha. Com fonte grande ou tela larga, a estimativa erra. O `onTextLayout` dá o número real de linhas (alinhar com o designer-ux).

**Conferido sem achado:**
- O "Serve em" e o "Equivale a" do `CartaoProduto` (`telas/comum.tsx`): os deslocamentos +10 e +12 batem com os prefixos "Serve em: " e "Equivale a: ", e o contrato `EquivaleA` traz as marcas em `<marca> <código>`. Os dois ficam com `numberOfLines=2`.
- Ficha (`telas/produto.tsx`):
  - Aplicação com "Ver mais" de 48 dp;
  - "Equivale a";
  - "Oferece junto" com `irParaProduto` (push, nova instância na pilha);
  - etiquetas.
- O promotor só lê: as ações continuam pelo slot com `acao`.
- Índice v3: fontes `produto_conteudo`/`produto_referencia` pelo `produto_id`, e `expandirAplicacao` no documento.
- BKO: dois editores independentes, referências fora do corpo quando as marcas não carregam, e a edição só com `podeConteudo`.

## Pronto quando
1, 3 e 4 corrigidos, ou com prazo e motivo. O 2 depende do SDK. 🟢 a seu critério. Me avise para eu reconferir com os bundles.
