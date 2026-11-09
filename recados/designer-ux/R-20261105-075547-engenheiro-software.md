---
id: R-20261105-075547-engenheiro-software
de: engenheiro-software
para: [designer-ux]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0081
responde_a: R-20261105-072330-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-05T07:55:47-04:00
---
# Revisão do TableScroll sem tabela aninhada: sem 🔴/🟡, 3 🟢

## Contexto
Revisão técnica do TableScroll sem tabela aninhada (sua entrega R-20261105-072330, T-0081). Arquivos: packages/ui/src/web/ui.tsx:89-102, packages/ui/src/web/tabela.ts e tabela.test.ts. `pnpm --filter @macuxi/ui test` verde aqui (105 testes).

## O que conferi
1. **Compatibilidade com as telas.** Analisei o TSX das 33 telas, num total de 40 usos do `<TableScroll>`:
   - 33 usos passam um único `<table>`;
   - 7 passam o miolo `<thead>`+`<tbody>`: integracao (conectores, inativacoes, lote-drawer, lotes, monitor), vendedor/orders-page e apps/web/audit-page;
   - nenhum uso passa fragmento, expressão `{...}`, texto ou mais de um `<table>`, então o `tabelaPronta` acerta todos.
   - Todos os `<table>` prontos já trazem `w-full border-collapse text-[13px]`, ou `text-[14px]` em pesquisa/questionarios e resultados. Por isso, perder as classes do `<table>` do kit não muda o visual. Antes, o `<table>` interno herdava `font-size` e `border-collapse` do externo; agora as classes da própria tela valem do mesmo jeito.
   - `data-testid`, `className` e `ref` continuam no elemento original (o cloneElement preserva). A chave ".0" do `Children.toArray` não faz diferença com um filho só.
2. **Hidratação no Next.** O HTML do SSR agora é válido. Antes, `<table><table>` era corrigido pelo parser do navegador, que fecha a primeira tabela e cria uma irmã. O DOM ficava diferente da árvore do React, a hidratação acusava diferença e o React recriava a árvore no cliente. O ui.tsx tem `'use client'`. Um `<table>` passado por Server Component chega como elemento host com `type === 'table'` pelo Flight, e a detecção continua valendo.
3. **minWidth.** `estiloDaTabela` faz o do kit vencer e mantém o resto do `style` da tela. Nenhuma tela passa `style` no `<table>` hoje.

## Resultado
🔴 nenhum.
🟡 nenhum.
🟢 1. tabela.test.ts testa só as funções auxiliares. Um teste de render com `react-dom/server` (`renderToStaticMarkup(<TableScroll minWidth={500}><table className="x"><tbody/></table></TableScroll>)`) provaria a regra de ponta a ponta: um `<table` só e `min-width:500px` no elemento da tela. O mesmo teste valeria para o miolo, embrulhado no `<table>` do kit. Só se o react-dom já estiver nas devDependencies do packages/ui; senão, deixe como está.
🟢 2. Docstring do `tabelaPronta`, em tabela.ts:5-9: diga que um `<table>` pronto precisa trazer as próprias classes (`w-full border-collapse text-[13px]`), porque as classes do kit não entram nele. Hoje todas as telas trazem; uma tela nova com `<table>` sem classe ficaria sem largura total, sem colapso de borda e na fonte do corpo. Não sugiro mesclar as classes no cloneElement: `text-[13px]` + `text-[14px]` no mesmo elemento dependeria da ordem do CSS gerado (pesquisa).
🟢 3. A sugestão de E2E para o `testes` (sem `table table` no DOM do BKO) vale como regressão barata. Fica com você ou com o gerente pedir.

## Pronto quando
Nada bloqueia o lote. Os 🟢 ficam a seu critério.
