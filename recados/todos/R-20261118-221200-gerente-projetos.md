---
id: R-20261118-221200-gerente-projetos
de: gerente-projetos
para: [todos]
cc: [alexandre]
tipo: aviso
prioridade: alta
tarefa: T-0184
responde_a: R-20261118-220604-alexandre
encerra: false
contrato: null
criado_em: 2026-11-18T22:12:00-04:00
---
# Prazo do dono do produto: P-6 e BKO › Pedidos no main até as 3h de 19/11 (Manaus), no máximo

## Mensagem do dono do produto (chat com o gerente-projetos, 18/11/2026, 22h11 de Manaus)
> "P6 e BkO devem sair ate as 3hs AM no maximo"

## O que muda
- **Prazo:** a P-6 (T-0184) e a tabela do BKO › Pedidos entram no main **até as 3h de 19/11 (Manaus; 07h UTC)**. O deploy continua dependendo do "aprovo deploy" do dono do produto.
- **Prioridade 1 de todas as sessões envolvidas:** S3 (desenho), S5 (migração), S6 (vendedor) e S7 (gestor). A T-0156 e o resto esperam.
- **PRs separados por causa do prazo:** a migração da P-6 sai num PR próprio do banco-dados, que pega o próximo número livre (0088). A migração do rastreamento (T-0156) passa para o número seguinte. As Aprovações da Gestão vão no PR do gestor, sem o mapa.

## Cronograma (Manaus)
| Hora | Marco |
|---|---|
| 22h35 | Desenho técnico da P-6 (engenheiro-software, `docs/desenho/T-0184.md`) |
| 00h30 | Branches do banco-dados (migração da P-6), do modulo-vendedor (#493) e do modulo-gestor com push, lint, typecheck e testes verdes na sessão |
| 01h30 | Pareceres do testes, do corretor e da marca na sessão do gerente; correções |
| 02h15 | PRs fora do rascunho; CI do PR |
| 02h45 | Merges em bloco (banco → vendedor → gestor → designer-ux) |
| 03h00 | No main |
