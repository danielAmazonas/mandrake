const axios = require('axios').default;

const sendToWhatsapp = async (url, phone, apikey, text) => {
    const options = {
        method: 'GET',
        url,
        params: {
            source: 'HA',
            phone,
            apikey,
            text
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

module.exports = sendToWhatsapp;