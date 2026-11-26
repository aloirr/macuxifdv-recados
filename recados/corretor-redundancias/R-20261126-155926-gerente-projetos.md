---
id: R-20261126-155926-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [banco-dados, corretor-redundancias, engenheiro-software, modulo-catalogo, modulo-integracao]
tipo: entrega
prioridade: alta
tarefa: null
responde_a: R-20261126-120605-alexandre
encerra: false
contrato: null
criado_em: 2026-11-26T15:59:26-04:00
---
# #771 no main (fc5a6956, CI verde); SHA do ensaio continua 4c35d7ba; Teste 003 sem vínculo com a tabela (ERP); v1.0.37 em 27/11 até 18h

## Contexto
Respondo aos recados R-20261126-120605, R-20261126-120649 e R-20261126-120737. Uma correção antes: a ronda das 12h13 registrou o -120605 e o -120649, mas eu não os li antes do meu recado das 15h39. Por isso aquele recado ainda tratava o #771 como "falta a frase". Peço desculpas.

## 1. #771 no main (prioridade 1): feito
- **Pareceres no SHA c2543282:**
  - **corretor-redundancias: LIBERADO**, no comentário 7201969058. A rodada cobriu o 3acce47d (motor novo desligado) e os dois merges do main (um conflito, em `estatico.test.ts`, resolvido certo). Ficou um achado baixo, o RD-3729: "nasce migrado" em 4 comentários e no plano do banco deveria dizer "derivado". Vai para o próximo PR do banco-dados.
  - **engenheiro-software: sem 🔴**, no comentário 7201969610. Os dois pontos de atenção:
    - **🟡 1:** a 0106 aborta o deploy inteiro se algum perfil com usuário derivar diferente do acesso de hoje. Por isso o ensaio em produção é condição do liberar.
    - **🟡 2:** os testes de banco deste SHA rodam inteiros só no liberar.
- **Título corrigido** para "0105 a 0107", sem mudar o head.
- **Merge squash fc5a69563d5e6e21854d8c629712ab5f8939a344**, com a frase do R-20261126-120605 no corpo. O #771 entrou sozinho, e o **CI do main ficou verde** (run 45886366642).

## 2. SHA do ensaio das 21h30 (prioridade 4): **continua 4c35d7bac367b43feefd9780a628297099d176ac**
- Conferido às 15h58. As migrações 0105 a 0107 são idênticas no #771 (já no main) e no #801. O #801 acrescenta só a 0108.
- Simulei o merge do #801 com o main fc5a6956: a árvore resultante é **idêntica** à do head 4c35d7ba. Ou seja, o main não trouxe nada que o #801 não tenha.
- O #801 aparece como `dirty` só porque os arquivos do #771 voltam pelo squash. Quando o banco-dados juntar o main ao #801, o **head muda**, mas o conteúdo não. O ensaio pode rodar no 4c35d7ba, que é um PR aberto, como o workflow exige.
- **Disparo:**
  - Actions → "producao — ensaio das migrações (termina em ROLLBACK)" → **Use workflow from: tag v1.0.36**;
  - **sha: 4c35d7bac367b43feefd9780a628297099d176ac**;
  - aprovar o PRODUCAO.
- Se o head do #801 mudar antes das 21h, mando o SHA novo até as 21h.

## 3. Cliente Teste 003 (prioridade 2): o diagnóstico de 25/11 (run 45618150558) explica o caso
Dados da AM2808 em 25/11, às 8h53:

| Entidade | Recebidos | Aceitos | Recusados | Erro |
|---|---|---|---|---|
| Cliente | 58 | 30 | **28** | `regra_invalida` em `vendedor_external_id` |
| Preço | 155 | 109 | **46** | `regra_invalida` em `produto_external_id` |
| Filial 0001 | | | | **1 tabela de preço com 46 itens** |

Pelo código (`modules/catalogo/api/consumidores-erp.ts`), o vínculo cliente → tabela (`catalogo.cliente_tabela_preco`) **só vem do ERP**, no campo `tabela_preco_external_id` do cliente. O BKO não tem tela para ligar a tabela a um cliente.

**Leitura:** a tabela existe e tem itens. A lista vem vazia porque o **CLI-003 não está ligado a ela**, por um destes dois motivos:
- o cliente chegou do ERP sem `tabela_preco_external_id`; ou
- ele está entre os 28 clientes recusados (vendedor inexistente). Ele tem código FDV 00004, então nasceu como pré-cadastro no app e foi devolvido pelo ERP. Sem cliente aceito, não há vínculo.

**Correção:** é no **ERP**, não no código nem no BKO. O ERP precisa mandar o CLI-003 com um vendedor válido e com a tabela de preço dele. Quando a carga de Clientes passar, o vínculo é criado sozinho. O caminho do R-20261125-154052 também serve: corrigir o vendedor no BKO, aba Clientes, e esperar o timer da integração.

**Para fechar hoje:** não consigo ver o registro do CLI-003 daqui. O Agente PO abre, no BKO › Integração › Dados, os recusados de Cliente e confirma se o CLI-003 está entre os 28. Se estiver, a correção acima resolve. Depois, o senhor sincroniza o aparelho e testa.

## 4. Os 5 PRs vermelhos (prioridade 3): plano
Os commits de cada dono, fora das bases (#801 e #782), são poucos:

| PR | Commits do dono | Base |
|---|---|---|
| #802 core | 49413d87, 157355e5, 4d4d3f47 | #782 |
| #803 pesquisa | a781bea7 | #782 |
| #804 promotor | ac62a155 | #782 |
| #807 E4 | 5d8f3619, ff31a52d | #801 e #782 |
| #808 E4b | df74accf | #801 e #782 |

Cada um vira um branch novo a partir do main, **depois do merge da base dele**, só com os commits do dono (cherry-pick). Não uso force push. O PR antigo fecha apontando para o novo. O #782 está `clean` e com o CI verde, mas o parecer LIBERADO dele é do 49323bea, e o head atual é bbed2564: preciso refazer o parecer nesse head e receber a frase.

## Previsão da v1.0.37 (com folga de 15%)

| Passo | Quando (Manaus) | Depende de |
|---|---|---|
| #771 no main | **feito, 15h50** | — |
| Parecer do #782 no bbed2564 e frase; merge | 26/11, até 18h | frase do senhor |
| #801: juntar o main, parecer no head novo e frase; merge **depois do ensaio verde** | 26/11, 22h | ensaio das 21h30 |
| #805, #802, #803 e #804 refeitos, juntos | 27/11, até 10h | #782 no main; 4 frases |
| E4 e E4b refeitos | 27/11, até 13h | #801 no main; 2 frases |
| T-0197 (mensagem da tela vazia) e T-0198 (Salvar sem itens) | 27/11, até 15h | código, testes e pareceres |
| Liberar, deploy e APKs 1.0.37 | **27/11, até 18h** | "aprovo deploy v1.0.37" |

**v1.0.37 no ar em 27/11 até as 18h.** Atrasa em relação aos "até 12h" do recado das 15h39, porque os 5 PRs refeitos e os dois defeitos com APK não cabem na manhã.

## Pronto quando
O ensaio das 21h30 rodou verde e a fila acima andou. Mando a próxima atualização às 21h45, com o resultado do ensaio.
