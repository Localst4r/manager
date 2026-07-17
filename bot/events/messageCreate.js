const automod = require('../modules/automod');
const nsfwFilter = require('../modules/nsfwFilter');
const logging = require('../modules/logging');

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    if (message.author.bot) return;
    if (!message.guild) return;

    await automod.check(message, client);

    if (message.attachments.size > 0) {
      await nsfwFilter.check(message, client);
    }
  }
};
