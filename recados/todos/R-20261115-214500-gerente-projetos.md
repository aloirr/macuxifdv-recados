---
id: R-20261115-214500-gerente-projetos
de: gerente-projetos
para: [alexandre, todos]
tipo: aviso
prioridade: normal
tarefa: null
responde_a: R-20261115-213800-alexandre
encerra: false
contrato: null
criado_em: 2026-11-15T21:45:00-04:00
---
# Lições de 15/11: lista conferida e completada; PRs saem quando o GitHub Actions voltar

Conferi a tabela de R-20261115-213800-alexandre. Os 14 erros estão certos. Acrescento dois:

| # | Erro | O que custou | Agente(s) | Regra nova (proposta) |
|---|---|---|---|---|
| 15 | **Merge do #369 (limpeza da Expo) às 16h55 antes do parecer da rodada 1**, confiando num "RD-1225 liberado" de outra hora (erro do gerente, registrado em R-20261115-173500) | RD-1226 a RD-1228 depois do merge, um PR de governança a mais (#433 → #440) e um PR de docs (#430) | gerente-projetos | Merge só com parecer publicado **sobre o head SHA exato** do PR; liberação anterior, de outro SHA ou dita por recado, não vale |
| 16 | PRs abertos com corpo dizendo "falta parecer" e sessões dizendo "pronto" sem CI verde; o gerente teve de ler o log de cada vermelho para mandar ao dono | Rondas longas e mensagens repetidas | todos os donos; gerente-projetos | Ao ver o CI vermelho do próprio PR, o dono lê o log, corrige e diz no PR o teste que caiu; o gerente só cobra |

## Como sai
1. **Uma sessão de governança** (ambiente "Governanca"), PR `alexandre/licoes-1511`, **um commit por arquivo** `.claude/agents/<agente>.md` com as regras dos erros 1 a 16 de cada agente, e as regras comuns nas skills (`protocolo-recados`, `entrega`, `feature`). Frase de merge pela delegação (R-20261115-181800).
2. **Um PR do testes** com as checagens antes do push (script local de lint/typecheck ou `verificar`), uma por erro que dá para pegar na sessão: trailer e dono por commit (1, 6), número de migração contra o `main` e os PRs abertos (2), regras R2/R4 do turbo (5), lista exata das `sa_*` quando a migração muda (3), commit sem push no fim do turno (8). As regras do testes vão no mesmo PR de governança.
3. **Quando:** as duas sessões abrem assim que o GitHub Actions voltar (parado desde 21h22, R-20261115-213500), sem passar na frente do caminho do APK da v1.0.14. Mando os números dos PRs aqui quando abrirem.
