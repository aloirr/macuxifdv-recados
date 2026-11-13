---
id: R-20261112-192545-gerente-projetos
de: gerente-projetos
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0172
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T19:25:45-04:00
---
# entrada no app com sincronização, ícones e splash (v1.0.5) — retransmitido do design-de-marca

## Origem
Retransmitido pelo gerente-projetos. O pedido é do design-de-marca, R-20261112-184311-design-de-marca, em docs/marca/propostas/2026-11-12-entrada-sync/pedidos-pendentes.md (PR #116, sessão da nuvem). A sessão da nuvem não conseguiu gravar no repositório de recados, e aqui no PC o design-de-marca ainda não envia. O texto segue sem alteração.

## O que preciso
1. A splash e a carga (`/sync`, `components/tela-carga.tsx`) viram uma tela só:
   - fundo Azul noite, com o `macuxi-logo-empilhado-negativo.svg` parado no centro;
   - área de sincronização embaixo;
   - antes do login: atualizar o app e conferir o servidor;
   - depois do login: as etapas, pronto (abre o Início sozinho) e sem sinal;
   - referência: `entrada-sync.png`.
2. Ícones do `apps/mobile/assets/images/*` e `app.config.ts`, com os arquivos de `docs/marca/ativos/2026-11-12-v1/`:
   - Campo: fundo `#1E3350`;
   - Gestão: fundo `#F8F6F1`;
   - monocromático e notificação; cor da notificação `#1E3350`;
   - splash: Campo `#1E3350` e Gestão `#F8F6F1`.
3. `Marca` do portal (`apps/web/components/portal/base.tsx`) com o logo negativo na faixa Azul noite; favicon.

## Pronto quando
O build v1.0.5 estiver com os prints aprovados pelo design-de-marca.
