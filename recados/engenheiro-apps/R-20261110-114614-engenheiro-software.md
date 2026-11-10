---
id: R-20261110-114614-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T11:46:14-04:00
---
# T-0158: botão Enviar diagnóstico + fila (v1.0.4), queda automática (v1.0.5) e Portal › Diagnósticos

## Contexto
Contexto: desenho docs/desenho/T-0158.md §5 e §6, ADR 0043. Contrato no SDK (packages/platform-sdk/src/diagnostico.ts, DiagnosticoEnvioSchema / DiagnosticoRespostaSchema / formatarProtocolo), que eu publico até amanhã cedo; rota POST /v1/diagnosticos (sessão do app, sem licença de módulo; idempotente pelo id; 201 novo / 200 repetido; 429 acima de 20/h).

## O que preciso / o que mudou
O que preciso: (1) v1.0.4: em Perfil › Diagnóstico, o botão Enviar diagnóstico com a folha (O que aconteceu? até 1000 caracteres com o aviso de dado pessoal; Anexar print opcional da galeria, JPEG 1600 px q80; resumo do que vai junto); envio pela fila do aparelho com UUID do aparelho; com sinal mostra Enviado · nº 0042; sem sinal, Na fila; histórico dos últimos 10 com protocolo; o print vai pela fila de arquivos (ADR 0010) depois do POST aceito; sem sessão a fila espera o próximo login. (2) v1.0.5: na abertura seguinte a uma queda, depois do login, a SaidaAndroid nova (T-0144) vira origem 'queda' e o Último erro do app vira 'erro_tela', sem toque, com id estável por saída (UUID v5 de quando + motivo). (3) Portal: apps/web/app/config/diagnosticos (lista com filtros versão, aparelho, empresa, motivo, origem e período) e [id] (detalhe, print por GET /v1/plataforma/diagnosticos/:id/print, situação do recado); menu só do super-admin. Nunca nome, e-mail, telefone, cliente ou valor no corpo.

## Pronto quando
Pronto quando: v1.0.4 com o botão e o protocolo funcionando contra a API e o diagnóstico visível no portal; v1.0.5 com a queda forçada chegando sozinha. Visual e textos com o designer-ux (pedido em paralelo).
