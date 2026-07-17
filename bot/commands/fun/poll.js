const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a poll with up to 4 options')
    .addStringOption(o => o.setName('question').setDescription('What to ask').setRequired(true))
    .addStringOption(o => o.setName('option1').setDescription('First option').setRequired(true))
    .addStringOption(o => o.setName('option2').setDescription('Second option').setRequired(true))
    .addStringOption(o => o.setName('option3').setDescription('Third option'))
    .addStringOption(o => o.setName('option4').setDescription('Fourth option')),

  async execute(interaction) {
    const question = interaction.options.getString('question');
    const options = [
      interaction.options.getString('option1'),
      interaction.options.getString('option2'),
      interaction.options.getString('option3'),
      interaction.options.getString('option4'),
    ].filter(Boolean);

    const emojis = ['\u0031\ufe0f\u20e3', '\u0032\ufe0f\u20e3', '\u0033\ufe0f\u20e3', '\u0034\ufe0f\u20e3'];
    const optionsText = options.map((o, i) => `${emojis[i]} ${o}`).join('\n');

    const embed = new EmbedBuilder()
      .setTitle(`\uD83D\uDCCA ${question}`)
      .setDescription(optionsText)
      .setColor(0x5865f2)
      .setFooter({ text: `Poll by ${interaction.user.username}` })
      .setTimestamp();

    const msg = await interaction.reply({ embeds: [embed], withResponse: true });
    const message = msg.resource?.message ?? await interaction.fetchReply();
    for (let i = 0; i < options.length; i++) {
      await message.react(emojis[i]);
    }
  }
};
