---
id: R-20261113-200320-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T20:03:20-04:00
---
# Abrir na nuvem: 7 sessões por dono com os achados restantes da v1.0.6 (lote do PC no main 31db50d7)

## Contexto
Pedido "Abrir na nuvem" para a v1.0.6 sair hoje sem pendência (R-20261113-191708). O lote do PC já está no main (hash no recado anterior), então todas as sessões partem do main e não colidem com o PC. A regra é a de sempre: uma sessão, um agente, um PR "[PRONTO PARA MERGE]" com o trailer `Agente: <dono>`. O prazo dos PRs é 21h.

**Prompt comum.** Troque `<dono>` pelo agente da sessão:

```text
Você é o agente <dono> do Macuxi FDV, numa sessão da nuvem. Leia o CLAUDE.md e o seu arquivo .claude/agents/<dono>.md.
Tarefa: aplicar TODOS os achados ainda abertos da v1.0.6 cujo dono seja você, inclusive os de gravidade baixa. Leia:
- docs/marca/pareceres/2026-11-13-v1.0.5.md e docs/marca/pareceres/2026-11-13-v1.0.6.md (achados MC-nnnn);
- docs/qualidade/redundancias/2026-11-13-v1.0.6.md e docs/qualidade/redundancias/catalogo.md (achados RD-nnnn abertos);
- docs/testes/ e os recados do testes sobre "desvios de spec" da v1.0.6, quando citarem você.
Mexa só nos seus caminhos (.coord/donos.json). Escreva testes onde houver regra. Rode lint, typecheck e o vitest do pacote.
Branch: nuvem/v106-<dono>, a partir do main. PR "[PRONTO PARA MERGE] v1.0.6: achados de <dono>", com o trailer "Agente: <dono>".
No corpo do PR, a lista: achado → o que mudou (arquivo:linha). O que não for seu, liste no PR para o gerente repassar.
```

## Sessões a abrir (uma por agente)
1. **designer-ux:** tokens e neutros (MC-0002, MC-0004, se ainda for dele), pranchas da T-0173 e da T-0170 na marca v1 (MC-0013), MC-0007 e RD-0235 (sobras do kit: `leituraDoSalvar`, prop `erro`).
2. **modulo-vendedor:** MC-0005 (selo roxo), MC-0006 (hex no estado do pedido), MC-0011 (números dos cards em Archivo) e o código morto do Início (`resumo-inicio`, `resumoDaSituacao`).
3. **modulo-core:** MC-0012, MC-0014 e o que sobrou da Performance e do Início; a retirada do `inicio.recado_do_dia_padrao` (D2) e a foto e os avatares do Início, se couberem.
4. **engenheiro-apps:** só a parte do app da MC-0003. A web já está numa sessão sua.
5. **modulo-catalogo:** RD-0246 e qualquer MC do catálogo em grade.
6. **modulo-pesquisa:** registro das consultas do #145 no manifest e nos índices.
7. **testes:** os 4 desvios de spec que o corretor mandou, onde forem de teste, e o roteiro do aparelho da v1.0.6 em `docs/testes/v1.0.6-roteiro.md`.

## Pronto quando
Os 7 PRs mesclados até 21h. Em seguida, o reteste do corretor e da marca e o build da v1.0.6.
