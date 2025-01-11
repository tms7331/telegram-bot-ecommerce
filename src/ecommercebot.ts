import { Bot, InlineKeyboard } from 'grammy';
import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';
import { inventory } from './inventory.js';
import { purchases } from './purchases.js';

dotenv.config();

const botKey = process.env.BOT_KEY;
const chatgptKey = process.env.CHATGPT_KEY;
const bot = new Bot(botKey!);
const openai = new OpenAI({ apiKey: chatgptKey });


async function genResponse(inventory: string, purchases: string, message: string) {
    const completion = await openai.chat.completions.create({
        messages: [{
            'role': 'system',
            'content': `You are an intelligent assistant tasked with providing help to users for a storefront that sells sci-fi novels.  They might ask a variety of questions, your task is to help with anything they ask.
Here is the store inventory, each line of which has the format: ID|Title|Author|Price|Genre|Stock|Rating
${inventory}
And here is the list of purchases made by this user, each line of which has the format: ID|Title|Author|Price|Genre|Stock|Rating
${purchases}`
        },
        {
            'role': 'user',
            'content': message,
        },
        ],
        model: "gpt-3.5-turbo",
    });
    console.log(completion.choices[0]);
    return completion.choices[0].message["content"];
}


bot.command('start', async (ctx) => {
    await ctx.api.setMyCommands([
        { command: "buy", description: "Open Shop" },
        { command: "reader", description: "Open Reader" },
        { command: "inventory", description: "View Inventory" },
    ]);
    const senderName = ctx.update["message"]?.from.username;
    const respText = `Hello, @${senderName}! I am E-commerceBot, a bot that can help you navigate the science fiction book storefront.\n
I can help you view the inventory, recommend books based on your past purchases, and buy new items.\n
\\inventory to view the inventory, \\shop to open the integrated shop, or \\reader to open the integrated reader\n
Or you can chat with me to get help and recommendations`;
    ctx.reply(respText);
});


bot.command("buy", (ctx) => {
    ctx.reply("Click below to open the shop:", {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Open Shop",
                        web_app: { url: "https://telegram-bot-ecommerce-frontend.vercel.app/store" },
                    },
                ],
            ],
        },
    });
});

bot.command("reader", (ctx) => {
    ctx.reply("Click below to open the reader:", {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Open Reader",
                        web_app: { url: "https://telegram-bot-ecommerce-frontend.vercel.app/reader" },
                    },
                ],
            ],
        },
    });
});


bot.command("inventory", (ctx) => {
    ctx.reply(inventory);
});


bot.on('message', async (ctx) => {
    const text = ctx.message?.text;
    // const senderId = ctx.update["message"]?.from.id;
    // NOTE - in reality would want to user sender's id to retrieve their purchases
    const result = await genResponse(inventory, purchases, text!);
    const respText = `${result}`;
    ctx.reply(respText);
});


bot.start();
