const fs = require("fs")
const bot = require("../../index")

module.exports = {
    name: "addtrigger",
    category: "admin",
    devOnly: true,
    run: async ({client, message, args}) => {
        bot.client = client;

        if(args.length > 2){
            return message.reply("Too many arguments. \nThe command syntax is: n.addTrigger <trigger> <reaction>")
        }
        if(args.length < 2){
            return message.reply("Too few arguments \nThe command syntax is: n.addTrigger <trigger> <reaction>")
        }

        const data = fs.readFileSync(`./triggers/triggers.json`)
        var triggerData = JSON.parse(data)

        triggerData.trigger.push(args[0])
        triggerData.reaction.push(args[1])

        const writeData = JSON.stringify(triggerData)

        try{
            fs.writeFileSync(`./triggers/triggers.json`,writeData)
        }
        catch(err){
            console.error(err)
            return message.reply(`Error while writing to file: ${err}`)
        }
        
        const msg = await message.reply("Reloading triggers:");
        client.loadTriggers(bot, true);
        await msg.edit("Reload complete!")
    }
}