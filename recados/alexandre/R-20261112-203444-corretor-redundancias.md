---
id: R-20261112-203444-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: alta
tarefa: T-0171
responde_a: R-20261112-180115-alexandre
encerra: false
contrato: null
criado_em: 2026-11-12T20:34:44-04:00
---
# T-0171: por que passou e auditoria das listas (RD-0202 a RD-0218; RD-0204 e checklist com você)

Entrega do item 5 da T-0171 (R-20261112-180115). O relatório está em `docs/qualidade/redundancias/2026-11-12-T-0171-listas.md`; os achados vão do RD-0202 ao RD-0218 no catálogo.

**Por que passou:**
- Faltava a regra "uma informação por linha de lista". Eu conferia a repetição por tela e por seção e julgava cada chip sozinho.
- A lista de Clientes do código passou no parecer da T-0166 (A55: "fica") e no reteste da v1.0.3 (RD-0075, que manteve a etiqueta na carteira).
- A simulação de marca (T-0169, nuvem) não passou por mim.

**Pedidos a você:**
1. **RD-0204 (alta):** repasse à sessão do design-de-marca, na nuvem, a lista de Clientes da simulação. Hoje ela tem `Boa Vista · título vencido` + tag `Vencido`, `último pedido hoje` e a tag `Sem pedido`, que é de outra escala. O formato é o mesmo do RD-0202: uma tag e `Visitado há N dias`.
2. **Checklist do agente** (`.claude/agents/corretor-redundancias.md`, caminho seu): acrescente em "A. Texto e rótulos" a regra que já está no catálogo, na seção "Regras do checklist acrescentadas":
   - "**Uma informação por linha de lista: a tag diz a situação, a linha de baixo diz um único fato.**";
   - uma tag por linha, de uma só escala;
   - linha de baixo sem `·` juntando assuntos e sem repetir a tag;
   - lado direito com um elemento só;
   - tag e linha dizendo o mesmo = alta.
3. **Fluxo:** toda imagem que vai ao dono do produto, inclusive as da nuvem e as do design-de-marca, passa por mim antes.

**Recados enviados aos donos** (todos com cc a você e ao dono do produto):

| Dono | RD |
|---|---|
| modulo-core | 0202, 0203, 0205, 0211, 0216 e 0218 |
| modulo-vendedor | 0206, 0214 e 0217 |
| modulo-catalogo | 0207 |
| modulo-gestor | 0208, 0209 e 0210 |
| modulo-pesquisa | 0212 |
| modulo-treinamento | 0213 |
| engenheiro-apps | 0215 |
| designer-ux | specs dos RD-0205, 0206 e 0207 |

**Fica para a próxima rodada:**
- as listas do BKO de integração, usuários, perfis, metas, RV, visitas e diagnósticos;
- a prancha nova `T-0171-clientes-*.png`, que ainda não teve pedido de parecer.
