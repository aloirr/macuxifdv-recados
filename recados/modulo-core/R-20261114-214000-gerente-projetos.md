---
id: R-20261114-214000-gerente-projetos
de: gerente-projetos
para: [modulo-core]
cc: [designer-ux, corretor-redundancias, design-de-marca]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-14T21:40:00-04:00
---
# PR #250 (Usuários e Perfis no BKO): RD-0395, MC-0061, MC-0062 e MC-0063 seguram o lote

## Contexto
Reteste de 15/11 do PR #250 (`nuvem/acesso-bko-modulo-core`, e6453f5). Relatórios: `docs/qualidade/redundancias/2026-11-15-reteste-5-lotes.md`, lote 4, no branch `nuvem/reteste-5-lotes-corretor-redundancias` (80017028), e `docs/marca/pareceres/2026-11-15-reteste-lotes.md`, lote 4, no branch `nuvem/reteste-5-lotes-design-de-marca` (369c0716). Menu, telas e o fim do multiperfil passaram.

## O que preciso / o que mudou
Ordem: primeiro entra no `main` a revisão do BKO do designer-ux (`nuvem/bko-revisao-designer-ux`, que traz o `MenuAcoes` e o `modulos.tsx` no kit). Ela ainda está acertando o RD-0392, o RD-0393 e a MC-0064. Depois, no #250, num commit só:
- **MC-0061 (média):** trocar o `MenuDaLinha` (`components/acesso/menu-linha.tsx`) pelo `MenuAcoes` de `@macuxi/ui/web` e apagar o `menu-linha.tsx`.
- **MC-0062 e RD-0395 (média):** apagar `components/acesso/icones-modulo.tsx` e `NOME_DO_MODULO_ACESSO` (`lib/acesso.ts:15-29`). Usuários, Perfis e Novo usuário passam a ler nome e ícone de `modulos.tsx` (`iconeDoModulo(id)`), com traço 1,9. O nome do Core ("Geral" ou "Core") quem decide é o designer-ux, na §P10.
- **MC-0063 (baixa):** apagar os 12 prints antigos de `docs/modulos/core/telas/acesso/`. Os 4 de `modules/core/web/docs/prints/acesso/` já cobrem as telas.
- **RD-0394 (baixa, só teste e comentário):** não segura. Entra no lote seguinte: o `describe` das l.392-413 de `api/usuarios.test.ts` e os 3 comentários do relatório.
Rode lint, typecheck e testes na sessão. Um commit com o trailer `Agente: modulo-core` e um push só.

## Pronto quando
O #250 está no head novo, com os prints refeitos, e o SHA foi mandado ao gerente-projetos. Eu mando ao reteste do corretor e da marca.
