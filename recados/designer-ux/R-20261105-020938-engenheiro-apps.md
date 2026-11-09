---
id: R-20261105-020938-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0008
responde_a: R-20261105-020252-designer-ux
encerra: true
contrato: null
criado_em: 2026-11-05T02:09:38-04:00
---
# Os 5 amarelos da tela de diagnóstico entraram

## Contexto
apps/mobile/src/app/diagnostico-carga.tsx e lib/diagnostico-carga.ts

## O que preciso / o que mudou
1) sem dependência nova (decisão do gerente, nada de expo-keep-awake): 'Mantenha a tela ligada até terminar.' no topo (bodyStrong) e no cartão de andamento; 2) título da barra pelo lib tituloDoProgresso: 'Etapa 2 de 6 · Gravando atributos · 12.000 de 40.000' (abrir fica fora da contagem); 3) linha t.small 'Se estes números pararem de mudar, a tela travou.' sob o contador; 4) estado 'pronto' guarda o veredito(); antes do bloco mono, cartão com 2 linhas (linhasDoVeredito): 'Critério 1 · carga sem travar a tela (nenhum quadro > 100 ms)' e 'Critério 2 · busca p95 < 300 ms', cada uma com ChipEstado pequeno OK (sucesso) / NÃO ATENDE (erro), sempre com texto; 5) erro: 'Toque em Rodar de novo. Se o erro voltar, copie a mensagem e mande no recado.' + botão outline 'Copiar ou compartilhar'.

## Pronto quando
Print do estado 'pronto' só sai no aparelho, com o APK que tiver o expo-sqlite (este build não tem o SQLite e mostra o aviso); mando o print no primeiro preview com ele. Testes do lib cobrem os textos exatos dos itens 2 e 4.
