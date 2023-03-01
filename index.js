// ACCESS ENVIRONMENT CONFIG (CONTAINS TOKEN AND CLIENT ID)
require(`dotenv/config`);

// ACCESS IMPORTED PACKAGES
const {REST} = require(`@discordjs/rest`);
const {Routes} = require(`discord-api-types/v9`);
const {Client, GatewayIntentBits} = require(`discord.js`);

// FOR VOICE RECOGNITION
const { joinVoiceChannel } = require("@discordjs/voice");
const { addSpeechEvent } = require("discord-speech-recognition");

// TO ACCESS NODES FILE STRUCTURE MANAGEMENT
const fs = require(`fs`);
const path = require(`path`);

// CREATE BOT
const client = new Client({

    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,

    ],

});

client.setMaxListeners(0);
addSpeechEvent(client);


// BOT SERVER INITIALISTION 
client.on(`ready`, () => 
{
    console.log("ready");
});


client.on("messageCreate", (msg) => {
    const voiceChannel = msg.member?.voice.channel;
    if (voiceChannel) {
      joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        selfDeaf: false,
        selfMute: false
      });
    }
  });
  
 const { AudioPlayerStatus, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice');
 var creeperSound = createAudioResource(path.join(__dirname, './sound.mp3'));
 
 client.on("speech", async (msg) => {

    // If bot didn't recognize speech, content will be empty
    if (!msg.content) return;
    
    const s = msg.content;
    console.log(s);
    if (s.toLowerCase().includes("creeper"))
    {
        try {
            creeperSound = createAudioResource(path.join(__dirname, './sound.mp3'));
            const voiceChannel = msg.member?.voice.channel;
            const {getVoiceConnection} = require(`@discordjs/voice`); 
            const connection = getVoiceConnection(voiceChannel.guild.id);

            const player = createAudioPlayer();
            
            player.play(creeperSound);

            connection.subscribe(player);
            

        } catch (err) {
            console.error(err.message);
        }
    }

  });


// START BOT

client.login(process.env.TOKEN);











