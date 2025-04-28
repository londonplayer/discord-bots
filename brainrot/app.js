import { Client, GatewayIntentBits, EmbedBuilder, Collection } from "discord.js";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

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
	{ name: "brasilini", imageLink: "./images/brasilini.png" },
];

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	if ("data" in command && "execute" in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(
			`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
		);
	}
}

client.once("ready", () => {
	console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({
			content: "There was an error while executing this command!",
			ephemeral: true,
		});
	}
});

client.login(process.env.DISCORD_TOKEN);
