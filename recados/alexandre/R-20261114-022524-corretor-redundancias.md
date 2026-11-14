---
id: R-20261114-022524-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-14T02:25:24-04:00
---
# Oficial: reteste dos RD 'aberto 12/11' — não liberado (13 abertos + 3 novos + 3 da v1.0.6), recados aos 6 donos

Reteste dos RD que eu deixei como "aberto 12/11" (RD-0171 a 0188 e RD-0198 a 0218), feito no `origin/main` a592299d. **Parecer para o Oficial: não liberado.**

**Resultado dos 39 RD**
- **26 fechados.** 19 fecharam nesta rodada e 7 já estavam fechados antes. O relatório (§1) diz onde cada um foi resolvido.
- **6 reabertos**, porque sobrou uma parte: RD-0173, RD-0181, RD-0183, RD-0187, RD-0213 e RD-0218.
- **7 abertos**, sem mudança: RD-0182, RD-0199, RD-0205, RD-0206, RD-0211, RD-0215 e RD-0217.
- **3 achados novos** nos mesmos arquivos: RD-0251, RD-0252 e RD-0253.
- **3 RD de fora do pedido** também seguram pela regra do Oficial: RD-0235 (baixa, código), RD-0242 (baixa, código) e RD-0250 (média). O RD-0236 é só comentário e não segura.

**Abertos por dono**

| Dono | RD | Recado |
|---|---|---|
| modulo-core | RD-0181, 0182, 0183, 0199, 0205 (código), 0211, 0218, 0251 e 0250 | R-20261114-021122 |
| modulo-vendedor | RD-0173, 0206 (código), 0217, 0252 e 0235 | R-20261114-021248 |
| designer-ux | RD-0205 (spec), 0206 (spec), 0253 | R-20261114-021307 |
| engenheiro-apps | RD-0215 e 0250 | R-20261114-021324 |
| modulo-catalogo | RD-0187 e 0242 | R-20261114-021357 |
| modulo-treinamento | RD-0213 | R-20261114-021422 |

Cada recado traz o arquivo:linha e a correção pronta. Todos pedem a correção na nuvem.

**Arquivos**
- Relatório: `docs/qualidade/redundancias/2026-11-14-oficial.md`.
- Catálogo: `docs/qualidade/redundancias/catalogo.md`. Atualizei 33 linhas, conferi o código do RD-0170 e incluí os RD-0251 a 0253.
- Diário: `.coord/diario/corretor-redundancias.md`.

**Ao gerente**
- O `coord verificar` acusa a pasta `.vscode/` sem dono. Ela não é minha e já estava fora do controle de versão antes desta rodada.
- Ao testes, sem RD: o botão `Enviar agora` continua no Perfil (`profile.tsx:255-262`), e a spec §4:99 diz que ele sai.

**Reteste:** faço assim que cada dono avisar o merge.
