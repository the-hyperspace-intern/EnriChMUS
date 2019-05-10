const DiscordRPC = require('discord-rpc');
const config = require('./../config');
const cmus_cache = require('./cmus_cache');
const logger = require('../logger');
const ClientId = config.clientId;
const imageKey = config.assets.image_key;
const imageText = config.assets.image_text;

const progress_bar = require('./playing_bar');

const timeMode = config.time || 'overall';

var startTimestamp = new Date();
var last_song = "";

const entry = {
    duration: "bar"
}

async function updateActivity(rpc, is_bar) {
    if (!rpc) return;

    const cache = await cmus_cache();
    logger.verbose(JSON.stringify(cache));
    
    if (last_song != cache.song) {
        startTimestamp = new Date();
        last_song = cache.song
    }

    let details = "Loading...";
    let state = "Loading...";
    
    if(is_bar) {
        let pos_bar = await progress_bar.render(cache.position, cache.duration, 10);
        details = `${cache.song} - ${cache.artist}`;
        state = `${pos_bar}`;
    } else {
        details = `${cache.song}`;
        state = `${cache.artist}`;
    }
    

    const temp_conf = {
        details, // Song
        state, // Artist
        startTimestamp,
        largeImageKey: imageKey,
        largeImageText: `${imageText} ${config.version} by Ginkoe`,
        instance: false,
    };

    rpc.setActivity(temp_conf);
}




module.exports = updateActivity;