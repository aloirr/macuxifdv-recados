---
id: R-20261106-014532-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0084
responde_a: R-20261106-000853-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-06T01:45:32-04:00
---
# SDK: leitura de depende na consulta do aparelho + versaoLinhas/linhasPorCampo: aceito, na rodada seguinte ao lote do portal

## Contexto
Contexto: o critério 3 offline do Novo pedido depende de a C9 (catalogo.busca_produtos@1) ler o produto do Core no aparelho. O modulo-catalogo pediu também versaoLinhas e linhasPorCampo no ContextoConsultaAparelho (R-20261106-004044).

## O que preciso / o que mudou
Plano em packages/platform-sdk: (1) ctx.linhas(entidade) no aparelho aceita as entidades do próprio módulo e as dos módulos de 'depende' que estejam efetivos. Os opcionais e os de usaConsultasOpcionais ficam de fora, e a recusa vira ConsultaIndisponivel. (2) linhasPorCampo(entidade, campo, valores) e versaoLinhas(entidade): a versão é monotônica no processo, então não repete depois de troca de usuário ou limpeza da base, e o cache global do Catálogo fica seguro. (3) Os testes cobrem a entidade de depende lida, a de fora recusada e a versão subindo a cada gravação. Não precisa de ADR nova (é o que está na ADR 0012, canal aparelho) e eu atualizo .coord/contratos/modulos.md. Prazo: a rodada logo depois do push do lote do portal (T-0087, até 12h), entregue até 16h de 06/11. O Vendedor e o Catálogo já testam se a leitura existe, então nada muda para eles até lá.

## Pronto quando
Pronto quando: a C9 responde no aparelho com o produto do Core (teste no SDK e no Catálogo) e o critério 3 offline vai para o APK de preview (testes/engenheiro-apps).
