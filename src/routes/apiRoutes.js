const sendToWhatsapp = require('../components/sendToWhatsapp');
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
        this.router.get('/whatsapp/webhook', this.getWhatsappWebhook.bind(this));
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

    async getWhatsappWebhook(req, res) {
        console.log('Requisição recebida:', req.body);
        const { text, user } = req.body; // Captura o texto e o usuário

        console.log(`Mensagem recebida de ${user}: ${text}`);

        // Envia a resposta após a chamada da API
        res.json({
            text: `Recebi sua mensagem: "${text}"`,
        });

        try {
            const result = await sendToWhatsapp('https://api.callmebot.com/whatsapp.php', process.env.PHONE, process.env.API_KEY_CALLMEBOT, text);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao enviar mensagem.' });
        }
        
    }

    postTeamsWebhook(req, res) {
        res.json({
            teams_webhook: 'teams_webhook'
        })
    }
}

module.exports = ApiRoutes;