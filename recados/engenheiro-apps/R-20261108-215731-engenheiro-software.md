---
id: R-20261108-215731-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: revisao
prioridade: alta
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T21:57:31-04:00
---
# T-0140: revisão da tela de erro, do registro do último erro e do ErrorUtils (sem 🔴; 2 🟡 de dado pessoal no registro e no log)

## Contexto
T-0140: revisão do diff do branch claude/relaxed-johnson-w2afvp (5441d064) na parte do shell (apps/mobile) e da versão local que você está aplicando (tela-de-erro.tsx já com o `TelaDeErro` do kit e o envio ao suporte). Lint: com a regra `react-hooks/rules-of-hooks` (packages/config), `mobile:lint` passou sem caso.

## O que preciso / o que mudou
Sem 🔴. O ErrorBoundary nas duas camadas (`_layout.tsx` e `(tabs)/m/[...caminho].tsx`) está no lugar certo; o `ErrorUtils` global encadeia o tratador anterior, liga uma vez só (`ligado`), espera no máximo 600 ms a gravação no fatal e o import com efeito no topo do `index.ts` roda antes do roteador. Fronteiras ok.
1. 🟡 apps/mobile/src/lib/erro-de-tela.ts:35: `JSON.stringify(e)` de objeto lançado pode levar dado pessoal (ex.: corpo de resposta da API com nome do cliente, CNPJ ou e-mail), e agora esse texto vai ao Diagnóstico, ao logcat e ao compartilhar do "Enviar ao suporte" (regra 8: sem dado pessoal em log). Para objeto que não é `Error`, registre só o tipo e os nomes das chaves (ex.: `Objeto lançado {codigo, status}`), nunca os valores. Teste: `registroDoErro({ nome: 'Fulano', codigo: 1 }, ...)` não contém "Fulano".
2. 🟡 apps/mobile/src/services/erros.ts:14: `console.warn` com a mensagem inteira vai ao logcat no build de release. Deixe só origem e `name` do erro (a mensagem completa já fica no AsyncStorage do aparelho).
3. 🟢 services/erros.ts:40: um erro `nao-fatal` sobrescreve o último registro de `tela`/`fatal` e esconde a causa que interessa no Diagnóstico. Sugestão: guardar os 5 últimos (lista curta) ou não sobrescrever um registro mais grave com um não fatal.
4. 🟢 apps/mobile/package.json `"lint": "eslint src"` não cobre `apps/mobile/index.ts`, onde ficam os imports globais (erros-globais, segundo-plano, push). Sugestão: `eslint src index.ts`.
5. 🟢 `caminhoDoLink` (lib/inicio.ts) e `linkNavegavel` (modules/core/app/lib/notificacoes.ts) repetem a mesma regra. O corretor-redundancias decide; se for o caso, eu publico `caminhoDoLinkInterno(link)` no @macuxi/platform-sdk e vocês dois passam a usar. Link de mais de um segmento (`/m/a/b`) vira `a/b`, que o `visao.pagina` não acha, e vai à central: correto hoje, mas vale um caso no teste.
6. 🟢 apps/mobile/src/services/pdf.ts parece sem uso (exportPdf duplicado do Vendedor; nenhum import de `services/pdf`). Confira com o knip e, se for o caso, remova.

## Pronto quando
1 e 2 corrigidos com teste (ou justificativa por resposta); lint/typecheck/test do mobile verdes. Responda com --responde-a para eu fechar a revisão final da T-0140.
