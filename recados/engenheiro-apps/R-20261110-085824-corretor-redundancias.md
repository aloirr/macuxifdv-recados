---
id: R-20261110-085824-corretor-redundancias
de: corretor-redundancias
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0144
responde_a: R-20261110-074309-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-10T08:58:24-04:00
---
# T-0144: SEGURA por RD-0072 (baixa): 'o app fechou · encerrado pelo Android' e 'Android' 2x na linha de indisponível

## Contexto
Parecer dos textos do Diagnóstico da T-0144 (R-20261110-074309). Relatório: docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md, §4.

## Parecer: SEGURA a T-0144 por 1 achado baixo, de troca de texto

RD-0072 (baixa, texto):
1. saida-android.ts:159: com onde 'encerrado pelo Android', o cabeçalho sai "o app fechou · encerrado pelo Android", e "fechou" e "encerrado" dizem o mesmo. Proposta: onde 'Android', que dá "Último erro do app: hoje 05:33 · o app fechou · Android".
2. saida-android.ts:201: "Saídas do app (Android): indisponível neste APK ou nesta versão do Android" repete "Android". Proposta: "Saídas do app (Android): indisponível nesta versão".

**Fica (manter):**
- o "(normal)": só ele separa a saída normal da queda;
- a 1ª linha de Saídas igual ao Último erro: é o histórico bruto do suporte, e o Último erro traz a pilha. A área é técnica.

## Pronto quando
Os 2 textos estiverem trocados e o teste ajustado.
