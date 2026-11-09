---
id: R-20261108-101838-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T10:18:38-04:00
---
# Chat do dono do produto, 08/11 ~10h50: rodada do teste de campo de domingo (T-0123 a T-0130)

## Contexto
Registro literal do chat do dono do produto com o gerente-projetos, domingo 08/11/2026 por volta das 10h50. A partir dele, o gerente abriu as tarefas T-0123 a T-0130:
- T-0123: Frente A, novo agente corretor-redundancias (diff de governança).
- T-0124: Frente B, 1ª auditoria do Início do Campo, RD-0001 a RD-0011.
- T-0125: Frente C, nos docs 02 e 03. Já feita: RN-CORE-36, RN-VEN-38 e as novas redações da RN-VEN-16, da RN-VEN-30 e da RF-VEN-11.
- T-0126: padrão de pendências em docs/design, com o designer-ux.
- T-0127: Frente D.
- T-0128: Frente E.
- T-0129: Frente F.
- T-0130: Frente G.
Ordem no modulo-vendedor, para não colidir: F → D → E → G. As quatro saem antes do build único. Não existiam em .coord/recados/ os recados do Cowork R-20261108-103009 e R-20261108-103901 a 103905, então não há o que encerrar.

=== TEXTO LITERAL ===
@gerente-projetos Rodada do teste de campo de domingo 08/11 (APK Campo demo, vendedor). São 8 frentes: o agente novo corretor-redundancias, a 1ª auditoria dele no Início, a atualização dos docs com 3 decisões de produto e 4 bugs do Novo pedido. Tudo entra na esteira agora (regra permanente R-20261107-164646). Não é backlog.
0. Regras desta rodada
* Numeração: use os próximos T-nnnn livres do quadro. O doc 12 do Projeto citava "T-0088/T-0089", mas a T-0089 já existe (revisão do Novo pedido de 06/11), então ignore esses números.
* Chat vira recado: grave esta mensagem como recado `aviso` para `todos`, com o texto literal, a data/hora e as tarefas abertas a partir dela.
* Sem duplicar: se existirem em `.coord/recados/` os recados R-20261108-103009-alexandre ou R-20261108-103901..103905-alexandre (montados no Cowork), eles têm o mesmo conteúdo deste prompt. Encerre-os apontando para as tarefas abertas aqui, sem tratar duas vezes.
* Prioridade: T-0093 → T-0094 seguem na frente. Os 4 bugs do Novo pedido (frentes D a G) entram antes do build único Campo-Demo-v1.0.0 / Gestao-Demo-v1.0.0: não dá para demonstrar um pedido que some ou que trava no salvar. As frentes A, B e C rodam em paralelo nas vagas livres, sem colidir com o modulo-vendedor.
* Ambiente: sem Docker no PC. Teste de banco e stack isolado rodam no CI. Git só por você, pela regra de rodada.

Frente A — Novo agente: corretor-redundancias
Quero um engenheiro sênior de testes e otimização que avalie redundâncias de texto, indicadores, layout, código, rotinas, testes, docs e tarefas. Ele não corrige nada de outro agente: abre recado ao dono com o antes → depois.
Distribua:
1. engenheiro-software
 * criar `.claude/agents/corretor-redundancias.md` com o conteúdo do Anexo no fim deste prompt (sem mudar o texto; modelo opus);
 * `.coord/donos.json`: dono de `docs/qualidade/redundancias/**` e `.coord/diario/corretor-redundancias.md`;
 * `scripts/coord.mjs` e guardião (`.claude/hooks/guarda-donos.mjs`): aceitar `corretor-redundancias` como remetente e destinatário (recados em `.coord/recados/corretor-redundancias/`);
 * avaliar `jscpd` e `knip` como devDependencies de leitura (scripts `pnpm redundancia:codigo` e `pnpm redundancia:mortos`), sem quebrar o CI.
