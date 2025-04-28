import { SlashCommandBuilder } from "discord.js";

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

module.exports = {
	data: new SlashCommandBuilder()
		.setName("random")
		.setDescription("Replies with a random brainrot meme!"),
	async execute(interaction) {
		let randomIndex = Math.floor(Math.random() * content.length);
		await interaction.reply({
			content: content[randomIndex].name,
			files: [content[randomIndex].imageLink],
		});
	},
};
