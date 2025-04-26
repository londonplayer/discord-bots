import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const content = [
	{ name: "bombardiro", imageLink: "./images/bombardiro_crocodilo.png" },
	{ name: "tralalero", imageLink: "./images/tralaleiro.jpeg" },
	{ name: "lirili", imageLink: "./images/lirili_larila.jpeg" },
	{ name: "sahur", imageLink: "./images/tung_tunh.jpeg" },
	{ name: "cavallo", imageLink: "./images/cavalo.jpeg" },
	{ name: "vaca", imageLink: "./images/la_vaca_saturno.jpeg" },
	{ name: "tripi", imageLink: "./images/trulimero.jpeg" },
	{ name: "trulimero", imageLink: "./images/trulimero.jpeg" },
    { name: "brasilini", imageLink: "./images/brasilini.png"}
];

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

	if (message.content.startsWith("!random")) {
		let randomIndex = Math.floor(Math.random() * content.length);

		message.reply({
			content: content[randomIndex].name,
			files: [content[randomIndex].imageLink],
		});
	}

	content.forEach((item) => {
		const itemsName = item.name;
		const itemImage = item.imageLink;

		if (message.content.startsWith(`!${item.name}`)) {
			message.reply({
				content: itemsName,
				files: [itemImage],
			});
		}
	});
});

client.login(process.env.DISCORD_TOKEN);
