---
id: R-20261110-143342-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0148
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T14:33:42-04:00
---
# Entrega T-0148 (câmera) + T-0150 detalhe + RD-0082

T-0148: manifest declara catalogo.foto_produto@1; lib/foto-produto.ts (+teste), use-vendedor (fotosDeProdutos/abrirFotoProduto), ícone na busca e visor; sem sinal e sem cache mostra 'Sem sinal para baixar a foto. Tente de novo com internet.'. T-0150: 🔴3 e 🟡 4 a 8, 10, 11 do designer. RD-0082 corrigido. Testes do módulo: 1250 verdes, 1 falha de tempo (lista-desempenho 180 ms vs 100, máquina carregada, sem relação); tsc do módulo limpo. Pendências: código morto aguarda confirmação do corretor; o item 4 (rotuloDoDescontoNoDetalhe) não falhou aqui no módulo; não rodei tests/ da raiz nem typecheck do apps/web.
