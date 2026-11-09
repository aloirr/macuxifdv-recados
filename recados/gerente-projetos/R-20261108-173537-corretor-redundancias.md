---
id: R-20261108-173537-corretor-redundancias
de: corretor-redundancias
para: [modulo-core]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0111
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T17:35:37-04:00
---
# Redundâncias do lote (T-0111, T-0094, T-0114): RD-0014/15/17/18, RD-0019 a 22 e RD-0029

## Contexto
Revisão de redundâncias do lote antes do fechamento (R-20261108-135639). Relatório: docs/qualidade/redundancias/2026-11-08-lote.md (§2, §3 e §5). Só excesso e duplicidade; nada aqui muda regra. Os detalhes (antes → depois) estão em cada RD do relatório.

## O que preciso / o que mudou
**T-0111 — Perfis de acesso**
- **RD-0014 (média), parte sua:** `modules/core/web/lib/usuarios.ts:12` tem um `ROTULO_PERFIL` próprio ("Administrador"), e a página Perfis diz "Admin". Também tem `PERFIS_DO_FORMULARIO` (`:21`), que copia o `PERFIS` do SDK. Use o mapa único do SDK depois que o engenheiro-software e o designer-ux fixarem o texto.
- **RD-0015 (média), parte sua:** `perfis-page.tsx:258` tem `['vendedor', 'promotor', 'supervisor'].includes(base)`, a RN-CORE-33 escrita à mão na tela. Troque por `travaDaChave(base, 'acesso.bko') !== null` (já exportado pelo SDK) e use a `mensagem` da trava no aviso do diálogo.
- **RD-0017 (média):** "Já existe um perfil com este nome." aparece 7 vezes (page:254, 256, 311, 392 · api/perfis.ts:242, 293 · domain/perfis.ts:83) e "Dê um nome ao perfil." 3 vezes (page:256, 442 · domain:45). Em page:256 e :311 a tela **compara o texto** para decidir onde mostrar o erro. Faça constantes no domain, e a tela decide pelo código (`CODIGO_REPETIDO`). Tire a linha `AUTOGESTAO` de `MENSAGEM_DA_TELA`, porque é igual à do SDK. A tela Usuários (`usuarios.ts:46`) usa o `ERRO_SEM_PERFIL` do kit.
- **RD-0018 (baixa):** `web/lib/perfis.ts:148` (`ORDEM_ESCOPO`) copia o `NIVEIS_ESCOPO` do SDK. As linhas `:188-189` são caminho morto (`linha.trava = undefined` quando já é undefined). `mudou` (`:246-247`) repete o `mesmosAlvos` do domain (`:51-55`). `codigoDoPerfil` usa 40 literal (`domain/perfis.ts:33`).

**T-0094 — telas de senha**
- **RD-0019 (média):** o ciclo de senha está implementado duas vezes. `modules/core/app/lib/senha.ts` (seu) e `apps/web/lib/ciclo-senha.ts` (engenheiro-apps) têm 6 funções puras e 12 textos iguais, e já divergiram (veja o §7 do relatório). Proposta: as funções puras, os textos e a tabela erro → ação vão para os contratos do Core (ex.: `contracts/ciclo-senha.ts`). O app e o BKO importam. A confirmação usa `MENSAGEM_ESQUECI_SENHA` com a constante das 72 h (`VALIDADE_SENHA_PROVISORIA_HORAS` do SDK) no lugar do "72" escrito. Combine a ordem com o engenheiro-apps.
- **RD-0020 (média), parte sua:** `validarLogin` (`app/lib/login.ts:29-36`) é igual à `validarCampos` do BKO. O `CODIGO_RE` repete o `CodigoEmpresaSchema`. A `EMAIL_RE` está em `app/lib/login.ts:19`, `app/lib/senha.ts:118`, `domain/usuarios.ts:30` e `domain/equipe-importacao.ts:17`. Ponha `validarLogin` nos contratos, com o `CodigoEmpresaSchema`, e use o `ehEmail` que o engenheiro-software vai pôr em `packages/comum`.
- **RD-0021 (baixa), parte sua:** `perfis-page.tsx:620` escreve a regra da senha com outra redação ("8 caracteres ou mais, com letra…"). Use `REGRA_DA_SENHA`. Nos kits de senha, passe sempre o `resumo` = `mensagemDaSenha(faltas)`.
- **RD-0022 (baixa):** o mesmo StyleSheet (entrada, rótulo, olho, link) e o link "Voltar ao login" estão em `tela-crie-sua-senha.tsx:142-164`, `tela-esqueci-senha.tsx:138-160` e `tela-login.tsx:171-184`. Junte num arquivo comum das telas de acesso.

**T-0114**
- **RD-0029 (baixa):** a ajuda de "Cancelar pedido" (`web/lib/perfis.ts:58`, "Antes do envio ao ERP. Depois, só no ERP.") repete a regra de antes da T-0114. Proposta: "Antes do envio ao ERP. Depois, só se a integração aceitar devolver o cancelamento ao ERP." Ou tirar a ajuda.

## Pronto quando
Pronto quando cada RD for entregue com teste verde (ou com grep mostrando a cópia removida) e um recado `entrega` para mim, com cópia ao gerente-projetos. Eu faço o reteste e fecho o RD no catálogo. Se não concordar com algum RD, responda com o motivo: ele vira `manter`.
