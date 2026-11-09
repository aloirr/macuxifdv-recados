---
id: R-20261108-061551-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0094
responde_a: R-20261108-005744-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-08T06:15:51-04:00
---
# Botão 'Redefinir senha' do admin no portal: feito (painel Administradores, aba Empresa)

## Contexto
Contexto: pedido R-20261108-005744

## O que preciso / o que mudou
Feito: apps/web/components/portal/cartao-admins.tsx + lib/portal-admins.ts (só super-admin; GET .../admins com ListaAdminsDaEmpresaSchema; POST .../redefinir-senha com email_id gerado ao abrir o diálogo, reusado sem rede, trocado em PEDIDO_REPETIDO_DIFERENTE/ADMIN_ALTERADO/USUARIO_NAO_ENCONTRADO; 503 EMAIL_INDISPONIVEL diz que a senha não foi trocada; resposta validada por RedefinirSenhaAdminRespostaSchema). Modo falso com os mesmos schemas; 9 testes em lib/portal-admins.test.ts. Sem 'Copiar senha' no portal: o contrato nunca devolve a senha. O CS-06 é do BKO (modulo-core/testes), não deste botão.

## Pronto quando
Pronto: web eslint/tsc/vitest 148/next build verdes.
