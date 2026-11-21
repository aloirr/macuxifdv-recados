# Modelo de referência: a mecânica da busca do Catálogo BAP online

Avalie a busca do catálogo do app Android e proponha melhorias, usando como modelo a busca do Catálogo BAP online (site estático). Ela resolve bem os casos de balcão: código BAP, referência de concorrente, EAN, descrição, veículo e ano, tudo num campo só, mais placa e listas de veículo.

Primeiro compare com o que o app faz hoje. Depois entregue:
1. o que vale trazer;
2. o que não serve para o app (offline, SQLite, Room, tamanho da tela);
3. a ordem de implantação, com o esforço;
4. os casos de teste do item 9, rodados no app atual e no proposto.

Não copie o código: adapte a regra.

---

## 1. Os dados que a busca usa (um registro por produto)
- `c`: código BAP, a chave.
- `d`: descrição.
- `p`: produto. Junto com `d`, forma o texto da descrição.
- `a`: aplicação em texto livre. Ex.: "HONDA - Civic 1.8 16V · 2007 até 2011 · Fit 1.4 · 2003>".
- `r`: referências cruzadas, uma lista de `{m: marca, c: código}`. Ex.: `{m: "TRW", c: "16900255S"}`.
- `ve`: veículos estruturados, uma lista de `[MONTADORA, MODELO, VERSÃO?]`. Ex.: `[["VOLKSWAGEN","Gol","G5"],["VOLKSWAGEN","Saveiro"]]`.
- `an`: ano inicial e final, quando a base tem.
- `mo`: montadora(s).
- Taxonomia: `ca` categoria, `si` sistema, `fa` família, `li` linha, `po` posição, `la` lado e `de` detalhe.
- `x`: ficha técnica, por exemplo o "Código de barras" (EAN).

## 2. Índice montado uma vez, na carga
Para cada produto, guardar os campos já normalizados. `norm` = sem acento, maiúsculas e um espaço só. `normCod` = só A-Z e 0-9, sem espaço, ponto ou hífen.
- `desc` = norm(d + p).
- `apl` = norm(a).
- `marcas` = norm(marca + código de cada referência).
- `outros` = norm(categoria, família, sistema, linha, detalhe, montadora, posição e lado), mais os **apelidos de montadora**: CHEVROLET → "GM CHEVY", VOLKSWAGEN → "VW VOLKS", MERCEDES-BENZ → "MB MERCEDES BENZ". Com isso, "vw gol" acha o Gol da Volkswagen.
- `cods` = normCod do código BAP (sempre o 1º) mais os códigos extraídos das referências, com 3 ou mais caracteres.
- `mcods` = marca da referência grudada ao código. Ex.: "TRW16900255S".
- `eans` = os EAN da ficha.
- `faixas` = faixas de ano tiradas da aplicação (item 5).
- `tudo` = todos os textos juntos, e `codsTxt` = todos os códigos juntos. Os dois servem de pré-filtro rápido, com `includes`, antes da regex.

**Extração de código de uma referência.** Ela evita tratar palavra de aplicação como código:
- corta no "APLICAÇÃO", porque alguns fornecedores colam a aplicação depois do código;
- quebra em `/ ; , | = ( )` e " OU ";
- tira o rótulo antes de ":" ("Cofap: KJH04202" → KJH04202);
- o pedaço inteiro vira **um** código se tem número e cada palavra tem número ou é sigla de até 4 letras que não é nome de veículo. Ex.: "NJH07 5123" → NJH075123 e "6309 2RS C3" → 63092RSC3;
- senão, só as palavras com número e 5 ou mais caracteres ("Cofap GP33190" → GP33190; "16V" e "4X4" não são código).

**"É nome de veículo?"** É uma estatística da própria base, sem lista fixa: a palavra aparece em pelo menos 5 vezes mais aplicações do que descrições. POLO aparece em 154 aplicações e 7 descrições, então é veículo. ROLAMENTO aparece em 221 e 194, então não é. Isso impede que "HB20" ou "Corsa 1.0" virem pedaço de código.

## 3. A busca: uma função só para tudo
O campo único ("código, descrição ou aplicação"), os links antigos e os filtros passam todos pela mesma função `casador(texto)`.

1. **Palavras.**
   - Separar por espaço, vírgula e ponto e vírgula.
   - Hífen entre letras vira espaço ("SPACE-FOX" = "SPACE FOX"). Hífen com número fica ("15W-40", "F-1000").
   - Os conectivos são ignorados: DE, DA, DO, E, A, O, EM, NO, NA, PARA, PRA, P/… "amortecedor para gol" = "amortecedor gol". Se o texto tiver só conectivos, eles ficam.
