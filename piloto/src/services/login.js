
//Função para validar o login teste
function validarLoginTeste() {
    console.log("Função validarLogin chamada");

    var nome = document.getElementById("nome").value;
    var senha = document.getElementById("senha").value;

    if (nome == "adm" || senha == "adm") {
        alert("Sucesso");
    }else{
        alert("Usuario ou senha incorretos");
    }

}
module.export = {
    validarLoginTeste,
    validarLogin
};


//Valida login 
async function validarLogin() {
    const email = document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;

    try {
        const resposta = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, senha })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            alert(dados.message); // Login bem-sucedido
        } else {
            alert(dados.message); // Email ou senha incorretos
        }
    } catch (erro) {
        console.error("Erro ao conectar com o servidor:", erro);
        alert("Erro ao conectar com o servidor.");
    }
}