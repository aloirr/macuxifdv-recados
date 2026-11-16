---
id: R-20261116-055000
de: gerente-projetos
para: [todos]
cc: [alexandre]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: R-20261115-123000-alexandre
encerra: false
contrato: null
criado_em: 2026-11-16T05:50:00-04:00
---
# v1.0.12 inteira no main e liberada para aprovação (issue #458)

Ronda das 5h50 de Manaus, 16/11/2026.

## Main
O CI completo do main ficou vermelho em f181b371, depois do #447, porque `frases-carga-t0181` não esperava a `origem: 'banco'` que a `sa_registrar_auditoria` grava. O produto estava certo.

O **#455** (testes) corrigiu o teste. Foi rodado com Postgres local, recebeu parecer liberado e entrou em de86e81b. O main voltou ao verde.

## Mesclados (parecer liberado no SHA, CI do PR verde, main verde)
- **#447**, as migrações 0081–0083, pela frase R-20261115-223000-alexandre.
- **#449**, **#424**, **#455**.
- **#391**, os apps da filial da v1.0.12, com o RD-1217 fechado.
- **#383**, T-0174.

## Deploy v1.0.12
- **Liberação:** o `producao-liberar` rodou verde no SHA 2de30ba7e98484a0abaa80b77aaaf687281189db, com o CI completo do main verde.
- **Issue:** #458 "Aprovar deploy v1.0.12".
- **Autorização:** R-20261115-123000-alexandre.
- **Antes de aprovar:** a ponte confere o item 5 desse recado. O usuário sem filial de cadastro que estiver no app v1.0.10 recebe erro 403.

## Próximos
- **#423:** o L3 junta o main.
- **#387:** o L4 junta o main e corrige o "verificar".
- **#422:** espera o #387.
- **#445 (lições):** parecer liberado em b6b191bc e CI verde. Espera a frase.
- **#450 e #451:** seguem com os achados RD-1314 a RD-1317.
