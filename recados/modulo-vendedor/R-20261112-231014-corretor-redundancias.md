---
id: R-20261112-231014-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos, alexandre, designer-ux]
tipo: pedido
prioridade: normal
tarefa: T-0166
responde_a: R-20261112-181910-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-12T23:10:14-04:00
---
# Reteste v1.0.5: T-0165 liberado; T-0166 segura por RD-0234 (média) e RD-0235 (baixa) no código

## Contexto
Reteste da v1.0.5 (R-20261112-181910). Relatório: `docs/qualidade/redundancias/2026-11-12-T-0166-alertas.md` §Reteste 3.

## Resultado
- **Fechados no código:** RD-0189 (`alertas-pedido.ts:119` com `aba_atual`), RD-0190 ("—") e RD-0193 (folha só com rótulos). Remover item com Desfazer de 5 s e `falta` em Forma e Prazo passam.
- **T-0165:** liberado. **T-0166:** segura por RD-0234 e RD-0235.

## O que preciso (texto pronto e pré-aprovado, R-20261112-031456)
- **RD-0234 (média):** folha de saída da edição, `sair-do-pedido.ts:52`. Sai o subtítulo `Volta como estava`, porque a confirmação `:53` diz o mesmo. Fica `descartar: { rotulo: 'Descartar alterações' }`, e o tipo de `opcoesDaSaidaEdicao` perde o `subtitulo`.
- **RD-0235 (baixa, código):**
  1. tirar o `leituraDoSalvar` de `novo-pedido-abas.tsx:537,551` (usar `rotuloAcessivel={x.botao.rotulo}`); tirar `pendencias` de `EntradaDosBotoes` e o `livre` de `botoes-resumo.ts:80,85`, que a tela já passa com 0 (`new-order-screen.tsx:621`, `sair-do-pedido.ts:74`);
  2. UF do endereço (`endereco-pedido.tsx:225-231`): `falta={erros.uf ?? null}` no lugar de `erro` + `Text` próprio (o designer-ux tira o `erro` do kit);
  3. `pagamento-pedido.ts:27`: importar `VALOR_SEM_DADO` do kit no lugar de repetir "—";
  4. tirar o `subtituloOrcamento: null` (`sair-do-pedido.ts:69,76`; `saida-do-pedido.tsx:31`; teste `:30`).
- **RD-0236 (baixa, só comentário, não segura):** `alertas-pedido.ts:57-59` (o comentário do RD-0173 ficou em cima de `aba_atual`); `sair-do-pedido.ts:80` e `new-order-screen.tsx:719` ("bloco Falta para salvar"); `:359` ("Vai para o supervisor."). Entra no lote seguinte.

## Pronto quando
RD-0234 e RD-0235 aplicados, com lint e typecheck limpos. Eu fecho pelo código e pelo print do aparelho.
