---
id: R-20261107-165654-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0094
responde_a: R-20261107-164452-alexandre
encerra: true
contrato: null
criado_em: 2026-11-07T16:56:54-04:00
---
# Frentes abertas na nuvem: N4, N5, N6 e mais N7, N8, N9; caminhos no quadro e prompts prontos

Abri as 3 frentes que você pediu (N4, N5 e N6). Pela regra do R-20261107-164646, abri também N7, N8 e N9, com itens trazidos do backlog que não colidem com a T-0093 nem com a T-0094. Os caminhos estão reservados em .coord/quadro.md, na seção "Travado pela nuvem". Nenhuma foi descartada. A N5 não estava com nenhum agente local, porque o desenho da T-0094 ainda não começou: o desenho local vai adotar a porta de e-mail da N5.

Regras comuns, já dentro de cada prompt: um commit por fatia com o trailer único "Agente: <dono>"; nada em .coord/; sem force push; o título do PR com [PRONTO PARA MERGE <sha>] só com o ci-ok verde sobre o main atual; o merge é do gerente, pela regra A.

=== N4 — T-0108 kit do TI do cliente (dono: modulo-integracao)
Branch: nuvem/T-0108-kit-ti · Caminhos: modules/integracao/docs/exemplos/** (novo)
Critérios:
1. Coleção Postman/Insomnia gerada do modules/integracao/docs/openapi-hub-v1.json.
2. Exemplos em Node, C# e Python: lote delta e completo em partes, cursor, idempotência (Idempotency-Key), recusa por linha e devolução de pedido.
3. Um teste que falha se a coleção divergir do openapi-hub-v1.json.
4. Contrato intacto; lint, typecheck e test do @macuxi/integracao verdes.
PROMPT (cole na sessão):
"Você é o agente modulo-integracao do Macuxi FDV (repositório aloirr/macuxifdv). Tarefa T-0108 (frente N4 da nuvem). Crie a branch nuvem/T-0108-kit-ti a partir do main e trabalhe SÓ em modules/integracao/docs/exemplos/** (pasta nova); não mude contratos nem nenhum outro caminho, e nada em .coord/. Objetivo: o kit do TI do cliente para integrar o ERP ao Hub /integracao/v1. 1) Uma coleção Postman (e o export Insomnia) gerada a partir de modules/integracao/docs/openapi-hub-v1.json por um script no próprio diretório, com variáveis de ambiente (servidor, chave do Conector mxc_...) e exemplos de cada rota. 2) Exemplos de cliente em Node (fetch), C# (.NET 8 HttpClient) e Python (requests): lote delta, lote completo em partes, paginação por cursor, idempotência com Idempotency-Key, tratamento de recusa por linha (RecusaLote) e devolução de pedido; cada exemplo com README curto em português. 3) Um teste vitest no pacote que regenera a coleção e falha se ela divergir do openapi-hub-v1.json; e um teste que roda o exemplo Node contra um Hub simulado. Leia antes CLAUDE.md, docs/modulos/integracao/hub-api.md (§15) e modules/integracao/docs/guia-api-hub.md. Rode pnpm --filter @macuxi/integracao lint, typecheck e test. Commit com a mensagem 'T-0108: kit do TI do cliente (coleção e exemplos)' e o trailer 'Agente: modulo-integracao' (único trailer). Abra o PR para main; quando o ci-ok estiver verde sobre o main atual, ponha no título [PRONTO PARA MERGE <sha>]. Sem force push."

=== N5 — T-0094 envio de e-mail transacional (dono: engenheiro-software)
Branch: nuvem/T-0094-email · Caminhos: packages/platform-sdk/src/email/** e apps/api/src/email/** (novos); em packages/platform-sdk/src/index.ts, só a linha de export.
Critérios:
1. Porta EnvioEmail no SDK.
2. Adaptador SMTP configurável por env, com credenciais só em env/secret.
3. Adaptador "console/arquivo" para demo e testes.
4. Modelos em português "Seu acesso ao Macuxi" (senha inicial) e "Sua nova senha" (esqueci a senha / redefinição).
5. Envio pela fila (pg-boss) com nova tentativa.
6. Nenhum dado pessoal nem senha em log.
7. Testes.
PROMPT:
"Você é o agente engenheiro-software do Macuxi FDV (repositório aloirr/macuxifdv). Tarefa T-0094, frente N5 da nuvem: envio de e-mail transacional. Crie a branch nuvem/T-0094-email a partir do main. Trabalhe SÓ em packages/platform-sdk/src/email/** e apps/api/src/email/** (pastas novas); em packages/platform-sdk/src/index.ts acrescente apenas a linha de export; nada em .coord/, .github/ nem em outros caminhos (o time local está mexendo no login do portal, T-0093, em platform-sdk/src/plataforma.ts, api.ts e apps/api/src/app.ts: não toque). Leia CLAUDE.md, .coord/tarefas/T-0094.md e docs/produto/03-regras-de-negocio.md (RN-CORE-32, 33, 34). Entregue: 1) a porta EnvioEmail no SDK (enviar(modelo, destinatario, dados) → resultado), com tipos Zod do modelo; 2) adaptador SMTP (nodemailer ou equivalente) configurado por variáveis MACUXI_SMTP_* (host, porta, usuário, senha, remetente, TLS), sem logar credenciais; 3) adaptador 'console/arquivo' para demo e testes, que grava o e-mail em arquivo com a senha mascarada no log; 4) modelos em português, texto curto: 'Seu acesso ao Macuxi' (login, senha inicial, troca obrigatória no 1º uso, validade 72 h) e 'Sua nova senha' (esqueci a senha ou redefinição pelo BKO); 5) envio por fila pg-boss com nova tentativa e sem bloquear a rota; 6) nenhum e-mail, nome ou senha em log ou evento; 7) testes de unidade e do adaptador de arquivo. Escreva também docs/desenho/T-0094-email.md com a interface, as variáveis e os secrets que o dono do produto vai precisar criar. Rode lint, typecheck e test do platform-sdk e do apps/api. Commit 'T-0094: envio de e-mail transacional (porta, SMTP, arquivo, modelos, fila)' com o trailer único 'Agente: engenheiro-software'. PR para main; com o ci-ok verde sobre o main atual, título com [PRONTO PARA MERGE <sha>]. Sem force push."

=== N6 — T-0109 nome e versão dos builds (dono: engenheiro-apps)
Branch: nuvem/T-0109-versao-builds · Caminhos: apps/mobile/app.config.ts, apps/mobile/eas.json, apps/mobile/src/app/profile.tsx (só a linha da versão), docs/eas*, scripts/eas/** (novo).
Critérios: os do seu R-20261107-151653.
1. Version 1.0.0 e versionCode sempre crescente nas duas variantes.
2. Mensagem do EAS Campo-Demo-vX.Y.Z / Gestao-Demo-vX.Y.Z, e -Oficial- nos perfis de produção.
3. Versão visível no Perfil.
4. Passo documentado.
5. APK com nome legível: o upload ao bucket privado vai num diff de .github para o seu ok, se precisar de workflow.
PROMPT:
"Você é o agente engenheiro-apps do Macuxi FDV (repositório aloirr/macuxifdv). Tarefa T-0109, frente N6 da nuvem: nome e versão dos builds. Crie a branch nuvem/T-0109-versao-builds a partir do main. Trabalhe SÓ em apps/mobile/app.config.ts, apps/mobile/eas.json, apps/mobile/src/app/profile.tsx (apenas a linha da versão), docs/eas* e scripts/eas/** (novo); nada em .coord/, .github/ nem em telas de login (o time local mexe no login na T-0094). Leia CLAUDE.md, .coord/tarefas/T-0109.md e docs/produto/07-agentes-e-coordenacao.md §5. Entregue: 1) version '1.0.0' nas variantes campo e gestao e android.versionCode sempre crescente (fonte única, por exemplo um arquivo de versão em scripts/eas, ou appVersionSource remoto do EAS com autoIncrement, explicando a escolha); 2) mensagem do build no EAS no formato Campo-Demo-vX.Y.Z / Gestao-Demo-vX.Y.Z nos perfis de preview e Campo-Oficial-vX.Y.Z / Gestao-Oficial-vX.Y.Z nos de produção (script scripts/eas/build.mjs que chama eas build --message com o nome certo); 3) a linha da versão no Perfil igual ao nome do build (por exemplo 'Campo-Demo-v1.0.0'); 4) um passo documentado em docs/eas-build-passo-a-passo.md; 5) um script que baixa o APK do Expo e o salva como Campo-Demo-vX.Y.Z.apk para publicar num bucket privado com link temporário: se isso exigir workflow em .github, NÃO edite .github, entregue o diff em docs/desenho/T-0109-workflow.diff. Teste unitário do cálculo do nome e da versão. Rode lint, typecheck e test do apps/mobile. Commit 'T-0109: nome e versão dos builds' com o trailer único 'Agente: engenheiro-apps'. PR para main; com o ci-ok verde sobre o main atual, título com [PRONTO PARA MERGE <sha>]. Sem force push."

=== N7 — T-0096 faixa aberta de ano até 31/12 (dono: modulo-catalogo)
Branch: nuvem/T-0096-faixa-ano · Caminhos: modules/catalogo/app/indice*.ts e os testes deles.
Critérios: "2018 em diante" continua valendo no ano novo sem reindexar; teste com o relógio em 01/01/2027; busca em < 300 ms com 20 mil.
PROMPT:
"Você é o agente modulo-catalogo do Macuxi FDV (repositório aloirr/macuxifdv). Tarefa T-0096, frente N7 da nuvem. Crie a branch nuvem/T-0096-faixa-ano a partir do main. Trabalhe SÓ em modules/catalogo/app/indice*.ts e nos testes deles; nada em .coord/. Leia CLAUDE.md e .coord/tarefas/T-0096.md. Problema: uma aplicação com faixa aberta de ano ('2018 em diante') é indexada até o ano corrente; na virada para 2027, 'civic 2027' não acha a aplicação até o índice local do aparelho ser refeito. Corrija para que a faixa aberta valha até o ano corrente no momento da consulta (sem reindexar), ou para que o app reindexe só essas aplicações na virada do ano, com o menor custo; escolha e justifique no PR. Testes com o relógio em 31/12/2026 23:59 e 01/01/2027 00:01 no fuso do tenant (sem relógio fixo proibido pelo lint macuxi/hora-fixa-em-teste: use o padrão de relógio injetado do módulo), e o teste de desempenho atual com 20 mil produtos continua em < 300 ms. Rode lint, typecheck e test do @macuxi/catalogo. Commit 'T-0096: faixa aberta de ano vale no ano novo sem reindexar' com o trailer único 'Agente: modulo-catalogo'. PR para main; com o ci-ok verde sobre o main atual, título com [PRONTO PARA MERGE <sha>]. Sem force push."

=== N8 — T-0099 Conector: ordem divergente e "nulo: limpa" (dono: modulo-integracao)
Branch: nuvem/T-0099-conector · Caminhos: apps/conector/** e docs/modulos/integracao/conector.md.
Critérios: 'conector testar' avisa a colação não binária com exemplo; opt-in por campo "nulo: limpa" no conector.json; sem o opt-in, nada muda; testes nos dois casos.
PROMPT:
"Você é o agente modulo-integracao do Macuxi FDV (repositório aloirr/macuxifdv). Tarefa T-0099, frente N8 da nuvem. Crie a branch nuvem/T-0099-conector a partir do main. Trabalhe SÓ em apps/conector/** e docs/modulos/integracao/conector.md; não mude contratos de modules/integracao; nada em .coord/. Leia CLAUDE.md, .coord/tarefas/T-0099.md e docs/modulos/integracao/conector.md. Entregue: 1) no comando 'conector testar', a conferência da ordem do external_id no banco do ERP contra a ordem do Conector (binária), avisando com exemplo concreto quando divergir (colação não binária), com a orientação de usar COLLATE Latin1_General_BIN2 / NLSSORT BINARY / COLLATE \"C\" como no conector.md; 2) um opt-in por campo no conector.json (por exemplo \"nulo\": \"limpa\" na definição do campo) para que um NULL da view seja enviado como null e limpe o campo no Macuxi; sem o opt-in, o comportamento atual (omitir nulos) não muda; valide o conector.json com o schema e atualize os exemplos; 3) testes dos dois itens e a documentação no conector.md. Rode lint, typecheck e test do apps/conector. Commit 'T-0099: conector testar avisa ordem divergente; opt-in nulo: limpa' com o trailer único 'Agente: modulo-integracao'. PR para main; com o ci-ok verde sobre o main atual, título com [PRONTO PARA MERGE <sha>]. Sem force push."

=== N9 — T-0097 miniatura do produto no pull (dono: modulo-catalogo)
Branch: nuvem/T-0097-miniatura · Caminhos: modules/catalogo/contracts/** (só aditivo), a API do pull do catálogo, modules/catalogo/app/telas/** e modules/catalogo/app/lib/miniatura* (novo).
Critérios: contrato aditivo e compatível com a v1; miniatura baixada sob demanda, fora do pacote offline obrigatório, com teto de tamanho; sem sinal, espaço vazio sem travar.
Atenção: N7 e N9 são do mesmo módulo, em arquivos diferentes; a que entrar por último puxa o main.
PROMPT:
"Você é o agente modulo-catalogo do Macuxi FDV (repositório aloirr/macuxifdv). Tarefa T-0097, frente N9 da nuvem. Crie a branch nuvem/T-0097-miniatura a partir do main. Trabalhe SÓ em modules/catalogo/contracts/** (mudança apenas aditiva, compatível com a v1), na API do pull do catálogo em modules/catalogo/api/**, em modules/catalogo/app/telas/** e em modules/catalogo/app/lib/miniatura* (novo); NÃO toque em modules/catalogo/app/indice*.ts (outra frente) nem em .coord/. Leia CLAUDE.md e .coord/tarefas/T-0097.md. Entregue: 1) campo opcional de miniatura no contrato do pull do produto (URL ou chave de arquivo, com dimensões e versão), aditivo; 2) a API preenche o campo quando o produto tiver imagem (use o armazenamento de arquivos do platform-sdk que já existe; não crie bucket novo) com teto de tamanho (ex.: 320 px, ≤ 30 KB); 3) no app, a miniatura é baixada sob demanda só quando a linha aparece na tela (lista por linha e busca), fica em cache local e nunca entra no pacote offline obrigatório; sem sinal, mostra o espaço vazio sem travar a rolagem; 4) testes: contrato antigo continua válido, a lista com 20 mil produtos mantém os tempos do lista-por-linha.desempenho.test.ts. Rode lint, typecheck e test do @macuxi/catalogo. Commit 'T-0097: miniatura do produto no pull, sob demanda' com o trailer único 'Agente: modulo-catalogo'. PR para main; com o ci-ok verde sobre o main atual, título com [PRONTO PARA MERGE <sha>]. Sem force push."
