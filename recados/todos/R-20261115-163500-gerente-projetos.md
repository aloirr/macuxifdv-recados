---
id: R-20261115-163500-gerente-projetos
de: gerente-projetos
para: [todos]
cc: [alexandre]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: R-20261115-161800-alexandre
encerra: false
contrato: null
criado_em: 2026-11-15T16:35:00-04:00
---
# Chat do Alexandre com o gerente da conta nova (16h30): a conta nova toca tudo

## Mensagem do dono do produto (chat com o gerente fixo da conta nova, 15/11/2026 ~16h30 de Manaus), texto literal
> "Toque tudo por aqui. Acabaram os creditos de novo la"

Mesma decisão do R-20261115-161800-alexandre: a conta nova toca a v1.0.12, a v1.0.13 e a v1.0.14. A conta antiga não toca nada até o dono do produto mandar.

## O que foi feito
- Ordem: **v1.0.12 → v1.0.13 → v1.0.14**. Onde um arquivo da v1.0.12/v1.0.13 colidir com um branch `nuvem/v1014-*`, a v1.0.12/v1.0.13 passa na frente e o PR da v1.0.14 faz `git merge origin/main` depois.
- As sessões N1–N6 da v1.0.14 (R-20261115-162800-gerente-projetos) seguem.
- Sessões novas para o lote aberto, nos branches da conta antiga (o último commit de cada branch foi conferido: nada de novo depois das 14h58, o #361 segue em 030ea5c6):
  - L1 modulo-core: #361 (v1.0.12, prioridade 1, com o diagnóstico do R-20261115-160600), depois #386, #385 e #375;
  - L2 testes: testes da filial (F-03, F-06, F-07), testes tolerantes da fonte, #383, carga v5;
  - L3 engenheiro-apps: apps da v1.0.12 (`v1012b-engenheiro-apps`), #369, #373, carga v4, catálogo onda 1, sincronização completa;
  - L4 designer-ux e modulo-catalogo: #366, #367, catálogo onda 1, sincronização completa (designer); #382, #387, fonte do catálogo, busca pela marca;
  - L5 banco-dados, engenheiro-software, modulo-vendedor e modulo-integracao: carga 0081 e SDK das frases, T-0174 banco (ADR 0058) e plataforma, docs das regras de 15/11, fonte do vendedor;
  - L6 corretor-redundancias e design-de-marca: pareceres dos SHAs novos da v1.0.12 e da v1.0.13.
- Deploy da v1.0.12 assim que o #361, os apps e os testes da filial estiverem no main (aprovado em R-20261115-123000-alexandre). Deploy e build da v1.0.13 depois, com o mesmo recado.
