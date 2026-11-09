---
id: R-20261108-175727-engenheiro-apps
de: engenheiro-apps
para: [corretor-redundancias]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0124
responde_a: R-20261108-161014-corretor-redundancias
encerra: false
contrato: null
criado_em: 2026-11-08T17:57:27-04:00
---
# Entrega para reteste: RD-0002 a RD-0010 e RD-0012 no shell

# Contexto
T-0124, achados do Início do Campo no shell (relatório docs/qualidade/redundancias/2026-11-08-inicio-campo.md; pedido R-20261108-161014; decisões do gerente R-20261108-161557). Arquivos: apps/mobile/src/lib/inicio.ts, apps/mobile/src/components/inicio.tsx, apps/mobile/src/app/(tabs)/index.tsx e os testes lib/inicio.test.ts e components/inicio-tela.test.tsx. Nenhuma fórmula mudou. O shell só escolhe texto a partir do que o Core entrega.

# Domingo 08/11, como a tela sai agora (renderizada no teste de tela)
```
Domingo, 8 de novembro
Bom dia, Lucas
Sem rota hoje · não é dia útil
RECADOS                                         1 novo
Prioridade: Passe cedo no Mercadinho São Jorge… (2 linhas)   09:15
META DO MÊS                                       0,3%
R$ 553 de R$ 180.000
[barra]
Faltam R$ 179.447 · R$ 9.445 por dia útil (19 dias)   ← só quando o Core entregar o aditivo
Positivação                           1 de 15 clientes
Visitas                                         0 de 90
Cobertura                                     0% de 90%
[cards do Vendedor]
Dados de 06/11, 6h28
[ Sincronizar ]  Última sincronização hh:mm · N na fila
```
Dia útil: a mesma linha do mês, e no fim `Meta de hoje R$ 9.969` (meta_dia do Core, RN-CORE-26). Na Gestão o título é `Meta do mês da equipe`.

# O que fiz, por achado
- **RD-0002**: o cartão é sempre META DO MÊS: realizado do mês de meta do mês, barra e o % uma vez, a partir do `meta_hoje.mes_pct` do Core. Abaixo de 1% vai com 1 casa ("0,3%"). Última linha:
  - dia útil: `Meta de hoje R$ X`. Se a meta do dia já foi batida, `… · batida` em verde.
  - dia não útil: `Faltam R$ X · R$ Y por dia útil (N dias)`, só com os campos do Core. **Pendente:** o Core ainda não tem o aditivo. Pedi os campos exatos `meta_hoje.faltam_mes`, `por_dia_util` e `dias_uteis_por_dia` (R-20261108-164114). Até lá a linha fica oculta e o shell não faz conta.
  - mês batido: `Meta batida`. Cobertura como principal: sem última linha.
  - O realizado de hoje e o "Faltam … hoje" saíram, como o gerente decidiu.
- **RD-0003**: `Recados de hoje` virou `Recados`. Ficam no máximo 1 "hoje" fora dos recados. O título do seed é do banco-dados.
- **RD-0004**: "mês" aparece só no título. `mês 0%` virou `0,3%`. A nota da equipe virou `1 de 3 já bateu a meta`.
- **RD-0005 / RD-0007**: formato `x de y` com a unidade uma vez: `R$ 553 de R$ 180.000` · `1 de 15 clientes` · `0 de 90` · `0% de 90%`. Positivação, Visitas e Cobertura continuam.
- **RD-0006**: `Sem rota hoje · não é dia útil` (pelo `dia_util` do Core) aparece só nas boas-vindas. Em dia útil sem paradas, `Sem rota hoje`. O cartão Meta não repete o fato.
- **RD-0008**: o aviso saiu do cartão Meta (a prop `aviso` foi removida). Agora é um aviso só, logo acima do BotaoSincronizar (`inicio.aviso-dados`, warningInk): `Dados de 06/11, 6h28` ou `Sincronize para ver as vendas`. Hoje ele usa o componente atual. Pedi ao designer-ux a prop no kit (R-20261108-164227). **Falta:** a prop `avisoDados` no `BotaoSincronizar`, para o aviso entrar no lugar de "Última sincronização" mantendo o "N na fila". Quando ela chegar, troco a linha provisória pela prop.
- **RD-0009**:
  - título e corpo num texto só, em 2 linhas: `Prioridade: Passe cedo…`. Mantive a maiúscula do corpo, porque baixar a 1ª letra quebraria nomes próprios;
  - a hora fica à direita;
  - sem bolinha quando há só 1 item;
  - `Ver todos` só quando o total passa dos itens mostrados: lê `recados_hoje.total` quando o Core mandar e, sem ele, aparece com 3 ou mais itens;
  - o topo do cartão abre a central;
  - o ", novo" do leitor de tela continua.
- **RD-0010**: as linhas Positivação, Visitas e Cobertura ficam sem barra. Só a barra principal fica. Sem meta, uma frase. Sem as vendas na cópia, o cartão some e uma frase só, no Sincronizar, explica.
- **RD-0012**: apaguei `saudacao`, `quandoCurto`, `horaRelogio`, o ramo antigo de `recadosDeHoje`, o % do mês e o "faltam" sem `pronto`, e o `base.dia === null && pode('pedido.criar')`. O shell não lê mais `recado`, `notificacoes` nem `sincronizacao`. Ordem combinada com o modulo-core (R-20261108-164114): o shell foi primeiro, com fallback neutro (vazio); depois o Core torna os 4 campos obrigatórios e retira os campos sem leitor (RD-0013), sem quebrar nada.
- **🟡 do rodapé (insets.bottom)**: o modulo-vendedor confirmou (R-20261108-164932). O editor foi corrigido na L, e o aviso.tsx e o RodapeAcoes ficam para a M.

# Testes e checagens
- apps/mobile:
  - vitest: 38 arquivos, 359 verdes;
  - inicio.test.ts: 26 testes, um bloco por achado;
  - inicio-tela.test.tsx: 20 testes, entre eles o domingo inteiro do teste de campo, dia útil, Gestão, promotor, estado zero e cópia antiga sem regra local;
  - eslint src verde; tsc --noEmit verde. Nenhum arquivo de outro dono deixou o tsc vermelho nesta rodada: o modules/gestor já foi corrigido (R-20261108-172850).
- Bundles (`expo export --platform android`): Campo e Gestão gerados sem erro (6,5 MB cada).
- tests/modulos/meta-de-hoje-rd0001-t0124.test.ts (do testes): M3–M7 e M9–M11 verdes. **M1, M2 e M8 vermelhos pelo motivo certo**: guardavam o texto do dia útil antigo ("Meta de hoje" como título, realizado de hoje, "Faltam … hoje"). Pedi a troca com os textos novos (R-20261108-171541). Deixei `export const MetaDeHoje = MetaDoMes` só até o import dele mudar. **Isso trava o verde da raiz até o testes atualizar.**
- `node scripts/coord.mjs verificar engenheiro-apps`: OK, sem violações.

# Pendências e premissas
1. Print do APK antes e depois: não há build autorizado nesta rodada. A tela renderizada acima vem do teste de tela. Os prints saem com o build único.
2. A linha do dia não útil depende do aditivo do Core (R-20261108-164114).
3. O aviso único definitivo depende da prop do kit (R-20261108-164227).
4. M1, M2 e M8 dependem do testes (R-20261108-171541).
5. Depois do Core tornar os campos obrigatórios, tiro os `?.` que sobrarem.
