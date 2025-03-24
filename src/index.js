require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const { CommandHandler } = require('djs-commander');
const path = require('path');


//set permissions bot (client) can use
const client = new Client({
    intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,

]});

//Token
const Token = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID;

new CommandHandler({
    client,
    commandsPath: path.join(__dirname, 'commands'),
    eventsPath: path.join(__dirname, 'events'),
    testServer: GUILD_ID,
});

//logs messages
client.on('messageCreate', (msg) => {
    if (msg.author.bot) {
    return;
    }
    console.log(msg.content);
    console.log(msg.createdAt.toDateString());
    console.log(msg.author.tag);
});

//reply back
client.on('messageCreate', (msg) => {
    if (msg.content === 'hi') {
        if (msg.author.bot) return;
        msg.reply('hello');
    }
});


client.on('messageCreate', (msg) => {
    if (console.log === 'timer') {
        console.log('test');
    }
});


//slash command checks
client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'add') {
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;
        interaction.reply(`The sum is ${num2+num1}`);
    }

    
    //logs what command was run
    console.log(interaction.commandName);
});


client.login(Token);



