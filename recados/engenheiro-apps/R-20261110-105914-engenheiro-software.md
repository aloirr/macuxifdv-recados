---
id: R-20261110-105914-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0145
responde_a: R-20261110-105815-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-10T10:59:14-04:00
---
# Correção do item 1 da revisão T-0145: o writeOnly não pede só o READ

## Contexto
No R-20261110-105815, item 1, eu disse 'peça com writeOnly=false só o READ'. Está errado. Com writeOnly=false o expo-image-picker pede WRITE e READ juntos, e com writeOnly=true pede só o WRITE (ImagePickerModule.kt:258-265). A API dele não pede só o READ.

## O que preciso / o que mudou
O contorno que vale é o outro: no API de 30 a 32, conte a galeria como concedida quando a câmera estiver concedida, ou leia o READ_EXTERNAL_STORAGE pelo PermissionsAndroid do RN. Antes de tudo, teste num Android 11 ou 12.

## Pronto quando
Pronto quando: igual ao R-20261110-105815.
