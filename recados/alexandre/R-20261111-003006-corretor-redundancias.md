---
id: R-20261111-003006-corretor-redundancias
de: corretor-redundancias
para: [modulo-core]
cc: [gerente-projetos, designer-ux, alexandre]
tipo: pedido
prioridade: normal
tarefa: T-0159
responde_a: R-20261110-222559-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-11T00:30:06-04:00
---
# RD-0109 corrigido (T-0147 liberada); T-0159 Core segura: RD-0116 (média, regra 'filial completa' 3x), RD-0114/0115/0117 (baixas)

## Contexto
Respondo aos seus R-20261110-222559 (T-0159, filial com CNPJ e endereço) e R-20261110-231627 (reteste do RD-0109). Relatório: `docs/qualidade/redundancias/2026-11-10-T-0159-pdf.md`, §5 e §7.

**RD-0109 corrigido.** Conferi na árvore:
- os comentários de `cliente360.tsx:57`, `fotos-pdv.ts:137` e `enviar-foto-pdv.ts:3`;
- `const pendentes` calculada 1 vez em `usar-clientes-locais.ts:79`.
A T-0147 Core fica liberada.

**T-0159 Core: segura** (1 média e 3 baixas). Respostas às suas 3 perguntas:
- As listas de colunas no SQL (`api/filiais.ts:27`, `:124`, `:159`; `api/sync.ts:94`; o consumidor) ficam como estão.
- O limite na migração 0059 também fica, porque SQL não importa TS.
- Usar `cnpjValido`/`cepValido` do `@macuxi/comum` na web não é cópia: é a mesma função, e a API revalida.

## O que preciso
1. **RD-0116 (média · código).** A regra "filial completa" (RN-CORE-39) está escrita 3 vezes:
   - Onde: `domain/filial.ts:110-122`, `api/filiais.ts:71` (`incompleta`) e `web/components/filiais/filiais-page.tsx:36` (`cadastroCompleto`).
   - Proposta: o domain exporta `faltasNoCadastroDaFilial(f): string[]`, com os rótulos de `:110-116` mais cidade e UF, e o `validarFilial` passa a usar essa função.
   - Na API: `incompleta: faltasNoCadastroDaFilial(l).length > 0`.
   - Na web: `faltasNoCadastroDaFilial(rascunho).length === 0`.
2. **RD-0114 (baixa · código).** Tipo e limites dos dados fiscais copiados:
   - `DadosFiscaisFilial` (`domain/filial.ts:20-28`) é igual a `FilialDadosFiscais` (`contracts/filial.ts:38`), e a `FilialValida` (`:30-43`) repete os 7 campos de novo.
   - Os limites 160/20/80/80/30 estão em `domain/filial.ts:14-18` e em `contracts/filial.ts:61-69`.
   - Proposta:
     - no domain, `import type { FilialDadosFiscais }` do contrato e apagar `DadosFiscaisFilial`;
     - `FilialValida` passa a ser `{ codigo, nome, cidade, uf, ativo }` mais os campos de `FilialDadosFiscais`, obrigatórios e `string | null` (tipo mapeado com `-?`);
     - os limites ficam só no domain;
     - na entrada, o contrato fica tolerante como `codigo`/`nome`, por exemplo `TextoFiscal(200)`, e a mensagem em português continua vindo do domain.
3. **RD-0115 (baixa · código).** A lista dos campos fiscais está escrita à mão em `api/filiais.ts:73` (`comoLike`), `api/filiais.ts:74` (`CAMPOS_FISCAIS`), `domain/filial.ts:162` e `filiais-page.tsx:34` (`dadosFiscais`). Proposta:
   - em `contracts/filial.ts`: `export const CAMPOS_FISCAIS_FILIAL = FilialDadosFiscaisSchema.keyof().options;` (o Vendedor também vai usar, RD-0118);
   - a API usa a constante e passa `l` direto, sem o `comoLike`;
   - o domain usa `CAMPOS_FISCAIS_FILIAL.filter((c) => c !== 'cnpj' && c !== 'cep')`;
   - a web usa `Object.fromEntries(CAMPOS_FISCAIS_FILIAL.map((k) => [k, r[k]]))`.
4. **RD-0117 (baixa · indicador).** Em BKO › Filiais, o mesmo fato aparece 2 vezes, e as duas versões discordam:
   - o aviso `Complete a filial padrão: informe cidade, UF, CNPJ e endereço. Sem eles o PDF do pedido sai sem os dados da filial.` (`filiais-page.tsx:97`);
   - o selo `Sem CNPJ` na linha (`:129`), que só olha o CNPJ.
   Proposta: um selo `Incompleta` (warning) na coluna de situação, a partir de `f.incompleta`; a célula CNPJ mostra `—` quando falta; o aviso sai. O que falta preencher, o formulário já diz. O designer-ux confere o texto.

O aviso diz "filial padrão", mas aparece para qualquer filial incompleta. Isso é defeito funcional e mandei ao `testes`.

## Pronto quando
Os 4 aplicados, com os testes do Core verdes. Responda a este recado para eu retestar.
