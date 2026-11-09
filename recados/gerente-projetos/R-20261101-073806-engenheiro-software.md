---
id: R-20261101-073806-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0026
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T07:38:06-04:00
---
# Bugs do login dos APKs: servidor verificável, login só para servidor Macuxi, endereço como digitado, teclado e área segura

## Contexto
Bugs do login reportados pelo Alexandre nos APKs (T-0026). Entram no APK novo da T-0029. Respondi aos recados do Alexandre: 023742 (sem encerrar, porque falta a parte do modulo-core), 065547, 065230, 023528 e 023401, os quatro últimos encerrados. 023857 e 024029 marcados como lidos.

**Divergência com o pedido:** o pedido mandava completar o /v1 à vista (R-065230 item 2), mas o Alexandre mandou depois a R-20261101-065547-alexandre, que substitui esse item: "endereço exatamente como digitado, sem completar /v1 nem https". **Segui a 065547.** O app só tira os espaços das pontas. Sem /v1, o teste falha com a dica "Confira o endereço; ele termina em /v1." O padrão do build (EXPO_PUBLIC_API_URL) continua com /v1.

## O que fiz
1. **Segurança**
   - `GET /v1/saude` (apps/api/src/app.ts) devolve `{ ok: true, servico: "macuxi-api", versao, modulos }`, no contrato novo `SaudeRespostaSchema` do SDK (packages/platform-sdk/src/saude.ts). `versao` vem de MACUXI_VERSAO ou do package.json; createApp aceita `versao`.
   - O mock-api devolve o mesmo `servico`.
   - O app valida com Zod em apps/mobile/src/lib/servidor.ts (`testarServidor`, usado por `testApiUrl` e `ApiClient.health`): 200 + JSON + servico. A mensagem diz o endereço testado e o que falhou.
   - `loginComSenha` e `loginDemo` testam o servidor antes de enviar o login (cache do último endereço aprovado) e enviam só para esse endereço.
   - Fora do `__DEV__`, só https.
   - Formato do erro combinado com o modulo-core (R-20261101-072831): ErroSemConexao para falta de resposta; `ErroHttp` com código `SERVIDOR_INVALIDO` para o resto, que já é tratado por `ehServidorInvalido` em `mensagemDeErroDeLogin`.
2. **Endereço**
   - apps/mobile/src/lib/api-url.ts: `normalizeApiUrl` agora só faz trim; `completarApiUrl` fica só para o padrão do build; `problemaNoEndereco` confere o formato e o https.
   - Cartão Servidor: campo em várias linhas, exemplo `https://seu-servidor.com.br/v1`, mensagem "Testado: <endereço>/saude".
   - scripts/demo/subir-demo.ps1 imprime e copia (Set-Clipboard) `https://<nome>.trycloudflare.com/v1`.
   - scripts/demo/LEIA-ME.md: linha 32 e "Problemas comuns" atualizados.
3. **Teclado e área segura** (apps/mobile/src/app/login.tsx)
   - `KeyboardAvoidingView` (padding) em LoginReal e LoginDemo.
   - Espaço inferior da área segura no rodapé com o teclado fechado.
   - `softwareKeyboardLayoutMode: 'resize'` explícito no app.config.ts. É mudança nativa, mas o APK vai ser gerado de novo de qualquer forma.
4. docs/desenho/T-0004.md §7.2.

## Testes
- mobile: 36 verdes (servidor.test.ts com 10 casos; api-url.test.ts reescrito).
- platform-sdk: 298 (saude.test.ts novo).
- api: 117 (com Postgres).
- mock-api: 18.
- tsc e eslint verdes em mobile, api, platform-sdk e mock-api.
- `pnpm --filter mobile bundle:android` verde em APP_VARIANT=campo e gestao.
- subir-demo.ps1 sem erro no parser do PowerShell.
- `verificar engenheiro-software` sem violação.

## Pendências
- **testes** (R-20261101-072816): tests/modulos/shells.test.ts:69 (S0-087) usa `toEqual({ ok: true, modulos })` e fica vermelho com os campos novos da saúde. Precisa ser corrigido antes do push.
- **modulo-core**: mensagens de login e olho na senha (em andamento).
- **Aparelho**: não demonstrei no celular (sem emulador nem EAS da minha parte). Conferir no APK novo: Android de até 6", Campo e Gestão, com e sem teclado, navegação por botões e por gestos.
- O pedido R-20261101-072954 (carga do Vendedor na API real) foi respondido no item 2: o caminho é o do desenho T-0029 §8. Os itens 1, 3 e 4 são do modulo-vendedor.

## Pronto quando
Gerente: commit e APK novo, depois da correção do S0-087 pelo testes.
