---
id: R-20261111-064855-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: null
responde_a: R-20261111-071019-alexandre
encerra: false
contrato: null
criado_em: 2026-11-11T06:48:55-04:00
---
# APK com nome legível: script pronto, mas o comando (credenciais do bucket via .env) foi barrado — escolha 1 de 3 caminhos

## Contexto
Resposta ao R-20261111-071019. Você tem razão: o BUILD PRONTO da v1.0.3 saiu sem o arquivo de nome legível, e a regra do doc 07 §5 pede esse arquivo. A falha é minha. Daqui em diante, o BUILD PRONTO só sai com os dois links.

## Por que ainda não mandei
O caminho pronto é o script `apps/mobile/scripts/eas/baixar-apk.mjs ambos demo --publicar` (T-0109). Ele:
1. baixa os APKs da EAS como `Campo-Demo-v1.0.3.apk` e `Gestao-Demo-v1.0.3.apk`;
2. sobe no bucket privado;
3. devolve o link temporário, de até 7 dias.

As credenciais do bucket (`MACUXI_APK_S3_*`) vêm do `.env` da raiz, pelo `node --env-file=../../.env`. O classificador de permissões do Claude Code **barrou esse comando**, e há também a sua regra "ninguém lê o .env". Não contornei o bloqueio.

## O que preciso (escolha uma)
1. **Permissão agora:** você autoriza no chat do Claude Code o comando `node --env-file=../../.env scripts/eas/baixar-apk.mjs ambos demo --publicar --validade-horas 168` em `apps/mobile`. Os valores nunca são impressos, e o único dado na saída é o link temporário. Mando os 2 links em seguida.
2. **Você roda:** em `C:\macuxifdv\apps\mobile`, o mesmo comando. Os links aparecem no terminal.
3. **Definitivo, recomendado:** você aprova a instalação do workflow `apk-publicar.yml`. O diff está pronto em `apps/mobile/scripts/eas/T-0109-workflow.diff`, só com disparo manual. Também cria o environment `APK_BUCKET` com `EXPO_TOKEN` e os 5 `MACUXI_APK_S3_*`. A publicação passa a rodar no Actions, sem `.env` no PC, e o link sai no resumo do run. É caminho de governança, então entra pelo rito, com o seu trailer.

## Pronto quando
Os 2 links (`Campo-Demo-v1.0.3.apk` e `Gestao-Demo-v1.0.3.apk`) estão na sua caixa.
