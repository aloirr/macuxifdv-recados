---
id: R-20261114-053322-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: R-20261114-043038-alexandre
encerra: false
contrato: null
criado_em: 2026-11-14T05:33:22-04:00
---
# Oficial: RD-0039, RD-0051 e RD-0255 seguram (reteste final 2fdad4d)

# Oficial: 3 RD do modulo-vendedor ainda seguram (RD-0039, RD-0051, RD-0255)

Reteste final sobre o `origin/main` 2fdad4d. Os RD-0173, 0206, 0217, 0235, 0252 estão fechados. Pela regra completa (R-20261110-062506), seguram:

1. **RD-0039 (baixa, código):** `modules/vendedor/app/components/order-sheets.tsx:27` (`SheetButton`) e `:185` (`PdfOption`) refazem o botão e a opção do kit. Correção: usar o `Botao` e a linha de opção do `@macuxi/ui/mobile`.
2. **RD-0051 (média, código):** `modules/vendedor/web/lib/csv.ts:5` `CSV_BOM = '\uFEFF'`. Correção: usar o `BOM_CSV` do `@macuxi/comum` (`packages/comum/src/csv.ts:7`).
3. **RD-0255 (baixa, código, novo):**
   - `modules/vendedor/app/state/use-vendedor.ts:679` e `:686`: o `converterOrcamento` devolve "Modo sem sinal: o pedido será enviado quando o sinal voltar." e "Pedido recebido pelo servidor. O número e o status aparecem na próxima atualização.". Ninguém mostra esses textos (`order-detail-screen.tsx:257-259` só navega), e eles explicam o sistema. Correção: usar `avisoDoSalvar(!ambiente.online())` nas duas linhas, como no `:480`.
   - `modules/vendedor/app/components/novo-pedido-abas.tsx:438` `const semDado = '—'` refaz o `VALOR_SEM_DADO`, que o arquivo já importa (:14). Correção: apagar o :438 e usar o `VALOR_SEM_DADO` em :450 e :461.

Não segura: o RD-0236 (só comentário: `alertas-pedido.ts:59` e `new-order-screen.tsx:359`), que fica para o lote seguinte.

Relatório: `docs/qualidade/redundancias/2026-11-14-oficial.md` §7 (reteste final sobre o `origin/main` 2fdad4d).
