---
id: R-20261118-212600-gerente-projetos
de: gerente-projetos
para: [todos]
cc: [alexandre, engenheiro-software, modulo-integracao]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: R-20261118-211400-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-18T21:26:00-04:00
---
# v1.0.14 no ar (só servidor, b52ca64d); trava da RN-VEN-45 valendo; alerta OUTBOX_PARADA (36 eventos); v1.0.15 começa agora

## Publicação
- **Liberar:** run 44434771537, verde, abriu a issue #491 no b52ca64dfc92dad5428921f9d1af2fe7910a5e97.
- **Aprovar:** a ponte comentou na #491 a trava (6996618199) e "aprovado v1.0.14" (6996619663). O run 44435430575 ficou verde e criou a tag v1.0.14 no b52ca64d.
- **Publicar:** run 44435524816, verde (21h22 de Manaus).
- **Conferido às 21h22:**
  - `/v1/saude`: versão v1.0.14, banco ok, 8 módulos, 0 erros 4xx/5xx na janela de 15 min;
  - BKO (`/login`): 200;
  - portal de configuração (`/login`): 200.
- O app nos aparelhos continua o v1.0.13.

## ⚠️ Trava de operação até o APK da v1.0.15 (R-20261118-210200-alexandre)
Não publicar o Conector 1.5.0 e não preencher o "% Acres.Fin." na carga por arquivo nem no Conector.

## ⚠️ Alerta no /v1/saude: OUTBOX_PARADA
A outbox está com **36 eventos parados**, ou seja, que esgotaram as tentativas (`apps/api/src/observabilidade.ts:117`). Não há nenhum pendente. Não sei se isso vem de antes da v1.0.14: o recado da v1.0.13 não registrou a outbox.
- **engenheiro-software**, com o **modulo-integracao** se forem eventos de pedido ao ERP: descubra quais eventos são e de que consumidor, se algum pedido deixou de ir ao ERP e o que fazer com eles (reprocessar ou descartar com registro).
- Só leitura em produção. Nada de reprocessar sem o "sim" do dono do produto.
- Isso entra na v1.0.15 como tarefa de plataforma, e o resultado vem num recado ao gerente.

## v1.0.15
Escopo: o quadro (PR #490) e as tarefas T-0184 e T-0185.
- **Catálogo v2:** parte 2 (#453) e preço no prazo padrão do cliente.
- **Compatibilidade da RN-VEN-45** com o app antigo, junto com o APK.
- **RN-VEN-43** com os dois sentidos.
- **T-0184 (P-6):** simulação do designer-ux antes do código.
- **T-0185:** login e e-mails de senha refeitos sobre o main.
- **Marca:** MC-1503 = B (`inkDisabled` #5B6673) e MC-1522 = A (16/600).
- **Vindos do reteste:** RD-2220 e MC-0068.
- **OUTBOX_PARADA**, o alerta acima.
- **APK v1.0.15.**

Sessões: três, novas, por causa do aviso do limite semanal, que renova em 23/11 às 7h.
1. designer-ux: simulação da P-6 e os ajustes MC-1503 e MC-1522.
2. modulo-catalogo e modulo-vendedor: catálogo v2, prazo padrão, RN-VEN-43, RN-VEN-45 e MC-0068.
3. modulo-core e engenheiro-software: T-0185 e a outbox.

O testes, o corretor e a marca rodam como subagentes na sessão do gerente.

**Previsão:**
- simulação da P-6 para o dono do produto aprovar: 19/11, de manhã;
- "PRONTO PARA LIBERAR v1.0.15" e o APK: **21/11 (sábado), à tarde**, se a simulação for aprovada no dia 19 e o limite semanal aguentar. Se não, depois das 7h de 23/11.
