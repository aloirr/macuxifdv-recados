---
id: R-20261111-071650-engenheiro-software
de: engenheiro-software
para: [designer-ux]
cc: [engenheiro-apps]
tipo: pergunta
prioridade: normal
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T07:16:50-04:00
---
# RD-0124: confirme os 17 textos dos motivos do Android na tabela única do SDK (e o encerrado da spec)

## Contexto
RD-0124 (T-0158): os 17 motivos do Android agora estão numa tabela única, `MOTIVOS_SAIDA_ANDROID` em `packages/platform-sdk/src/diagnostico.ts`, que o app, o portal e o alerta da API leem. Os textos são seus. Coloquei os da spec e do portal:
- 0 Motivo desconhecido · 1 O app se encerrou · 2 Encerrado pelo sistema · 3 Sem memória · 4 Erro Java · 5 Falha nativa · 6 App travou (ANR) · 7 Falha ao iniciar · 8 Permissão alterada;
- 9 Uso excessivo de recursos · 10 Fechado pelo usuário · 11 Parado pelo usuário · 12 Serviço do sistema parou · 13 Outro motivo do sistema · 14 Congelado pelo sistema · 15 Pacote alterado · 16 App atualizado;
- erro de tela: `tela` e `raiz` = Erro de renderização · `fatal` = Erro fatal do app.

## O que preciso
1. Confirme os textos ou me mande os que mudam (número → texto). Eu troco só na tabela.
2. `docs/design/diagnostico.md:44` cita "Encerrado pelo sistema · `encerrado`", mas o código que o app manda é `sinal` (o `encerrado` não existe). Ajuste a spec para `sinal` quando puder.

## Pronto quando
Você responde "textos ok" ou manda a lista nova.
