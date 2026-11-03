const form = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");
const botao = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    botao.disabled = true;
    botao.textContent = "Criando conta...";
    mensagem.textContent = "";
    mensagem.dataset.status = "";

    try {
        const resposta = await fetch("/cadastro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, email, senha })
        });

        const dados = await resposta.json();
        if (!resposta.ok) {
            throw new Error(dados.mensagem || "Não foi possível criar sua conta.");
        }

        mensagem.textContent = dados.mensagem;
        mensagem.dataset.status = "success";
        form.reset();
    } catch (erro) {
        console.error(erro);
        mensagem.textContent = erro.message || "Não foi possível conectar ao servidor. Tente novamente.";
        mensagem.dataset.status = "error";
    } finally {
        botao.disabled = false;
        botao.textContent = "Criar conta";
    }
});