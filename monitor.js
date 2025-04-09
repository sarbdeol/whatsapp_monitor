const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// === CONFIG ===
const { monitoredNumber, forwardToNumber } = require('./config');


// === Auth + Session ===
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "monitor-bot"
    })
});

// === QR Code Display ===
client.on('qr', qr => {
    console.log('📱 Scan this QR Code (first time only):');
    qrcode.generate(qr, { small: true });
});

// === Ready ===
client.on('ready', () => {
    console.log('✅ WhatsApp is ready and monitoring...');
});

// === Monitor Messages ===
client.on('message', async msg => {
    if (msg.from === monitoredNumber) {
        if (msg.hasMedia) {
            const media = await msg.downloadMedia();

            if (media) {
                console.log(`📷 Media received. MIME: ${media.mimetype}`);

                try {
                    // Forward with optional caption (if it's not a video)
                    if (media.mimetype.startsWith("video")) {
                        // Workaround: send without caption (WhatsApp is picky with video+caption)
                        await client.sendMessage(forwardToNumber, media);
                        console.log("🎬 Video forwarded.");
                    } else {
                        await client.sendMessage(forwardToNumber, media, { caption: msg.body || '' });
                        console.log("📸 Media forwarded with caption.");
                    }

                } catch (err) {
                    console.error("❌ Failed to forward media:", err);
                }

            } else {
                console.log("⚠️ Media could not be downloaded.");
            }
        } else {
            // Text message
            console.log(`💬 Forwarding text: ${msg.body}`);
            await client.sendMessage(forwardToNumber, `${msg.body}`);
        }
    }
});

client.initialize();
