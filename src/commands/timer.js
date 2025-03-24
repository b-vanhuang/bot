const { SlashCommandBuilder, EmbedBuilder, Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,

]});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timer')
		.setDescription('Starts a timer')
        .addNumberOption(option => option.setName('timer-number').setDescription('timer number in seconds').setRequired(true)),
	run: async ({interaction}) => {

        const { options } = interaction;
        const num = options.getNumber('timer-number');

        //embed to display current progress of timer
        async function sendMessage (message, edit) {
            const embed = new EmbedBuilder()
            .setColor('Blue')
            .setDescription(message)
            .setFooter({ text: `May be 1-2 seconds off`});

            if (edit) {
                await interaction.editReply({embeds: [embed]}).catch(err => {});
            }
            else {
                await interaction.reply({embeds: [embed], ephemeral: true});
            }
        }


        

        //starts at zero
        var current = 0;
        await sendMessage(`${num - current} seconds remain out of your ${num} second timer`);

        var done;
        if (done) return;
        setInterval(async () => {
            //every seconds we add 1
            current++;
            if (current >= num) {
                await sendMessage('Your Timer is Done', true);

                done = true;
            } else {
                await sendMessage(`${num - current} seconds remain out of your ${num} second timer`, true);
            }
        }, 1000)


        
    }
    
};