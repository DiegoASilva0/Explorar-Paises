let inputPesquisarPais = document.getElementById("pesquisarPais");

let nomePais = document.getElementById("nomePais");
let populacao = document.getElementById("populacao");
let capital = document.getElementById("capital");
let moeda = document.getElementById("moeda");
let idioma = document.getElementById("idioma");
let continente = document.querySelectorAll(".continente");
let descricao = document.getElementById("info_principais");
let bandeira = document.getElementById("bandeiras");

let mensagem = document.getElementById("msg");

let botoesContinentes = document.querySelectorAll(".card-button");
let listaPaises = document.getElementById("msg_paises");
let botoesPaises = listaPaises.querySelectorAll(".card-paises");


// ==============================
// API
// ==============================

const URL = `https://countries.dev/countries`;

let paises = [];
let paisesFiltrados;
let paisSelecionado;

// ==============================
// BUSCAR PAÍSES NA API
// ==============================

async function chamarPaises() {

    try {
        const response = await fetch(URL);
        if (response.status === 200) {
            const resultado = await response.json();
            return resultado;
        } else {
            alert("❌ Não foi possível carregar os países.");
        }
    } catch {
        alert("❌ Não foi possível carregar os países.");
    }
}


// ==============================
// PESQUISA
// ==============================

inputPesquisarPais.addEventListener("input", () => {

    pesquisarPais();

});

async function pesquisarPais() {

    paises = await chamarPaises();

    let pesquisado = inputPesquisarPais.value.toLowerCase();

    let paisEncontrado = paises.find((pais) => {

        let nome = pais.name.toLowerCase();

        return nome.includes(pesquisado);

    });

    if (paisEncontrado) {
        atualizarTextoPais(paisEncontrado);
    }

}

// ==============================
// ATUALIZAR INFORMAÇÕES DO PAÍS
// ==============================

function atualizarTextoPais(paisAtualizado) {
    nomePais.innerHTML = paisAtualizado.name;

    populacao.innerHTML =
        paisAtualizado.population.toLocaleString("pt-BR");

    capital.innerHTML = paisAtualizado.capital;

    idioma.innerHTML =
        paisAtualizado.languages[0].name;

    moeda.innerHTML =
        `${paisAtualizado.currencies[0].symbol} - (${paisAtualizado.currencies[0].code})`;

    continente.forEach((elemento) => {

        elemento.innerHTML = paisAtualizado.subregion;

    });

    bandeira.innerHTML =
        `<img src="${paisAtualizado.flags.png}">`;

    descricao.innerHTML =
        `${paisAtualizado.name} está localizado na região da ${paisAtualizado.subregion}, no continente ${paisAtualizado.region}. Sua capital é ${paisAtualizado.capital}.`;

}

// ==============================
// BOTÕES DOS CONTINENTES
// ==============================

botoesContinentes.forEach(function(botao) {

    botao.addEventListener("click", function(event) {

        let textoBotao = event.currentTarget.innerText.trim();

        listaPaises.innerHTML = "";


        if (textoBotao == "Todos") {
            mostrarTodosPaises();
        }

        if (textoBotao == "Ásia") {
            filtrarContinentes("Asia");
        }

        if (textoBotao == "África") {
            filtrarContinentes("Africa");
        }

        if (textoBotao == "Europa") {
            filtrarContinentes("Europe");
        }

        if (textoBotao == "Oceania") {
            filtrarContinentes("Oceania");
        }

        if (textoBotao == "América do Sul") {

            let americadoDoSul;

            americadoDoSul = paises.filter((pais) => {

                return pais.subregion === "South America";

            });

            americadoDoSul.forEach((pais) => {

                listaPaises.innerHTML += `
                    <button class="card-paises">
                        <img src="${pais.flags.png}">
                        ${pais.name}
                    </button>
                `;

            });

            botoesPaises = listaPaises.querySelectorAll(".card-paises");

            eventAtualizarBotaoPaises(botoesPaises)

        }

        if (textoBotao == "América do Norte") {

            let americadoDoNorte;

            americadoDoNorte = paises.filter((pais) => {

              return pais.subregion === "Northern America" || pais.subregion === "North America";

            });

            americadoDoNorte.forEach((pais) => {

                listaPaises.innerHTML += `
                    <button class="card-paises">
                        <img src="${pais.flags.png}">
                        ${pais.name}
                    </button>
                `;

            });

            botoesPaises = listaPaises.querySelectorAll(".card-paises");

            

            eventAtualizarBotaoPaises(botoesPaises)

        }

    });

});

// ==============================
// FILTRAR CONTINENTES
// ==============================

function filtrarContinentes(continente) {

    paisesFiltrados = paises.filter((pais) => {

        return pais.region === continente;

    });

    paisesFiltrados.forEach((pais) => {

        listaPaises.innerHTML += `
            <button class="card-paises">
                <img src="${pais.flags.png}">
                ${pais.name}
            </button>
        `;

    });

    botoesPaises = listaPaises.querySelectorAll(".card-paises");

    eventAtualizarBotaoPaises(botoesPaises)

}


// ==============================
// MOSTRAR TODOS OS PAÍSES
// ==============================

function mostrarTodosPaises() {

    paises.forEach((pais) => {

        listaPaises.innerHTML += `
            <button class="card-paises">
                <img src="${pais.flags.png}">
                ${pais.name}
            </button>
        `;

    });

    botoesPaises = listaPaises.querySelectorAll(".card-paises");

    eventAtualizarBotaoPaises(botoesPaises)
}

function eventAtualizarBotaoPaises(botoesPaises){
    botoesPaises.forEach(function(botao) {

        botao.addEventListener("click", function(event) {

            let textoBotao =
                event.currentTarget.innerText.trim();

            paisSelecionado = paises.find((pais) => {

                return pais.name === textoBotao;

            });

            atualizarTextoPais(paisSelecionado);

        });

    });
}


// ==============================
// INICIAR
// ==============================

pesquisarPais();