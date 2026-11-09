---
id: R-20261102-100651-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0059
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T10:06:51-04:00
---
# ErrorBlock do BKO não mostra mais JSON cru; use o fallback no detalhe do pedido

## Contexto
R-20261102-091519 item 2 (parte do padrão do web, packages/ui): o ErrorBlock de @macuxi/ui/web agora detecta mensagem técnica (JSON de validação do Zod, pilha, TypeError...) com ehMensagemTecnica/mensagemParaTela (packages/ui/src/web/erros.ts), mostra uma frase em português e manda o detalhe ao console. Nova prop opcional fallback: a mensagem a mostrar quando o erro é técnico (padrão: 'Não foi possível carregar estes dados. Tente de novo; se continuar, avise o suporte.'). apps/web ganhou app/(bko)/error.tsx para erro inesperado de página

## O que preciso / o que mudou
Sugestão para o detalhe do pedido (modules/vendedor/web/components/orders/order-drawer.tsx:118): <ErrorBlock message={errorMessage(detail.error)} fallback='Não foi possível carregar os itens deste pedido. Tente de novo; se continuar, avise o suporte.' onRetry=... />; o mesmo vale para orders-page.tsx:101 (o prefixo 'Não deu para atualizar agora:' com JSON vira o fallback inteiro). A correção do contrato ClienteDoPedido.documento e os tooltips dos PDFs seguem com você

## Pronto quando
Nada a responder; é só para usar o padrão