2. gerente-projetos: atualizar `docs/produto/07-agentes-e-coordenacao.md` (organograma e tabela de papéis, com a linha do corretor-redundancias e "Não faz: corrigir código de outro agente") e o organograma no quadro.
Pronto quando: `node scripts/coord.mjs caixa corretor-redundancias` funciona; o guardião bloqueia escrita dele fora de `docs/qualidade/redundancias/**`; um recado de teste de ida e volta passa; doc 07 atualizado; lint, typecheck e testes verdes.

Frente B — 1ª auditoria do corretor-redundancias: Início do app Campo (vendedor)
Depois da Frente A, delegue ao corretor-redundancias. Ele gera o relatório e os recados ao modulo-core (dono do Início) e ao modulo-vendedor (cartões Orçamentos/A faturar), com cc ao gerente.
Ponto de partida: print do APK no domingo 08/11 (vendedor Lucas, base de 06/11 6h28).
Achados
* RD-0001 (BUG, alta) O cartão "META DE HOJE" mostra R$ 553, que é o realizado do mês (180.000 − 179.447 = 553; 553 ÷ 180.000 = 0,3% → "mês 0%"). Pela RN-CORE-26, a meta do dia é (meta − realizado até ontem) ÷ dias úteis restantes; em dia não útil não há meta do dia. O rótulo contradiz o valor.
* RD-0002 (alta) O progresso do mês aparece 4 vezes no mesmo cartão: "mês 0%", barra, "de R$ 180.000 no mês" e "faltam R$ 179.447 no mês".
* RD-0003 (média) "hoje" aparece 5 vezes na tela, com a data já no cabeçalho: "rota de hoje", "RECADOS DE HOJE", "Prioridade de hoje" (título do recado), "META DE HOJE", "Hoje não é dia útil".
* RD-0004 (média) "mês" aparece 5 vezes no cartão de meta: "mês 0%" e "no mês" ×4.
* RD-0005 (média) Unidade repetida: "1 cliente de 15 clientes no mês" e "0 visitas de 90 visitas no mês" ("visitas" 3 vezes na linha).
* RD-0006 (média) O mesmo fato dito 2 vezes: "Nenhuma visita na rota de hoje" e "Hoje não é dia útil".
* RD-0007 (média) Formato inconsistente: Positivação e Visitas aparecem em "x de y"; Cobertura, em "0% meta 90%". Positivação 1/15 com Cobertura 0% aparece sem explicação. "de 15 clientes" não diz se é meta ou carteira.
* RD-0008 (média) O aviso de dado antigo ("Vendas até 06/11 às 6h28. Sincronize para atualizar.") está preso ao cartão de meta, mas vale também para A faturar e Positivação. Conferir com a RN-CORE-23 (botão Sincronizar com "Última sincronização hh:mm · N na fila" no Início): se os dois existem, é aviso duplicado e vira um aviso global só.
* RD-0009 (baixa) Recados: selo "1 novo" + bolinha laranja no único item; "Ver todos" com 1 recado só; espaço vazio grande no cartão; prévia truncada que esconde a ação ("tem título vencido e o …").
* RD-0010 (baixa) Estado zero duplicado: Orçamentos "0" e "R$ 0"; três barras vazias seguidas.
* RD-0011 (baixa, verificar) Os cartões Orçamentos/A faturar repetem a aba Pedidos; só ficam se o toque abrir a lista já filtrada. "1 aguardando" não diz aguardando o quê (aprovação?).
Proposta de tela (texto final)
Domingo, 8 de novembro
Bom dia, Lucas
Sem rota hoje · não é dia útil                      ← resolve RD-0003 e RD-0006
RECADOS                                    1 novo   ← sem bolinha quando há 1 só; sem "Ver todos" quando total ≤ itens mostrados; toque no cartão abre a lista
Prioridade: passe cedo no Mercadinho São Jorge — título vencido e … (2 linhas)
META DO MÊS                                  0,3%
R$ 553 de R$ 180.000
[barra]
Faltam R$ 179.447 · R$ 9.445 por dia útil (19 dias)   ← em dia útil a linha vira "Meta de hoje R$ X" (RN-CORE-26); no domingo não mostra meta do dia
Positivação   1 de 15 clientes
Visitas       0 de 90
Cobertura     0% de 90%
Orçamentos  nenhum         A faturar  6 · R$ 3.989 (1 aguardando aprovação)
⟳ Dados de 06/11, 6h28 · Sincronizar               ← aviso único, global (RN-CORE-23)
Regras para o relatório: Confirmar RD-0001 no código e no teste da RN-CORE-26. Se for bug, o teste vem antes da correção. Não mudar fórmula de indicador sem recado ao gerente. O texto acima é a proposta; o modulo-core pode ajustar, com justificativa.
Pronto quando: relatório em `docs/qualidade/redundancias/2026-11-08-inicio-campo.md`; catálogo com RD-0001..0011; recados enviados aos donos; correções entregues com print do APK antes/depois; reteste do corretor fechando os achados.

