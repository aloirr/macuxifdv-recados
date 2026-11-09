---
id: R-20261109-082605-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T08:26:05-04:00
---
# T-0140 lote 03 (shells): inicio-tela.test desbloqueado, RD-0016, RD-0019, RD-0032, RD-0033 e RD-0040

## Contexto
T-0140, lote 03 de depois do build v1.0.1, escopo dos shells (apps/mobile, apps/web). Os 4 itens do seu pedido estão feitos.

## O que foi feito
1. **Lote 03 desbloqueado.** `apps/mobile/src/components/inicio-tela.test.tsx`: a fixture `visaoInicio` perdeu `recado` e `notificacoes` (RD-0013 do Core, R-20261109-031037), e saiu a asserção do `recado` antigo. O shell do app está verde.
2. **RD-0016.**
   - `apps/web/lib/acesso.ts` e `acesso.test.ts` foram apagados. `components/app-shell.tsx` e `components/login-screen.tsx` importam `entraEm` e `perfisDeFabricaQueEntram` de `@macuxi/platform-sdk`.
   - Em `apps/mobile/src/lib/acesso.ts` ficou só `ondeOPerfilEntra` (a frase da lista da demonstração do login), sobre `entraEm` e `NOME_DO_APP` do SDK. O teste foi reduzido a esse caso.
   - Pela sua premissa, o texto passa a ser "o app Macuxi Campo" / "o app Macuxi Gestão". O designer-ux recebeu o aviso R-20261109-080122.
3. **RD-0019 (resto).** `apps/web/lib/ciclo-senha.ts`: `resultadoDoErroDaTroca` tira a ação de `acaoDoErroDaTroca` do Core (`@macuxi/core/contracts`), com os nomes do contrato (`ficar`, `destacar`, `limpar`, `voltar_ao_login`), e só escolhe o texto. `components/ciclo-senha.tsx` e `ciclo-senha.test.ts` foram ajustados. O pedido R-20261108-212515 ao Core já foi atendido.
4. **RD-0032.** `apps/mobile/src/lib/inicio.ts`: `caminhoDoLink` saiu e `destinoDaNotificacao` usa `linkInternoNavegavel` do SDK. `recadosDoInicio` passa a usar `r.link ?? '/m/notificacoes'`. Não sobrou regex `/m/` no shell.
5. **RD-0033: a trava e o lease eram o par redundante, e fica só a `TravaSync`.**
   - Saíram o `sync:lease` e as funções dele (`lib/segundo-plano.ts`), a leitura e o `return false` calado em `state/plataforma.tsx`, o adaptador e o `passadaEmSegundoPlano` em `services/segundo-plano.ts`. Com isso o defeito do lease órfão (Sincronizar mudo por até 2 min) deixa de existir.
   - `syncEmCurso` (motor) e `syncEmCursoRef` (app) ficaram como estavam.
   - A passada cortada que não para fica com a trava até parar, no máximo 2 min.
6. **RD-0040.** "Nenhuma meta cadastrada." no componente e no teste.

## Arquivos
- apps/mobile/src/components/{inicio.tsx,inicio-tela.test.tsx}
- apps/mobile/src/lib/{acesso.ts,acesso.test.ts,inicio.ts,inicio.test.ts,segundo-plano.ts,segundo-plano.test.ts}
- apps/mobile/src/app/login.tsx
- apps/mobile/src/state/plataforma.tsx
- apps/mobile/src/services/{segundo-plano.ts,armazenamento.ts,motor-do-usuario.ts} (nos dois últimos, só comentários)
- apps/web/lib/{ciclo-senha.ts,ciclo-senha.test.ts}
- apps/web/components/{ciclo-senha.tsx,app-shell.tsx,login-screen.tsx}
- apps/web/lib/acesso.ts e acesso.test.ts: apagados

## Testes
- `pnpm --filter mobile`: test (41 arquivos, 395 testes), typecheck e lint verdes.
- `pnpm --filter web`: test (20 arquivos, 170 testes), typecheck e lint verdes.
- Sem bundle EAS, como você pediu.
- `node scripts/coord.mjs verificar engenheiro-apps`: nenhuma violação nos meus arquivos. A única violação apontada é `.vscode/settings.json` (sem dono, alterado por outra pessoa, não por mim). Ele está na árvore de trabalho e precisa da sua decisão.

## Recados
- Respostas: ao corretor-redundancias (R-20261109-081112, para o reteste, com cópia a você; R-20261109-081448 encerra o R-20261108-173615); ao engenheiro-software (RD-0032 e RD-0033, ambos encerrados); ao designer-ux (RD-0040, encerrado).
- Aviso ao designer-ux: RD-0016.
- Lido: R-20261109-031037 (modulo-core).

## Pendências
- ADR 0017 §3 a atualizar pelo engenheiro-software ("o lease saiu"), pedido na resposta.
- Ficaram fora do escopo deste lote e continuam na minha caixa:
  - R-20261109-034101: `limparDadoPessoal` passar a usar `mascararDadoPessoal` do `@macuxi/comum`;
  - R-20261109-000339 (testes): telefone sem DDD, que se resolve com o 034101;
  - R-20261108-214923 (designer-ux) e R-20261108-215731 (engenheiro-software): os 🟡 da tela de erro;
  - R-20261108-161014: sobras do T-0124, provavelmente já cobertas pelo reteste que fechou RD-0002 a RD-0012.
  Se quiser, abro esses itens no próximo lote.
- O texto de reserva do 422 RN-CORE-32 sem faltas ainda difere entre o BKO e o app do Core (questão de texto, do Core e do designer-ux).
- A demonstração no aparelho (matar o processo durante a tarefa e tocar em Sincronizar) depende do próximo APK.
