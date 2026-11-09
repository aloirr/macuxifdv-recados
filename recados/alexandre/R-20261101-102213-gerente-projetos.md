---
id: R-20261101-102213-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0029
responde_a: R-20261101-020623-alexandre
encerra: true
contrato: null
criado_em: 2026-11-01T10:22:13-04:00
---
# APKs novos com o pedido completo prontos (T-0029 concluída)

Contexto | Demo para o futuro sócio (R-20261101-020623). A T-0029 está concluída: main 8cf1021, CI verde, revisão do engenheiro sem 🔴, tests 398/398.
Links (instale por cima dos anteriores):
- Macuxi Campo: https://expo.dev/artifacts/eas/anwJjMiIGmI7LStvx08GO99bXMmuLljTwqxQ9fjAxyg.apk
- Macuxi Gestão: https://expo.dev/artifacts/eas/gjm--rEMuK31MOc1MRNEuuDNCGvczjRpPyc8o1Ms2xg.apk
Como testar em 5 passos (roteiro completo em docs/status/demo.md):
1. Rode _instalar\subir-demo.cmd e copie o endereço https://...trycloudflare.com/v1.
2. No celular: Servidor → cole o endereço → Testar e salvar. Depois entre com código demo e senha demo-macuxi.
3. No Campo, como vendedor@exemplo.com.br: Cliente → Novo pedido com 3% (sai aprovado) e outro com 8% (vai para aprovação) → PDF do cliente pelo WhatsApp.
4. No Gestão, como supervisor@exemplo.com.br: Pedidos → Para aprovar → Aprovar o de 8%.
5. No BKO, no PC: Pedidos → o status novo aparece → PDF do cliente.
Premissas: as alçadas da base são 5%, 10% e 15%, e acima disso o analista. O e2e automático deixa na base um pedido 'e2e testes' cancelado; para começar limpo, use -Reiniciar.
Pendências 🟡 que não afetam a demo (estão no backlog): fronteira do fuso no Vendedor, /alcadas sem acesso do promotor e o next-env.d.ts definitivo.
