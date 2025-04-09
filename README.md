# 📤 WhatsApp Message Monitor & Forward Bot

This Node.js bot monitors messages from a specific WhatsApp number (even broadcast messages) and automatically forwards them — including text, images, and videos — to another number.

Built with [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) for speed and reliability.

---

## 🚀 Features

- ✅ Real-time monitoring of a specific contact
- 🔁 Automatic forwarding of:
  - 📄 Text messages
  - 🖼️ Images
  - 🎥 Videos
- 🔐 Persistent session (no repeated QR scans)
- 🧩 Easy configuration via `config.js`

---

## 🧱 Requirements

- Node.js (v16+ recommended)
- A phone with active WhatsApp account
- [Google Chrome installed (for puppeteer)](https://www.google.com/chrome/)

---

## 📦 Installation

```bash
git clone https://github.com/sarbdeol/whatsapp_monitor.git
cd whatsapp-forward-bot

npm install
