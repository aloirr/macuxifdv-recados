---
id: R-20261106-020019-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0086
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T02:00:19-04:00
---
# Status das 2h (06/11): A e B no main; produção 86c verde e aguardando seu ok; portal com lote único às 6h

## Contexto
Status das 2h de 06/11. Mostra o que subiu desde as 23h, o que está pronto fora do main e o que preciso de você. O próximo sai às 6h, ou antes, quando a produção estiver pronta para ligar.

## Subiu ao main desde as 23h
- **Fatias A e B** (T-0084 e T-0085), no lote AB2 (fed02a6, 23h56), com CI verde e revisões sem 🔴. A meta das 24h foi cumprida.
  - Migração única 0033 e FTS do aparelho v3.
  - Aplicação do produto, busca com ano dentro da faixa e "Serve em".
  - Referência cruzada e "Equivale a", oferece junto e o cadastro do Catálogo no BKO.
  - Aplicação no item do pedido e nos PDFs, e o pedido em nome do vendedor.
- **Workflow "producao — publicar"** (cfbd543).
- **T-0087 N3, carga em partes** (#98, 6cbcd87), pela regra A.

## Pronto fora do main (sobe junto às 6h, num lote só)
O motivo de um lote só: os arquivos de `db/` já trazem a migração 0034 e a 0035 juntas, e o push no main roda as migrações na demo. Por isso o lote inteiro passa antes pelo stack isolado.
- **Seguimento das fatias A e B,** revisado sem 🔴:
  - o seletor do Novo pedido usa a busca do Catálogo, com o "Serve em";
  - as marcas vêm do Promotor pela `promotor.concorrentes@1`;
  - a exportação já tem rota para o PR #96;
  - o oferece junto aceita produto fora da página;
  - a migração 0034 guarda o nome da marca na referência.
- **Portal T-0087:**
  - desenho e ADR 0029 (super-admin de plataforma, 2º fator TOTP, sessão curta, tudo auditado);
  - SDK;
  - API das empresas;
  - Core do super-admin;
  - parte da integração: "Conferir sem gravar", "Baixar erros" e ordem de carga.

  - migração 0035 do super-admin: tabelas de plataforma sem tenant, acessadas só por funções, com a auditoria preservada mesmo depois de excluir o tenant.

  Em curso:
  - as telas do portal;
  - o 🔴 do Core (`node:crypto` no domínio, correção pequena);
  - o cabeçalho de autorização no SDK;
  - o ajuste do teste de conformidade do banco à 0035.

  **Atenção, ADR 0029:** quem tiver a credencial do `macuxi_app` consegue abrir uma sessão de super-admin pelas funções, porque a senha e o TOTP são conferidos na API. Tudo fica auditado no banco. O texto da ADR vai dizer isso.

## Produção (T-0086)
**Lote 86c** (70478e1): CI e stack isolado verdes. No ensaio do CI, contra o DBaaS de teste, com TLS e admin sem superusuário:
- o backup real ficou pronto: 117 tabelas, contagem estável;
- a restauração deu IGUAL, com a RLS conferida e a base temporária apagada.

O lote 86c traz os 3 workflows que esperam o seu ok, mais:
- os perfis EAS `campo-producao` e `gestao-producao`: APK direto, assinado pela EAS, com a API de produção;
- o BKO aceitando bko. e config.;
- os scripts de backup e de ensaio de restauração.

## Preciso de você
1. **Ok nos 3 workflows de produção:**
   - `producao-tenant.yml`;
   - `producao-ensaio-restauracao.yml`;
   - o job `stack-producao`.

   Sem o ok, o backup e o ensaio não sobem ao main, e a produção liga sem o backup ensaiado.
2. **Ok na mudança do `producao-publicar.yml`:** ele passa a ler um secret opcional novo, o `PROD_SUPERADMIN_CONVITE`, que é o convite do seu 1º acesso ao portal. Às 8h, crie esse secret no environment PRODUCAO. O valor fica só com você.
3. **ADR 0029 (super-admin de plataforma):** está como proposta. O time segue o desenho; aceite ou corrija. Antes, veja a "Atenção, ADR 0029" acima.
4. **Nuvem:**
   - **#99 (N2):** conflita com o #98. Os passos estão no comentário do PR; acione a sessão.
   - **#97 (N1):** ainda sem a marca de pronto.
   - **#96 (C) e #95 (D):** sobem depois do lote das 6h. Já pus no #96 o formato da rota.
5. **Patch do trailer** no `scripts/coord.mjs` (R-20261105-214336).

## Cortes e riscos (sem adiar em silêncio)
1. **Equipe por CSV com convite:** está desenhada, com convite por link de uso único e sem e-mail. A implementação fica para a tarde de 06/11. Para as 12h, o admin do cliente sai pelo `tenant:criar`.
2. **"Pastilha uno 2012" offline no Novo pedido** (critério 3 da T-0084): online funciona assim que o lote subir. Offline depende de liberar no SDK a leitura das entidades do Core no aparelho, prevista até as 16h. Na aba Catálogo, já funciona offline.
3. **Vendedor e a marca concorrente:** a 0034 guarda o nome da marca. Falta o Catálogo gravar e ler esse nome, o que fica para depois do portal.
4. **Página navegável da documentação da API:** depende do #99.

## Já com você
- custo do BV1-4-10;
- apagar a instância do DBaaS de teste e o secret;
- conferência dos APKs;
- números da medição;
- mais agentes: com o limite de 4, o portal anda em série.
