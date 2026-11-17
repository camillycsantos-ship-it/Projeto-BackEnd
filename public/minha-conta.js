const nomeUsuario = document.getElementById("nome-usuario");
const mensagemConta = document.getElementById("mensagem-conta");
const listaAdocoes = document.getElementById("lista-adocoes");
const botaoSair = document.getElementById("botao-sair");
const botaoEditarPerfil = document.getElementById("botao-editar-perfil");
const formularioPerfil = document.getElementById("formulario-perfil");
const campoNome = document.getElementById("perfil-nome");
const campoEmail = document.getElementById("perfil-email");
const mensagemPerfil = document.getElementById("mensagem-perfil");
const botaoSalvarPerfil = formularioPerfil.querySelector('button[type="submit"]');

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
        campoNome.value = dados.nome;
        campoEmail.value = dados.email;
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

botaoEditarPerfil.addEventListener("click", () => {
    const estaAberto = botaoEditarPerfil.getAttribute("aria-expanded") === "true";
    formularioPerfil.hidden = estaAberto;
    botaoEditarPerfil.setAttribute("aria-expanded", String(!estaAberto));
    botaoEditarPerfil.textContent = estaAberto ? "Editar perfil" : "Cancelar edição";

    if (!estaAberto) {
        campoNome.focus();
    }
});

formularioPerfil.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    botaoSalvarPerfil.disabled = true;
    mensagemPerfil.textContent = "Salvando...";
    mensagemPerfil.dataset.status = "";

    try {
        const resposta = await fetch("/api/minha-conta", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome: campoNome.value,
                email: campoEmail.value
            })
        });

        if (resposta.status === 401) {
            window.location.href = "/login";
            return;
        }

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.mensagem || "Não foi possível atualizar o perfil.");
        }

        nomeUsuario.textContent = dados.usuario.nome;
        campoNome.value = dados.usuario.nome;
        campoEmail.value = dados.usuario.email;
        mensagemPerfil.textContent = dados.mensagem;
        mensagemPerfil.dataset.status = "success";
    } catch (erro) {
        mensagemPerfil.textContent = erro.message || "Não foi possível atualizar o perfil.";
        mensagemPerfil.dataset.status = "error";
    } finally {
        botaoSalvarPerfil.disabled = false;
    }
});

botaoSair.addEventListener("click", async () => {
    botaoSair.disabled = true;

    try {
        await fetch("/logout", { method: "POST" });
    } finally {
        window.location.href = "/login";
    }
});

carregarConta();