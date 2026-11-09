---
id: R-20261109-094629-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0142
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T09:46:29-04:00
---
# T-0142 entregue: Catálogo pela hierarquia (app, BKO e API); causa dos níveis misturados é o seed

## Contexto
Contexto: R-20261109-065241 e R-20261109-065415 (4 decisões); spec do designer-ux em docs/design/catalogo-por-linha.md e imagem docs/design/telas/T-0142-catalogo-hierarquia.png (seguida).

## O que preciso / o que mudou
O que fiz: (1) domain/hierarquia.ts, navegarHierarquia, função pura, 9 testes RF-CAT-09 escritos antes: começa pelo nível mais alto e pula os vazios, nível com item só pula, sem hierarquia lista de produtos, contagem de ativos (não excluídos, sem filtro de estoque, distintos; valor × regra: soma do nível = produtos da descida), Outros produtos e Sem classificação (nada some), trilha com nível pulado sem toque. (2) CAUSA dos níveis misturados: dado do seed, db/seeds/demo/demo.ts ARVORE cria FRE, FIL e SUS com pai null, no mesmo nível de AUT; a tela só lista os filhos da raiz. Pedido ao banco-dados R-20261109-082915-modulo-catalogo. (3) App: sem Ver por linha, busca no topo, ListaNiveis e Trilha do kit, último nível com título, chips de marca e estoque e cartões; offline (SQLite) pela mesma função; sem chips de linha. (4) API: GET /v1/catalogo/hierarquia e produtos?no=; BKO: página abre pela hierarquia, nível na URL (?no=), trilha, sem o filtro Categoria, tabela de produtos no último nível ou na busca. (5) Defeito do app lendo concorrente do Promotor: corrigido, local.ts lê marca_concorrente (ADR 0034), com teste. (6) RD-0024 (comentário de contracts/busca.ts:127) e RD-0041 (pdf.ts e placeholder-jpeg.ts usam semAcento de domain/texto).

## Pronto quando
Arquivos: modules/catalogo/domain/hierarquia.ts e .test.ts, domain/index.ts, app/telas/catalogo.tsx, app/lib/{local.ts,lista-por-linha.ts,catalogo-hierarquia.test.ts}, removidos app/lib/atalho-por-linha(.test).ts e app/telas/arvore.tsx, contracts/{rotas.ts,busca.ts}, api/{rotas.ts,rotas.test.ts,demo/placeholder-jpeg.ts}, web/{pages/catalogo-page.tsx,lib/formularios(.test).ts,exportacao/pdf.ts}, docs/modulos/catalogo/regras.md. Testes: lint, typecheck e test do @macuxi/catalogo verdes (1 warning antigo em texto-consultas.test.ts); verificar modulo-catalogo só acusa .vscode/settings.json. Pendências: (a) seed (banco-dados) para a demo mostrar só 4 sistemas; (b) a tela lista-por-linha (T-0085 D) ficou sem entrada pela aba, com código e testes mantidos: o corretor pode pedir remoção ou a lista rica (aplicação, equivale a) entrar no último nível, decisão do dono do produto; (c) BKO: PDF/Excel segue exportando o catálogo inteiro (spec pede o nível aberto), e a coluna Caminho na busca do BKO não foi feita; (d) sem aprovação do dono pela imagem ainda; (e) /produtos?no= no BKO filtra no servidor, a busca de texto do BKO segue sobre as páginas carregadas como antes.
