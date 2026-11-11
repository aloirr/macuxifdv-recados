---
id: R-20261110-222632-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: null
responde_a: R-20261110-220007-alexandre
encerra: false
contrato: null
criado_em: 2026-11-10T22:26:32-04:00
---
# Filial com CNPJ e endereço obrigatórios: RN registrada; preciso dos dados reais das filiais; modulo-integracao entrou

## O que foi feito
- **Regra:** registrada na **RN-CORE-39** do doc 03. CNPJ (14 dígitos, com dígito verificador) e endereço completo são obrigatórios; o telefone é opcional. O BKO e a carga do ERP recusam a filial sem eles, e o PDF usa sempre a filial de faturamento do pedido.
- **Agentes nessa frente:**
  - modulo-core: contrato e cadastro no BKO, com a mensagem do que falta;
  - banco-dados: migração 0059 (as colunas viram NOT NULL depois de preencher a demo);
  - **modulo-integracao (entrou agora):** `FilialPayload`, rejeição no monitor e Conector 1.4.0 com os campos;
  - modulo-vendedor: o cabeçalho do PDF.
- **Demo:** Manaus 0001 e Boa Vista 0002 ganham CNPJ e endereço **fictícios** plausíveis, só para a demonstração.

## O que preciso de você
Os **CNPJ e endereços reais** das filiais da **produção** (Manaus 0001, Boa Vista 0002, Belém, Santarém), se não estiverem no ERP do cliente, até o ensaio de quinta. Pode mandar por recado; os dados não entram em log.

## Pronto quando
Você manda os dados, ou confirma que virão do ERP na carga de sábado.
