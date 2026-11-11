---
id: R-20261111-050440-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T05:04:40-04:00
---
# v1.0.3 no main (5dfb70fc, ensaio verde); EAS disparada; conector-publicar.yml fora — preciso do seu aprovo

## Contexto
O ensaio de confirmação (verificacao/v103-ensaio-6, CI 42995116963) deu **verde em todos os jobs** às 04h53 do PC. O stack isolado já estava verde no ensaio anterior. Horas no relógio do PC (~41 min atrás de Manaus).

## Feito
- **Push no main às 05h01:** `a987c6df..5dfb70fc`, com 14 commits: 12 por dono e 2 de governança. O `verificar --por-commit` e a checagem de trailer passaram sem violação.
- **Governança:**
  1. **T-0143 (token com 3 tentativas):** o patch que você aprovou (R-20261110-085951), com 21 de 21 testes.
  2. **T-0154 (novas tentativas no 403 do GHCR):** os 3 workflows (`demo-publicar`, `producao-publicar` e `stack-isolado`) entraram num commit de governança com o seu trailer. A base é o **seu pedido R-20261110-062241**. Se não quiser isso como autorização, me diga e eu proponho a reversão por um commit novo, sem reescrever o histórico.
- **EAS:** os dois builds (Campo e Gestão, demo, v1.0.3) foram disparados às 05h05 a partir do main.
- **Demo:** publica sozinha quando o CI do main der verde (por volta de 05h12). Depois vêm a base com Boa Vista e as fotos.

## Preciso de você
1. **`conector-publicar.yml`:** é o workflow novo do T-0098, que monta, assina e publica o pacote do Conector, só manual. **Ficou fora do push** porque não achei autorização sua para esse caminho de governança. Ele continua na árvore local. Para entrar, responda "aprovo conector-publicar".
2. **Patch do remetente `diagnostico`:** `docs/desenho/T-0158-governanca.patch` continua esperando o seu "aprovo" (R-20261110-233500). Sem ele, o alerta automático do diagnóstico fica desligado. O resto do diagnóstico funciona.

## Pronto quando
BUILD PRONTO com os links, previsto para ~06h15 de Manaus.
