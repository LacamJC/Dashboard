const json = require("./MEDIAS.json")

const DADOS_2023 = json.ANO_2023
const DADOS_2024 = json.ANO_2024
const DADOS_2025 = json.ANO_2025


const media_2023 = media_mensal(DADOS_2023)
const media_2024 = media_mensal(DADOS_2024)
const media_2025 = media_mensal(DADOS_2025)
const media_mensal_total = Math.round((media_2023 + media_2024 + media_2025) / 3)

const MENSAIS = [ media_2024,media_2025]

console.log((media_2024 + media_2025) / 2)

module.exports = { MENSAIS }

function media_mensal(ano) {

    var meses = ano.meses
    var array = []

    var chamados_mes = 0
    var qtd_mes = 0;

    for (let chave in meses) {
        qtd_mes++
        array.push([chave, meses[chave]])
    }

    array.forEach(indice => {
        chamados_mes += indice[1].chamados_finalizados
    });

    const media = chamados_mes / qtd_mes

    return Math.round(media)
}



function media_trimestral(ano) {
    var media_trimestre = ano.trimestre.chamados_finalizados

    // TRIMESTRE JA ESTA EM MEDIA

  

}


media_trimestral(DADOS_2023)






function gerar_dados() {
    console.log(`
            // Média mensal de 2023: ${media_mensal(DADOS_2023)}
            // Média mensal de 2024: ${media_mensal(DADOS_2023)}
            // Média mensal de 2025: ${media_mensal(DADOS_2025)}
            
            // Média mensal total: ${media_mensal_total}
        `)
}

