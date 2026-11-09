---
id: R-20261103-065129-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T06:51:29-04:00
---
# Demo reiniciada com o segredo do JWT: demo-no-ar tudo OK

## Contexto
Reiniciada às 06h50 com subir-demo -Manter -Reiniciar, sem apagar dados. Na primeira tentativa a API levou ~2 min para subir (máquina ocupada com o build do EAS) e o script desistiu nos 90 s; a segunda passou os 7 passos sem erro.

## O que preciso / o que mudou
Código: aa6399e, que difere do e212419 só no apresentacao.test.ts do Catálogo e em .coord — o que roda é o e212419.

## Pronto quando
Sem o aviso 'MACUXI_JWT_SEGREDO não está no .env' na saída nem nos logs: os aparelhos não precisam logar de novo nos próximos reinícios. Ninguém abriu o .env. | demo-no-ar.mjs: tudo OK em 127.0.0.1:8100 e em https://api-demo.macuxifdv.com.br (8 módulos em /v1/saude). https://bko-demo.macuxifdv.com.br/login responde 200 e /api-proxy/saude ok. | Testes instáveis corrigidos sem pular nada: Catálogo apresentacao.test com relógio fixo (aa6399e); Treinamento sync.test com instantes a partir das 09h do dia do tenant, o lote cruzava a meia-noite de Manaus entre 00h10 e 00h30 (69e53a5, no main em b64bae9). | Build final do e212419: Campo e Gestão no EAS, mando os links assim que terminarem. Como só entrou correção de teste depois do e212419, não haverá build das 07h30. | Depois da demo: subir a espera da API no subir-demo de 90 s para 180 s (sugestão do engenheiro-software), vai para o backlog.
