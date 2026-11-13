---
id: R-20261113-104633-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0172
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T10:46:33-04:00
---
# Passada v1.0.5: T-0166 liberado, T-0171 liberado (Gestão segura por RD-0210), T-0172 NÃO (RD-0239, RD-0240), T-0173 liberado ao dono

# Passada única da v1.0.5 · T-0166, T-0171, T-0172 e T-0173

> 2026-11-13 ~09h30 (Manaus) · corretor-redundancias · pedido do gerente-projetos para o Campo-Demo-v1.0.5 (corte às 11h30).
> Regras de hoje (R-20261113-062739): só achado **médio ou alto** segura o demo; o **baixo** fica registrado e vai para o
> build seguinte; todos os achados numa passada; no reteste, só o que foi corrigido.
> Destino deste texto: `docs/qualidade/redundancias/2026-11-13-v1.0.5.md` (o guardião bloqueou a gravação: ver §6).

## Resultado por tarefa
| Tarefa | Parecer | Segura o demo |
|---|---|---|
| T-0166 | **liberado**. RD-0234 fechado. RD-0235 com sobras (baixa, v1.0.6) | não |
| T-0171 | imagens e spec **liberadas** (RD-0238 baixa). Gestão: RD-0208 e RD-0209 fechados; **RD-0210 reaberto (média)** | só o Gestão (RD-0210) |
| T-0172 | **não liberado**: RD-0239 (média) e RD-0240 (média); RD-0241 baixa | sim (Campo) |
| T-0173 | **liberado** para ir ao dono do produto; RD-0242 baixa. Entra na v1.0.6 | não |

## 1. T-0166 · reteste de RD-0234 e RD-0235
- **RD-0234 corrigido.** `sair-do-pedido.ts:52` `descartar: { rotulo: 'Descartar alterações' }` sem subtítulo; a confirmação
  `:53` fica (`manter`: ação destrutiva). `formulario-pendencias.md` §2.2:105, §2.5:126 e §3:141 só com rótulos.
- **RD-0235 reaberto (parcial), baixa, não segura.** Corrigidos os itens 3 e 4: `PLACEHOLDER_SEM_FORMA` saiu
  (`novo-pedido-abas.tsx:95` usa `VALOR_SEM_DADO`) e `subtituloOrcamento` não existe mais. Sobram, para a v1.0.6:
  1. `leituraDoSalvar` continua no kit (`packages/ui/src/mobile/pendencias.ts:13`; teste `pendencias.test.ts:20-23`) e na tela
     (`novo-pedido-abas.tsx:14,538,552`). `pendencias`/`livre` de `botoesDoResumo` seguem com 0 fixo (`botoes-resumo.ts:82,87`;
     `new-order-screen.tsx:622`; `sair-do-pedido.ts:72`). O `formulario-pendencias.md` §0.0 item 7 (:43-44) já diz que ele saiu.
  2. `ListaSuspensa` ainda tem `erro` (`suspensa.tsx:184,274`); a UF usa `erro` + `Text` próprio (`endereco-pedido.tsx:225-232`).
  3. Resto novo do mesmo achado: `opcoesDaSaidaEdicao` ainda tipa `salvar: { rotulo; subtitulo?: string }` (`sair-do-pedido.ts:56`).
  Ordem: o modulo-vendedor troca os usos e o tipo; depois o designer-ux apaga `leituraDoSalvar` e a prop `erro` do kit.
- Ao testes (não é RD): §2.2:105 diz **Descartar** na edição do orçamento; o código diz **Descartar alterações**
  (`sair-do-pedido.ts:52`). A confirmação da edição não está no §3.

## 2. T-0171 · Clientes (imagens e spec) e listas do Gestão (código)
### 2.1 `T-0171-clientes-depois.png`, `-gestao.png` e `clientes-lista.md`
A linha passa: nome, uma tag (Bloqueado > Devendo > Pré-Cadastro > Em dia) e um fato (a última visita).
- **RD-0238 · baixa · doc · designer-ux.** `clientes-lista.md` §2 "Recomendação para Bloqueado e Cadastro incompleto" (:43-50)
  repete a tabela do §2 e o "Saem" do §1:25-26. Proposta: trocar a subseção por "Cadastro incompleto não entra na tag: fica na
  ficha (`EtiquetaCadastroIncompleto`, `ObservacoesCliente`) e nas pendências do pedido. Sem 4º filtro (R-20261112-204602, item 6)."
