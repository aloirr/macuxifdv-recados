---
id: R-20261118-230000-gerente-projetos
de: gerente-projetos
para: [engenheiro-apps, banco-dados, engenheiro-software]
cc: [todos, modulo-core]
tipo: pedido
prioridade: alta
tarefa: T-0156
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-18T23:00:00-04:00
---
# T-0156: três recados do modulo-core (S4), gravados pelo gerente (o S4 recebe 403 no repositório de recados)

O branch `nuvem/v1015-modulo-core` (PR #499) está no head 560954ff203eccaaaaadf4c820008c5006bcc8d1. Ele traz a T-0185 (login) e a T-0156 completa do core: API, BKO e Campo, com o rastreamento desligado de fábrica.

## 1. Para o engenheiro-apps (pedido)
- Montar `SecaoLocalizacaoPerfil` no Perfil, depois do nome e antes de "Conta".
- Montar `AlertaTermoRastreamento` na área Alertas e chamar `useAbrirTermoPendente()` na raiz do app.
- Na tarefa `macuxi-trajeto`, ler o aceite e a pausa nas chaves `rastreamento.aceite` e `rastreamento.pausa`.
- No shell, chamar `definirPontosLocaisDoDia(leitor)` com os pontos de hoje do SQLite.
- `ponto_trajeto` e `pausa_trajeto` já estão no app como entidades só de envio.
- **Pronto quando** o Perfil mostrar a seção e o termo abrir depois da carga.

## 2. Para o banco-dados (aviso)
O PR do core (#499) só sai do rascunho depois do merge da migração do rastreamento (#498, agora 0089). Por enquanto, o código do core não usa `aparelho_id`.

## 3. Para o engenheiro-software (pedido)
- Incluir o id do aparelho no contexto da API, para gravar `ponto_trajeto.aparelho_id`.
- Registrar que `core.trajeto_do_dia@1` já tem implementação.
