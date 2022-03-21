const { getFiles } = require("../util/functions")
const fs = require("fs")

module.exports = (bot, reload) => {
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
}