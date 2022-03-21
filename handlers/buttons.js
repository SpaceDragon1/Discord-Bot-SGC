const { getFiles } = require("../util/functions")
const fs = require("fs")

module.exports = (bot, reload) => {
	const { client } = bot

	let buttons = getFiles("./buttons/", ".js")

	if (buttons.legnth === 0) {
		console.log("No buttons to load")
	}

	buttons.forEach((f, i) => {
		if (reload) delete require.cache[require.resolve(`../buttons/${f}`)]
		const button = require(`../buttons/${f}`)
		client.buttons.set(button.name, button)
	})
}