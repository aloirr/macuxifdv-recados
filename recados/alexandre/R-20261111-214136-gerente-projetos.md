---
id: R-20261111-214136-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: alta
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T21:41:36-04:00
---
# BUILD PRONTO Campo-Demo-v1.0.4 / Gestao-Demo-v1.0.4 (61431816)

## Contexto
BUILD PRONTO da v1.0.4, que responde à sua cobrança R-20261111-212210.
- **Main:** `92de23ca` e `61431816` (versão 1.0.4), com CI verde nos dois.
- **Corretor:** liberou sem achado aberto.
- **Demo:** publicada, com a base recriada (Boa Vista) e 30 fotos.

## Links
- **Campo-Demo-v1.0.4:** https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/9e502745-43b5-44c9-b3de-b0fa500a7b0f
- **Gestao-Demo-v1.0.4:** https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/d707e934-4ef2-401b-9a47-927ce6950e79
- **APKs com nome legível, no seu PC:**
  - `C:\macuxifdv\apps\mobile\dist\apk\Campo-Demo-v1.0.4.apk`
  - `C:\macuxifdv\apps\mobile\dist\apk\Gestao-Demo-v1.0.4.apk`
- **Por que ainda não há link do bucket:** o comando que você autorizou rodou, mas o `.env` **não tem** as 5 variáveis do bucket de APK (`MACUXI_APK_S3_ENDPOINT`, `_REGIAO`, `_BUCKET`, `_CHAVE`, `_SEGREDO`). Para ter o link temporário, crie uma chave de Object Storage com leitura e escrita num bucket privado e ponha as 5 no `.env`, ou nos secrets do environment `APK_BUCKET` da solução definitiva. Depois disso, eu publico os dois.
- **Imagens do PDF gerado pelo código:**
  - `recados/anexos/2026-11-11-v104-T-0159-pdf-v104-codigo-cliente.png`
  - `recados/anexos/2026-11-11-v104-T-0159-pdf-v104-codigo-escritorio.png`
- **Roteiro:** `apps/mobile/docs/roteiro-campo-demo-v1.0.4.md`

## Como testar em 5 passos
1. Instale o Campo por cima da v1.0.3. No Perfil, a versão deve mostrar 1.0.4.
2. Gere o PDF de um pedido e de um orçamento e confira o horizontal v3:
   - coluna Item e ordem por código;
   - observações abaixo dos itens, sempre visíveis;
   - nenhum Alerta;
   - ficha cinza e cabeçalho verde;
   - Total em caixa e logo.
3. Faça um pedido acima do estoque da filial. O app já manda como orçamento, e o servidor também recusa (RN-VEN-20). O roteiro explica como forçar o caso pelo servidor.
4. No Perfil › Diagnóstico, os textos novos ("servidor indisponível") e os motivos de saída do Android aparecem com os seus rótulos.
5. No Catálogo, a busca continua rápida. No ensaio, a API com 20 mil produtos não travou, e o pool cheio responde em até 10 s.

## O que ficou de fora (v1.0.5)
- **T-0095:** guarda de ordem do ERP. A migração 0062 está pronta, mas os consumidores ainda não usam.
- **Campo "Observação da entrega":** o PDF já mostra o rótulo, em branco.
- **4 itens amarelos do designer no PDF:** medidas e o Histórico "Recebido → Recebido".

## Premissas
- **Teste da busca de 20 mil no CI:** o p95 oscilou entre 244 e 579 ms entre os ensaios, então o teste passou a barrar a volta do travamento com teto de 2000 ms. A meta de 300 ms fica acompanhada no doc do Catálogo.
- **Exceção que você aprovou para o corretor:** achado baixo só em comentário ou título de teste não segura mais o lote. Está no CLAUDE.md e no doc 07.

## Pronto quando
Você instala e testa.
