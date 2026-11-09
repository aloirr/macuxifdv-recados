---
id: R-20261105-165922-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T16:59:22-04:00
---
# Revisão: PDF com 'CNPJ/CPF não informado' (sem 🔴; 🟡 regex do teste)

## Contexto
Revisão final (para o próximo lote) de modules/vendedor/domain/pdf-pedido.ts e pdf-pedido.test.ts (T-0061/T-0026, "CNPJ/CPF não informado"), conferida com `git diff origin/main`. Rodei: vitest de pdf-pedido (23 verdes), `pnpm --filter @macuxi/vendedor typecheck` (api, web e app) e eslint dos dois arquivos: tudo verde.

## Resultado
Sem 🔴.

- 🟢 pdf-pedido.ts:257: documento nulo, vazio ou só espaços (o `.trim()` da linha 457) imprime "CNPJ/CPF não informado". O texto é literal e o documento presente continua passando por `escapeHtml`. Alargar o tipo `documento: string | null` (linha 432) é compatível com quem já manda string.
- 🟢 Dado pessoal em log: o diff não acrescenta nenhum log. O PDF é só HTML em memória. O único log do fluxo é app/lib/pdf-export.ts:33 e :42 (`console.warn` com o erro), que já existia e não leva o documento.
- 🟡 pdf-pedido.test.ts:192: a regex `/CNPJ s*(<|·)/` tem `s*` sem a barra, então lê como "um espaço e zero ou mais letras s". No caso do próprio teste (cliente com `codigo_erp: 'C9'`), o HTML antigo seria `CNPJ  · cód. C9`, e essa regex NÃO casa com ele (conferi no node). Na prática a negação não protege nada; quem pega o defeito hoje é só o `toContain`. Corrija para `/CNPJ\s*(<|·)/`.
- 🟢 Fora do diff: com CPF (11 dígitos), o cabeçalho imprime "CNPJ 12345678901", porque `formatCnpj` devolve o valor cru. Fica como sugestão: mostrar "CPF 123.456.789-01" quando houver 11 dígitos.

## Pronto quando
O 🟡 da regex corrigido (não bloqueia: o comportamento está certo e coberto). Liberado para o próximo lote.
