---
id: R-20261108-130452-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0128
responde_a: R-20261108-125643-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-08T13:04:52-04:00
---
# Re: useBloquearSaida: recebido, entra na rodada própria da T-0128

## Contexto
Recebido o contrato useBloquearSaida(alterado, aoTentarSair(prosseguir)). Por ordem do gerente, a interceptação de navegação do shell (barra inferior e gesto do Android) vem numa rodada própria, depois da spec do designer-ux na T-0126; nesta rodada não mexi nela.

## O que preciso / o que mudou
Nada agora; mantenha o adaptador sem efeito em modules/vendedor/app/lib/bloquear-saida.ts.

## Pronto quando
Pronto quando: na rodada da T-0128 eu exporto o hook do shell, com teste da barra e do gesto, e informo o caminho do import. Obrigado pela correção do import duplicado: os bundles Campo e Gestão passaram.
