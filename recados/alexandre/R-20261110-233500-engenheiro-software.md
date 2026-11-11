---
id: R-20261110-233500-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T23:35:00-04:00
---
# T-0158: patch de governança do remetente de sistema diagnostico pronto — peço seu aprovo (rito da T-0143)

## Contexto
T-0158 (diagnóstico na nuvem). Você aprovou o remetente de sistema `diagnostico` no R-20261110-112315 e pediu o patch de governança "pelo mesmo rito da T-0143". O patch está pronto: `docs/desenho/T-0158-governanca.patch` (5 arquivos, +107/−4, aplica limpo na árvore de agora com `git apply --check`). Desenho: `docs/desenho/T-0158.md` §7. ADR 0043.

**O que o patch muda:**
1. `scripts/coord-lib.mjs`: `REMETENTES_DE_SISTEMA = ['diagnostico']`. Ele **não** entra no time (AGENTES/PESSOAS/DESTINOS): ninguém manda recado para ele, e um recado `-diagnostico` no disco é violação no `verificar` para qualquer um.
2. `scripts/coord.mjs`: `coord enviar --de diagnostico` é recusado no PC e na nuvem. Só o servidor grava.
3. `.claude/hooks`: **nada muda**. O recado `-diagnostico` já não autoriza merge nem governança (só `-alexandre` com `de: alexandre`). O patch traz o teste que prova isso, até com `de: alexandre` forjado.
4. `.github/workflows/demo-publicar.yml` e `producao-publicar.yml`: gravam o secret `MACUXI_RECADOS_TOKEN_SERVIDOR` em `/opt/macuxi/recados.env` (600). Esse arquivo vai **só para o worker**, nunca para a api nem para o BKO. Sem o secret, o arquivo fica vazio e o recado automático fica desligado.
5. `scripts/coord-recados.test.mjs`: 3 testes novos (22/22 numa cópia com o patch aplicado).

**O que o recado automático leva:** só o protocolo, a versão, o aparelho, o motivo, ids e o link do portal. **Nunca** leva o texto do vendedor nem a pilha: o repositório de recados é imutável. O destino é a sua caixa e a do engenheiro-apps. São no máximo 12 por hora, e quedas repetidas viram um resumo.

## O que preciso / o que mudou
1. Seu **"aprovo"** para o gerente aplicar o patch pelo rito da T-0143.
2. Quando quiser ligar o recado automático, crie o token fine-grained `macuxi-recados-servidor`:
   - só no `aloirr/macuxifdv-recados`, com **Contents: read and write** e validade de 90 dias;
   - guarde-o como secret `MACUXI_RECADOS_TOKEN_SERVIDOR` nos environments da demo (`DEMO_SSH_KEY`) e da produção (`PRODUCAO`).

   Sem o token, a v1.0.3 sai do mesmo jeito: o diagnóstico chega ao Portal › Diagnósticos e só o recado fica desligado.

## Pronto quando
Seu "aprovo" (ou o que mudar) respondendo a este recado. O token pode vir depois.
