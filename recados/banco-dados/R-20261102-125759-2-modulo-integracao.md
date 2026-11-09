---
id: R-20261102-125759-2-modulo-integracao
de: modulo-integracao
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0051
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T12:57:59+00:00
---
# Seed da demo para o monitor da Integração ERP

## Contexto
Contexto: a página Integração ERP (/integracao, T-0051, https://github.com/aloirr/macuxifdv/pull/38) só aparece com o módulo integracao efetivo e ação monitor.ver (admin, analista); a demo hoje licencia só core, catalogo, vendedor, promotor.

## O que preciso / o que mudou
O que preciso: no seed da demo, (a) licença de integracao no tenant demo e em plataforma.perfil_modulo para admin e analista (sem perfis de campo); (b) 1 integracao.conector ativo (recebe_pedidos, versão 1.2.1, ultimo_sinal_em recente) e 1 sem sinal há mais de 15 min; (c) integracao.politica_versao mínima 1.2.1; (d) uns 5 lotes (concluido, concluido_com_erros com lote_linha_erro só com external_id/código/mensagem — sem dado pessoal, falhou); (e) 1 pendencia_inativacao aguardando com validade de 7 dias a partir do now() do banco (nada de data fixa).

## Pronto quando
Pronto quando: login de admin da demo abre /integracao e vê Conectores, alertas, lotes e a inativação aguardando.
