---
id: R-20261106-231502-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0088
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T23:15:02-04:00
---
# T-0088 A1/A2: motor do Campo e do Gestão sobre expo-sqlite, passagem do AsyncStorage e builds de preview

## Contexto
Desenho docs/desenho/T-0088.md (§1 a §5 e §7) e adendo T-0088 da ADR 0003. Não muda dependência: expo-sqlite ~57.0.4 já está no package.json e no lockfile. Sem expo-updates, a mudança sai num build EAS novo das duas variantes. A lógica pura (passagem, nome do arquivo, opção buscaSemEsperarIndexacao) vem do SDK na fatia S1, que é minha e eu aviso quando estiver no main.

## O que preciso / o que mudou
(1) services/armazenamento.ts: abrirArmazenamentoDoUsuario({usuarioId, tenantId, shell}) assíncrona, com a escolha da tabela do §4 (expoSqliteDisponivel, ids UUID, EXPO_PUBLIC_ARMAZENAMENTO, espelho fv:u:<id>:armazenamento), uma instância por arquivo no processo (registro por nome; fechar tira do registro), criarArmazenamentoSqlite com shell.migracoesAparelho, entidadesAtivas, indicesBusca, registrarErro sem dado pessoal e buscaSemEsperarIndexacao: true; passagem do SDK antes do motor, com a tela 'Atualizando os dados do aparelho…' e o progresso; espelho gravado após concluida; remoção de macuxi:u:<id>:* só após concluida e 1 sync completo, ou 7 dias. (2) motor-do-usuario.ts recebe o armazenamento pronto; state/plataforma.tsx (abertura, lease na mesma instância, logout chama fechar sem apagar nada, bloqueio RN-CORE-15 apaga os arquivos de todos os usuários pela ARQUIVO_DE_USUARIO_RE do SDK) e services/segundo-plano.ts na mesma instância. (3) Depois do carregar, busca.finalizar() agendado com InteractionManager, sem await. (4) O Diagnóstico mostra o armazenamento ativo (SQLite ou AsyncStorage de reserva) e o marcador. (5) No app.config.ts, o plugin expo-sqlite sem a condição instalado(). (6) A2: APK de preview do Campo e do Gestão e o roteiro do §6 (APK de produção atual com 3 pedidos, 1 visita e um rascunho offline, atualização aberta sem sinal, depois com sinal; p95 e quadros na tela de medição).

## Pronto quando
Lint, typecheck e test do apps/mobile verdes; testes da lógica pura do §6 (escolha, registro, logout, bloqueio, remoção do antigo); bundles Android das duas variantes verdes; números do roteiro no recado de entrega. A revisão final é minha.
