const nomeUsuario = document.getElementById("nome-usuario");
const mensagemConta = document.getElementById("mensagem-conta");
const listaAdocoes = document.getElementById("lista-adocoes");
const botaoSair = document.getElementById("botao-sair");

async function carregarConta() {
    try {
        const resposta = await fetch("/api/minha-conta");

        if (resposta.status === 401) {
            window.location.href = "/login";
            return;
        }

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.mensagem || "Não foi possível carregar sua conta.");
        }

        nomeUsuario.textContent = dados.nome;
        listaAdocoes.replaceChildren();

        if (dados.adocoes.length === 0) {
            mensagemConta.textContent = "Você ainda não demonstrou interesse em nenhum animal.";
            return;
        }

        mensagemConta.textContent = "";

        for (const adocao of dados.adocoes) {
            const item = document.createElement("li");
            item.className = "animal-item";

            const detalhes = document.createElement("div");
            const nome = document.createElement("h2");
            nome.textContent = adocao.animal.nome;

            const especie = document.createElement("p");
            especie.textContent = `${adocao.animal.especie} · ${adocao.animal.idade} anos`;

            const status = document.createElement("span");
            status.className = "adoption-status";
            status.textContent = adocao.status;

            detalhes.append(nome, especie, status);
            item.append(detalhes);
            listaAdocoes.append(item);
        }
    } catch (erro) {
        mensagemConta.textContent = erro.message || "Não foi possível carregar sua conta.";
        mensagemConta.dataset.status = "error";
    }
}

botaoSair.addEventListener("click", async () => {
    botaoSair.disabled = true;

    try {
        await fetch("/logout", { method: "POST" });
    } finally {
        window.location.href = "/login";
    }
});

carregarConta();