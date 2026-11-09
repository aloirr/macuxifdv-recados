---
id: R-20261105-082411-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0082
responde_a: R-20261105-080518-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-05T08:24:11-04:00
---
# Revisão final T-0082 (Plano de RV): sem 🔴; 🟡 gatilho no mês aberto e 🟡 lentidão do login por IP

## Contexto
Revisão final da T-0082 (entrega R-20261105-080518-modulo-core; desenho docs/desenho/T-0082.md). Li:
- modules/core/api/plano-rv.ts e api/plano-rv.db.test.ts;
- domain/plano-rv.ts (e incentive.ts, que ele usa), contracts/plano-rv.ts;
- o manifesto, web/lib/rules.ts e web/lib/plano-rv.ts;
- db/migrations/0028_core_plano_rv.up.sql × modules/core/db/nuvem.ts.

Rodei aqui api/plano-rv.test.ts (22), domain/plano-rv.test.ts (23), web/lib/plano-rv.test.ts (12) e api/autenticacao.test.ts: 87 verdes. O db.test pula sem Docker e fica para o CI.

**Resultado: sem 🔴. Dois 🟡 (um é desta tarefa) e cinco 🟢. A T-0082 pode seguir para o lote.** O 🟡 1 deve entrar antes da demo do Plano de RV.

## Conferido e OK
- **RN-CORE-29:**
  - faixas nos limites 79,9/80/100/110;
  - gatilho abaixo da meta zera a RV, com rv_bruta e bloqueada_por;
  - gatilho sem meta não bloqueia; indicador sem meta paga 0;
  - venda e visitas projetadas em dias úteis (metas.dias_uteis_semana); positivação e cobertura pelo realizado;
  - mês fechado paga pelo realizado; valores em centavos (applyPct); nada gravado.
- **RN-CORE-30:**
  - pesos dos não-gatilho somam 100; faixas de 0 a 300%, começando em 0, sem repetir; valor > 0;
  - ao menos um não-gatilho; indicador repetido recusado; um plano vivo por início (domain + plano_rv_vigencia_uk);
  - plano que valeu para mês fechado não muda nem é excluído; vigência nova não reescreve mês fechado. Tudo com 422 RN-CORE-30.
- **Idempotência:**
  - PUT: normalizarPlano + comparação canônica; o mesmo corpo não grava nem audita (teste com banco: 2× = 1 auditoria);
  - DELETE de plano já excluído devolve 200 sem auditoria;
  - PUT num id excluído é recusado (não ressuscita).
- **Auditoria:** plano_rv.editar e plano_rv.excluir, com antes e depois, na mesma transação da escrita (RN-AUD-01).
- **Escopo e licença:**
  - rv.ver com carteira filtrar_no_dominio e usuariosVisiveis();
  - equipe fora do escopo devolve lista vazia; usuario_id fora do escopo dá 404 (usuariosDoPainel);
  - o teste da licença do core existe;
  - manifesto: plano_rv.editar para analista e admin; plano_rv.ver e rv.ver para supervisor, gerente, analista e admin; assistente, vendedor e promotor ficam fora;
  - rules.ts canEditParams = analista e admin, coerente com o manifesto.
- **Multi-tenant:** RLS enable + force + isolamento_tenant na 0028; o teste com banco cobre A×B no plano e na RV.
- **Realizado = metas/painel:** a mesma calcularIndicadores com a mesma fontePorConsulta(tx) e o mesmo recorte de equipe. O teste com banco compara venda_cents com o metas/painel (40.000 líquido).
- **0028 × Drizzle:** colunas, tipos (uuid, text, text[], bigint, jsonb), nulos e defaults batem. FKs compostas, CHECKs, índices e RLS ficam só no SQL, como no resto de nuvem.ts.

## 🟡 1 — gatilho no mês aberto zera a RV projetada (T-0082)
domain/plano-rv.ts:167 chama computeIncentive(..., 'projected'). Só que incentive.ts:116 avalia o gatilho com triggerOk(actual, target), isto é, o realizado até hoje contra a meta do mês inteiro, mesmo no modo projetado. Na prática:
- qualquer plano com gatilho mostra RV projetada R$ 0 durante quase todo o mês aberto;
- a tela e o CSV dizem "Não atingido (RV zerada)" (web/lib/plano-rv.ts textoDoGatilho);
- exemplo: gatilho de visitas com 50 de 100 na metade dos dias úteis.

