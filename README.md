# Telegram Ecommerce Bot

This repository contains a Telegram bot prototype designed for building an ecommerce store directly within Telegram. The example implementation is a science fiction book store, but the code is generic and can be adapted to create any type of store.

---

## Features

### 1. Chatbot Functionality
- Chat directly with the bot to get recommendations and explore the store.
- Personalized awareness of:
  - Items available in the store.
  - Your past purchases.

### 2. Integrated Store
- Access the store as a Telegram Web App.
- Browse and purchase items directly within Telegram.

### 3. Integrated Reader
- Read books you've purchased directly through the bot.

---

## Built With

### Backend
- **[grammY](https://grammy.dev/)**: A powerful framework for building Telegram bots in TypeScript/JavaScript.

### Frontend
- **[Next.js](https://nextjs.org/)**: Provides the web app for the store. The frontend repository is available at [https://github.com/tms7331/telegram-bot-ecommerce-frontend](https://github.com/tms7331/telegram-bot-ecommerce-frontend).

---

## Deployment
The bot is deployed at [t.me/ecommerceaibot](https://t.me/ecommerceaibot).

---

## Setup and Installation

### Prerequisites
Ensure you have the following ready:
- **Telegram Bot Token**: Obtain from [BotFather](https://telegram.me/BotFather).
- **OpenAI API Key**: Obtain from [OpenAI](https://openai.com/api/).

### Steps
1. Clone this repository:
   ```bash
   git clone https://github.com/tms7331/telegram-bot-ecommerce.git
   cd telegram-bot-ecommerce
   ```

2. Configure environment variables:
   - Copy `env.example` to `.env`:
     ```bash
     cp env.example .env
     ```
   - Edit `.env` with your own values:
     - `BOT_KEY`: Your Telegram bot token from BotFather.
     - `CHATGPT_KEY`: Your OpenAI API key.

3. Install dependencies:
   ```bash
   npm install
   ```

4. Build the project:
   ```bash
   tsc
   ```

5. Run the bot:
   ```bash
   node dist/index.js
   ```

---

## License
This project is licensed under the [MIT License](LICENSE).

