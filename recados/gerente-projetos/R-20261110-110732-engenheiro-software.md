---
id: R-20261110-110732-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-core, banco-dados, testes]
tipo: entrega
prioridade: normal
tarefa: T-0147
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T11:07:32-04:00
---
# T-0147 plataforma: perfis_leitura (4 perfis com o gerente), tx.restringirArquivos, regra no GET /v1/arquivos/:id e apagarAoEnviar no motor

## Contexto
T-0147, parte da plataforma (ADR 0041). A decisão R-20261110-085951, item 3 (aviso R-20261110-084206), já está aplicada: o sensível abre para admin, analista, gerente e supervisor da carteira. A coluna da 0057 está na árvore (banco-dados, R-20261110-095128).

## O que fiz
- **SDK** (`packages/platform-sdk/src/arquivos.ts`):
  - `NovoArquivo.perfis_leitura?: readonly Perfil[] | null`;
  - `problemasPerfisLeitura`, a mesma regra do CHECK: 1 a 7 perfis, sem vazio e sem repetição. Entra no `validarNovoArquivo`;
  - `perfilLeArquivo(lista, usuario)`: decide pela base dos perfis resolvidos (ADR 0033); sem eles, pelo perfil do token. Falha fechada.
- **SDK** (`api.ts`): `tx.restringirArquivos?({ entidade, entidade_ids, perfis_leitura })` devolve `{ alterados }`. É opcional na interface só para não quebrar os `TransacaoTenant` falsos dos testes de 6 módulos; a API sempre implementa. Depois da v1.0.5 dá para torná-lo obrigatório.
- **API** (`apps/api/src/outbox.ts`):
  - o `registrarArquivo` grava `perfis_leitura` na criação;
  - o `restringirArquivos` atualiza só os arquivos do módulo da rota, ligados à entidade e aos ids, com `is distinct from` (idempotente). O gatilho cuida do `updated_at`.
- **API** (`apps/api/src/arquivos.ts`): no `GET /v1/arquivos/:id` e na `/miniatura`, com a lista presente e o usuário sem um perfil dela, a resposta é 404 `ARQUIVO_NAO_ENCONTRADO`, sem motivo. A carteira continua valendo. O arquivo restrito sai com `cache-control: private, no-store`. Nenhuma linha de log nova.
- **Motor** (`motor-sync.ts`): `enfileirarArquivo({ ..., apagarAoEnviar: true })`. Quando o servidor aceita, o item sai da fila e o arquivo local é apagado na hora (`ItemArquivo.apagar_ao_enviar`). Recusado ou 409 sem referência: o item continua pendente e o arquivo fica.
- **Docs**: o desenho T-0147 (gerente incluído, mais a seção "Implementação da plataforma") e a ADR 0041 (atualização de 10/11).

## Testes
- SDK: `arquivos.test.ts` com 4 testes novos (RN-CORE-38: os 4 perfis leem; vendedor, promotor e assistente não; base × token) e `motor-sync.arquivos.test.ts` com 2 novos (apaga ao aceitar; não apaga se recusado). 30/30 verdes.
- API: `test/arquivos.test.ts` com 3 novos (admin, analista, gerente e supervisor dão 200 com no-store; vendedor e promotor dão 404, também na miniatura; fora da carteira, nem gerente nem supervisor abrem; sem lista, a regra de sempre). 17/17 verdes.
- `test/arquivos.banco.test.ts` com 1 novo (`perfis_leitura` gravado no comando, o vendedor que enviou não reabre, `restringirArquivos` libera e é idempotente). Roda no CI (stack-isolado).
- tsc do SDK e da API limpos; eslint limpo (só um aviso antigo na linha 103); fronteiras com 0 erros.
- `verificar`: só o `.vscode/settings.json` sem dono, que não é meu.

## Pendências
1. **modulo-core**: no `receber` do `cliente_foto`, passar `perfis_leitura: perfisDeLeitura(tipo)` no `tx.registrarArquivo`. Quando o admin muda `sensivel`, chamar `tx.restringirArquivos!({ entidade: 'cliente_foto', entidade_ids, perfis_leitura })` na mesma transação. No app, `apagarAoEnviar: true` nos tipos sensíveis.
2. **banco-dados**: a fixture ainda tem 3 perfis na CNH (R-20261110-105704).
3. Sem commit, sem Docker.
