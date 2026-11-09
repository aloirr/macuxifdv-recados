---
id: R-20261105-093633-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0075
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T09:36:33-04:00
---
# Lote I revisado (🔴 só CI vermelho por expectativa de teste; desenho aprovado) e suíte do DBaaS sem npm na VM (imagem macuxi-api-teste:<sha> montada pelo dbaas-teste)

## Contexto
T-0075 e T-0039. Pedido do gerente com duas partes: (1) revisão final do lote I do banco-dados (verificacao/lote-i, bfc0cc8; R-20261105-090900); (2) a suíte de banco na VM sem npm para a 3ª execução do DBaaS. A execução automática do run 42034633355 avisou que a VM não alcança o registry.npmjs.org:443.

## O que fiz
**1. Revisão do lote I** (R-20261105-093536, para o banco-dados, com cópia a você)
- **🔴 único: o CI vermelho no run 42034653138**, job core-db-api-mock.
  - Falham 5 testes "up/down com dados": notificacao-subtipo, positivacao-mes, recado-do-dia, nota-erp-vendedor e visita-etapa-pendente.
  - A causa é a mesma nos 5. O catálogo comparado agora tem a política `manutencao` da 0031, que o teste não esperava. É expectativa de teste, não desenho.
  - Pelo guardião, os 5 arquivos estão sendo mexidos agora: o banco-dados provavelmente já está corrigindo.
- **🟡**: nenhum.
- **🟢 nos 5 pontos que você pediu:**
  - app e worker nunca herdam nem assumem o manutencao: a trava MEMBER na 0031, a conformidade com MEMBER/USAGE/SET e o S0-028;
  - a política `using(true)` é `to macuxi_manutencao` e o papel não tem grant de tabela;
  - o down da 0032 é idêntico ao corpo da 0024 (conferi com diff);
  - a ordem de FK falha fechada (23503 ou 55000);
  - o deploy da demo roda com o postgres superusuário (filiação inócua), e o --recriar pela função está coberto pelo seed-demo.test.ts.
- **Sugestões 🟢** (quebra de ciclo só em FK do ciclo, MATCH FULL, índice de FK, trava para qualquer papel LOGIN, lock_timeout para produção): o detalhe está no recado.

**Do meu lado, o lote I pode subir ao main assim que o CI do ramo ficar verde.**

**2. Suíte na VM sem npm (T-0075)**
- `apps/api/Dockerfile` ganhou o alvo `teste-db`:
  - é a imagem da API mais o Vitest do pnpm-lock, instalado à parte em /opt/macuxi-vitest (`pnpm install --frozen-lockfile --filter @macuxi/db`) e ligado em /app/node_modules/vitest;
  - a `final` continua sendo o último estágio, então o demo-publicar e o stack-isolado montam a mesma imagem de antes, sem mudança de camadas.
- `.github/workflows/dbaas-teste.yml` ganhou o job `imagem`:
  - monta o alvo e publica `ghcr.io/<dono>/macuxi-api-teste:<sha>`, só com a tag do commit, nunca main;
  - o `packages: write` vale só nesse job;
  - o job `teste` passa a usar essa imagem;
  - o aviso do npm só aparece se alguém informar `imagem_tag` (a macuxi-api do demo-publicar, sem Vitest);
  - no fim, a imagem de teste é apagada da VM.
- O script do banco-dados não muda: o `instalarVitest` acha /app/node_modules/vitest e não chama o npm.
- A senha continua só no stdin, fora de log e de disco: o build não recebe nenhum secret.
- **Não precisa liberar a saída HTTPS da VM no console da Magalu.**
- ADR 0024, seção "Como o teste roda": um parágrafo novo.

## Arquivos
- apps/api/Dockerfile
- .github/workflows/dbaas-teste.yml (autorizado pelo Alexandre para a T-0075; **o commit leva o trailer dele**)
- docs/decisoes/0024-dbaas-magalu-postgres-producao.md

## Testes
- Sem Docker e sem install no PC, então nada foi montado aqui.
- O YAML do workflow foi conferido com o parser `yaml`: jobs, needs e if conferem.
- `verificar engenheiro-software`: OK.
- O critério é o próprio run do dbaas-teste: o job `imagem` verde e o C3.3 com "vitest 3.2.x" sem npm.

## Ordem para a 3ª execução
1. CI do lote I verde e lote I no main.
2. Esta mudança no main, no mesmo push ou depois.
3. Actions → "DBaaS — teste de compatibilidade (T-0075)" → Run workflow, com `imagem_tag` vazio.

Não depende mais da imagem nova da demo: a imagem de teste sai do mesmo commit. Um push num verificacao/** que mude este workflow ou o db/dbaas também dispara, desde que a instância esteja viva.

## Pendências e premissas
- **Premissa:** o GITHUB_TOKEN cria o pacote novo macuxi-api-teste ligado ao repositório pela label `org.opencontainers.image.source`, como já cria macuxi-api e macuxi-bko. Se o 1º push der 403, o Alexandre libera em GitHub → Packages → macuxi-api-teste → Manage Actions access → adicionar o repositório macuxifdv com Write.
- **Premissa:** o hoisted coloca o Vitest em /opt/macuxi-vitest/node_modules ou em db/node_modules. O build confere os dois e roda `vitest --version`; se não achar, falha no runner, antes da VM.
- As tags `macuxi-api-teste:<sha>` ficam no GHCR, uma por run. A limpeza é manual e opcional, porque o pacote é privado e pequeno.
- Recados antigos da caixa: não tratei nesta rodada, só o escopo pedido.
