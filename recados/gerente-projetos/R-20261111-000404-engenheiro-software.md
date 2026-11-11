---
id: R-20261111-000404-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T00:04:04-04:00
---
# T-0158: ultimas_saidas (5 saídas) no contrato, rota e portal; worker com token só no worker; patch de governança do diagnostico pronto

## Contexto
T-0158 no build das 05h de Manaus (R-20261110-212608), com as imagens aprovadas (R-20261110-192152): sem a linha "Vai junto", e o envio leva as 5 últimas saídas do Android e o último erro.

## O que fiz
1. **Contrato (aditivo)**, em `packages/platform-sdk/src/diagnostico.ts`:
   - `DiagnosticoSaidaDaListaSchema`: a saída + `quando` (UTC), com `pilha` de até 1000;
   - `MAX_SAIDAS_DIAGNOSTICO = 5` e `DiagnosticoEnvioSchema.ultimas_saidas` (até 5, opcional/nula; o app anterior continua válido);
   - `DiagnosticoDetalheSchema.ultimas_saidas` chega sempre como lista (linha antiga = `[]`);
   - teste do pior caso: o corpo com tudo no máximo e escapado cabe nos 32 KB.
2. **Rota** `POST /v1/diagnosticos` (`apps/api/src/diagnosticos.ts`):
   - mascara `ultimas_saidas[].descricao/pilha`;
   - grava a lista no `detalhe` só quando vem com algo (`detalheDoDiagnostico`);
   - corta a query e a âncora da `tela` antes do insert (a premissa do banco-dados no R-20261110-155501 está confirmada).
3. **Portal › Diagnósticos** (`apps/api/src/diagnosticos-portal.ts`, sem mudança de código): lista, detalhe com as 5 saídas e print `no-store`. Só para o super-admin: o admin do cliente recebe 403. Fica atrás de `MACUXI_DIAGNOSTICOS=1`.
4. **Worker de alerta e expurgo** (`diagnosticos-worker.ts`): continuam como estavam. Sem `MACUXI_RECADOS_TOKEN_SERVIDOR`, as linhas ficam `desligado`, com um único warn. O expurgo roda com `MACUXI_DIAGNOSTICOS=1`.
   - Novo: o token vai num `recados.env` que entra **só no worker** (`scripts/deploy/{demo,producao}/compose.yml`; o `preparar-vm.sh` mantém em 600), nunca na api nem no bko.
5. **Patch de governança** `docs/desenho/T-0158-governanca.patch` (+107/−4; `git apply --check` limpo agora):
   - `coord-lib.mjs`: `REMETENTES_DE_SISTEMA` e `ehRemetenteDeSistema`; um recado `-diagnostico` no disco é violação para todos;
   - `coord.mjs`: recusa `--de diagnostico`;
   - os 2 workflows gravam o `recados.env`;
   - 3 testes novos em `coord-recados.test.mjs`. Os hooks ficam sem mudança, e o teste prova que o recado `-diagnostico` não autoriza merge.
   - O "aprovo" foi pedido ao alexandre no R-20261110-233500.
6. **Desenho** `docs/desenho/T-0158.md` atualizado (§2, §5, §7).

## Testes
- **SDK:** `diagnostico.test.ts` 9/9; `tsc` do SDK verde.
- **API:** `diagnosticos`, `diagnosticos-portal`, `diagnosticos-worker`, `recados-github`, `arquivos` e `funcoes-sa`: 52/52.
- **`tsc` da API:** o único erro era de `modules/vendedor/domain/pdf-pedido.ts` (T-0159, `cep`), já corrigido na árvore pelo dono.
- **Patch** (numa cópia com ele aplicado): `coord-recados` 22/22. O guarda-merge passa, exceto "gh fora do ar", que também falha sem o patch: é o gh que não responde em 20 s com a máquina carregada. O coord-verificar e o guarda-recado ainda estão rodando: aviso se aparecer regressão.
- **`verificar engenheiro-software`:** 1 violação que não é minha, `.vscode/settings.json` (sem dono, untracked).

## Pendências
- **banco-dados (R-20261110-215028):** a chave `ultimas_saidas` no CHECK da 0058 e no `sa_diagnostico`. **Sem isso, o envio com a lista dá 23514 (500)**. Se não entrar até as 02h30, me avise: eu tiro a chave do `detalheDoDiagnostico`.
- **alexandre:** o "aprovo" do patch e o token `macuxi-recados-servidor` (pode vir depois; sem ele, só o recado fica desligado).
- **engenheiro-apps:** já usa `ultimas_saidas` no app e no portal (`apps/web/lib/portal-diagnosticos.ts`). Combinado no R-20261110-215935.
- **Ligar:** `MACUXI_DIAGNOSTICOS=1` no `.env` da VM, só com tudo verde.

Sem commit nem push.
