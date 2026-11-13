---
id: R-20261112-232919-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0166
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T23:29:19-04:00
---
# Reteste v1.0.5: T-0165 e T-0167 liberados; T-0166 segura por RD-0234/0235; T-0168 por RD-0198 (seu, doc 03); T-0170 por RD-0199 (core)

## Contexto
Reteste da v1.0.5, depois das correções do designer-ux (R-20261112-194743, -194847, -195206, -195309, -195532 e -201057) e do modulo-vendedor (R-20261112-181910). Relatórios em `docs/qualidade/redundancias/2026-11-12-T-01{65,66,67,68,70}-*.md`, na seção de reteste de cada um. O catálogo está atualizado.

## Parecer por tarefa
- **T-0165: liberado.** O RD-0195 está fechado: o §5.8 e as 3 pranchas têm a observação vazia e o Avançar. O Remover item com Desfazer de 5 s passa.
- **T-0166: segura por RD-0234 (média) e RD-0235 (baixa).** Os RD-0189 a RD-0193 estão fechados na spec, na prancha, no kit e no código, e a `ListaSuspensa` com `falta` passa.
  - **RD-0234:** a folha de saída da edição ainda tem o subtítulo `Volta como estava` (`sair-do-pedido.ts:52`), que a confirmação repete. Na spec, a edição tem "Descarta as alterações" (`formulario-pendencias.md` §2.2:105), e a retomada ainda tem "Apaga este pedido" (§2.5:127, §3:142). Donos: modulo-vendedor e designer-ux.
  - **RD-0235:** sobras no código:
    - `leituraDoSalvar` e o `pendencias` dos botões, que ficam sempre com 0;
    - a prop `erro` duplicando a `falta` na `ListaSuspensa`;
    - o "—" redefinido em `pagamento-pedido.ts:27`;
    - o `subtituloOrcamento` sempre nulo.
  - O RD-0236 é só comentário e não segura. Os RD-0170 a RD-0188 fecham no print do aparelho.
- **T-0167: liberado.** O RD-0194 está fechado na spec e na prancha.
- **T-0168: segura por RD-0198 (baixa, doc 03, seu).** Os RD-0196 e RD-0197 estão fechados nas 8 imagens e na spec.
  - No doc 03, a frase (:211) e o pé (:201) já estão certos.
  - Faltam a :202, "Duas funções no cadastro do usuário (BKO)", e a :204, "aba Parâmetros do perfil". Texto: "Na aba **Parâmetros** do usuário (BKO): as funções…".
- **T-0170: segura por RD-0199 (média, modulo-core).** O corpo do aviso de pedido ainda repete o título (`notificacao-pedido.ts:18-22,29`, sem mudança desde 08/11). Os RD-0200 e RD-0201 estão fechados.
  - O desenho final aprovado (R-20261112-204134) é outra entrega e ainda não teve parecer.

## Recados
- R-20261112-231014 (modulo-vendedor);
- R-20261112-231621 (designer-ux);
- R-20261112-231709 (modulo-core);
- R-20261112-231745 (testes: 3 pontos funcionais da T-0166, sem RD).

## Pronto quando
RD-0234, RD-0235, RD-0198 e RD-0199 aplicados. Faço o reteste assim que chegar a entrega.
