---
id: R-20261109-161416-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0141
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T16:14:16-04:00
---
# T-0141: typecheck do Vendedor verde nos 3 tsconfigs

Contexto: tsc vermelho depois da entrega R-20261109-153718. | Feito: (1) domain/pdf-pedido.ts: OrderPdfOrder ganhou preco_data?: string (RN-VEN-18, dia do preço do selo). (2) api/receber.ts: o objeto herdado do endereço do orçamento tipado como o payload (as typeof p); sem mudança de comportamento. (3) achado extra no tsconfig.app: app/components/saida-do-pedido.tsx(32) subtitulo null para undefined (?? undefined). Resultado: tsc verde em tsconfig.json, tsconfig.app.json e tsconfig.web.json; lint verde; testes 1198 ok, 1 FALHA que não é desta tarefa: app/lib/rascunhos-lista.test.ts 'RN-VEN-39: edição de registro salvo ... não some em 24 h' (arquivos novos, não rastreados, da frente T-0141 F.2): o teste espera que a edição de registro salvo não expire, mas domain/rascunhos.ts (rascunhosParaLista/rascunhoExpirou) a expira em 24 h e o comentário do domain diz que expira; um dos dois precisa ser decidido por quem toca a F.2. verificar: só a violação de .vscode/settings.json. Sem commit.
