---
id: R-20261108-231557-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: [designer-ux, engenheiro-software, testes]
tipo: entrega
prioridade: normal
tarefa: T-0140
responde_a: R-20261108-211057-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-08T23:15:57-04:00
---
# T-0140 (shell): tela de erro do kit na raiz e no módulo, erro fatal registrado, Diagnóstico, recado do Início sem tela inexistente; relatos 1/6 sem causa (rastro no v1.0.1)

Contexto: R-20261108-211057 (T-0140). Apliquei à mão a parte do shell do 5441d064 sobre a árvore local, revisei e ajustei pelas revisões do designer-ux (R-20261108-214923) e do engenheiro-software (R-20261108-215731).

O que fiz:
- apps/mobile/index.ts: import com efeito de `src/services/erros-globais`, antes do roteador. O `ErrorUtils` grava o erro fatal e só depois encadeia o tratador anterior, com espera de no máximo 600 ms.
- Tela de erro como `ErrorBoundary` na raiz (`app/_layout.tsx`) e nas telas de módulo (`(tabs)/m/[...caminho].tsx`), com o `TelaDeErro` e os textos do kit (designer-ux) no lugar do layout solto do branch: Tentar de novo, Ir para o Início (só no módulo), Enviar o detalhe ao suporte (padrão T-0088: "Macuxi Campo 1.0.1 · título", sem dado pessoal) e a nota.
- lib/erro-de-tela.ts:
  - o registro sai limpo: e-mail vira [e-mail], número longo vira [número], e objeto lançado guarda só as chaves;
  - o não fatal não apaga o fatal;
  - a linha do Diagnóstico usa os textos do kit;
  - o `console.warn` leva só a origem e o tipo.
- Perfil › Diagnóstico: a linha "Último erro do app: …" (testID diagnostico-ultimo-erro).
- Início: o recado com link para tela que o perfil não tem (`/m/core-rota`) abre a central (`destinoDaNotificacao` com `visao.pagina`). Pedi ao Core que exporte o `linkNavegavel` para o shell apagar a cópia.
- Lint do app com `index.ts` (`eslint src index.ts`). O `services/pdf.ts`, sem uso, foi removido. O `versao.json` está em 1.0.1.

Relatos 1 e 6 (abre e fecha depois de atualizar): sem causa confirmada. Não há como reproduzir sem o aparelho.
- O que sei: o `defineTask` da `macuxi-sync-delta` (expo-background-task/WorkManager) e o do push rodam no escopo global quando o bundle carrega. Depois do MY_PACKAGE_REPLACED, o Android pode acordar o processo para a tarefa logo após a instalação, e o processo antigo é morto na troca do APK.
- Se a queda for de JS, o v1.0.1 agora deixa o rastro "o app fechou" com a pilha em Perfil › Diagnóstico.
- Se for nativa, não fica rastro de JS. Aí é preciso o `adb logcat -b crash` ou o relatório de travamento do Android.
- Proposta para o roteiro da T-0140 (testes): depois de instalar por cima, abrir o app, ir a Perfil › Diagnóstico e copiar a linha "Último erro do app".

Testes e bundles: mobile tsc, eslint (src e index.ts) e vitest verdes (40 arquivos, 376 testes); bundles do Campo e do Gestão verdes (2138 módulos cada); web verde (162 testes). O `coord verificar` não acusou violação.

Pronto quando: o roteiro do APK v1.0.1 mostrar a tela de erro, o recado do Início abrindo a tela certa e o Diagnóstico.
