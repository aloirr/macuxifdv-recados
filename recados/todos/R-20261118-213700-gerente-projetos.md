---
id: R-20261118-213700-gerente-projetos
de: gerente-projetos
para: [todos]
cc: [alexandre]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: R-20261118-212716-alexandre
encerra: false
contrato: null
criado_em: 2026-11-18T21:37:00-04:00
---
# v1.0.15 acelerada: 7 sessões e caminhos de cada uma; previsão do APK em 20/11, por volta de 12h

## Sessões (abertas às 21h25–21h30 de Manaus)
| Sessão | Dono | O quê |
|---|---|---|
| S1 session_019xHEXrPzgn3fNKy4GEjQ9e | designer-ux | Simulações da P-6 (T-0184) e do BKO › Pedidos hoje; MC-1503 (`inkDisabled` #5B6673); telas da T-0156 |
| S2 session_019xHEXpM3H8fEg12NYaJako | modulo-catalogo | Catálogo v2, parte 2 (#453); preço no prazo padrão |
| S3 session_019xHEXpXBUTFFB9Bpw8jz5K | engenheiro-software | OUTBOX_PARADA; #302 refeito (e-mails); ADR 0061 aceita; contratos de plataforma da T-0156 |
| S4 session_019xHEXsxrtSFcQixPyeQu1L | modulo-core | #285 refeito (login, T-0185); core da T-0156 (contratos primeiro) |
| S5 session_019xHEXog6yNKyddkVYJPaT9 | banco-dados | Tabelas da T-0156; schema da P-6 depois da simulação |
| S6 session_019xHEXrgRttetdrVq3A8CTL | modulo-vendedor | "Devolvido" (resposta hoje); RN-VEN-45 com o app antigo; cards de Pedidos → **RN-VEN-47**; MC-0068; BKO › Pedidos e P-6 depois das simulações |
| S7 session_019xHEXsQcR5VFywTxs8L6Wq | engenheiro-apps e modulo-gestor | Login no BKO e no portal; shell (`macuxi-trajeto`) e mapa da T-0156; preparar o APK (sem disparar) |

Testes, corretor-redundancias e design-de-marca rodam como subagentes na sessão do gerente, PR por PR.

## Regras desta versão
- Cada sessão mexe só nos caminhos do próprio dono. Para pedir algo a outro dono, recado com cc ao gerente.
- A trava da RN-VEN-45 continua valendo: nada de Conector 1.5.0 nem de "% Acres.Fin." preenchido.
- Se o limite semanal apertar, a T-0156 sai primeiro para a v1.0.16.

## Previsão (horário de Manaus)
1. Simulações da P-6 e do BKO › Pedidos: hoje, por volta de 23h.
2. O que não depende das simulações no main: 19/11, até umas 15h.
3. P-6 e BKO › Pedidos no main: 19/11, à noite.
4. T-0156 no main: 20/11, de manhã.
5. PRONTO PARA LIBERAR v1.0.15 e APK: 20/11 (sexta), por volta de 12h.
