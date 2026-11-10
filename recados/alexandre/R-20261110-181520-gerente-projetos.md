---
id: R-20261110-181520-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T18:15:20-04:00
---
# Status de 10/11 (atrasado pela queda do Claude): v1.0.3 quase toda liberada, build entre 20h45 e 21h15; o que fica para a v1.0.4

## Contexto
Status diário de 10/11. Ele chegou atrasado: a sessão do Claude perdeu a autenticação por volta das 17h35 e todos os agentes caíram no meio do trabalho. Voltamos às ~18h50, e nada se perdeu do que já estava pronto.

## Situação da v1.0.3 (21h)
**Prontas e liberadas pelo corretor, com testes verdes:**
- **T-0144:** queda na 1ª abertura. Causa exata: o banco do celular liberava 2 vezes a mesma memória ao fechar. Corrigida, e o Diagnóstico agora mostra o motivo de qualquer queda.
- **T-0145:** permissões obrigatórias, conforme a imagem aprovada.
- **T-0146:** ficha do cliente sem repetição.
- **T-0147:** fotos do PDV, com só a fachada abrindo para o vendedor. O envio de foto nova fica para a v1.0.4.
- **T-0151:** regras do pedido (preço salvo, alçada só na pergunta, máximo e sem estoque só como orçamento).
- **T-0153:** lista de Pedidos e barra sem números.
- **T-0154:** novas tentativas no 403 do GHCR.
- **T-0155:** demo com 3 faturados, agora com a devolução ligada.
- **T-0148:** aba Itens com popup e foto ao tocar.
- **T-0150:** Resumo e detalhe em tabela com a área Alertas. Faltam 2 achados de 1 linha, que estão sendo corrigidos agora.

**Entram desligados ou sem efeito visível:**
- filial (migração e código, todos na filial padrão);
- diagnóstico na nuvem (chave desligada até a sua aprovação das imagens).

## O que ficou para a v1.0.4 (quarta)
- **Filial completa:** gravação no pedido, seed de Boa Vista e teste de ponta a ponta com o Conector 1.4.0.
- **Fotos do PDV:** envio de foto nova pelo vendedor.
- **PDFs:** 2 defeitos (acréscimo só nos itens sai "Desconto 0,0%"; embalagens somadas como "un.").
- **Diagnóstico:** ligado depois da sua aprovação das imagens (já nos anexos, R-20261110-164342).
- **Revisão das telas (fase 2):** Rota, visita, Catálogo e Perfil, com as imagens voltando ao designer por 7 achados do corretor.

## Horário
- **Agora (~18h55):** 4 agentes fecham o que a queda deixou pela metade (máx. 20 min).
- **~19h15:** monto o candidato ao lote e rodo o CI e o stack isolado (~40 min).
- **Com tudo verde:** push, demo publicada e build EAS.
- **Previsão do BUILD PRONTO:** entre 20h45 e 21h15. Se o CI acusar algo que não se corrige na hora, aquilo sai do lote e eu te aviso.

## Riscos para sexta e sábado
- **T-0144:** a causa da queda só se prova no aparelho, com 3 atualizações seguidas da v1.0.3.
- **Filial:** é a maior frente da quarta.
- **Publicação do Conector 1.4.0:** precisa dos secrets da chave de assinatura e do bucket. O engenheiro-software vai listar os nomes.
- **Produção:** os recursos (Magalu, Brevo, DNS, secrets) precisam estar prontos até quarta às 18h, para o ensaio de quinta.

## Pronto quando
Você recebe o BUILD PRONTO da v1.0.3 hoje à noite.
