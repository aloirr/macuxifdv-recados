---
id: R-20261113-025203-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: alta
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T02:52:03-04:00
---
# v1.0.5 com tudo: BUILD PRONTO demo 16/11 10h e oficial 17/11 12h; plano, 8 prompts da nuvem, T-0168 v2 (trava pelo % exibido) e patch das regras do corretor

## Contexto
Pedido do gerente para a decisão do dono do produto "tudo na v1.0.5, mesmo que atrase o build" (R-20261112-210236). Arquivos:
- plano: `docs/desenho/v1.0.5-plano.md`;
- prompts da nuvem: `docs/desenho/v1.0.5-nuvem-prompts.md` (também abaixo);
- T-0168 v2: `docs/desenho/T-0168.md` e `.coord/contratos/modulos.md`;
- governança do corretor: `docs/desenho/gov-corretor-regras.diff`.

## Previsão
- **BUILD PRONTO demo** (Campo-Demo-v1.0.5 / Gestao-Demo-v1.0.5): **domingo 16/11, 10h de Manaus**. Faixa: de 15/11 22h a 17/11 10h.
- **BUILD PRONTO oficial** (APK de produção): **segunda 17/11, 12h**, depois do teste do dono do produto na demo. Cada rodada de correção soma 1 dia.
- **Marcos:**
  - M0, o commit do lote atual (T-0165 a T-0168 e T-0172, com a 0062 e a 0063): 13/11, 12h;
  - M1, o servidor da T-0170 vindo da nuvem: 14/11, 06h;
  - M2, tudo costurado no PC: 14/11, 22h;
  - M3, testes, corretor e revisão: 15/11, 20h.
- **O que empurra a data:** rodada de imagem com o dono do produto (Catálogo e marca v1 da T-0170), achado do corretor em aberto e o CI do stack isolado vermelho. Cada um custa de 3 a 8 h.

## Plano, em resumo
- **Tamanho:** 14 frentes, cerca de **256 h de agente**. Só a T-0170 tem 7 partes e 193 h.
- **Caminho crítico:** M0 → servidor da T-0170 na nuvem (N-D) → costura do Core no PC → Início e Perfil → testes no aparelho → corretor pelos prints → revisão → ensaio → build.
- **Gargalo:** o **modulo-core**. Por isso o domain, o servidor, o BKO e as telas novas da T-0170 vão para a nuvem, em arquivos novos, e o PC faz só a costura.
- **7 vagas:** a tabela da §4 do plano diz quem faz o quê.
  - Fixos: modulo-core, engenheiro-apps, designer-ux, modulo-vendedor, testes e corretor.
  - A 7ª vaga roda entre catálogo, gestor, banco-dados, integração e engenheiro-software.
  - O Gestor e o Core já começaram a T-0171 e os RD no PC.
- **Dado que ainda não existe** (§5 do plano):
  - km por dia e km por cliente mostram "—", sem ponto, até o rastreamento (T-0156) gravar. Não estimamos por linha reta;
  - raio: média só das visitas com distância; sem nenhuma, "—";
  - itens por pedido e metas de produtividade entram com tabela e campo novos; as metas têm o padrão do FDV.
- **Desenho da Performance:** as D1 a D7 não tiveram resposta e seguem a recomendação. A D1 (hoje conta como dia restante) muda a Meta/dia das imagens de R$ 8,7 k para R$ 8,0 k.
- **Proposta, fora do pedido:** o "tarefas cumpridas" na ficha do Gestor e o lembrete por push ficam para depois. Na v1.0.5 custam 3 h e não mudam a data.

## Nuvem: 8 frentes, só em arquivos novos
- **Abrir já:** N-A, N-B, N-C e N-G.
- **Depois do M0:** N-D e N-H.
- **Depois de N-A e N-B no main:** N-E e N-F.
- **Sem costura:** nenhuma frente mexe em `index.ts`, `manifest.ts` ou `sync.ts`.
- **Migrações:** só depois do M0, porque o `lerMigracoes` recusa buraco e a 0062 e a 0063 só existem no PC. Números reservados: 0064, 0065 e 0066 (o banco-dados confirma).
- **Travados durante a N-D:** `modules/core/db/nuvem.ts` e `docs/banco/core.md`.
- **Gerente:** marque os caminhos em "Travado pela nuvem" ao abrir cada frente e faça o merge dos 3 desenhos da T-0170 (item 3 do R-20261112-210236).

