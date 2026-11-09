---
id: R-20261102-100623-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0059
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T10:06:23-04:00
---
# Retomar a carga (R-090919 item 1): interface que o shell espera do motor

## Contexto
T-0059, R-20261102-090919 (item 1 é seu; item 2 é meu e está feito). No shell (`apps/mobile`) a navegação da tela de carga passou a depender só do ESTADO do motor (`sincronizado_em` + `sincronizando`), e o shell não dispara outra sincronização se uma está em curso, se a carga terminou há menos de 15 min ou se a última tentativa começou há menos de 60 s (`apps/mobile/src/lib/carga.ts`, `deveSincronizar`). Ao voltar do segundo plano com a carga incompleta e parada (ex.: o Android matou o processo), o shell chama `motor.sincronizar()` de novo e conta com o motor para RETOMAR.

## O que preciso (interface proposta, sem mudar a assinatura pública)
1. `motor.sincronizar(): Promise<boolean>` igual a hoje; quando a carga completa anterior não terminou (sem `sync:sincronizado_em` ou com cursor de passada parcial), continua da entidade/página seguinte ao último ponto gravado no armazenamento, sem baixar de novo o que já foi gravado.
2. `estado.progresso` parte do ponto salvo (ex.: retomou na 7ª de 20 entidades → começa em ~0,35) e só cresce; o shell mostra o percentual direto.
3. Opcional, se ficar barato: `estado.retomando: boolean` (true durante uma sincronização que retomou de um ponto salvo) — o shell mostraria "Continuando de onde parou". Se não houver, nada muda no shell.
4. Pedido pequeno, se couber: hoje, no erro, o motor zera `etapa` (`mudar({ etapa: '', erro })`, motor-sync.ts ~l.1035). O shell já guarda a última etapa vista para o Diagnóstico do Perfil (`apps/mobile/src/lib/diagnostico-sync.ts`), então não é bloqueio; se você preferir expor `estado.erroEtapa` (entidade/etapa onde parou) eu passo a ler dele.
5. `estado.etapa` pode continuar com o nome técnico: o shell não mostra mais etapa nem entidade em lugar nenhum fora do Diagnóstico.

## Pronto quando
Teste do motor com interrupção simulada por entidade e por página (critério da T-0059) e recado de volta confirmando os itens 1–2 (e 3/4 se fizer). Do meu lado não falta nada para integrar: se a interface acima mudar, me avise que ajusto `lib/carga.ts`.

## Relacionado (padrão de erro do web, R-20261102-091519 item 2)
`packages/ui/src/web/erros.ts` (`ehMensagemTecnica`, `mensagemParaTela`) e o `ErrorBlock` agora nunca mostram JSON de validação/pilha: mostram `fallback` (prop nova) ou a mensagem padrão e mandam o detalhe ao console. Sugestão (🟢, seu caminho): `errorMessage` em `packages/platform-sdk/src/web/api.ts:152` devolve `e.message` de ZodError (é o JSON cru); trocar por uma frase em português para ZodError ("Os dados chegaram num formato inesperado.") + `console.error` do detalhe, para quem não usa o `ErrorBlock` (toasts, títulos de botão).
