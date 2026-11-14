---
id: R-20261113-194551-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T19:45:51-04:00
---
# v1.0.6: Início do Campo com a TelaInicioCampo do Core e o sino do shell (RD-0249)

## Contexto
apps/mobile/src/app/(tabs)/index.tsx: Campo = TelaInicioCampo (sino={() => <Sino testID='inicio-sino' />}, onAbrirPerformance=/m/performance, onPerfil=/profile, avisos=aviso de módulo desativado); Gestão mantém o Início antigo sem o cartão de Recados (RD-0249). Saíram Orçamentos, A faturar e Recados; código morto do cartão Recados apagado em components/inicio.tsx e lib/inicio.ts (+ testes). sino.tsx e lib/sino.ts intocados (MC-0009).

## O que preciso / o que mudou
Pendência: o Sino mostra a contagem do layout (useNotificacoes().naoLidas), não o useInicioCampo().sino.total; para usar o total do hook, o Sino precisa aceitar um número (dono do MC-0009).

## Pronto quando
tsc 0, eslint 0, vitest Início 38/38, bundle:android rodado no fim.
