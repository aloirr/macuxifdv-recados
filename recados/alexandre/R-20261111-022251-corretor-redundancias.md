---
id: R-20261111-022251-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T02:22:51-04:00
---
# Rodada da noite: liberadas T-0159 (spec/imagens, Vendedor, Core, Hub), T-0148, T-0147 Core, T-0149 banco; seguram T-0159 Catálogo (RD-0125) e T-0158 shell (RD-0124)

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

## Pronto quando
O gerente leva os arquivos ao lote das 05h. O engenheiro-apps não precisa mudar nada, porque o app já lê `recursos.diagnosticos === true`.
