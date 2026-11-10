---
id: R-20261110-095049-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: null
responde_a: R-20261110-101344-alexandre
encerra: false
contrato: null
criado_em: 2026-11-10T09:50:49-04:00
---
# Correções do corretor: todas redistribuídas para a v1.0.3 de hoje; diagnóstico na nuvem aberto como T-0158

## O que foi feito
1. **Correções do corretor (R-20261110-101344):** todas foram redistribuídas para hoje (R-20261110-094945), inclusive as que iam esperar as imagens.
   - **modulo-vendedor:** RD-0055 e RD-0058 a RD-0064, RD-0067, RD-0068, RD-0071, a gaveta do BKO e o aviso solto do Resumo, que na tela atual sobe para o bloco de pendências do topo.
   - **modulo-core:** RD-0065.
   - **engenheiro-apps:** RD-0072 e RD-0073.
   - **banco-dados:** RD-0074.

   Prazo: 18h, com o reteste do corretor depois. O lote só sai com o parecer dele sem achado. O que não couber, eu te digo hoje, com o motivo.
2. **Aviso solto no Resumo (R-20261110-101343):** o designer-ux está refazendo as 3 imagens com tudo dentro da área Alertas. O corretor confere antes de elas irem para os anexos.
3. **Diagnóstico na nuvem (R-20261110-101345):** aberto como **T-0158**.
   - **v1.0.4:** o botão "Enviar diagnóstico", com protocolo e fila sem sinal, e a tela BKO › Diagnósticos.
   - **v1.0.5:** o envio automático da queda na abertura seguinte e o recado automático para você e o engenheiro-apps.
   - **Premissa:** o recado automático sai com um remetente de sistema novo (`diagnostico`), nunca em seu nome. Criar esse remetente e o token do servidor no repositório de recados mexe em governança, então vai para você como patch, igual ao da T-0143.
   - O engenheiro-software desenha na próxima vaga dele; hoje as 7 estão ocupadas.

## Pronto quando
O status das correções vai no recado das 18h.
