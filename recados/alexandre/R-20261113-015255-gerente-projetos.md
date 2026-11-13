---
id: R-20261113-015255-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: alta
tarefa: null
responde_a: R-20261113-014441-alexandre
encerra: false
contrato: null
criado_em: 2026-11-13T01:52:55-04:00
---
# Plano da v1.0.5 (parcial, estado das 2h): BUILD PRONTO sábado 14/11 ~20h (margem domingo 14h); prompts da nuvem até 3h

## Contexto
Resposta ao R-20261113-014441. Este é o plano parcial do gerente, feito com o estado real de cada frente às 2h. O engenheiro-software ainda está no detalhamento das horas da T-0170 e nos prompts da nuvem: o PC está lento e ele atrasou. Repasso os prompts assim que chegarem, com previsão de 3h.

## Estado às 2h

| Frente | Situação | Falta | Dono |
|---|---|---|---|
| T-0165 Novo pedido + lápis | **corretor liberou** | testes final no lote | — |
| T-0167 busca | **corretor liberou** | — | — |
| T-0166 menos alertas | 2 ajustes do corretor (RD-0234, 0235) | ~1h | vendedor, designer |
| T-0168 limite de desconto | **vendedor pronto** (domain, API e app); banco pronto | core: aba Parâmetros e sync (em curso); gestor: em nome (1h); testes: ajustar o oráculo ao valor exibido | core, gestor, testes |
| T-0171 lista de Clientes | core implementando; designer atualiza a spec (Devendo, Pré-Cadastro) | ~4h | core, designer, gestor |
| T-0172 marca v1 | **tokens prontos**; spec da entrada pronta; etapas da carga prontas | engenheiro-apps: tela de entrada, ícones, splash, `globals.css` (em curso); design-de-marca valida no print | engenheiro-apps |
| Catálogo novo (grade) | designer fazendo a imagem para você aprovar | aprovação → catálogo implementa (~6h) | designer, catálogo |
| Listas do corretor (RD-0202 a 0218) | recados nos donos | ~6h espalhadas | core, gestor, vendedor, treinamento, pesquisa, promotor |
| Kit do piloto | refeito; reteste do testes e do corretor em curso | pré-release e link | integração |
| **T-0170** Início, sino, Recados e tarefas, Pedidos com cards, Performance, frase, avatar | desenhos D1 a D7 e D1 a D6 aprovados | **a maior frente**: banco ~3h, core ~16h (Início, sino, tarefas, frase, avatar, indicadores), apps ~4h (6 abas, Performance), vendedor ~3h (cards), gestor ~3h, BKO ~8h (tarefas, frases, metas de produtividade), testes ~5h | vários |

## Ordem e caminho crítico
1. **Hoje até 7h:** fecham T-0166, T-0168 (core e gestor), T-0171, o kit e o grosso da T-0172. Às 7h você reabre o VS Code.
2. **Sexta, 7h às 23h:** T-0170 em paralelo.
   - **No PC:** core (Início, sino, Recados e tarefas, frase e avatar), engenheiro-apps (abas e Performance), vendedor (Pedidos com cards), gestor, catálogo (grade, depois da sua aprovação) e as listas.
   - **Na nuvem:** banco das tabelas novas, BKO de tarefas, frases e metas de produtividade, e o cálculo dos indicadores de produtividade. Os prompts saem do engenheiro.
   - **Indicadores sem dado ainda** (km por dia, km por cliente, raio): aparecem como "—" até haver rastreamento e coordenadas.
3. **Sábado, 0h às 12h:** testes de todos os critérios, corretor e design-de-marca no print, e correções.
4. **Sábado, 12h às 18h:** lote no main, ensaio no CI e build demo.

**BUILD PRONTO da v1.0.5 (demo): sábado, 14/11, por volta das 20h de Manaus.** A margem vai até domingo, 15/11, às 14h. O risco é o PC lento: lint e typecheck têm levado mais de 40 minutos por pacote. O Oficial sai do mesmo commit, depois do seu teste.

## O que preciso
Nada agora. Às 6h30 mando o "pode reabrir" e, até as 3h, os prompts da nuvem.

## Pronto quando
Lido.
