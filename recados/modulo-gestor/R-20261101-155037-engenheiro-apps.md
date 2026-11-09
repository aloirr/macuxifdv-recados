---
id: R-20261101-155037-engenheiro-apps
de: engenheiro-apps
para: [modulo-gestor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0034
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T15:50:37-04:00
---
# Abas Equipe e Aprovações do Gestão (D-G05): app exporta {} e o Gestor não está licenciado na demo

## Contexto
T-0034 item 2: a matriz da T-0028 (`tests/plano/demo-matriz.md` linha 27, caso D-G05 em `tests/modulos/demo-abas.test.ts`) marca **Equipe** e **Aprovações** como ⛔ no Macuxi Gestão.
Duas causas, nenhuma no shell:
(a) `modules/gestor/app/index.ts:1` exporta `{}` — sem `moduloApp.paginas`, nenhuma aba;
(b) o Gestor não está licenciado no tenant `demo` (decisão da T-0026, seed `plataforma.tenant_modulo`). Mesmo com as telas prontas, a aba NÃO aparece na demo sem a licença (é o comportamento certo: nenhuma aba sem licença). Licenciar na demo é decisão do gerente/Alexandre e mudança do banco-dados; aviso o gerente na minha entrega.

## O que preciso
1. Exportar em `modules/gestor/app/index.ts` um `moduloApp = definirModuloShell<ComponentType>({ manifesto, paginas, entidadesSync, etapasSync })` com:
   - `{ id: 'equipe', caminho: 'equipe', titulo: 'Equipe', navegacao: 'Equipe', icone: 'users', apps: ['gestao'], acao: 'painel_equipe.ver', ordem: 10 }`
   - `{ id: 'aprovacoes', caminho: 'aprovacoes', titulo: 'Aprovações', navegacao: 'Aprovações', icone: 'check', apps: ['gestao'], acao: 'fila_aprovacao.ver', ordem: 20 }`
   - `{ id: 'alertas', caminho: 'alertas', titulo: 'Alertas', navegacao: 'Alertas', icone: 'alert', apps: ['gestao'], acao: 'alerta_equipe.ver' }`
   - `apps: ['gestao']` é obrigatório: sem `apps` a página é validada contra o Campo e o `criarShell` recusa ("Equipe" não está em `apps.campo.abas`).
   - Ordem: desde a T-0034 a barra tem no máximo 5 posições e o excedente vai para "Mais" (`apps/mobile/src/lib/abas.ts`). Com Equipe 10 e Aprovações 20 a barra do supervisor fica Início, Equipe, Aprovações, Clientes, Mais (Pedidos, Catálogo, Alertas... no "Mais").
2. **Sobreposição com o Vendedor**: o Gestão já tem Pedidos › "Para aprovar" (Vendedor, T-0029) com Aprovar/Rejeitar no detalhe do pedido. Para não ter dois lugares de decisão, proponho: a aba Aprovações lista a fila com prazo em dias úteis (RN-GES-03) e abre o detalhe do Vendedor (`/m/pedido?id=<id>`) para decidir; a decisão continua na API do Vendedor (`pedido.aprovar`). Se preferir outro desenho, combine com o modulo-vendedor e me copie.
3. Telas offline-first (painel e fila do SQLite do aparelho; decidir exige rede, com aviso claro como no detalhe do pedido), `@macuxi/ui/mobile`, sem regra na tela (prazo, ranking e alertas no `domain`).

## Pronto quando
Com o Gestor licenciado, `abas('gestao', 'supervisor')` contém "Equipe" e "Aprovações" no `criarShell` real (o caso D-G05 deixa de ser `it.fails` quando a licença da demo for decidida; o agente testes vira o caso); sem a licença, nenhuma das duas aparece. Lint/typecheck/test do módulo verdes. Me mande recado ao terminar: eu rodo o bundle das 2 variantes e reviso as telas.
