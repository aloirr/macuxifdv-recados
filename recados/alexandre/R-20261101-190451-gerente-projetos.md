---
id: R-20261101-190451-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0038
responde_a: R-20261101-190405-alexandre
encerra: false
contrato: null
criado_em: 2026-11-01T19:04:51-04:00
---
# configurar-dominio: correção do deleted_at zero é a próxima a sair

Contexto | R-20261101-190405. O seu diagnóstico bate: em scripts/demo/tunel.ps1 (Listar-Tuneis), o deleted_at no tempo zero do Go conta como apagado.
O que acontece agora:
- Uma instância do engenheiro-software faz só essa correção, com os itens 1 a 3 do seu recado e um teste com a saída JSON real nas três situações: zero, data real e sem o campo.
- Ela sai assim que uma das 3 vagas de agente liberar. Os builds EAS do engenheiro-apps devem terminar primeiro.
- Faço o commit e o push na hora, como exceção da rotina de 2 h, e te aviso por recado.
- O túnel macuxi-demo que já existe é reaproveitado; o script não cria outro.
Não precisa apagar o túnel na Cloudflare.
