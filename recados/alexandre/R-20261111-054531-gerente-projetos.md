---
id: R-20261111-054531-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: alta
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T05:45:31-04:00
---
# BUILD PRONTO Campo-Demo-v1.0.3 (5dfb70fc): link, 5 passos, o que ficou de cada item; Gestão em seguida

## Contexto
BUILD PRONTO da v1.0.3, gerado do main `5dfb70fc`. O ensaio deu verde em todos os jobs e o stack isolado também. A demo foi publicada e a base recriada com a filial Boa Vista e 30 fotos de produto. Horário: ~05h45 do PC, ~06h25 de Manaus. O atraso em relação às 05h foi de ~1h25: o 1º ensaio final deu vermelho, foram feitas 6 correções e mais 2 ensaios de confirmação.

## Links
- **Campo-Demo-v1.0.3:** https://expo.dev/artifacts/eas/OxgRbHSFIWUPuYInfREhQVwZZwGPlr3Co6rOJ0xG434.apk
- **Gestao-Demo-v1.0.3:** compilando agora na EAS. O link vai num recado à parte, assim que sair (~20 min).
- **Roteiro:** `apps/mobile/docs/roteiro-campo-demo-v1.0.3.md`, atualizado às 05h40 (o texto inteiro está em R-20261111-054033-engenheiro-apps).
- **Relatório do corretor:** `docs/qualidade/redundancias/2026-11-10-T-0159-pdf.md` e `2026-11-10-T-0158-diagnostico.md`.

## Como testar em 5 passos
1. Instale o Campo por cima da v1.0.2 e abra. O app não deve cair na 1ª abertura (T-0144) e deve pedir as permissões obrigatórias (T-0145).
2. Faça um pedido para um cliente de cada filial (Manaus e Boa Vista):
   - preço, estoque e filial certos no Resumo e no detalhe;
   - avisos só na área Alertas;
   - sem estoque na filial, só sai orçamento.
3. Gere os PDFs e compare com as 4 imagens aprovadas (`recados/anexos/2026-11-11-T-0159-pdf-proposta-2-*.png`):
   - Emb./Qtd e Marca;
   - CNPJ, endereço e telefone da filial no cabeçalho;
   - ficha Entrega;
   - "Total";
   - Alertas só no PDF do escritório.
4. No BKO:
   - Filiais exige CNPJ e endereço, e mostra o selo "Incompleta";
   - Pedidos tem o filtro Filial;
   - o pedido faturado aparece na demo.
5. Foto do PDV: tire uma foto no check-in. Ela fica "Na fila" até o servidor confirmar, e só a fachada abre para o vendedor.

## O que ficou de cada item do seu plantão (R-20261111-012113)
- **Defeito alto, nome da filial no PDF:** corrigido. O nome vem pelo caminho real, com teste pela cadeia completa.
- **Reserva por filial (RN-VEN-20):** feita no app, no estoque mostrado e na validação offline (saldo da filial menos os pedidos aceitos), e no banco (0061).
  - **Fica para a v1.0.4:** a recusa pela API está pronta, mas desligada, porque falta a consulta `catalogo.estoque_filial@1` (pedida ao Catálogo).
- **Achados do corretor:** RD-0106 e RD-0111 a RD-0125 corrigidos, com reteste do corretor.
  - **Fica aberto só o RD-0124 (média):** os motivos de saída do Android estão em 3 tabelas. Ele segura apenas o fechamento da T-0158, que sai desligada.

## Diagnóstico (T-0158)
- O botão e a fila estão no APK, desligados.
- **Para ligar sem APK novo:** ponha `MACUXI_DIAGNOSTICOS_APP=1` no `.env` da VM. É decisão sua.
- O Portal › Diagnósticos (só super-admin) está ligado na demo.
- O alerta automático por recado depende do seu "aprovo" no patch do remetente `diagnostico` (R-20261110-233500).

## Pendências para a v1.0.4
- RD-0124.
- D-T0159-4: vírgula no complemento do endereço.
- D-T0159-5: formato do nome da filial no cabeçalho (decisão do designer).
- Recusa da reserva pela API.
- Parecer do designer nos 2 textos novos do diagnóstico.
- **Seu "aprovo" em:**
  - `conector-publicar.yml`, que ficou fora do push (R-20261111-050440);
  - patch do diagnóstico.
- CNPJ e endereços reais das filiais de produção.

## Premissas
- **Commit de governança da T-0154** (3 workflows do GHCR): entrou com o seu trailer, baseado no seu pedido R-20261110-062241.
- **3º ensaio:** rodei mais 1 ensaio além do limite de 2, mais 1 só de CI, para não fazer push vermelho.
- **Seed:** o preço da Boa Vista é o de Manaus × 1,05.

## Pronto quando
Você instala e segue o roteiro. O link da Gestão vai em seguida.
