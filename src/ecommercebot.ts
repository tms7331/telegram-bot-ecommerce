import { Bot } from 'grammy';
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
            'content': `You are an intelligent assistant tasked with providing help to users for a storefront that sells sci-fi novels.
Here is the inventory, each line of which has the format: ID|Title|Author|Price|ISBN|Genre|Stock|Rating
${inventory}
And here is the list of purchases made by this user, each line of which has the format: ID|Title|Author|Price|ISBN|Genre|Stock|Rating
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
    const senderName = ctx.update["message"]?.from.username;
    const respText = `Greetings, @${senderName}! I am EcommerceBot, a bot that can help you navigate the storefront.\n
I can help you view the inventory, recommend books based on your past purchases, and buy new items.`;
    ctx.reply(respText);
});



bot.on('message', async (ctx) => {
    const text = ctx.message?.text;
    // const senderName = ctx.update["message"]?.from.username;
    // const senderId = ctx.update["message"]?.from.id;
    const result = await genResponse(inventory, purchases, text!);
    const respText = `${result}`;
    ctx.reply(respText);
});


bot.start();
