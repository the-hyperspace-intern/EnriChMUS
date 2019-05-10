const progress_bar = {
    render: async (pos, dur, max_char, style) => {
        let ch_pos = Math.trunc((pos / dur) * max_char);
        let progress_buffer = "[";
        for (let i = 0; i < max_char; i++) {
            progress_buffer += (i == ch_pos ? '' : '▬');
        }
        progress_buffer += "]"
    
        return progress_buffer;
    }
}

module.exports = progress_bar;