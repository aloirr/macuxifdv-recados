---
id: R-20261108-161544-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: [testes]
tipo: entrega
prioridade: normal
tarefa: T-0124
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T16:15:44-04:00
---
# RD-0001 corrigido no shell ('Meta do mês' em dia não útil) + T-0133 encaminhada ao modulo-vendedor

# Contexto
T-0124 / RD-0001 (pedido R-20261108-144456 do testes; decisão R-20261108-135639; RN-CORE-26) e T-0133 (R-20261108-142901 do designer-ux).

# O que fiz
1. RD-0001, só no shell (o Core já entrega `situacao: 'dia_nao_util'`, `meta_dia: null`; o modulo-core confirmou em R-20261108-144745; nenhuma regra duplicada, nenhuma fórmula mudou):
   - apps/mobile/src/lib/inicio.ts: `DesenhoMetaDeHoje.periodo` ('hoje' | 'mes') e `rotuloDaMeta(periodo, equipe, indicador)`. `dia_nao_util` e `do_mes` (cobertura) saem com período 'mes'; o `de` do dia não útil deixou de repetir "no mês".
   - apps/mobile/src/components/inicio.tsx: o rótulo do cartão sai de `rotuloDaMeta` (antes era fixo "Meta de hoje" / "Meta de hoje da equipe").
   - Domingo 08/11, renderizado: "Meta do mês | R$ 553 | de R$ 180.000 | Hoje não é dia útil · faltam R$ 179.447 no mês". Na Gestão: "Meta do mês da equipe". Dia útil sem mudança: "Meta de hoje", "de R$ 9.969", "Faltam R$ 9.969 hoje".
   - Mudou só o rótulo da cobertura principal (indicador só do mês): "Meta do mês · Cobertura". Nenhum número mudou.
2. T-0133: o shell (apps/web, apps/mobile) não desenha histórico de pedido. O do BKO fica em modules/vendedor/web/components/orders/order-drawer.tsx:237-251 e foi pedido ao modulo-vendedor (R-20261108-154931), com os pontos do shell para K/L/M: 🟡 new-order-screen.tsx:740 e :745 somam insets.bottom dentro das abas, onde a barra do shell já reserva esse espaço. Resposta ao designer-ux em R-20261108-155053. A revisão técnica de L e M fica para quando estiverem prontas.

# Testes
- apps/mobile: vitest 349/349 verdes (inicio.test.ts: caso do dia não útil reescrito e bloco RD-0001 com dia útil, domingo, fuso de Manaus e virada de mês; inicio-tela.test.tsx: domingo no Campo e na Gestão, dia útil sem regressão). eslint verde.
- tests/modulos/meta-de-hoje-rd0001-t0124.test.ts: M1–M4 e M7–M11 verdes; M5/M6 passam (o testes já os voltou para `it`).
- tsc do apps/mobile: VERMELHO por arquivo alheio, modules/gestor/app/index.ts:31 (TS2345, `extensoesDaFicha<ComponentType>(AvisoEtapaEquipe)`, da entrega R-20261108-154320). Pedido ao modulo-gestor em R-20261108-155430 (cc gerente). Na segunda rodada também apareceram erros em modules/vendedor (novo-pedido-abas.tsx:551 useEffect, new-order-screen.tsx:27/717/747 FolhaSalvar/onSalvar/apenas_salvar), da L em andamento. Meus arquivos não têm erro de tipo.
- Bundles (expo export android): Campo e Gestão gerados sem erro, 2123 módulos cada (o código do RD-0001 entra no bundle).
- coord verificar engenheiro-apps: OK, sem violações.

# Pendências
- tsc do apps/mobile depende da correção do modulo-gestor (R-20261108-155430); quando ele responder, rodo de novo e confirmo.
- Revisão técnica de L e M (T-0137/T-0138) quando o modulo-vendedor avisar.
