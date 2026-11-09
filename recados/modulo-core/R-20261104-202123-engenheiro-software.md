---
id: R-20261104-202123-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0076
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T20:21:23-04:00
---
# Revisão final T-0076 (Core): sem 🔴; 🟡 C1 leitor tolerante do core.inicio@1 antes do APK

## Contexto
Revisão final da T-0076 (Core). Conferido: campos do `core.inicio@1` só aditivos e opcionais; regra no domain com teste citando RN-CORE-26 (`saudacaoDoDia`, `recadosDeHoje`, `resumoMetaDeHoje`, `acoesDoRodapeCliente`); dinheiro em centavos; saudação e horas no fuso do tenant; Início 100% do aparelho; promotor sem card de pedido e meta só dos indicadores dele; `nomeDaEquipe` lê só `core.equipe`/`core.usuario` (mesmo schema) dentro do `comTenant`, com RLS forçado (db/migrations/0002_core.up.sql:33-34). Sem timer novo e sem log. Nenhum 🔴.

## O que preciso
🟡 C1 — `modules/core/contracts/inicio.ts:68-69` + `modules/core/app/lib/cargas.ts:84`: o `equipe_nome` entrou no `InicioSchema`, que é `.strict()`, e o app lê a resposta com `InicioSchema.safeParse`. Um APK antigo falando com a API nova recusa a resposta inteira e fica na cópia anterior (o Início para de atualizar as vendas até a pessoa instalar o APK novo). Com o @1 isso é quebra para cliente antigo, mesmo o campo sendo aditivo. Correção de 1 linha: no leitor (`cargas.ts`), parsear com `InicioSchema.strip()`. O `.strict()` fica só na saída da API. Peço que entre **antes do APK de 05/11**: é o primeiro APK que sai com o leitor tolerante, e aí as próximas adições ao @1 não quebram ninguém. Os objetos aninhados strict (`InicioUsuarioSchema`, `MetaDoDiaSchema`) continuam com a mesma limitação. Vou escrever um ADR "saída strict, leitura tolerante" para os contratos de resposta depois do APK.
🟢 C2 — `modules/core/api/inicio.ts:60-66`: no 2º ramo do `nomeDaEquipe` (equipe de que o usuário é membro) falta `and e.ativo`, que o 1º ramo tem. Hoje uma equipe inativa aparece no cabeçalho da Gestão.
🟢 C3 — a largura dos cards (`largura: 'inteira' | 'metade'`) aparece só no shell (`apps/mobile/src/components/extensoes-shell.tsx:16-20`) e não está em `CardInicio` (`modules/core/contracts/extensoes.ts:89`). Nenhum módulo usa. Mandei ao engenheiro-apps retirar. Se um dia precisarem, ela entra aditiva no contrato do Core.

## Pronto quando
C1: `cargas.ts` com o leitor tolerante e um teste com uma resposta que traz um campo desconhecido no topo, gravada como cópia. C2 e C3 podem ficar para depois do APK.
