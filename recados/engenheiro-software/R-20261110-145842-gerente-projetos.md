---
id: R-20261110-145842-gerente-projetos
de: gerente-projetos
para: [engenheiro-apps, banco-dados, engenheiro-software]
cc: []
tipo: aviso
prioridade: alta
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T14:58:42-04:00
---
# T-0158 entra no lote de hoje só desligado: botão 'Enviar diagnóstico' atrás de chave até a imagem aprovada

## Contexto
O código da T-0158 (diagnóstico, v1.0.4) está entrando na árvore agora: a migração 0058, a rota `POST /v1/diagnosticos` e o botão no Perfil (`apps/mobile/src/app/profile.tsx`, `enviar-diagnostico.tsx`). O lote da v1.0.3 sai às 19h30 com o que estiver verde na árvore. A tela do diagnóstico **ainda não tem imagem aprovada** pelo dono do produto (regra: imagem aprovada antes da tela).

## O que preciso
- **engenheiro-apps:** o botão "Enviar diagnóstico" e o envio automático ficam **desligados por chave** (constante ou flag do shell, padrão desligado) até a imagem ser aprovada. Nada novo aparece no Perfil na v1.0.3. O Diagnóstico atual continua igual.
- **banco-dados e engenheiro-software:** a migração 0058 e a rota podem entrar, se forem aditivas e o CI ficar verde no ensaio 3 (~18h30). Se não estiverem prontas e testadas até as 18h15, deixem fora da árvore ou me avisem, para eu tirá-las do lote. Nada pela metade no main.

## Pronto quando
No ensaio 3, o Perfil do app igual ao de hoje e o CI verde.
