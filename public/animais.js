const listaAnimais = document.getElementById("lista-animais");
const mensagemAnimais = document.getElementById("mensagem-animais");

async function carregarAnimais() {
    try {
        const resposta = await fetch("/animais");
        const animais = await resposta.json();
        listaAnimais.replaceChildren();

        if (animais.length === 0) {
            mensagemAnimais.textContent = "Ainda não há animais cadastrados.";
            return;
        }

        mensagemAnimais.textContent = "";

        for (const animal of animais) {
            const item = document.createElement("li");
            item.className = "animal-item";

            const detalhes = document.createElement("div");
            const nome = document.createElement("h2");
            nome.textContent = animal.nome;

            const descricao = document.createElement("p");
            descricao.textContent = `${animal.especie} · ${animal.idade} anos · ${animal.situacao}`;

            detalhes.append(nome, descricao);
            item.append(detalhes);

            if (animal.situacao === "Disponivel") {
                const botao = document.createElement("button");
                botao.className = "button-secondary";
                botao.type = "button";
                botao.textContent = "Tenho interesse";
                botao.addEventListener("click", () => demonstrarInteresse(animal._id, botao));
                item.append(botao);
            }

            listaAnimais.append(item);
        }
    } catch (erro) {
        mensagemAnimais.textContent = "Não foi possível carregar os animais.";
        mensagemAnimais.dataset.status = "error";
    }
}

async function demonstrarInteresse(animalId, botao) {
    botao.disabled = true;

    try {
        const resposta = await fetch("/api/adocoes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ animalId })
        });
        const dados = await resposta.json();

        if (resposta.status === 401) {
            window.location.href = "/login";
            return;
        }

        if (!resposta.ok) {
            throw new Error(dados.mensagem || "Não foi possível registrar seu interesse.");
        }

        await carregarAnimais();
        mensagemAnimais.textContent = dados.mensagem;
    } catch (erro) {
        mensagemAnimais.textContent = erro.message || "Não foi possível registrar seu interesse.";
        mensagemAnimais.dataset.status = "error";
        botao.disabled = false;
    }
}

carregarAnimais();