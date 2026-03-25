const { exec } = require('child_process');

function runPs(action) {
    const fnMapping = {
        'playpause': 'PlayPause()',
        'next': 'Next()',
        'prev': 'Prev()'
    };

    if (!fnMapping[action]) return Promise.reject("Invalid action");

    const psScript = `
$code = @"
using System;
using System.Runtime.InteropServices;
public class VK {
    [DllImport("user32.dll")]
    public static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, int dwExtraInfo);
    public static void PlayPause() { keybd_event(0xB3, 0, 0, 0); keybd_event(0xB3, 0, 2, 0); }
    public static void Next() { keybd_event(0xB0, 0, 0, 0); keybd_event(0xB0, 0, 2, 0); }
    public static void Prev() { keybd_event(0xB1, 0, 0, 0); keybd_event(0xB1, 0, 2, 0); }
}
"@;
Add-Type -TypeDefinition $code;
[VK]::${fnMapping[action]};
    `;

    const scriptRoot = require('path').join(require('os').tmpdir(), 'media_action.ps1');
    require('fs').writeFileSync(scriptRoot, psScript);

    return new Promise((resolve) => {
        exec(`powershell -ExecutionPolicy Bypass -File "${scriptRoot}"`, (err) => {
            if (err) console.log(err);
            resolve();
        });
    });
}

function getSpotifyTrack() {
    return new Promise((resolve) => {
        const path = require('path');
        const scriptPath = path.join(__dirname.replace('app.asar', 'app.asar.unpacked'), 'media_info.py');

        exec(`python "${scriptPath}"`, { encoding: 'utf8' }, async (err, stdout) => {
            if (err) {
                return resolve(null);
            }

            try {
                const data = JSON.parse(stdout.trim());
                if (data.error || !data.title) {
                    return resolve({ title: 'En pause', artist: 'Spotify', isPlaying: false, cover: null });
                }

                let cover = data.cover || null;

                // Fallback / primary check on iTunes to ensure accurate artwork
                // Windows sometimes passes a very low resolution or generic executable icon
                try {
                    const searchUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(data.artist + ' ' + data.title)}&entity=song&limit=1`;
                    const itunesRes = await fetch(searchUrl);
                    const itunesJson = await itunesRes.json();
                    if (itunesJson && itunesJson.results && itunesJson.results.length > 0) {
                        cover = itunesJson.results[0].artworkUrl100.replace('100x100', '300x300');
                    }
                } catch (e) {
                    console.log('Cover fetch error:', e);
                }

                resolve({
                    artist: data.artist,
                    title: data.title,
                    isPlaying: data.isPlaying,
                    cover: cover,
                    durationMs: data.durationMs,
                    positionMs: data.positionMs
                });
            } catch (err) {
                console.error("JSON parse error:", err);
                resolve(null);
            }
        });
    });
}

module.exports = { runPs, getSpotifyTrack };
