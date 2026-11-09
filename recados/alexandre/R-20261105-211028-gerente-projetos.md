---
id: R-20261105-211028-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T21:10:28-04:00
---
# T-0085 fatias C e D: prompts prontos para colar na nuvem (exportação no BKO e lista por linha no app)

## Contexto
Prompts prontos para abrir as duas fatias da nuvem da T-0085: C, exportação no BKO, e D, lista por linha no app. Cada fatia vira uma sessão no claude.ai/code, no repositório aloirr/macuxifdv. Cole cada bloco numa sessão nova.

As fatias A (T-0084) e B (T-0085), que trazem a migração única e os contratos, rodam aqui no PC e sobem ao main até 24h. C e D começam já: montam a tela sobre o contrato do desenho e ligam ao contrato real quando ele chegar ao main.

Os caminhos de C e D estão travados no quadro, e os agentes locais não mexem neles.

---

## Prompt da fatia C (cole numa sessão nova)

Você trabalha no Macuxi FDV (repositório aloirr/macuxifdv), como o agente **modulo-catalogo**, na **T-0085 fatia C: exportação do catálogo em PDF e Excel no BKO**.

**Branch:** `nuvem/T-0085-exportacao-bko`, a partir do main mais recente. Antes de começar e antes de cada push, rode `git pull --no-rebase origin main`.

**Leia primeiro:**
- CLAUDE.md;
- docs/produto/02-modulos-e-requisitos.md: RF-CAT-09;
- docs/produto/03-regras-de-negocio.md: RN-CAT-09, RN-CAT-10 e RN-CAT-11;
- .coord/tarefas/T-0085.md;
- docs/desenho/T-0085.md, se já existir no main;
- o padrão de páginas do BKO em modules/catalogo/web.

**O que fazer:**
1. **Exportação em PDF** do catálogo por sistema/linha. Ela tem um sumário com a contagem de itens por linha e uma tabela por linha com as colunas Código · Aplicação · Oferece junto · Equivale a.
   - Equivale a: marca + código das referências cruzadas, até 3.
   - Oferece junto: os códigos complementares, até 5.
   - Aplicação: o texto da descrição 2, até 2.000 caracteres. No PDF do catálogo ele sai inteiro.
2. **Exportação em Excel** (xlsx ou CSV que o Excel abre) com as mesmas colunas e uma aba por sistema, ou uma coluna sistema/grupo/linha.
   - Proteja contra fórmula (`=`, `+`, `-`, `@`, tab e CR no começo da célula). O Farol já faz isso: procure por `protegerFormula`.
3. **Quem pode:** só analista e admin exportam. Confira o perfil e a licença do módulo, e só exporte dados do tenant (RLS).
4. **Contrato:** o produto ganha `aplicacao`, `referencias` (marca + código, até 3), `oferece_junto` (até 5 ids de produto) e a hierarquia sistema › grupo › linha, na fatia B, que roda localmente.
   - Se o contrato ainda não estiver no main, monte a tela e a geração sobre o formato de docs/desenho/T-0085.md, com dados de exemplo nos testes.
   - Quando o contrato chegar ao main, faça pull e ligue.
5. **Testes:** função pura do layout e das colunas, proteção de fórmula, perfil e licença.

**Onde pode mexer:**
- Arquivos novos em `modules/catalogo/web/exportacao/**`. Esse caminho está travado para você.
- Uma linha para registrar a página ou o botão no menu do BKO do Catálogo, se precisar.

**Onde não mexe:**
- `.coord/`;
- `.claude/`, `.github/` e `scripts/coord*`;
- arquivos de outros módulos;
- o domain e a API da busca do Catálogo, que são das fatias A e B.

**Regras do repositório:**
- dinheiro em centavos;
- datas em UTC, exibidas no fuso do tenant;
- sem dado pessoal em log;
- tipos só dos contracts (Zod).

