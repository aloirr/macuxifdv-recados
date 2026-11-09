---
id: R-20261107-001039-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0088
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T00:10:39-04:00
---
# T-0088 A1 entregue: Campo e Gestão sobre o SQLite (passagem, logout, bloqueio, medição pelo caminho real); A2 aguarda o build

## Contexto
T-0088, fatia A1 (shell do Campo e do Gestão), sobre a S1 do engenheiro-software (R-20261106-234003). Sem EAS, sem git, sem Docker, sem `.env`.

## O que foi feito
- O motor do usuário abre sobre o SQLite do usuário e do tenant da sessão (`macuxi-u-<usuario>-t-<tenant|demo>.db`), com uma instância por arquivo no processo. O app, o lease e a tarefa em segundo plano usam a mesma instância.
- Passagem do AsyncStorage na 1ª abertura, antes do motor. A tela "Atualizando os dados do aparelho…" fica por cima e só aparece depois de 400 ms. Com os dados já no SQLite e o arquivo sem abrir, a tela de erro oferece "Tentar de novo" e nunca volta ao AsyncStorage. O espelho e a remoção do antigo seguem a regra do SDK.
- O logout fecha sem apagar, e o próximo login reabre o mesmo arquivo. Troca de usuário ou de tenant: um arquivo para cada. Aparelho bloqueado (RN-CORE-15): apaga os bancos de todos os usuários depois de `motor.limparAparelho()`, no app e na tarefa.
- `busca.finalizar()` é agendado depois do `carregar` com `requestIdleCallback`, porque o `InteractionManager` está obsoleto no RN 0.86. O desvio vai na revisão para o engenheiro-software decidir.
- O Diagnóstico do Perfil mostra o armazenamento ativo: SQLite com o marcador, ou AsyncStorage (reserva) com o motivo.
- `app.config.ts`: o plugin expo-sqlite agora é obrigatório.
- A tela oculta de medição usa as opções do adaptador do app e mede a 1ª busca durante o L-1 (`indexando`).

## Arquivos
apps/mobile: `app.config.ts`, `src/app/{_layout,diagnostico-carga,profile}.tsx`, `src/components/preparo-aparelho{.tsx,.test.tsx}` (novo), `src/lib/armazenamento-aparelho{.ts,.test.ts}` (novo), `src/lib/aparelho-bloqueado{.ts,.test.ts}`, `src/lib/diagnostico-carga{.ts,.test.ts}`, `src/services/{armazenamento,motor-do-usuario,segundo-plano,sqlite-expo}.ts`, `src/state/plataforma.tsx`.

## Testes
- eslint e tsc limpos.
- vitest: 29 arquivos, 257 testes verdes. Novos: 14 da ligação com `node:sqlite` (escolha do §4, uma instância, logout e reabertura, troca de usuário e tenant, bloqueio que apaga os bancos de todos, remoção do antigo só depois do sync, erro com espelho) e 3 de componente.
- Bundle Android campo e gestao verdes (2068 módulos). `expo config` das duas variantes já traz o plugin expo-sqlite. timers-sync ok.
- `verificar engenheiro-apps`: só as violações dos anexos de `.coord/recados/anexos`, que não são meus.

## Pendências
- A2: APKs de preview das duas variantes e o roteiro do §6 (APK de produção com 3 pedidos, 1 visita e um rascunho offline, atualização aberta sem sinal e depois com sinal, p95 e quadros na medição). Espero a liberação do build.
- Revisão do engenheiro-software: R-20261107-000958.
- Revisão de UX das duas telas novas: R-20261107-001013 ao designer-ux.

## Premissas
O id do tenant da sessão v1 é `sessao.tenant.id`. Na demonstração, os ids não são UUID, então a sessão fica no AsyncStorage (reserva `ids_invalidos`, prevista no §4). O logout não espera um sync que esteja no ar.