## T-0168 v2
- **Regra:** a trava compara o % que aparece na linha "Desconto (%)" dos Totais, em ‰ inteiro (`permilDoDescontoExibido`).
  - 8,04% aparece "8,0%" e não trava num limite de 8,0%; 8,05% aparece "8,1%" e trava.
  - A alçada continua pelo valor exato.
- **O que o código de hoje ainda faz de diferente:**
  - arredonda o valor nominal da alçada. Por causa do centavo da linha, a trava pode disparar com a tela mostrando 8,0%;
  - a frase sai com "do vendedor". A aprovada é "Pedido acima do desconto máximo (8,0%)".
- **Pedidos enviados:** ao modulo-vendedor (R-20261113-014646) e ao testes (R-20261113-014959).

## Governança do corretor
- **Patch:** `docs/desenho/gov-corretor-regras.diff`, feito com `git diff` contra o origin/main (4de7d2a3), numa worktree temporária fora do repositório.
- **O que muda:**
  - agente do corretor: seção A com "uma informação por linha de lista" e as 4 regras; passo 7 da rotina com o fluxo da imagem;
  - CLAUDE.md e doc 07: as duas regras.
- **Conferido:** `git apply --check` passa na árvore local. O gerente aplica pelo rito (commit com `Agente: alexandre`, citando o R-20261112-212507).

## Pendências
- **`verificar engenheiro-software`:** 1 violação que não é minha, `.vscode/settings.json`, novo e sem dono. Para o gerente.
- Sem commit, como pedido.

## Prompts da nuvem (texto de `docs/desenho/v1.0.5-nuvem-prompts.md`)

### N-A — Performance: domain e contratos (agora)

```text
Você é o agente modulo-core do Macuxi FDV, numa sessão da nuvem. Leia o CLAUDE.md e siga as regras inegociáveis.

Tarefa: T-0170, parte "Performance" (Resultados e Produtividade). Desenho: docs/desenho/performance-produtividade.md
(D1 a D7: siga as recomendações). Regras: RN-CORE-20/21/22/26 do doc 03 e as RN propostas no §8 do desenho.

Branch: nuvem/T-0170-performance-dominio, a partir do main. Commits "T-0170: ..." com o trailer "Agente: modulo-core".

Caminhos exclusivos (só arquivos NOVOS):
- modules/core/contracts/performance.ts (os contratos do §7.4);
- modules/core/domain/performance/** (calendarioDoPeriodo, resultadosDoPeriodo, produtividadeDoPeriodo, almocoDoDia,
  metaProdutividadeVigente, validarMetaProdutividade e metrosDoTrajeto) e os testes *.test.ts ao lado.

Critérios:
1. Funções puras, teste antes, cada teste citando a RN (RN-CORE-41..46 do desenho) e cada caso de borda da §3.4.
2. Dinheiro em centavos, datas UTC, minutos e pontos-base em inteiros, como na §1.5. Fuso do tenant por parâmetro.
3. Km: sem resumo de km, km_dia e km_cliente saem "sem_dado". Sem estimativa por linha reta.
4. Raio: média só das visitas com distancia_m; sem nenhuma, "sem_dado".
5. Exemplo conferível da §2.2 dá os números do desenho.
6. pnpm --filter @macuxi/core lint, typecheck e test verdes.

Não tocar fora disso: nada de index.ts (contracts, domain, api, app, web), manifest.ts, sync.ts, db/, apps/, packages/,
nem arquivo que já existe. Quem usar as funções importa pelo caminho relativo; a costura é feita no PC depois.
Sem dependência nova. Recados pelo node scripts/coord.mjs (token MACUXI_RECADOS_TOKEN): ao terminar, mande entrega
ao gerente-projetos com cópia ao engenheiro-software, com os arquivos, os testes e o que ficou para a costura.
```

