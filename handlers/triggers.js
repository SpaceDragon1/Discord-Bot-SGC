const { getFiles } = require("../util/functions")
const fs = require("fs")

module.exports = async (bot, reload) => {
    const {client} = bot

    let triggers = getFiles("./triggers/",".json")

    if (triggers.length === 0) {
		console.log("No buttons to load")
	}

    triggers.forEach((f) => {
        if (reload) delete require.cache[require.resolve(`../triggers/${f}`)]
        try{
            const data = fs.readFileSync(`./triggers/${f}`)
            const triggerData = JSON.parse(data)
            triggerData.trigger.forEach((tg,i) => {
                client.triggers.set(tg, triggerData.reaction[i]);
            })
        }
        catch(err){
            console.error(`File read failed: ${err}`);
        }
    });
    console.log(`Loaded ${client.triggers.size} triggers`)
}
