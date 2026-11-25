/* Utilidades compartilhadas por todas as paginas */
const MARCA = "Casa de Patas";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const PATA = '<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="16.5" rx="5" ry="4"/><ellipse cx="5.5" cy="11" rx="2" ry="2.6"/><ellipse cx="9.5" cy="6.5" rx="2" ry="2.8"/><ellipse cx="14.5" cy="6.5" rx="2" ry="2.8"/><ellipse cx="18.5" cy="11" rx="2" ry="2.6"/></svg>';

/* O backend responde erros como { mensagem } ou { erro }, e a validacao do zod como { mensagem, erros: [{campo, mensagem}] } */
function mensagemDeErro(d) {
  if (!d) return "Não foi possível falar com o servidor.";
  if (Array.isArray(d.erros) && d.erros.length) return d.erros.map((e) => `${e.campo}: ${e.mensagem}`).join("; ");
  return d.mensagem || d.erro || "Algo deu errado. Tente novamente.";
}

async function api(url, { method = "GET", body } = {}) {
  let res;
  try {
    res = await fetch(url, {
      method, credentials: "same-origin",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Sem conexão com o servidor. Confira se ele está rodando.");
  }
  const dados = await res.json().catch(() => null);
  if (!res.ok) throw new Error(mensagemDeErro(dados));
  return dados;
}

function aviso(texto, ruim = false) {
  let area = $("#avisos");
  if (!area) { area = document.createElement("div"); area.id = "avisos"; area.setAttribute("aria-live", "polite"); document.body.append(area); }
  const el = document.createElement("div");
  el.className = "aviso-flutua" + (ruim ? " ruim" : "");
  el.textContent = texto;
  area.append(el);
  setTimeout(() => el.remove(), 4200);
}

/* Sessao: GET /api/sessao devolve { nome } ou 404 */
let SESSAO = null;
async function iniciar() {
  try { SESSAO = await api("/api/sessao"); } catch { SESSAO = null; }
  const atual = location.pathname.replace(/\/$/, "") || "/";
  const link = (href, txt) => `<a href="${href}"${atual === href ? ' aria-current="page"' : ""}>${txt}</a>`;
  $("#topo").innerHTML = `<div class="topo-in">
    <a class="marca" href="/">${PATA}${MARCA}</a>
    <nav class="menu" aria-label="Principal">${link("/", "Início")}${link("/animais", "Animais")}${link("/abrigos", "Abrigos")}${link("/contact", "Contato")}</nav>
    <div class="sessao">${SESSAO
      ? `<a class="btn btn-borda btn-sm" href="/minha-conta" id="sessao-nome">Olá, ${esc(SESSAO.nome.split(" ")[0])}</a><button class="btn btn-link" id="sair" type="button">Sair</button>`
      : `<a class="btn btn-borda btn-sm" href="/login">Entrar</a><a class="btn btn-rosa btn-sm" href="/cadastro">Criar conta</a>`}</div></div>`;
  $("#rodape").innerHTML = `${MARCA}. Adote com carinho e responsabilidade.<br><a href="/animais">Animais</a><a href="/abrigos">Abrigos</a><a href="/contact">Contato</a>`;
  $("#rodape").className = "rodape";
  $("#sair")?.addEventListener("click", async () => {
    try { await api("/logout", { method: "POST" }); location.href = "/"; } catch (e) { aviso(e.message, true); }
  });
}

/* Animais */
const SITUACOES = { Disponivel: ["Disponível", "ok"], "Em processo": ["Em processo", "wait"], Adotado: ["Adotado", "done"] };
const selo = (s) => { const [t, c] = SITUACOES[s] || [s, "wait"]; return `<span class="selo selo-${c}">${esc(t)}</span>`; };
const idadeTxt = (n) => (n === 0 ? "Menos de 1 ano" : `${n} ${n === 1 ? "ano" : "anos"}`);
const semCapa = (c) => !c || c.includes("placehold.co");
const fotoAnimal = (a) => semCapa(a.cover)
  ? `<div class="arco sem-foto" role="img" aria-label="Sem foto de ${esc(a.nome)}"></div>`
  : `<div class="arco"><img src="${esc(a.cover)}" alt="Foto de ${esc(a.nome)}" loading="lazy" onerror="this.parentElement.classList.add('sem-foto');this.remove()"></div>`;

function cartaoAnimal(a) {
  const disp = a.situacao === "Disponivel";
  return `<article class="pet" data-id="${esc(a._id)}">
    ${fotoAnimal(a)}
    <div class="pet-corpo">
      <h3>${esc(a.nome)}</h3>
      <p class="pet-meta">${esc(a.especie)}, ${idadeTxt(a.idade)}</p>
      ${selo(a.situacao)}
      <button class="btn btn-rosa" type="button" data-adotar${disp ? "" : " disabled"}>${disp ? "Quero adotar" : "Indisponível"}</button>
    </div></article>`;
}

/* POST /api/adocoes { animalId } exige sessao */
async function adotar(animalId) {
  if (!SESSAO) {
    aviso("Entre na sua conta para demonstrar interesse.", true);
    setTimeout(() => (location.href = "/login?next=" + encodeURIComponent(location.pathname)), 1300);
    return false;
  }
  try { const r = await api("/api/adocoes", { method: "POST", body: { animalId } }); aviso(r.mensagem); return true; }
  catch (e) { aviso(e.message, true); return false; }
}

function destinoSeguro() {
  const n = new URLSearchParams(location.search).get("next");
  return n && n.startsWith("/") && !n.startsWith("//") ? n : "/minha-conta";
}
function mostrarErro(form, msg) {
  const el = $(".erro", form); el.textContent = msg; el.hidden = !msg;
}
