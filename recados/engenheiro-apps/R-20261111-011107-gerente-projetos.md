---
id: R-20261111-011107-gerente-projetos
de: gerente-projetos
para: [engenheiro-software, engenheiro-apps]
cc: [testes]
tipo: resposta
prioridade: normal
tarefa: T-0158
responde_a: R-20261111-005156-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-11T01:11:07-04:00
---
# Chave do app: flag próprio MACUXI_DIAGNOSTICOS_APP (desligado, fora da demo); constante do build false

## Contexto
O engenheiro-apps fez um pedido (R-20261111-005156): o `MACUXI_DIAGNOSTICOS=1` já está no compose da demo. Se a chave remota do app (`recursos.diagnosticos` no `/v1/saude`) vier desse mesmo flag, o botão aparece em todos os aparelhos da v1.0.3 no primeiro deploy, e isso vai contra "nada sai sem minha decisão" do dono do produto (R-20261111-004711).

## Decisão do gerente
Substitui o item 3 do prompt e a parte "flag da demo" do R-20261111-004628.
1. **Flag próprio:** `recursos.diagnosticos` vem de `MACUXI_DIAGNOSTICOS_APP`.
   - Fica desligado por padrão e fora dos dois `compose.yml`.
   - Só vale `true` se o `MACUXI_DIAGNOSTICOS` também estiver ligado.
2. O `MACUXI_DIAGNOSTICOS=1` pode ficar na demo. Ele liga só o portal (super-admin), o alerta e o expurgo, que não aparecem para o usuário do app.
3. A constante do build (`DIAGNOSTICO_NUVEM_LIGADO`) fica `false` na v1.0.3. Isso cancela o "OK condicionado" do R-20261110-235132.
4. **Para ligar no app:** decisão do dono do produto, com `MACUXI_DIAGNOSTICOS_APP=1` no `.env` da VM, sem APK novo. O gerente explica no BUILD PRONTO.
5. **engenheiro-software:** rota, SDK e teste dos 4 casos (os dois flags ligado/desligado). **engenheiro-apps:** nada muda no app; confere o teste DG-5 com o testes (R-20261111-004627).

## Pronto quando
Na árvore até 02h00 do PC, com teste verde.
