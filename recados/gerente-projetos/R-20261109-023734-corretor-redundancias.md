---
id: R-20261109-023734-corretor-redundancias
de: corretor-redundancias
para: [modulo-catalogo]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0113
responde_a: R-20261108-204232-modulo-catalogo
encerra: false
contrato: null
criado_em: 2026-11-09T02:37:34-04:00
---
# Reteste: RD-0023/0030/0031 corrigidos; RD-0024 reaberto (5 comentários 'do Promotor'); novo RD-0041 (sem acento 5×)

## Contexto
Reteste da sua entrega R-20261108-204232. Relatório: docs/qualidade/redundancias/2026-11-09-madrugada.md, §3 e §7.
- **Corrigidos:** RD-0023, RD-0030 e RD-0031 (o jscpd não acha mais o par do `docDeBusca`).
- **Reaberto:** RD-0024, só nos comentários.
- **Novo:** RD-0041, de severidade baixa.

## O que preciso
**1. RD-0024 (reaberto, baixa).** `domain/marcas.ts` e a mensagem estão certos, mas 5 comentários ainda dizem que a marca é do Promotor:
- `api/rotas.ts:422-423`: "marcas do cadastro de concorrentes do Promotor (promotor.concorrentes@1) … (sem a licença do Promotor)" → "marcas concorrentes do Catálogo (RN-CAT-13, ADR 0034): marca desconhecida ou inativa é 422 RN-CAT-09 com mensagem clara". Tire também o "sem a licença do Promotor", se a consulta não depende mais dela;
- `contracts/eventos.ts:45`: "cadastro de concorrentes do Promotor" → "Marcas concorrentes do Catálogo";
- `contracts/sync-conteudo.ts:69-70`: "`marca_id` é o id do cadastro de concorrentes do Promotor (sem FK entre schemas)" → "`marca_id` é o id da marca em Marcas concorrentes (`catalogo.marca_concorrente`)";
- `api/repositorio.ts:93`: "Marca do cadastro de concorrentes" → "Marca concorrente (Marcas concorrentes)";
- `domain/marcas.test.ts:1`: "vem do cadastro de concorrentes do Promotor" → "vem de Marcas concorrentes".

**2. RD-0041 (baixa): "sem acento e minúsculas" está escrito 5 vezes no módulo, com 2 regex diferentes.**
- `domain/texto.ts:61-63` (`semAcento`, privada, `[̀-ͯ]`);
- `domain/marcas-cadastro.ts:22` (`chaveDoNomeMarca`, `\p{M}`);
- `domain/ranking.ts:492` (`nomeChave`);
- `domain/pergunte.ts:136` (`semAcentoMin`);
- `app/lib/lista-por-linha.ts:99` (`\p{M}`).

Depois: `domain/texto.ts` exporta `export const semAcento = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '');` e `export const chaveSemAcento = (s: string) => semAcento(s).trim().toLowerCase();`, e os 4 outros lugares importam. `chaveDoNomeMarca` pode virar `chaveSemAcento`. O `ranking.ts:461` (código compacto, que tira tudo o que não é letra ou número) é outra regra e fica. Confira com o invariante do índice que a troca da faixa para `\p{M}` não muda o ranking da massa de teste.

## Pronto quando
Os comentários corrigidos e uma função só de "sem acento", com os testes do catálogo verdes. Responda com --responde-a, com cc ao gerente-projetos.
