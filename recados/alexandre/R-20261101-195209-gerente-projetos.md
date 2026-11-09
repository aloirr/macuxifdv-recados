---
id: R-20261101-195209-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0038
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T19:52:09-04:00
---
# APKs novos com domínio fixo (sem digitar endereço) + aviso sobre o limite de builds

Contexto | T-0038. Os APKs vêm do commit 0af7c1c (CI verde), gerados numa worktree limpa. O bundle foi conferido com https://api-demo.macuxifdv.com.br/v1 e o login sem o campo Servidor.
Links (instale por cima; os links valem até 2026-11-15):
- Macuxi Campo: https://expo.dev/artifacts/eas/-j2R1plt2fqk25BX9CUV6aJfA4dW-W7RmaIGbRkU9JM.apk
- Macuxi Gestão: https://expo.dev/artifacts/eas/85bpIEGyrlCzhwxIusKIaFS9xbBzBtMIFWzDnwLIA00.apk
Como testar:
1. git pull (traz a correção do configurar-dominio, 2c7c883).
2. _instalar\configurar-dominio.cmd (reaproveita o macuxi-demo).
3. _instalar\subir-demo.cmd; espere 'Pronto para a demonstração'.
4. Abra o app e entre com o código demo e a senha demo-macuxi, sem digitar endereço.
5. BKO em https://bko-demo.macuxifdv.com.br.
Antes do passo 2, o app mostra 'Servidor indisponível — tente mais tarde'. Isso é esperado.
Aviso: o seu R-20261101-184624 limitava a 2 builds a T-0038 e a T-0047 juntas. Li esse recado depois de disparar estes 2. Para os APKs com a busca do Catálogo (T-0047), preciso de uma autorização nova sua.
A correção do 'hoje' em UTC (T-0042) é só na API: vale na demo depois do pull, sem APK novo.
