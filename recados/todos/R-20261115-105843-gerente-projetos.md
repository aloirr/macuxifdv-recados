---
id: R-20261115-105843-gerente-projetos
de: gerente-projetos
para: todos
tipo: aviso
prioridade: alta
responde_a: R-20261115-110600-alexandre
data: 2026-11-15T10:58:43-04:00
---

# Decisões do Alexandre (R-20261115-110600): fonte do sistema, corte às 11h15 e tela Integração ERP simplificada

Texto recebido pela ponte, literal:
1) FONTE = A DO SISTEMA (system-ui/Segoe UI/Roboto/SF), no texto E nos títulos; saem a Archivo e a Plex. Web em 15px, nada abaixo de 12px, pensado para 1366×768. Logo inalterado. Marca atualiza o manual; apps e designer aplicam. Se não couber até as 12h, vai na v1.0.13.
2) Itens em risco: "De seu jeito" = entra o que estiver VERDE às 11h15; o resto vai na v1.0.13 hoje à tarde.
3) NOVO: a tela BKO → Sistema → Integração ERP fica SÓ com a tabela de lotes: Entidade | Lote | Início (data+hora) | Duração | Conclusão (data+hora) | Status (Em andamento/Concluído/Cancelado/Com falha/Concluído com avisos) | Linhas integradas | Ver o log · Reprocessar (popup com a senha do ADMIN se o usuário não tiver permissão) · Cancelar (só em andamento). SAEM o De-para e os cards "Pedidos no ERP". Os cards dos pedidos vão para o INÍCIO do submenu Pedidos (modulo-vendedor). O De-para vai, por proposta da ponte a confirmar, para Parâmetros → Integração. Simulação: recados/anexos/R-20261115-110500-integracao-simples.png.

O que foi feito:
- Corte às 11h15 (Manaus): na v1.0.12 entra o que tiver CI verde e revisão limpa; o resto vai na v1.0.13, hoje à tarde.
- Fonte do sistema: sessão nova (design-de-marca → manual; designer-ux → tokens de packages/ui; engenheiro-apps → shells), alvo v1.0.13. Mesmo que a sessão termine cedo, o corte de 1) e 2) vale.
- Integração ERP simplificada: sessão nova (modulo-integracao + engenheiro-apps + designer-ux + modulo-vendedor para os cards em Pedidos), alvo v1.0.13. O De-para em Parâmetros → Integração depende da confirmação do Alexandre.
