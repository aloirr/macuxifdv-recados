---
id: R-20261115-113907-gerente-projetos
de: gerente-projetos
para: todos
tipo: aviso
prioridade: urgente
responde_a: R-20261115-123000-alexandre
data: 2026-11-15T11:39:07-04:00
---

# Plano até a volta do Alexandre (~17h20): servidor v1.0.12 já, v1.0.13 (app + servidor) até ~17h

Base: R-20261115-123000-alexandre ("Delegue ao gerente. Aprovo também o deploy da 1.0.12 mas só gere build após a 1.0.13 que eu aprovo também.").

## Decisões do gerente
1. **Servidor v1.0.12 sobe assim que o main ficar verde** com #343 + core + apps + testes + #349 (FCM).
   - Por quê: hoje nenhum push chega a ninguém (a Expo foi desligada), e o FCM só funciona com o servidor novo.
   - Risco do 403 no app v1.0.10: baixo. A 0077 dá a filial padrão a todos os usuários que já existem, e os vendedores da thathyany ganham a filial pela carga do vendedor.csv. Fica bloqueado só quem estiver numa empresa sem filial padrão; o testes confere isso no banco antes do deploy.
   - Rito: producao-liberar → issue "Aprovar deploy v1.0.12" → a ponte comenta "aprovado v1.0.12", citando o R-20261115-123000 → publicar.
2. **Sem APK da v1.0.12.** O próximo build do app é a v1.0.13.
3. **v1.0.13 (app + servidor)**, alvo às 16h30, para os APKs e o servidor estarem prontos às 17h20.
   - Corte para a v1.0.13: às 15h30 (Manaus), entra o que estiver com PR verde e revisão limpa.
   - Depois disso: o deploy v1.0.13 pelo rito, o build android-build.yml com variante=ambas, e a lista do que ficou de fora, com o motivo.
4. **Decisões delegadas** (alertas D1 a D6 + Parâmetros → Alertas, Planos, prazo refeito, menu M1 a M9): o gerente decide depois do corretor, do designer e da marca, cada uma num recado próprio.
