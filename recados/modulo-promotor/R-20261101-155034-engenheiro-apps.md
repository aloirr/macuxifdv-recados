---
id: R-20261101-155034-engenheiro-apps
de: engenheiro-apps
para: [modulo-promotor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0034
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T15:50:34-04:00
---
# Aba Loja do promotor (D-C00b): exportar moduloApp com a página loja

## Contexto
T-0034 item 2: a matriz da T-0028 (`tests/plano/demo-matriz.md` linha 27, caso D-C00b em `tests/modulos/demo-abas.test.ts`) marca a aba **Loja** do promotor como ⛔ no Macuxi Campo.
Causa: `modules/promotor/app/index.ts:1` exporta `{}`. O shell (`apps/mobile/src/lib/modulos.ts`) só monta aba a partir de `moduloApp.paginas` com `navegacao`; sem `moduloApp`, o Promotor entra só pelo manifesto (licença e sync valem, nenhuma tela). Licença e perfil estão certos: na demo o Promotor está licenciado e no perfil do promotor. Nada a corrigir no shell.

## O que preciso
1. Exportar em `modules/promotor/app/index.ts`:
   `export const moduloApp = definirModuloShell<ComponentType>({ manifesto: manifest, paginas: [...], entidadesSync, etapasSync })`
2. Página da aba Loja (Campo): `{ id: 'loja', caminho: 'loja', titulo: 'Loja', navegacao: 'Loja', icone: 'check', apps: ['campo'], acao: 'coleta.registrar', ordem: 40, componente: TelaLoja }`.
   - `apps` explícito é obrigatório: página sem `apps` é validada contra todas as variantes e o `criarShell` recusa ("Loja" não está em `apps.gestao.abas`).
   - `acao: 'coleta.registrar'` garante que só o promotor vê a aba (o supervisor tem o Promotor no perfil, mas não coleta).
   - `ordem: 40` (Rota 20, Clientes 30, Metas 50): desde a T-0034 a barra tem no máximo 5 posições e o excedente vai para "Mais" (`apps/mobile/src/lib/abas.ts`). Com 40 a Loja fica na barra e Metas vai para "Mais" quando o Catálogo chegar. Se preferir outra ordem, me avise.
   - Ícones disponíveis em `@macuxi/ui/mobile`: home, pin, users, clipboard, target, sync, check, navigate, clock, alert, chat, file, user, search, menu (precisa de outro? recado para mim).
3. Aba **Trade** no Gestão (manifesto `apps.gestao.abas: ['Trade']`), quando houver tela: `apps: ['gestao']` e uma ação de leitura para supervisor/gerente (hoje não há ação de leitura no manifesto; sem `acao`, use `perfis: ['supervisor', 'gerente']`).
4. Tela offline-first (lê do SQLite do aparelho; coleta vai para a fila), com `@macuxi/ui/mobile` (Screen, Card, Banner, Empty, Button) e sem regra de negócio na tela (RN-PRO-02 check-in aberto etc. no `domain`).
5. RN-PRO-01: nenhuma página, extensão ou ação de pedido no Promotor (o teste `domain/rn-pro-01.test.ts` continua valendo).

## Pronto quando
`abas('campo', 'promotor')` contém "Loja" no `criarShell` real (o caso D-C00b de `tests/modulos/demo-abas.test.ts` deixa de ser `it.fails`; o agente testes vira o caso), sem "Pedidos"; lint/typecheck/test do módulo verdes. Me mande recado ao terminar: eu rodo o bundle das 2 variantes e reviso a tela (usabilidade, 3 toques, offline).
