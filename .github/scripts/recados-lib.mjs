// Funções puras das Actions do repositório de recados (ADR 0035 do aloirr/macuxifdv, T-0139).
// Sem dependências: Node 24 (fetch, Intl).
// Testes: node --test .github/scripts/recados-lib.test.mjs .github/scripts/telegram-recado.test.mjs
//
// O formato do recado é o do scripts/coord.mjs do repositório de código (doc 07, "Protocolo de recados"):
// front matter com id, de, para, cc, tipo, prioridade, tarefa, responde_a, encerra, contrato e criado_em, nessa
// ordem, e depois "# <assunto>", uma linha em branco e o corpo. Destinos e tipos iguais aos da coord-lib.

export const AGENTES = [
  'gerente-projetos', 'engenheiro-software', 'engenheiro-apps', 'designer-ux', 'banco-dados', 'testes',
  'modulo-core', 'modulo-catalogo', 'modulo-vendedor', 'modulo-promotor', 'modulo-gestor', 'modulo-pesquisa',
  'modulo-treinamento', 'modulo-integracao', 'corretor-redundancias',
];
export const DESTINOS = [...AGENTES, 'alexandre', 'todos'];
export const TIPOS = ['pedido', 'pergunta', 'resposta', 'aviso', 'bloqueio', 'entrega', 'revisao'];
export const PRIORIDADES = ['alta', 'normal', 'baixa'];
/** Remetente dos recados do formulário: o dono do produto. */
export const REMETENTE = 'alexandre';

/** Rótulo do campo no formulário (.github/ISSUE_TEMPLATE/recado.yml) → chave do recado. */
export const ROTULOS = {
  'Para': 'para',
  'Cópia (cc)': 'cc',
  'Tipo': 'tipo',
  'Prioridade': 'prioridade',
  'Tarefa': 'tarefa',
  'Responde a': 'responde_a',
  'Encerra o assunto': 'encerra',
  'Texto': 'texto',
};

const SEM_RESPOSTA = /^_?No response_?$/i;

/**
 * Corpo da issue de formulário ("### Rótulo\n\nvalor\n\n### Outro...") → {chave: valor}. Campo vazio = ''.
 * Rótulo que não é do formulário é ignorado. Sem nenhum rótulo conhecido → null (não é issue de recado).
 */
