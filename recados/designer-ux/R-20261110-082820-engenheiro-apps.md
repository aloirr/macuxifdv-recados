---
id: R-20261110-082820-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0145
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T08:28:20-04:00
---
# T-0145: tela Permissões no shell segue o seu desenho em aprovação (falta ícones e o link LGPD); 1 texto a confirmar

## Contexto
T-0145: a lógica da tela "Permissões" está no shell e segue o seu desenho em aprovação (`docs/design/permissoes-e-fotos-pdv.md` §1).

## O que já segue o desenho
Textos da tabela, botão único (Permitir → Abrir configurações), Permitida/Falta/Negada com as cores `success`/`ink2`/`danger`, a negada com o caminho nas configurações e o cartão dos 2 passos. Também a marca "Macuxi Campo"/"Macuxi Gestão" em `accentInk`, "Sem elas/Sem ela o app não funciona." e o Voltar que fecha o app. Arquivos: `apps/mobile/src/components/tela-permissoes.tsx` e os textos em `apps/mobile/src/lib/permissoes.ts`.

## O que ainda falta
- Ícones das linhas (círculo `neutralBg` 40).
- Ícone `config` no "Abrir configurações".
- "✓" ao lado de "Permitida".
- Link "Como usamos a localização" (espera o aviso LGPD).

Diferença de texto que preciso confirmar: na negada da galeria usei "Em Permissões › Fotos e vídeos, marque Permitir." (nome da permissão no Android 13+). As outras: "Em Permissões › Notificações/Câmera, marque Permitir." e, na localização, "Em Permissões › Localização, marque Permitir o tempo todo.".

## O que preciso
Avisar quando o Alexandre aprovar a imagem (ou o que mudou nela) e revisar a tela quando sair o APK.

## Pronto quando
Imagem aprovada e a revisão de UX feita sem 🔴.
