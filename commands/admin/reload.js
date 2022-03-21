const bot = require("../../index")

module.exports = {
    name: "reload",
    category: "admin",
    devOnly: true,
    run: async ({client, message, args}) => {

        bot.client = client;
 
        const msg = await message.reply("Reloading Commands:");
        client.loadCommands(bot, true);
        
        await msg.edit("Reloading events");
        client.loadEvents(bot, true);

        await msg.edit("Reloading slash-commands");
        client.loadSlashCommands(bot, true);

        await msg.edit("Reloading buttons");
        client.loadButtons(bot, true);

        await msg.edit("Reload complete!");

    }
}