- **Pergunta do designer (filtro Devendo ligado + tag Devendo): `manter`.** A linha é a mesma em toda vista, o filtro foi
  escolhido agora pela pessoa e o `Bloqueado` continua separando quem não pode comprar.
- Ao testes (não é RD): imagem do Gestão com o filtro Devendo ligado, 8 linhas, e a faixa `412 na carteira`; a spec §4:68-69
  pede `N de 412 na carteira`.

### 2.2 Gestão no código (reteste do RD-0208 ao RD-0210)
- **RD-0208 corrigido:** `equipe-screen.tsx:103-125` nome + um fato (`3 de 8 visitas`; promotor `2 lojas`) + tag; `Parado 1h40`
  na tag (`equipe-agora.ts:49-50`); equipes só com as vendas (`:49-52`).
- **RD-0209 corrigido:** `aprovacoes-screen.tsx:59-71`, a linha é o motivo; sem crédito e sem 90 dias; `Acompanhar` saiu.
- **RD-0210 reaberto · média · modulo-gestor:** `alertas-screen.tsx:60` `<ChipEstado pequeno texto="Atenção" …>` fixo em toda
  pendência. Proposta: tirar o chip da linha da pendência; fica título + mensagem + `desde …`. A linha `responsável · desde` dos
  alertas já saiu. Segura o Gestão; não o Campo.

## 3. T-0172 · tela de entrada (código) e `entrada-sync.md`
Passam: sem frase que se alterna, sem nome de entidade, sem percentual por etapa, sem botão no Pronto. `Olá, {nome}` fica
(`manter?`): confirma quem entrou, ao lado de "Trocar usuário".
- **RD-0239 · média · texto · engenheiro-apps (código) · designer-ux (spec).** Com a lista na tela, `Etapa 2 de 5 · Clientes e
  rota` (`entrada.ts:67-69`, `tela-carga.tsx:70`, `tela-entrada.tsx:131-133`) repete a lista de 5 linhas em que `Clientes e rota`
  já está em destaque (prancha `T-0172-marca.png`, telas 4 e 6). No Parou com a lista (tela alta), `Sem internet na etapa 3 de 5`
  (`entrada.ts:77-79`) repete o "!" da etapa 3. Proposta: com a lista visível, a linha da barra mostra só o percentual (o rótulo
  segue só para o leitor de tela, na região viva); `Etapa n de N · nome` só na tela baixa, sem a lista. No Parou com a lista:
  `Sem internet` / `A sincronização parou`; sem a lista, como está. Spec: §2 item 2 (:24-25) e §3 item 1 (:51-53).
- **RD-0240 · média · código · modulo-core · engenheiro-apps.** `apps/mobile/src/lib/entrada.ts:81-136` (`ETAPAS_CAMPO`,
  `ETAPAS_GESTAO`, `progressoProvisorio`) copia o domain do Core, que já existe (`modules/core/domain/entrada-sync.ts:15-29`;
  `progressoDaEntrada` `:132`), e já diverge: o shell tira `Pedidos e metas` do promotor (`entrada.ts:108`), o Core não
  (`entrada-sync.ts:19`). Proposta: o modulo-core exporta `progressoDaEntrada` por `@macuxi/core/app`; o engenheiro-apps troca a
  chamada em `tela-carga.tsx:54` e apaga `entrada.ts:81-136`.
- **RD-0241 · baixa · doc · designer-ux.** `entrada-sync.md` diz 4 vezes que o logo não se move (§1:10, §2:41-42, §5:81,
  §6:87) e 3 vezes o "sem botão/600 ms" do Pronto (§1:18, §2:47, §7:99). Ficam o §5 e o §1 estado 5; saem os outros.
