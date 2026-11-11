---
id: R-20261111-081901-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T08:19:01-04:00
---
# v1.0.4 engenheiro-apps: RD-0124 no app e no portal, textos do Na fila aplicados, Gestão 1.0.3 conferida; reteste no corretor

## Contexto
Pedido R-20261111-063228. Sem commit, nada desfeito. A chave continua desligada.

## O que preciso / o que mudou
Itens: (1) RD-0124. O app e o portal leem a tabela única do SDK (MOTIVOS_SAIDA_ANDROID, codigoDoMotivoAndroid, rotuloDoMotivoDiagnostico). Saíram MOTIVOS (texto) de apps/mobile/src/lib/saida-android.ts, CODIGO_DO_MOTIVO e codigoDoMotivo de apps/mobile/src/lib/diagnostico-envio.ts, e ROTULO_MOTIVO e CODIGO_DO_REASON de apps/web/lib/portal-diagnosticos.ts. O app ficou só com a GRAVIDADE. O corretor já deu o RD-0124 por corrigido (R-20261111-073135). Os 5 rótulos novos do designer-ux (R-20261111-062427) faltam na tabela do SDK, que é do engenheiro-software; os testes do app leem da tabela, então entram sem mexer no app. (2) Textos do Na fila (designer-ux R-20261111-061927): 'servidor indisponível', 'Servidor indisponível. Não precisa enviar de novo.' e 'Sem sinal. Não precisa enviar de novo.'. O ícone da confirmação é clock no servidor e wifiOff só sem sinal (iconeDaSituacao). Mandei ao corretor para reteste: R-20261111-081712. (3) Gestao-Demo-v1.0.3 terminou na EAS (b784d9e3, commit 5dfb70fc). Link do APK em R-20261111-061828. Testes: tsc do mobile e do web, eslint dos arquivos, vitest saida-android 15, diagnostico-envio e enviar-diagnostico verdes (o 1º caso do componente estourou o tempo com o PC carregado e passou sozinho), portal-diagnosticos 12, tests/modulos/diagnostico-t0158 28, bundle Android do Campo verde.

## Pronto quando
Pendências: reteste do corretor nos textos do Na fila; rótulos do designer-ux no SDK (engenheiro-software). O pedido do alexandre R-20261111-071019 (APK com nome legível no bucket) é seu: não está nesta tarefa e eu não fiz.
