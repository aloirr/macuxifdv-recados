---
id: R-20261112-050818-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0166
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T05:08:18-04:00
---
# Resumo das 6h: alertas (83 → o que virou), Novo pedido, busca e o que espera você

## Contexto
Bom dia. Aqui vai o resumo das 6h que você pediu no R-20261112-031457, junto com o estado da madrugada. Tudo o que está abaixo entra na **v1.0.5**, nada foi para o main ainda, e qualquer item pode ser desfeito.

## Menos alertas (T-0166): alerta → o que virou
O corretor levantou **83 alertas** no Campo e no Gestão: **41 ficam, 19 viram campo ou botão com motivo, 6 se juntam e 19 saem**. No **Novo pedido recém-aberto, as 3 ou 4 linhas de Alertas viram 0**. O relatório completo está em `docs/qualidade/redundancias/2026-11-12-T-0166-alertas.md`.

**Novo pedido**
1. **Falta de preenchimento** (item, forma, prazo, transportadora, CNPJ, quantidade, desconto inválido): aparece no próprio campo, com borda e texto curto, e só entra em Alertas quando você tenta avançar ou enviar. O toque leva à aba com a falta.
2. **Cliente bloqueado, inativo ou com cadastro incompleto:** vira uma linha só, a mais grave. Continua forçando orçamento.
3. **Título vencido:** só vira alerta quando muda o pedido, ou seja, atraso acima do limite e pagamento a prazo. Atraso de 1 ou 2 dias não gera alerta.
4. **"Cadastre as formas no BKO" e "Falta forma aceita pelo cliente":** viram um só, "Sem forma de pagamento para este cliente".
5. **Faixa "Cópia do pedido N com os preços de hoje":** sai.
6. **Item que não entrou na cópia:** vai para Alertas como "AGU-1500 fora da cópia: sem preço".
7. **"Quantidade acima do estoque" na faixa:** sai, porque o alerta de estoque já existe.
8. **"Sem sinal. Editar pedido enviado exige internet.":** vira a linha "Sem sinal para salvar a alteração" em Alertas.
9. **"Sem sinal. Preço e estoque de 14:32.":** sai.
10. **Motivo repetido na folha "Sair do pedido?":** sai.
11. **Folha do item, "Acima do desconto máximo":** fica só no campo ("Máx. 10,0%"). "Sem estoque" e "Risco de ruptura" ficam.
12. **Frases de explicação** ("Envia quando o sinal voltar.", "Só neste pedido…", "Sem dados de crédito…", "Crédito indisponível agora…"): saem. Sem dado de crédito, a tabela mostra "—".
13. **Ficam:** acima do desconto máximo, sem estoque, sem preço, crédito excedido, recusa do servidor ou do supervisor, e a pergunta da alçada ao enviar.

**Cliente e visita**
14. **"Check-in bloqueado: em atendimento em X":** sai, porque a barra do topo já mostra a visita. O botão explica o motivo no toque.
15. **"Etapa da visita ainda não chegou":** só aparece quando pede ação.
16. **Checkout:** "Obrigatória" e "Falta concluir" ficam neutros até você tocar em Checkout.
17. **Frases que saem:** "fora do raio… sinalizado", "Sincronize para atualizar" e "Pedido só como orçamento até…".

**Outras telas**
18. **Pesquisa:** saem os chips "Falta 1 obrigatória", "Pronta para enviar" e "Salvo no aparelho", e a faixa que repetia o erro.
19. **Faixas de explicação:** saem as da Loja, do Treinar e do Catálogo.
20. **Gestão:** sem sinal, os botões Aprovar, Rejeitar e Dispensar ficam desligados e explicam o motivo no toque. Ficha e Ranking mostram a hora da atualização.
21. **Ficam sem mudança:** a aba Alertas do Gestão, os bloqueios de login e de carga, a fila e os erros de envio.

**Na implementação:** Vendedor e Core estão aplicando; Pesquisa, Loja, Treinar, Catálogo e Gestão entram em seguida. As regras mudaram no doc 03, nas RN-CORE-17, RN-CORE-36 e RN-VEN-42.

## Novo pedido (T-0165)
- **Validação:** o corretor liberou as simulações finais que você aprovou, com 8 ajustes já pré-aprovados (RD-0142 a RD-0149).
- **Implementação:** o Vendedor está implementando, com prazo às 15h do PC. O designer-ux alinha a spec.
- **Decisão do gerente:** vale a RN-VEN-02, que arredonda o **preço unitário**. Algumas simulações arredondavam o total da linha e diferem em centavos, por exemplo R$ 56,76 contra R$ 56,77. O número segue a regra, que é a que a API confere.
- **Regra nova no doc 03:** o desconto é sempre no item; não há mais desconto do pedido. Pedidos antigos continuam sendo lidos como foram gravados.

## Busca de produtos (T-0167)
O Catálogo está auditando e implementando: lista de 20 em 20 com "+ Mostrar mais", código exato no topo, busca a partir de 3 letras, menos consultas e "Você quis dizer…". A imagem do "+ Mostrar mais" sai com o designer-ux depois da T-0165, porque é a mesma tela.

## Parados, esperando você
1. **Deploy da v1.0.0:** as condições (a), (b) e (c) estão cumpridas, mas o classificador barrou a minha tag. Autorize aqui no chat ou rode `git tag -a v1.0.0 71b3540481ab5f6c26be53383bc4c3dd3e0408ad -m "v1.0.0: primeiro deploy de produção — aprovado em R-20261111-222031-alexandre" && git push origin refs/tags/v1.0.0` (R-20261111-222329).
2. **PR #115** (manuais e roteiro de sábado): está verde, mas o merge foi barrado 4 vezes porque o GitHub demorou a responder. Tento de novo.
3. **APK com nome legível:** faltam as 5 variáveis `MACUXI_APK_S3_*` no `.env`.

## Pronto quando
Você lê, desfaz o que quiser e decide os 3 itens parados.
