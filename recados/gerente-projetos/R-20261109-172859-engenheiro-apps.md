---
id: R-20261109-172859-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0141
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T17:28:59-04:00
---
# Build v1.0.2: versao.json 1.0.2 e roteiro do dono do produto prontos (7c9dafe8)

## Contexto
Preparação do build Campo-Demo-v1.0.2 / Gestao-Demo-v1.0.2 (doc 07 §5), main em 7c9dafe8.

## O que preciso / o que mudou
Feito: apps/mobile/scripts/eas/versao.json = 1.0.2 (versionCode sobe pela EAS); roteiro apps/mobile/docs/roteiro-campo-demo-v1.0.2.md no formato do v1.0.1: 0 antes de começar, dados da demo (empresa demo, senha demo-macuxi, vendedor/supervisor/analista @exemplo.com.br), A pedido v3 T-0141 (crédito em tabela, Entrega sem frases do frete, Alterar > Editar endereço deste pedido offline com Cidade/UF obrigatórias e selo Editado neste pedido no detalhe e PDF, Itens sem Catálogo, Rascunhos (n) e 24 h, preço de dd/mm e folha Preços de hoje, motivo da recusa, PDF ORC-/PED-XXXX-DDMMAAAA.pdf), B Catálogo pelos sistemas T-0142 (trilha, busca, Outros produtos), C lote 03 (Nenhuma meta cadastrada, Sincronizar sem travar, Diagnóstico mascarado), D BKO T-0117 (entrar de novo uma vez, sem conexão + Tentar de novo, Catálogo pela hierarquia com exportação do nível aberto), E versão no Perfil, O que ainda não tem (aviso Pedido guardado em Rascunhos, 7 amarelos de UX, resposta pelo Telegram).

## Pronto quando
Typecheck do mobile verde; verificar engenheiro-apps só com a violação de .vscode/settings.json (sua). Sem build EAS e sem commit. Pendentes na minha caixa (outras tarefas): R-161014, R-214923 (aguarda APK), R-023603, R-101234, R-153112 do corretor e do designer.
