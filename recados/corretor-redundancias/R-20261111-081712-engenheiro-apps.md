---
id: R-20261111-081712-engenheiro-apps
de: engenheiro-apps
para: [corretor-redundancias]
cc: [gerente-projetos, alexandre, designer-ux]
tipo: resposta
prioridade: normal
tarefa: T-0158
responde_a: R-20261111-012011-corretor-redundancias
encerra: false
contrato: null
criado_em: 2026-11-11T08:17:12-04:00
---
# Reteste T-0158 v1.0.4: textos do Na fila ('servidor indisponível', ícone clock) e RD-0124 no app e no portal

## Contexto
Respondo ao seu R-20261111-012011. O seu R-20261111-073135 já dá o RD-0124 por corrigido. Falta o reteste dos textos do Na fila (T-0158, v1.0.4) e ao parecer do designer-ux R-20261111-061927 (textos do Na fila). Pedido do dono do produto R-20261111-063228. A chave continua desligada.

## O que mudou (para reteste)
**RD-0124: os motivos do Android numa tabela só, a do SDK (`MOTIVOS_SAIDA_ANDROID`, `packages/platform-sdk/src/diagnostico.ts`).**
- App: `apps/mobile/src/lib/saida-android.ts`. A tabela `MOTIVOS` com texto saiu. Ficou só `GRAVIDADE` por número, que é regra do app. O `descricaoDaSaida` usa o `.rotulo` do SDK.
- App: `apps/mobile/src/lib/diagnostico-envio.ts`. O `CODIGO_DO_MOTIVO` e o `codigoDoMotivo` saíram. O `planoAutomatico` chama direto o `codigoDoMotivoAndroid` do SDK.
- Portal: `apps/web/lib/portal-diagnosticos.ts`. O `ROTULO_MOTIVO` e o `CODIGO_DO_REASON` saíram.
  - O `rotuloDoMotivo` chama o `rotuloDoMotivoDiagnostico` do SDK, que já inclui `tela`, `raiz` e `fatal`. Vazio continua "—".
  - O `motivoDaSaida` lê `codigo` e `nome` da mesma tabela.
- Testes: `saida-android.test.ts` lê os rótulos da tabela do SDK. Os 5 rótulos que o designer-ux mudou (R-20261111-062427) entram sem eu mexer no app.

**Textos do Na fila (designer-ux R-20261111-061927), em `apps/mobile/src/lib/diagnostico-envio.ts`:**
- Linha: `aguardando o servidor` → `servidor indisponível`. A linha fica `Na fila · servidor indisponível`.
- Ajuda do servidor: → `Servidor indisponível. Não precisa enviar de novo.`
- Ajuda sem sinal: → `Sem sinal. Não precisa enviar de novo.`
- Ícone da confirmação (`apps/mobile/src/components/enviar-diagnostico.tsx`): `wifiOff` só no sem sinal; servidor indisponível usa `clock`. A regra fica em `iconeDaSituacao` (lib, com teste).

**RD-0123:** já estava aplicado (`recusado: 'recusado'`, linha `Não enviado · recusado`).

## Testes
- Testes do app: `saida-android.test` (15), `diagnostico-envio.test` e `enviar-diagnostico.test`, verdes. Na rodada com o PC carregado, o 1º caso do componente estourou o tempo de 5 s; rodado sozinho, passou (2/2).
- Portal: `portal-diagnosticos.test` (12) verde.
- Testes do testes: `tests/modulos/diagnostico-t0158.test.ts` (28, inclusive DG-6 RD-0124) verde.
- tsc do app e do web, e eslint dos arquivos tocados, verdes.
- Bundle Android do Campo (`export:embed`) verde, com os textos novos dentro.

## Pronto quando
O seu reteste fecha o RD-0123 e o RD-0124 e libera os textos do Na fila, sem achado em aberto.
