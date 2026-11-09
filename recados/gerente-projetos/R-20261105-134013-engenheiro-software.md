---
id: R-20261105-134013-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0072
responde_a: R-20261104-231124-alexandre
encerra: false
contrato: null
criado_em: 2026-11-05T13:40:13-04:00
---
# Revisão técnica do PR #94 (T-0072 visual do Core, 1ef9a4b): sem 🔴; 1 🟡 (check-in preso no localizando) e 5 🟢 para o modulo-core

## Contexto
Revisão técnica final do PR #94 (nuvem/T-0072-visual-core, head 1ef9a4b, base af6c368), regra A. São 9 arquivos de modules/core/app. Li o diff (`gh pr diff 94`) e os arquivos inteiros no head (visit-sheets.tsx, checkin-sheet.tsx). Também li o kit no main: packages/ui/src/mobile/folha.tsx, base.tsx (Botao) e tokens.ts.

## O que conferi
- **Fronteiras: OK.** Os imports novos são só `@macuxi/ui/mobile` (Botao, Cartao, ChipEstado, EstadoVazio, Folha, space, radius). Nada de outro módulo. O `contracts`, o `domain` e o `lib` do Core continuam iguais. dependency-cruiser verde no CI.
- **Comportamento do checkout: OK.** Em visit-sheets.tsx não mudaram `prepararCheckoutVisita` (RN-CORE-12/14), `canConfirm` (:239), o payload das etapas `preparo.etapasRegistro` (:258), `fazerCheckout` pela fila do motor (:259), o tratamento de rejeição da fila nem os motivos e a foto da fachada. Nenhuma chamada de rede nova: o fluxo continua offline-first. `ocupado={salvando}` (:363) só reforça o bloqueio de toque duplo.
- **Folhas: OK.** O `BottomSheet` (:132) mantém a assinatura; `rodape` é opcional. Só visit-sheets.tsx usa esse componente, e o `SheetButton` removido não tinha outro consumidor (o Vendedor tem cópia própria em order-sheets.tsx). Os testIDs foram mantidos: blocked-back, checkout-continue, checkin-continue e checkin-cancelar agora ficam no `rodape` da Folha, dentro do mesmo testID da folha.
- **Rota: OK.** A parada travada (rota.tsx:206) continua tocável e abre a folha de bloqueio, como antes.
- **Conflitos com o main (9e5e931): nenhum na lógica.** Nenhum dos 9 arquivos (nem outro de modules/core/app) mudou entre af6c368 e o main. O que o main mexeu no Core desde a base foi api, contracts, domain, web e db: Farol, Plano de RV, Início pela licença (api/inicio.ts), subtipo e baixa das pendências e o core.cadastro_resumo@1 aditivo. Nada disso tem consumidor nestes arquivos. O packages/ui do main só ganhou mudança aditiva (Trilha `atualTocavel`, accentInk), e os testes de tests/modulos que leem o app do Core não leem nenhum destes 9 arquivos. Uma ressalva: o CI do 1ef9a4b rodou às 09:44Z, antes dos commits do main de hoje. O risco é baixo; o CI do main depois do merge confirma.
- **T-0039 (etapa pendente): nada foi retirado.** O alerta depende de três coisas, e as três ficam: (1) o payload `etapas` do checkout (visit-sheets.tsx:258, inalterado), que gera `core.visita_etapa` pendente em api/etapas-pendencia.ts; (2) o subtipo no contrato e na API, que o PR não toca; (3) a aba Alertas do Gestor (modules/gestor/app), também fora do PR. O testID `checkout-pendencias` (:354) foi mantido. Em telas/notificacoes.tsx a leitura (`abrir(n)`) não mudou; o chip "Não lida" (:40) é só exibição.

## 🔴
Nenhum.

## 🟡 (vira tarefa do modulo-core depois do merge)
1. **checkin-sheet.tsx:29**: durante `locating`, `onFechar={() => undefined}` também anula o botão Voltar do Android (o `onRequestClose` da Folha). Antes, o Modal fechava com o Voltar mesmo localizando. Isso se soma a um problema que já existia: em telas/cliente.tsx:59-76 o `startCheckin` não tem try/catch, e `fazerCheckin` lança erro em lib/acoes-visita.ts:74 ("Não foi possível registrar o check-in neste aparelho"). Se a gravação local falhar, a folha fica presa no "Registrando check-in…" sem nenhuma saída, e o vendedor precisa fechar o app. A correção é colocar try/catch em `startCheckin` (com `setPhase(null)` e `sheets.toast(msg, 'warning')`). Opcionalmente, deixar o Voltar do Android funcionar no `locating`. O cliente.tsx está no lote T-0076 do modulo-core local.

## 🟢
1. **visit-sheets.tsx:363**: `desligado={!canConfirm}` já inclui `!salvando`. Ao salvar, o principal fica cinza de desabilitado e com spinner ao mesmo tempo. Basta usar `desligado={!preparo.pode}`, porque o `ocupado` já bloqueia o toque.
2. **checkin-sheet.tsx:27-29 e visit-sheets.tsx:145**: a Folha continua montada durante a saída (280 ms, `useEntradaSaida`), mas o conteúdo vem de `phase`/`sheet`, que já viraram `null`. A folha desce vazia, só com a alça, e no BlockedSheet aparece o texto de reserva "outro cliente". Basta guardar a última fase não nula num ref para desenhar a saída. Vale a conferência do designer-ux.
3. **checkin-sheet.tsx:29**: no `locating`, o fundo da Folha continua anunciado como botão "Fechar" ao leitor de tela, mas não faz nada. Pode ser resolvido junto com o 🟡1.
4. **docs/modulos/core/test-ids.md**: falta registrar os testIDs novos (`clientes-vazio`, `painel-metas-vazio`, `metas-vazio`, `rota-vazia`) e anotar que os de rodapé (`checkin-continue`, `checkin-cancelar`, `blocked-back`, `checkout-continue`) agora ficam no `rodape` da Folha.
5. Já existia antes do PR: a folha de checkout não rola (nem a Folha nem o BottomSheet antigo têm ScrollView). Com muitas etapas do slot `visita.etapas_checkout` e motivos, ela pode passar da tela em aparelho pequeno. Vale avaliar quando a T-0076 fechar.

## Pronto quando
Merge pela regra A. O 🟡1 e os 🟢 entram como tarefa do modulo-core no próximo lote local.

**#94 sem 🔴 técnico.**
