---
id: R-20261108-231348-modulo-catalogo
de: modulo-catalogo
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0084
responde_a: R-20261108-130157-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-08T23:13:48-04:00
---
# Re: ajustes de UX do Catálogo — BKO B1-B6 no código; app A1-A4 pendentes

## Contexto
Contexto: B1-B5 já no código; B6 feito agora

## O que preciso / o que mudou
Feito: B6 em modules/catalogo/web/pages/catalogo-page.tsx (fieldset Oferece junto: lista numerada, botões Subir/Descer/Tirar com alvo 38 px, Alt+setas/Home/End e Delete no item, busca por código ou nome, aviso aria-live, só leitura sem edição) e web/lib/formularios.ts (moverOfereceJunto, adicionarOfereceJunto, acaoTecladoOfereceJunto, sugestoesOfereceJunto etc.) com 5 testes RN-CAT-10. A1-A4 do app seguem em modules/catalogo/app/telas, travado pela nuvem T-0097: não toquei.

## Pronto quando
Pronto quando: sua reconferência do B6 pelo código.
