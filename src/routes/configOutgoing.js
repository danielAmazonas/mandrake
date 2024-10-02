require('dotenv').config();

const outgoingString = process.env.OUTGOINGS; // Captura a string da variável de ambiente

// Divide a string em partes usando ':' como delimitador
const outgoingGroups = outgoingString.split(':');

// Cria o objeto config
const config = outgoingGroups.reduce((acc, group) => {
    const [name, phonesString] = group.split('[');
    const phonesArray = phonesString.slice(0, -1).split(',').map(phone => phone.trim()); // Remove o ']' e divide os números

    // Remove a palavra "output" do nome
    const cleanName = name.replace('_output', '').trim();

    // Cria o objeto para cada canal
    acc[cleanName] = {
        name: `🌐 Canal ${cleanName.toUpperCase().replace(/_/g, ' ')}:`,
        phones: phonesArray
    };

    return acc; // Retorna o acumulador
}, {});

const channelArray = Object.entries(config).map(([key, channel]) => {
    return {
        id: key,
        name: channel.name,
        phones: channel.phones
    };
});

module.exports = channelArray;