---
id: R-20261112-130019-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: alta
tarefa: T-0166
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T13:00:19-04:00
---
# Reteste v1.0.5: as 3 tarefas seguram, só por ajustes pré-aprovados (RD-0189 a RD-0194, RD-0149 ponto 2, RD-0151)

# Reteste v1.0.5: as 3 tarefas seguram, só por ajustes pré-aprovados (RD-0189 a RD-0194, RD-0149 ponto 2, RD-0151)

## Contexto
- Pedido do gerente: reteste da v1.0.5.
- Lidos antes: R-20261112-104840 (designer-ux, com os prints) e R-20261112-110156 (RD-0150).

## Parecer
**T-0165: segura** por RD-0149 ponto 2 (baixa, imagem) e RD-0151 (baixa, doc), os dois do designer-ux.
- **RD-0150 corrigido**: doc 03:175-179 ("Alçada nos Alertas") e saiu "Alçada não é alerta".
- **RD-0149 ponto 1 corrigido**: §0 regra 1.
- **Sobra o ponto 2**: o `T-0165-busca.png` print 3 ainda está sem o Avançar.
- **RD-0151**: o `pdf-pedido.md` :5 e :38 não mudou.
- **Lápis Editar**: as pranchas `T-0165-editar-*` e o `botao-editar.ts` já existem, mas o §5.8 da spec ainda não. Confiro quando
  o designer entregar.

**T-0166: segura** por 5 achados novos (3 médios, 2 baixos). O resto da spec, os prints 1, 2 e 5 e o kit estão liberados.
- **RD-0189 (média)**: na tentativa, a falta da aba aberta aparece nos Alertas e no campo logo abaixo (prints 3 e 4). Ajuste:
  nos Alertas, só as faltas das outras abas. Donos: designer-ux e modulo-vendedor.
- **RD-0190 (baixa)**: "Nenhuma forma" no campo repete o Alerta. Ajuste: "—". Donos: designer-ux e modulo-vendedor.
- **RD-0191 (baixa)**: o `pedido-v4.md` §3:128 ainda põe o máximo nos Alertas do item. Dono: designer-ux.
- **RD-0192 (média)**: o bloco "Falta para salvar" e a bolinha ainda estão no `formulario-pendencias.md` (§1.1, §2.2, §3
  "copiar exatamente", §6, §7) e no `componentes.md` §4.5. Há 2 seções §4.8. Dono: designer-ux.
- **RD-0193 (média)**: na folha "Sair do pedido?", os subtítulos repetem o rótulo ("Vai para a fila de envio", "Guarda sem
  enviar", "Apaga este pedido"). Donos: designer-ux e modulo-vendedor.
- **Checkout**: concordo com o designer, e fica sem a linha "Falta concluir" (RD-0094). O meu RD-0182 estava errado nesse ponto.
  A spec está corrigida, e avisei o modulo-core.

**T-0167: segura** por RD-0194 (baixa). No Catálogo, "87 produtos" no topo e "Mostrando 20 de 87" no fim. Ajuste: a contagem
num lugar só. Donos: designer-ux e modulo-catalogo. A aba Itens e o kit (`MostrarMais`, `NadaEncontrado`) estão liberados.

## Recados enviados (cc gerente e alexandre)
- designer-ux: R-20261112-124035;
- modulo-vendedor: R-20261112-124110;
- modulo-catalogo: R-20261112-125050;
- modulo-core: R-20261112-125132 (correção do RD-0182).

## Relatórios
- `docs/qualidade/redundancias/2026-11-12-T-0165-novo-pedido.md` §Reteste 2;
- `docs/qualidade/redundancias/2026-11-12-T-0166-alertas.md` §Reteste das specs;
- `docs/qualidade/redundancias/2026-11-12-T-0167-busca.md`;
- `catalogo.md` com RD-0189 a RD-0194.

## Pronto quando
Os donos aplicarem os ajustes. Reteste no doc, na imagem e no print do aparelho.
