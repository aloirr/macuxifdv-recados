---
id: R-20261112-213045-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pergunta
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T21:30:45-04:00
---
# Status 21h: corretor explica a lista de Clientes (17 RD nas listas); kit liberado pelo testes; T-0172 em curso; BUILD PRONTO v1.0.5 13/11 ~14h; 5 decisões

## Contexto
Status das 21h. São 7 vagas: corretor (2), designer, core, engenheiro-apps, vendedor e testes.

**Lista de Clientes: o corretor explica por que passou (R-20261112-203444)**
- **Por que passou:** faltava no checklist dele a regra "uma informação por linha de lista". Ele julgava cada chip sozinho.
  - A lista passou no parecer da T-0166 (item A55, "fica") e no reteste da v1.0.3 (RD-0075).
  - A simulação de marca da nuvem nunca chegou a ele.
- **O que muda:**
  - ele lê cada lista linha a linha: tag, linha de baixo e lado direito;
  - **toda imagem que vai a você passa por ele antes**, inclusive as da nuvem e do design-de-marca;
  - a regra já está no catálogo dele.
- **A auditoria das outras listas achou 17 RD** (RD-0202 a RD-0218). São 5 de gravidade alta:
  - Clientes (`LinhaLocal` e `CustomerRow`, que mostra "52 dias sem compra" e "há 52 dias" na mesma linha);
  - a simulação de marca;
  - Equipe do Gestão, com "Sem check-in" duas vezes;
  - Treinar, com "Atrasada" duas vezes.

  O resto é média ou baixa: Rota, Pedidos, Catálogo, Aprovações, Alertas, Notificações, Pesquisas, Rascunhos, Fila e 3 listas do BKO. O relatório é `docs/qualidade/redundancias/2026-11-12-T-0171-listas.md`.

**Kit do piloto (T-0162)**
- O testes **liberou** o kit nos testes sem Windows: os 6 defeitos estão corrigidos e os 23 casos, verdes.
- O parecer do corretor sai até as 22h30.
- Depois disso, o kit vira o pré-release `kit-piloto-v1.0.0`, com o `macuxi-kit-piloto-1.0.0.zip`. O aceite final é o 1º uso no seu notebook.

**v1.0.5**
- **T-0165, T-0166 e T-0167:** o código e as specs foram corrigidos. O corretor faz o reteste final até as 22h.
- **T-0168:** banco, desenho e testes estão prontos. Core, vendedor e gestor começam no seu "aprovo".
- **T-0172, marca v1:** começou às 20h30.
  - designer: tokens Azul noite e Pérola, e a spec da entrada;
  - core: etapas da carga;
  - engenheiro-apps: ícones, splash e a tela única de entrada;
  - vendedor: logo do PDF.
- **PR #116 (marca):** o merge continua barrado, porque o GitHub não responde em 20 s. Os agentes leem os arquivos direto do commit do PR.

**Nova previsão do BUILD PRONTO da v1.0.5:** sexta, 13/11, **por volta das 14h de Manaus**. Ela vale se você aprovar a T-0168 e a T-0171 até as 22h. O caminho mais longo é a T-0172 (tela de entrada e cores em todas as telas), mais a validação de marca e o ensaio.

## O que preciso
1. **Aprovar as imagens v2:** T-0168, a opção da T-0170 e a T-0171 (recado anterior).
2. **Os 17 RD da auditoria das listas:**
   - **(a) proposta:** os 5 altos entram na v1.0.5, porque já estão nas telas que mudam;
   - **(b)** os médios e baixos vão para a v1.0.6;
   - ou todos na v1.0.5, com o build na sexta à noite.
3. **Regra nova do corretor no arquivo dele** (`.claude/agents/corretor-redundancias.md`, caminho seu): "uma informação por linha de lista" e "toda imagem que vai ao dono do produto passa por ele antes". Autoriza, e eu aplico pelo rito de governança?
4. **RD-0204, simulação de marca da nuvem:** repasse à sessão do design-de-marca. A lista de Clientes da simulação tem de seguir a T-0171.
5. **Reabrir o VS Code:** com a T-0172 rodando, proponho às **2h** (fim da onda da marca), ou amanhã às 7h, antes do ensaio. Diga a hora.

## Pronto quando
As 5 respostas estão na minha caixa.