export function lerFormulario(corpo) {
  const texto = String(corpo || '').replace(/\r\n?/g, '\n');
  const partes = texto.split(/^### +/m).slice(1);
  const campos = {};
  for (const parte of partes) {
    const quebra = parte.indexOf('\n');
    const rotulo = (quebra < 0 ? parte : parte.slice(0, quebra)).trim();
    const chave = ROTULOS[rotulo];
    if (!chave) continue;
    const valor = (quebra < 0 ? '' : parte.slice(quebra + 1)).trim();
    campos[chave] = SEM_RESPOSTA.test(valor) ? '' : valor;
  }
  return Object.keys(campos).length ? campos : null;
}

const lista = (v) => String(v || '').split(/[,;\n]/).map((s) => s.trim().toLowerCase()).filter(Boolean);

/**
 * Valida o formulário e devolve o recado (sem id e sem data) ou os erros, em português, para o comentário na issue.
 * @returns {{erros: string[], recado?: object}}
 */
export function validarFormulario({ titulo, campos }) {
  const erros = [];
  const assunto = String(titulo || '').replace(/^\s*\[recado\]\s*/i, '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim();
  if (!assunto) erros.push('o título da issue é o assunto do recado: escreva o assunto no título');
  const para = [...new Set(lista(campos.para))];
  const cc = [...new Set(lista(campos.cc))].filter((c) => !para.includes(c));
  if (!para.length) erros.push('escolha ao menos um destinatário em "Para"');
  for (const d of [...para, ...cc]) if (!DESTINOS.includes(d)) erros.push(`destinatário inválido: ${d}`);
  const tipo = String(campos.tipo || '').trim().toLowerCase();
  if (!TIPOS.includes(tipo)) erros.push(`tipo inválido: "${campos.tipo || ''}" (use ${TIPOS.join(', ')})`);
  const prioridadeInformada = String(campos.prioridade || '').trim().toLowerCase();
  const prioridade = PRIORIDADES.includes(prioridadeInformada) ? prioridadeInformada : 'normal';
  const tarefa = String(campos.tarefa || '').trim().toUpperCase();
  if (tarefa && !/^T-\d{4}$/.test(tarefa)) erros.push(`tarefa inválida: "${campos.tarefa}" (formato T-0000)`);
  const respondeA = String(campos.responde_a || '').trim();
  if (respondeA && !/^R-\d{8}-\d{6}(-\d+)?-[a-z-]+$/.test(respondeA)) erros.push(`"Responde a" inválido: "${respondeA}" (formato R-AAAAMMDD-HHMMSS-remetente)`);
  const encerra = /\[x\]/i.test(String(campos.encerra || ''));
  if (encerra && !respondeA) erros.push('"Encerra o assunto" só vale numa resposta: preencha "Responde a"');
  const corpo = String(campos.texto || '').replace(/\r\n?/g, '\n').trim();
  if (!corpo) erros.push('o texto do recado está vazio');
  if (erros.length) return { erros };
  // Bloqueio vai sempre com cópia ao gerente (mesma regra do coord.mjs enviar).
  if (tipo === 'bloqueio' && !para.includes('gerente-projetos') && !cc.includes('gerente-projetos')) cc.push('gerente-projetos');
  return { erros: [], recado: { assunto, para, cc, tipo, prioridade, tarefa: tarefa || null, responde_a: respondeA || null, encerra, corpo } };
}

/** Data/hora no fuso do time: {iso: '2026-11-08T13:28:42-04:00', compacto: '20261108-132842'} (igual ao coord.mjs). */
export function horaLocal(data, fuso = 'America/Boa_Vista') {
  const partes = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
    timeZone: fuso, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'longOffset',
  }).formatToParts(data).map((p) => [p.type, p.value]));
  const desloc = partes.timeZoneName === 'GMT' ? '+00:00' : partes.timeZoneName.replace('GMT', '');
  const local = `${partes.year}-${partes.month}-${partes.day}T${partes.hour}:${partes.minute}:${partes.second}`;
  return { iso: `${local}${desloc}`, compacto: local.replace(/[-:]/g, '').replace('T', '-') };
}

/** Id livre: R-<compacto>-alexandre ou R-<compacto>-<n>-alexandre (n a partir de 2), como o coord.mjs. */
export function idLivre(compacto, existentes, de = REMETENTE) {
  let id = `R-${compacto}-${de}`;
  for (let n = 2; existentes.has(id); n++) id = `R-${compacto}-${n}-${de}`;
  return id;
}

/** Texto do arquivo do recado, idêntico ao do coord.mjs enviar. */
export function montarRecado({ id, de = REMETENTE, para, cc = [], tipo, prioridade = 'normal', tarefa = null, responde_a = null, encerra = false, contrato = null, criado_em, assunto, corpo }) {
  return [
    '---',
    `id: ${id}`,
    `de: ${de}`,
    `para: [${para.join(', ')}]`,
    `cc: [${cc.join(', ')}]`,
    `tipo: ${tipo}`,
    `prioridade: ${prioridade}`,
    `tarefa: ${tarefa || 'null'}`,
    `responde_a: ${responde_a || 'null'}`,
    `encerra: ${encerra ? 'true' : 'false'}`,
    `contrato: ${contrato || 'null'}`,
    `criado_em: ${criado_em}`,
    '---',
    `# ${assunto}`,
    '',
    `${corpo.replace(/\n+$/, '')}\n`,
  ].join('\n');
}

/** Caminhos do recado no repositório: um arquivo por destino (para + cc), como o coord.mjs. */
export function caminhosDoRecado(id, para, cc = []) {
  return [...new Set([...para, ...cc])].map((d) => `recados/${d}/${id}.md`);
}

// ───────────────────────── Telegram ─────────────────────────

