const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const Discord = require("discord.js");
require("dotenv").config();


const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
});

client.slashcommands = new Discord.Collection()

let bot = {
    client,
}

client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload)
client.loadSlashCommands(bot, false)

//const guildId = "953660947854131200";
const guildId = "797874089221947424"
const clientId = "953656237097115728"

/*const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Started refreshing (/) commands");
        
        await rest.put(
            Routes.applicationCommands(clientId),
            {body: client.slashcommands.values()},
        );

        console.log('Successfully reloaded (/) commands.');
    }
    catch(err){
        console.error(err);
    }
})();*/

client.on("ready", async () => {
    console.log(`Loading ${client.slashcommands.size} slash commands`)

    const guild = client.guilds.cache.get(guildId)
    if (!guild)
        console.error("Target Guild not found")

    await guild.commands.set([...client.slashcommands.values()])

    const guild2 = client.guilds.cache.get("953660947854131200")
    if (!guild2)
        console.error("Target Guild not found")

    await guild2.commands.set([...client.slashcommands.values()])

    /*client.guilds.fetch()
    const guilds = client.guilds.cache

    guilds.forEach((f) => f.commands.set([...client.slashcommands.values()]))
    for(let i = 0; i < guilds.lenght; i++){

        const guild = client.guilds.cache.get(guilds[i].guildId);
        if(!guilds[i])
            console.error("Target Guild not found")

        console.log(guilds[i])

        await guilds[i].commands.set([...client.slashcommands.values()])
    }*/
    

    console.log("Finished")
    process.exit(0)
});

client.login(process.env.TOKEN)