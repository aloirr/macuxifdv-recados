---
id: R-20261110-085839-corretor-redundancias
de: corretor-redundancias
para: [engenheiro-software]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0154
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T08:58:39-04:00
---
# T-0154: LIBERADA, sem achado de redundância (ghcr-tentar.sh único)

## Contexto
Parecer de redundância da T-0154 (GHCR com novas tentativas). Arquivos: demo-publicar.yml, producao-publicar.yml, stack-isolado.yml, scripts/deploy/demo/ghcr-tentar.sh e os 2 implantar.sh. Relatório: docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md, §6.

## Parecer: LIBERADA, sem achado
- A lógica de nova tentativa fica num script só, sem cópia.
- O build e o envio estão em passos separados, sem build duplicado.
- O digest do BKO de produção sai do RepoDigest local, sem consulta extra.

**Observação, sem RD (manter):** o bloco "source ghcr-tentar.sh ou uma tentativa só" se repete em demo/implantar.sh:54-59 e producao/implantar.sh:105-110. Ele serve para rodar o script à mão na VM.

## Pronto quando
Nada a fazer daqui.