### N-B — Tarefas, frase do dia e avatar: domain e contratos (agora)

```text
Você é o agente modulo-core do Macuxi FDV, numa sessão da nuvem. Leia o CLAUDE.md e siga as regras inegociáveis.

Tarefa: T-0170, partes "Recados e tarefas", "Frase do dia" e "Foto ou avatar". Desenhos aprovados:
docs/desenho/tarefas-consultor.md (D1 a D7 aprovadas) e docs/desenho/inicio-frase-avatar-pedidos.md (D1 a D6 aprovadas).
As 30 frases padrão estão em recados/anexos/2026-11-12-T0170-final-frases-padrao.md, no repositório aloirr/macuxifdv-recados.

Branch: nuvem/T-0170-tarefas-frase-avatar-dominio, a partir do main. Commits "T-0170: ..." com o trailer "Agente: modulo-core".

Caminhos exclusivos (só arquivos NOVOS):
- modules/core/contracts/tarefa.ts, modules/core/contracts/frases.ts e modules/core/contracts/avatar.ts (§4.1 e §2.1–2.2);
- modules/core/domain/tarefas/** (expandir destinatários, situação e atraso, montarRecadosETarefas, tipoPermitidoParaPerfil);
- modules/core/domain/frase-avatar/** (fraseDoDia, validarFrase, aplicarTrocaAvatar, duDoMes e as 30 frases padrão P01..P30
  como constante); testes *.test.ts ao lado.

Critérios:
1. Funções puras, teste antes, citando as RN propostas nos desenhos (RN-CORE-41, 42, 43 e as RN das tarefas, §8).
2. Rodízio igual para todo o tenant no dia, no fuso do tenant; sem frase ativa, nada.
3. Feriados nacionais contam no DU (D3 aprovada); use os de @macuxi/comum.
4. Troca do avatar: a última vence pelo alterado_em; o vendedor só a própria; padrão = iniciais.
5. Tarefa: equipe do dia da criação (D2), cada um faz a sua (D3), desmarcar só antes de sincronizar (D4), foto sem check-in (D5).
6. O tipo da notificação do aviso de tarefa não muda (APK antigo lê como "Aviso do sistema"): teste de contrato.
7. pnpm --filter @macuxi/core lint, typecheck e test verdes.

Não tocar fora disso: nada de index.ts, manifest.ts, sync.ts, notificacao.ts nem outro arquivo que já existe; nada em db/,
apps/ ou packages/. A costura é feita no PC. Sem dependência nova. Ao terminar, mande entrega ao gerente-projetos com
cópia ao engenheiro-software (node scripts/coord.mjs, token MACUXI_RECADOS_TOKEN).
```

### N-C — Cards de Pedidos: domain (agora)

```text
Você é o agente modulo-vendedor do Macuxi FDV, numa sessão da nuvem. Leia o CLAUDE.md e siga as regras inegociáveis.

Tarefa: T-0170, parte "Pedidos com 3 cards". Desenho: docs/desenho/inicio-frase-avatar-pedidos.md §4 (RN-VEN-43), com as
decisões aprovadas D5 (período pela data de emissão) e D6 (os cards também no Gestão, somando a equipe ou o vendedor filtrado).

Branch: nuvem/T-0170-pedidos-cards-dominio, a partir do main. Commits "T-0170: ..." com o trailer "Agente: modulo-vendedor".

Caminhos exclusivos (só arquivos NOVOS): modules/vendedor/domain/resumo-pedidos.ts e modules/vendedor/domain/resumo-pedidos.test.ts.

Critérios:
1. Função pura, teste antes, citando RN-VEN-43: orçamentos em aberto (quantidade e valor), pedidos enviados (quantidade e
   valor) e o total. Enviado = chegou ao servidor e não foi recusado nem cancelado. Orçamento em aberto = não convertido e
   não cancelado. Valor = total_cents, sem frete. Período pela data de emissão no fuso do tenant.
2. Filtro opcional por vendedor (para o Gestão).
3. O caso do mock do desenho (R$ 2.446,00) bate.
4. pnpm --filter @macuxi/vendedor lint, typecheck e test verdes.

Não tocar fora disso: nada de domain/index.ts, app/, api/, web/, contracts/, manifest.ts nem arquivo existente. A tela e a
rota são do modulo-vendedor no PC. Ao terminar, mande entrega ao gerente-projetos com cópia ao engenheiro-software.
```

