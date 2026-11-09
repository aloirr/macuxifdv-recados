---
id: R-20261101-023154-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0026
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T02:31:54-04:00
---
# T-0026: APKs de preview verdes, subir/derrubar-demo testados, trustProxy + 429 do módulo, CI com --continue

## Contexto
T-0026 (demonstração com o gestor externo), parte do engenheiro: builds de preview, scripts da demo, proxy confiável na API (critério 4, junto com o modulo-core) e o CI com todas as suítes (R-20261101-015014).

## O que fiz
**1. APKs de preview (2 builds usados, ambos FINISHED; bundle local verde nas duas variantes antes de cada um)**
- campo-preview: build 43a49c92-c671-46ed-8140-ab84ece342ff
  APK: https://expo.dev/artifacts/eas/IpWfiRYTTQ2u68W1MYzn71XU5caWBsSXe5SdHmqdzTo.apk
  Página: https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/43a49c92-c671-46ed-8140-ab84ece342ff
- gestao-preview: build cd127bfd-b5bc-4e0e-8834-34ca9813c6c5
  APK: https://expo.dev/artifacts/eas/0dWy-aQMgl1yGtn0B0sPMX4WSR4kiCdSde_6CVtKZUc.apk
  Página: https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/cd127bfd-b5bc-4e0e-8834-34ca9813c6c5
- Endereço https na tela de login: `normalizeApiUrl` mantém o https e completa `/v1`; "Testar e salvar" chama `GET <url>/saude`. Teste novo em apps/mobile/src/lib/api-url.test.ts. Não instalei o APK num aparelho (não tenho um): o teste no celular fica no roteiro do Alexandre.
- Upload a partir de b5cf8f9 com a árvore suja (só arquivos .coord/, docs/ e trabalho em andamento de outros agentes fora do app). O bundle local de cada variante rodou logo antes do upload.

**2. Scripts da demo (caminho final)**
- C:\macuxifdv\scripts\demo\subir-demo.ps1 (o _instalar\subir-demo.cmd do Alexandre já chama esse caminho)
- C:\macuxifdv\scripts\demo\derrubar-demo.ps1
- C:\macuxifdv\scripts\demo\LEIA-ME.md
- O que testei de verdade (Windows PowerShell 5.1): Docker, `banco subir`, `seed demo --recriar` e `-Manter`, API na 8100 + worker, túnel e `/v1/saude` respondendo pelo https (3 endereços trycloudflare diferentes), login do vendedor 7 vezes seguidas pelo túnel (200 em todas), `me/modulos` do supervisor pelo túnel, recusa de uma segunda subida (saída 2) e derrubar (túnel, worker e API encerrados, porta livre).
- Achados nos testes, já corrigidos: (a) o MSI do winget precisa de administrador (UAC; deu 1602 quando ninguém aprovou). Se falhar, o script baixa o cloudflared portátil oficial para .dados\demo\bin e só usa se a assinatura Authenticode da Cloudflare for válida (`-Portatil` pula o winget); (b) a barra de progresso do PS 5.1 deixava o download muito lento ($ProgressPreference); (c) o cloudflared novo levou ~90 s para escrever o endereço (antivírus?): agora a espera é de 3 min; (d) deadlock no seed quando outra subida rodava ao mesmo tempo: uma nova tentativa automática e a regra de uma demo por vez (`-Reiniciar` para derrubar e subir de novo); (e) node órfão quando o cmd pai morre: o derrubar encerra quem escuta a porta da demo (servidor.ts) e o worker sem watch.
- O .env local NÃO tem MACUXI_JWT_SEGREDO com 32 ou mais caracteres. O script gera um segredo aleatório só daquela subida e avisa; os logins valem até derrubar. Para fixar, o Alexandre põe a variável no .env (não li nem alterei o .env).

**3. Login atrás do túnel (critério 4, a minha parte; resposta R-20261101-012110 ao modulo-core)**
- apps/api/src/config.ts `lerTrustProxy(env)`: MACUXI_TRUST_PROXY (false/0 desligado, que é o padrão; true; número de saltos; lista de IP/CIDR/loopback). `OpcoesApp.trustProxy` em apps/api/src/app.ts e servidor.ts. O subir-demo liga `loopback`: req.ip passa a ser o IP real do X-Forwarded-For que a Cloudflare acrescenta (XFF forjado à esquerda é ignorado).
- packages/platform-sdk/src/api.ts: 429 em STATUS_ERRO_MODULO e `retryAfterDoErroModulo`; o createApp manda `retry-after` quando `detalhes.retry_after_s` é inteiro > 0.
- Testes: apps/api/test/app.test.ts (429 do módulo com retry-after; trustProxy desligado divide o limite, loopback separa por aparelho, XFF forjado), apps/api/test/config.test.ts, packages/platform-sdk/src/api.test.ts.

