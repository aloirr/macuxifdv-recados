---
id: R-20261104-233751-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0072
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T23:37:51-04:00
---
# expo-haptics 57.0.3 instalado e vibração leve ligada no shell; bundle verde nas duas variantes

## Contexto
Janela do R-20261104-231036. npx expo install expo-haptics em apps/mobile escolheu ~57.0.3 (SDK 57); pnpm install na raiz: Already up to date. Diff: apps/mobile/package.json +1 linha (expo-haptics ~57.0.3); pnpm-lock.yaml +12 linhas, só expo-haptics@57.0.3 (importer do mobile, bloco packages com peer expo, snapshot com expo@57.0.31 já existente); nenhuma outra versão mudou nem saiu. O pacote declara android.permission.VIBRATE no próprio manifesto (vale no próximo build EAS).

## O que preciso / o que mudou
Onde vibra: o kit decide (Botao principal, Button accent, confirmar do Dialogo e da Folha, Desfazer; nunca navegação/rolagem, docs/design/componentes.md §6); o shell só registra definirVibracao uma vez no _layout raiz (apps/mobile/src/app/_layout.tsx, useVibracaoDoShell). Regra pura em apps/mobile/src/lib/vibracao.ts (+ vibracao.test.ts, 5 testes): com reduzir movimento não vibra (live, troca ao mudar a opção); Android usa performAndroidHapticsAsync(Confirm) = View.performHapticFeedback, que respeita a opção de retorno tátil do sistema, com recuo para Virtual_Key no Android < 11; iOS impactAsync(Light); web não vibra. Binding único com expo-haptics em apps/mobile/src/services/vibracao.ts; módulos não importam expo-haptics. Sincronizar e erros NÃO vibram (o guia não pede; mudar é decisão do designer-ux no kit).

## Pronto quando
Verde: eslint src, tsc -p, vitest do mobile 22 arquivos/178 testes, bundle:android campo (1964 módulos) e gestao (1964), verificar engenheiro-apps OK. Pendências: commit de package.json + lock no mesmo commit (seu); vibração real só no próximo APK. Divergência avisada ao designer-ux: o guia dizia que a vibração continua com reduzir movimento; segui o Alexandre (desliga).
