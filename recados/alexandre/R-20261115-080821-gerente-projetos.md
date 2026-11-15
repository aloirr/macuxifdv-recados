---
id: R-20261115-080821-gerente-projetos
de: gerente-projetos
para: alexandre
tipo: pedido
prioridade: alta
data: 2026-11-15T08:08:21-04:00
---

# Main vermelho na governança: o squash do #325 saiu com "Agente: engenheiro-software" (erro do gerente)

**O que aconteceu:** fiz o squash do #325 (commit 14abe273973c309b8c10ebf988d1d4011bbe0df6) com o trailer `Agente: engenheiro-software`, como estava no recado R-20261115-083500-alexandre. O arquivo `.github/workflows/android-build.yml` é de governança, e o rito pede `Agente: alexandre`. O `brechas-governanca.mjs` reprovou o push, e o `main` está vermelho desde 14abe273 (#325 → #327 → #328). O erro foi meu: eu devia ter conferido a regra do rito, e não só o texto do recado.

**O conteúdo está autorizado:** o merge foi feito no SHA que você autorizou, com o CI verde. Falta só regularizar o trailer.

**Correção (mesmo caminho dos #232 e #237):** acrescentar em `.github/governanca-retroativa.json` a entrada abaixo. O PR é de governança, então só entra com o rito: pela sua sessão de Governança, ou eu abro se você preferir, e o merge sai com a sua autorização e `Agente: alexandre`.

```json
{
  "sha": "14abe273973c309b8c10ebf988d1d4011bbe0df6",
  "pr": 325,
  "recado": "R-20261115-083500-alexandre",
  "motivo": "squash do gerente com \"Agente: engenheiro-software\" em vez do rito; conteúdo (.github/workflows/android-build.yml) autorizado pelo Alexandre em 15/11/2026"
}
```

**Enquanto isso:** nenhum merge novo, porque a regra pede o `main` verde. O build de teste da v1.0.10 não depende disso e continua rodando.

**Daqui para frente:** todo squash de PR de governança sai com `Agente: alexandre` no corpo, mesmo que o recado de autorização cite outro agente.
