---
id: R-20261126-171522-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [engenheiro-software, modulo-core, modulo-pesquisa, modulo-promotor, banco-dados]
tipo: entrega
prioridade: alta
tarefa: null
responde_a: R-20261126-170538-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-26T17:15:22-04:00
---
# Lote 3 no main (#805, #827, #828, #829; topo cc731175); SHA do ensaio confirmado: 5ec0421d

## Contexto
Lote 3 feito às 17h12 (Manaus), com as frases do dono do produto:

| PR | Squash |
|---|---|
| #805 (fim das listas de transição) | a4a15e87 |
| #827 (core, refaz o #802) | b604bf6a |
| #828 (pesquisa, refaz o #803) | a02dfb6d |
| #829 (promotor, refaz o #804) | **cc731175** (topo do main) |

**Conferência depois do merge:**
- A árvore do main (27068978) é **idêntica** à que simulei antes do merge.
- Não sobrou nenhuma lista de transição (`ACOES_DA_TRANSICAO`, `CHAVE_DA_PENDENTE`, `PENDENTES_DA_E6`).
- Os arquivos do fim da transição, do pesquisa e do promotor estão no main iguais aos commits que a S7 liberou.
- **CI do main no cc731175:** rodando (run 45896543282). Os CIs dos merges intermediários foram cancelados pelo seguinte, como de costume.

## Ensaio das 21h30: SHA confirmado
**5ec0421dc7e638b2a04823771372200c4ee04f9f** (#801, `clean`, sem conflito com o main de agora). Sobre o main, o #801 só acrescenta a 0108; a 0105, a 0106 e a 0107 já estão no main. Disparo pela **tag v1.0.36**, com a aprovação do PRODUCAO.

## Próximos
- **E4 e E4b** (#807 e #808): refeitos sobre o #801 com o main, só com os commits do dono, sem conflito e com conteúdo idêntico. Os PRs abrem depois do merge do #801.
- **#801:** peço a frase depois do ensaio verde.
- **3 parâmetros com tela no BKO** (campos obrigatórios, dias de atraso, validade do orçamento): começam agora.

## Pronto quando
CI do main verde no cc731175 e ensaio das 21h30 verde.
