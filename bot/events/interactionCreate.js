module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {

    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      const fs = require('fs');
      const path = require('path');
      let config = {};
      try { config = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../data/config.json'), 'utf8')); } catch {}
      
      const perms = config.commandPerms?.[command.data.name];
      if (perms && !interaction.member.permissions.has(8n)) {
        const hasRole = perms.roles?.some(r => interaction.member.roles.cache.has(r));
        const hasUser = perms.users?.includes(interaction.user.id);
        if (!hasRole && !hasUser) {
          return interaction.reply({ content: 'you do not have permission to use this command', ephemeral: true });
        }
      }

      const { cooldowns } = client;
      if (!cooldowns.has(command.data.name)) cooldowns.set(command.data.name, new Map());
      const now = Date.now();
      const timestamps = cooldowns.get(command.data.name);
      const cooldownMs = (command.cooldown || 3) * 1000;

      if (timestamps.has(interaction.user.id)) {
        const expiry = timestamps.get(interaction.user.id) + cooldownMs;
        if (now < expiry) {
          const sLeft = ((expiry - now) / 1000).toFixed(1);
          return interaction.reply({
            content: `chill out lol, wait ${sLeft}s before using that again`,
            ephemeral: true
          });
        }
      }

      timestamps.set(interaction.user.id, now);
      setTimeout(() => timestamps.delete(interaction.user.id), cooldownMs);

      try {
        await command.execute(interaction, client);
      } catch (err) {
        console.error(`[Command Error] /${command.data.name}:`, err);
        const errMsg = { content: 'something broke on my end, try again in a sec', ephemeral: true };
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp(errMsg).catch(() => {});
        } else {
          await interaction.reply(errMsg).catch(() => {});
        }
      }
    }

    if (interaction.isButton()) {
      const parts = interaction.customId.split(':');
      const action = parts[0];

      try {
        if (action === 'bj') {
          const bjCmd = client.commands.get('blackjack');
          if (bjCmd && bjCmd.handleButton) await bjCmd.handleButton(interaction, parts.slice(1));
        }
      } catch (err) {
        console.error('[Button Error]', err);
        if (!interaction.replied && !interaction.deferred) {
          await interaction.reply({ content: 'something went wrong with that button', ephemeral: true }).catch(() => {});
        }
      }
    }
  }
};
