---
id: R-20261109-010747-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: [engenheiro-software, testes, designer-ux]
tipo: entrega
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T01:07:47-04:00
---
# T-0140 relatos 1/6 (tarefa sem tela protegida: trava única, build novo espera a 1ª abertura, corte no orçamento, nada derruba) + T-0098 portal atrás de campo opcional; T-0117 para a próxima rodada

Contexto: rodada da madrugada (R-20261108-220117). Escopo: (1) relatos 1 e 6 da T-0140, (2) T-0098 parte do portal, (3) T-0117 web só com desenho.

## 1. T-0140, relatos 1 e 6 (abre e fecha depois de atualizar; fecha na carga inicial)
Sem log do aparelho, a causa segue sem confirmação. Ataquei a hipótese do recado: depois do MY_PACKAGE_REPLACED, o WorkManager e o expo-task-manager restauram `macuxi-sync-delta` e `macuxi-push-sync` e acordam o JS sem tela, junto com a abertura e a carga.

O que estava frágil, e o que mudou:
- **A tarefa sem tela abria o SQLite e sincronizava logo depois da atualização**, inclusive a passagem e a reindexação, enquanto o vendedor abria o app. Agora ela **não roda num build que ainda não abriu com tela**: `idDoBuild` = versão + versionCode, gravado em `fv:app:build_aberto` ao fim da abertura. O motivo aparece no Diagnóstico como "app atualizado, espera a 1ª abertura".
- **Não havia trava entre a abertura/carga do app e a tarefa no mesmo processo.** Agora há uma trava única (`lib/trava-sync.ts`):
  - o app declara `abertura` e `sincronizacao` (a carga inicial entra aqui) e nunca espera pela trava;
  - a tarefa só começa com o app parado; se não, "não rodou: o app estava abrindo ou sincronizando";
  - com o app em primeiro plano, "não rodou: o app estava aberto";
  - o app que sincroniza durante a passada espera ela terminar e relê o que ela gravou;
  - com o motor do app vivo (app em segundo plano), a tarefa solta a trava antes, para não haver espera cruzada.
- **No fim do orçamento de 60 s, a passada seguia gravando** depois de a tarefa avisar o Android que tinha terminado. O processo podia morrer no meio de uma escrita. Agora há um corte (`criarCorteDaPassada`): o transporte da tarefa recusa a próxima página e `online()` fica falso. A tarefa espera até 10 s a passada parar e só então solta o lease.
- **A tarefa tocava em estado de React**: `aoResultado` → `setSegundoPlano`. Saiu. O app relê `lerUltimoSegundoPlano` quando volta ao primeiro plano.
- **Erros não derrubam mais o app:**
  - `defineTask` e `setNotificationHandler` no escopo global (rodam na carga do bundle, também sem tela) e o corpo das duas tarefas estão em `semDerrubar`/`semDerrubarAgora`; o erro vai a `gravarErro(…, 'nao-fatal', 'tarefa …')`, que não apaga um fatal;
  - a passada nunca lança e a gravação do resultado não lança;
  - um erro na abertura do app vai ao Diagnóstico como "abertura do app".
- **Carga inicial:** o `transporteV1.pull` devolve a vez ao sistema (`cederAVez`, setTimeout 0) antes de cada página. O loop do SDK já tinha `await` por página, com o SQLite assíncrono.
- **Relato 6 ("o app é minimizado" na carga):** o pedido de permissão de notificação do Android (`registrarPush`) abria por cima do app no instante em que a carga terminava. Agora ele espera 4 s depois da carga.
- **Diagnóstico:** novas linhas "Build instalado: 1.0.1+<n>" e "· app fechado" quando a passada rodou sem tela.

Como o dono do produto confere no v1.0.1: está no roteiro, em `apps/mobile/docs/roteiro-campo-demo-v1.0.0.md`, seção "No v1.0.1: app que abria e fechava…".
1. Instale por cima com a sessão aberta e espere 1 a 2 min sem abrir.
2. Abra o app: ele tem de abrir uma vez só.
3. Vá a Perfil › Diagnóstico e confira:
   - a linha do segundo plano: "não rodou: app atualizado, espera a 1ª abertura", ou nenhuma linha;
   - "Build instalado";
   - "Último erro do app".
4. Feche o app e espere de 20 a 30 min: a linha deve dizer "concluída · … · app fechado".
5. Se o app fechar e o Diagnóstico não mostrar erro, a queda é nativa: é preciso o `adb logcat -b crash`.

Arquivos:
- novos: `apps/mobile/src/lib/trava-sync.ts` (+ teste);
- alterados:
  - `lib/segundo-plano.ts` (+ teste);
  - `services/segundo-plano.ts`, `services/push.ts`, `services/transporte.ts` (+ teste);
  - `state/plataforma.tsx`, `components/sincronizacao-do-shell.tsx`, `app/profile.tsx`;
  - `docs/roteiro-campo-demo-v1.0.0.md`.

Junto: o E8 do testes (R-20261109-000339). Telefone sem DDD agora é mascarado em `lib/erro-de-tela.ts`; a pilha, o UUID e a data ficam. Respondido em R-20261109-001858.

## 2. T-0098, parte do portal
A rota ainda não existe. O contrato foi proposto ao engenheiro-software em R-20261108-234517 (`POST /v1/integracao/conector/download` → `{ url, expira_em, versao, arquivo, tamanho_bytes?, sha256? }`) e está sem resposta até agora.

A tela fica atrás de campo opcional:
- `components/portal/baixar-conector.tsx`: "Gerar o link do Conector" → mostra o link real "Baixar <arquivo>". O link abre em nova aba, com `noopener`; é um link e não `window.open`, para o navegador não bloquear como pop-up. Mostra também "Versão · arquivo · tamanho", "O link vale até HH:MM. Depois disso, gere outro." e o SHA-256 quando vier.
- `lib/conector-download.ts`:
  - só `url` https é obrigatória;
  - rota ausente, 404 `CONECTOR_SEM_PACOTE` e 501/503 = "em breve", como hoje;
  - 429 = aviso de espera; 403 = sem acesso;
  - o link nunca é guardado.
- `lib/portal-rotas.ts`: entra `ROTAS_PORTAL.conectorDownload`; sai a constante `LINK_DOWNLOAD_CONECTOR`.

Quando o schema sair nos contratos, eu troco a validação local por ele.

## 3. T-0117 (web)
Não comecei: não há desenho. Perguntei ao engenheiro-software em R-20261109-004550.

## Testes
- mobile: tsc, eslint (src e index.ts) e vitest verdes: 41 arquivos, 400 testes (eram 376).
- web: tsc, eslint e vitest: verdes (21 arquivos, 175 testes; o contraste-shell passou a olhar o baixar-conector.tsx, onde o link agora mora).
- Bundles do Campo e do Gestão: verdes (export:embed android, 2143 módulos no Campo e 2144 no Gestão).
- `coord verificar`: sem violação para engenheiro-apps.

## Premissas
- `AppState.currentState` no JS acordado sem tela não é 'active'. Se for, a tarefa sem tela nunca roda; dá para ver no Diagnóstico, que mostraria "o app estava aberto".
- Se o `Constants.platform.android.versionCode` vier vazio no APK, o id fica `1.0.1+?` (o Diagnóstico mostra): ainda muda a cada versão, só não entre builds da mesma versão.
- A versão + versionCode (`Constants.expoConfig.version` e `Constants.platform.android.versionCode`) mudam a cada build do EAS.
- Sem aparelho, nada disso foi visto rodando: o critério é o roteiro do v1.0.1.
