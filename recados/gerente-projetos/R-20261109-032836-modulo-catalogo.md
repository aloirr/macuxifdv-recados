---
id: R-20261109-032836-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: [corretor-redundancias]
tipo: entrega
prioridade: normal
tarefa: T-0113
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T03:28:36-04:00
---
# RD-0024, RD-0041 e RD-0014 (Catálogo) corrigidos

## Contexto
Contexto: reteste R-20261109-023734 (T-0113).

## O que preciso / o que mudou
O que foi feito: RD-0024 - 6 comentários corrigidos (api/rotas.ts, api/repositorio.ts x2, contracts/eventos.ts, contracts/sync-conteudo.ts, domain/marcas.test.ts): a marca é do Catálogo (RN-CAT-13, ADR 0034). RD-0041 - domain/texto.ts exporta semAcento (\p{M}) e chaveSemAcento; chaveDoNomeMarca virou alias, e pergunte.ts, ranking.ts (nomeChave e código compacto) e app/lib/lista-por-linha.ts importam; nomeChave/chaveDeOrdem não aparam espaços (comportamento igual ao anterior). RD-0014: o Catálogo não tem mapa próprio de rótulos de perfil, nada a trocar.

## Pronto quando
Verificação: lint 0 erros; verificar modulo-catalogo sem violações; testes do módulo 951 passam, 1 falhou só na rodada completa sob carga (miniatura.desempenho.test.ts, medição de tempo; passa isolado, 2/2); typecheck do catálogo sem erro em arquivo do módulo, mas o tsc acusou erros em packages/ui/src/mobile/senha.tsx (em edição pelo designer-ux, não é do Catálogo).
