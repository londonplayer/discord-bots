const { SlashCommandBuilder } = require("discord.js");

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
    .setName("content")
    .setDescription("Replies with specific brainrot meme!")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The name of meme")
        .setRequired(true)
    ),
  async execute(interaction) {
    const name = interaction.options.getString("name");
    const item = content.find((c) => c.name === name);

    if (!item) {
      await interaction.reply({
        content: "Meme not found!",
        ephemeral: true,
      });
      return;
    }

    await interaction.reply({
      content: item.name,
      files: [item.imageLink],
    });
  },
};
