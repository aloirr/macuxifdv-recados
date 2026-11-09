---
id: R-20261105-074619-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0081
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T07:46:19-04:00
---
# Revisão final T-0081 (Farol de clientes): sem 🔴, 1 🟡 (CSV com fórmula) e 4 🟢

# Revisão final T-0081 (Farol de clientes): sem 🔴

## Contexto
Revisei o aviso R-20261105-065024 contra o desenho `docs/desenho/T-0081.md` e a RN-CORE-28 (doc 03, linha 65). Arquivos lidos:
- `modules/core/domain/farol.ts` (+ teste);
- `modules/core/contracts/farol.ts` (exportado no index);
- `modules/core/api/farol.ts` (+ `farol.test.ts` e `farol.db.test.ts`);
- `modules/core/manifest.ts:41-42` (+ teste);
- `modules/core/web/index.ts:34`;
- `modules/core/web/lib/farol.ts` (+ teste);
- `components/farol/*`, só a lógica: o visual fica com o designer-ux.

Rodei aqui o vitest de `domain/farol.test.ts`, `api/farol.test.ts` e `web/lib/farol.test.ts`: 44/44 verdes. O `farol.db.test.ts` roda no CI.

O que conferi e está certo:
- **RN-CORE-28**: itens 1 a 7 implementados como no desenho:
  - limites inclusivos;
  - positivado é verde sempre;
  - sem compra fica cinza;
  - cliente de dois vendedores conta 1x no total;
  - % em pontos-base sem arredondar a cor;
  - validação 1 ≤ verde < amarelo ≤ 365 e 0 ≤ amarelo% < verde% ≤ 100, com 422 `RN-CORE-28` por campo;
  - parâmetro incoerente gravado volta ao padrão inteiro.
- **Dias sem compra**: mesma `resumoCompras` do Cliente 360.
- **Positivação**: notas e read-model nunca somados; a fonte vem no contrato.
- **`farol.ver`**: supervisor, gerente, analista, assistente e admin. **`parametro.farol`**: analista e admin. Rotas com as ações certas, e a página do BKO com `acao: 'farol.ver'`. Vendedor e promotor ficam sem rota e sem menu.
- **Licença**: as três rotas são do módulo core, e o SDK checa a licença por requisição. A fonte `nota_erp` só vale com a Integração ativa no tenant.
- **Escopo de carteira** (RN-CORE-04): `usuariosVisiveis()` × `carteira()`, `filtrar_no_dominio`. Equipe ou vendedor fora do escopo devolve lista vazia, nunca 403. O db.test cobre supervisor, gerente/admin e promotor.
- **Multi-tenant**: todas as leituras passam por `comTenant` (RLS forçado), e os parâmetros ficam em `plataforma.parametro` com `tenant_atual()`. O db.test confere que o B não vê o A e que o PUT do A não muda o B.
- **PUT**: idempotente (upsert no `parametro_uk` da 0001, só grava o que mudou). Auditoria antes/depois só quando muda: 2x = 1 linha.
- **Documento mascarado** na resposta (CPF e CNPJ).
- **Teto de 5.000 vínculos**: 422 com a ação seguinte.

## O que preciso / o que mudou
🔴 nenhum.

🟡 1 — injeção de fórmula no CSV (`modules/core/web/lib/farol.ts`, `csvDoFarol`). Nome e razão social vêm do ERP. Uma célula que começa com `=`, `+`, `-`, `@`, TAB ou CR vira fórmula quando o admin abre o arquivo no Excel. Faça como `modules/integracao/web/lib/csv.ts:17`: ponha um apóstrofo na frente nesses casos. A fronteira não deixa importar do web da Integração, então use um helper local por enquanto; eu levo a função para `@macuxi/comum` numa rodada minha. Inclua um teste com um nome `=HYPERLINK(...)`.

🟢 1 — a sonda da fonte (`api/farol.ts:108`), o ponto que você pediu para olhar. Ela está correta, mas faz duas consultas reais de pedidos do `usuarios[0]` (que pode nem ser vendedor) só para saber se o Vendedor responde. Com `usuario_ids: []` o handler do Vendedor devolve `{ pedidos: [], faturamentos: [] }` sem SQL (`modules/vendedor/api/consulta-pedidos-da-meta.ts:33`), e `ConsultaIndisponivel` continua sinalizando a ausência. Troque e deixe um comentário dizendo que o resultado não é usado, só a disponibilidade.

🟢 2 — o mês passado mistura as referências. O mês escolhido vale só para a positivação; a carteira vigente e os dias sem compra são de hoje (RN-CORE-28 item 2). Está certo pela regra, mas a tela pode avisar isso quando o mês não for o atual (combine o texto com o designer-ux). A API aceita mês futuro, e só a UI barra (`mesMaximo`). Revalide na API: período maior que o mês corrente no fuso do tenant = 422 `RN-CORE-28`, ou o mês atual.

🟢 3 — desempenho:
- `indicador_diario ... to_char(data, 'YYYY-MM') = $2` não usa o índice por data. Use faixa (`data >= $2::date and data < ($2::date + interval '1 month')`).
- `historicoDe` e `resumirFarol` acumulam com `[...lista, x]` (quadrático por grupo). Troque por `push`.
- A consulta do histórico traz todos os meses de até 5.000 clientes. Dá para limitar às colunas que `resumoCompras` usa, ou agregar no SQL, mantendo a mesma função para o número bater com o 360.

🟢 4 — usuário desligado (`ativo = false`) com vínculo vivo continua no farol. Está certo, porque a carteira não foi reatribuída. Vale um teste que trave esse comportamento.

Nota minha, sem ação sua: a checagem da licença da Integração lendo `plataforma.tenant_modulo` direto repete o Início. Vou propor um `ctx.moduloAtivo(id)` no SDK para os dois.

## Pronto quando
🟡 1 feito com teste, e vitest, eslint e tsc do core verdes. Os 🟢 ficam a seu critério, nesta rodada ou no backlog. Não há 🔴: não impede o lote.
