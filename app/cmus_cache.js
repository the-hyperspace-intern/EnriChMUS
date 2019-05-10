const fs = require('fs').promises;
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function getcache() {
    const cmus_cache = {
        song: 'Idle',
        artist: 'Check your CMUS',
    }

    // Artist
    const resp_artist = await exec(`cmus-remote -Q | grep "tag artist" | sed s/"tag artist"/""/g | sed '1s/^.//'`);
    // Song
    const resp_song = await exec(`cmus-remote -Q | grep "tag title" | sed s/"tag title"/""/g | sed '1s/^.//'`);

    if (resp_artist.stderr || resp_song.stderr) {
        return cmus_cache;
    }

    cmus_cache.artist = resp_artist.stdout;
    cmus_cache.song = resp_song.stdout;
    

    return cmus_cache;
}

module.exports = getcache;