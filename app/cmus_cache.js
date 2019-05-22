const fs = require('fs').promises;
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function getcache() {
    const cmus_cache = {
        song: 'Idle',
        artist: 'Check your CMUS',
    }

    // Artist
    const resp_artist = await exec(`cmus-remote -Q | grep "tag artist" | sed s/"tag artist"/""/g | sed '1s/^.//'5`);
    // Song
    const resp_song = await exec(`cmus-remote -Q | grep "tag title" | sed s/"tag title"/""/g | sed '1s/^.//'5`);
    // Position
    const resp_pos = await exec(`cmus-remote -Q | grep "position" | sed s/"position"/""/g | sed '1s/^.//'`)
    // Duration
    const resp_dur = await exec(`cmus-remote -Q | grep "duration" | sed s/"duration"/""/g | sed '1s/^.//'`)
    if (resp_artist.stderr || resp_song.stderr || resp_dur.stderr || resp_pos.stderr) {
        return cmus_cache;
    }

    cmus_cache.artist = resp_artist.stdout;
    cmus_cache.song = resp_song.stdout;
    cmus_cache.position = parseInt(resp_pos.stdout.replace(/(\r\n|\n|\r)/gm, ""));
    cmus_cache.duration = parseInt(resp_dur.stdout.replace(/(\r\n|\n|\r)/gm, ""));

    return cmus_cache;
}

module.exports = getcache;
