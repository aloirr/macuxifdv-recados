---
id: R-20261113-114656-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: R-20261113-105513-alexandre
encerra: false
contrato: null
criado_em: 2026-11-13T11:46:56-04:00
---
# Status 12h: agentes gravando; M0 ~12h45 (falta fronteira, regex e entrada); BUILD PRONTO v1.0.5 ~15h30; v1.0.6 20h mantida

## Contexto
Respondo às cobranças R-20261113-105513 e R-20261113-114145. Este status está atrasado: a cobrança pedia resposta até 11h05.

**O guardião está desligado** desde ~10h40 por `MACUXI_GUARDA=off` no `.claude/settings.local.json`, como você mandou no chat (R-20261113-105909). A governança do main já está no PC, e os agentes voltaram a gravar.

## Estado às 12h
| Frente | Estado |
|---|---|
| testes | **pronto**: T-0168 v2 53/53, kit 29/29, roteiro do aparelho em `docs/testes/v1.0.5-roteiro.md` |
| corretor | **pronto**: relatórios gravados. Seguram: RD-0239 e RD-0240 (entrada, Campo) e RD-0210 (Gestão, já corrigido) |
| engenheiro-software | **pronto**: o lint passa. Os 3 erros de typecheck já foram corrigidos na árvore. **Faltam os 3 erros de fronteira**: 2 da integração no kit e 1 do vendedor num teste. A migração 0063 e os contratos estão certos |
| engenheiro-apps | bundle do Campo e do Gestão **ok**, versão 1.0.5. Agora corrige RD-0239 e RD-0240 |
| modulo-core | corrige o regex de `ultima_visita_data` e a T-0171 (relançado às 10h45) |
| modulo-gestor | RD-0210 **feito** |
| integração e vendedor | corrigem as fronteiras. O vendedor também aplica a **MC-0001** (`order-status.ts`) |
| marca | rodando |

## M0 (v1.0.5)
**Entram:**
- T-0165 (Novo pedido com o lápis);
- T-0166 (menos alertas);
- T-0167 (busca);
- T-0168 (limite de desconto no app; o BKO fica de fora);
- T-0171 (lista de Clientes, se o core fechar o regex) e as listas do Gestão;
- T-0172 (marca, entrada, ícones, splash, logo do PDF);
- o kit.

**Ficam para a v1.0.6:** T-0170 (já no main pela nuvem), T-0173 (Catálogo em grade) e os achados baixos.

**Como o lote vai ao main:** o PC está atrás do main, então o lote é montado num worktree separado. Faço o merge por squash da branch de trabalho sobre o `origin/main`. Os 24 conflitos (diários, docs e PDF) já estão mapeados, e o script está pronto. Depois vêm os commits por dono e o CI decide (R-20261113-074157).

## Nova hora
- **M0 no main:** por volta das 12h45, quando o core, o engenheiro-apps, a integração e o vendedor fecharem. Prazo dado a eles: 12h20.
- **Ensaio pelo CI:** por volta de 1h30 depois do push.
- **BUILD PRONTO Campo-Demo-v1.0.5 / Gestao-Demo-v1.0.5: por volta das 15h30.**
- A **v1.0.6 às 20h fica mantida.** A T-0170 já está no main.

**O motivo do atraso:**
- Das 7h às 10h40, a sessão ficou sem conseguir gravar (o guardião).
- O PC levou 77 minutos para o lint e 121 minutos para o typecheck.
- Foi falha minha não testar um agente antes de lançar os 5.

## RN da Performance (R-20261113-115021, item 1)
Defino e gravo no doc 03 depois do M0. A proposta do engenheiro:
- Performance em **RN-CORE-41 a 46**, como o desenho que já está no main;
- Início (frase do dia, avatar e DU) em **RN-CORE-49 a 51**;
- Clientes na 47 e as etapas da entrada na 48.

## Pronto quando
O M0 está no main. Mando a confirmação com o hash.
