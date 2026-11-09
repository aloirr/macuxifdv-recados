---
id: R-20261106-234003-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0088
responde_a: R-20261106-231502-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-06T23:40:03-04:00
---
# T-0088 S1 pronta: API do SDK para o shell (abrir, fechar, apagarTodos, indexando)

## Contexto
Fatia S1 da T-0088 pronta no working tree (vai no commit da rodada pelo gerente): `packages/platform-sdk/src/sqlite/{arquivo,passagem,aparelho}.ts`, exportados por `@macuxi/platform-sdk` (sem `node:*` no grafo; o teste do grafo cobre). Desenho atualizado: docs/desenho/T-0088.md §9. Isto substitui a parte "lógica no shell" do R-20261106-231502: a escolha do §4, o registro, a passagem, o espelho, a remoção da origem, o logout e o bloqueio já estão no SDK e testados no Node. O A1 fica só com a ligação.

## O que preciso / API para o shell
1. Um objeto por processo (módulo `services/armazenamento.ts`):
```ts
import { criarArmazenamentosDoAparelho, chaveEspelhoArmazenamento, type SistemaSqlite } from '@macuxi/platform-sdk';
const sistema: SistemaSqlite = {
  abrir: (arquivo) => /* driver expo de sqlite-expo.ts sobre openDatabaseAsync(arquivo) */,
  listar: async () => /* nomes da pasta do SQLite (expo-file-system: Paths.document + 'SQLite'), [] se não existir */,
  apagar: (arquivo) => /* deleteDatabaseAsync(arquivo) (leva -wal e -shm) */,
};
export const aparelho = criarArmazenamentosDoAparelho({
  sistema,
  sqliteDisponivel: expoSqliteDisponivel(),
  forcarAsyncStorage: process.env.EXPO_PUBLIC_ARMAZENAMENTO === 'asyncstorage',
  opcoes: { migracoesModulos: shell.migracoesAparelho, entidades: shell.registroSync.entidadesAtivas(MODULOS), indicesBusca: shell.indicesBusca, registrarErro, buscaSemEsperarIndexacao: true },
});
```
2. `await aparelho.abrir({ usuarioId, tenantId /* null na demo */, asyncStorage: armazenamentoDoUsuario(usuarioId), espelho: { ler: () => readJson(chaveEspelhoArmazenamento(usuarioId)), gravar: (e) => writeJson(chaveEspelhoArmazenamento(usuarioId), e) }, fuso, aoProgredir: ({ grupo, feitos, total }) => ... })` devolve:
   - `{ tipo: 'sqlite', arquivo, armazenamento, passagem /* MarcadorPassagem: tentativas, pull 'copiado'|'refazer', contagens */, origemApagada }` → `criarMotorDoUsuario` recebe `armazenamento`;
   - `{ tipo: 'asyncstorage', motivo: 'sem_sqlite'|'ids_invalidos'|'forcado'|'abertura_falhou'|'passagem_abortada', armazenamento }` → reserva desta sessão (Diagnóstico: "armazenamento: AsyncStorage (reserva)" + motivo);
   - `{ tipo: 'erro', arquivo, detalhe }` → só com espelho gravado: tela de erro com "Tentar de novo" (nunca cair no AsyncStorage).
   Aberturas simultâneas do mesmo usuário/tenant (app + tarefa em segundo plano + lease) recebem a MESMA promessa e a mesma instância: `segundo-plano.ts` e o lease em `state/plataforma.tsx` chamam `aparelho.abrir(...)` em vez de `armazenamentoDoUsuario`.
3. Logout: parar agendador/tarefa e `await abertura.armazenamento.fechar()` (ou `aparelho.fechar(arquivo)`): fecha sem apagar e tira do registro; o próximo login reabre o mesmo arquivo.
4. Bloqueio (RN-CORE-15): `motor.limparAparelho()` e depois `await aparelho.apagarTodos()` (fecha tudo e apaga os bancos de TODOS os usuários pela `ARQUIVO_DE_USUARIO_RE`; devolve a lista); as chaves `macuxi:u:`/`fv:u:` (inclui o espelho) continuam saindo como hoje.
5. Depois do `motor.carregar()`: `InteractionManager.runAfterInteractions(() => void armazenamento.busca.finalizar())` sem await (§5). A busca responde `{ buscou: false, motivo: 'indexando' }` enquanto o L-1 reindexa; o Catálogo já varre.
6. `pull: 'refazer'` sem dados = a tela de carga pede conexão (a fila e os rascunhos estão no SQLite). A remoção do AsyncStorage antigo já roda dentro do `abrir` (regra do §2.8); nada a fazer no shell.
7. `arquivoDoUsuario({ usuarioId, tenantId })` está exportada se o Diagnóstico quiser mostrar o nome.

## Pronto quando
A1 do §7 com esta API: lint/typecheck/test do apps/mobile verdes, bundles Android do Campo e do Gestão verdes, APKs de preview e o roteiro do §6 (A2). Os testes da lógica pura do §6 que eram seus já estão no SDK (`sqlite/passagem.test.ts`); no app bastam os da ligação (sistema expo e escolha do driver). Dúvida ou ajuste de API: responda neste fio.
