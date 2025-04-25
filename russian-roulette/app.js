import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

client.once("ready", () => {
	console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
	if (message.author.bot) return;

	if (message.content.startsWith("!ping")) {
		message.reply("Pong!");
	}

	if (message.content.startsWith("!play")) {
		let randomInt = Math.floor(Math.random() * 6);
		if (randomInt === 2) {
			message.reply("Que pena... você morreu!");
		} else {
			message.reply("Vivo!");
		}
	}
});

client.login(process.env.DISCORD_TOKEN);
