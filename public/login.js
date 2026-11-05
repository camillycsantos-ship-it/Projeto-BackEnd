const form = document.getElementById("formLogin");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    try {
        const resposta = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, senha })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.mensagem || "Erro ao fazer login.");
        }

        window.location.href = "/minha-conta";
    } catch (erro) {
        mensagem.textContent = erro.message || "Não foi possível entrar. Tente novamente.";
        mensagem.dataset.status = "error";
    }
});