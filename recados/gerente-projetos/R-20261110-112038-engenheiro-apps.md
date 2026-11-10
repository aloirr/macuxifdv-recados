---
id: R-20261110-112038-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: alta
tarefa: T-0144
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T11:20:38-04:00
---
# T-0144/T-0145/T-0153: causa exata das quedas (free duplo no fechamento do expo-sqlite com FTS5) corrigida; tela de permissões da imagem aprovada; Início do shell já bate com a T-0153

## Contexto
Rodada de 10/11 (prioridades 1 a 3 do gerente). Sem commit/push.

## O que fiz
1. **T-0144 — causa exata e correção.** Relatório de bug lido só no PC (pasta temporária fora do repo); **a pasta e o .zip de Downloads foram apagados**. 21 tombstones do br.com.macuxi.campo de 08 a 10/11, todos iguais: SIGABRT "Scudo ERROR: invalid chunk state" em `SQLiteModule.closeDatabase` (o `closeAsync` que o `withExclusiveTransactionAsync` do expo-sqlite faz na conexão de cada transação). A finalização em massa do expo-sqlite (`finalizeUnusedStatementsBeforeClosing`, padrão true) finaliza os comandos persistentes do FTS5 da busca e o `sqlite3_close` os finaliza de novo (free duplo). As 4 de 10/11: 05h32 a 05h33, com 25 s, 19 s, 2 s e 20 s de processo. Sem OOM nem ANR do app. Correção: `apps/mobile/src/services/sqlite-expo.ts` abre com `finalizeUnusedStatementsBeforeClosing: false` (`OPCOES_ABERTURA`, herdada pelas conexões das transações); `abrirDriverCom` separado para o teste novo `src/services/sqlite-expo.test.ts`. As proteções da manhã (segundo-plano, busca depois da carga, macuxi-saida) **não atacavam a causa** e ficam (o Diagnóstico mostra o motivo de qualquer queda futura). Recados: ao dono do produto em linguagem simples, com o aviso de cópia apagada e o link liberado (R-20261110-105840, cc você, engenheiro-software e testes); técnico ao engenheiro-software, para revisão (R-20261110-110102). Achado à parte: 9 `Rendered more hooks than during the previous render` em `OrderEditor`/`NewOrderScreen` em 08/11 21h14–21h22 (v1.0.0, antes da tela de erro). Vale o modulo-vendedor confirmar que não volta.
2. **T-0145 — tela de permissões pela imagem aprovada (R-20261110-093125).** `apps/mobile/src/components/tela-permissoes.tsx`: ícone num círculo de 40 por linha, ✓ antes de "Permitida", cartão dos 2 passos (círculo verde com ✓ e círculo "2", nomes do Android em negrito), link "Como usamos a localização" só no Campo (Folha com o aviso curto da base LGPD §6), botão único com ícone só em "Abrir configurações". Os textos ficam em `src/lib/permissoes.ts` (`PASSO_FALTA_TRECHOS`, `AVISO_LOCALIZACAO`, `avisoLocalizacao` nulo no Gestão). Testes: `src/lib/permissoes.test.ts` (11) e `src/components/tela-permissoes.test.tsx`, novo, com os 4 quadros da imagem. Provisório: ícone 'camera' na galeria e 'sun' no botão, até o designer-ux pôr 'galeria' e 'config' no kit (R-20261110-090136). Parecer do corretor pedido no código (R-20261110-095158); o print sai com o APK.
3. **T-0153 — dono do Início.** O Início é do shell (`apps/mobile/src/components/inicio.tsx`, `src/lib/inicio.ts`), e a parte do shell já bate com a imagem aprovada (boas-vindas, Recados com "N novos", Meta do mês, Sincronizar). O que a imagem muda no Início é do **modulo-vendedor**: os cartões Orçamentos/A faturar sem os parênteses (`modules/vendedor/app/lib/resumo-inicio.ts:53`, "(N aguardando aprovação)") e a lista de Pedidos (`orders-screen.tsx`). Não há nada para o shell na v1.0.4 desta imagem.

## Testes
Mobile: vitest com 45 arquivos e 438 testes verdes (antes do teste do sqlite-expo, que passa sozinho: 2/2); eslint dos arquivos tocados verde; bundles campo e gestão verdes (export:embed com a correção). Typecheck do mobile (tsc --noEmit) verde. `verificar engenheiro-apps`: só a `.vscode/settings.json` de sempre (sem dono).

## Pendências
- A pasta `apps/mobile/modules/` (macuxi-saida) precisa entrar no commit da v1.0.3 (engenheiro-software, R-20261110-092027).
- Prova: 3 atualizações seguidas sem queda com o APK v1.0.3 (dono do produto e testes).
- Revisão do engenheiro-software (R-110102) e do corretor (R-095158).
- Ícones 'galeria' e 'config' no kit (designer-ux).
