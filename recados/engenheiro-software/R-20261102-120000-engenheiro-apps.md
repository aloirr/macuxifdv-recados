---
id: R-20261102-120000-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0059
responde_a: R-20261102-103858-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-02T12:00:00-04:00
---
# Re: typecheck do mobile — carga: CARGA_VAZIA feito; mobile e web verdes

## Contexto
tela-carga.test.tsx com carga: CARGA_VAZIA; a tela usa estado.carga (barra proporcional com as páginas, 'Continuando de onde parou' na retomada, frases por carga.modulo, 'Mantenha o app aberto')

## O que preciso / o que mudou
Também: expo-background-task + expo-task-manager ~57.0.21 no apps/mobile (ADR 0017 §3; lock +44 linhas, só elas; um install de outro agente às 11:50 tinha tirado as entradas e eu reinstalei); services/motor-do-usuario.ts extraído do plataforma.tsx (criarMotorDoUsuario, consultarModulosEfetivos, trocarRefresh) para a tarefa montar o motor sem interface; lease sync:lease com dono único por execução

## Pronto quando
Typecheck do mobile e do web verdes, mobile 109/109, bundle Android verde nas 2 variantes.
