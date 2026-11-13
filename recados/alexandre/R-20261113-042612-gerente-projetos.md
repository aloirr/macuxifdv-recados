---
id: R-20261113-042612-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T04:26:12-04:00
---
# Plano firme v1.0.5: BUILD PRONTO demo segunda 16/11 ~10h, oficial terça 17/11; abrir agora N-A, N-B, N-C e N-G (prompts nos anexos)

## Contexto
O plano firme da v1.0.5 chegou do engenheiro-software, na entrega R-20261113-025203, com cópia para você. Ele **substitui a minha previsão parcial das 2h** (sábado, 20h), que estava otimista. O detalhamento soma 14 frentes e **cerca de 256 horas de agente**, e o modulo-core é o gargalo.

**Os dois arquivos estão em `recados/anexos/`:**
- `2026-11-13-v1.0.5-plano.md`: as frentes, os donos, as horas e o caminho crítico;
- `2026-11-13-v1.0.5-nuvem-prompts.md`: 8 prompts prontos para colar.

## Previsão firme
- **BUILD PRONTO demo da v1.0.5: segunda, 16/11, por volta das 10h de Manaus.** A janela vai de domingo, 15/11, 22h, a terça, 17/11, 10h.
- **Oficial:** terça, 17/11, por volta das 12h, depois do seu teste. Cada rodada de correção soma 1 dia.
- **Caminho crítico:**
  1. **M0**: commit do lote atual no main, hoje, 13/11, às 12h. Ele libera as migrações 0062 e 0063, que hoje só existem no PC.
  2. O servidor da T-0170 roda na nuvem.
  3. A costura é feita no PC.
  4. Depois vêm o testes, o corretor e o design-de-marca, a revisão do engenheiro e o ensaio.
  5. Por fim, o build.
- **Indicadores sem dado:** km por dia, km por cliente e raio sem coordenada mostram "—".

## Frentes da nuvem
**Abra agora**, porque só criam arquivos novos e não colidem com o PC:
- **N-A**: Performance, domain e contratos (modulo-core);
- **N-B**: tarefas, frase do dia e avatar, domain e contratos (modulo-core);
- **N-C**: cards de Pedidos, domain (modulo-vendedor);
- **N-G**: roteiro e testes de valor × regra da Performance (testes).

**Esperam:**
- **N-D**, o servidor da T-0170, e **N-H**, os RD de Pesquisa e Treinamento, esperam o M0 às 12h;
- **N-E**, o BKO de tarefas, frases, metas e calendário, e **N-F**, as telas de Performance e de Recados e tarefas, esperam o merge de N-A e N-B.

Já travei no quadro os caminhos de N-A, N-B, N-C e N-G. Ao terminar, cada sessão marca o PR como "[PRONTO PARA MERGE]" e eu faço o merge pela regra A, quando o GitHub deixar.

**Atenção:** os prompts citam os desenhos `performance-produtividade.md`, `tarefas-consultor.md` e `inicio-frase-avatar-pedidos.md`. Eles estão nas branches `nuvem/T-0170-*`, que ainda não entraram no main, porque o guardião continua barrando o merge pelo GitHub lento. Faça o merge dessas branches pelo navegador **antes** de abrir N-A e N-B, ou cole o caminho da branch no prompt.

## Outras frentes
- **Kit do piloto:** o testes achou um último defeito baixo, os passos 1, 2, 3, 5 na tela do instalador, e o zip tem de ser remontado. A integração corrige junto com os 3 ajustes do corretor. **Link por volta das 5h.**
- **T-0168:**
  - o vendedor faz a trava pelo % dos Totais (8,04% não trava, 8,05% trava) e a frase sem "do vendedor";
  - o gestor faz o pedido em nome do vendedor;
  - o core faz a aba Parâmetros.
- **T-0171 e Catálogo novo:** o designer está fechando as imagens. Elas passam pelo corretor antes de virem para você.
- **T-0172, marca v1:** a tela de entrada, os ícones, a splash, o favicon e os tokens estão no código. Falta o print do aparelho, que só sai no build.
- **Regras do corretor:** o patch está pronto. Eu aplico pelo rito no M0, junto com o lote.

## Reabrir o VS Code
**Mantido: hoje às 7h.** O "pode reabrir" sai às 6h30.

## O que preciso
1. Abrir as sessões N-A, N-B, N-C e N-G. Antes, faça o merge das 3 branches de desenho pelo navegador.
2. Fazer o merge do PR #116 (marca), se puder. Use squash, com `Agente: design-de-marca` na descrição.

## Pronto quando
As 4 sessões da nuvem estão abertas.
