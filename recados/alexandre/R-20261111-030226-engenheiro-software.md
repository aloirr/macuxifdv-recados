---
id: R-20261111-030226-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [alexandre, engenheiro-apps]
tipo: entrega
prioridade: normal
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T03:02:26-04:00
---
# T-0158: recursos.diagnosticos no /v1/saude (flag próprio MACUXI_DIAGNOSTICOS_APP, desligado e fora dos compose), testes verdes

## Contexto
T-0158, chave remota do diagnóstico pelo `GET /v1/saude`. Segui o R-20261111-011107 (flag próprio), que substitui o item 3 do prompt e a parte "flag da demo" do R-20261111-004628.

## O que preciso / o que mudou
1. **SDK** (`packages/platform-sdk/src/saude.ts`): `SaudeRespostaSchema` ganhou `recursos: z.object({ diagnosticos: z.boolean() }).partial().optional()`. É aditivo: o app antigo ignora, e o servidor antigo sem o campo conta como desligado.
2. **API**:
   - `apps/api/src/config.ts`: nova `diagnosticosAppLigados(env)`, verdadeira só com `MACUXI_DIAGNOSTICOS_APP` **e** `MACUXI_DIAGNOSTICOS` ligados;
   - `apps/api/src/servidor.ts`: passa a opção `diagnosticosApp`;
   - `apps/api/src/app.ts`: o `/v1/saude` devolve `recursos: { diagnosticos: diagnosticosPortal && diagnosticosApp }`.
3. **Demo**: o `MACUXI_DIAGNOSTICOS=1` continua no `scripts/deploy/demo/compose.yml` e liga só o portal, o alerta e o expurgo. O `MACUXI_DIAGNOSTICOS_APP` não está em nenhum `compose.yml`, então o botão não liga no deploy. **Para ligar sem APK novo**, por decisão do dono do produto: `MACUXI_DIAGNOSTICOS_APP=1` no `.env` da VM e reinício da API. Para desligar, basta tirar a variável. A produção fica desligada.
4. **`ultimas_saidas`**: a árvore já tem a chave no CHECK da `db/migrations/0058_plataforma_diagnostico.up.sql` (linha 107), no `sa_diagnostico` (linha 303) e em `db/testes/diagnostico.test.ts`, feitos pelo banco-dados. Por isso **não tirei** a chave do `detalheDoDiagnostico`. A entrega formal do banco-dados não chegou à minha caixa até agora; o teste de banco roda no CI.
5. **Desenho**: `docs/desenho/T-0158.md` §3, bloco "Chave remota do botão". Não há OpenAPI a atualizar, porque o `/v1/saude` fica fora do OpenAPI gerado, que é só o do Conector.

**Testes (sem banco):**
- `saude.test.ts` cobre o campo ausente, vazio, booleano e inválido;
- `config.test.ts` cobre os dois flags, ligados e desligados, e mostra que o `MACUXI_DIAGNOSTICOS=1` sozinho não liga o botão;
- `app.test.ts` cobre as 4 combinações na rota, e o padrão é desligado.

O tsc do SDK e da API, o eslint dos arquivos tocados e o vitest (`saude`, `app`, `config`, `observabilidade`) estão verdes. Sem commit.

**Prazo**: o código ficou na árvore antes das 02h00, mas o vitest e o tsc deste PC levaram de 7 a 14 min cada, com a máquina carregada. A confirmação verde saiu às 02h57.

**Verificar**: o `coord verificar engenheiro-software` acusa só `.vscode/settings.json`, que está sem dono e não foi alterado por mim. Fica com o gerente.

## Pronto quando
O gerente leva os arquivos ao lote das 05h. O engenheiro-apps não precisa mudar nada, porque o app já lê `recursos.diagnosticos === true`.
