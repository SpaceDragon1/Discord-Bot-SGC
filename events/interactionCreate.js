const Discord = require("discord.js")
const { run } = require("./ready")

module.exports = {
    name: "interactionCreate",
    run: async function runAll(bot, interaction){
        
        if(interaction.isCommand()) 
            handleSlashcommand(bot, interaction)
        else if(interaction.isButton) 
            handleButton(bot, interaction)
    }
}

const handleButton = (bot, interaction) => {
    const {client} = bot

    //"name-param1-param2-..."
    const [name, ...params] = interaction.customId.split("-")

    const button = client.buttons.get(name)

    if(!button) return
    button.run(client, interaction, params)
}

const handleSlashcommand = (bot, interaction) => {
    const {client, owners} = bot

    if(!interaction.inGuild()) 
        return interaction.reply("This command can only be used in a server")

    const slashcmd = client.slashcommands.get(interaction.commandName)

    if(!slashcmd) return interaction.reply("Invalid command")

    let member = interaction.member;

    if (slashcmd.devOnly && !owners.includes(member.id)){
        return interaction.reply("This command is only available to the bot owners")
    }

    if (slashcmd.perms && !interaction.member.permissions.has(slashcmd.perms))
			return interaction.reply("You do not have permission to use this command")

    try{
        slashcmd.run(client, interaction);
    }
    catch(err){
        console.error(err);
    }
}