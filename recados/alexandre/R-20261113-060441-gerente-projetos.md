---
id: R-20261113-060441-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pergunta
prioridade: alta
tarefa: null
responde_a: R-20261113-053159-alexandre
encerra: false
contrato: null
criado_em: 2026-11-13T06:04:41-04:00
---
# Kit do piloto PRONTO (link); o que houve com a v1.0.5; build intermediário hoje ~20h (A) ou tudo 16/11 (B); pode fechar o VS Code

## Contexto
Resposta ao R-20261113-053159 e aviso do kit.

## Kit do piloto PRONTO
- **Link:** https://github.com/aloirr/macuxifdv/releases/tag/kit-piloto-v1.0.0, como pré-release.
- **Arquivo:** `macuxi-kit-piloto-1.0.0.zip`, com 44,9 MB, o Conector 1.4.0 dentro e SHA-256 `5a406faec8418f0aa6fd55be4c0dd4ac4a0fa1201cbf1347e86ae96a3763dcb7`.
- **Liberado** pelo testes e pelo corretor: 15 ajustes e 7 defeitos corrigidos, entre eles um comando quebrado no roteiro.
- **Siga o `ROTEIRO.md` de dentro do zip.** O aceite final é o 1º uso no seu notebook.

## 1. O que houve com a v1.0.5
- **As datas que eu dei antes das 21h de 12/11 eram otimistas.** Cada pedido aprovado durante o dia entrou sem eu refazer a conta inteira: o lápis Editar, a T-0168 às 12h11, a T-0171 às 18h e a marca v1 às 19h20. Eu só empurrei a hora.
- **O PC está no limite:** lint e typecheck levam mais de 40 minutos por pacote com 7 agentes. Cada entrega atrasou de 1 a 2 horas.
- **O GitHub ficou instável a noite toda:**
  - recados levaram até 30 minutos para gravar;
  - a minha caixa atrasou e deixou você sem resposta por horas;
  - o guardião barrou os merges.
- **O main ficou vermelho por fora:** a imagem do Postgres de teste mudou para a 16.16. Isso já foi corrigido pelos PR #121 e #123, e o CI está verde em bebd60fd.
- **A falha é minha:** eu devia ter separado um build intermediário logo que o escopo cresceu, em vez de deslocar a data.

## 2. Build intermediário só com o lote do M0
- **O que entra:**
  - T-0165, Novo pedido com o lápis;
  - T-0166, menos alertas;
  - T-0167, busca;
  - T-0168, limite de desconto;
  - T-0171, lista de Clientes com Devendo e Pré-Cadastro, mais as listas do Gestão;
  - T-0172, marca v1: cores, tela de entrada, ícones, splash e logo do PDF.
- **O que fica de fora**, para a v1.0.6 ou um 2º build: T-0170 (Início novo, sino, Recados e tarefas, Pedidos com cards, Performance, frase, avatar), o Catálogo em grade (T-0173) e o resto das listas do corretor.
- **Data:**
  1. M0 às 12h.
  2. Ensaio no CI das 12h às 15h.
  3. Validação do design-de-marca e do corretor no print.
  4. Build EAS.

  **BUILD PRONTO Campo-Demo-v1.0.5 / Gestao-Demo-v1.0.5 hoje, 13/11, por volta das 20h de Manaus**, se o ensaio passar de primeira. Com uma rodada de correção, sábado de manhã.
- **Ou** manter tudo na v1.0.5 para segunda, 16/11, por volta das 10h.
- **Recomendo o intermediário hoje.** Você testa a T-0165 até a T-0168 e a marca já, e a T-0170 vira a v1.0.6.

## 3. Bloqueio do typecheck
O import duplicado em `modules/vendedor/domain/aprovacao.ts` já foi corrigido pelo vendedor: lint e typecheck do pacote estão com 0 erros na entrega das 5h. Falta conferir o `modules/core/contracts/sync.ts:79`, que o core está mexendo. O M0 só sobe com o typecheck limpo no PC; confiro às 11h.

## Fechar o VS Code
**Pode fechar agora.** O arquivo `docs/status/retomada-2026-11-12.md` tem tudo, inclusive o que relançar: o core e o testes param no meio, e o trabalho deles fica no disco. Ao abrir, escreva: "Retome a esteira: leia docs/status/retomada-2026-11-12.md e a caixa do gerente".

## O que preciso
Escolha o caminho: **(A)** build intermediário hoje, com a T-0170 e o Catálogo na v1.0.6, ou **(B)** tudo para 16/11.

## Pronto quando
A escolha está na caixa da sessão nova.
