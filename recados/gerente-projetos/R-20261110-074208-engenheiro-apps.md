---
id: R-20261110-074208-engenheiro-apps
de: engenheiro-apps
para: [alexandre]
cc: [gerente-projetos]
tipo: entrega
prioridade: alta
tarefa: T-0144
responde_a: R-20261110-062231-alexandre
encerra: false
contrato: null
criado_em: 2026-11-10T07:42:08-04:00
---
# v1.0.2: por que o app fechou 3 vezes na 1ª abertura e o que muda na v1.0.5 (falta 1 prova do aparelho)

## Contexto
Teste da v1.0.2 de 10/11, das 05h32 às 05h34 (R-20261110-062231). Olhei os 35 quadros da gravação (abertura-1, -2 e -3) e o código da abertura, da passagem dos dados e da carga inicial.

## O que aconteceu, em linguagem simples
- **As 3 quedas foram em pontos diferentes**: (1) logo depois do Entrar, quando o app abria os dados do aparelho ("Atualizando os dados do aparelho…" a 0%); (2) na tela de abertura, antes de qualquer tela; (3) no fim da carga, em 98%. Na 4ª abertura a carga terminou em cerca de 1 segundo, porque continuou de onde parou, e foi ao Início. **Nada se perdeu.**
- **Não foi erro de tela.** Quando uma tela erra, o app já mostra a tela de erro desde a v1.0.1. Aqui o processo inteiro do app foi encerrado de uma vez: ou por uma falha no código nativo (a parte do app escrita para o Android: banco de dados do aparelho, tarefa de sincronização em segundo plano) ou pelo próprio Android. Por isso a tela de erro nunca apareceu.
- **Não é excesso de dados.** A demo é pequena (15 clientes). Falta de memória por volume fica descartada para a demo; para 20 mil produtos há 2 pontos de consumo de memória que passei ao engenheiro-software.
- **O que ainda falta é a prova.** A v1.0.2 não guarda o motivo que o Android dá quando encerra o app, e aqui no PC não há Android nem cabo para ler o log do aparelho. Sem isso, a causa exata fica entre 2 suspeitos, e protegi os dois (abaixo).

## O que muda na v1.0.5
1. **O app passa a contar por que fechou.** No início seguinte a uma queda, ele pergunta ao Android o motivo (erro nativo, erro do Java, falta de memória, app travado ou fechado pelo sistema) e grava em Perfil › Diagnóstico, em "Último erro do app" e na linha nova "Saídas do app (Android)", sem dado pessoal. Uma queda só basta para termos a causa exata. O Android guarda esse histórico por alguns dias: instalando a v1.0.5 por cima da v1.0.2, o Diagnóstico deve mostrar até o motivo das quedas de hoje.
2. **Suspeito 1, a sincronização em segundo plano:** logo depois de atualizar o APK, o Android dispara a sincronização atrasada no mesmo instante em que você abre o app, e nesse começo ainda diz que o app está "em segundo plano". Agora ela espera 3 segundos, vê o app abrindo e desiste. Quem sincroniza na abertura é sempre o app, com você vendo.
3. **Suspeito 2, trabalho pesado junto no banco do aparelho:** a reorganização da busca de produtos rodava junto com a carga inicial. Agora ela fica para o fim da carga, uma vez só.

## O que eu preciso de você
- **Agora, se puder, sem esperar a v1.0.5:** no mesmo celular, gere um "Relatório de bug" (Configurações › Opções do desenvolvedor › Relatório de bug › Relatório completo; se não houver "Opções do desenvolvedor", toque 7 vezes em Configurações › Sobre o telefone › Informações do software › Número de compilação) e mande o arquivo. Ele traz o motivo das quedas de hoje e fecha a causa.
- O print de Perfil › Diagnóstico da v1.0.2 ("Último erro do app" e "Build instalado"), como você disse.

## Pronto quando
- Com o APK novo: atualizar por cima da v1.0.2 e fazer a carga inicial **3 vezes seguidas sem nenhuma queda**, com o print do Diagnóstico de cada tentativa.
- Se cair, o Diagnóstico mostra o motivo e eu corrijo a causa exata no mesmo dia.
- O build depende da sua autorização (o gerente organiza o v1.0.5).
