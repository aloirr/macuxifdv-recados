// Testes das Actions do repositório de recados (ADR 0035 do aloirr/macuxifdv, T-0139). node:test, sem dependências.
// Rodar: node --test .github/scripts/recados-lib.test.mjs
// Dentro do repositório de código (docs/desenho/T-0139-repo-recados/), confere também o formato contra o
// scripts/coord.mjs de verdade (caixa e ler) e os destinos contra a coord-lib; no repositório de recados esses
// dois testes são pulados.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, existsSync, copyFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync, execFileSync } from 'node:child_process';
import {
  lerFormulario, validarFormulario, horaLocal, idLivre, montarRecado, caminhosDoRecado, lerRecado, montarAviso,
  separarNovidades, montarResumo, enviarTelegram, mascarar, DESTINOS, TIPOS, LIMITE_TELEGRAM,
} from './recados-lib.mjs';
import { processarEvento } from './issue-recado.mjs';
import { recadosNovos } from './aviso-telegram.mjs';
import { baseDoResumo } from './status-horario.mjs';

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ_CODIGO = join(AQUI, '..', '..', '..', '..', '..'); // docs/desenho/T-0139-repo-recados/.github/scripts → raiz
const COORD = join(RAIZ_CODIGO, 'scripts', 'coord.mjs');
const temCoord = existsSync(COORD) && existsSync(join(RAIZ_CODIGO, 'scripts', 'coord-lib.mjs'));

const temporarios = [];
process.on('exit', () => { for (const d of temporarios) rmSync(d, { recursive: true, force: true }); });
const tmp = (p) => { const d = mkdtempSync(join(tmpdir(), p)); temporarios.push(d); return d; };

/** Corpo como o GitHub monta a issue de formulário. */
function corpoDoFormulario({ para = 'gerente-projetos', cc = '_No response_', tipo = 'pedido', prioridade = 'alta', tarefa = 'T-0139', responde = '_No response_', encerra = '- [ ] Sim, este recado encerra o assunto', texto = '## Contexto\nTeste pelo celular.\n\n## O que preciso\nNada.' } = {}) {
  return [
    '### Para', '', para, '',
    '### Cópia (cc)', '', cc, '',
    '### Tipo', '', tipo, '',
    '### Prioridade', '', prioridade, '',
    '### Tarefa', '', tarefa, '',
    '### Responde a', '', responde, '',
    '### Encerra o assunto', '', encerra, '',
    '### Texto', '', texto, '',
  ].join('\n');
}
const AGORA = new Date('2026-11-08T17:28:42Z'); // 13:28:42 em Boa Vista (-04:00)

