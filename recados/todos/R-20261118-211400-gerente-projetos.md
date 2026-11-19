---
id: R-20261118-211400-gerente-projetos
de: gerente-projetos
para: [todos]
cc: [alexandre, engenheiro-software, modulo-integracao, modulo-vendedor, testes]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: R-20261118-003807-alexandre
encerra: false
contrato: null
criado_em: 2026-11-18T21:14:00-04:00
---
# PRONTO PARA LIBERAR v1.0.14 (só servidor) — SHA b52ca64dfc92dad5428921f9d1af2fe7910a5e97

## SHA para o deploy
**b52ca64dfc92dad5428921f9d1af2fe7910a5e97** (main, squash do #485, 18/11 às 20h58 de Manaus). Sem APK: o app nos aparelhos continua o v1.0.13.

## Conferido
1. **#485** no main, no SHA da frase 2878f90b97fbc5a3b64d7e8983a3a1216427b279 (R-20261118-003807-alexandre).
2. **Main verde** no b52ca64d: CI do push, run 44433316282, com os 11 jobs verdes e o `ci-ok` verde (21h08).
3. **Reteste do corretor-redundancias** no b52ca64d: **LIBERADO**. Os achados da rodada 62 continuam fechados, e o diff do #485 não tem duplicidade. A RD-2220 (baixa, linha velha em `docs/testes/T-0173.md:6`, dono `testes`) vai para a v1.0.15, como decidiu a rodada 62.
4. **Reteste do design-de-marca** no b52ca64d: **LIBERADO**. O #486 foi avaliado agora e está conforme. Não mudou nada em PDF, e-mail, logo, tokens nem `globals.css`. MC-1503 e MC-1522 estão decididas (R-20261118-210515-alexandre) e vão para a v1.0.15. A MC-0068 (cinzas do PDF do pedido, já em produção) vai para o `modulo-vendedor` na v1.0.15.
5. **Compatibilidade com o app v1.0.13:** é a análise do engenheiro-software em R-20261118-003201. Com a trava abaixo, o app antigo segue funcionando.
6. **Quadro:** PR #490 (head ce1fdc945ab83b836728ca6c6a13d86d2e9b11ed), com o fechamento, a trava e o escopo da v1.0.15.

## ⚠️ Trava de operação: RN-VEN-45, opção 1 (R-20261118-210200-alexandre)
Até o APK da v1.0.15 estar nos aparelhos:
- **não publicar o Conector 1.5.0** (o 1.4.0 continua em produção);
- **não preencher o "% Acres.Fin."** (`prazo_pagamento.percentual_ajuste`) na carga por arquivo nem no Conector. O % fica 0 em produção.

Motivo: o app v1.0.13 não manda o % do prazo, e o servidor recusa pedido com prazo de % diferente de 0. A trava só cai com um recado do dono do produto depois do APK da v1.0.15. **Ponte:** copie este bloco na issue "Aprovar deploy v1.0.14".

## Próximo passo
- **Ponte** (autorização em R-20261118-003807-alexandre): disparar o "producao — liberar versão" com `versao=v1.0.14` e `sha=b52ca64dfc92dad5428921f9d1af2fe7910a5e97`, e comentar "aprovado v1.0.14" na issue.
- **Gerente**, depois da publicação: conferir o /v1/saude, o BKO e o portal; gravar o recado "v1.0.14 no ar" com a previsão da v1.0.15; abrir a v1.0.15 em sessões novas.
