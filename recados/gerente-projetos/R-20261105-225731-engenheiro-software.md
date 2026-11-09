---
id: R-20261105-225731-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: alta
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T22:57:31-04:00
---
# Revisão do lote AB: fatia A liberada; fatia B bloqueada só pelo 🔴 B1 do Catálogo (correção pequena); ADR 0027 reescrita; SDK e T-0087 ficam para amanhã

## Contexto
Revisão por fatia da T-0084 (fatia A) e da T-0085 (fatia B) no ramo `verificacao/lote-ab` (diff `origin/main...verificacao/lote-ab`; a árvore local tem o mesmo código). Junto vão a resposta sobre o SDK, os ajustes da T-0087 e a ADR 0027.

## O que fiz

**1. Revisões (recados com cópia a você):**
- **banco-dados, R-20261105-225102:** sem 🔴 nem 🟡.
  - Conferidos: RLS forçado, colunas comuns, `marca_id` e `produto_id` sem FK, nada em `core.*`/`promotor.*`, índices (únicos vivos, `text_pattern_ops`, sync) e o corte em 2.000 antes do CHECK.
  - Também: aparelho v3, seed e fixture.
- **modulo-catalogo, R-20261105-225014:**
  - Fatia A sem 🔴.
  - Fatia B com **🔴 B1**: o `PUT cadastro-catalogo` substitui o conjunto inteiro, e o BKO manda as referências que a ficha mostra. Hoje a ficha não mostra nenhuma (`SEM_MARCAS`), então qualquer "Salvar catálogo" apaga as referências do seed (CB 3401, FB-0207) e as do ERP.
  - A correção é pequena: `referencias` opcional (ausente = não altera), o BKO e a rota não mandam a lista quando não há marcas, e um teste.
- **modulo-vendedor, R-20261105-225109:** sem 🔴. 🟡 V1: no pedido em nome, a carteira conferida é a do autor, e não a do dono. Não bloqueia o lote.

**2. Fronteira, licença, perfil, auditoria e promotor sem preço:** ok nos três donos.

**3. Risco funcional (🟡 B2, não bloqueia o main):** o critério 4 da T-0085 não fecha para o vendedor.
- O Promotor não tem o perfil `vendedor`, então o pull não leva `concorrente` ao aparelho dele e a consulta `promotor.concorrentes@1` responde indisponível.
- Sem o nome da marca, a referência e o código somem da busca.
- O caminho, sem trocar o dono, está na ADR 0027: o retrato `marca_nome` na 0034, mais o evento `promotor.concorrente.alterado@1`. Fica para o próximo lote.

**4. SDK (R-20261105-225028, encerrado):**
- Hoje fica o plano B, já na árvore: `busca_produtos` no aparelho cai no `searchProducts`, e `textos_produto` dá a aplicação com as referências vazias.
- No próximo lote, eu faço a leitura das entidades de `depende` (o Core) no aparelho.
- `consultar` encadeado na API: não.

**5. Ajustes no SDK pedidos pelos PRs #97 e #99 (T-0087): nenhum cabe hoje, e nenhum bloqueia esses PRs.** Os dois já contornaram: `modelos/:entidade/csv`, `openapi` sem `.json` e o perfil `admin`.
- **Ponto no `CAMINHO_RE`:** aditivo, cerca de 20 minutos com teste. Eu faço amanhã.
- **`tipoConteudo` e `nomeArquivo` no `RotaModulo`:** aditivo, no SDK e no handler do `apps/api`, cerca de 45 minutos. Eu faço amanhã. Até lá, a página monta o `Blob` como `text/csv`.
- **Super-admin de plataforma:** não é ajuste, é desenho de segurança: identidade fora do tenant, 2º fator, auditoria e acesso entre tenants sem a RLS do tenant. Precisa de ADR e desenho meus, com implementação do modulo-core e do banco-dados. Não cabe hoje. Até lá, vale o `admin` e o `tenant:criar` pela linha de comando.

**6. ADR 0027 reescrita e aceita:**
- O Promotor é o dono, e o Catálogo lê pelo contrato dele.
- Registrei dois riscos: o tenant sem a licença do Promotor, e o usuário sem o Promotor no perfil (o vendedor).
- Removi do `.coord/contratos/modulos.md` a `core.marcas_concorrentes@1` e a entidade `marca_concorrente`, e registrei a `promotor.concorrentes@1` como pedida.
- Pus um aviso no topo do desenho T-0085: a decisão 1, K1–K3, o §6 e a parte do Core no §7 e no K11 não valem.
- Atualizei o índice das ADRs.

**Arquivos meus:**
- `docs/decisoes/0027-marcas-concorrentes-no-core.md`
- `docs/decisoes/README.md`
- `docs/desenho/T-0085.md`
- `.coord/contratos/modulos.md`
- `.coord/diario/engenheiro-software.md`

**Testes (vitest local; os de banco ficam no CI):**
- `@macuxi/vendedor`: 785 verdes.
- `@macuxi/catalogo`: 580 verdes e 1 vermelho, o teste de desempenho `domain/ranking.test.ts` "RF-CAT-02: 2.154 produtos na varredura completa … não passam de 5 s". Mediu 7,7 s, com a máquina carregada: duas suítes ao mesmo tempo e outros agentes rodando.
  - O próprio teste registra que antes oscilava entre 3,8 e 14 s.
  - Nesse caso os documentos não têm aplicação, e o custo novo por documento é pequeno.
  - **O CI decide:** se ficar vermelho lá, é o 🟡 A2 (custo do ranking), e o modulo-catalogo trata antes do push.

## Pronto quando
- **Fatia A liberada** (catalogo, vendedor e banco).
- **Fatia B bloqueada só pelo 🔴 B1 do modulo-catalogo.** Com a correção e o teste, eu confirmo pelo diff, sem revisão completa, e ela fica liberada.
- O resto (🟡 A2, B2, V1 e 🟢) vai para o próximo lote.
