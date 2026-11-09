---
id: R-20261109-095752-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0141
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T09:57:52-04:00
---
# T-0141 C (desenho e contrato do endereço editado no pedido), ADR 0017 §3 sem lease e diagnóstico do coord.mjs enviar lento

## Contexto
T-0141, minha parte: item C (contrato do endereço editável só no pedido, RN-VEN-17), ADR 0017 §3 (RD-0033) e diagnóstico da lentidão do `coord.mjs enviar`.

## O que fiz
1. **Desenho** `docs/desenho/T-0141.md`. O retrato do endereço **já existe** ponta a ponta (T-0061): a coluna jsonb `vendedor.pedido.endereco_entrega`, o detalhe, os PDFs, o `aprovado@1` e o `PedidoParaErp`. O que muda:
   - o retrato ganha `origem: 'erp' | 'editado'`;
   - o push ganha `endereco_entrega_editado` (`EnderecoEditadoPedido`, strict). Limites de NF-e: rua, complemento, bairro e cidade até 60, número até 20, UF das 27, CEP com 8 dígitos;
   - o domain ganha `normalizarEnderecoEditado`, `validarEnderecoEditado` e `enderecoDoPedido` (editado igual a um endereço do ERP vira `erp`; com editado, o id não é validado, então o pedido offline nunca cai);
   - o Hub ganha `EnderecoEntregaErp.origem`, e o SQL do Conector segue a regra "external_id nulo = usar os textos".
   **Tudo aditivo**: `aprovado@1` e Hub `v1` continuam, sem ADR e sem coluna nova (só checks de defesa). A compatibilidade está na matriz do §7. O APK que manda só o id fica igual a hoje.
2. **`@macuxi/comum/endereco`**: `UFS_BRASIL`, `ehUf`, `normalizarCep`, `cepValido` e `formatarCep`, com teste RN-VEN-17. Arquivos: `packages/comum/src/endereco.ts`, `endereco.test.ts`, `index.ts` e `package.json` (export `/endereco`).
3. **Registro**: a linha do `vendedor.pedido.aprovado@1` em `.coord/contratos/eventos.md` ganhou a nota da T-0141.
4. **ADR 0017 §3**: o lease saiu; a `TravaSync` é a única porta; nada é persistido; o `sync:lease` antigo fica sem leitor (R-20261109-081901, RD-0033).
5. **Recados**: pedidos ao banco-dados (checks, `docs/banco/vendedor.md` e seed), ao modulo-vendedor (contratos, domain e API já; telas depois da imagem) e ao modulo-integracao (`origem`, OpenAPI, guia do Conector); aviso ao designer-ux (os limites de C.3 mudam para os do contrato); pedido ao dono do produto, com cópia a você, sobre o `coord.mjs`.
6. **Diagnóstico do `enviar` lento** (sem editar): o `enviar` lê os 4.704 recados inteiros a cada comando, **duas vezes com `--responde-a`**, e cada arquivo custa de 12 a 29 ms no clone, contra 4 ms no repositório. Não é a junção nem o git. Proposta: `enviar` e `ler` por `existsSync` e índice de metadados por nome (recado é imutável). Opcional: exclusão do antivírus no clone.

## Testes
`pnpm --filter @macuxi/comum test` (112), typecheck e lint verdes. `node scripts/coord.mjs verificar engenheiro-software`: só a violação de `.vscode/settings.json`, que não é minha.

## Pendências e premissas
- Ordem de implantação: API e migração no ar **antes** de distribuir o APK novo (a API antiga descartaria o editado sem avisar). Ponha no roteiro do build.
- Premissas do §9 do desenho, para você confirmar: o Duplicar copia o endereço editado; sem busca de CEP; sem lista de "endereços editados" no BKO.
- Para você: o doc 06, linha "Pedidos aprovados", deve citar o endereço editado.
- 🟢 Para o modulo-core, opcional: o `UFS` local em `modules/core/domain/cadastro.ts` pode usar o `@macuxi/comum`.
- A revisão final da T-0141 fica comigo, quando o testes e o corretor passarem.
