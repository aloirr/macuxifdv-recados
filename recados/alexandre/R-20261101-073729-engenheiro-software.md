---
id: R-20261101-073729-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0026
responde_a: R-20261101-065547-alexandre
encerra: true
contrato: null
criado_em: 2026-11-01T07:37:29-04:00
---
# Re: endereço exatamente como digitado (substitui o item 2 do 065230), script e docs com /v1

## Contexto
Resposta às decisões sobre o endereço do servidor: R-20261101-065230-alexandre (/v1 visível) e R-20261101-065547-alexandre (exatamente como digitado), que substitui o item 2 da primeira. Segui a mais nova. Também fecha os itens 2 e 3 do R-20261101-023528-alexandre (a causa era o endereço digitado errado, R-20261101-024029).

## O que fiz
1. **App usa o endereço exatamente como digitado** (`apps/mobile/src/lib/api-url.ts`): `normalizeApiUrl` só tira os espaços das pontas; não completa `/v1` nem `http://`. O cartão Servidor mostra, salva e usa nas chamadas esse mesmo texto. O campo fica em várias linhas, então o endereço longo aparece inteiro. O exemplo é `https://seu-servidor.com.br/v1` e embaixo aparece "Endereço completo da API, como recebido, terminando em /v1."
2. **Sem `/v1` ou sem `https://`**: o teste falha e o campo continua com o texto digitado. Exemplos de mensagem: "Este endereço não é um servidor Macuxi: https://x.trycloudflare.com/saude não existe (erro 404). Confira o endereço; ele termina em /v1." / "Endereço incompleto: "x.trycloudflare.com/v1". Digite o endereço completo, começando com https://...". A mensagem sempre diz o endereço testado; quando passa: "Servidor Macuxi respondeu (versão 0.1.0). Testado: <endereço>/saude".
3. **Padrão do build** (`defaultApiUrl`, `EXPO_PUBLIC_API_URL`) continua completado com `/v1` (`completarApiUrl`).
4. **Script** `scripts/demo/subir-demo.ps1`: na etapa 6/6 imprime `https://<nome>.trycloudflare.com/v1` e copia para a área de transferência (`Set-Clipboard`; se falhar, avisa para copiar da tela). A linha "Túnel respondendo" continua testando `<endereço>/v1/saude`. A recusa de segunda subida também mostra o endereço com `/v1`.
5. **Docs**: `scripts/demo/LEIA-ME.md` (passo 1 do celular manda digitar com `/v1`; problemas comuns com as mensagens novas) e `docs/desenho/T-0004.md` §7.2. A linha 13 de `docs/status/demo.md` é do gerente-projetos, que já a atualizou.
6. **Testes**: `apps/mobile/src/lib/api-url.test.ts` atualizado (com e sem `/v1`, barra no fim e sem `https://` ficam como digitados; padrão do build completado; formato e https fora do dev).

## Pronto quando
Digitar `https://…trycloudflare.com/v1` passa e entra; sem `/v1` ou sem `https://` falha com a dica e o texto fica como digitado. Coberto em teste unitário. No aparelho, confere no APK novo (build do gerente).
