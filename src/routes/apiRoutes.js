const textVersion = require('textversionjs');
const sendToWhatsapp = require('../components/sendToWhatsapp');
const sendToTeams = require('../components/sendToTeams');
const channelArray = require('./configOutgoing');
const { version } = require('../../package.json');
require('dotenv').config();

class ApiRoutes {
    constructor(router) {
        this.router = router;
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/', this.hello);
        this.router.get('/version', this.getVersion);
        this.router.post('/whatsapp/webhook', this.postWhatsappWebhook.bind(this));
        this.router.post('/teams/webhook', this.postTeamsWebhook.bind(this));
    }

    hello(req, res) {
        res.json({
            hello: 'hi'
        });
    }

    getVersion(req, res) {
        res.json({
            version: version
        });
    }

    async postWhatsappWebhook(req, res) {
        // console.log('Requisição recebida:', req.body);
        const { text } = req.body; // Captura o texto e o usuário

        console.log(`Mensagem recebida: ${text}`);

        try {
            channelArray.map(async (data) => {
                if (data.id === 'eqscl') {
                    
                    // Envia mensagens para cada telefone
                    await Promise.all(data.phones.map(async (phone) => {
                        const result = await sendToWhatsapp('https://api.callmebot.com/whatsapp.php', phone, process.env.API_KEY_CALLMEBOT, data.name);
                    }));
            
                    // Envia a resposta após a chamada da API
                    res.json({
                        text: `Recebi sua mensagem: "${text}"`,
                    });
                }
            });

        } catch (error) {
            console.error('Erro ao enviar mensagem:', error.message || error);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Erro ao enviar mensagem.' });
            }
        }
    }

    postTeamsWebhook(req, res) {
        const { text } = req.body; // Captura o texto e o usuário

        try {
            const result = sendToTeams(`${process.env.TEAMS_WEBHOOK_URL}`, text);
            
            res.json({
                teams_webhook: 'teams_webhook'
            });
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error.message || error);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Erro ao enviar mensagem.' });
            }
        }
        
    }
}

module.exports = ApiRoutes;