---
id: R-20261126-170538-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [engenheiro-software, modulo-core, modulo-pesquisa, modulo-promotor]
tipo: pergunta
prioridade: alta
tarefa: null
responde_a: R-20261126-164924-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-26T17:05:38-04:00
---
# #782, #826, #825 e #824 no main; #805 com head novo (580c3f1e) e os 3 módulos refeitos (#827 a #829): frases do lote 3

## Contexto
Resultado das 5 frases das 16h50 (Manaus):

| PR | Situação | Squash |
|---|---|---|
| #782 (catálogo v2) | **no main** | b9fdabac. CI do main verde |
| #826 (testes T-0198) | **no main** | 1fd9aacd |
| #825 (T-0198, Salvar sem itens) | **no main** | 83820ed0 |
| #824 (T-0197, catálogo vazio no pedido) | **no main** | 0a24d15e. CI do main rodando |
| #805 (fim das listas) | **não entrou: a frase caiu** | — |

**Por que o #805 não entrou:** depois do squash do #782, o #805 ficou em conflito. Juntei o main com um merge normal, sem force push. O git deixou passar em silêncio as versões do main em 3 arquivos, e corrigi isso num segundo commit. Agora o diff do #805 contra o main é **byte a byte** o do commit que a S7 liberou (mesmo hash, `0a6ea177`). O head mudou para **580c3f1e**, por isso a frase anterior não vale mais.

**Os 3 módulos:** com o #782 no main, refiz o core, o pesquisa e o promotor a partir do main, só com os commits do dono. O conteúdo é idêntico.
- #827 substitui o #802;
- #828 substitui o #803;
- #829 substitui o #804.

Os PRs antigos estão fechados, com o motivo. Os pareceres estão nos PRs:
- 827: 7203224114;
- 828: 7203230894;
- 829: 7203231428;
- 805: 7203374854.

O #827 traz o commit 4d4d3f47 (7 chaves fora da página de perfis), que nunca tinha passado pelo corretor. Ele foi revisado agora, sem achado.

Os 4 entram **juntos**: um sem o outro deixa as 20 rotas abertas. O CI de cada head está rodando ou verde. Só faço o merge com o CI verde nos 4 e o CI do main verde.

## O que preciso
As frases do lote 3:

1. `autorizo o merge do PR #805 no commit 580c3f1e3d613c2fa01a7d8a231f83525355a230`
2. `autorizo o merge do PR #827 no commit aa86ada4079c56f05f914587c3a1a0a17171480f`
3. `autorizo o merge do PR #828 no commit 06cce474794ae35b04158fc1b586c4c9ba9d9121`
4. `autorizo o merge do PR #829 no commit 7372d05b7fba751511eeed3cb95bfa5aebe32f4f`

Ensaio das 21h30: o SHA continua **5ec0421dc7e638b2a04823771372200c4ee04f9f** (#801). Depois do ensaio verde, peço a frase do #801, e em seguida as do E4 e do E4b.

## Pronto quando
Os 4 no main com o CI verde.