### N-G — Roteiro e testes de valor × regra da Performance (agora; os testes depois de N-A)

```text
Você é o agente testes do Macuxi FDV, numa sessão da nuvem. Leia o CLAUDE.md e siga as regras inegociáveis.

Tarefa: T-0170, Performance. Desenho: docs/desenho/performance-produtividade.md (§2, §3, §6 e os critérios do §10).

Branch: nuvem/T-0170-testes-performance, a partir do main. Commits "T-0170: ..." com o trailer "Agente: testes".

Caminhos exclusivos (só arquivos NOVOS):
- docs/testes/T-0170-performance.md: roteiro com um mês sintético (novembro de 2026, segunda a sexta, feriados nacionais
  02/11 e 20/11) e o resultado esperado de cada um dos 16 indicadores, calculado à mão a partir das fórmulas do desenho;
  inclua hoje no meio do mês, virada do dia sem sinal, dia sem almoço, visita fechada pela virada, cliente sem coordenada e
  km sem rastreamento ("—");
- tests/modulos/core-performance-*.test.ts: os mesmos casos contra as funções de modules/core/domain/performance/**
  (só depois que a N-A estiver no main; antes disso, entregue o roteiro).

Critérios:
1. Cada indicador com valor esperado, a fórmula e a RN.
2. Os testes rodam no pnpm test da raiz e passam contra a N-A. Divergência entre o esperado e a função vai por recado ao
   modulo-core, com o caso; não corrija o domain.
3. typecheck:tests limpo.

Não tocar fora disso: nada em modules/, apps/, packages/ nem docs de outros. Ao terminar, mande entrega ao gerente-projetos
com cópia ao engenheiro-software e ao modulo-core.
```

### N-D — Servidor da T-0170: migrações, Drizzle, rotas e provedores do sync (depois de M0, N-A e N-B no main)

```text
Você faz duas partes, nesta ordem: primeiro como banco-dados, depois como modulo-core, numa sessão da nuvem do Macuxi FDV.
Leia o CLAUDE.md e siga as regras inegociáveis (toda tabela com id, tenant_id, created_at, updated_at, deleted_at,
external_id e RLS enable + force).

Tarefa: T-0170, servidor das tarefas, da frase do dia, do avatar e da Performance. Desenhos: docs/desenho/tarefas-consultor.md
§3 a §6, docs/desenho/inicio-frase-avatar-pedidos.md §1 e §2, docs/desenho/performance-produtividade.md §5, §6 e §7.
Contratos e domain já estão no main (N-A e N-B): use-os pelo caminho relativo.

Branch: nuvem/T-0170-core-servidor, a partir do main com o commit do lote (as migrações 0062 e 0063 têm de estar lá).
Commits por parte: "T-0170: ..." com "Agente: banco-dados" e, depois, com "Agente: modulo-core".

Caminhos exclusivos:
- banco-dados (NOVOS): db/migrations/0064_core_tarefa.{up,down}.sql, 0065_core_frase_avatar.{up,down}.sql e
  0066_core_meta_produtividade.{up,down}.sql (meta_produtividade, deslocamento_dia vazio e itens_por_pedido no CHECK de
  core.meta.indicador); db/testes/t0170-*.db.test.ts;
- banco-dados (TRAVADOS pela nuvem durante a frente): modules/core/db/nuvem.ts (espelho Drizzle) e docs/banco/core.md;
- modulo-core (NOVOS): modules/core/api/tarefas.ts, frases.ts, avatar.ts, performance.ts e metas-produtividade.ts, os
  provedores de sync em modules/core/api/sync-t0170.ts (funções exportadas, sem registrar) e os testes ao lado.

Critérios:
1. Migrações aditivas com up e down; as 30 frases padrão carregadas nos tenants existentes e no provisionar_tenant,
   de forma idempotente; RLS testado entre dois tenants; únicos vivos com deleted_at.
2. drizzle-x-banco.test.ts e estatico.test.ts verdes. Os testes de banco rodam no CI (stack-isolado.yml), nunca com Docker local.
3. Rotas /v1/core/... validadas por Zod; toda rota checa perfil, escopo de carteira e licença do Core; erro de negócio
   422 com o código da RN; escrita idempotente pelo id gerado no aparelho; log pino sem dado pessoal.
4. pnpm --filter @macuxi/core e pnpm --filter @macuxi/db: lint, typecheck e test verdes.

Não tocar fora disso: nada de api/index.ts, sync.ts, manifest.ts, contracts/index.ts, seeds (db/seeds), SQLite do aparelho
nem arquivo existente fora dos dois travados. O registro das rotas, das entidades de sync, a seed da demo e o SQLite são
do PC, na costura. Ao terminar cada parte, mande entrega ao gerente-projetos com cópia ao engenheiro-software, com a lista
do que a costura precisa registrar.
```