Frente C — Decisões de produto: atualizar docs 02 e 03 (gerente-projetos + designer-ux)
Decisões do Alexandre em 08/11/2026, a partir do teste do Novo pedido. Aplique o texto abaixo, avise `todos` e peça ao designer-ux para registrar o padrão de pendências em `docs/design/`, porque ele vale para o app inteiro.
docs/produto/03 — nova RN-CORE (próximo número livre) "Pendências de preenchimento": Em formulário com abas (Novo pedido e, depois, visita, pesquisa, cadastro), as pendências de preenchimento aparecem só na última aba (no pedido, o Resumo), num bloco único "Falta para salvar", acima do botão de salvar. Cada linha diz o que falta e em qual aba corrigir ("Transportadora do frete FOB — aba Detalhes"). Não há botão de correção nem alerta nas outras abas; a aba com pendência ganha só uma bolinha. Enquanto houver pendência, o botão de salvar fica desabilitado. (Alexandre, 08/11/2026.)
docs/produto/03 — RN-VEN-16, última linha, nova redação: "Enviar pedido" fica bloqueado com FOB sem transportadora; a pendência aparece no Resumo: "Transportadora do frete FOB — aba Detalhes".
docs/produto/03 — nova RN-VEN (próximo número livre) "Sair do pedido": Ao sair de um Novo pedido alterado, por qualquer caminho (Voltar, gesto do Android, barra inferior, Cancelar), o app pergunta: Salvar pedido · Salvar orçamento · Descartar · Continuar editando. Salvar com pendência volta ao Resumo com o bloco "Falta para salvar". Cliente da RN-VEN-13 (bloqueado, inativo, cadastro incompleto) vê só Salvar orçamento e Descartar. O rascunho é gravado no aparelho a cada alteração; se o app for fechado pelo sistema, ao reabrir oferece continuar ou descartar. Nenhum pedido some sem escolha do vendedor. (Alexandre, 08/11/2026.)
docs/produto/03 — RN-VEN-30, acrescentar: Ao salvar, o pedido passa a `na_fila` no aparelho e a tela do pedido fecha na hora; o envio é feito pela fila em segundo plano (RF-VEN-04, RN-CORE-23). Enquanto estiver `na_fila`, o pedido fica somente leitura no app. (Alexandre, 08/11/2026.)
docs/produto/02 — RF-VEN-11, Resumo, acrescentar: Bloco "Falta para salvar" acima de [Salvar]; [Cancelar] abre a mesma folha de "Sair do pedido".
Pronto quando: docs 02 e 03 atualizados, com aviso a `todos`; padrão registrado em `docs/design/`; as frentes D a G citam as RN novas.

Frente D — Bug: pendência fora do Resumo e botão "Corrigir frete" (modulo-vendedor; revisão de texto do designer-ux)
Contexto: print de 08/11 às 10:27, aba Itens, cliente Atacadinho Cachoeirinha · cód. C5007 · prazo médio do cliente 45 dias. A tela mostra: "Itens (1) •"

## O que preciso / o que mudou
"Detalhes"