test('lerFormulario: rótulos do formulário viram campos; "_No response_" vira vazio; outra issue = null', () => {
  const c = lerFormulario(corpoDoFormulario({ para: 'gerente-projetos, testes' }).replace(/\n/g, '\r\n'));
  assert.equal(c.para, 'gerente-projetos, testes');
  assert.equal(c.cc, '');
  assert.equal(c.tarefa, 'T-0139');
  assert.match(c.texto, /^## Contexto\nTeste pelo celular\./);
  assert.equal(lerFormulario('Só um texto qualquer\n### Outro título\n\nx'), null);
  assert.equal(lerFormulario(''), null);
});

test('validarFormulario: monta o recado; bloqueio ganha cc do gerente; erros em português', () => {
  const ok = validarFormulario({ titulo: '[Recado] Teste do formulário', campos: lerFormulario(corpoDoFormulario({ para: 'testes, testes', cc: 'testes, modulo-core' })) });
  assert.deepEqual(ok.erros, []);
  assert.deepEqual(ok.recado.para, ['testes']);
  assert.deepEqual(ok.recado.cc, ['modulo-core'], 'cc sem repetir quem já está em para');
  assert.equal(ok.recado.assunto, 'Teste do formulário');
  assert.equal(ok.recado.encerra, false);
  const bloq = validarFormulario({ titulo: 'Travado', campos: lerFormulario(corpoDoFormulario({ para: 'modulo-core', tipo: 'bloqueio' })) });
  assert.deepEqual(bloq.recado.cc, ['gerente-projetos']);
  const enc = validarFormulario({ titulo: 'ok', campos: lerFormulario(corpoDoFormulario({ tipo: 'resposta', responde: 'R-20261108-132842-gerente-projetos', encerra: '- [X] Sim, este recado encerra o assunto' })) });
  assert.equal(enc.recado.encerra, true);
  assert.equal(enc.recado.responde_a, 'R-20261108-132842-gerente-projetos');
  const ruim = validarFormulario({ titulo: '[Recado] ', campos: lerFormulario(corpoDoFormulario({ para: 'fulano', tipo: 'ordem', tarefa: '139', responde: 'abc', encerra: '- [X] Sim', texto: '_No response_' })) });
  assert.equal(ruim.recado, undefined);
  for (const e of [/assunto no título/, /destinatário inválido: fulano/, /tipo inválido/, /tarefa inválida/, /"Responde a" inválido/, /texto do recado está vazio/]) {
    assert.ok(ruim.erros.some((x) => e.test(x)), `${e} em ${ruim.erros.join(' | ')}`);
  }
  const semResposta = validarFormulario({ titulo: 'x', campos: lerFormulario(corpoDoFormulario({ encerra: '- [x] Sim' })) });
  assert.ok(semResposta.erros.some((x) => /só vale numa resposta/.test(x)));
});

test('horaLocal e idLivre: hora de Boa Vista e id igual ao do coord.mjs, com -n quando repete', () => {
  assert.deepEqual(horaLocal(AGORA), { iso: '2026-11-08T13:28:42-04:00', compacto: '20261108-132842' });
  assert.deepEqual(horaLocal(new Date('2026-01-01T03:00:00Z'), 'UTC'), { iso: '2026-01-01T03:00:00+00:00', compacto: '20260101-030000' });
  assert.equal(idLivre('20261108-132842', new Set()), 'R-20261108-132842-alexandre');
  assert.equal(idLivre('20261108-132842', new Set(['R-20261108-132842-alexandre', 'R-20261108-132842-2-alexandre'])), 'R-20261108-132842-3-alexandre');
});

test('montarRecado: mesmo cabeçalho, mesma ordem e mesmo fim de arquivo do coord.mjs enviar', () => {
  const texto = montarRecado({
    id: 'R-20261108-132842-alexandre', para: ['gerente-projetos'], cc: ['testes'], tipo: 'pedido', prioridade: 'alta',
    tarefa: 'T-0139', criado_em: '2026-11-08T13:28:42-04:00', assunto: 'Teste', corpo: 'Linha 1\nLinha 2\n\n',
  });
  assert.equal(texto, [
    '---', 'id: R-20261108-132842-alexandre', 'de: alexandre', 'para: [gerente-projetos]', 'cc: [testes]', 'tipo: pedido',
    'prioridade: alta', 'tarefa: T-0139', 'responde_a: null', 'encerra: false', 'contrato: null', 'criado_em: 2026-11-08T13:28:42-04:00',
    '---', '# Teste', '', 'Linha 1\nLinha 2\n',
  ].join('\n'));
  assert.deepEqual(caminhosDoRecado('R-1-alexandre', ['testes', 'todos'], ['testes', 'gerente-projetos']), [
    'recados/testes/R-1-alexandre.md', 'recados/todos/R-1-alexandre.md', 'recados/gerente-projetos/R-1-alexandre.md',
  ]);
  const lido = lerRecado(texto);
  assert.equal(lido.titulo, 'Teste');
  assert.equal(lido.meta.de, 'alexandre');
  assert.equal(lido.resto, 'Linha 1\nLinha 2');
});

test('processarEvento: só a conta permitida; grava um arquivo por destino; formulário com erro não grava', () => {
  const raiz = tmp('issue-recado-');
  mkdirSync(join(raiz, 'recados', 'gerente-projetos'), { recursive: true });
  writeFileSync(join(raiz, 'recados', 'gerente-projetos', 'R-20261108-132842-alexandre.md'), 'já existe\n');
  const issue = (login, body = corpoDoFormulario({ cc: 'testes' })) => ({ issue: { number: 7, title: '[Recado] Pelo celular', user: { login }, body } });
  assert.equal(processarEvento(issue('outra-conta'), { raiz, autor: 'domontecristo', agora: AGORA }).ok, 'ignorar');
  assert.equal(processarEvento(issue('domontecristo'), { raiz, autor: '', agora: AGORA }).ok, 'ignorar', 'sem AUTOR_PERMITIDO ninguém passa');
  assert.equal(processarEvento(issue('DomonteCristo', 'texto livre'), { raiz, autor: 'domontecristo', agora: AGORA }).ok, 'ignorar');
  const r = processarEvento(issue('DomonteCristo'), { raiz, autor: 'domontecristo', agora: AGORA });
  assert.equal(r.ok, 'true');
  assert.equal(r.id, 'R-20261108-132842-2-alexandre', 'o id não repete o que já existe');
  assert.deepEqual(r.caminhos, ['recados/gerente-projetos/R-20261108-132842-2-alexandre.md', 'recados/testes/R-20261108-132842-2-alexandre.md']);
  const gravado = readFileSync(join(raiz, r.arquivo), 'utf8');
  assert.match(gravado, /^---\nid: R-20261108-132842-2-alexandre\nde: alexandre\npara: \[gerente-projetos\]\ncc: \[testes\]\ntipo: pedido\nprioridade: alta\ntarefa: T-0139\n/);
  assert.equal(readFileSync(join(raiz, r.caminhos[1]), 'utf8'), gravado);
  const antes = readdirSync(join(raiz, 'recados', 'gerente-projetos')).length;
  const erro = processarEvento(issue('domontecristo', corpoDoFormulario({ para: 'fulano' })), { raiz, autor: 'domontecristo', agora: AGORA });
  assert.equal(erro.ok, 'false');
  assert.match(erro.erro, /destinatário inválido: fulano/);
  assert.equal(readdirSync(join(raiz, 'recados', 'gerente-projetos')).length, antes);
});

test('montarAviso: título, remetente, tipo, primeiras linhas e link; corta no limite', () => {
  const texto = montarRecado({ id: 'R-1-gerente-projetos', de: 'gerente-projetos', para: ['alexandre'], tipo: 'entrega', prioridade: 'alta', tarefa: 'T-0139', criado_em: 'x', assunto: 'BUILD PRONTO Campo-Demo-v1.0.1', corpo: Array.from({ length: 20 }, (_, i) => `linha ${i + 1}`).join('\n') });
  const aviso = montarAviso(texto, { link: 'https://github.com/aloirr/macuxifdv-recados/blob/main/recados/alexandre/R-1-gerente-projetos.md' });
  assert.match(aviso, /^Recado para você — BUILD PRONTO Campo-Demo-v1\.0\.1\nde gerente-projetos · entrega · ALTA · T-0139\n\nlinha 1\n/);
  assert.match(aviso, /linha 8\n\nhttps:\/\/github\.com/);
  assert.doesNotMatch(aviso, /linha 9/);
  const longo = montarAviso(montarRecado({ id: 'R-2-testes', de: 'testes', para: ['alexandre'], tipo: 'aviso', criado_em: 'x', assunto: 'x', corpo: 'a'.repeat(5000) }));
  assert.ok(longo.length <= LIMITE_TELEGRAM);
  assert.equal(montarAviso('sem cabeçalho'), null);
});

test('separarNovidades e montarResumo: só todos/ e a caixa; sem novidade = null', () => {
  const { caixa, todos } = separarNovidades(['recados/alexandre/R-1-testes.md', 'recados/todos/R-2-gerente-projetos.md', 'recados/testes/R-3-x.md', 'lidos/alexandre.txt', 'recados/alexandre/sub/R-4.md']);
  assert.deepEqual(caixa, ['recados/alexandre/R-1-testes.md']);
  assert.deepEqual(todos, ['recados/todos/R-2-gerente-projetos.md']);
  assert.equal(montarResumo({ caixa: [], todos: [] }), null);
  const r = (titulo, de, tipo) => ({ titulo, meta: { de, tipo } });
  const texto = montarResumo({ caixa: [r('Entrega da T-0139', 'gerente-projetos', 'entrega')], todos: Array.from({ length: 20 }, (_, i) => r(`Aviso ${i}`, 'testes', 'aviso')), quando: '2026-11-08 14:07', link: 'https://x' });
  assert.match(texto, /^Resumo dos recados — 2026-11-08 14:07\n\nNa sua caixa \(1\):\n• \[entrega\] Entrega da T-0139 — gerente-projetos\n\nPara todos \(20\):/);
  assert.match(texto, /… e mais 5\n\nhttps:\/\/x$/);
});

test('enviarTelegram: token só na URL da API, nunca no erro; mascarar emite ::add-mask::', async () => {
  const chamadas = [];
  const falso = async (url, opcoes) => { chamadas.push({ url, corpo: JSON.parse(opcoes.body) }); return { ok: true, status: 200 }; };
  await enviarTelegram('olá', { token: '123:ABC', chatId: '42', fetch: falso });
  assert.equal(chamadas[0].url, 'https://api.telegram.org/bot123:ABC/sendMessage');
  assert.deepEqual(chamadas[0].corpo, { chat_id: '42', text: 'olá', disable_web_page_preview: true });
  await assert.rejects(enviarTelegram('x', { token: '123:ABC', chatId: '42', fetch: async () => ({ ok: false, status: 401 }) }), (e) => /HTTP 401/.test(e.message) && !e.message.includes('123:ABC'));
  await assert.rejects(enviarTelegram('x', { token: '', chatId: '42', fetch: falso }), /faltam os secrets/);
  const linhas = [];
  mascarar(['123:ABC', '', '42'], (l) => linhas.push(l));
  assert.deepEqual(linhas, ['::add-mask::123:ABC\n', '::add-mask::42\n']);
});

test('recadosNovos e baseDoResumo: git de verdade num repositório temporário', () => {
  const dir = tmp('recados-git-');
  const g = (...a) => execFileSync('git', a, { cwd: dir, encoding: 'utf8' });
  g('init', '-q', '-b', 'main');
  g('config', 'user.name', 'T'); g('config', 'user.email', 't@exemplo.invalid'); g('config', 'commit.gpgsign', 'false');
  mkdirSync(join(dir, 'recados', 'alexandre'), { recursive: true });
  writeFileSync(join(dir, 'recados', 'alexandre', 'R-1-testes.md'), 'a\n');
  g('add', '-A'); g('commit', '-q', '-m', 'um');
  const um = g('rev-parse', 'HEAD').trim();
  writeFileSync(join(dir, 'recados', 'alexandre', 'R-2-testes.md'), 'b\n');
  writeFileSync(join(dir, 'recados', 'alexandre', 'R-1-testes.md'), 'a mudado\n');
  g('add', '-A'); g('commit', '-q', '-m', 'dois');
  const rodar = (...a) => execFileSync('git', a, { cwd: dir, encoding: 'utf8' });
  assert.deepEqual(recadosNovos(um, 'HEAD', rodar), ['recados/alexandre/R-2-testes.md'], 'só os adicionados');
  assert.deepEqual(recadosNovos('0000000000000000000000000000000000000000', um, rodar), ['recados/alexandre/R-1-testes.md']);
  assert.deepEqual(recadosNovos('f'.repeat(40), 'HEAD', rodar), ['recados/alexandre/R-2-testes.md'], 'ANTES desconhecido: só o último commit');
  assert.equal(baseDoResumo(`${um}\n`, rodar), um);
  assert.notEqual(baseDoResumo('abcdef1', rodar), 'abcdef1', 'marcador que não existe no histórico é descartado');
});

test('destinos e tipos iguais aos da coord-lib do repositório de código', { skip: temCoord ? false : 'fora do repositório de código' }, async () => {
  const lib = await import(pathToFileURL(join(RAIZ_CODIGO, 'scripts', 'coord-lib.mjs')).href);
  assert.deepEqual([...DESTINOS].sort(), [...lib.DESTINOS].sort());
  assert.deepEqual([...TIPOS].sort(), [...lib.TIPOS].sort());
});

test('o recado gerado pelo formulário aparece na caixa e no ler do coord.mjs de verdade', { skip: temCoord ? false : 'fora do repositório de código' }, () => {
  const raiz = tmp('recados-coord-');
  mkdirSync(join(raiz, 'scripts'));
  copyFileSync(COORD, join(raiz, 'scripts', 'coord.mjs'));
  copyFileSync(join(RAIZ_CODIGO, 'scripts', 'coord-lib.mjs'), join(raiz, 'scripts', 'coord-lib.mjs'));
  mkdirSync(join(raiz, '.coord'));
  writeFileSync(join(raiz, '.coord', 'donos.json'), JSON.stringify({ versao: 1, regras: [{ padrao: '**', dono: 'gerente-projetos' }] }));
  const r = processarEvento({ issue: { title: 'Pelo celular', user: { login: 'domontecristo' }, body: corpoDoFormulario({ cc: 'testes' }) } }, { raiz: join(raiz, '.coord'), autor: 'domontecristo', agora: AGORA });
  assert.equal(r.ok, 'true');
  const rodar = (...a) => spawnSync(process.execPath, [join(raiz, 'scripts', 'coord.mjs'), ...a], { cwd: raiz, encoding: 'utf8' });
  const caixa = rodar('caixa', 'gerente-projetos');
  assert.equal(caixa.status, 0, caixa.stderr);
  assert.match(caixa.stdout, /R-20261108-132842-alexandre\s+\[pedido\] de alexandre/);
  assert.match(caixa.stdout, /Pelo celular/);
  const copia = rodar('caixa', 'testes');
  assert.match(copia.stdout, /R-20261108-132842-alexandre/);
  const ler = rodar('ler', 'R-20261108-132842-alexandre');
  assert.equal(ler.status, 0, ler.stderr);
  assert.match(ler.stdout, /^---\nid: R-20261108-132842-alexandre\nde: alexandre\n/);
});