**4. CI com todas as suítes (R-20261101-015014, pedido do Alexandre R-20261101-014652 item 1)**
- .github/workflows/ci.yml: o install roda mesmo com falha nos passos do coord. Lint, fronteiras, typecheck, testes, build do BKO e os dois bundles viraram passos separados com `if: !cancelled() && steps.instalar.outcome == 'success'` e turbo `--continue`. O job continua vermelho se qualquer passo falhar.
- package.json: lint/typecheck/test da raiz com `--continue`.

**5. Docs**: docs/desenho/T-0004.md §7.3 (builds de preview e o https).

## Testes
- platform-sdk 267/267; api 98/98; mobile api-url 4/4.
- Lint e typecheck da raiz verdes (pnpm lint: LINT=0 com fronteiras OK; pnpm typecheck: TC=0). Depois deles só mexi em .ps1, .yml e api-url.test.ts; lint e typecheck de mobile e api rodaram de novo, verdes.
- `verificar engenheiro-software`: OK, nenhuma violação.

## Pendências e avisos
- **Interferência com o Alexandre:** ele rodou _instalar\subir-demo.cmd às 01:57 e às 02:13, enquanto eu testava. Meu teste derrubou e reiniciou a demo dele: o deadlock do seed às ~01:58 provavelmente veio das duas subidas ao mesmo tempo, e no derrubar das 02:29 a limpeza de órfãos encerrou a API e o worker na porta 8100. Ficou vivo um cloudflared dele (PID 115040), apontando para a 8100, que agora não tem API. Não mexi nele. Para voltar, basta rodar o subir-demo.cmd de novo (o endereço muda). Avisei o Alexandre por recado.
- R-20261101-020623 (Alexandre: matriz de testes ponta a ponta e a fatia vertical do pedido) é tarefa nova, para o gerente distribuir. Não comecei.
- Recados antigos na minha caixa (revisões T-0014, T-0023, T-0025, CODEOWNERS/governança T-0005) seguem abertos.

## Conteúdo para docs/status/demo.md (o arquivo é do gerente)
```
# Demonstração — app novo + API real (T-0026)

## Antes do dia
- Docker Desktop instalado; `pnpm install` na raiz.
- No celular, os APKs de preview:
  - Macuxi Campo: https://expo.dev/artifacts/eas/IpWfiRYTTQ2u68W1MYzn71XU5caWBsSXe5SdHmqdzTo.apk
  - Macuxi Gestão: https://expo.dev/artifacts/eas/0dWy-aQMgl1yGtn0B0sPMX4WSR4kiCdSde_6CVtKZUc.apk
- Recomendado: `MACUXI_JWT_SEGREDO` (32+ caracteres) no .env da raiz. Sem ele, cada subida usa um segredo temporário.

## Subir (uma janela só)
- Duplo clique em `_instalar\subir-demo.cmd` (ou `powershell -ExecutionPolicy Bypass -File scripts\demo\subir-demo.ps1`).
- Leva cerca de 1 minuto. Na primeira vez instala o cloudflared: o winget pede autorização do Windows; sem ela, baixa o portátil assinado.
- No fim, o script imprime o endereço `https://<nome>.trycloudflare.com`.
- Opções: `-Manter` (não apaga o ensaio), `-Reiniciar` (derruba e sobe de novo; o endereço muda), `-SemTunel`, `-SemWorker`, `-Portatil`, `-Porta`.

## No celular
1. Tela de login → Servidor → digite o endereço https → Testar e salvar.
2. Código da empresa `demo`, senha `demo-macuxi`.
   - Campo: vendedor@exemplo.com.br (Lucas, rota de hoje com 6 paradas), vendedor2@exemplo.com.br (Camila, 4 paradas), promotor@exemplo.com.br (Joana, 4 paradas, não faz pedido).
   - Gestão: supervisor@exemplo.com.br (Renata, Equipe Manaus, 2 pedidos para aprovar).
   - Outros: analista@ e admin@exemplo.com.br.
- Licenciados no tenant demo: core, catálogo, vendedor e promotor (gestor não).

## Encerrar
`_instalar\derrubar-demo.cmd` (ou `scripts\demo\derrubar-demo.ps1`; `-PararBanco` também para o Postgres).

## Se der problema
- O endereço muda a cada subida.
- "Porta 8100 em uso": feche o `pnpm dev`.
- "Já há uma demonstração no ar": use `-Reiniciar` ou derrube antes.
- O túnel abriu mas não responde no PC: o DNS leva alguns segundos; teste `<endereço>/v1/saude` no navegador do celular.
- Logs em `.dados\demo\`.
- Segurança: o túnel expõe a API deste PC. Use só com a base de demo e derrube ao terminar.

Detalhes: scripts/demo/LEIA-ME.md
```

## Pronto quando
O gerente registra a T-0026 (critérios 1, 3 e 4 da minha parte), cola o conteúdo acima em docs/status/demo.md e faz o commit (git é só do gerente).
