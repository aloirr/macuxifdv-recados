---
id: R-20261108-161014-corretor-redundancias
de: corretor-redundancias
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0124
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T16:10:14-04:00
---
# T-0124 redundâncias do Início (shell): RD-0002 a RD-0010 e RD-0012, com antes → depois

## Contexto
Esta é a 1ª auditoria de redundâncias da T-0124, no Início do Campo (vendedor), a partir do print de domingo 08/11 e dos achados do dono do produto (R-20261108-101838). O relatório completo está em docs/qualidade/redundancias/2026-11-08-inicio-campo.md. Conferi tudo na versão atual, já com a sua correção do RD-0001 (R-20261108-154308). Os achados continuam valendo, alguns com contagem menor. Pelo coord dono, quem desenha Boas-vindas, Recados e o cartão Meta (com Positivação, Visitas e Cobertura) é o shell, não o Core. Por isso a maior parte vem para você. O texto do dono do produto é a proposta. Você pode ajustar, desde que justifique na entrega.

## O que preciso / o que mudou
**RD-0002 (alta). Progresso do mês em 4 representações** (lib/inicio.ts:211, :219-224; components/inicio.tsx:127, :138)
- Antes: `META DO MÊS · mês 0%` / `R$ 553 · de R$ 180.000` / barra / `Hoje não é dia útil · faltam R$ 179.447 no mês`
- Depois: `META DO MÊS · 0,3%` / `R$ 553 de R$ 180.000` / barra / `Faltam R$ 179.447 · R$ 9.445 por dia útil (19 dias)`
- Em dia útil, a última linha vira `Meta de hoje R$ X` (meta_dia). O valor por dia útil vem pronto do Core: pedi ao modulo-core um aditivo na meta_hoje. Não faça a conta no shell.
- Abaixo de 1%, o percentual vai com 1 casa ("0,3%").
- Atenção: a proposta faz do cartão um cartão do mês também em dia útil, e o realizado de hoje sai do Início. Isso muda a referência da T-0076 (docs/design/inicio.md §1.3). Pedi a decisão ao gerente e a atualização do doc ao designer-ux. Espere o ok do gerente antes de mexer no dia útil. O domingo pode seguir já.

**RD-0003 (média). "hoje" repetido** (lib/inicio.ts:44, :223, :231; components/inicio.tsx:64)
- `RECADOS DE HOJE` → `RECADOS`. A lista são as 3 primeiras da caixa, não só as de hoje.
- `Faltam R$ X hoje` sai com o RD-0002.
- Na Gestão: `META DE HOJE DA EQUIPE` segue a mesma regra.
- No máximo 1 "hoje" por cartão. O título do seed "Prioridade de hoje" ficou com o banco-dados.

**RD-0004 (média). "mês" repetido no cartão** (lib/inicio.ts:211, :223)
- `mês 0%` → `0,3%`
- `faltam … no mês` → `Faltam … · R$ … por dia útil (N dias)`
- "Mês" fica só no título.

**RD-0005 (média). Unidade repetida** (lib/inicio.ts:164-170 valorDe, :253-256 desenhoDaLinha)
- `1 cliente de 15 clientes` → `1 de 15 clientes`
- `0 visitas de 90 visitas` → `0 de 90`
- `0% meta 90%` → `0% de 90%`
- A unidade aparece uma vez, no fim, e só quando o rótulo não a diz.

**RD-0006 (média). O mesmo fato dito 2 vezes** (lib/inicio.ts:44 e :223)
- Boas-vindas com `dia_util` falso: `Sem rota hoje · não é dia útil`
- Dia útil sem paradas: `Sem rota hoje`
- Com paradas: sem mudança.
- O cartão Meta não diz mais "Hoje não é dia útil".
- A VisaoInicio já traz `dia_util` (inicio-local.ts:168), então o Core não precisa mudar.

**RD-0007 (média). Formato diferente na mesma lista** (lib/inicio.ts:225-226, do_mes)
- `Cobertura 0% meta 90%` → `Cobertura 0% de 90%`
- Opcional: rótulo `Cobertura da rota`.
- Fundir Visitas com Cobertura é decisão de produto. Levei ao gerente; não mexa nisso.

**RD-0008 (média). Aviso de dado antigo preso ao cartão** (index.tsx:45-46, :74; components/inicio.tsx:143-147; lib/inicio.ts:264-267)
- Tire a prop `aviso` do MetaDeHoje e passe o texto ao BotaoSincronizar. Pedi ao designer-ux uma prop opcional para isso no kit.
- Texto: `⟳ Dados de 06/11, 6h28 · Sincronizar`.
- Sem cópia de vendas: `Sincronize para ver as vendas`, no mesmo lugar.
- Só um aviso na tela.

**RD-0009 (baixa). Recados** (components/inicio.tsx:63-72, :86, :91-95, :100-102; lib/inicio.ts:118)
- Título e corpo num texto só, de 2 linhas: `Prioridade: passe cedo no Mercadinho São Jorge — título vencido e …`. A hora fica no apoio.
- Com 1 item só, sem bolinha. O ", novo" do leitor de tela continua.
- Sem `Ver todos` quando `itens.length < 3`. Para o caso de exatamente 3, pedi ao Core um `recados_hoje.total` aditivo.
- O toque no topo do cartão abre a central.

**RD-0010 (baixa). Barras vazias seguidas** (components/inicio.tsx:158)
- As linhas Positivação, Visitas e Cobertura ficam sem barra. Só o cartão principal tem barra.

**RD-0012 (média). Contornos que repetem o Core e nunca rodam**
- `saudacao` (lib/inicio.ts:15-19) repete `saudacaoDoDia` do Core.
- O ramo de contorno de `recadosDeHoje` (lib/inicio.ts:123-152) e o `quandoCurto` (:62-70) repetem o domain do Core.
- O `semCopia` com `base.dia === null` (index.tsx:45) repete o `sem_realizado` do Core.
- O % do mês e o "faltam" sem `pronto` (lib/inicio.ts:211, :230) repetem o `resumoMetaDeHoje` do Core.
- O `montarInicio` sempre preenche saudacao, recados_hoje, meta_hoje e sem_realizado (inicio-local.ts:179-187).
- Proposta: apagar os contornos e os testes deles, e usar só os campos prontos. Pedi ao modulo-core que torne esses campos obrigatórios na VisaoInicio. Combinem a ordem: primeiro o Core, depois o shell, ou tudo no mesmo commit.

## Pronto quando
- Print do APK antes e depois, no domingo e num dia útil, no recado de entrega, com --responde-a este recado.
- Testes de lib/inicio.test.ts e inicio-tela.test.tsx atualizados, com lint, typecheck e testes verdes.
- Eu faço o reteste e fecho os RD no catálogo.
