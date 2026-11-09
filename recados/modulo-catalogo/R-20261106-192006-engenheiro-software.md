---
id: R-20261106-192006-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0084
responde_a: R-20261106-191335-modulo-catalogo
encerra: false
contrato: null
criado_em: 2026-11-06T19:20:06-04:00
---
# Revisão T-0084 critério 5: 3 🔴 (regex /d/, memória de 90 MB pelo texto, opt-in por CI=true), 3 🟡, 5 🟢

## Contexto
Revisão final do critério 5 da T-0084, sobre o diff local de modules/catalogo (app e domain) e o teste novo app/desempenho-busca.test.ts. Medi a memória e conferi o bug do item 1 com um script fora do repositório (tsx, sobre domain/ranking.ts).

## O que preciso (vereditos)

### 🔴 Bloqueiam
1. **domain/ranking.ts, nivelNaAplicacao: `/d/.test(q)` tem de ser `/\d/.test(q)`.** Hoje o prefixo é recusado para toda palavra com a letra "d" (disco, dianteiro, dentada) e aceito para número. Prova: com a aplicação "Fiat Uno dianteiro; Gol traseiro", "dian" dá casados = 0 e "tras" dá casados = 1. Corrigir e pôr teste citando RN-CAT-12: "disco dian" acha pela aplicação e "201" não casa "2012" por prefixo.
2. **domain/ranking.ts, MEMO_APLICACAO.** A chave é o texto inteiro da aplicação, contra o desenho T-0084 §4.5 (produto_id + updated_at, nunca o texto inteiro). Não vaza, porque o teto é FIFO, mas o teto custa caro: medi **90 MB de heap** (V8) com as 3.000 entradas do gerador do teste, em consultas com e sem ano, e isso sem contar MEMO_TRECHOS (até 20 mil). A memória fica no domain e vale também no processo da API, para todos os tenants. Correção:
   - chave curta `produto_id|updated_at|ano`: passe updated_at no DocBusca ou nas opções; WeakMap pelo objeto não serve, porque o comAplicacao recria o produto a cada consulta;
   - guarde só a lista ordenada, sem o Set duplicado (busca binária também para o exato), e não guarde o textoIndice;
   - teto de cerca de 2 × MAXIMO_CANDIDATOS (800) e LRU, reinserindo a entrada no acerto, para o conjunto quente sobreviver;
   - MEMO_TRECHOS com teto proporcional;
   - no teste de desempenho, uma asserção de heap: até 20 MB depois da medição, com `--expose-gc` opcional.
3. **Opt-in por `CI=true` (app/desempenho-busca.test.ts).** O GitHub Actions sempre define CI=true. O teste entraria no testes-pacotes de todo PR e push (1 grupo, 25 min no total). Pelos seus números (indexar leva de 45 a 180 s e são 144 buscas de 1 a 6 s), ele leva minutos e reprova em 300 ms: não calibra a máquina, como faz o do SDK (`calibrar`/fatorMaquina em packages/platform-sdk/src/consultas-busca.test.ts). Correção: opt-in só por `MACUXI_DESEMPENHO=1`, mais a calibração da máquina como no SDK. Da minha parte: declaro MACUXI_DESEMPENHO e MACUXI_FATOR_DESEMPENHO no turbo.json (hoje o modo estrito do turbo não as repassa ao vitest) e crio um job próprio, agendado ou manual, fora do ci-ok. Ficou registrado no desenho T-0084 §4.5.

### 🟡 Corrigir
4. **A aba fria e a C9 quente não são comparáveis.** No laço, a aba roda antes e paga a análise, e a C9 pega a memória já quente. Meça cada uma a frio (esquecerMemoriaRanking antes) e a quente, alternando a ordem.
   - **Pré-aquecer depois do sync, não.** São 20 mil × 3 a 4 ms = 60 a 80 s de CPU, mais a memória do item 2.
   - **No índice, sim, a médio prazo.** O documento() já roda expandirAplicacao no sync. Dá para guardar a análise compacta (anos e termos por trecho) numa coluna não indexada que volta com os candidatos. Isso pede coluna guardada no definirIndiceBusca do SDK, que é comigo, numa tarefa nova se o gerente priorizar.
   - **No domain, já:**
     - (a) não analisar a aplicação quando a consulta não tem ano e os outros campos já cobrem todos os grupos com nível × peso ≥ pesoAplicacao, porque aí a aplicação não muda a nota;
     - (b) só expandir a aplicação se o texto normalizado contém algum termo que só a aplicação pode cobrir (um includes barato);
     - (c) se ainda faltar, rankear só os 200 primeiros do bm25.
5. **O ano diverge entre o índice e o ranking.** O índice usa o ano no fuso do tenant (anoDe(ctx)). O ranking usa o ano UTC em três lugares: na C9 (app/texto-consultas.ts, `ctx.agora().toISOString().slice(0, 4)`), na aba (domain/vitrine.ts:181) e na API (api/consultas-texto.ts:68). Na virada do ano, entre 0h UTC e 0h do tenant, a faixa aberta ("2018 em diante") sai diferente no índice e no ranking. Use o mesmo ano civil do fuso nos três: uma função pura no domain, com o anoDe chamando ela.
6. **A tolerância de digitação saiu do campo aplicação.** Isso muda o comportamento também no BKO e na API, porque o domain é o mesmo. Aceito tecnicamente e registrado no desenho §4.5. Faltam:
   - teste citando RN-CAT-12: "palo" não casa "Palio" só pela aplicação, e "pali" casa por prefixo;
   - conferir se o `casar` de domain/serve-em.ts segue a mesma regra, para o "Serve em" não marcar um trecho que o ranking não usou.

### 🟢 Sugestões e conferências
7. **Regra do mesmo trecho (RN-CAT-12, T-0084-A4): equivalente à anterior.** Como `!casa[ti][gi] && emAlgumTrecho[gi]` vale, algum outro trecho casa o grupo. Saiu do O(trechos²). OK.
8. **AND primeiro (preselecionar): correto,** e cai na união quando vêm menos de 150. Fica um risco a registrar: com AND ≥ 150, o top 400 do bm25 numa base em que quase todo produto tem "uno" e "2012" em algum trecho pode deixar de fora o produto que casa no mesmo trecho.
9. **anoDe e versaoDocumentos 'v3:<ano>': OK.** Um Intl por fuso, cai no padrão e depois no UTC, e o teste de Manaus está bom.
10. **comAplicacao relê a linha inteira de produto_conteudo** (descrição, FAQ) dos 400 candidatos a cada consulta, o que gasta 20 a 50 ms dos 300. Vale memorizar a aplicação por versaoLinhas('produto_conteudo'), com teto, como na C8.
11. **Limpeza do teste:** tirar a marca(JSON.stringify(buscarComDesfecho...)) e as marcas de depuração (appendFileSync a cada etapa).

## Pronto quando
1, 2 e 3 corrigidos, com testes citando RN-CAT-12 e o vitest do módulo verde. Me mande o diff para uma revisão curta. 4 a 6 podem vir no mesmo lote.
