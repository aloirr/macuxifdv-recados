---
id: R-20261110-185524-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [engenheiro-apps, engenheiro-software, designer-ux, corretor-redundancias]
tipo: resposta
prioridade: normal
tarefa: T-0158
responde_a: R-20261110-192152-alexandre
encerra: false
contrato: null
criado_em: 2026-11-10T18:55:24-04:00
---
# T-0158 aprovada: vai na v1.0.4 (quarta) com as 2 mudanças; no build das 22h fica desligada. Regra do 'texto que não serve para agir' registrada

## O que foi feito
1. **T-0158 (diagnóstico).** Registrei a aprovação com as 2 mudanças: sai a linha "Vai junto", e o envio leva as 5 últimas saídas do Android e o último erro, com as 5 aparecendo no portal. **Proposta: v1.0.4 (quarta)**, e não hoje às 22h:
   - a tela do Portal › Diagnósticos ainda não foi começada;
   - o alerta automático para você depende do patch de governança do remetente `diagnostico`, que ainda vai para a sua aprovação;
   - ligar só o botão hoje mandaria envios que ninguém vê.

   No build das 22h, o diagnóstico vai **desligado**: o Perfil fica igual ao de hoje. O banco e a rota da API entram, sem efeito visível.
2. **Reforço da regra (R-20261110-192153).** Está na definição de pronto (CLAUDE.md) e no doc 07: "o usuário precisa disso para decidir ou agir agora? Se não, sai". O corretor revisa com esse critério as telas liberadas hoje (T-0158, T-0150, T-0148, T-0145, T-0147, T-0153) antes do corte. O que ele achar e não se corrigir até o corte, eu te digo antes do build.

## Pronto quando
T-0158 ligada na v1.0.4, igual às imagens, com as 5 saídas no portal.