### N-E — BKO: Tarefas, Frases do dia, Metas de produtividade e Calendário (depois de N-A e N-B no main)

```text
Você é o agente modulo-core do Macuxi FDV, numa sessão da nuvem. Leia o CLAUDE.md e siga as regras inegociáveis.

Tarefa: T-0170, páginas do BKO. Desenhos: docs/desenho/tarefas-consultor.md §7.1, docs/desenho/inicio-frase-avatar-pedidos.md
(Parâmetros › Início, frases) e docs/desenho/performance-produtividade.md §6.5 (Metas e RV › Produtividade e Parâmetros ›
Calendário). Visual: marca v1 (docs/marca/manual.md) com os componentes do kit web que já existem em @macuxi/ui.
Textos: só o que o usuário usa para agir (CLAUDE.md, definição de pronto).

Branch: nuvem/T-0170-bko, a partir do main. Commits "T-0170: ..." com o trailer "Agente: modulo-core".

Caminhos exclusivos (só pastas NOVAS): modules/core/web/components/tarefas/**, modules/core/web/components/frases-do-dia/**,
modules/core/web/components/metas-produtividade/** e modules/core/web/components/calendario/**, com os testes ao lado.

Critérios:
1. Cada página como componente exportado, com as chamadas à API pelos contratos de N-A e N-B (as rotas chegam em N-D).
2. Tarefas: lista com filtros, nova tarefa (Pessoas, Equipe ou Todos), detalhe por consultor, cancelar com motivo.
3. Frases: as 30 padrão, adicionar, editar, desativar, reordenar e remover; "Frase de hoje" depois de salvar.
4. Metas de produtividade: por tenant, equipe ou usuário, com "voltar a herdar"; erro 422 no campo.
5. Testes de componente com a API simulada; pnpm --filter @macuxi/core lint, typecheck e test verdes.

Não tocar fora disso: nada de web/index.ts, manifest.ts (menus), contracts/index.ts, componentes que já existem (inclusive
usuarios/, que a T-0168 está mexendo no PC) nem packages/ui. A ligação no menu é feita no PC. O print vai ao corretor e ao
design-de-marca depois da costura. Ao terminar, mande entrega ao gerente-projetos com cópia ao engenheiro-software e ao
designer-ux.
```

### N-F — Telas do app: Performance e Recados e tarefas (depois de N-A e N-B no main)