2. **E entre palavras, OU entre campos.** Cada palavra precisa casar em algum campo; o produto entra se **todas** casarem. A ordem não importa ("gol 1.0" = "1.0 gol"), nem caixa nem acento.
3. **Palavras vizinhas juntas.**
   - Testar também grupos de palavras vizinhas: "SPACE FOX" casa SPACEFOX, "CXD 13062" casa CXD13062, "33 000" casa 33000 e "TRW 16900255S" casa a marca mais o código.
   - O grupo só vale como **código inteiro** ou como texto. Como pedaço de código, só se toda palavra for "grupo de código": tem número, não é decimal (1.0), não é veículo nem ano.
   - Acima de 6 palavras, só palavras soltas.
   - Letra solta (1 caractere) só vale junto ("L 200" casa L200).
4. **Palavra inteira.**
   - "GOL" não casa "GOLF": não pode continuar com o mesmo tipo de caractere, letra depois de letra ou número depois de número.
   - "1.6" casa "1.6L" e "HB20" casa "HB20X".
   - **Começo de palavra** ("HOMOC" → HOMOCINÉTICA, "ROLAMENTO" → ROLAMENTOS) só nos campos de texto, com 4 ou mais caracteres, nunca na aplicação e nunca em nome de veículo: POLO não vira POLOS, CORSA não vira CORSARIO.
5. **Modelo derivado.**
   - Na aplicação, a palavra também casa o modelo grudado, na frente ou atrás, em outro nome que existe sozinho na base: TRAIL+BLAZER, CROSS+FOX, SPACE+FOX, POLO+CLASSIC.
   - Os dois lados têm 3 ou mais caracteres, e o outro lado tem letra.
   - Isso evita GOL+F, KA+NGOO e C+ARGO.
   - Lista de exceção pequena: CAPA (CAPACITY não é derivado de CITY).
6. **Nota por campo** (por palavra, somada no caminho escolhido):

   | Onde casou | Nota |
   |---|---|
   | código BAP igual | 1000 |
   | EAN, referência ou marca+referência iguais | 800 |
   | começo do código BAP | 600 |
   | pedaço de código, referência ou EAN (com número; EAN com 6 ou mais) | 400 |
   | descrição | 50 |
   | aplicação, ou ano que cabe na faixa | 40 |
   | marca da referência, ou "BAP" | 30 |
   | categoria, família e outros | 20 |
   | ano numa aplicação que não diz o ano, quando outra palavra casou na aplicação ("o cliente confere") | 5 |

7. **Melhor caminho.**
   - Como as palavras podem casar sozinhas ou em grupo, uma programação dinâmica escolhe a cobertura com mais palavras casadas e, no empate, a maior nota.
   - Dois "pedaços de código" seguidos não valem, porque são um código digitado com espaço.
8. **Nunca lista vazia.** Se nenhum produto casa com todas as palavras, mostrar os que casam com mais palavras e avisar quais palavras não casaram em nenhum: "Não achamos 'xyz'; mostrando os mais próximos".
9. **Código exato sempre entra e vem em 1º**, mesmo casando menos palavras. Um ano solto ("2018") só conta como exato quando é a única palavra: em "gol 2018", uma referência "AXIOS 2018" não passa na frente.
10. **Ordem da lista:** código exato → nº de palavras casadas → nota → com foto → código.
11. **Desempenho.** O pré-filtro com `includes` na "agulha" (a parte mais longa da palavra) é feito uma vez por produto. A regex só roda onde a agulha aparece. Com ~4.400 produtos, roda no navegador sem servidor.

## 4. Filtros e veículo (filtram, não pontuam)
- **Filtros de sistema, família, linha e categoria:** aceitam várias opções, com OU dentro do filtro e E entre filtros. As contagens saem do resultado atual.
- **Veículo** (marca, modelo, ano, motor e versão), em cascata: cada lista mostra só o que existe para a escolha anterior, com a contagem de produtos.
  - Marca e modelo vêm do `ve` estruturado. Sem `ve`, saem da aplicação: a palavra logo depois da marca, com apelidos e uma lista de palavras ignoradas (SEDAN, HATCH, CABINE, TODOS, EXC, DIANT…).
  - **Ano:** primeiro o `an` da base, depois as faixas da aplicação. Produto que não diz o ano **serve**.
  - **Motor:** a cilindrada escrita na aplicação ("1.8"). Produto que não diz o motor serve para qualquer um.
  - **Versão:** o 3º item do `ve`. Produto sem versão serve para todas.
- Com veículo escolhido, os cartões ganham a etiqueta "✓ Compatível". O "Leve também" (itens oferecidos junto) mostra só o que serve no veículo, menos os itens UNIVERSAL, que servem em todos.

## 5. Ano escrito de qualquer jeito (faixas da aplicação)
Cada data vira uma faixa [de, até]. Formas lidas:
- **Faixa:** "2014 ATE 2017", "1989–1996", "2004 A 2011", "2015/2021", "1998>2009", "2018 2021".
- **Faixa com mês:** "06/2008–06/2012", "01/89 - 12/97", "05-10" e "(83-92)" (até 30 anos), "84/97", "(01-88/06-92)".
- **Em diante:** "2018>", "2005 EM DIANTE", "2025 →", "2000 +", "2012/...".
- **Até:** "../08".
- **Ano só:** "2007" e "08/2022".
- **"07/17" sozinho:** vale as duas leituras, mês/ano e ano/ano.

