---
id: R-20261106-230430-engenheiro-apps
de: engenheiro-apps
para: [alexandre, gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T23:04:30-04:00
---
# Builds preview Campo e Gestão do 5a1848a9 FINISHED: Novo pedido com formas, prazos e faixas, crédito em Detalhes, filtro Período e tela de medição (recriar a base da demo antes)

## Contexto
Builds de preview do Campo e do Gestão a partir do main 5a1848a93e459f1cd2d408ec9eb472c63d6939a5. Esse commit traz a T-0089 completa, a T-0090 e a tela de medição da T-0084. Quem pediu foi o gerente.
- CI do main nesse commit (run 42334866556): VERDE, com os 9 jobs, inclusive o agregador ci-ok. O aviso de cobrança do GitHub do APK anterior não se repetiu.
- O C:\macuxifdv-check foi para checkout destacado no 5a1848a9, sem alteração local. `pnpm install --frozen-lockfile` passou sem passo de resolução.
- Entre o 56b89a1 (APK anterior) e o 5a1848a9 não mudou nada em apps/mobile/package.json, app.config.ts, eas.json nem pnpm-lock.yaml. A parte nativa é a mesma; só o JS muda.
- O bundle Android das duas variantes passou antes do build: expo export com as variáveis do perfil preview e a API da demo, 2063 módulos, .hbc de 6,1 MB.
- A Expo registrou o gitCommitHash 5a1848a9 nos dois builds.

## O que preciso / o que mudou
Os dois builds terminaram (FINISHED): Campo em 20 min, Gestão em 21 min.
- Campo (campo-preview, br.com.macuxi.campo): APK https://expo.dev/artifacts/eas/4PftetZlTx_pEzZD7sYTnoMLPzJYtvJxPCWZKY1gFOo.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/c8275c80-3456-4f4c-9013-ef2a27b69c3c
- Gestão (gestao-preview, br.com.macuxi.gestao): APK https://expo.dev/artifacts/eas/zZF0vjz7BCAAonGa8GSapEouNQFlsyHoN7Q65wnoHTc.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/1c73f90a-b67a-4283-b865-98835b37c063

**ANTES DE TESTAR: recrie a base da demo.** As formas de pagamento, os prazos e as faixas escalonadas vêm da migração 0037 e do seed novo (pagamento.ts). Para eles aparecerem, rode no GitHub: Actions → "demo — recriar base demo" → Run workflow, e digite RECRIAR. Isso apaga o que foi gravado no ensaio. Sem esse passo, a demo atual pode ficar sem formas. Aí o topo do Novo pedido fica vazio, e isso não é defeito do APK. Depois de recriar, entre de novo no app (ou puxe para sincronizar) para o aparelho baixar o catálogo novo.

Roteiro só do que é NOVO em relação ao APK do 56b89a1. Os itens A e B daquele recado continuam valendo.

**A. Novo pedido (Campo, com o vendedor; T-0089)**
1. Abra um Novo pedido de um cliente qualquer, por exemplo o Mini Box Japiim. Na aba Itens, o topo mostra primeiro a forma de pagamento (Pix, Dinheiro, Cartão, Boleto) e depois o prazo. A lista de prazo mostra só os prazos (ex.: "28/56"), sem a palavra "médio".
2. Os prazos com prazo médio acima do limite do cliente aparecem desabilitados. Na Panificadora Pão Dourado (limite de 30 dias), o Cartão 30/60 e o Boleto 28/56 e 30/60/90 ficam cinza e não podem ser escolhidos. Nos demais clientes (limite de 45 dias), só o Boleto 30/60/90 fica cinza. Na Conveniência Rota 10, Boleto não aparece.
3. Logo abaixo da forma e do prazo aparece o total do pedido. Não existe mais rodapé fixo.
4. Busque e adicione produtos. Cada item ocupa 3 linhas e termina com "Valor total:" à direita. O campo de desconto já vem aberto. "+" e "−" mudam a quantidade a cada toque.
5. Adicione o BIS-400 (biscoito cream cracker, R$ 5,89 a unidade no Varejo) e suba a quantidade. O preço por unidade cai nas faixas da tabela escalonada: R$ 5,69 a partir de 50 UN, R$ 5,49 a partir de 10 CX e R$ 5,29 a partir de 20 CX.
6. Aba Detalhes: o 1º cartão é o "Crédito do cliente", com o limite total e o disponível. Teste com a Mercearia do Porto, o cliente da demo com título vencido há 45 dias (e bloqueado): tem que aparecer o alerta vermelho do título vencido. Logo depois vem o cartão "Leve mais e pague menos", com as faixas do BIS-400 (ele só aparece quando há produto com faixa no pedido). O frete também fica em Detalhes.
7. Envie um pedido com forma e prazo escolhidos e confira que ele chega na lista de Pedidos.

**B. Pedidos com o filtro num botão só (T-0090, modelo A)**
1. Na aba Pedidos, há um botão de filtro (funil) na linha da busca. Toque nele: abre a folha "Período" com Dia, Mês e Ano e as setas para trocar. Escolha um período e confirme.
2. Abaixo, aparece uma etiqueta com o período escolhido e um "x" para removê-la. O funil mostra quantos filtros estão ligados. Tirar a etiqueta volta ao período padrão.
3. A troca tem que ser na hora, sem travar, inclusive com pedidos na fila do aparelho e sem sinal: o pedido ainda não enviado continua na lista.
4. No Gestão, com a supervisora ou o gerente: o filtro de vendedor fica na mesma folha.

**C. Tela oculta de medição (T-0084, critério 5: busca com 20 mil produtos com aplicação longa)**
1. No Campo, abra o Perfil e toque 7 vezes seguidas, rápido (até 3 s entre os toques), na linha da versão no fim da tela. Abre a tela "Diagnóstico de carga". Ela só existe nos APKs de preview e desenvolvimento.
2. Toque em "Rodar medição". A tela grava sozinha 20 mil produtos de teste com aplicação longa e referências, mais 500 clientes, num banco separado e temporário. Seus dados não são tocados, e o banco de teste é apagado ao sair da tela. Depois ela refaz o índice e mede as buscas. Leva alguns minutos: mantenha a tela ligada e não saia dela.
3. No resultado, as 3 linhas do topo dizem OK ou NÃO ATENDE. A que vale para o critério 5 é "Busca do Novo pedido p95 < 300 ms (T-0084, critério 5)". O número fica na linha "Busca do Novo pedido (C9, …): p50 … · p95 …": o p95 tem que ficar abaixo de 300 ms.
4. Toque em "Copiar ou compartilhar" e cole o relatório inteiro no recado de volta. O relatório traz também o aparelho, a memória e o tempo da reindexação.

## Pronto quando
O Alexandre recriar a base da demo, instalar os dois APKs (o JS mudou e vem no APK) e devolver os itens A, B e C, com o relatório da medição colado. Se A ou B falharem, quem corrige é o Vendedor (editor do pedido e lista de Pedidos), e o Catálogo nas faixas. Se o p95 do C passar de 300 ms, quem corrige é o Catálogo (busca FTS5), com o engenheiro-apps. Nada foi alterado no repositório, não houve commit e nenhum segredo foi para o log.