```text
Você é o agente modulo-core do Macuxi FDV, numa sessão da nuvem. Leia o CLAUDE.md e siga as regras inegociáveis.

Tarefa: T-0170, telas do app Campo. Imagens aprovadas no repositório aloirr/macuxifdv-recados, em recados/anexos/:
2026-11-12-T0170-final-performance-resultados.png, -performance-produtividade.png, -performance-periodo.png,
-recados-e-tarefas.png e -inicio-sino-aberto.png. O app sai na marca v1 (azul noite #1E3350, fundo Pérola #F8F6F1;
docs/marca/manual.md): use os tokens e componentes de @macuxi/ui, sem cor crua. Desenhos: performance-produtividade.md
§2, §3 e §7 e tarefas-consultor.md §7.2. Filtro de período: docs/design/pedidos-filtro-periodo.md (BotaoFiltro e FolhaPeriodo).

Branch: nuvem/T-0170-telas-app, a partir do main. Commits "T-0170: ..." com o trailer "Agente: modulo-core".

Caminhos exclusivos (só pastas NOVAS): modules/core/app/telas/performance/** e modules/core/app/telas/recados-e-tarefas/**
(lista com Todos, Recados e Tarefas; detalhe da tarefa; a lista do balão do sino como componente), com os testes ao lado.

Critérios:
1. Offline: as telas leem os dados locais pelas funções de N-A e N-B; fora da janela do aparelho, o sinal de "precisa de
   internet", como em Pedidos.
2. Performance: segmentado Resultados ou Produtividade; Resultados com real/meta, barra e %, Gap, Meta/dia e Real/dia;
   Produtividade com os 12 indicadores, meta e ponto verde ou laranja; km e raio sem dado = "—" sem ponto.
3. Recados e tarefas: a linha do recado sem o chip "Não lida" e sem "Leitura não enviada" (RD-0211); a tarefa com caixa,
   prazo e origem; uma tag por linha e a linha de baixo com um único fato.
4. Testes da lógica de tela; pnpm --filter @macuxi/core lint, typecheck e test verdes.

Não tocar fora disso: nada de app/index.ts, rotas do shell, apps/mobile, packages/ui, notificacoes.tsx nem outro arquivo
existente. A aba na barra, o sino e a rota são do engenheiro-apps e do modulo-core no PC. Ao terminar, mande entrega ao
gerente-projetos com cópia ao engenheiro-software, ao engenheiro-apps e ao designer-ux.
```

### N-H — RD de Pesquisa e Treinamento e as consultas da tarefa de pesquisa (depois de M0)

```text
Você faz duas partes numa sessão da nuvem do Macuxi FDV: como modulo-pesquisa e como modulo-treinamento. Leia o CLAUDE.md
e siga as regras inegociáveis.

Tarefas: T-0171 (listas do corretor, docs/qualidade/redundancias/2026-11-12-T-0171-listas.md: RD-0212 e RD-0213, aprovados
pelo Alexandre em R-20261112-210236) e T-0170 (consultas da tarefa de pesquisa, docs/desenho/tarefas-consultor.md §4.3).

Branch: nuvem/T-0171-rd-pesquisa-treinamento, a partir do main com o commit do lote. Commits por parte, com
"Agente: modulo-pesquisa" e "Agente: modulo-treinamento".

Caminhos exclusivos:
- modulo-pesquisa: modules/pesquisa/app/screens/pesquisas-screen.tsx (RD-0212) e, NOVOS, as consultas
  pesquisa.questionarios_para_tarefa@1 (API) e pesquisa.resposta_local@1 (aparelho) em arquivos próprios, com testes;
- modulo-treinamento: modules/treinamento/app/screens/treinar-screen.tsx e trilha-screen.tsx (RD-0213).

Critérios:
1. RD-0212: disponível = título + "N perguntas"; respondida = título + "Volta em dd/mm"; sem as tags que repetem o título da seção.
2. RD-0213: o prazo na tag ("Atrasada há 3 dias", "Vence amanhã"), a linha "3 de 5 lições", sem "Abra a trilha para ver o que falta.".
3. As consultas com Zod, licença da Pesquisa checada e o mesmo domain nos dois canais.
4. lint, typecheck e test verdes nos dois pacotes.

Não tocar fora disso: nada de manifest.ts (o registro das consultas e o espelho do manifesto são feitos no PC),
modules/pesquisa/app/lib/formulario.ts, responder-screen.tsx nem outro arquivo existente. Ao terminar cada parte, mande
entrega ao gerente-projetos com cópia ao corretor-redundancias e ao engenheiro-software.
```
