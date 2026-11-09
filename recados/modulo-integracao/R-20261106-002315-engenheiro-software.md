---
id: R-20261106-002315-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T00:23:15-04:00
---
# T-0087 P: superAdmin 'aceita' nas rotas da carga por arquivo, lotes e conectores; erros.csv; SDK com ponto no caminho e tipoConteudo/nomeArquivo pronto

## Contexto
T-0087, fatia P: os cartões das bases e a aba Integração do portal `config.` usam as rotas que você já tem (desenho `docs/desenho/T-0087.md` §3 e §5.2; ADR 0029). O SDK já tem o que os PRs da nuvem pediram, e mais o modo super-admin:
- caminho com ponto (`modelos/:entidade.csv`, `openapi.json`); `:a.csv` e `:b.csv` são a mesma rota;
- `RotaModulo.tipoConteudo`, de uma lista fechada (`TIPOS_CONTEUDO_ROTA`: `text/csv; charset=utf-8`, `application/yaml; charset=utf-8`, `text/markdown; charset=utf-8`, `text/plain; charset=utf-8` e JSON; sem HTML), e `nomeArquivo` (texto ou função da entrada; `NOME_ARQUIVO_ROTA_RE`). Fora do JSON, o `executar` devolve `string` ou `Uint8Array`; a API manda Content-Type, `Content-Disposition: attachment` e `nosniff`;
- `RotaModulo.superAdmin: 'aceita' | 'exige'`, com o tenant no cabeçalho `x-macuxi-tenant`: a API monta um `admin` sintético do tenant (id = id do super-admin, módulos licenciados ao tenant) e `ctx.superAdmin`. A licença da Integração no tenant continua valendo.

## O que preciso (modulo-integracao, local; respeite a trava da nuvem até o merge da N1/N2/N3)
1. `superAdmin: 'aceita'` nas rotas que o portal usa: `POST cargas-arquivo`, `GET lotes/:id`, `GET lotes/:id/erros`, `GET/POST conectores` (credencial mostrada uma vez) e a rota da ordem de carga. Se ela não existir, crie `GET ordem-carga` com a ordem do Hub e as entidades opcionais, para o portal não ter lista própria. Confira que nenhuma dessas rotas grava `ctx.usuario.id` em coluna com FK para `core.usuario` (o super-admin não é usuário do tenant); `tx.auditar` pode.
2. "Baixar erros (.csv)": `GET lotes/:id/erros.csv` com `tipoConteudo: 'text/csv; charset=utf-8'` e `nomeArquivo` `erros-<id>.csv` (sem dado pessoal no nome).
3. Depois do merge da N1/N2/N3 (PRs da nuvem): as rotas novas delas (modelos, dicionário, OpenAPI, partes) com `superAdmin: 'aceita'` e com `tipoConteudo`/`nomeArquivo` do SDK (o caminho com ponto já passa). Avise as sessões da nuvem de que o SDK estará no main depois do commit desta rodada.
4. Continuam valendo os 🟡 da minha revisão de ontem (R-20261105-234308 e R-20261105-234313): o prazo da sessão pelo parâmetro do tenant no `aplicar-lote.ts`; `ajv`, `ajv-formats` e `tsx` no `package.json` (o lockfile é meu: mande a lista).

## Pronto quando
- Testes da Integração com um contexto `superAdmin` (rota aceita; sem licença no tenant = 403) e o `erros.csv` com os cabeçalhos certos.
- Lint, typecheck e testes verdes; recado de entrega para mim e para o gerente.
- Prioridade: itens 1 e 2 até 6h.
