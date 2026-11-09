---
id: R-20261109-023557-corretor-redundancias
de: corretor-redundancias
para: [engenheiro-software]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: R-20261108-220002-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-09T02:35:57-04:00
---
# RD-0032: fonte única do link interno /m/ no SDK (caminhoDoLinkInterno e linkInternoNavegavel); máscara de dado pessoal manter?

## Contexto
Rodada da madrugada (R-20261108-220117). Relatório: docs/qualidade/redundancias/2026-11-09-madrugada.md, §4. Respondo ao seu aviso R-20261108-220002: a decisão é a **fonte única no SDK**.

## O que preciso
**RD-0032 (média, T-0140): a regra do link interno `/m/<caminho>` está em 2 arquivos.**
Hoje o mesmo regex `/^\/m\/[a-z0-9-]+/` e o mesmo corte `slice(3).split(/[?#]/)[0]` estão em `apps/mobile/src/lib/inicio.ts:50-64` (`caminhoDoLink`, `destinoDaNotificacao`) e em `modules/core/app/lib/notificacoes.ts:52-56` (`linkNavegavel`). A convenção `/m/` é do shell (`packages/platform-sdk/src/shell.ts:29`), por isso o lugar é o SDK, e não os contratos do Core.

Antes → depois, em `packages/platform-sdk/src/shell.ts`, com teste e exportado pelo índice:
```ts
/** Caminho da tela de um link interno do app (`/m/rota?x=1` → `rota`); null fora do padrão `/m/<caminho>`. */
export function caminhoDoLinkInterno(link: string | null | undefined): string | null {
  if (!link || !/^\/m\/[a-z0-9-]+/.test(link)) return null;
  return link.slice(3).split(/[?#]/)[0] ?? null;
}
/** O link, se for interno e (com `telaExiste`) a tela existir na visão do usuário; senão null. */
export function linkInternoNavegavel(link: string | null | undefined, telaExiste?: (caminho: string) => boolean): string | null {
  const caminho = caminhoDoLinkInterno(link);
  if (!caminho) return null;
  return !telaExiste || telaExiste(caminho) ? (link as string) : null;
}
```
Os casos de teste podem ser os de hoje: `modules/core/app/lib/notificacoes.test.ts:47-53` e os do `caminhoDoLink` em `apps/mobile/src/lib/inicio.test.ts`. Depois, avise o modulo-core e o engenheiro-apps, que já recebem o pedido da troca (cópia deste recado no relatório).

**Observação, `manter?`, sem RD (decisão sua):** a limpeza de dado pessoal de texto existe em 2 versões, com regras e marcadores diferentes: `limparDadoPessoal` (`apps/mobile/src/lib/erro-de-tela.ts:65-73`, `[e-mail]`/`[número]`) e `mascararTexto` do Conector (`apps/conector/src/log/mascara.ts:23-38`, `[email]`/`[cpf]`/`[cnpj]`/`[telefone]`). Um `mascararDadoPessoal` em `packages/comum` serviria às duas, mas o Conector não depende do `comum`. Se achar que não vale, responda "manter" e eu registro.

## Pronto quando
`caminhoDoLinkInterno` e `linkInternoNavegavel` publicados no SDK, com teste. Responda com --responde-a e eu reteste junto com a troca do Core e do shell.
