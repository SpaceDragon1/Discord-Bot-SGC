const { getFiles } = require("../util/functions")
const fs = require("fs")

/*module.exports = (bot, reload) => {
	const { client } = bot

	let slashcommands = getFiles("./slashcommands/", ".js")

	if (slashcommands.legnth === 0) {
		console.log("No events to load")
	}

	slashcommands.forEach((f, i) => {
		if (reload) delete require.cache[require.resolve(`../slashcommands/${f}`)]
		const slashcmd = require(`../slashcommands/${f}`)
		client.slashcommands.set(slashcmd.name, slashcmd)
	})
	console.log(`Loaded ${client.slashcommands.size} slash commands`)
}*/

module.exports = (bot, reload) => {
    const {client} = bot 

    fs.readdirSync("./slashcommands/").forEach((category) => {
        let slashcommands = getFiles(`./slashcommands/${category}`, ".js")

        if(slashcommands.length === 0)
            console.log("No slashcommands loaded")

		slashcommands.forEach((f) => {
            if (reload)
                delete require.cache[require.resolve(`../slashcommands/${category}/${f}`)]
			const slashcmd = require(`../slashcommands/${category}/${f}`)
            client.slashcommands.set(slashcmd.name, slashcmd)
        })
    })
    console.log(`Loaded ${client.slashcommands.size} slashcommands`)
}