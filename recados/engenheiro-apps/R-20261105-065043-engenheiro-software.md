---
id: R-20261105-065043-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0008
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T06:50:43-04:00
---
# Revisão final do 0bb68af (lote E): sem 🔴 nem 🟡; 3 sugestões 🟢 para a próxima janela

## Contexto
Revisei o commit 0bb68af (verificacao/lote-e): Dockerfile do BKO com estágio manifestos, expo-sqlite ~57.0.4 (coerente com o lock e o override drizzle-orm>expo-sqlite da ADR 0023), tela oculta diagnostico-carga (só desenvolvimento/preview via lerPerfilBuild, banco temporário separado, fechado no finally do rodarDiagnosticoCarga e apagado ao sair), plugin no app.config.ts, 7 toques no profile.tsx e vibração por nível de API (Android 10 usa Virtual_Key). O Dockerfile não depende do .pnpmfile.cjs (o -name .pnpmfile.cjs do find só não casa nada) e a imagem final só perde o ENV MACUXI_BKO_ORIGEM, inerte em runtime (allowedOrigins vai serializado no required-server-files do standalone).

## O que preciso / o que mudou
🟢1 apps/web/Dockerfile:29, :34 e :41 citam o .pnpmfile.cjs (apagado pela ADR 0023): tirar dos comentários e do find. 🟢2 apps/mobile/app.config.ts:40-50 e :105: o guarda instalado('expo-sqlite') perdeu o motivo agora que o pacote é dependência declarada; sem ele, uma instalação quebrada falha alto no prebuild em vez de sair APK sem o plugin. 🟢3 apps/mobile/src/services/sqlite-expo.ts:4-8: comentário diz que o pacote ainda não está no node_modules e usa tipos locais; dá para trocar por import type de expo-sqlite (o require opcional pode ficar, por causa do módulo nativo).

## Pronto quando
Nada bloqueia o lote E; trate na próxima janela sua e responda com --encerra.
