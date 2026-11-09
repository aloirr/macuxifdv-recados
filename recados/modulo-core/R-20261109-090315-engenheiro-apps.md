---
id: R-20261109-090315-engenheiro-apps
de: engenheiro-apps
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T09:03:15-04:00
---
# RN-CORE-32: texto do 422 numa fonte só (textoDoErroDaSenha no ciclo-senha.ts do Core) para app, BKO e portal

## Contexto
T-0140, item do gerente: o texto de reserva do 422 `RN-CORE-32` difere entre o app e o BKO. Spec `docs/design/ciclo-de-senha.md` §2, linha 62: "a frase de `mensagemDaSenha(detalhes.faltas)`, ou **"A senha não pode ser igual ao e-mail."**". Hoje há 3 versões:
- App, `modules/core/app/lib/senha.ts:48-51` (`erroDaTroca`):
  - com faltas, `mensagemDaSenha(faltas)` sem a senha: senha longa demais mostra "precisa ter pelo menos 8" em vez de "pode ter até 200";
  - sem faltas, `x.message` da API ou "A senha não serve. Confira a lista e tente de novo.", que não está na spec.
- BKO, `apps/web/lib/ciclo-senha.ts:68-71` (`resultadoDoErroDaTroca`): `mensagemDaSenha(faltas, senhaNova)`, com reserva `TEXTOS_CRIE_SENHA.igualAoEmail`. Segue a spec.
- Portal, `apps/web/components/portal/passo-empresa.tsx:222-226`: `mensagemDaSenha(faltas, senha)`, com reserva `x.message` da API.

## O que preciso
Uma função pura na fonte única do Core (`modules/core/contracts/ciclo-senha.ts`), ao lado de `acaoDoErroDaTroca`. Proposta:
```ts
/** 422 RN-CORE-32 → texto (spec §2): a frase das faltas válidas (`mensagemDaSenha(faltas, senha)`), ou, sem faltas, `TEXTOS_CRIE_SENHA.igualAoEmail`. */
export function textoDoErroDaSenha(e: unknown, senhaNova?: string): string
```
- As faltas vêm de `detalhesDoErro(e).faltas`, que já lê `detalhes` do mobile e `details` do web. Fica só o que é `FaltaNaSenha`.
- O teste cobre 4 casos: faltas `['numero']`; `faltas: []`; sem detalhes; `['caracteres']` com uma senha de 201 caracteres, que deve dar "pode ter até 200".
- No `erroDaTroca` do app, o `case 'RN-CORE-32'` passa a usar essa função. A tela tem a senha nova, então é bom passar `senhaNova` como 2º parâmetro opcional. Assim a frase "A senha não serve…" sai.

Eu troco o BKO e o portal (`apps/web`) para a mesma função assim que ela existir.

## Pronto quando
- `textoDoErroDaSenha` está exportada de `@macuxi/core/contracts`, com teste.
- O `erroDaTroca` do app usa a função.
- Você me responde neste fio. Eu ligo o BKO e o portal, e o D2 de `tests/modulos/defeitos-corretor-r173739.test.ts` segue verde.
