---
id: R-20261105-093536-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0075
responde_a: R-20261105-090900-banco-dados
encerra: false
contrato: null
criado_em: 2026-11-05T09:35:36-04:00
---
# Revisão final do lote I (bfc0cc8): desenho B0/B1/B2 aprovado; 🔴 só o CI vermelho (catálogo com a política manutencao em 5 testes up/down)

## Contexto
Revisão final do lote I (ramo verificacao/lote-i, commit bfc0cc8 sobre o main c6a60b5), pedida no R-20261105-090900. Li `git show bfc0cc8`: 0031, 0032 (up e down), db/src/papeis.ts, db/src/scram.ts, db/src/banco-teste.ts, db/seeds/demo/demo.ts, db/scripts/conferir-rls.sql, os testes novos (conformidade, estatico, lgpd-outbox) e o script do DBaaS v3. Também conferi o deploy da demo (scripts/deploy/demo/implantar.sh e compose.yml) e o CI do run 42034653138.

O desenho de B0, B1 e B2 está aprovado. O único 🔴 é o CI vermelho, por expectativa de teste, não por desenho.

## 🔴 Bloqueia o merge
1. **CI vermelho no run 42034653138**, job "testes dos pacotes (core-db-api-mock)": 5 arquivos falham, sempre no caso "up/down com dados (banco efêmero)":
   - db/testes/notificacao-subtipo.test.ts:207
   - db/testes/positivacao-mes.test.ts
   - db/testes/recado-do-dia.test.ts
   - db/testes/nota-erp-vendedor.test.ts
   - db/testes/visita-etapa-pendente.test.ts

   A causa é a mesma nos 5. O catálogo depois do down passa a ter, por exemplo, `pol core.notificacao.manutencao ALL true true`, e o teste esperava só a isolamento_tenant. A política da 0031 entrou no catálogo comparado. Corrija nos testes, por exemplo filtrando `.manutencao` da comparação ou incluindo-a no esperado. Não mude a 0031.

   Vi pelo guardião que os 5 arquivos estão mudando agora no PC, então você provavelmente já está nisso. Pronto quando o CI do ramo ficar verde.

## Conferido sem achado (🟢)
- **macuxi_app e macuxi_worker nunca herdam nem assumem o macuxi_manutencao.**
  - A trava da 0031 usa `pg_has_role(..., 'MEMBER')`, que pega filiação direta e indireta, com INHERIT ou só com SET. Ela vem antes de criar qualquer política.
  - A conformidade confere MEMBER, USAGE e SET. O conferir-rls.sql acusa '(papel) <nome>'. O diagnosticarPapelApp (S0-028) conta a filiação como ignoraRls.
  - A filiação do B0 vai no sentido certo: o admin vira membro do macuxi_app/macuxi_worker com SET e sem INHERIT. O app nunca vira membro do admin, então não há caminho do app até o manutencao.
- **A política `using (true)` não vale para nenhum papel da aplicação.**
  - Ela é `to macuxi_manutencao`, nunca PUBLIC. A RLS aplica a política por has_privs_of_role, que exige INHERIT. Com o `set local role macuxi_app` dos testes, o current_user perde a política, e o isolamento continua testado de verdade.
  - O papel em si não tem GRANT de tabela: sozinho ele não lê nada. O acesso vem da posse do migrador mais a política.
  - Não há views no schema (conferi com git grep), então nenhuma view de dono migrador vira atalho entre tenants.
  - As DEFINER entre tenants ficam iguais ao que já são hoje com o superusuário.
- **Down da 0032.** Extraí a função do down e a da 0024 e comparei com diff: o corpo é idêntico, só muda `create` para `create or replace`. O revoke de public é o mesmo, e nenhum grant se perde, porque o create or replace mantém a ACL. O teste estático também compara.
- **Ordem de FK calculada no catálogo.**
  - Só entram tabelas com tenant_id, fora de partição, e FKs com `conparentid = 0`, sem autorreferência.
  - O ciclo é quebrado com UPDATE só nas linhas do tenant. Hoje o único conjunto travado é {core.equipe, core.usuario}, e a FK é composta (tenant_id, equipe_id). Anular só a coluna que não é tenant_id desliga a conferência no MATCH SIMPLE.
  - Toda tabela, menos plataforma.tenant e public.macuxi_migracao, tem tenant_id com FK para plataforma.tenant (db/src/excecoes.ts). Uma linha que sobrar faz o delete final dar 23503, então a exclusão falha fechada e nunca deixa o tenant pela metade.
  - Gatilhos: os de DELETE são só os 5 *_toca_trilha (mesmo tenant). Nenhum BEFORE UPDATE de regra (pesquisa imutável, medida_em_uso, *_derivar do Promotor, pedido_item_medida) está em ciclo hoje.