Ano de 2 dígitos: até 35 é 20xx; acima, 19xx. Ano de 4 dígitos só entre 1950 e o ano atual + 2. Assim 2500, 1938 e o "Axor 2035" não são anos, e 13/16" (polegada) também não.

## 6. Placa
- O app normaliza a placa (só A-Z e 0-9) e valida `^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$` (antiga e Mercosul).
- Ele manda a placa a um **serviço próprio**, que guarda a chave da API de placas. **A chave nunca fica no app.**
- O serviço devolve montadora, modelo, modelo_lista, ano, ano_modelo e motor.
- **Montadora da API → nome do catálogo**, por tabela: GM → CHEVROLET, VW → VOLKSWAGEN, M.BENZ → MERCEDES-BENZ, CITROEN → CITROËN…
- **Nome do modelo:**
  - tirar a montadora e o que vem antes de "/" ("VW/GOL 1.6 MSI" → "GOL 1.6 MSI");
  - parar na 1ª palavra de versão: cilindrada, nV, MSI, TSI, FLEX, AT, 4X4…;
  - a 2ª palavra só entra se for nome de veículo ("GRAND SIENA"; "GOL TRENDLINE" fica GOL).
- **modelo_lista:** cada nome é uma alternativa. Vale o 1º com que algum produto casa todas as palavras de "montadora + modelo + ano_modelo".
- **Motor:** 1598 cm³ → "1.6". **Versão:** o que sobra do modelo, sem nome base, cilindrada e combustível ("CIVIC LXS 1.8" → "LXS").
- A placa vira o veículo das listas.
- **Privacidade (LGPD):** a placa não vai para a URL, o armazenamento local nem o log. Ela fica só em memória durante a busca.
- **Espera:** se a consulta passa de 5 s, aparece "Acordando o serviço…". O limite de espera é de 75 s.
- **Erros com mensagem própria:** 400 placa inválida, 404 não achada, 429 limite e 503 serviço fora.

## 7. Exibição (não muda a busca)
- **Nome bonito:** sem caixa alta, mantendo as siglas (VW, GM, BMW, HB20, 16V, CR-V).
- **"Em diante" vira "2015+"**, e a faixa fica "2012–2016".
- **No celular,** a lista de veículos mostra só o que existe ("Ano 2017–"), sem "Cilindrada —".
- **Nunca mostrar preço, estoque nem fornecedor.**

## 8. Regras de manutenção que deixaram a busca robusta
- **Uma função só** de busca para todas as entradas: campo, links antigos e filtros.
- A noção de "é veículo" sai da própria base, não de lista escrita à mão.
- Os dados são normalizados uma vez, na carga.
- Uma bateria de testes automática roda a cada mudança, antes de publicar.

## 9. Casos de teste (rodar no app atual e no proposto)
- **Ordem não importa:**
  - "gol 2018 volkswagen", "vw gol 2018" e "2018 gol vw" dão a mesma lista;
  - "amortecedor gol 2007 kyb 441126", "441126 Kyb 2007 Gol Amortecedor" e "gol 2007 amortecedor 441126 kyb" também.
- **Código com espaço ou pontuação:** "CXD 13062", "cxd13062" e "CXD-13062" acham o mesmo item, e ele vem em 1º.
- **Referência com e sem marca:** "TRW 16900255S" e "16900255S" acham o mesmo item, em 1º.
- **EAN** (código de barras inteiro): acha o item.
- **Palavra inteira:** "gol" não traz Golf, e "polo" não traz "polos".
- **Começo de palavra em texto:** "homoc" acha homocinética.
- **Derivado:** "fox" acha CrossFox e SpaceFox, e "space fox" acha SpaceFox.
- **Ano:** "civic 2008" acha "Civic 2007 até 2011" e "Civic 2006>", e não acha "Civic 1992–1995".
- **Conectivo:** "amortecedor para gol" = "amortecedor gol".
- **Sem resultado completo:** "xyzqwk amortecedor" mostra amortecedores e avisa que "xyzqwk" não casou.
- **Placa:** com o exemplo ABC1D23 e a resposta do serviço simulada, sem placa real. Por exemplo `{montadora:"HONDA", modelo:"CIVIC LXS 1.8", modelo_lista:["CIVIC"], ano:"2008", ano_modelo:"2008", motor:"1.8"}`. Isso vira Honda / Civic / 2008 / 1.8 / LXS, e só aparecem peças compatíveis.
- **Celular (390 px):** o campo de busca e as listas cabem sem rolar de lado, e o teclado não dá zoom (fonte de 16 px nos campos).

Entregue o comparativo como tabela: item, como o app faz, como o site faz, ganho esperado e esforço. Termine com as decisões que o dono do produto precisa tomar.
