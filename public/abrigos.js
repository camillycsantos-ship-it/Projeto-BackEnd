const listaAbrigos = document.getElementById("lista-abrigos");
const mensagemAbrigos = document.getElementById("mensagem-abrigos");

async function carregarAbrigos() {
    try {
        const resposta = await fetch("/api/abrigos");
        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os abrigos.");
        }

        const abrigos = await resposta.json();
        listaAbrigos.replaceChildren();

        if (abrigos.length === 0) {
            mensagemAbrigos.textContent = "Ainda não há abrigos cadastrados.";
            return;
        }

        mensagemAbrigos.textContent = "";

        for (const abrigo of abrigos) {
            const item = document.createElement("li");
            item.className = "shelter-card";

            const nome = document.createElement("h2");
            nome.textContent = abrigo.nome;

            const endereco = document.createElement("p");
            const complemento = abrigo.endereco.complemento
                ? `, ${abrigo.endereco.complemento}`
                : "";
            endereco.textContent = `${abrigo.endereco.rua}, ${abrigo.endereco.numero} - ${abrigo.endereco.bairro}${complemento}`;

            const avaliacao = document.createElement("p");
            avaliacao.className = "shelter-rating";
            avaliacao.textContent = `Avaliação: ${abrigo.avaliacao}`;

            item.append(nome, endereco, avaliacao);
            listaAbrigos.append(item);
        }
    } catch (error) {
        mensagemAbrigos.textContent = "Não foi possível carregar os abrigos.";
        mensagemAbrigos.dataset.status = "error";
    }
}

carregarAbrigos();
