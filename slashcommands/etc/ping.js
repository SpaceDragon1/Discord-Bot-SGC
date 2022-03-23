
const run = async (client, interation) => {
    await interation.reply("pong");
}
module.exports = {
	name: "ping",
	category: "etc",
	description: "Replies with pong.",
	run,
}