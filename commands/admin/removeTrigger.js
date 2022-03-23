const fs = require("fs")
const bot = require("../../index")

module.exports = {
    name: "removetrigger",
    category: "admin",
    devOnly: true,
    run: async ({client, message, args}) => {
        bot.client = client;

        if(args.length > 1){
            return message.reply("Too many arguments. \nThe command syntax is: n.removeTrigger <trigger to remove>")
        }
        if(args.length < 1){
            return message.reply("Too few arguments \nThe command syntax is: n.removeTrigger <trigger to remove>")
        }

        const data = fs.readFileSync(`./triggers/triggers.json`)
        var triggerData = JSON.parse(data)

        const triggerIndex = triggerData.trigger.indexOf(args[0])
        if(triggerIndex === -1){
            return message.reply(`Trigger ${args[0]} not found`)
        }

        triggerData.trigger.splice(triggerIndex, 1)
        triggerData.reaction.splice(triggerIndex, 1)

        const writeData = JSON.stringify(triggerData)

        try{
            fs.writeFileSync("./triggers/triggers.json", writeData)
        }
        catch(err){
            console.error(err)
            return message.reply(`Error while writing to file: ${err}`)
        }
        
        const msg = await message.reply("Reloading triggers:");
        client.loadTriggers(bot, true);
        await msg.edit(`Trigger \'${args[0]}\' removed!`)
    }
}