export const LIMITE_TELEGRAM = 4000; // a API aceita 4096 caracteres por mensagem

/** Cabeçalho e corpo de um recado (front matter simples, como o coord.mjs lê). */
export function lerRecado(texto) {
  const m = String(texto || '').replace(/^﻿/, '').match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return null;
  const meta = {};
  for (const linha of m[1].split(/\r?\n/)) {
    const mm = linha.match(/^([a-z_]+):\s*(.*?)\s*(#.*)?$/i);
    if (mm) meta[mm[1]] = mm[2];
  }
  const corpo = m[2].replace(/\r\n?/g, '\n');
  const titulo = (corpo.match(/^# +(.+)$/m) || [])[1]?.trim() || meta.id || '(sem título)';
  const resto = corpo.replace(/^# +.+\n?/m, '').trim();
  return { meta, titulo, resto };
}

const cortar = (t, n) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);

/**
 * Aviso de recado novo na caixa do dono do produto: título, remetente, tipo, a linha "id: R-..." e as primeiras
 * linhas. A linha do id fica no cabeçalho (nunca é cortada) porque é por ela que a resposta pelo Telegram sabe a que
 * recado e a quem voltar (alvoDaResposta).
 */
export function montarAviso(texto, { link = '', maxLinhas = 8, maxCaracteres = 900 } = {}) {
  const r = lerRecado(texto);
  if (!r) return null;
  const { meta } = r;
  const cab = [`Recado para você — ${r.titulo}`, `de ${meta.de || '?'} · ${meta.tipo || '?'}${meta.prioridade === 'alta' ? ' · ALTA' : ''}${meta.tarefa && meta.tarefa !== 'null' ? ` · ${meta.tarefa}` : ''}`];
  const remetente = remetenteDoId(meta.id);
  if (remetente) cab.push(`id: ${meta.id}`);
  const linhas = r.resto.split('\n').filter((l) => l.trim()).slice(0, maxLinhas).join('\n');
  const partes = [cab.join('\n'), cortar(linhas, maxCaracteres)];
  if (link) partes.push(link);
  if (AGENTES.includes(remetente)) partes.push(`Responda a esta mensagem para devolver a ${remetente}.`);
  return cortar(partes.filter(Boolean).join('\n\n'), LIMITE_TELEGRAM);
}

// ───────────────────── Telegram → recado (resposta pelo Telegram, workflow telegram-recado.yml) ─────────────────────

const PADRAO_ID = 'R-\\d{8}-\\d{6}(?:-\\d+)?-[a-z][a-z-]*';
/** Destinos aceitos no /para: os agentes e "todos" (a caixa do próprio dono do produto não faz sentido aqui). */
export const DESTINOS_TELEGRAM = [...AGENTES, 'todos'];
/** Destino da mensagem solta. */
export const DESTINO_PADRAO = 'gerente-projetos';

/** Remetente pelo id do recado (o coord.mjs grava R-<data>-<hora>[-n]-<de>); null se o id não tem esse formato. */
export function remetenteDoId(id) {
  const m = String(id || '').match(/^R-\d{8}-\d{6}(?:-\d+)?-([a-z][a-z-]*)$/);
  return m ? m[1] : null;
}

/**
 * A que recado e a quem volta uma resposta, pelo texto da mensagem do bot que o dono do produto respondeu:
 * - aviso de recado (montarAviso): linha "id: R-..." → responde_a = id, destino = remetente do id (precisa ser agente);
 * - confirmação (textoConfirmacao): "Recado R-...-alexandre gravado para a, b." → mesmo destino do recado dele.
 * Outra mensagem do bot (resumo, ajuda, erro) → null: a resposta vira mensagem solta.
 * @returns {{id: string, para: string[], titulo: string|null, tarefa: string|null} | null}
 */
export function alvoDaResposta(texto) {
  const t = String(texto || '').replace(/\r\n?/g, '\n');
  const aviso = t.match(new RegExp(`^id: (${PADRAO_ID})\\s*$`, 'm'));
  if (aviso) {
    const de = remetenteDoId(aviso[1]);
    if (!AGENTES.includes(de)) return null;
    const titulo = (t.match(/^Recado para você — (.+)$/m) || [])[1]?.trim() || null;
    const tarefa = (t.match(/^de [a-z-]+ · .*?\b(T-\d{4})\s*$/m) || [])[1] || null;
    return { id: aviso[1], para: [de], titulo, tarefa };
  }
  const conf = t.match(new RegExp(`^Recado (${PADRAO_ID}) gravado para ([a-z, -]+?)\\.?\\s*$`, 'm'));
  if (conf) {
    const para = conf[2].split(',').map((s) => s.trim()).filter((d) => DESTINOS_TELEGRAM.includes(d));
    if (!para.length) return null;
    const titulo = (t.match(/^Assunto: (.+)$/m) || [])[1]?.trim().replace(/^Re: /, '') || null;
    return { id: conf[1], para, titulo, tarefa: null };
  }
  return null;
}

export const AJUDA_TELEGRAM = [
  'Como mandar recado por aqui:',
  '• Responda a um aviso de recado (arraste a mensagem para o lado): a resposta volta para quem mandou o recado.',
  `• Mensagem solta: vai para o ${DESTINO_PADRAO}.`,
  '• /para <agente> <texto>: vai para o agente. Vários: /para testes,modulo-core <texto>. Para o time todo: /para todos <texto>.',
  '',
  `Agentes: ${AGENTES.join(', ')}.`,
  '',
  'O recado chega ao PC em 5 a 10 min. Só texto (foto e áudio ainda não).',
].join('\n');

const semControle = (s) => String(s).replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();

/** Assunto do recado: "Re: <título>" na resposta; senão, a primeira linha do texto (sem # de Markdown), até 100 caracteres. */
export function assuntoDaMensagem(corpo, titulo = null) {
  if (titulo) return cortar(`Re: ${semControle(titulo)}`, 100);
  const primeira = corpo.split('\n').find((l) => l.trim()) || 'Recado pelo Telegram';
  return cortar(semControle(primeira.replace(/^#+\s*/, '')) || 'Recado pelo Telegram', 100);
}

/**
 * Uma atualização do getUpdates → o que fazer com ela (função pura, sem id nem data do recado):
 * - {acao: 'ignorar'}: não é mensagem, é de outro chat ou de bot. Nada é gravado, respondido ou logado;
 * - {acao: 'ajuda'|'erro', texto}: responde no Telegram e não grava recado;
 * - {acao: 'recado', recado: {para, tipo, responde_a, tarefa, assunto, corpo}, data}.
 * `botId` (a parte do token antes do ":") confere que a mensagem respondida é deste bot.
 */
export function interpretarMensagem(update, { chatId, botId = null } = {}) {
  const msg = update?.message;
  if (!msg || !chatId || String(msg.chat?.id) !== String(chatId) || msg.from?.is_bot) return { acao: 'ignorar' };
  const texto = String(msg.text ?? msg.caption ?? '').replace(/\r\n?/g, '\n').trim();
  if (!texto) return { acao: 'erro', texto: `Só mensagem de texto vira recado. Nada foi gravado.\n\n${AJUDA_TELEGRAM}` };
  let corpo = texto;
  let para = null;
  const comando = texto.match(/^\/([a-z_]+)(?:@\w+)?(?:\s+([\s\S]*))?$/i);
  if (comando) {
    const nome = comando[1].toLowerCase();
    if (['start', 'ajuda', 'help'].includes(nome)) return { acao: 'ajuda', texto: AJUDA_TELEGRAM };
    if (nome !== 'para') return { acao: 'erro', texto: `Comando desconhecido: /${nome}. Nada foi gravado.\n\n${AJUDA_TELEGRAM}` };
    const m = String(comando[2] || '').trim().match(/^(\S+)\s*([\s\S]*)$/);
    if (!m) return { acao: 'erro', texto: `Use /para <agente> <texto>. Nada foi gravado.\n\nAgentes: ${AGENTES.join(', ')}.` };
    const destinos = [...new Set(m[1].toLowerCase().split(',').map((s) => s.trim()).filter(Boolean))];
    const invalidos = destinos.filter((d) => !DESTINOS_TELEGRAM.includes(d));
    if (invalidos.length || !destinos.length) {
      return { acao: 'erro', texto: `Agente inválido: ${invalidos.join(', ') || m[1]}. Nada foi gravado.\n\nAgentes: ${AGENTES.join(', ')} (ou todos).` };
    }
    if (!m[2].trim()) return { acao: 'erro', texto: `Faltou o texto depois de /para ${destinos.join(',')}. Nada foi gravado.` };
    para = destinos;
    corpo = m[2].trim();
  }
  const original = msg.reply_to_message;
  const doBot = !!original && (botId ? String(original.from?.id) === String(botId) : original.from?.is_bot === true);
  const alvo = doBot ? alvoDaResposta(original.text ?? original.caption) : null;
  return {
    acao: 'recado',
    data: new Date(Number(msg.date) * 1000),
    recado: {
      para: para || alvo?.para || [DESTINO_PADRAO],
      tipo: alvo ? 'resposta' : 'aviso',
      responde_a: alvo?.id || null,
      tarefa: alvo?.tarefa || null,
      assunto: assuntoDaMensagem(corpo, alvo?.titulo),
      corpo,
    },
  };
}

/** Texto da confirmação no Telegram; alvoDaResposta reconhece este formato (responder a ela complementa o recado). */
export function textoConfirmacao({ id, para, assunto }) {
  return `Recado ${id} gravado para ${para.join(', ')}.\nAssunto: ${assunto}`;
}

/**
 * Atualizações do getUpdates → plano da execução (função pura): recados a gravar, respostas a mandar e o novo
 * "último update". Só entram as atualizações com update_id maior que `ultimo` (idempotência: o mesmo lote lido de
 * novo, depois de um push que não aconteceu ou de um getUpdates repetido, gera os mesmos ids e nada a mais).
 * O id e o criado_em vêm da hora da MENSAGEM (não da execução), então repetir o lote repete os ids.
 * @param {Set<string>} existentes ids que já existem no repositório (não é alterado)
 */
export function planejarMensagens(updates, { chatId, botId = null, ultimo = null, existentes = new Set(), fuso = 'America/Boa_Vista' } = {}) {
  const ids = new Set(existentes);
  const plano = { ultimo, recados: [], respostas: [], ignoradas: 0 };
  const ordenados = [...(updates || [])].filter((u) => Number.isSafeInteger(u?.update_id)).sort((a, b) => a.update_id - b.update_id);
  for (const u of ordenados) {
    if (ultimo !== null && u.update_id <= ultimo) continue;
    plano.ultimo = plano.ultimo === null ? u.update_id : Math.max(plano.ultimo, u.update_id);
    const r = interpretarMensagem(u, { chatId, botId });
    const responderA = u.message?.message_id ?? null;
    if (r.acao === 'ignorar') { plano.ignoradas++; continue; }
    if (r.acao !== 'recado') { plano.respostas.push({ texto: r.texto, responderA }); continue; }
    const hora = horaLocal(Number.isNaN(r.data.getTime()) ? new Date(0) : r.data, fuso);
    const id = idLivre(hora.compacto, ids);
    ids.add(id);
    const corpo = `${r.recado.corpo}\n\n_Enviado pelo Telegram em ${hora.iso.slice(0, 16).replace('T', ' ')} (fuso de Boa Vista)._`;
    const texto = montarRecado({ ...r.recado, id, prioridade: 'normal', criado_em: hora.iso, corpo });
    plano.recados.push({ id, para: r.recado.para, assunto: r.recado.assunto, texto, caminhos: caminhosDoRecado(id, r.recado.para) });
    plano.respostas.push({ texto: textoConfirmacao({ id, para: r.recado.para, assunto: r.recado.assunto }), responderA });
  }
  return plano;
}

/**
 * getUpdates com offset (= último update gravado + 1). Pedir com esse offset CONFIRMA ao Telegram tudo o que veio
 * antes, e só isso: o lote desta execução só é confirmado na próxima, depois do push (nada se perde se o push falhar).
 * Uma página só (até 100): pedir a 2ª página confirmaria a 1ª antes do commit. Erro → código HTTP, sem o token.
 */
export async function buscarUpdates({ token, offset = null, limite = 100, fetch: buscar = globalThis.fetch } = {}) {
  if (!token) throw new Error('falta o secret TELEGRAM_BOT_TOKEN');
  const corpo = { limit: limite, timeout: 0, allowed_updates: ['message'] };
  if (offset !== null) corpo.offset = offset;
  const resposta = await buscar(`https://api.telegram.org/bot${token}/getUpdates`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(corpo),
  });
  if (!resposta.ok) {
    const dica = resposta.status === 409 ? ' (o bot tem webhook ativo: getUpdates não funciona com webhook)' : '';
    throw new Error(`Telegram respondeu HTTP ${resposta.status} no getUpdates${dica}`);
  }
  const json = await resposta.json();
  if (!json?.ok || !Array.isArray(json.result)) throw new Error('getUpdates sem resultado');
  return json.result;
}

/**
 * Novidades do resumo de hora em hora: arquivos ADICIONADOS em recados/todos/ e recados/alexandre/ (função pura,
 * sobre a lista do git diff --diff-filter=A). Um recado com cópia em várias pastas conta uma vez em cada seção.
 */
export function separarNovidades(caminhos) {
  const caixa = [];
  const todos = [];
  for (const c of caminhos) {
    const m = String(c).match(/^recados\/(alexandre|todos)\/(R-[^/]+\.md)$/);
    if (!m) continue;
    (m[1] === 'alexandre' ? caixa : todos).push(c);
  }
  return { caixa: caixa.sort(), todos: todos.sort() };
}

/** Texto do resumo; null quando não há novidade (o workflow não envia nada). */
export function montarResumo({ caixa = [], todos = [], quando = '', link = '', maxPorSecao = 15 }) {
  if (!caixa.length && !todos.length) return null;
  const linha = (r) => `• [${r.meta.tipo || '?'}] ${cortar(r.titulo, 120)} — ${r.meta.de || '?'}`;
  const secao = (nome, itens) => {
    if (!itens.length) return '';
    const mais = itens.length > maxPorSecao ? `\n… e mais ${itens.length - maxPorSecao}` : '';
    return `${nome} (${itens.length}):\n${itens.slice(0, maxPorSecao).map(linha).join('\n')}${mais}`;
  };
  const partes = [`Resumo dos recados${quando ? ` — ${quando}` : ''}`, secao('Na sua caixa', caixa), secao('Para todos', todos), link];
  return cortar(partes.filter(Boolean).join('\n\n'), LIMITE_TELEGRAM);
}

/**
 * Envia uma mensagem de texto puro ao Telegram. O token só vai na URL da API; nada dele aparece em erro ou log.
 * `fetch` injetável (testes). Erro → lança Error com o código HTTP, sem a URL.
 */
export async function enviarTelegram(texto, { token, chatId, responderA = null, fetch: buscar = globalThis.fetch } = {}) {
  if (!token || !chatId) throw new Error('faltam os secrets TELEGRAM_BOT_TOKEN e TELEGRAM_CHAT_ID');
  const corpo = { chat_id: chatId, text: texto, disable_web_page_preview: true };
  // Resposta encadeada à mensagem do dono do produto; se ela tiver sido apagada, manda solta.
  if (responderA) corpo.reply_parameters = { message_id: responderA, allow_sending_without_reply: true };
  const resposta = await buscar(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(corpo),
  });
  if (!resposta.ok) throw new Error(`Telegram respondeu HTTP ${resposta.status}`);
  return true;
}

/** Máscara do GitHub Actions para os secrets (::add-mask::), antes de qualquer saída. */
export function mascarar(valores, escrever = (l) => process.stdout.write(l)) {
  for (const v of valores) if (v) escrever(`::add-mask::${v}\n`);
}
