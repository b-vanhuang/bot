const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { Embedbuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Removes set amount of messages')
        .addIntegerOption(option => option.setName('amount').setDescription('amount of messages to delete').setMinValue(1).setMaxValue(100).setRequired(true)),
    run: async ({interaction}) => {
		let number = interaction.options.getInteger('amount');

        const embed = new Embedbuilder()
        .setColor('Blue')
        .setDescription(`:white_check_mark: Deleted ${number} messages`)

        await interaction.channel.bulkDelete(number)

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('purge')
            .setEmoji(`:put_litter_in_its_place:`)
            .setStyle(ButtonStyle.Primary),
    )

        const message = await interaction.reply({embeds: [embed], components: [button]});
        const collector = message.createMessageComponentCollector();

        collector.on("collect", async i => {
            if (i.setCustomId === 'purge') {
                if (!i.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return;

                interaction.deleteReply();
            }
        })
    }
}