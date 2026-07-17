const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dashboard')
    .setDescription('Get the link to the local web dashboard')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('Web Dashboard')
      .setDescription('The dashboard is currently running on this machine.\n\nClick below to access it. Log in with the password configured in your `.env` file.')
      .setColor(0x5865f2)
      .setURL('http://localhost:3000');
    
    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
