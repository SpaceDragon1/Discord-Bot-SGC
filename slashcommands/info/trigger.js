const { MessageActiveRow, MessageEmbed} = require("discord.js")
const { getFiles } = require("../../util/functions")
const fs = require("fs")

const run = async (client, interaction) => {
    var embed = new MessageEmbed()
        .setTitle("Active Triggers:")
        .setColor("GOLD");

    const data = fs.readFileSync(`./triggers/triggers.json`)
    var triggerData = JSON.parse(data)

    triggerData.trigger.forEach((t, i) => {
        embed.addField(`Trigger: ${t}`,`Reaction: ${triggerData.reaction[i]}`)
    })


    interaction.reply({
        embeds: [
            embed
        ],
        ephemeral: true,
    })
}

module.exports = {
	name: "trigger",
	category: "info",
	description: "Displays all available triggers",
	run,
}