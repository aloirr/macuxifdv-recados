---
id: R-20261112-154622-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0165
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T15:46:22-04:00
---
# Entrega parcial v1.0.5: lápis Editar, RD-0171 a RD-0179, RD-0149 e componentes do kit

Contexto: continuação da v1.0.5 no Vendedor, sem commit. Itens 1 a 4 da lista do gerente.

Feito
1. T-0165, lápis Editar: o item que já está no pedido mostra o `BotaoEditar` do kit no lugar do ✓ (aba Itens, 44 px, com busca o item fora do pedido segue com o "+"); no Resumo, um lápis pequeno (tamanho tabela) depois do Total, em coluna própria que não corta as outras; a folha reaberta traz "Salvar alteração" e "Remover item" em vermelho (ROTULOS_DO_POPUP). Arquivos: app/components/busca-itens.tsx, tabelas-pedido.tsx, folha-do-item.tsx, app/lib/item-popup.ts.
2. T-0166, RD-0171 a RD-0179: 0171 (cliente em 1 linha: bloqueado > inativo > cadastro incompleto); 0172 (título vencido só como alerta acima do limite da RN-VEN-13 e com prazo a prazo, `vencidosComEfeito`); 0173 (alerta único "Sem forma de pagamento para este cliente", campo Forma desligado com "Nenhuma forma"); 0174 (sai a faixa da cópia; item removido vira alerta "AGU-1500 fora da cópia: sem preço/inativo"; frase do estoque sai); 0175 (faixas de sinal saem; "Sem sinal para salvar a alteração" em Alertas); 0176 (folha Sair do pedido sem a linha do motivo; `aviso` saiu de botoesDoResumo e opcoesDaSaida); 0177 (na folha do item o máximo não repete na área do item: borda no campo e "Máx. 10,0%" embaixo); 0178 (saem "Envia quando o sinal voltar", "Só neste pedido…", "Sem dados de crédito…" e "Crédito indisponível…", a tabela fica com "—"); 0179 (apaga `linhaDaPendenciaDoPedido` e corrige o comentário do domain). Transportadora: borda e "Obrigatório" só depois da tentativa.
3. RD-0149 ponto 2: o "Total do pedido" saiu da aba Itens (componente, rótulo e estilos apagados); o Avançar é o último item da aba, depois da lista, do "+ Mostrar mais" e do fim da aba.
4. Kit: trocados `Balao` (nome na lista de Itens e código no Resumo), `CampoEscolha` (Transportadora, com `falta`) e `BotaoEditar`. Não usei `TextoDaFalta`/`bordaDaFalta` em Forma e Prazo porque a `ListaSuspensa` ainda não tem a prop `falta` (recado ao designer-ux).

Testes e verificações (PC): ver o resultado de typecheck, lint e vitest no fim deste recado.
Não faço print: sem aparelho nem render neste PC; o corretor e o designer-ux conferem pelo HTML/prancha e pelo APK.
Pendências: tests/modulos/novo-pedido-t0165.test.ts ainda confere "Salvar item"/"Remover do pedido" (recado ao testes); a aplicação vinda na mesma consulta da T-0167 (item 4) segue como na entrega anterior.

Resultado no PC (Vendedor): typecheck (os 3 tsconfig) 0 erros; lint (eslint .) 0 erros; vitest, rodada completa: 1122 de 1124 verdes. Os 2 vermelhos eram a regra de fonte do telas-t0101 (ajustada, agora verde) e o teste de tempo lista-desempenho (<100 ms), que só falha com o PC carregado e não depende deste código (arquivo não tocado). Rerodei telas-t0101, order-prefill e alertas-pedido: verdes. Os ajustes finais (BotaoEditar do kit) passaram em typecheck e lint, sem nova rodada do vitest completo por prazo.
