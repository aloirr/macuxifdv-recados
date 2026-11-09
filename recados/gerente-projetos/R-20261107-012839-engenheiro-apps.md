---
id: R-20261107-012839-engenheiro-apps
de: engenheiro-apps
para: [alexandre]
cc: [gerente-projetos]
tipo: entrega
prioridade: normal
tarefa: T-0088
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T01:28:39-04:00
---
# Builds preview Campo e Gestão do e9a65286 FINISHED: dados no SQLite por usuário (passagem do AsyncStorage na 1ª abertura, também na demo), Diagnóstico e medição do critério 5 da T-0084

## Contexto
Builds de preview do Campo e do Gestão a partir do main e9a6528699f7ed9a5f04a56bf14b66e29bce026f, pedidos pelo gerente. Esse commit traz a T-0088: o Campo e o Gestão passam a guardar os dados num banco SQLite por usuário e empresa, e não mais no AsyncStorage. Na 1ª abertura depois de instalar, o app copia os dados antigos para o SQLite. Isso vale também na demo. O commit traz ainda a busca do Catálogo com a pré-seleção FTS5 e o aviso "Organizando o catálogo no aparelho…" (T-0084).
- CI do main nesse commit (run 42345139040): VERDE, com os 9 jobs, inclusive o agregador ci-ok.
- O C:\macuxifdv-check foi para checkout destacado no e9a65286, sem alteração local. `pnpm install --frozen-lockfile` passou sem passo de resolução.
- A mudança é nativa. O plugin expo-sqlite agora é obrigatório no app.config.ts, por isso o build é novo. O package.json, o eas.json e o pnpm-lock.yaml não mudaram desde o 5a1848a9.
- O bundle Android das duas variantes passou antes do build: expo export com as variáveis do perfil preview e a API da demo, 2068 módulos.
- A Expo registrou o gitCommitHash e9a65286 nos dois builds.

## O que preciso / o que mudou
Os dois builds terminaram (FINISHED): Campo em 23 min, Gestão em 21 min.
- Campo (campo-preview, br.com.macuxi.campo): APK https://expo.dev/artifacts/eas/gE4W-QIYRfEImiyWYp65aYcAcjpSa90hB7v7Fp5x9T0.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/dff66d39-142c-4282-8983-1357c6601293
- Gestão (gestao-preview, br.com.macuxi.gestao): APK https://expo.dev/artifacts/eas/FwYAwWBZj2ahGX43nGGS8ETkWYpSAJnQigJwprh781E.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/0558dbc9-7398-415f-94db-e3da6de561a9

**SOBRE A BASE DA DEMO.** As formas de pagamento, os prazos e as faixas escalonadas só aparecem com a base da demo recriada. Se você ainda não recriou depois do APK do 5a1848a9, rode no GitHub: Actions → "demo — recriar base demo" → Run workflow, e digite RECRIAR. Atenção: o roteiro A precisa de pedidos na fila do aparelho ANTES de instalar o APK novo. Por isso, recrie a base antes de preparar o aparelho no passo A1, e não no meio do roteiro. Se recriar depois, o servidor perde o que foi enviado, mas a fila do aparelho não se perde.

Roteiro (§6 do docs/desenho/T-0088.md). Faça no Campo e depois repita no Gestão.

**A. Atualizar por cima do APK anterior sem perder nada (T-0088)**
1. No APK de preview anterior (5a1848a9), entre com o vendedor. Ligue o modo avião. Faça 3 pedidos e 1 visita e deixe 1 pedido como rascunho, sem enviar. No Gestão, use a supervisora e registre o que o perfil dela permite. A aba Perfil tem que mostrar os itens na fila.
2. Ainda no modo avião, instale o APK novo POR CIMA. Não desinstale o anterior, ou os dados se perdem. Abra o app com o mesmo usuário.
3. Se a cópia demorar mais de 0,4 s, aparece a tela "Atualizando os dados do aparelho…" com uma barra de progresso. Ela aparece uma vez só. Se for rápida, a tela nem aparece, e isso não é defeito.
4. Ainda sem sinal: os 3 pedidos e a visita continuam na fila, e o rascunho abre com os mesmos itens.
5. Desligue o modo avião e puxe para sincronizar. Cada pedido e a visita chegam UMA vez (sem repetidos) na lista de Pedidos e no BKO.

**B. Diagnóstico (Perfil → Diagnóstico → mostrar)**
1. A linha tem que ser "Armazenamento: SQLite (macuxi-u-h…-t-demo.db)". O "h…" é o código do usuário da demo, e o "demo" no fim é a empresa da demo.
2. Logo abaixo: "passagem do AsyncStorage: concluída em <data e hora>", o que foi copiado e "dados antigos do AsyncStorage: guardados até o 1º sync completo (ou 7 dias)". Depois do sync do passo A5, abra o app de novo: essa linha passa a "removidos".
3. Se aparecer "AsyncStorage (reserva)" ou "SQLite com erro", copie as linhas e cole no recado. Isso é defeito.

**C. Tela oculta de medição (T-0084, critério 5: busca com 20 mil produtos com aplicação longa)**
1. No Campo, abra o Perfil e toque 7 vezes seguidas, rápido (até 3 s entre os toques), na linha da versão no fim da tela. Abre a tela "Diagnóstico de carga".
2. Toque em "Rodar medição". A tela grava 20 mil produtos de teste com aplicação longa, mais 500 clientes, num banco separado e temporário. Seus dados não são tocados, e o banco de teste é apagado ao sair. Leva alguns minutos: mantenha a tela ligada e não saia dela.
3. No resultado, as 3 linhas do topo dizem OK ou NÃO ATENDE. A que vale para o critério 5 é "Busca do Novo pedido p95 < 300 ms (T-0084, critério 5)", e a "Critério 2 · busca p95 < 300 ms" vale para a aba Catálogo. Os números ficam em "Busca de produto (…): p50 … · p95 …", que é a aba, e em "Busca do Novo pedido (C9, …): p50 … · p95 …". Os dois p95 têm que ficar abaixo de 300 ms. A linha "Tela durante o teste" mostra os quadros acima do limite.
4. Anote também a linha "reindexação completa (índice v3 vazio, das linhas locais): … · reabertura …" e a "1ª busca durante a reindexação". O esperado é "respondeu indexando (a tela varre)", sem travar a tela.
5. Toque em "Copiar ou compartilhar" e cole o relatório inteiro no recado de volta.

**D. Outro usuário no mesmo aparelho**
1. Perfil → Sair. Entre com outro usuário da demo (no Campo, outro vendedor ou o promotor).
2. A fila e os rascunhos do 1º usuário NÃO aparecem para o 2º. No Diagnóstico, o arquivo é outro: muda o "h…".
3. Saia e entre de novo com o 1º usuário: os dados dele continuam lá. Sair não apaga nada. Só o bloqueio do aparelho apaga.

## Pronto quando
O Alexandre instalar os dois APKs por cima dos anteriores e devolver os itens A, B, C e D, com o relatório da medição colado e as linhas do Diagnóstico. Se A, B ou D falharem, quem corrige é o engenheiro-apps (shell), com o engenheiro-software se o defeito for na cópia do SDK. Se o p95 do C passar de 300 ms, quem corrige é o Catálogo (busca FTS5), com o engenheiro-apps. Nada foi alterado no repositório, não houve commit e nenhum segredo foi para o log.
