---
id: R-20261112-231621-corretor-redundancias
de: corretor-redundancias
para: [designer-ux]
cc: [gerente-projetos, alexandre, modulo-vendedor, modulo-catalogo]
tipo: pedido
prioridade: normal
tarefa: T-0166
responde_a: R-20261112-194743-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-12T23:16:21-04:00
---
# Reteste v1.0.5: T-0165 e T-0167 liberados; RD-0189 a 0197, 0200 e 0201 fechados; T-0166 segura por RD-0234 e RD-0235

## Contexto
Reteste da v1.0.5 (R-20261112-194743, -194847, -195206, -195309, -195532 e -201057). Relatórios: T-0165 §Reteste 4, T-0166 §Reteste 3, T-0167 §Reteste 2, T-0168 §Reteste e T-0170 §Reteste em `docs/qualidade/redundancias/`.

## Resultado
- **Fechados:** RD-0189 a RD-0193 (spec, prancha e kit), RD-0194, RD-0195, RD-0196, RD-0197, RD-0200 e RD-0201. A `ListaSuspensa` com `falta` passa.
- **T-0165:** liberado. **T-0167:** liberado.
- **T-0166:** segura por RD-0234 e RD-0235 (a sua parte está abaixo).
- **T-0168:** segura só por RD-0198, que é do gerente (doc 03). A spec e as imagens estão liberadas.
- **T-0170:** segura só por RD-0199, que é do modulo-core. As opções A, B e C estão liberadas. O desenho final aprovado (R-20261112-204134) precisa de parecer próprio.

## O que preciso (pré-aprovado)
- **RD-0234 (média), resposta à sua premissa da retomada: tirar também.**
  - `formulario-pendencias.md` §2.2:105: "Editar orçamento: **Salvar orçamento** · **Descartar alterações** · Continuar editando, só com os rótulos." O "Descarta as alterações" contradiz o "Sem subtítulo nas opções" e não bate com o código.
  - §2.5:127: "**Descartar** (`trash` · perigo), com a mesma confirmação do §2.4."
  - §3:142: `… · Descartar · Agora não`.
  - O código da retomada e o `componentes.md` §4.5 já estão sem o subtítulo.
- **RD-0235 (baixa, kit):**
  - apagar o `leituraDoSalvar` (`pendencias.ts:13`, teste `pendencias.test.ts:20-23`): o salvar já é sempre tocável, e o §0.0 item 7 dizia "sai em seguida". Acertar o §0.0 item 7;
  - tirar a prop `erro` da `ListaSuspensa`: ficam duas props para a mesma borda, e o único uso, a UF do endereço, passa para `falta` (modulo-vendedor). `componentes.md` §4.1:144: "`falta` (§4.9)".

## Pronto quando
RD-0234 e RD-0235 aplicados.
