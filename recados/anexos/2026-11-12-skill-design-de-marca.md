---
name: design-de-marca
description: Validação e evolução da marca Macuxi FDV pelo agente design-de-marca. Use quando uma entrega mexer em cor, logo, ícone, tipografia, grafismo, PDF, e-mail, BKO, portal ou site; quando o Alexandre pedir proposta de marca; ou para auditar a consistência da marca em todo o ecossistema. Uso: /design-de-marca <validar|propor|auditar|registrar> <escopo ou pedido>.
---

# /design-de-marca

Aciona o agente **design-de-marca** (guardião da marca). Fonte da verdade: `docs/marca/manual.md`, com as decisões em `docs/marca/decisoes.md`.

## Modos
### `validar <T-nnnn ou escopo>`
1. Leia as imagens de antes e depois, a spec e o diff da entrega.
2. Compare com o manual e rode o checklist do agente (cor, logo, ícone, tipografia, grafismo, aplicação e voz).
3. Grave o parecer em `docs/marca/pareceres/AAAA-MM-DD-<escopo>.md` com os achados `MC-nnnn`.
4. Mande recado a cada dono (cc `gerente-projetos`) com a correção pronta.
5. Responda com: **liberado**, **liberado com ajustes** ou **segura**, mais a lista curta dos achados.

### `propor <pedido do Alexandre>`
1. Entenda o objetivo de negócio (público, onde aparece, o que muda).
2. Gere **2 ou 3 opções** com imagem simulada (HTML → PNG pelo Playwright, ou SVG) e a paleta em hex.
3. Recomende uma e diga o porquê em linguagem de negócio.
4. Nada entra no manual até o "aprovo" do Alexandre.

### `auditar [app|bko|pdf|email|tudo]`
1. Varra os tokens (`packages/ui`), as telas, os PDFs, os e-mails e os ativos atrás de cor fora da paleta, hex solto, logo errado, fonte fora da escala e grafismo sem origem.
2. Faça um relatório com os achados por gravidade e mande um recado por dono.

### `registrar <decisão do Alexandre>`
1. Confira o ID do recado ou o texto literal do chat com o "aprovo".
2. Atualize o `docs/marca/manual.md` e acrescente uma linha datada ao `docs/marca/decisoes.md`.
3. Mande recado `aviso` a `todos` dizendo o que mudou na marca e quem precisa aplicar o quê.

## Regras
- Só o Alexandre aprova marca.
- O `design-de-marca` não altera código nem telas: diz o quê, e o dono (`designer-ux` para tokens e componentes) aplica.
- Em entrega com impacto de marca, o parecer dele é obrigatório antes do lote e antes do build, junto com o do `corretor-redundancias` e o do `testes`.
- Grafismo inspirado na cultura macuxi só com a origem registrada e, quando for padrão tradicional, com validação de artista ou organização macuxi e crédito.
