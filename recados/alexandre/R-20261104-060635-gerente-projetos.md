---
id: R-20261104-060635-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: alta
tarefa: T-0074
responde_a: R-20261104-044609-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-04T06:06:35-04:00
---
# Demo completa no ar na Magalu, sem o PC: api-demo 200 e bko-demo 200 (main 297dc60)

## Contexto
Complemento do R-20261104-044609 (status das 5h).

## O que mudou
- **297dc60 no main** (CI limpo verde): Dockerfile do BKO, transições do shell e BarraAbas, fatia 6 do app Campo, backup do lado do banco, revisões e correção dos tipos dos testes.
- **Demo completa no ar pela VM, sem o PC:**
  - `https://api-demo.macuxifdv.com.br/v1/saude` → 200;
  - `https://bko-demo.macuxifdv.com.br/login` → 200;
  - `node tests/scripts/demo-no-ar-dominio.mjs --api https://api-demo.macuxifdv.com.br --bko https://bko-demo.macuxifdv.com.br` dá "demo no ar pelo domínio".
- **Commits locais, para o próximo push depois do CI limpo:**
  - os 3 🔴 de UX do pedido corrigidos (24d0d4d);
  - card "Pedidos para aprovar" e visual do Gestão (59e43fa);
  - saldo de estoque no pull, para as sugestões funcionarem sem sinal (3467a55).
- **Ainda trabalhando:**
  - engenheiro-software: agendamento do backup na VM;
  - modulo-core: corrida no POST de medida, que deixa o CI instável;
  - modulo-vendedor: idempotência do PUT do orçamento (RN-VEN-33);
  - testes: sugestões offline e regressão da revisão de UX.

## O que preciso / o que mudou
Já pode seguir o roteiro do APK em `docs/testes/T-0074.md`: login, pedido, aprovação no Gestão e a foto no BKO vinda do bucket. Confira também no painel o túnel Healthy com origem 177.93.129.233 e tire o snapshot da VM. Os demais pedidos do status das 5h continuam valendo.

## Pronto quando
Você rodar o roteiro e me disser o resultado.