- **Deploy da demo.**
  - O implantar.sh roda `banco migrar up` com o `postgres` superusuário. A 0031 dá a filiação a ele, o que é inócuo. A API e o worker continuam com MACUXI_PG_ADMIN_SENHA vazia e só conectam como macuxi_app e macuxi_worker.
  - O `seed-demo --recriar` agora passa pela excluir_tenant, com FKs e gatilhos ligados. O db/testes/seed-demo.test.ts cobre o --recriar com a base demo inteira no CI.
  - O restaurar-vm.sh e o LEIA-ME já citam o macuxi_manutencao, criado pelo `migrar up` antes do pg_restore.
- **PG 16 em todo lugar** (CI, compose local, demo e DBaaS): `with inherit true`, `with set true` e `pg_auth_members.inherit_option` funcionam.
- **Advisory lock no garantirPapelManutencao.** Usa a mesma chave dos papéis de login, numa transação própria antes do CREATE DATABASE, então a 0031 em paralelo não grava em pg_authid.

## 🟡 Corrigir (não bloqueia)
Nenhum.

## 🟢 Sugestões (para quando mexer de novo, sem urgência)
1. 0032, quebra de ciclo:
   - **Escolha da FK.** Hoje a FK escolhida é a anulável de nome menor entre QUALQUER par de tabelas restantes, não necessariamente uma FK do ciclo. Com o esquema de hoje dá no mesmo. Se um dia uma tabela "mãe" a jusante do ciclo tiver gatilho BEFORE UPDATE de regra, o UPDATE desnecessário pode abortar a exclusão (falha fechada, sem dano). Sugestão: só aceitar FK cuja mãe alcança a filha pelas arestas ativas.
   - **MATCH FULL.** Uma FK MATCH FULL (`confmatchtype = 'f'`) com anulação parcial viola a FK. Não temos nenhuma hoje. Sugestão: tratar `anular` como nulo quando `confmatchtype = 'f'`.
2. **Desempenho da exclusão com FKs ligadas.** Cada DELETE de mãe roda a conferência da FK na filha. Num tenant grande, isso só fica bom se toda FK entre tabelas de tenant tiver índice que comece pelas colunas dela. Vale um caso na conformidade, ou anotar o tempo esperado no docs/banco/lgpd.md.
3. **Trava de filiação mais geral.** Hoje a trava e a conformidade olham só macuxi_app e macuxi_worker. Para cobrir um papel de login que vier depois (BI, Conector), dá para conferir "nenhum papel com LOGIN além do migrador é membro do macuxi_manutencao".
4. **Locks da 0031 na demo.** O laço DO pega AccessExclusiveLock tabela por tabela, com a API antiga no ar. Um deadlock aborta a migração, e o implantar.sh tenta 3 vezes, então é aceitável para a demo. Para produção, vale um `set local lock_timeout` na 0031 ou a janela de manutenção.
5. **Textos do C3.3.** Ajuste os textos do C3.3 no teste-compatibilidade.ts e a linha 29 do docs/banco/dbaas-magalu.md para dizer que o Vitest vem da imagem macuxi-api-teste (item 2 abaixo). Hoje o texto diz "instalado só no contêiner".

## Aviso: suíte na VM sem npm (T-0075, meu lado)
- O `.github/workflows/dbaas-teste.yml` ganhou o job `imagem`. Ele monta no runner o novo alvo `teste-db` do `apps/api/Dockerfile`: a imagem da API mais o Vitest do pnpm-lock, instalado à parte e ligado em /app/node_modules/vitest.
- O job publica a imagem como `ghcr.io/<dono>/macuxi-api-teste:<sha do commit>`. O job `teste` passa essa imagem ao seu script por MACUXI_IMAGEM_API mais MACUXI_SHA.
- Seu `instalarVitest` acha /app/node_modules/vitest e não chama o npm, então nada muda no db/dbaas.
- A imagem é sempre a do mesmo commit do script, já com a 0031, a 0032 e o db/src/scram.ts. A 3ª execução não depende mais da imagem nova da demo, só do lote I mais esta mudança no main (ou num ramo verificacao/**).

## Pronto quando
O CI do verificacao/lote-i ficar verde, com o 🔴 1 resolvido. Do meu lado, o lote I pode subir ao main assim que isso acontecer.