**Commits:** cada commit leva **um único** trailer `Agente: modulo-catalogo`. Rode lint, typecheck e test do pacote antes de cada push.

**Fim:** abra um PR para o main. Quando o CI do PR estiver verde, edite o título do PR para terminar com `[PRONTO PARA MERGE <sha do topo>]`. O gerente faz as revisões e o merge pela regra A.

---

## Prompt da fatia D (cole numa sessão nova)

Você trabalha no Macuxi FDV (repositório aloirr/macuxifdv), como o agente **modulo-catalogo**, na **T-0085 fatia D: lista por linha (sistema › grupo › linha) na aba Catálogo do app**.

**Branch:** `nuvem/T-0085-lista-por-linha`, a partir do main mais recente. Antes de começar e antes de cada push, rode `git pull --no-rebase origin main`.

**Leia primeiro:**
- CLAUDE.md;
- docs/produto/02-modulos-e-requisitos.md: RF-CAT-09;
- docs/produto/03-regras-de-negocio.md: RN-CAT-09, RN-CAT-11 e RN-CAT-05 (promotor sem preço nem estoque);
- .coord/tarefas/T-0085.md;
- docs/desenho/T-0085.md, se já existir no main;
- docs/design/componentes.md: o kit, a Trilha com `atualTocavel`, a regra de um só botão principal por tela e o EstadoVazio;
- o canvas "Telas do app", quadros 6c e 10b.

**O que fazer:**
1. Na aba Catálogo do app Campo, faça uma tela de **lista por linha**: sistema › grupo › linha, navegável com a Trilha do kit. Na linha, cada item mostra:
   - código, medida e embalagem e descrição;
   - aplicação em 2 linhas;
   - "Equivale a: <marca> <código>";
   - oferece junto;
   - etiquetas curtas, foto e, para quem vê, preço e estoque no contexto do cliente.
   Ao tocar no item, abre a ficha do produto que já existe.
2. **Offline:** a lista vem do pull do aparelho (SQLite e motor de sync do platform-sdk). Use as leituras do motor (`linhasPorCampo`, `versaoLinhas`) para não ler a entidade inteira a cada toque.
3. **Promotor:** vê a lista sem preço nem estoque (RN-CAT-05) e nunca vê ação de pedido (regra 7).
4. **Contrato:** a hierarquia, as referências, o oferece junto e a aplicação chegam pela fatia B e pela T-0084, que rodam localmente.
   - Se ainda não estiverem no main, monte sobre o formato de docs/desenho/T-0085.md, com dados de exemplo nos testes.
   - Quando chegarem, faça pull e ligue.
5. **Testes:** função pura que agrupa os produtos em sistema › grupo › linha, com contagem e ordem, e o caso do promotor.

**Onde pode mexer:**
- Arquivos novos em `modules/catalogo/app/telas/lista-por-linha*.tsx` e `modules/catalogo/app/lib/lista-por-linha*.ts`. Esses caminhos estão travados para você.
- Uma linha em `modules/catalogo/app/rotas.ts` ou `index.ts` para registrar a tela e a entrada a partir da aba Catálogo.

**Onde não mexe:**
- `catalogo.tsx`, `local.ts` e `vazio-busca.ts`, que são das fatias A e B;
- `.coord/`;
- `.claude/`, `.github/` e `scripts/coord*`;
- arquivos de outros módulos.

**Regras do repositório:** offline-first, tipos só dos contracts (Zod) e o visual do kit (packages/ui), sem cor escrita à mão.

**Commits:** cada commit leva **um único** trailer `Agente: modulo-catalogo`. Rode lint, typecheck (app, web e api do catálogo) e test do pacote antes de cada push.

**Fim:** abra um PR para o main. Quando o CI do PR estiver verde, edite o título do PR para terminar com `[PRONTO PARA MERGE <sha do topo>]`. O gerente faz as revisões (designer-ux e engenheiro-software) e o merge pela regra A.
