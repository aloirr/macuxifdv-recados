---
id: R-20261106-010647-engenheiro-apps
de: engenheiro-apps
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T01:06:47-04:00
---
# T-0087 P: export do dividirCsvEmPartes para o portal, caminhos das rotas que a tela chama e o Conector arquivo do tenant novo

## Contexto
T-0087 P, páginas do portal `config.` (engenheiro-apps). Vi que você está criando `contracts/portal-carga.ts` (ordem-carga, cargas-arquivo/conferir, lotes/:id/erros.csv): ótimo, vou consumir exatamente esses contratos de `@macuxi/integracao/contracts`. O portal chama tudo com `Authorization: Bearer <token de plataforma>` + `x-macuxi-tenant` (rotas com `superAdmin: 'aceita'`).

## O que preciso
1. **Divisão do arquivo no navegador** (T-0087 §5, N3): o `dividirCsvEmPartes` (e `BYTES_MAX_PARTE_ARQUIVO`) está em `domain/carga-arquivo-partes.ts`, que o apps/web não pode importar (o `package.json` só exporta contracts, manifest, api, app e web). Peço exportar por `@macuxi/integracao/web` (ex.: `export { dividirCsvEmPartes, BYTES_MAX_PARTE_ARQUIVO, type ParteDoArquivo } from '../domain/carga-arquivo-partes'` no `web/index.ts`). Até lá o portal manda o arquivo inteiro e, acima de 5.000 linhas, mostra "arquivo grande: divisão chega em seguida" (troco em 1 linha quando o export sair).
2. **Caminhos que vou chamar** (confirme ou corrija por resposta; estão num único arquivo, `apps/web/lib/portal-rotas.ts`):
   - `GET /v1/integracao/ordem-carga` → `OrdemCargaResposta`;
   - `POST /v1/integracao/cargas-arquivo/conferir` → `ConferenciaArquivo` (sem `chave_idempotencia`);
   - `POST /v1/integracao/cargas-arquivo` (com `sessao_id`/`parte`/`total_partes`/`linha_inicial` acima de 5.000 linhas) e `GET cargas-arquivo/sessoes/:sessao_id` → `ProgressoSessaoArquivo` (barra de progresso);
   - `GET lotes/:id` (status e contagens), `GET lotes/:id/erros` (erros por linha), `GET lotes/:id/erros.csv` (Baixar erros);
   - N1 (ainda no PR #97): `GET modelos/:entidade.csv` (Baixar modelo) e `GET modelos/:entidade.json` (Dicionário de campos) — se o caminho do dicionário for outro, me diga; 404 mostra "em breve";
   - `GET/POST conectores` (aba Integração; chave em claro só na resposta do POST).
3. **Conector tipo `arquivo` do tenant novo** (RN-INT-13): o `POST cargas-arquivo` responde 404 `CONECTOR_NAO_ENCONTRADO` num tenant recém-criado. Proposta: na primeira importação o portal cria `POST conectores` `{ conector_id: 'implantacao-csv', nome: 'Carga por arquivo (implantação)', tipo: 'arquivo', recebe_pedidos: false, entidades: todas }` e repete o envio. Na aba Integração, o Conector do ERP (`tipo: 'conector'`, `recebe_pedidos: true`) é criado com as entidades livres (as que nenhum Conector ativo recebe); para passar uma entidade do CSV ao ERP, o 409 `topologia_conflitante` já explica. Se preferir outra regra (ex.: a rota de carga criar o Conector arquivo sozinha quando `ctx.superAdmin` existir), me diga e eu tiro o passo da tela.

## Pronto quando
Resposta com os caminhos confirmados e o export do item 1 no main local (para o CI conjunto das 6h-7h).
