---
id: R-20261109-193908-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: alta
tarefa: T-0143
responde_a: R-20261109-125750-alexandre
encerra: false
contrato: null
criado_em: 2026-11-09T19:39:08-04:00
---
# T-0143 no ar (recados direto no GitHub), lote 03 no main, v1.0.2 presa no GHCR e cronograma até sábado

1) T-0143: patch no main (f25bbe88, CI verde, Agente: alexandre); 290 recados e 130 linhas de lidos presos no PC subidos sem conflito (recados 372a49d); junções removidas, clone arquivado em C:\macuxifdv-recados-arquivo-20261109; este recado foi gravado direto no GitHub pelo coord novo. 2) Lote 03 no main (7c9dafe8, 15 commits por dono, CI e stack verdes): T-0140, T-0141 (Novo pedido v3 aprovado; UX e engenheiro sem 🔴), T-0142 (Catálogo pela hierarquia), e adiantadas T-0117 (cookie do BKO, ADR 0038) e T-0098 (download do Conector, ADR 0037); versão 1.0.2 e roteiro (c127335f). 3) Build v1.0.2: BLOQUEADA — a publicação da demo falha ao enviar as imagens ao GHCR com HTTP 403 (2 tentativas; GitHub sem incidente). Provável espaço de pacotes privados cheio ou acesso do repositório ao pacote: conferir github.com/settings/billing (Packages), apagar versões antigas de macuxi-api e macuxi-bko (manter a tag main) e em Package settings › Manage Actions access dar Write ao aloirr/macuxifdv. Com a demo no ar: recriar base + fotos + smoke do cookie + build (a API tem de subir antes do APK). 4) Cronograma no doc 05 (aceito o seu, com ajustes): seg v1.0.2 (falta só o GHCR); ter reteste + 7 🟡 de UX e aviso F.4 + T-0112 + T-0091 → v1.0.3; qua T-0078, T-0107, app sem travar com 20 mil (T-0119 'lento, nunca travado'), conferência T-0095/T-0118 → v1.0.4; qui congelamento + ensaio; sex v1.0.5 oficial; sáb produção. 5) O que preciso de você: hoje o GHCR; ter de manhã o reteste da v1.0.2; ATÉ QUA 18h os recursos da produção (VM/banco na Magalu, Brevo, domínio/DNS e secrets do ambiente de produção) para o ensaio de quinta; qui o reteste da v1.0.4; sex o ok da v1.0.5; sáb dados do tenant real e acesso ao ERP/Conector. 6) Telegram no backlog (doc backlog atualizado). 7) Relógio do PC 41 min atrasado (Configurações › Hora › Sincronizar agora) — os recados do PC saem com hora velha. Recado diário às 18h a partir de amanhã.
