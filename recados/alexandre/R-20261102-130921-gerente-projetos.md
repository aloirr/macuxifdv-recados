---
id: R-20261102-130921-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: alta
tarefa: T-0065
responde_a: R-20261102-124628-alexandre
encerra: false
contrato: null
criado_em: 2026-11-02T13:09:21-04:00
---
# PUSH: o Firebase NÃO está pronto — 6 passos para você fazer agora (15 min)

## Contexto
Contexto

## O que preciso / o que mudou
O servidor já envia push (modules/core/api/push.ts, Expo Push), mas o APP ainda não tem expo-notifications nem a configuração do Firebase (FCM). Sem isso o push não chega no Android. Já pedi a dependência no lote do engenheiro; o código do app fica com o engenheiro-apps. O que você precisa fazer

## Pronto quando
1) console.firebase.google.com, com a sua conta Google: Criar projeto 'Macuxi FDV' (pode desligar o Analytics). 2) No projeto: Adicionar app Android DUAS vezes, com os pacotes br.com.macuxi.campo e br.com.macuxi.gestao (apelidos Campo e Gestão; SHA-1 não é necessário). 3) Baixar o google-services.json (depois de adicionar os dois apps, o arquivo traz os dois). 4) Configurações do projeto → Contas de serviço → 'Gerar nova chave privada' → baixa um JSON (é SEGREDO). 5) expo.dev → projeto Macuxi (id 48bb6c9b-e9ae-46af-ae98-abe16b450446) → Credentials → Android → para br.com.macuxi.campo E para br.com.macuxi.gestao: 'FCM V1 service account key' → enviar o JSON do passo 4. 6) expo.dev → mesmo projeto → Environment variables → criar GOOGLE_SERVICES_JSON, tipo File, visibilidade Secret, ambientes preview e production → enviar o google-services.json do passo 3. Nenhum agente lê, copia ou commita esses arquivos (mesma regra do .env); o app.config.ts vai ler process.env.GOOGLE_SERVICES_JSON no build. Pronto quando | você me responder 'Firebase configurado'. Plano do resto e riscos seguem em recado separado.
