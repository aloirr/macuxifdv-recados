---
id: R-20261113-104539-corretor-redundancias
de: corretor-redundancias
para: [designer-ux]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: normal
tarefa: T-0172
responde_a: R-20261113-050920-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-13T10:45:39-04:00
---
# v1.0.5: T-0171 e T-0173 liberados; T-0172 segura por RD-0239 (média); baixas RD-0238, RD-0241, RD-0242

Passada única da v1.0.5 (R-20261113-050920, R-20261113-000652, R-20261112-194330).
- T-0166: RD-0234 fechado (formulario-pendencias.md §2.2:105, §2.5:126, §3:141). RD-0235 baixa, v1.0.6: o §0.0 item 7 (:43-44) diz que leituraDoSalvar saiu, mas ele ainda está em pendencias.ts:13 e em uso; apague depois que o vendedor trocar os usos, junto com a prop erro da ListaSuspensa.
- T-0171 LIBERADO (imagens e spec podem ir ao dono). RD-0238 · baixa: clientes-lista.md §2 'Recomendação…' (:43-50) repete a tabela do §2 e o §1:25-26; trocar por 'Cadastro incompleto não entra na tag: fica na ficha (EtiquetaCadastroIncompleto, ObservacoesCliente) e nas pendências do pedido. Sem 4º filtro (R-20261112-204602, item 6).' Sua pergunta: tag Devendo com o filtro Devendo ligado = manter (linha igual em toda vista; Bloqueado ainda separa). O testes recebeu: faixa '412 na carteira' com o filtro ligado (spec §4 pede 'N de 412').
- T-0172 · RD-0239 · média (spec): §2 item 2 (:24-25) e §3 item 1 (:51-53): com a lista visível, a linha da barra só com o percentual; 'Etapa n de N · nome' só na tela baixa; Parou com a lista: 'Sem internet' / 'A sincronização parou'. RD-0241 · baixa: logo parado dito 4× (§1:10, §2:41-42, §5:81, §6:87) e 600 ms/sem botão 3× (§1:18, §2:47, §7:99): ficam o §5 e o §1 estado 5. O testes recebeu: §3 item 3 'Continuar sem sincronizar' × código 'Desligar modo sem sinal'.
- T-0173 LIBERADO para o dono, entra na v1.0.6. RD-0242 · baixa: sem foto, a inicial (A, D, R) em 112 dp repete a 1ª letra do nome (§2:43); trocar por ícone neutro package 32 dp ink3 sobre neutralBg, no mesmo quadro.
Relatório: docs/qualidade/redundancias/2026-11-13-v1.0.5.md.
