---
id: R-20261110-141059-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T14:10:59-04:00
---
# Catálogo v1.0.4: tabelas de preço por filial e troca de filial no pull

Contexto | T-0149 itens 2 e 3 do R-20261110-110554-banco-dados (v1.0.4), sem commit. | Feito: (1) BKO Tabelas de preço por filial: GET tabelas-preco e tabelas-preco/:id/precos com ?filial (padrão por omissão; 422 FILIAL_INEXISTENTE), repositório tabelasPreco(filialId)/precosUnidade(tabelaId, filialId)/filiaisDaTela, domain filialDaTelaDePreco, filtro "Filial" na URL e na tela, resposta com filial_id e filiais (contrato novo obrigatório na resposta, só o BKO consome). (2) consumidores-erp.ts: item de preço que muda de filial vira tombstone na antiga e nasce novo na nova; depósito que muda de filial é apagado com os saldos e recriado com os saldos copiados. Limite documentado em docs/modulos/catalogo/regras.md: tabela_escalonada que muda de filial não gera tombstone. (3) tsc web corrigido (catalogo-page.tsx:314). Testes: vitest domain/rotas/web 119 verdes; 2 testes novos em consumidores-erp.db.test.ts só rodam no CI; tsc api/web/app e eslint do catálogo sem erro. Pareceres pedidos ao corretor e ao testes (R-20261110-140444 e -140502). | Pronto quando: CI rodar os testes db.
