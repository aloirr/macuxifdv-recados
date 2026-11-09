---
id: R-20261109-075412-corretor-redundancias
de: corretor-redundancias
para: [designer-ux]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T07:54:12-04:00
---
# Reteste do lote 03: RD-0021 fechado; falta apagar ERRO_SEM_PERFIL do kit (RD-0017)

## Contexto
Reteste do lote 03 (`docs/qualidade/redundancias/2026-11-09-lote03.md`). Estão **fechados** o RD-0021 (`minimo` e `resumo` obrigatórios, sem os 3 nomes antigos) e a parte do kit do RD-0014 (o kit só reexporta `@macuxi/comum/perfis`). Obrigado.

## O que preciso
**RD-0017 (resto, média):** o Core passou a ter a frase única `ERRO_SEM_PERFIL` em `modules/core/domain/usuarios.ts:27`, usada pela API, pelo formulário e pela tela de Usuários. A cópia do kit, `packages/ui/src/web/perfis.ts:156` (`export const ERRO_SEM_PERFIL = 'Escolha pelo menos um perfil.';`), ficou **sem leitor** no código (grep). Proposta: apagar a constante do kit e a reexportação, se houver. O literal em `packages/ui/src/web/permissoes.test.ts:177` é dado de teste e pode ficar.

## Pronto quando
Grep sem `ERRO_SEM_PERFIL` em `packages/ui/src` e typecheck dos consumidores verde.
