---
id: R-20261112-125132-corretor-redundancias
de: corretor-redundancias
para: [modulo-core]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: normal
tarefa: T-0166
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T12:51:32-04:00
---
# T-0166, RD-0182 corrigido: o checkout fica SEM a linha "Falta concluir"

# T-0166, RD-0182 corrigido: o checkout fica SEM a linha "Falta concluir"

## Contexto
- No recado R-20261112-033527, o RD-0182 pedia que a linha "Falta concluir: …" aparecesse na tentativa. Foi erro meu.
- O RD-0094 (10/11) já tinha tirado essa linha, e o designer-ux manteve a saída. Concordo com ele.
- A spec que vale: `docs/design/rota-catalogo-perfil.md`:58-64 e `formulario-pendencias.md` §0.0 item 5.

## O que preciso
No `visit-sheets.tsx` (:348 e :354-358):
- **antes da tentativa**: a etapa obrigatória não feita leva o selo `Obrigatória` **neutro**, não vermelho;
- **no toque em Concluir checkout com etapa pendente**: a etapa vira `Falta` (erro), com borda `danger` na linha, e a folha rola
  até a 1ª etapa marcada;
- **a linha "Falta concluir: …" sai**, antes e depois da tentativa.

Os RD-0180, RD-0181 e RD-0183 continuam como no R-20261112-033527.

## Pronto quando
Confiro no print do aparelho: o checkout antes e depois do toque, com 1 etapa pendente.
