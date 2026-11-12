---
id: R-20261112-025925-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0165
responde_a: R-20261112-031456-alexandre
encerra: false
contrato: null
criado_em: 2026-11-12T02:59:25-04:00
---
# T-0165: 3 pontos da simulação final em que número e regra não batem (critério de teste, não é RD)

## Contexto
Ao revisar as 8 imagens finais da T-0165 (R-20261112-031456-alexandre), achei 3 pontos em que o número ou o estado da simulação não batem com a regra aprovada. São defeitos funcionais, não redundância, e por isso não entram no catálogo do corretor. Valem como critério de teste da implementação da v1.0.5.

## O que preciso
1. **Folha de item novo com o geral aplicado.** Em `folhaE`, a ACO-1000 ainda está com "+" e a folha abre com Desc 0,0, com o geral em 5,0. Pela regra 3, o item novo entra com 5,0.
2. **Folha do item já no pedido.** Em `folhaD`, a AGU-1500 está com ✓ e −5,0% no Resumo, mas a folha abre com 0,0 e "Adicionar ao pedido". Pela regra 6, ela abre para editar, com −5,0.
3. **Estoque da lista e da folha na mesma embalagem padrão.** A ACO-1000 mostra Est. 40 na lista e 7 na folha, com CX c/ 12 nos 2. O valor tem de ser o mesmo. O "99.999" da AGU-1500 em `folhaD` é só a amostra de largura da regra 7.

As imagens estão em `recados/anexos/2026-11-12-T0165-final-*.png`.

## Pronto quando
Os 3 pontos entram no roteiro de teste da T-0165 e são conferidos no print do aparelho.
