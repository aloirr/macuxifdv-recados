---
id: R-20261107-143006-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T14:30:06-04:00
---
# Chat do dono do produto, 07/11 (7h–14h40): registro literal e o que foi feito

Registro literal das mensagens do dono do produto no chat com o gerente-projetos, 07/11/2026, das 7h às 13h, com o que foi feito.

[~7h30] "Bom dia. Siga com o time a partir do estado de agora (main em e9a65286, CI verde, demo com a 0037). Leia antes os meus recados R-20261106-182000 e R-20261106-225242 e confira se tudo o que pedi neles já está no quadro e nas tarefas; o que faltar, aplique primeiro.
Frentes de trabalho, em ordem de prioridade:
1. PRs da nuvem (regra A, merge seu): já orientei as sessões a puxar o main, resolver conflitos e marcar [PRONTO PARA MERGE <sha>] com CI verde: #99 (N2), #97 (N1), #96 (C) e #95 (D). Ordem: #99 → #97 (integração) e #96 → #95 (catálogo), puxando o main entre um e outro. Revise as mudanças em contracts/ antes de cada merge. Depois do #97: aplique você o texto do carga-arquivo.md que está no corpo do PR, e registre no backlog 'modelos CSV liberados ao admin da empresa quando o BKO tiver carga self-service'. Depois do #95: o time local põe o atalho 'Ver por linha' no catalogo.tsx; abra o pedido pós-piloto do campo de miniatura no contrato do pull (baixada sob demanda, fora do pacote offline obrigatório). Se uma sessão da nuvem travar sem marcar o PR por mais de 2 h, me avise com o motivo.
2. T-0091 (condição da ADR 0029) e T-0092 (pendências do #99): distribua e toque; a T-0091 precisa estar concluída antes do 1º cliente real.
3. Produção (T-0086): fica pronta para ligar. Não ligue nada até o meu recado dizendo que criei os recursos. Mantenha o roteiro docs/status/producao.md atualizado com o que mudou desde 06/11 (0037, T-0088, workflows no main).
4. Testes de campo: vou recriar a base da demo e testar os APKs do 5a1848a9 e do e9a65286 (roteiros do engenheiro-apps). Não gere APK novo de preview até eu devolver os resultados, salvo correção de bug crítico. Quando os resultados chegarem, distribua um bug por agente dono.
5. Docs: atualize docs/produto/ com o que mudou na T-0089 e na T-0090 (doc 03: RN-VEN-15, 23, 24, 25; doc 06) e me avise para eu sincronizar o Projeto.
Regras para hoje: Não sobrescreva nem restaure .coord/lidos/alexandre.txt (na noite de 06/11 ele voltou a uma versão antiga por alguma operação de git; confira o que foi e evite repetir). Faça um backup da árvore em branch a cada lote grande, como fez em 06/11, por causa das quedas do notebook. Segredos só nos secrets; nada de .env em log ou recado.
Pronto quando: os 4 PRs integrados ou devolvidos com o motivo; T-0091 e T-0092 em andamento com dono; quadro, diário e docs/produto atualizados; um recado de status para mim no fim de cada bloco de trabalho (no máximo a cada 3 h), com o que subiu ao main, o que está bloqueado e o que preciso fazer."
→ Feito: PRs #95, #96, #97 e #99 no main; T-0091 e T-0092 no main; producao.md atualizado; doc 02 e doc 03 atualizados; backups em branch; status em R-20261107-080420, R-20261107-102804 e R-20261107-133859.

[~8h] "Pendências do diário que não vieram em recado: (a) qual é o ajuste do stack-isolado.yml da T-0091 que precisa do meu ok? Mande em recado com o que muda e a sua recomendação; (b) o portal da demo responde 503 sem a senha do macuxi_portal: diga se falta algum secret meu ou se é só configurar."
→ Respondido em R-20261107-080420.

[~9h] "porque nao tem nenhum agente trabalhando?"
→ As 4 vagas foram ocupadas com trabalho independente (UX da T-0090, views-modelo do Conector, rota pública do OpenAPI, 🟡 do portal).

[~11h] "Quanto tempo para poder finalizar e gerar a build demo final?"
→ Estimativa de ~3 h depois de desbloquear os PRs, com a proposta de tirar #96/#97 da condição do build.

[~11h20] "Faca o merge do 95 e 96"
→ #96 (ad56fa09) e #95 (7a43e824) integrados.

[~11h40] "#97 resolveu o conflito. Verifique"
→ Conferido (rotas de modelos + rotasPublicas, sem a bkoOpenApi) e integrado em 4694563d.

[~14h40] "Quanto tempo ate terminar tudo?"
→ ~50 min para o time local; o resto depende do dono do produto (teste dos APKs, portal na demo, produção, anexos).
