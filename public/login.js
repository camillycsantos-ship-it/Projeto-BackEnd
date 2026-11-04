const form = document.getElementById("formLogin");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

const email = document.getElementById("email").value.trim();
const senha = document.getElementById("senha").value;

const resposta = await fetch("/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, senha })
});

const dados = await resposta.json();

if (!resposta.ok) {
    alert(dados.mensagem || "Erro ao fazer login");
    return;
}

    alert(dados.mensagem);
});