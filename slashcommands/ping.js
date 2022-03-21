
const run = async (client, interation) => {
    await interation.reply("pong");
}
module.exports = {
	name: "ping",
	description: "Replies with pong.",
	run,
}