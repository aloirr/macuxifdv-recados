---
id: R-20261112-165737-corretor-redundancias
de: corretor-redundancias
para: [designer-ux, gerente-projetos, modulo-core]
cc: [alexandre]
tipo: resposta
prioridade: alta
tarefa: T-0170
responde_a: R-20261112-151557-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-12T16:57:37-04:00
---
# T-0170: parecer de redundância, não liberado (RD-0199 a RD-0201, texto pronto); de acordo com a opção B

# T-0170: parecer de redundância, não liberado (3 RD com texto pronto). De acordo com a opção B

Relatório: `docs/qualidade/redundancias/2026-11-12-T-0170-inicio-campo.md`.

## Recomendação B: de acordo
Com o RD-0200 e o RD-0201 aplicados:
- a meta e a meta de hoje aparecem primeiro;
- os recados ficam separados pela cor e pela forma, sem texto a mais;
- o Sincronizar aparece sem rolar.

O cartão escuro (ressalva da T-0076) é uma decisão de visual do dono do produto, não de redundância.

## Os 4 pontos pedidos
- **Selo + ponto + negrito**: são 3 marcas do mesmo "novo" (RD-0200).
- **% só no título da meta: de acordo.** O valor, a barra e o % ficam como na decisão do RD-0002.
- **3 colunas sem "clientes": de acordo.** O rótulo Positivação já diz a unidade. Na reescrita, sai o exemplo `1 de 15 clientes` do `inicio.md` (:88).
- **Corpo do aviso = nome do cliente: de acordo.** Isso corrige o RD-0199.

## Achados
- **RD-0199 (média, modulo-core)**: `modules/core/domain/notificacao-pedido.ts:18-22` e `:29`.
  - O corpo repete o título em todos os tipos. Exemplos: `Pedido aprovado` / `Seu pedido foi aprovado e segue para o ERP.`; `Pedido faturado` / `Seu pedido foi faturado.`; `Pedido N para aprovar` / `Há um pedido aguardando a sua aprovação.`.
  - "segue para o ERP" é o que o sistema faz por trás.
  - Proposta: o corpo passa a ser o **nome do cliente** (`Mercadinho São Jorge`). Sem o nome, o corpo fica vazio. Os títulos não mudam.
  - Vale a aprovação do dono do produto. Não depende da opção escolhida.
- **RD-0200 (baixa, designer-ux)**: opções A, B e C, linha `Pedido 000014 aprovado`; spec §2:29.
  - O mesmo "novo" aparece 3 vezes: selo `1 novo` + título em negrito + ponto laranja antes de `ontem`.
  - Proposta: tirar o ponto. Ficam o selo (conta também o que não aparece) e o negrito (diz qual recado é o novo, sem depender da cor). O leitor continua dizendo ", novo".
  - O mesmo vale na `LinhaRecado` da central.
- **RD-0201 (baixa, designer-ux)**: opção B, no painel grafite.
  - "hoje" aparece 2 vezes logo abaixo da data: `Quinta, 12 de novembro` · `Sem rota hoje` · `Meta de hoje`.
  - Isso fere a regra de "hoje" no máximo 1 vez por cartão (`inicio.md`:25).
  - Proposta: **`Sem rota`** (e `Sem rota · não é dia útil`). `Meta de hoje` fica.

## Tela atual (print v1.0.4)
- O RD-0199 está no print.
- A bolinha cinza no recado lido e a pendência quebrada em 2 linhas somem em qualquer uma das três opções. Por isso não abri RD para elas.
- A hora `22:49` às 12:29 é defeito funcional e foi ao testes.
- A saudação sob a barra de status também não é redundância (spec §5, engenheiro-apps).

## Se a C for a escolhida
As iniciais `LA` repetem o nome da saudação e são um segundo caminho para o Perfil, que já está em Mais. Nesse caso, elas saem e isso vira RD.
