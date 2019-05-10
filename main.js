#! /usr/bin/env node
const moment = require('moment');
const DiscordRPC = require('discord-rpc');
const config = require('./config');
const cmus_cache = require('./app/cmus_cache');

const ClientId = config.clientId;
const imageKey = config.assets.image_key;
const imageText = config.assets.image_text;

const timeMode = config.time || 'overall';

const rpc = new DiscordRPC.Client({
    transport: 'ipc'
});

var startTimestamp = new Date();
var last_song = "";

async function updateActivity() {
    if (!rpc) return;
    if (startTimestamp && config.time === 'none') startTimestamp = undefined;
    
    const cache = await cmus_cache();
    console.log(cache);
    if (last_song != cache.song) {
        startTimestamp = new Date();
        last_song = cache.song
    }
    
    rpc.setActivity({
        details: `${cache.song}`, // Song
        state: `${cache.artist}`, // Artist
        startTimestamp,
        largeImageKey: imageKey,
        largeImageText: `${imageText} ${config.version} by Ginkoe`,
        instance: false,
    });
}


rpc.on('ready', () => {
    console.log(`Starting with clientId ${ClientId}`);
    updateActivity();
    setInterval(() => {
        updateActivity();
    }, 10e3);
});

rpc.login({ clientId: ClientId }).catch(console.error);