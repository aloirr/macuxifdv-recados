---
id: R-20261112-034316-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: alta
tarefa: T-0166
responde_a: R-20261112-031457-alexandre
encerra: false
contrato: null
criado_em: 2026-11-12T03:43:16-04:00
---
# T-0166: inventário dos alertas e a lista 'alerta → o que virou' para as 6h

## Resumo
Fiz o inventário de todos os alertas do Campo e do Gestão (A01 a A83) e dei um destino a cada um. O resultado:

| Destino | Quantos |
|---|---|
| fica | 41 |
| vira (campo ou botão com motivo) | 19 |
| junta | 6 |
| sai | 19 |

Os achados são RD-0170 a RD-0188, todos pré-aprovados para a v1.0.5.
**Efeito principal:** o Novo pedido recém-aberto passa de 3 ou 4 linhas de Alertas para **0**.

- Relatório: `docs/qualidade/redundancias/2026-11-12-T-0166-alertas.md`.
- Catálogo: atualizado. A faixa RD-0150 a RD-0169 ficou livre para a T-0165, que roda em paralelo.
- Recados:
  - R-20261112-033236 para o vendedor;
  - R-20261112-033527 para o core;
  - R-20261112-033558 para pesquisa, promotor, treinamento, catálogo e gestor;
  - R-20261112-033620 para o designer-ux.

## Lista para o dono do produto às 6h: alerta → o que virou

**Novo pedido**
1. Falta de preenchimento (item, forma, prazo, transportadora, CNPJ, quantidade, desconto inválido) → aparece **no próprio campo**, com borda e texto curto, e **só entra em Alertas quando você tenta avançar ou enviar**. Os botões ficam tocáveis, e o toque leva à aba com falta.
2. Cliente bloqueado, inativo e cadastro incompleto → **uma linha só**, a mais grave. Continua forçando orçamento.
3. Título vencido → **só quando muda o pedido**, ou seja, atraso acima do limite com prazo a prazo. Vencido de 1 ou 2 dias não vira alerta.
4. "Cadastre as formas de pagamento no BKO" + "Falta forma aceita pelo cliente" → **um alerta**: "Sem forma de pagamento para este cliente".
5. Faixa "Cópia do pedido N com os preços de hoje" → **sai**.
6. Item que não entrou na cópia → **vai para Alertas**: "AGU-1500 fora da cópia: sem preço".
7. "Quantidade acima do estoque atual" na faixa → **sai**. O alerta de estoque já existe.
8. Faixa "Sem sinal. Editar pedido enviado exige internet." → **vira linha em Alertas**: "Sem sinal para salvar a alteração".
9. Faixa "Sem sinal. Preço e estoque de 14:32." → **sai**.
10. Linha de motivo na folha "Sair do pedido?" → **sai**. O motivo já está em Alertas.
11. Folha do item, "Acima do desconto máximo de 10,0%" → **fica só no campo**, com a borda e "Máx. 10,0%". "Sem estoque" e o "Risco de ruptura" ficam.
12. Saem as frases: "Envia quando o sinal voltar.", "Só neste pedido. O cadastro do cliente não muda.", "Sem dados de crédito deste cliente." e "Crédito indisponível agora…". Para o crédito, a tabela fica com "—".
13. **Ficam:** acima do desconto máximo, sem estoque, sem preço, crédito excedido, recusa do servidor ou do supervisor, e a pergunta da alçada no enviar.

**Cliente e visita**
14. Caixa "Check-in bloqueado: em atendimento em X" → **sai**, porque a barra do topo já mostra a visita aberta. O botão Check-in diz o motivo no toque.
15. Faixa "Etapa da visita ainda não chegou" → **só quando pede ação** ("Fale com seu supervisor"). Com a etapa na fila, sai.
16. Checkout: "Obrigatória" em vermelho e "Falta concluir" → **neutro até você tocar em Checkout**.
17. Saem as frases: "Check-in fora do raio… ficou sinalizado…", "Sincronize para atualizar" e "Pedido só como orçamento até o cadastro ser completado no ERP".

**Outras telas**
18. Pesquisa: saem os chips "Falta 1 obrigatória", "Pronta para enviar" e "Salvo no aparelho". A faixa vermelha que repetia o erro da pergunta também sai.
19. Saem as faixas de explicação: Loja ("coletas ficam no aparelho…"), Treinar ("atividades no aparelho…") e Catálogo ("A busca inteligente volta…").
20. Gestão: as 4 faixas "Sem conexão: …" → os botões Aprovar, Rejeitar e Dispensar ficam desligados sem sinal e dizem o motivo no toque. Ficha e Ranking ganham a hora da atualização.
21. **Ficam sem mudança:** a aba Alertas do Gestão (regras do BKO), os bloqueios de login e carga, a fila e os erros de envio.

## Para o gerente
- Doc 03, três textos mudam:
  - RN-CORE-17: sai a 2ª frase da linha automática;
  - RN-CORE-36: falta só na tentativa;
  - RN-VEN-42: a regra nova da falta e a linha única do cliente.
- O RD-0177 (folha do item) entra depois da T-0165, na mesma folha.
- O RD-0172 mexe numa conta (título vencido com o limite da RN-VEN-13). Pus o testes em cc.
- O reteste é na v1.0.5, com print.
