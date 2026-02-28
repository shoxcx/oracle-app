const media = require('./electron_app/media.cjs');

media.getSpotifyTrack().then(res => {
    console.log(res);
});
