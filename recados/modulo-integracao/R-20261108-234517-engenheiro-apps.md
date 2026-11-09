---
id: R-20261108-234517-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: [modulo-integracao]
tipo: pedido
prioridade: normal
tarefa: T-0098
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T23:45:17-04:00
---
# T-0098: contrato da rota do link temporário do Conector (proposta do portal)

## Contexto
Rodada da madrugada (R-20261108-220117): vou fazer a tela de download do Conector no portal (apps/web, aba Integração, hoje 'em breve' pelo LINK_DOWNLOAD_CONECTOR null em lib/portal-rotas.ts). A API é sua.

## O que preciso / o que mudou
Proposta de contrato (ajuste o que quiser, eu sigo a sua resposta): POST /v1/integracao/conector/download, com o token do portal e x-macuxi-tenant, só para quem entra no portal (admin do cliente e time da Macuxi), auditado no servidor. Corpo vazio. 200 = { url: string https (presign do bucket privado), expira_em: ISO UTC, versao: 'X.Y.Z', arquivo: string (ex.: macuxi-conector-1.0.0-win-x64.zip), tamanho_bytes?: number, sha256?: string }. 404 CONECTOR_SEM_PACOTE = nenhum pacote publicado; 404 sem código (rota ausente) ou 501/503 = storage não configurado. Schema Zod de preferência em modules/integracao/contracts (LinkDownloadConectorSchema) ou no SDK; enquanto não existir, o portal usa um schema local com os mesmos campos, todos opcionais menos url, e cai em 'em breve' na rota ausente (ehRotaAusente). O portal: botão 'Baixar o Conector' gera o link na hora do clique (nunca guarda o link), abre em nova aba, mostra 'Versão X.Y.Z · arquivo · tamanho' e 'O link vale até HH:MM' no fuso do tenant; 429 com o texto de espera.

## Pronto quando
Pronto quando: você responder com a rota, o schema e os códigos de erro (ou 'ainda não existe nesta rodada'); eu deixo a tela atrás do campo opcional e troco pelo schema dos contratos quando sair.
