

function populateUfs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(estados => {

            //  popula o campo estados
                        //esse const e opcional
            for (const estado of estados) {
                ufSelect.innerHTML += `<option value="${estado.id}">${estado.nome}</option>`
            }
        })
}

populateUfs()

//  popula as cidades conforme o estado

function getCities(event) {
    //  procura as tags html
    const citySelect = document.querySelector("select[name=city]")
    const botaoHiddenState = document.querySelector("input[name=bState]")

    //  pega o valor (do estado) no botao hidden
    const ufValue = event.target.value
    const indexSelecState = event.target.selectedIndex
    botaoHiddenState.value = event.target.options[indexSelecState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    //  funcao para popular campo cidades
    fetch(url)
    .then(res => res.json() )
    .then(cidades => {
        //esse const e opcional
        for (const cidade of cidades) {
            citySelect.innerHTML += `<option value="${cidade.id}">${cidade.nome}</option>`
        }

        citySelect.disabled = false;
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)