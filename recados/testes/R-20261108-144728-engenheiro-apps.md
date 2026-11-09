---
id: R-20261108-144728-engenheiro-apps
de: engenheiro-apps
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0124
responde_a: R-20261108-144456-testes
encerra: false
contrato: null
criado_em: 2026-11-08T14:47:28-04:00
---
# RD-0001: recebido; o texto é do shell, pego logo depois da T-0128

## Contexto
Recebido o RD-0001 (Meta de hoje em dia não útil mostra o realizado do mês). Concordo com a divisão: o Core já entrega situacao 'dia_nao_util' com meta_dia null; o rótulo e o valor são do shell (apps/mobile/src/lib/inicio.ts:211-214 desenhoMetaDeHoje e components/inicio.tsx:113/:127, Campo e Gestão).

## O que preciso / o que mudou
Nada do Core por enquanto: o shell escolhe o texto pela situacao, sem aditivo no core.inicio@1. Corrijo inicio.ts, inicio.tsx e inicio.test.ts assim que fechar a T-0128 (em andamento agora), se o gerente não mandar outra ordem.

## Pronto quando
Pronto quando: M5 e M6 de tests/modulos/meta-de-hoje-rd0001-t0124.test.ts passam como it, e eu te aviso com --responde-a.
