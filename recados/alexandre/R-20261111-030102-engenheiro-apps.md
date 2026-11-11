---
id: R-20261111-030102-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T03:01:02-04:00
---
# T-0158 (shell): app sem 'Vai junto' com as 5 saídas, Portal › Diagnósticos e chave remota; constante do APK desligada

## Contexto
A T-0158 entra no build das 05h (R-20261110-212608). As imagens foram aprovadas em R-20261110-192152: sem "Vai junto", com as 5 últimas saídas do Android e o último erro do app. Não fiz commit nem push.

## O que foi feito
**App: Perfil › Diagnóstico, no Campo e no Gestão.** Segue a imagem `docs/design/telas/T-0158-diagnostico-app.png`, sem a linha "Vai junto".
- `apps/mobile/src/components/enviar-diagnostico.tsx`:
  - botão secundário "Enviar diagnóstico";
  - "Últimos envios": selo, nº ou o motivo, 2ª linha só no envio automático, data e a leitura do TalkBack;
  - folha com exemplo, ajuda de dado pessoal e contador 0/1000;
  - print anexado: miniatura, "Só a equipe Macuxi vê." e Remover;
  - Enviar com "Enviando…"; a confirmação aparece na mesma folha, com vibração leve só no Enviado.
- `apps/mobile/src/lib/diagnostico-envio.ts`:
  - textos finais;
  - `ultimas_saidas`: até 5, pilha ≤ 1000, e a saída da queda sempre dentro;
  - 429 vira "limite da hora";
  - RD-0123: a linha recusada diz "recusado";
  - "sem sinal" só quando falta sinal; 404 ou 5xx viram "aguardando o servidor" (achado do corretor).
- `services/diagnostico.ts`:
  - as 5 saídas vão no envio do botão e no automático;
  - **chave remota**: o app lê `recursos.diagnosticos` do `/v1/saude` a cada sessão aberta e guarda no aparelho (`useDiagnosticoNuvem`).
- `profile.tsx` e `plataforma.tsx` ligam o botão e a fila por essa chave.
- `services/arquivos.ts`: `uriLocal`, para a miniatura do print.
- **No build: `DIAGNOSTICO_NUVEM_LIGADO = false` e `QUEDA_AUTOMATICA_LIGADA = false`.**

**Portal › Diagnósticos, só para o super-admin.** Segue a imagem `docs/design/telas/T-0158-diagnosticos-portal.png`.
- Cabeçalho com "Empresas | Diagnósticos", só para o time Macuxi (`components/portal/base.tsx`).
- Lista (`components/portal/tela-diagnosticos.tsx`, `app/config/diagnosticos/page.tsx`):
  - filtros no endereço: versão, aparelho, empresa, motivo, origem e período (padrão 7 dias);
  - "Mostrar mais 50".
- Detalhe (`app/config/diagnosticos/[id]/page.tsx`):
  - relato, as 5 saídas (com Copiar e "… mais N linhas") e o último erro;
  - origem, print (lido como Blob) e recado.
- O admin do cliente vê "Esta área é só do time Macuxi."
- Apoio: `lib/portal-diagnosticos.ts`, `lib/portal-rotas.ts` e `blobDoPortal` em `lib/portal-api.ts`.

**Testes e builds:**
- mobile: 31/31 nos testes do diagnóstico; a suíte inteira deu 520/520 antes dos últimos ajustes de texto;
- web: 12/12;
- tsc do mobile e do web sem erros; eslint limpo;
- bundle gestao verde com o código final; o bundle campo passou com o código anterior aos ajustes de texto, e a última rodada dele estava rodando no momento desta entrega (a 1ª tentativa estourou o tempo por carga do PC);
- `next build` verde.

## Chave (para o BUILD PRONTO)
A chave do APK fica desligada. **Dá para ligar depois sem build novo:** o servidor já devolve `recursos.diagnosticos` só com `MACUXI_DIAGNOSTICOS=1` e `MACUXI_DIAGNOSTICOS_APP=1` (R-20261111-024230). Ligar é pôr `MACUXI_DIAGNOSTICOS_APP=1` no `.env` da VM, por decisão do dono do produto (R-20261111-004711).

O que ainda falta para ligar:
1. **banco-dados:** a 0058 com `ultimas_saidas`. Sem ela, todo envio com saídas dá 500.
2. **designer-ux:** o parecer não chegou até agora (R-20261110-232239). Ele precisa validar 2 textos novos: "aguardando o servidor" e "Vai sozinho quando o servidor responder. O número aparece em Últimos envios."
3. **corretor-redundancias:** parecer "segura". RD-0123 e o "sem sinal" estão corrigidos. O RD-0124 (média: os motivos do Android numa tabela única no SDK) foi pedido em R-20261111-012244 e fica para a v1.0.4 se o SDK não ficar pronto.

## Pendências
- O `verificar` só acusa `.vscode/settings.json` (sem dono; não fui eu).
- O EAS do build das 05h sai depois do push, com os links ao dono do produto (R-20261110-234624).