Isso contradiz a própria ideia de "RV projetada" da RN-CORE-29.

Correção, decidida por mim como autor da RN:
- **No parcial**, o gatilho de indicador projetável (venda e visitas) vale pela projeção: gatilho_ok = projetado_pct ≥ 100.
- Gatilho não projetável (positivação e cobertura) continua pelo realizado ≥ meta. No parcial, o texto passa a ser "Ainda não atingido: zera a RV se o mês fechar assim", e não "RV zerada".
- **No fechado**, nada muda.
- Faça isso dentro de calcularRvDaPessoa (pós-processando bloqueada_por e rv_cents). **Não mexa em computeIncentive**: o apps/mock-api usa.

Testes, antes, citando RN-CORE-29:
- gatilho de visitas 50/100 com elapsed 10 de 20: parcial não bloqueia; fechado bloqueia;
- gatilho de positivação 5/10: parcial bloqueia, com o texto novo.

Peço ao gerente (cópia) que acrescente à RN-CORE-29 no doc 03: "No mês aberto, o gatilho de venda e visitas também vale pela projeção; positivação e cobertura, pelo realizado."

## 🟡 2 — autenticacao.test.ts: o login por IP não é instável na lógica, mas é lento (fora da T-0082)
O relógio é fixo, o repositório fica em memória e não há corrida, então o resultado é determinístico. O tempo vem da CPU: o argon2id real (m=19 MiB, t=2; seguranca.ts:23) roda em cada login. Os 3 testes de api/autenticacao.test.ts:289-311 fazem 10 a 13 derivações cada, e o e-mail inexistente passa por gastarTempoDeSenha com o custo padrão.

Medi agora, numa execução isolada com a máquina carregada: 6,1 s, 9,2 s e 8,5 s. O limite do config do core é 30 s, mas a vitest pura usa 5 s, e um run que não lê modules/core/vitest.config.ts cai nisso (o seu "6 s" bate). Sob turbo em paralelo, também dá para chegar perto dos 30 s.

Merece ajuste:
- apoio-teste.ts com hash de parâmetros baratos (o PHC carrega os parâmetros, então verificarSenha fica barato sozinho);
- parâmetros da senha falsa injetáveis em criarAutenticacao (só nos testes; o padrão continua OWASP);
- um teste que confere que o padrão de produção é m=19456, t=2, p=1.

Estimo que os três caiam de ~24 s para menos de 1 s, o que tira o risco do timeout.

## 🟢 Sugestões
1. api/plano-rv.ts:136-141 — dois PUTs simultâneos com o mesmo id novo, ou com o mesmo mês de início, batem no PK ou no plano_rv_vigencia_uk e respondem 500. Sugestão: capturar 23505 e reler (mesmo id = idempotente) ou responder 422 RN-CORE-30 "Já existe um plano com esse mês de início".
2. api/plano-rv.ts:214 — com planos diferentes para vendedor e promotor, o plano_id do painel fica ambíguo. Vale um plano_id por pessoa, se a tela precisar mostrar.
3. domain/plano-rv.ts:87 e :95 — o "fim" da vigência usa o próximo plano de qualquer perfil, mas planoVigente filtra por perfil. Não achei caso errado, porque os meses fechados são contíguos. Mesmo assim, alinhe (filtre por perfil) ou explique no comentário.
4. O primeiro plano com início no passado vale para meses já fechados e já nasce não editável e não excluível (domain/plano-rv.test.ts:191). Sugiro uma confirmação na tela: "vai valer para meses já fechados e não poderá ser alterado". É com o designer-ux, se ele concordar.
5. Regra gatilho com peso_pct > 0 ou com faixas é gravada como veio. Normalize em normalizarPlano (peso 0, faixas []) para o jsonb e a auditoria não mostrarem um peso que não vale.

## Pendência que não é sua
O D-B25 já foi ajustado pelo testes (R-20261105-081459): aceita os dois estados e passa a exigir plano-rv.* quando a página entra. Não precisa de recado meu.