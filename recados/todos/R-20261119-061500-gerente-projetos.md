---
id: R-20261119-061500-gerente-projetos
de: gerente-projetos
para: [todos]
cc: [alexandre]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-19T06:15:00-04:00
---
# PASSAGEM da v1.0.15: pausa até as 9h (limite de uso); fila, heads e o que falta

Ordem do dono do produto, pela ponte, às 06h10 de Manaus: "Próximo do limite. Pause as atividades até as 9h".
- As sessões receberam a ordem de push em rascunho e parada.
- Rondas e reserva desligadas.
- Nenhum merge em andamento.

## No main (verde em 5911445e, suítes completas)
| PR | Conteúdo | Squash |
|---|---|---|
| #504 | governança do CI | ed377584 |
| #495 | banco 0088 da P-6 | 2d435748 |
| #494 | desenho da P-6 e ADR 0062 | 3165253d |
| #507 | conjunto: vendedor, testes, core e gestor da P-6 e BKO › Pedidos | 5911445e |

Fechados sem merge, apontando para o #507: #493, #496, #497 e #505.

## Bloco 2: reteste final pela metade
| PR | Dono / sessão | Head | Situação |
|---|---|---|---|
| #498 | banco-dados / S5 | e9150ac6 | 0089 sem termo, aceite e pausa. Falta o corretor final |
| #499 | modulo-core / S4 | 91f4bc93 | Marca LIBERADO. Falta o corretor final |
| #500 | engenheiro-software / S3 | a5b136a7 | Sem advogado; rastreamento interno; 🟡 do bloco 1. Falta o corretor final |
| #501 | engenheiro-apps / S7 | 1baca627 | Marca RETIDO: MC-1780 (cor do ícone) e o canal "Serviço do app". **Não compila com o #499**: usa `definirPontosLocaisDoDia`, `LeitorDePontosLocais` e afins (`apps/mobile/src/services/trajeto.ts:18,171`, `state/plataforma.tsx:25`) |
| #502 | modulo-gestor / S7 | c0921ba6 | Marca RETIDO: MC-1770, MC-1771 e MC-1782. **Não compila com o #499**: usa `trechosDoTrajeto` e `PausaDoDia` (`domain/trajeto.ts:8`, `api/rotas.ts:245`, `web/pages/trajeto-do-dia.tsx:32`, `app/components/trajeto-do-dia.tsx:26`). Conflito com o main em `app/state/use-gestor.ts` |
| #503 | modulo-catalogo / S2 | f7db1f23 | Marca LIBERADO. Falta o corretor final |
| #506 | modulo-vendedor / S6 | 1f042704 | Marca LIBERADO; consulta `preco_prazo_padrao@1` e 🟡 do bloco 1. Falta o corretor final |
| #492 | designer-ux / S1 | 3d8ae777 | MC-1781 (3 cores na prancha do BKO). Reteste |
| — | testes | `nuvem/v1015-testes-senha` e892aac4 | LIBERADO. Entra com o #500 |

Ainda em andamento quando pausou: o corretor final (`parecer-corretor-*-final.md`), a revisão técnica (`revisao-eng-bloco2.md`) e os testes no merge dos 9, ambos na sessão do gerente.
**Decisão do gerente:** o mapa do #502 fica como está na v1.0.15. O resto da prancha 01 (cartão da Ficha, seletor de dia, lista de check-ins) vai para a v1.0.16.

## Ficha do cliente, T-0186 (na v1.0.15; simulação aprovada no ef4dd56c)
| Parte | Sessão | Branch | Head |
|---|---|---|---|
| Contrato do Hub (forma de pagamento por NF, título → NF, devolução → NF) | S2 (modulo-integracao) | `nuvem/v1015-cliente360-modulo-integracao` | 460fc0fa |
| Migração 0090 (colunas da NF e do título, documentos e permissões) | S5 | `nuvem/v1015-cliente360-banco-dados` | ainda sem push |
| Domain, API e telas do Campo, da Gestão e do BKO | S4 | `nuvem/v1015-cliente360-modulo-core` | 84080c63 (em partes) |

Sem PR ainda. Sem pareceres.

## v1.0.16
- **T-0187** (supervisor em campo no Gestão): simulação no `nuvem/v1016-supervisor-designer-ux`, 0d10e6e5. Mandar à ponte na volta.
- **Mapa:** o resto da prancha 01.

## Volta às 9h
Programada pela ponte. Na volta, o gerente religa as rondas e manda a nova previsão do PRONTO PARA LIBERAR v1.0.15.

Sessões (todas pausadas):
S1 session_019xHEXrPzgn3fNKy4GEjQ9e · S2 session_019xHEXpM3H8fEg12NYaJako · S3 session_019xHEXpXBUTFFB9Bpw8jz5K · S4 session_019xHEXsxrtSFcQixPyeQu1L · S5 session_019xHEXog6yNKyddkVYJPaT9 · S6 session_019xHEXrgRttetdrVq3A8CTL · S7 session_019xHEXsQcR5VFywTxs8L6Wq.
