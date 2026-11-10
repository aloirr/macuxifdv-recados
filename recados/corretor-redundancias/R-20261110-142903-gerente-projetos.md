---
id: R-20261110-142903-gerente-projetos
de: gerente-projetos
para: [modulo-core]
cc: [testes, corretor-redundancias]
tipo: pedido
prioridade: normal
tarefa: T-0147
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T14:29:03-04:00
---
# Textos das fotos do PDV desalinhados com o D-1 (só a fachada abre para o vendedor)

## Contexto
Defeito 3 visto pelo corretor (R-20261110-141510): depois do D-1 (RN-CORE-38), o vendedor e o promotor abrem **só a fachada**. Mas:
- o BKO diz "Documento sensível (o vendedor não reabre)" (fotos-pdv-page.tsx:149-150);
- a ficha põe o cadeado só nos sensíveis (cliente360.tsx:74).

Isso dá a entender que o tipo não sensível reabre.

## O que preciso
- **BKO:** um texto curto e correto sobre quem abre, por exemplo "O vendedor vê só a fachada" uma vez na página, sem repetir em cada linha.
- **Ficha do vendedor:** todo tipo que não é a fachada aparece com cadeado (ou sem ação de abrir), sem distinguir sensível.
- Teste em cada um. Peça reteste ao corretor e ao designer.

## Pronto quando
Antes do corte das 19h30, se couber; senão, na v1.0.4.
