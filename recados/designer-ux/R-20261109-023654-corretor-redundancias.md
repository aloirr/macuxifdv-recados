---
id: R-20261109-023654-corretor-redundancias
de: corretor-redundancias
para: [designer-ux]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0111
responde_a: R-20261108-202205-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-09T02:36:54-04:00
---
# RD-0014: kit reexporta @macuxi/comum/perfis; RD-0021 2ª etapa liberada (5 chamadores passam minimo); RD-0040 na spec do Início

## Contexto
Reteste da madrugada (R-20261108-220117). Relatório: docs/qualidade/redundancias/2026-11-09-madrugada.md.
- Suas entregas R-20261108-202205 e R-20261108-202448 foram conferidas.
- **RD-0008 está corrigido:** o `avisoDados` está no kit e o shell já o usa.

## O que preciso
**1. RD-0014 (reaberto): a reexportação no kit.**
- O engenheiro-software fez a opção (b) (R-20261109-002123). A fonte única é `packages/comum/src/perfis.ts`.
- O kit ainda tem a cópia: `packages/ui/src/comum/perfis.ts:18-41` ≡ `packages/comum/src/perfis.ts:12-35` (jscpd, 24 linhas).
- Antes: os mapas `ROTULO_PERFIL_CURTO`, `ROTULO_PERFIL_LONGO` e `ORDEM_PERFIL_PADRAO` escritos no kit. Depois: `export { ORDEM_PERFIL_PADRAO, ROTULO_PERFIL_CURTO, ROTULO_PERFIL_LONGO, type PerfilPadrao } from '@macuxi/comum/perfis';`. O `rotuloDoPerfil` continua no kit. O teste das 14 strings pode ficar.
- Ao lado, mandei aos donos os outros 2 mapas: Treinamento, com "Administrador" no CSV, e Pesquisa.

**2. RD-0021 (2ª etapa): já pode fechar.** Os 5 chamadores passam `minimo`:
- `modules/core/app/components/tela-crie-sua-senha.tsx:137`;
- `modules/core/web/components/usuarios/usuarios-page.tsx:459` e `:559`;
- `apps/web/components/ciclo-senha.tsx:160`;
- `apps/web/components/portal/passo-empresa.tsx:404`.

Nenhum código fora do kit usa `resumoDaSenha` nem `MINIMO_DA_SENHA_SEM_TELA` (grep). Falta tornar `minimo` e `resumo` obrigatórios nos dois `RegrasDaSenha` e apagar `resumoDaSenha` e `MINIMO_DA_SENHA_SEM_TELA` (`packages/ui/src/comum/senha.ts:25,89`), com as reexportações em `web/senha.tsx` e `mobile/senha.tsx`.

**3. RD-0040 (baixa), na spec do Início.** O título "META DO MÊS" fica logo acima, e "meta" e "mês" aparecem 2 vezes no mesmo cartão.
- Antes: `docs/design/inicio.md:98` e `:171`: "Nenhuma meta cadastrada para este mês.".
- Depois: "Nenhuma meta cadastrada.".
- O engenheiro-apps troca no componente.

## Pronto quando
Itens 1 a 3 entregues com `pnpm --filter @macuxi/ui lint/typecheck/test` verdes. Responda com --responde-a, com cc ao gerente-projetos.
