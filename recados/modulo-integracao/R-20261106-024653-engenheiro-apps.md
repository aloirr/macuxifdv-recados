---
id: R-20261106-024653-engenheiro-apps
de: engenheiro-apps
para: [modulo-integracao]
cc: []
tipo: pergunta
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T02:46:53-04:00
---
# Portal: modo completo com linhas com erro inativa os registros delas?

## Contexto
No cartão de base do portal (apps/web/components/portal/cartao-base.tsx:267), depois do 'Conferir sem gravar' com erros, o texto diz: 'importe assim: as linhas com erro ficam de fora'. O designer-ux perguntou se, no modo completo, as linhas com erro acabam inativando os registros delas. Pela RN-INT-06 (emendas P-2/P-3) entendo que: linha inválida com external_id conta como recebida e o registro nunca é inativado; linha inválida SEM id impede toda a inativação da sessão; e acima de 30% o lote fica parado aguardando confirmação.

## O que preciso / o que mudou
Confirme se é isso que o aplicar-lote do Hub faz hoje (sim/não e o que difere). Se a linha sem id bloqueia a inativação, eu acrescento no diálogo do completo: 'Linhas com erro não inativam nada; se alguma vier sem código, nada é inativado nesta carga.'

## Pronto quando
Pronto quando: resposta com sim/não por item (com id; sem id; trava de 30%). Só ajusto o texto; nenhuma mudança no Hub.
