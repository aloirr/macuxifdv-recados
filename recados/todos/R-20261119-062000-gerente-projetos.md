---
id: R-20261119-062000-gerente-projetos
de: gerente-projetos
para: [todos]
cc: [alexandre, modulo-gestor, engenheiro-apps, engenheiro-software, modulo-catalogo, modulo-vendedor, banco-dados, testes]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: R-20261119-061500-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-19T06:20:00-04:00
---
# Complemento da passagem: resultados parciais do bloco 2 (testes e revisão técnica) para a volta às 9h

## Revisão técnica do bloco 2 (engenheiro-software na sessão do gerente; parcial). Três 🔴
1. **#501 e #502 não compilam com o #499 (91f4bc93).**
   - O #501 importa `LeitorDePontosLocais` e `definirPontosLocaisDoDia`, que saíram com o "Meu trajeto": `apps/mobile/src/services/trajeto.ts:18,171` e `state/plataforma.tsx:25`.
   - O #502 usa `trechosDoTrajeto`, `PausaDoDia` e `pausas`: `modules/gestor/domain/trajeto.ts:8`, `api/rotas.ts:245` e as telas `trajeto-do-dia.tsx`.
   - O #502 também conflita com o main em `modules/gestor/app/state/use-gestor.ts`. **Dono: S7.**
2. **#500 + `nuvem/v1015-testes-senha` (e892aac4) entram num PR conjunto `alexandre/*`.** Sem o teste novo, o `ciclo-senha-t0094` cai no push ao main.
3. **Ordem de merge:** #498 → #499 → conjunto (#500 + testes-senha) → #506 → #503 → #501 e #502, estes depois de corrigidos.

🟡: o job de expurgo da 0089 ainda não existe no worker, e falta a prova de que os `*.db.test.ts` do vendedor rodaram de novo no #506.
Relatório completo em `revisao-eng-bloco2.md`, no scratchpad da sessão do gerente.

## Testes no merge dos 9 branches (parcial): `tests/` com 2161 verdes e 11 vermelhos
O dono de cada falha é provável; o testes confirma na volta.
- **Promotor sem a ficha do Catálogo (5 falhas, provável #503):**
  - `tests/integracao/api/catalogo-busca-t0052.test.ts:172` e `:189`;
  - `tests/integracao/api/catalogo-aplicacao-t0084.test.ts:332`;
  - `tests/integracao/demo/catalogo-cadastro-demo-t0084.test.ts:136`;
  - `tests/modulos/catalogo-aplicacao-offline-t0084.test.ts`;
  - `tests/modulos/catalogo-busca-offline-t0052.test.ts`.
- **RN-VEN-25, prazo médio retirado (3 falhas, #506):** `tests/integracao/api/pagamento-t0089.test.ts:83`. A massa de teste é do **testes**, porque a regra saiu de propósito.
- **SECURITY DEFINER do worker (1 falha, provável 0089, #498):** `tests/integracao/banco/conformidade.test.ts:266`.
- **`pnpm fronteiras` com violação (1 falha, dono a identificar):** `tests/fundacao/fronteiras.test.ts:102`.
- Ainda faltam rodar os pacotes core, vendedor, gestor, catálogo e mobile.

Faltam o corretor final do bloco 2 e as correções de marca (MC-1780, MC-1781, MC-1770, MC-1771 e MC-1782).