## Pronto quando
"Resumo"; o item "AGU-1500 · Água mineral 1,5 L (fardo 6) · FD", qtd 3, Desc % 0, "Valor total: R$ 55,53"; alerta vermelho "Informe a transportadora do frete FOB."; botão "Corrigir frete" e botão "Avançar".
No vídeo de 10:34 (cliente Mercadinho São Jorge, C5002), a mesma aba Itens mostra "Escolha o prazo." em alerta vermelho. A bolinha está em Itens, mas a pendência do frete é da aba Detalhes.
Passos: 1. Novo pedido. 2. Detalhes → Frete FOB, sem transportadora. 3. Voltar para Itens.
Esperado (nova RN-CORE de pendências, RN-VEN-16): Itens e Detalhes sem alerta; bolinha só em Detalhes; Resumo com o bloco abaixo e [Salvar] desabilitado; o botão "Corrigir frete" deixa de existir.
FALTA PARA SALVAR
• Transportadora do frete FOB — aba Detalhes
• Prazo de pagamento — aba Itens
Obtido: alerta e botão "Corrigir frete" na aba Itens; bolinha na aba errada.
Pronto quando: função pura no `domain` lista as pendências com a aba de cada uma (forma, prazo, frete FOB/transportadora, itens), com teste antes; a tela só mostra o bloco no Resumo; print do APK antes/depois no recado de entrega; designer-ux aprova o texto; testes avisado para regressão.

Frente E — Bug: sair do Novo pedido sem salvar apaga o pedido (modulo-vendedor + engenheiro-apps)
Contexto: o Alexandre montou um pedido, saiu da tela e o pedido sumiu, sem perguntar nada. Isso contraria a RN-VEN-30 (status `rascunho`) e a RN-VEN-31 (só rascunho é apagado, por decisão do usuário).
Esperado (nova RN-VEN "Sair do pedido"): com pedido alterado (pelo menos 1 item ou campo mudado), qualquer saída abre a folha abaixo. As saídas são: Voltar do cabeçalho, gesto/botão Voltar do Android, toque em Início/Rota/Clientes/Pedidos/Mais na barra inferior e [Cancelar] do Resumo.
Sair do pedido?
[Salvar pedido]        Vai para a fila de envio
[Salvar orçamento]     Válido até dd/mm
[Descartar]            Apaga este pedido
Continuar editando
* Salvar pedido / Salvar orçamento: valida tudo. Com pendência, fecha a folha e abre o Resumo com "Falta para salvar". Sem pendência, segue o fluxo da Frente G.
* Cliente da RN-VEN-13 (bloqueado, inativo, cadastro incompleto): só Salvar orçamento e Descartar.
* Descartar: pede uma confirmação.
* Rascunho local: gravado a cada alteração (SQLite), sem nada na tela. Se o app for fechado pelo sistema, ao reabrir oferece "Continuar pedido de <cliente>" ou "Descartar".
* engenheiro-apps: a interceptação de navegação (barra inferior e gesto do Android) fica no shell, como ponto de extensão reutilizável por outros formulários.
Pronto quando: testes cobrem as 5 saídas (cabeçalho, gesto Android, barra inferior, Cancelar, app fechado pelo sistema), a regra de pendência e a RN-VEN-13; print do APK antes/depois; testes avisado para regressão.

