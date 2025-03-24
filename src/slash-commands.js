require('dotenv').config();
const { REST, ROUTES, ApplicationCommandOptionType } = require('discord.js')
const {Routes,} = require('discord-api-types/v9');



//list of commands
const commands = [
    {
        name: 'add',
        description: 'Adds two numbers',
        options: [
            {
                name: 'first-number',
                description: 'The first number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'second-number',
                description: 'The second number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ],
    },
];



//setting variables for IDs and Token
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const Token = process.env.TOKEN;


const rest = new REST({ version: '10' }).setToken(Token);

const slash_command = async() => {
    try {
        console.log('Started Command');

        await rest.put(
            Routes.applicationGuildCommands(
                CLIENT_ID, 
                GUILD_ID
            ), 
            {body: commands}
        )

    console.log("Slash commands registered");
    } catch (err) {
    console.log(err);
}
}

slash_command();


