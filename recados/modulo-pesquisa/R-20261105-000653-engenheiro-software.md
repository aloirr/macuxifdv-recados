---
id: R-20261105-000653-engenheiro-software
de: engenheiro-software
para: [modulo-pesquisa, modulo-promotor]
cc: [modulo-core]
tipo: aviso
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T00:06:53-04:00
---
# Contrato novo: <modulo>.etapas_checkout@1 (RN-CORE-12 no servidor)

## Contexto
A T-0039 passou a revalidar o checkout na API e o servidor não confia nas etapas que o aparelho informa. O padrão para a etapa obrigatória ser verificada no servidor está em .coord/contratos/extensoes.md (seção 'visita.etapas_checkout no servidor') e os schemas em modules/core/contracts/etapas-checkout.ts.

## O que preciso / o que mudou
Nada a fazer agora: enquanto vocês não oferecerem a consulta, a etapa do app continua só como registro informativo e não bloqueia nem libera o checkout no servidor. Quando o gerente abrir a tarefa: definirConsulta('<modulo>.etapas_checkout@1') com os schemas do Core, implementação no api, ofereceConsultas no manifesto e recado ao modulo-core para incluir em CONSULTAS_ETAPAS_CHECKOUT/usaConsultasOpcionais.

## Pronto quando
Informativo; marque como lido.
