const bot = require("../../index")

module.exports = {
    name: "reload",
    category: "admin",
    devOnly: true,
    run: async ({client, message, args}) => {

        bot.client = client;

        const msg = await message.reply("Reloading...");

        switch(args.toString().toLowerCase()){
            case "events":
                await msg.edit("Reloading events:");
                client.loadEvents(bot, true);
            break;

            case "commands":
                await msg.edit("Reloading commands:");
                client.loadCommands(bot, true);
            break;

            case "slashcommands":
                await msg.edit("Reloading slash-commands:");
                client.loadSlashCommands(bot, true);
            break;

            case "buttons":
                await msg.edit("Reloading buttons:");
                client.loadButtons(bot, true);
            break;

            case "trigger":
            case "triggers":
                await msg.edit("Reloading triggers:");
                client.loadTriggers(bot, true);
            break;

            default:
                await msg.edit("Reloading events:");
                client.loadEvents(bot, true);
        
                await msg.edit("Reloading commands:");
                client.loadCommands(bot, true);

                await msg.edit("Reloading slash-commands:");
                client.loadSlashCommands(bot, true);

                await msg.edit("Reloading buttons:");
                client.loadButtons(bot, true);

                await msg.edit("Reloading triggers:");
                client.loadTriggers(bot, true);
            break;
        }
        //await msg.edit("Reload complete!");

        await msg.delete();
    }
}




