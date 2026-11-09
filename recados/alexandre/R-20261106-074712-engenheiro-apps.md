---
id: R-20261106-074712-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos, alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T07:47:12-04:00
---
# APKs preview Campo e Gestão do 1ed7d51 prontos (FINISHED), com roteiro do que é novo; o '+' do Novo pedido vai no próximo

## Contexto
Builds de preview do Campo e do Gestão a partir do main 1ed7d513ea79c955649a33952f353655e86879f8 (T-0084, T-0085, T-0087 até o lote das 6h). Foram disparados pela minha sessão anterior, que caiu às ~7h antes de mandar os links; conferi agora com `eas build:list`: os dois terminaram (FINISHED) e a Expo registrou o gitCommitHash 1ed7d51 nos dois. O registro do bundle local da sessão anterior se perdeu com a queda; o bundle do EAS passou nas duas variantes. Nenhum build novo foi disparado agora.

## O que preciso / o que mudou
Builds terminados (FINISHED; Campo em 22 min, Gestão em 22 min):
- Campo (campo-preview, br.com.macuxi.campo): APK https://expo.dev/artifacts/eas/QoR-fs-ww5DrYAVN9Vg14VgnfwUDaG7djJbeyGjy9Qg.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/66fb93af-4535-4d59-9900-80fe5a381737
- Gestão (gestao-preview, br.com.macuxi.gestao): APK https://expo.dev/artifacts/eas/qieST3Mw8uXUyOu2IIszCaa-yGuxrS0LUh2h0Fzzj2s.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/376e4b56-1b87-4f63-9e85-0e5727369c04

Roteiro só do que é NOVO em relação ao APK do 0263f9f (Campo, com o vendedor, salvo onde diz outra coisa):
A. **Aplicação ("Serve em") no seletor do Novo pedido (T-0084):** buscar "pastilha uno 2012" no Novo pedido, com e sem sinal. Os produtos aparecem com a linha "Serve em …" do trecho que casou. Na demo, os casos do Uno e do Gol do critério 3.
B. **Busca do seletor offline:** em modo avião, a mesma busca responde, sem a mensagem "Busca indisponível".
C. **Aplicação no item do pedido:** a caixa "Incluir aplicação no orçamento" no item e o texto no PDF.
D. **Referência cruzada (T-0085):** na ficha do produto, "Equivale a <marca> <código>"; buscar o código da referência (ex.: "CB 3401") traz o produto.
E. **Gestão: pedido em nome do vendedor:** o supervisor abre um Novo pedido e escolhe o vendedor dono; o PDF mostra o dono e "feito por"; o voltar da ficha diz "Ficha".

**O que este APK ainda NÃO traz (não precisa testar):**
- a correção do "+" do Novo pedido (R-20261106-064754): está com o modulo-vendedor e vai no próximo APK de preview;
- o filtro de período num botão só (R-20261106-064752);
- a prova do critério 5 da T-0084 (20 mil produtos com aplicação longa): a tela de medição deste APK ainda não gera aplicação nem referências, e o motor do app ainda grava no AsyncStorage (T-0088). A tela de medição estendida vai no próximo APK.

## Pronto quando
O Alexandre instalar os dois APKs (o JS mudou e vem no APK) e devolver os itens A a E. Se um item falhar, A, B e D são do Catálogo e do Vendedor (busca e seletor), C é do Vendedor e E é do Vendedor e do Gestor. Nada foi alterado no repositório, sem commit e sem segredo em log.
