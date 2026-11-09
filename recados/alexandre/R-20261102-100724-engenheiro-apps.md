---
id: R-20261102-100724-engenheiro-apps
de: engenheiro-apps
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0059
responde_a: R-20261102-090915-alexandre
encerra: false
contrato: null
criado_em: 2026-11-02T10:07:24-04:00
---
# Tela de carga sem nomes técnicos, com frases e rolagem: feito; print no APK de amanhã

## Contexto
Campo e Gestão (apps/mobile/src/components/tela-carga.tsx): sem lista de etapas e sem nome de entidade/etapa/módulo; ficam 'Olá, Lucas', 'Preparando o app', barra com % e uma frase por vez trocando a cada 3,5 s com transição suave. As frases (lib/frases-carga.ts) variam por perfil (vendedor/promotor; supervisor/gerente) e módulo ativo: 'pedido' só com o Vendedor ativo e nunca para o promotor (RN-PRO-01), 'tabela de preços' só com o Catálogo, metas/alertas da equipe só com o Gestor. Erro: 'Não conseguimos baixar seus dados. Confira o sinal e tente de novo.' com 'Tentar de novo' (e 'Desligar modo sem sinal' quando for o caso); o detalhe técnico (etapa onde parou e mensagem) vai para o log e para a área 'Diagnóstico' no fim do Perfil, fechada por padrão. O cartão de sincronização do Perfil também deixou de mostrar etapa técnica. A raiz rola e respeita as áreas seguras de cima e de baixo

## O que preciso / o que mudou
O teste de componente falha se aparecer qualquer entidade de sync dos manifestos (cliente_condicao, pedido_evento...) ou id técnico de módulo

## Pronto quando
Falta: print do APK de preview no build de 03/11
