---
id: R-20261126-153948-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [todos]
tipo: resposta
prioridade: alta
tarefa: null
responde_a: R-20261126-115452-alexandre
encerra: false
contrato: null
criado_em: 2026-11-26T15:39:48-04:00
---
# Teste 003: lista vazia por falta de preço vigente na tabela do cliente (dado, não aparelho); ensaio 21h30 pela v1.0.36; v1.0.37 com os 2 defeitos em 27/11 até 12h; os 5 pedidos já no ar

## Contexto
Resposta ao R-20261126-115452 ("faça tudo agora"). Também fecha o R-20261126-110635, que o meu R-20261126-114306 respondeu sem o vínculo. Ronda do gerente ativa a cada 10 min neste notebook desde as 12h03.

## 1. Cliente Teste 003 (CLI-003): conferência pelo código e pelos recados; o banco de produção não foi consultado
- **Como o app monta a lista dentro do pedido** (`modules/catalogo/app/lib/local.ts`, `contextoLocal` e `produtosDaNavegacao`):
  - entram só os produtos com **preço vigente na tabela ligada ao cliente** (`cliente_tabela_preco` → `tabela_preco` ativa → `tabela_preco_item` na filial do cliente);
  - sem vínculo, com a tabela inativa ou sem item vigente, a lista fica **vazia** e a tela cai em "O catálogo ainda não está no aparelho";
  - nunca cai na tabela padrão (RN-CAT-06).
- **O que os recados mostram:**
  - em 24/11, o mesmo cliente mostrava "Sem preço para este cliente" em todos os itens (R-20261124-110450);
  - a carga de **Preços** da AM2808 estava "Com falha" no monitor, com recusas `regra_invalida` em Vendedores, Prazos e Unidades (R-20261124-090510).
- **Leitura do gerente:** a causa mais provável é **dado**. O CLI-003 não tem preço vigente na tabela dele, porque a carga de preços do ERP falhou ou porque falta o vínculo cliente → tabela. Não é aparelho, e não é falta de sincronizar.
- **O que eu não consegui:** confirmar no banco de produção. Este notebook não tem credencial de produção, e o token não dispara workflow (403). O diagnóstico de hoje (`producao-diagnostico-outbox.yml`, código AM2808, contagem do catálogo e da integração ligadas) mostra a contagem de itens por tabela e filial e a situação da carga de Preços. Não mostra o vínculo de um cliente só.
- **Correção do cadastro:** é do BKO ou do ERP, não do código. Se o CLI-003 estiver sem tabela, a correção é ligar a tabela a ele no ERP e reenviar a carga. Se a tabela existir sem itens, é reenviar a carga de Preços.
  - **Pedido ao Agente PO**, que tem o acesso:
    - rodar o diagnóstico acima;
    - abrir o CLI-003 no BKO, em Clientes, e na aba Dados da Integração ver a tabela dele e a carga de Preços;
    - avisar o senhor para testar no aparelho depois de sincronizar.
- **No código, na v1.0.37** (T-0197): dentro do pedido, a tela vazia passa a dizer a **causa real**:
  - "Este cliente não tem tabela de preço";
  - "A tabela deste cliente não tem produto com preço".
  
  "O catálogo ainda não está no aparelho" fica só quando o aparelho não tem catálogo nenhum.

## 2. Ensaio dos perfis, hoje às 21h30
- **Disparo** (o gerente desta sessão não dispara; precisa do Agente PO ou do senhor):
  - Actions → "producao — ensaio das migrações (termina em ROLLBACK)" → Run workflow;
  - **Use workflow from: tag v1.0.36**;
  - **sha: 4c35d7bac367b43feefd9780a628297099d176ac**: é o head do #801, PR aberto que traz as migrações 0105 a 0108;
  - aprovar o environment PRODUCAO.
  
  O ensaio termina em ROLLBACK, tem teto de 10 min, e a conferência final confirma que nada ficou gravado.
- **Às 21h45**, a ronda confere o resultado e mando o recado com o link do run. A produção continua na v1.0.36, e `/v1/saude` responde "v1.0.36" agora.

## 3. v1.0.37: previsão
- **Hoje (26/11), até as 18h:**
  - reteste do #771 pelo corretor e pelo testes. O último parecer é do 64a7396c; depois dele entrou o 3acce47d, "motor novo desligado", que muda a 0106 e a 0107;
  - os 5 PRs vermelhos por "agente ambíguo" (#802, #803, #804, #807 e #808) refeitos em branches novos a partir do main, só com os commits do dono, sem force push;
  - os PRs da T-0197 e da T-0198, com teste.
- **Hoje, 21h30:** ensaio. Com o ensaio verde, os merges na ordem:
  1. #771;
  2. #801;
  3. #782;
  4. #805, #802, #803 e #804 juntos;
  5. E4;
  6. E4b;
  7. T-0197 e T-0198.
- **27/11, manhã:** liberar, deploy e os **APKs de Campo e Gestão 1.0.37**.
- **Previsão: v1.0.37 no ar em 27/11 até as 12h**, com os dois defeitos do Campo, com uma folga de 15%. O que pode atrasar:
  - ensaio vermelho;
  - frase de merge;
  - o CI de cada PR, que leva cerca de 20 min.

## 4. Os 5 pedidos de 20 e 21/11
Respondi cada um no próprio recado, com encerramento. Quase tudo já está no ar desde a v1.0.18 a v1.0.20:

| Recado | Situação |
|---|---|
| R-20261120-182722 (data e hora da falha no popup do lote) | **No ar** desde a v1.0.18 (#569) |
| R-20261120-183112 (barra de rolagem, menu Parâmetros, Monitor por entidade, Início do BKO) | **No ar**: menu sem barra (#573, v1.0.18); menu Parâmetros com 13 seções e painéis de 7 módulos (#562/#563/#582, v1.0.18); Monitor por entidade com Histórico (#608 a #610, v1.0.19); Início do BKO (#612 a #617, v1.0.19). **Aguarda o senhor:** a spec (`docs/design/menu-parametros/spec.md` §83) lista parâmetros do doc 03 sem tela no BKO, para o senhor dizer se entram: pedido mínimo, crédito excedido e dias de atraso, estoque insuficiente, validade do orçamento e campos obrigatórios do cliente. O que o senhor aprovar vai para a v1.0.38 |
| R-20261120-183536 (rotas por proximidade e endereço base) | **No ar** desde a v1.0.19 (T-0191: #561, #628 e #629) |
| R-20261120-193511 (aviso da busca inteligente e "BAP amortecedor palio") | **No ar**: o aviso saiu (#577, v1.0.18); investigação (#564) e auditoria (#580); regra "nenhum casa com todas as palavras → lista vazia" (R-20261120-194335) e etapas 3 e 4 da busca (#598 a #601, v1.0.19/20) |
| R-20261121-113040 ("puxar para sincronizar" e lentidão) | **No ar** desde a v1.0.20: T-0192 concluída (#646, "Catálogo do Campo: sem puxar"; melhorias A a F do carregamento) |

**Para a v1.0.38:** só os parâmetros sem tela da §83 que o senhor aprovar. Nada mais dos 5 pedidos fica em aberto.

## Pronto quando
- O Agente PO conferiu o CLI-003 e o senhor testou no aparelho;
- o ensaio das 21h30 rodou verde;
- a v1.0.37 está no ar em 27/11 com os APKs.
