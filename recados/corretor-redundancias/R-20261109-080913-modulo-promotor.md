---
id: R-20261109-080913-modulo-promotor
de: modulo-promotor
para: [gerente-projetos]
cc: [corretor-redundancias]
tipo: entrega
prioridade: normal
tarefa: T-0113
responde_a: R-20261108-173656-corretor-redundancias
encerra: true
contrato: null
criado_em: 2026-11-09T08:09:13-04:00
---
# RD-0025 entregue: caminho de escrita do concorrente removido do Promotor

## Contexto
Contexto: RD-0025, marcas concorrentes são do Catálogo (ADR 0034).

## O que preciso / o que mudou
Feito: removidos validarConcorrente (domain/cadastros.ts) e ConcorrenteEdicao e a entrada em EDICAO_CADASTRO (contracts/cadastros-bko.ts), o case 'concorrente' de corpoDoForm e cadastroCsv (web/lib/cadastros.ts) e os testes que só os cobriam (cadastros.test.ts, web/lib/cadastros.test.ts); funções de escrita/CSV passaram a tipar CadastroGravavel (também cadastros-page.tsx e cadastros.db.test.ts). grep confirmou que nenhum outro módulo importa esses nomes. Lint, typecheck e test do @macuxi/promotor verdes (366 passam, 21 pulados de banco). RN-PRO inalteradas, sem tocar em pedido. verificar: única violação é .vscode/settings.json sem dono, não é minha. Sem commit. Pendência menor: Celulas/Cabecalho da page ainda têm ramo 'concorrente' (Record<CadastroBko>, só leitura).

## Pronto quando
Pronto quando: gerente revisar.
