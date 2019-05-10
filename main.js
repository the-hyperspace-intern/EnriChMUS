#! /usr/bin/env node
const config = require('./config');
const rich_discord = require('./app/rich_discord');
const DiscordRPC = require('discord-rpc');

const logger = require('./logger')

const rpc = new DiscordRPC.Client({
    transport: 'ipc'
});

rpc.on('ready', () => {
    logger.info(`Starting with clientId ${config.clientId}`)
    rich_discord(rpc);
    setInterval(() => {
        rich_discord(rpc, true);
    }, 1500);
});

rpc.login({ clientId: config.clientId }).catch(console.error);