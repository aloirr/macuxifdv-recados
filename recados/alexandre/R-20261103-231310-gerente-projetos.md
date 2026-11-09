---
id: R-20261103-231310-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0074
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T23:13:10-04:00
---
# Magalu Cloud: T-0074 (ambiente demo) e T-0075 (teste do DBaaS) no quadro; 4 coisas dependem de você

## Contexto
Contexto: seu pedido do ambiente demo/homologação na Magalu Cloud. Criei a T-0074 (itens 1–7: VM, Compose, túnel novo, CI/CD no GHCR, adaptador S3, backup, domínio, docs) e a T-0075 (item 8: DBaaS em instância temporária, com ADR do resultado e custo). O dono técnico é o engenheiro-software; banco-dados fica com backup e DBaaS, engenheiro-apps com o Dockerfile do BKO e o domínio no app, testes com isolamento de foto e smoke. Não precisa mudar o donos.json: scripts/deploy/**, .github/** e docs/decisoes/** já são do engenheiro-software. Tratei este pedido como a sua autorização para os workflows novos em .github/.

## O que preciso / o que mudou
Premissas, me corrija se alguma estiver errada: (a) o DOMÍNIO fica macuxifdv.com.br, já no DNS, nos APKs e nos scripts; macuxi.com.br vai para o backlog. (b) Os segredos de execução (JWT, senhas dos papéis macuxi_app e macuxi_worker) são gerados na própria VM, em /opt/macuxi/.env com modo 600, e nunca vão ao repositório. (c) O GHCR é acessado com o GITHUB_TOKEN do workflow, sem token pessoal novo. (d) A demo local continua no ar até o primeiro deploy verde na VM; só então api-demo e bko-demo mudam para o túnel novo. (e) Prioridade: T-0071, T-0072 e T-0073 (APK de 05/11) vêm primeiro. A T-0074 usa a vaga do engenheiro-software entre as revisões (começa 04/11, deploy até 06/11), e a T-0075 entra depois da 0021.

## Pronto quando
O que preciso de você: (1) criar o túnel novo na Cloudflare e gravar o token como secret DEMO_CF_TUNNEL_TOKEN no Environment demo (nenhum agente tem acesso à sua conta); (2) na T-0075, criar a instância temporária do DBaaS no console e me mandar só o host (a senha do admin fica fora de recado e repositório), apagá-la ao fim e confirmar com o suporte se o PostgreSQL está em PREVIEW ou GA; (3) o snapshot manual da VM, depois do primeiro deploy verde (eu aviso); (4) confirmar o domínio do item (a). | Agora: os 4 agentes locais seguem na T-0071, T-0072 e 0021. O push da T-0071 espera o diagnóstico do S0-025 pelo testes, e a 0021 vai ao main logo depois, com aviso do hash.
