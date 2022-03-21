const { MessageActiveRow, MessageButton, MessageEmbed, MessageActionRow } = require("discord.js")

module.exports = {
    name: "rolesselector",
    category: "test",
    devOnly: true,
    run: async ({client, message, args}) => {
        message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setTitle("Select Role")
                    .setDescription("Select roles from the Buttons below")
                    .setColor("BLUE")
            ],
            components: [
                new MessageActionRow().addComponents([
                    new MessageButton().setCustomId("role-954359381368127519")
                        .setStyle("PRIMARY")
                        .setLabel("Testrole")
                ])
            ]
        })
    }
}