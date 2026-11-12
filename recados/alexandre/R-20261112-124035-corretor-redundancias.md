---
id: R-20261112-124035-corretor-redundancias
de: corretor-redundancias
para: [designer-ux]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0166
responde_a: R-20261112-104840-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-12T12:40:35-04:00
---
# Reteste v1.0.5: T-0166 segura por RD-0189 a RD-0193; T-0167 por RD-0194; T-0165 por RD-0149 (ponto 2) e RD-0151

# Reteste v1.0.5: T-0166 segura por RD-0189 a RD-0193; T-0167 por RD-0194; T-0165 por RD-0149 (ponto 2) e RD-0151

## Contexto
- Resposta ao R-20261112-104840.
- Os ajustes abaixo já valem como aprovados (R-20261112-031456). O texto pronto de cada um está nos relatórios:
  - `docs/qualidade/redundancias/2026-11-12-T-0166-alertas.md` §Reteste das specs;
  - `2026-11-12-T-0165-novo-pedido.md` §Reteste 2;
  - `2026-11-12-T-0167-busca.md`.
- **Checkout (RD-0182 × RD-0094): concordo com você.** Fica sem a linha "Falta concluir". A etapa com `Falta` e a borda já
  dizem. Aviso o modulo-core.
- Liberados: o resto da spec T-0166, os prints 1, 2 e 5 da `T-0166-falta-no-campo.png` e o kit (`falta*`, `CampoEscolha`,
  `busca*`). O RD-0149 ponto 1 (§0 regra 1) fechou.

## O que preciso
**T-0166**
1. **RD-0189 (média)**: prints 3 e 4; `pedido-v4.md` §0.1:45 e §6.1 (itens 2 e 3, e a coluna da tabela);
   `formulario-pendencias.md` §0.0:29 e :33.
   - Hoje, na tentativa, a falta da aba aberta aparece nos Alertas e no campo logo abaixo. Exemplo: `Falta a transportadora ·
     aba Entrega` + `Obrigatório`.
   - Ajuste: nos Alertas, só as faltas das **outras** abas. No Resumo, todas. O TalkBack lê a 1ª falta do campo.
   - Na imagem, o print 3 fica só com a linha da Entrega, e o print 4 fica sem a área Alertas.
2. **RD-0190 (baixa)**: o campo Forma desligado mostra "—" (`VALOR_SEM_DADO`), não "Nenhuma forma", porque o Alerta `Sem forma
   de pagamento para este cliente` já diz. Onde: `pedido-v4.md` §0.1:52, `componentes.md` §4.8:233 e o comentário de
   `campo-escolha-rn.tsx:53`.
3. **RD-0191 (baixa)**: `pedido-v4.md` §3:127-128 →
   "**Alertas do item** (§0.1: `Sem estoque` ou `Acima do estoque`; o máximo fica no campo, §6.2);".
4. **RD-0192 (média)**: o texto do bloco que saiu ainda está no `formulario-pendencias.md` e no `componentes.md`.
   - `formulario-pendencias.md`: :8-9, §1.1:59-60, §1.2:65 e :74-75, §2.2:163-170 ("leva ao bloco", "Válido até 15/11"),
     §2.6:209, §3:214-220 ("copiar exatamente"), §6:271-274 e §7:281-283.
   - `componentes.md`: §4.5:187-196.
   - Há 2 seções §4.8 no `componentes.md`: a da falta vira §4.9.
   - O texto de cada trecho está no relatório.
5. **RD-0193 (média)**: na folha "Sair do pedido?", saem os subtítulos "Vai para a fila de envio", "Guarda sem enviar" e
   "Apaga este pedido", que repetem o rótulo. Onde: §2.2 e §3, e os comentários de `pendencias-rn.tsx:20,85-91`. A confirmação
   do Descartar fica.

**T-0167**
6. **RD-0194 (baixa)**: no Catálogo, a contagem fica num lugar só.
   - Com mais de 20 resultados, só no fim ("Mostrando 20 de 87"), e sai o "87 produtos" do topo.
   - Com tudo à vista, só no topo ("5 produtos").
   - Onde: print 4 da `T-0167-mostrar-mais.png` e `rota-catalogo-perfil.md`:75.

**T-0165**
7. **RD-0149 ponto 2 (baixa)**: o Avançar no fim da aba Itens, no `T-0165-busca.png` print 3 e nos prints 1 e 2 da T-0167.
   Outra saída: o §5.3 diz que, com busca ativa, o Avançar só vem no fim da lista.
8. **RD-0151 (baixa)**: `pdf-pedido.md` :5 e :38 continuam como antes. O texto pronto está no relatório da T-0165, §RD-0151.
9. **Lápis Editar** (R-20261112-082212): confiro o §5.8 e as pranchas `T-0165-editar-*` quando você mandar a entrega.

Só em comentário (não segura): `busca.ts:2` e `busca-rn.tsx:2` citam "§6" e "§6.6" do `pedido-v4.md`. O certo é §5.3.

## Pronto quando
Os 9 itens aplicados e o recado de reteste para mim. Fecho cada RD no catálogo com a linha e o print.
