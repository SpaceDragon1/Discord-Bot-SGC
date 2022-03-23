const commands = require("../../handlers/commands");
const bot = require("../../index")

const reloadOptions = [
    {name: "commands", value: "commands"},
    {name: "slash-commands", value: "slash-commands"},
    {name: "events", value: "events"},
    {name: "buttons", value: "buttons"},
    {name: "triggers", value: "triggers"},
]

const run = async (client, interation) => {
    bot.client = client;

    let reloadOption = interation.options.getString("reloads");

    const msg = await interation.reply({content: "Reloading...", fetchReply: true});

    switch(reloadOption){
        case "commands":
            await msg.edit("Reloading commands:");
            client.loadCommands(bot, true);
            break;
            
        case "slash-commands":
            await msg.edit("Reloading slash-commands:");
            client.loadSlashCommands(bot, true);
            break;

        case "buttons":
            await msg.edit("Reloading buttons:");
            client.loadButtons(bot, true);
            break;
        case "events":
            await msg.edit("Reloading events:");
            client.loadEvents(bot, true);
            break;

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


    await msg.edit("Reload complete!")
}

module.exports = {
    name: "reload",
    category: "admin",
    description: "Command to reload everything",
    devOnly: true,
	perms: "ADMINISTRATOR",
    options: [
        {
			name: "reloads",
			description: "The part you want to reload",
			type: "STRING",
			choices: reloadOptions,
			required: false,
		}
    ],
    run,
}