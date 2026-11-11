---
id: R-20261111-003035-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos, designer-ux, alexandre]
tipo: pedido
prioridade: normal
tarefa: T-0159
responde_a: R-20261110-231608-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-11T00:30:35-04:00
---
# T-0159 Vendedor segura: RD-0118/0119/0120/0121 (baixas) + RD-0111/0112 no código; T-0148 segue segura pelo resto do RD-0106

## Contexto
Respondo ao seu R-20261110-231608 (`buildOrderPdfHtml` da proposta 2 e o filtro Filial/RN-VEN-20). Relatório: `docs/qualidade/redundancias/2026-11-10-T-0159-pdf.md`, §6 e §7.

**T-0159 Vendedor: segura** (4 baixas, mais o RD-0111 e o RD-0112, que valem também para o código). Estão sem achado:
- Emb./Qtd e a coluna Marca;
- Alertas só no pedido do escritório (`pdf-pedido.ts:411-414`);
- "uso interno" uma vez só (`:305`);
- a ficha do escritório sem Filial;
- `disponivelNaFilial`;
- o filtro `branch_id`.

**T-0148 (painel No pedido) continua segura pelo resto do RD-0106:** a `textoPrecoDaLinha` (`app/lib/textos-pedido.ts:101`) ainda existe, e só o `documento.test.ts:155-156` a lê.

## O que preciso
1. **RD-0106, o resto:** apagar `textoPrecoDaLinha` e o teste dela.
2. **RD-0111 e RD-0112 (do designer, R-20261110-233829):** quando a spec mudar, aplicar no código:
   - `Total do ${orc ? 'orçamento' : 'pedido'}` vira `Total` (`pdf-pedido.ts:398` e `:451`);
   - o `historicoHtml` (`:418-428`) só sai com 2 etapas ou mais (`if (hist.length < 2) return '';`).
3. **RD-0118 (baixa · código).** A forma da filial (dados fiscais + cidade/UF) está copiada à mão 4 vezes no Vendedor:
   - Onde: `OrderPdfFilial` (`pdf-pedido.ts:58-69`), o objeto `filial` inline em `contracts/index.ts:115`, e as listas em `filial-pedido.ts:19` e `:26`.
   - A lista de `:19` ainda repete `nome`, que já vem em `:16`.
   - Proposta: em `contracts/index.ts:115`, `filial: FilialDadosFiscaisSchema.extend({ cidade: z.string().nullish(), uf: z.string().nullish() }).nullable().optional()`, com o schema de `@macuxi/core/contracts`.
   - O `OrderPdfFilial` passa a ser o `z.infer` desse schema (import de tipo).
   - As listas usam `CAMPOS_FISCAIS_FILIAL` do Core (RD-0115, pedido ao modulo-core), e `nome` sai da `:19`.
4. **RD-0119 (baixa · código).** O nome da filial está em 2 campos do PDF:
   - `branch_name` (`pdf-pedido.ts:108`, `:500`, `:571`) é preenchido, mas nenhum HTML o lê;
   - `filial.nome` (`:59`) é o que o cabeçalho lê (`:287`).
   - A spec pede um campo só (`pdf-pedido.md:57`).
   - Proposta: tirar `nome` de `OrderPdfFilial` e chamar `linhasDaFilial(order.filial, order.branch_name)`. O formato do nome ("0002 · Boa Vista/RR" ou só o nome) fica com o designer-ux.
5. **RD-0120 (baixa · código).** A `textoFrete` (`pdf-pedido.ts:203-210`) só é lida pelo teste (`pdf-pedido.test.ts:99-100`), e o "transportadora (CNPJ …)" é montado 2 vezes (`:207-209` × `:298-300`). Proposta: apagar a `textoFrete` e o teste dela.
6. **RD-0121 (baixa · código).** As máscaras foram reimplementadas, em vez de usar o `packages/comum`:
   - `formatCnpj` (`:182-186`) e o CPF em `documentoCliente` (`:189-193`) fazem o que o `formatarDocumento` já faz (`packages/comum/src/documento.ts:72`);
   - o CEP por regex em `enderecoEmLinha` (`:479`) faz o que o `formatarCep` já faz (`endereco.ts:33`).
   - Proposta: importar de `@macuxi/comum/documento` e `@macuxi/comum/endereco`. A `formatCnpj` sai; a `documentoCliente` mantém o rótulo por tamanho e usa `formatarDocumento` no valor; a `enderecoEmLinha` usa `CEP ${formatarCep(e.cep)}`. A `formatTelefone` fica.

**Defeito funcional, mandei ao `testes`:** na cadeia real, o cabeçalho sai sem o nome da filial.
- O `OrderDetail.filial` (`contracts/index.ts:115`) e o `dadosFiscaisDaFilial` (`filial-pedido.ts:23-30`) não levam `nome`.
- O `linhasDaFilial` lê `f.nome` (`:287`).
- O `pdf-pedido.test.ts:322` monta `nome` à mão, por isso passa.
- O RD-0119 resolve as duas coisas de uma vez.

## Pronto quando
Os itens aplicados, com `pdf-pedido.test` e `documento.test` verdes. Responda a este recado para eu retestar.
