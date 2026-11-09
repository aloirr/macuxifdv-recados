---
id: R-20261106-060012-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0086
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T06:00:12-04:00
---
# Status das 6h (06/11): T-0084/T-0085 e o portal no main; produção pronta para ligar com 2 oks seus

## Contexto
Status das 6h de 06/11. Mostra o que subiu desde as 2h, o que falta e se a produção está pronta para ligar às 8h. O próximo marco é quando você avisar que criou os recursos.

## Subiu ao main desde as 2h
**Lote das 6h, às 3h26** (4effc7c), com CI e stack isolado verdes e revisões sem 🔴. A demo foi publicada às 3h39, com as migrações 0034 e 0035 aplicadas na VM.
- **Seguimento das fatias A e B:**
  - o seletor do Novo pedido usa a busca do Catálogo, com o "Serve em";
  - as marcas vêm do Promotor pela `promotor.concorrentes@1`, com o nome guardado na referência;
  - a exportação já tem rota para o PR #96.
- **Correção do contrato do Hub:** a aplicação, as referências e o oferece junto vindos do ERP eram descartados antes de chegar ao Catálogo, e esse defeito estava no main desde as fatias A e B. Agora eles chegam, com o corte e o aviso no monitor. Isso fecha o critério 2 da T-0084.
- **Portal T-0087:**
  - login do super-admin com 2º fator;
  - passo Empresa;
  - cartões das bases na ordem do Hub, com conferir sem gravar, erros por linha, "Baixar erros" e a carga em partes;
  - aba Integração;
  - auditoria;
  - migração 0035.

  Teve 2 🔴 de segurança, corrigidos e conferidos antes do push: o domínio importava criptografia, e era possível testar senhas com a conta bloqueada.
- **Produção, sem os workflows:**
  - perfis do APK de produção;
  - BKO aceitando bko. e config.;
  - scripts de backup e de ensaio de restauração.

## Também subiu, às 5h50 (lote E2, 1ed7d51, com CI e stack isolado verdes)
- **T-0084, busca offline no Novo pedido** (critério 3): "pastilha uno 2012" acha sem rede. O SDK liberou a leitura do Core no aparelho.
- **T-0084, critério 3 (🔴 achado nos testes):** numa aplicação com vários veículos, o ano casava com a faixa de outro veículo do mesmo texto. Na demo, "pastilha uno 2015" trazia o Uno 2010–2014 por causa do "Palio 2012–2016". Corrigido e conferido pelo engenheiro e pelo testes.
- **T-0084, critério 7:** a aplicação do item vai no pedido enviado ao ERP.
- **T-0085:** a exportação traz o nome da marca mesmo num tenant sem o Promotor.
- **T-0087, Equipe por CSV com convite** (fatia E, que eu tinha cortado para a tarde e voltou com folga de agentes):
  - migração 0036;
  - importação idempotente;
  - convite de uso único por link, sem e-mail;
  - página de aceitar o convite no BKO.

  Já corrigido: 1 🔴 de segurança, porque um link antigo trocava a senha definida pelo admin. Também corrigido: 1 🔴 de UX, porque os links mostrados uma vez se perdiam ao navegar. O designer conferiu os dois.
- **Testes:** os critérios das T-0084 e T-0085 que não dependem do APK estão validados por teste (matrizes em `docs/testes/`).

## Produção (T-0086): pronta para ligar, com 2 condições suas
O roteiro está em `docs/status/producao.md`.
- **O que já está no main:**
  - compose de produção sem Postgres local;
  - workflow "producao — publicar", só por tag e com a sua aprovação;
  - migrações contra o DBaaS sem superusuário (plano B);
  - alerta instalado pelo deploy;
  - perfis EAS `campo-producao` e `gestao-producao`;
  - scripts de backup diário e de ensaio de restauração;
  - portal `config.`.
- **Condição 1, os 3 workflows de produção** (`producao-tenant.yml`, `producao-ensaio-restauracao.yml` e o job `stack-producao`):
  - todos verdes no ramo `verificacao/lote-86c`;
  - sem o seu ok, o tenant de teste sai pelo portal (passo Empresa) e o ensaio de restauração fica manual.
- **Condição 2, a mudança do `producao-publicar.yml`:**
  - o workflow passa a ler `PROD_SUPERADMIN_CONVITE`;
  - sem ela, você não faz o 1º acesso ao portal na produção;
  - nesse caso, o tenant de teste só sai pelo workflow do item 1.

  **Preciso do ok em pelo menos uma das duas**, para haver tenant de teste até as 12h.
- **Às 8h:**
  1. crie os recursos;
  2. preencha os secrets da tabela do roteiro, incluindo `PROD_SUPERADMIN_CONVITE`;
  3. me avise.

  Em seguida eu faço três coisas:
  - a tag, que você aprova;
  - a conferência de api., bko. e config.;
  - o tenant de teste com um vendedor e um supervisor, para o APK.

  Os builds EAS de produção saem do commit da tag.

## Preciso de você
1. O ok nas condições 1 e 2 acima.
2. **ADR 0029 (super-admin):** aceitar ou corrigir. O texto já diz que a credencial do banco da aplicação abre sessão pelas funções, e que tudo fica auditado.
3. **Nuvem:**
   - **#99 (N2):** conflita com o #98, e os passos estão no PR.
   - **#97 (N1):** ainda sem a marca de pronto.
   - **#96 (C) e #95 (D):** já podem atualizar o branch, e os comentários estão nos PRs.
4. **Patch do trailer** no `scripts/coord.mjs`.
5. **URL de download do Conector:** o portal mostra "em breve" até haver um endereço.

## Cortes e riscos
1. **Desempenho da busca no Novo pedido com mais de 500 produtos:** sem a pré-seleção FTS5 no aparelho, o fim do ranking difere da aba e a consulta fica lenta. O critério 5 da T-0084 pede p95 < 300 ms com 20 mil produtos e ainda não foi medido no APK. O engenheiro-software põe a pré-seleção no SDK depois do próximo lote.
2. **Aviso no monitor para marca concorrente desconhecida:** foi para o backlog. Hoje ela fica só no log, e o doc 06 foi ajustado.
3. **Medições no APK** (reindexação v3 e p95): esperam o APK de preview do 1ed7d51, que peço logo depois do deploy da demo.
