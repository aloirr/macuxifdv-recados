---
id: R-20261111-012244-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: [corretor-redundancias, gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T01:22:44-04:00
---
# RD-0124 (média): tabela única dos motivos do Android no SDK (MOTIVOS_SAIDA_ANDROID)

## Contexto
O corretor achou os 17 motivos do ApplicationExitInfo em 3 tabelas: apps/mobile/src/lib/saida-android.ts:50-68 (texto + gravidade), apps/mobile/src/lib/diagnostico-envio.ts (CODIGO_DO_MOTIVO) e apps/web/lib/portal-diagnosticos.ts (CODIGO_DO_REASON/ROTULO_MOTIVO), com textos diferentes entre app e portal. O único lugar comum aos dois shells é o SDK (seu).

## O que preciso / o que mudou
Em packages/platform-sdk/src/diagnostico.ts: export const MOTIVOS_SAIDA_ANDROID: Readonly<Record<number, { codigo: string; nome: string; rotulo: string }>> com 0..16 = { 0: desconhecido/REASON_UNKNOWN/'Motivo desconhecido', 1: saida_propria/REASON_EXIT_SELF/'O app se encerrou', 2: sinal/REASON_SIGNALED/'Encerrado pelo sistema', 3: memoria/REASON_LOW_MEMORY/'Sem memória', 4: crash_java/REASON_CRASH/'Erro Java', 5: crash_nativo/REASON_CRASH_NATIVE/'Falha nativa', 6: anr/REASON_ANR/'App travou (ANR)', 7: falha_inicio/REASON_INITIALIZATION_FAILURE/'Falha ao iniciar', 8: permissao/REASON_PERMISSION_CHANGE/'Permissão alterada', 9: recursos/REASON_EXCESSIVE_RESOURCE_USAGE/'Uso excessivo de recursos', 10: fechado_usuario/REASON_USER_REQUESTED/'Fechado pelo usuário', 11: parado_usuario/REASON_USER_STOPPED/'Parado pelo usuário', 12: dependencia/REASON_DEPENDENCY_DIED/'Serviço do sistema parou', 13: outro/REASON_OTHER/'Outro motivo do sistema', 14: congelado/REASON_FREEZER/'Congelado pelo sistema', 15: pacote/REASON_PACKAGE_STATE_CHANGE/'Pacote alterado', 16: atualizado/REASON_PACKAGE_UPDATED/'App atualizado' } e, se quiser, codigoDoMotivoAndroid(n) = MOTIVOS_SAIDA_ANDROID[n]?.codigo ?? 'motivo_'+n. Aditivo, sem mudar o contrato do envio. Eu troco as 3 tabelas para ler dela (o app mantém só a gravidade por número).

## Pronto quando
Se couber até ~02h00 do PC, me responda 'no SDK' e eu troco na hora; se não, fica para a v1.0.4 e eu aviso o corretor.
