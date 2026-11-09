---
id: R-20261105-215440-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T21:54:40-04:00
---
# Antes de abrir N1, N2 e N3: travas estreitas em modules/integracao, para não parar as fatias A e B

## Contexto
Você vai abrir agora 3 sessões da nuvem para a T-0087 (portal de implantação), todas em `modules/integracao/**`. Ao mesmo tempo, as fatias A e B da T-0084 e da T-0085, que rodam no PC e sobem até 24h, precisam mexer em `modules/integracao/contracts` e `modules/integracao/api`: a aplicação, as referências e o oferece junto entram no contrato do produto do Hub, e o corte em 2.000 com aviso entra no monitor. Se as sessões travarem `modules/integracao/**` inteiro, A e B param, e se elas mexerem nos mesmos arquivos, os dois lados se atropelam.

**Peço que cada sessão fique só nos caminhos novos abaixo.** Eles estão registrados no quadro, e os agentes locais não tocam neles.

| Sessão | Branch | Caminhos dela (todos novos) | Pode tocar com uma linha só |
|---|---|---|---|
| **N1** — modelos CSV e dicionário de campos | `nuvem/T-0087-modelos-csv` | `modules/integracao/domain/modelos-csv/**`, `modules/integracao/api/modelos-csv*.ts`, `docs/integracao/modelos/**` | `modules/integracao/api/index.ts` (registrar a rota) |
| **N2** — OpenAPI 3.1 e documentação | `nuvem/T-0087-openapi` | `modules/integracao/domain/openapi/**`, `modules/integracao/api/openapi*.ts`, `docs/integracao/api/**` | `modules/integracao/api/index.ts` (registrar a rota) |
| **N3** — divisão de arquivo com mais de 5.000 linhas | `nuvem/T-0087-carga-em-partes` | `modules/integracao/domain/carga-partes*.ts`, `modules/integracao/api/carga-partes*.ts` | `modules/integracao/api/bko-carga-arquivo.ts` (chamar a divisão) |

**Regras para as três sessões:**
- Não mexer em `modules/integracao/contracts/**`, que é da fatia B (contrato do produto do Hub). O que precisarem do contrato, leem do main. Se faltar algo, abrem a dúvida no PR.
- O modelo CSV dos produtos (N1) e o OpenAPI (N2) saem **gerados dos contratos Zod**, e não escritos à mão. Assim, quando a fatia B acrescentar `aplicacao`, `referencias` e `oferece_junto`, basta fazer pull e gerar de novo.
- A página do portal (`config.macuxifdv.com.br`) não é delas: os cartões, o botão "Importar CSV", o "Conferir sem gravar" e o "Baixar erros" ficam com o time local, no apps/web. As sessões entregam as rotas e as funções que a página chama.
- Cada commit leva um único trailer `Agente: modulo-integracao`.
- Não mexer em `.coord/`, `.claude/`, `.github/` nem `scripts/coord*`.
- No fim, o título do PR ganha `[PRONTO PARA MERGE <sha>]` com o CI verde. O merge é meu, pela regra A, depois das revisões do engenheiro-software e do designer-ux.

**Ordem de dependência do Hub** (vale para N1 e N3; o código deve ler a ordem que já está no módulo, sem lista nova):
1. Equipe (usuários)
2. Árvore do catálogo
3. Produtos
4. Unidades
5. Tabelas de preço
6. Estoque
7. Clientes
8. Endereços
9. Transportadoras
10. Rotas e carteira
11. Títulos (opcional)
12. Notas e histórico (opcional)
