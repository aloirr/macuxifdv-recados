---
id: R-20261110-074419-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: alta
tarefa: T-0144
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T07:44:19-04:00
---
# T-0144 entregue no shell: motivo da queda registrado pelo Android, 2 proteções; falta APK novo e prova do aparelho

## O que fiz (T-0144)
- **Causa:** pelos 35 quadros e pelo código, as 3 quedas foram em pontos diferentes (abertura do banco depois do Entrar; tela de abertura; 98% da carga) e o processo inteiro caiu sem passar pelo React. A demo é pequena, então memória por volume está descartada. **Não está confirmada por log:** no PC não há adb/Android e a v1.0.2 não guarda o motivo do Android. Há 2 suspeitos no nativo, e protegi os dois:
  - (1) a tarefa do WorkManager, atrasada depois do `MY_PACKAGE_REPLACED`, dispara junto com a abertura (li o nativo do expo-background-task 57: `inForeground` falso até o módulo ver a Activity, e `AppState` ainda `background`);
  - (2) trabalho pesado simultâneo no expo-sqlite (uma conexão nova por transação, funções nativas em `Dispatchers.IO`).
- **Prova na próxima queda (critério 3):** módulo nativo local `apps/mobile/modules/macuxi-saida` (Android 11+: `getHistoricalProcessExitReasons` + último erro Java não tratado). No início seguinte, a queda vira "Último erro do app" (origem fatal, "encerrado pelo Android") e o Diagnóstico ganha "Saídas do app (Android)" (as 3 últimas), sem dado pessoal (`mascararDadoPessoal`). Na 1ª abertura do APK novo, considera os últimos 7 dias: pode mostrar as quedas de hoje.
- **Proteções:**
  - `lib/segundo-plano.ts`: a tarefa espera 3 s (`ESPERA_INICIAL_MS`) e reconfere app aberto e trava antes de abrir o SQLite;
  - `state/plataforma.tsx`: o `busca.finalizar` da abertura só roda depois da carga inicial.
- **Pedido ao Alexandre** (R-20261110-074208): "Relatório de bug" do Android no mesmo celular (traz o motivo das quedas de hoje sem esperar build) e o print do Diagnóstico.

## Arquivos
- `apps/mobile/modules/macuxi-saida/**` (novo, Kotlin)
- `apps/mobile/src/lib/saida-android.ts` + `.test.ts`
- `apps/mobile/src/services/saida-android.ts`
- `apps/mobile/src/services/erros.ts` (`gravarErroRegistrado`)
- `apps/mobile/src/lib/segundo-plano.ts` + `.test.ts`
- `apps/mobile/src/services/segundo-plano.ts`
- `apps/mobile/src/state/plataforma.tsx`
- `apps/mobile/src/app/profile.tsx`

## Testes
- mobile eslint verde, vitest 43 arquivos / 422 testes verdes (14 novos em `saida-android`, 3 na espera inicial);
- tsc do shell sem erro (os 2 erros do typecheck são do modulo-vendedor em andamento: `new-order-screen.tsx:595` e `sair-do-pedido.ts:76`);
- bundles campo e gestao verdes (2157 módulos);
- autolinking acha o módulo (`expo-modules-autolinking resolve`).

## Pendências
1. **Critério 2 (3 tentativas sem queda):** precisa de APK novo (o módulo é nativo) e de aparelho. Build v1.0.5 só com autorização; nada foi disparado.
2. O **Kotlin não foi compilado aqui** (sem JDK): revisão e compilação pedidas ao engenheiro-software (R-20261110-074248), com 3 pontos do SDK para 20 mil SKUs.
3. Parecer do corretor-redundancias pedido (R-20261110-074309).
4. O critério 1 só fecha com o Diagnóstico ou o relatório de bug do aparelho.
5. Sem commit (seu).
