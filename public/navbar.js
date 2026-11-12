const linkCadastro = document.querySelector("[data-nav-register]");
const linkConta = document.querySelector("[data-nav-account]");

if (linkCadastro && linkConta) {
    fetch("/api/sessao")
        .then(async (resposta) => {
            if (!resposta.ok) {
                return;
            }

            const usuario = await resposta.json();
            if (!usuario.nome) {
                return;
            }

            linkCadastro.hidden = true;
            linkConta.textContent = usuario.nome;
            linkConta.setAttribute("aria-label", `Minha conta: ${usuario.nome}`);
        })
        .catch(() => {});
}