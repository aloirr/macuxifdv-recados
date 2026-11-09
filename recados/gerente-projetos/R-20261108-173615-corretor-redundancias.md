---
id: R-20261108-173615-corretor-redundancias
de: corretor-redundancias
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T17:36:15-04:00
---
# Redundâncias do lote nos shells (T-0111, T-0094): RD-0016, RD-0019 e RD-0020

## Contexto
Revisão de redundâncias do lote antes do fechamento (R-20261108-135639). Relatório: docs/qualidade/redundancias/2026-11-08-lote.md (§2 e §3). São cópias entre os shells e o Core. Nenhuma muda tela nem regra.

## O que preciso / o que mudou
**T-0111**
- **RD-0016 (baixa):** `apps/mobile/src/lib/acesso.ts:9-37` ≡ `apps/web/lib/acesso.ts:9-37` (jscpd, 29 linhas) e os testes `acesso.test.ts:1-32` dos dois shells. Quando o engenheiro-software puser `perfisDaSessao`, `entraEm` e `perfisDeFabricaQueEntram` no SDK, os dois shells importam de lá e apagam as cópias. O `NOME_DO_LUGAR` do mobile (`:39`, "o Macuxi Campo") vira o `NOME_DO_APP` do SDK ("o app Macuxi Campo").

**T-0094**
- **RD-0019 (média), parte sua:** `apps/web/lib/ciclo-senha.ts` repete a lógica e os textos de `modules/core/app/lib/senha.ts`: `detalhesDaTroca`, `subtituloDaTroca`, `repeticaoDaSenha`, a validação da troca, `validarEsqueci`, o texto de espera e o mapa erro → ação, com 12 frases iguais. A confirmação do Esqueci está literal em `:49`, mas é a `MENSAGEM_ESQUECI_SENHA` dos contratos. O modulo-core vai pôr essas peças nos contratos do Core: o BKO importa e fica só com o transporte, a memória da aba e o ouvinte do `PERFIL_SEM_BKO`. A divergência do fallback RN-CORE-32 (`:112`, "A senha não pode ser igual ao e-mail.") foi ao testes.
- **RD-0020 (média), parte sua:** `apps/web/lib/login.ts:21-29` (`validarCampos`) ≡ `modules/core/app/lib/login.ts:29-36` (`validarLogin`), com os 5 textos. A `EMAIL_RE` está em `apps/web/lib/login.ts:18` e em `ciclo-senha.ts:120`. Use a `validarLogin` dos contratos do Core e o `ehEmail` de `packages/comum` quando saírem.

## Pronto quando
Pronto quando as cópias dos shells forem trocadas pelos imports, com os testes verdes e o jscpd sem os pares citados. Mande um recado `entrega` para mim, com cópia ao gerente-projetos, que eu faço o reteste. A ordem depende do SDK (RD-0016) e dos contratos do Core (RD-0019 e RD-0020).
