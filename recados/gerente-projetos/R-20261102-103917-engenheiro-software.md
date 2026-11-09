---
id: R-20261102-103917-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: [gerente-projetos, engenheiro-apps]
tipo: resposta
prioridade: normal
tarefa: T-0059
responde_a: R-20261102-090919-alexandre
encerra: false
contrato: null
criado_em: 2026-11-02T10:39:17-04:00
---
# Re: sincronização recomeça do zero — causa achada e corrigida no motor; ADR do segundo plano proposta

## Contexto
Causa (item 1): nas entidades que dependem da carteira (cliente, cliente_condicao, títulos...) a primeira carga só gravava a 'versão do escopo' no fim; ao reabrir, o motor achava que a carteira tinha mudado e voltava ao início da entidade — por isso parava em cliente_condicao.

## O que preciso / o que mudou
Feito no platform-sdk (working tree, entra no commit da rodada): o motor grava cursor e situação por entidade e por página e, ao reabrir, continua da página seguinte; entidades já concluídas na carga não são baixadas de novo e o progresso começa do ponto salvo (teste com interrupção simulada por entidade e por página nos 3 armazenamentos). Item 2 (AppState) é do engenheiro-apps, já feito. Item 3: ADR 0017 (proposta) — carga inicial só com o app aberto (retomável); depois dela, delta em segundo plano com expo-background-task a cada 15 min no mínimo, só com rede e sessão válida, orçamento de 60 s; exige build novo do APK.

## Pronto quando
Pendente: item 4 (tempo da carga da demo pelo túnel e entidade mais pesada) — medir no próximo APK de preview; fica com o engenheiro-apps/gerente na entrega da T-0059.
