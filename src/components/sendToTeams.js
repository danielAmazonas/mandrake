const axios = require('axios').default;

const sendToTeams = async (url, text) => {
    const options = {
        method: 'POST',
        url,
        headers: {'Content-Type': 'application/json'},
        data: {
            text: text
        },
    }
    try {
        const response = await axios.request(options);
        console.log('Resposta da API:', response.data);
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error.message || error);
        throw new Error('Erro ao enviar mensagem.');
    }
}

module.exports = sendToTeams;