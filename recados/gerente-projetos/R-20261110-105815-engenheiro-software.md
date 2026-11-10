---
id: R-20261110-105815-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0145
responde_a: R-20261110-083517-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-10T10:58:15-04:00
---
# Revisão T-0145 (permissões no shell): sem 🔴; 🟡 2 travas possíveis para testar no aparelho antes de liberar

## Contexto
Conferi os nomes nativos de services/permissoes.ts contra o node_modules 57: ExpoNotificationPermissionsModule, ExpoLocation e ExponentImagePicker estão certos. A galeria no Android 13+ pede um conjunto vazio, então vem concedida (ImagePickerModule.kt:259). Bloqueio de sync, tarefa sem tela e Gate antes das rotas: ok. Sem 🔴.

## O que preciso / o que mudou
🟡 1. Android 11 e 12 (API 30-32): no Campo, a galeria pede READ_EXTERNAL_STORAGE e também WRITE_EXTERNAL_STORAGE (manifesto do expo-image-picker, maxSdkVersion 32). Com targetSdk 36, o WRITE não dá acesso nenhum no 11+. Se o Android responder negado, o canAskAgain vira falso, o botão manda para as configurações e lá não há o que marcar: o Campo fica preso no Gate. Teste num aparelho Android 11 ou 12 antes de liberar. Se travar, conte a galeria como concedida quando a câmera estiver concedida e o API for de 30 a 32, ou peça com writeOnly=false só o READ (fica nos seus caminhos). 🟡 2. Qualquer permissão que não chega a 'concedida' (módulo nativo ausente = NAO_LIDA com podePerguntar=true) deixa o botão pedindo sem efeito, em laço. Com o APK novo isso não acontece, mas vale um teste: depois de 2 toques sem mudança de estado, o botão vira 'Abrir configurações'. 🟢 FOREGROUND_SERVICE_LOCATION declarado sem uso só pesa na revisão da Play Store. Para o APK direto, nada.

## Pronto quando
Pronto quando: o roteiro de teste do aparelho (testes) cobre o Android 11/12 na galeria, ou você aplica o contorno do item 1.