Frente F — Bug: forma de pagamento volta sozinha para Pix / À vista (modulo-vendedor)
Contexto: vídeo de 08/11 às 10:34, cliente Mercadinho São Jorge · C5002 · prazo médio 45 dias. Aba Detalhes: "Limite total R$ 10.000,00 · Limite disponível R$ 4.000,00" e "Cliente inadimplente: 1 título vencido · R$ 3.400,00 · há 12 dias. Só à vista ou com aprovação." Aba Itens: a lista de forma mostra Pix ✓, Dinheiro, Cartão e Boleto, todas com aparência de habilitadas.
Passos: 1. Novo pedido para esse cliente. 2. Forma → Boleto. 3. Repetir.
Obtido: Boleto fica selecionado por cerca de 1 s (Prazo "Escolha" em vermelho e "Escolha o prazo."). Depois a tela volta sozinha para Pix / À vista, sem mensagem. Não dá para sair de Pix.
Esperado (RN-VEN-13, RN-VEN-24, RN-VEN-25): título vencido há mais de 5 dias permite outra forma/prazo com aprovação; Boleto + prazo com prazo médio ≤ 45 dias é aceito, e o Resumo mostra "Vai para o supervisor"; forma não permitida pelo cadastro do cliente aparece desabilitada na lista, com o motivo; nunca há troca silenciosa.
Confirme no código o que força Pix / À vista. Se for a RN-VEN-13, ela foi implementada como bloqueio, mas o texto da regra é "só à vista ou com aprovação".
Pronto quando: teste do `domain` com cliente inadimplente: Boleto + prazo válido → pedido válido com destino aprovação; forma não permitida → desabilitada com motivo; print do APK antes/depois; testes avisado para regressão.

Frente G — Bug: Salvar fica processando com a tela do pedido aberta (modulo-vendedor + modulo-core)
Contexto: vídeo de 08/11, 10:34–10:35. Pedido de 1 item (Água mineral 1,5 L fardo 6, 1 FD, R$ 19,90), CIF, Pix, À vista. Resumo → [Salvar] → folha "Salvar pedido" ("Enviar pedido · Vai direto ao ERP" / "Salvar como orçamento · Válido até 15/11." / "Voltar"). Ao tocar em "Enviar pedido", a folha fecha, a tela continua aberta e o [Salvar] gira por pelo menos 9 s, até o fim da gravação. A aba Pedidos mostra o selo "1" por um instante e ele some.
Esperado (RN-VEN-30 com o acréscimo da Frente C, RF-VEN-04, RN-CORE-23 item 2, RN-VEN-33): 1. Valida no aparelho (offline, RF-VEN-02). 2. Grava o pedido local como `na_fila` e fecha a tela na hora, em menos de 1 s. O pedido fica somente leitura enquanto estiver `na_fila`. 3. Abre o detalhe do pedido (ou a lista Pedidos) com "Pedido salvo · enviando". 4. O envio sai pela fila comum do sync, em segundo plano, com retentativa e UUID idempotente. 5. Recusa da API (ex.: `preco_abaixo_minimo`) volta como status com o motivo; o pedido pode ser reaberto para corrigir.
Motivo: com a tela aberta durante o processamento, o vendedor pode mexer no pedido e gerar erro; além disso, o salvar precisa funcionar igual sem sinal.
Pronto quando: teste: salvar sem sinal fecha a tela e deixa `na_fila`; com sinal, sobe sozinho; reenvio não duplica; modulo-core confirma que o envio usa a fila comum; print do APK antes/depois; testes avisado para regressão.

Fechamento da rodada
* Quadro: 8 tarefas novas com dono, coluna Onde (local/nuvem) e dependências: B depende de A; D, E e G dependem do texto da Frente C, mas podem começar pelo `domain`.
* Paralelismo: D, E, F e G mexem nos mesmos arquivos do Novo pedido. Organize para não colidir (sequência sugerida F → D → E → G, ou divisão por arquivo).
* Definição de pronto de cada tarefa: lint, typecheck e testes verdes; `node scripts/coord.mjs verificar` sem violações; revisão do engenheiro sem 🔴; docs e quadro atualizados.
* Reteste: quando D a G estiverem prontas, gere o APK de teste e me mande um recado `entrega` (para `alexandre`) com: a lista do que retestar; prints antes/depois; os números T-nnnn.
* Fim da rodada: commit, pull e push pela regra de git, só com tudo verde.

Anexo — definição do agente (`.claude/agents/corretor-redundancias.md`): o texto integral está na mensagem do chat; o engenheiro-software recebe o texto exato no despacho da T-0123 e o grava sem mudanças.
