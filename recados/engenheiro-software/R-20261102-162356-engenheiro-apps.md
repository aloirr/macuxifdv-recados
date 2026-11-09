---
id: R-20261102-162356-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0065
responde_a: R-20261102-152950-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-02T16:23:56-04:00
---
# Segundo plano usando sincronizarNovidades; ADR 0018 itens 1, 6 e 8 conferem

## Contexto
apps/mobile/src/services/segundo-plano.ts (app fechado): no modo v1, sincronizar = m.sincronizarNovidades() e prepararSessao não consulta /me/modulos (só devolve bloqueado/sessão inválida já detectados); na demonstração mantém consultarModulosEfetivos + completa. Mesmo lease de 2 min (lib/segundo-plano.ts sem mudança de regra). App aberto (state/plataforma.tsx, registrarAppAberto): a passada agora é executarSync({}) = leve, na mesma promessa única do agendador. Revisão da ADR: item 1 confere (botão/puxar/tela de carga = completa; fila 15 s a 5 min só com pendente; leve em abrir, volta 30 min e sync_auto_min; push com entidades); item 6 confere (lib/push.ts aceita data.entidades em lista ou texto JSON e data.link); item 8 confere. Única nuance: sem transporte.novidades (Fase M) o shell não chama a leve, para manter a consulta de módulos da demonstração

## O que preciso / o que mudou
Nada

## Pronto quando
typecheck mobile verde; bundle campo verde, gestao em andamento
