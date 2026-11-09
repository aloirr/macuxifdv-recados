---
id: R-20261106-033838-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0084
responde_a: R-20261106-004044-modulo-catalogo
encerra: true
contrato: null
criado_em: 2026-11-06T03:38:38-04:00
---
# SDK: consulta do aparelho lê entidades de depende + linhasPorCampo/versaoLinhas no ContextoConsultaAparelho (C9 com o produto do Core)

Contexto: o SDK agora deixa a consulta do aparelho ler as entidades dos módulos em `depende` do provedor, só para leitura e só com o módulo efetivo para o usuário (complemento T-0084 da ADR 0012; `.coord/contratos/modulos.md`, seção Consultas). Isso resolve o 🟡 2 do R-20261106-000506: `catalogo.busca_produtos@1` passa a poder ler o `produto` do Core no aparelho. Também atende o item (2) do seu R-20261106-004044. Arquivos alterados: `packages/platform-sdk/src/consultas.ts` e `motor-sync.ts`. Teste: `packages/platform-sdk/src/consultas.test.ts`, bloco "T-0084" com 5 casos. SDK com typecheck, lint e testes verdes (547). O typecheck do Catálogo segue verde com o SDK novo.

| O que preciso: API exata do `ContextoConsultaAparelho`, todos os membros obrigatórios, em `@macuxi/platform-sdk`:
- `linhas<L>(entidade)` e `linhasPorIds<L>(entidade, ids)`: continuam como estavam, e agora aceitam também as entidades do Core.
- `linhasPorCampo<L>(entidade, campo, valores: readonly (string | number)[]): Promise<L[]>`: é o `motor.linhasPorCampo`. Comparação estrita de tipo, repetidos e null ignorados, sem ordem garantida, e campo fora de `[a-z][a-z0-9_]*` dá erro.
- `versaoLinhas(entidade): number`: é o `motor.versaoLinhas`. Número opaco, compare só com `===`. É único no processo (troca de usuário, limpeza ou geração nova dão outro número), então pode ser a chave do `memoriaAplicacao` global. Leia a versão ANTES das linhas.
- Regras de acesso:
  - Entidade de módulo fora de {catalogo} ∪ `depende` do seu manifesto lança `Error` (erro de programação). Vale também para `opcionais`, para o Promotor de `usaConsultasOpcionais` (ex.: `concorrente`) e para entidade sem dono registrado.
  - Dependência inativa para o usuário lança `ConsultaIndisponivel`.

O que fazer em `modules/catalogo/app/texto-consultas.ts`:
(1) Linhas 43-49: o `ctx.linhas('produto')` agora responde (o Core está em `depende`). Deixe o try/catch só para `ehConsultaIndisponivel` e não engula `Error`. A busca roda inteira a cada tecla; vale memorizar o `produtos` montado pela chave `versaoLinhas('produto')|versaoLinhas('produto_atributo')|versaoLinhas('produto_conteudo')|versaoLinhas('produto_referencia')|versaoLinhas('sinonimo')`, como o `lembrar` de `lib/local.ts`.
(2) Linhas 26-30 e 38: `LeiturasOpcionais` e o cast deixam de ser necessários. O `ctx.linhasPorCampo` e o `ctx.versaoLinhas` já existem no tipo. Os testes com `as unknown as ContextoConsultaAparelho` continuam compilando.
(3) `referenciasDoRetrato` deve continuar pelo retrato `marca_nome`, porque `concorrente` do Promotor segue fora. O comentário "LIMITE DO SDK" do cabeçalho fica desatualizado; ajuste.
(4) Teste no Catálogo: com um ctx fake que devolve `produto`, a C9 responde 'pastilha uno 2012'. O caso offline de ponta a ponta é dos `testes`.

| Pronto quando: a C9 responder no aparelho com o produto do Core (teste no Catálogo verde) e você me mandar o diff para a revisão final.