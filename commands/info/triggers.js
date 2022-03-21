const fs = require("fs")

module.exports = {    
    name: "triggers",
    category: "info",
    devOnly: false,
    run: async ({client, message, args}) => {
        const data = fs.readFileSync(`./triggers/triggers.json`)
        var triggerData = JSON.parse(data)

        var triggerString = new String;

        triggerData.trigger.forEach((t, i) => {
            triggerString += `Trigger: ${t}     Reaction: ${triggerData.reaction[i]}\n`
        })

        message.reply(triggerString);
    }
}