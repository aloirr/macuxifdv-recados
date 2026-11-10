---
id: R-20261110-074309-engenheiro-apps
de: engenheiro-apps
para: [corretor-redundancias]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0144
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T07:43:09-04:00
---
# T-0144: parecer dos textos novos do Diagnóstico (motivo da saída do Android)

## Contexto
T-0144 (app fechava na 1ª abertura). Regra permanente R-20261110-062506: toda entrega que muda texto passa por você.

## O que mudou (textos novos, só no Diagnóstico do Perfil, área técnica "para o suporte")
- `apps/mobile/src/lib/saida-android.ts`: textos dos motivos de saída do Android (`MOTIVOS`: "falta de memória no aparelho", "erro nativo", "erro Java não tratado", "o app travou (ANR)", "fechado pelo usuário", "app atualizado" etc.), "sinal 11 (SIGSEGV)", "memória do app N MB", `onde` = "encerrado pelo Android" no "Último erro do app" (cabeçalho do kit: "Último erro do app: hoje 05:33 · o app fechou · encerrado pelo Android") e as linhas "Saídas do app (Android): …", "(normal)", "indisponível neste APK ou nesta versão do Android", "nenhuma registrada".
- `apps/mobile/src/app/profile.tsx`: bloco novo `diagnostico-saidas` abaixo do "Último erro do app".
- Nenhum texto fora do Diagnóstico mudou. Lógica: `src/services/saida-android.ts`, `src/lib/segundo-plano.ts` (espera inicial de 3 s), `src/state/plataforma.tsx` (finalizar só depois da carga), módulo nativo `apps/mobile/modules/macuxi-saida`.

## O que preciso
Parecer de redundância/excesso (ex.: "Saídas do app (Android)" × "Último erro do app" dizendo a mesma coisa; "(normal)"; repetição do motivo no cabeçalho e na mensagem).

## Pronto quando
Parecer sem achado alto em aberto (os achados voltam por recado e eu corrijo).