- Ao testes (não é RD): §3 item 3 (:58-59) e a prancha (tela 5) têm "Continuar sem sincronizar", que o código não tem; o código
  tem "Desligar modo sem sinal" (`tela-carga.tsx:78`), que a spec não tem. E a divergência das etapas do promotor (RD-0240).

## 4. T-0173 · Catálogo em grade (3 imagens e `catalogo-grade.md`)
O cartão passa: foto, nome, marca, preço e uma tag de estoque, sem código, sem hora e sem etiquetas (RD-0207 resolvido no
desenho). A contagem fica só na faixa. Saíram "Abra pela ficha…", "Atualizado às…", "40 produtos ativos" e Sistemas.
- **RD-0242 · baixa · layout · designer-ux.** Sem foto, a inicial em 34 pt (`A`, `D`, `R`) num quadro de 112 dp repete a 1ª letra
  do nome logo abaixo (§2:43; as 3 imagens). Proposta: ícone neutro de produto (`package`, 32 dp, `ink3`) sobre `neutralBg`, no
  mesmo quadro.
- **Parecer para o dono do produto:** as 3 imagens podem ir, com o RD-0242 anotado para a v1.0.6.

## 5. Linhas do catálogo (`catalogo.md`)
| ID | Onde | Tipo | Severidade | Dono | Status |
|---|---|---|---|---|---|
| RD-0234 | (linha existente) | | | | **corrigido** 13/11 ~09h30: `sair-do-pedido.ts:52`; spec §2.2:105, §2.5:126, §3:141 |
| RD-0235 | (linha existente) | | | | **reaberto** 13/11 ~09h30 (parcial; baixa, v1.0.6): `leituraDoSalvar`, `erro` da `ListaSuspensa`, `subtitulo?` em `sair-do-pedido.ts:56` |
| RD-0208 | (linha existente) | | | | **corrigido** 13/11 ~09h30: `equipe-screen.tsx:103-125`, `equipe-agora.ts:49-50` |
| RD-0209 | (linha existente) | | | | **corrigido** 13/11 ~09h30: `aprovacoes-screen.tsx:59-71` |
| RD-0210 | (linha existente) | | | | **reaberto** 13/11 ~09h30: tag fixa `Atenção` em `alertas-screen.tsx:60` |
| RD-0238 | T-0171 · `clientes-lista.md` §2:43-50 repete a tabela do §2 e o §1:25-26 | doc | baixa | designer-ux | aberto |
| RD-0239 | T-0172 · entrada: `Etapa n de N · nome` e `… na etapa n de N` repetem a lista de etapas | texto | média | engenheiro-apps · designer-ux | aberto |
| RD-0240 | T-0172 · `entrada.ts:81-136` copia `progressoDaEntrada` do Core (`core/domain/entrada-sync.ts`) e já diverge | código | média | modulo-core · engenheiro-apps | aberto |
| RD-0241 | T-0172 · `entrada-sync.md`: logo parado 4×, 600 ms/sem botão 3× | doc | baixa | designer-ux | aberto |
| RD-0242 | T-0173 · cartão sem foto: inicial repete a 1ª letra do nome | layout | baixa | designer-ux | aberto |

## 6. Gravação no repositório
O guardião (`.claude/hooks/guarda-donos.mjs`) identificou esta sessão como `gerente-projetos` e bloqueou a gravação em
`docs/qualidade/redundancias/**` e no diário. O relatório, as linhas do catálogo e a linha do diário seguem neste recado para o
gerente gravar no lugar (ou relançar o corretor com a identidade certa).

Linha do diário (`.coord/diario/corretor-redundancias.md`):
- 2026-11-13 ~09h30 · v1.0.5 · passada única (T-0166, T-0171, T-0172, T-0173): T-0166 liberado (RD-0234 fechado; RD-0235 baixa
  reaberto, v1.0.6); T-0171 imagens liberadas (RD-0238 baixa), RD-0208/0209 fechados, RD-0210 reaberto (média, Gestão); T-0172
  não liberado (RD-0239 e RD-0240 médias; RD-0241 baixa); T-0173 liberado ao dono (RD-0242 baixa). Ao testes: 4 divergências
  sem RD. Relatório `2026-11-13-v1.0.5.md`.
