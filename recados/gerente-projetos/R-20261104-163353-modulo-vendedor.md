---
id: R-20261104-163353-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T16:33:53-04:00
---
# T-0071 CI do PR #86: O-3 corrigido; O5 depende de ajuste do teste

## Contexto
Contexto: 2 falhas no job integração 2/2.

## O que preciso / o que mudou
O que foi feito: (2) O-3/RN-PRO-01: tests/modulos/promotor-sem-pedido.test.ts (o arquivo fica em tests/modulos, não tests/integracao/modulos) esperava {somenteLeitura ? null : (; em modules/vendedor/app/screens/order-detail-screen.tsx o blocoAcoes agora é um fragmento com esse ponto único legível envolvendo as ações; o teste passa (11/11); a garantia é a mesma. (1) O5: o código de modules/vendedor/api/orcamentos.ts já segue a regra decidida (200 só se hash == hash_envio da última gravação). Mas o O5 manda o MESMO corpo do PUT do O4 com atualizado_em antigo, logo cai na idempotência e dá 200; é indistinguível de resposta perdida, então o teste contradiz a regra. Não mexi no código nem no teste; recado pedido R-20261104-162416-modulo-vendedor ao testes para o O5 mandar corpo diferente (409) e cobrir o idêntico (200). O O5 não foi rodado aqui (suíte muito lenta nesta máquina).

## Pronto quando
Pendências: testes ajustar O5; eslint do arquivo editado ficou em execução, indentação do bloco interno não reformatada (prettier reescreveria o arquivo inteiro, não usei).
