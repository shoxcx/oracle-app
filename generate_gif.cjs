const Jimp = require('jimp');
const GIFEncoder = require('gif-encoder-2');
const fs = require('fs');

const width = 500;
const height = 360;

async function generate() {
    console.log("Chargement du logo de l'application...");
    const originalLogo = await Jimp.read('src/assets/oracle_logo.png');
    
    if (!fs.existsSync('build')) {
        fs.mkdirSync('build');
    }

    console.log("Préparation du moteur d'animation...");
    const encoder = new GIFEncoder(width, height, 'neuquant', true);
    encoder.start();
    encoder.setRepeat(0);   
    encoder.setDelay(40);   
    encoder.setQuality(5);  

    const framesCount = 25;

    console.log("Génération dynamique des frames d'animation...");
    for (let f = 0; f < framesCount; f++) {
        // Fond sombre de l'application Oracle "#1C1C21" => 0x1C1C21FF
        const frame = new Jimp(width, height, 0x1C1C21FF);

        // Effet de pulsation (breathing) du logo
        const scalePhase = Math.sin((f / framesCount) * Math.PI * 2); 
        const currentScale = 1 + (scalePhase * 0.05);

        const logoW = 160 * currentScale;
        const logoH = 160 * currentScale;
        
        let resizedLogo = originalLogo.clone().resize(logoW, logoH, Jimp.RESIZE_BICUBIC);

        const lx = (width - logoW) / 2;
        const ly = (height - logoH) / 2 - 20;

        frame.composite(resizedLogo, lx, ly, {
            mode: Jimp.BLEND_SOURCE_OVER,
        });

        // Barre de progression élégante
        const barWidth = 280;
        const barHeight = 8;
        const barX = (width - barWidth) / 2;
        const barY = height - 50;

        for (let x = 0; x < barWidth; x++) {
            for (let y = 0; y < barHeight; y++) {
                // Bordure arrondie stylisée (bords bruts coupés par l'algo très simple)
                frame.setPixelColor(0x27272AFF, Math.floor(barX + x), Math.floor(barY + y));
            }
        }
        
        // Remplissage Cyan façon Oracle Accent Primary
        let progW = (f / framesCount) * barWidth;
        for (let x = 0; x < progW; x++) {
            for (let y = 0; y < barHeight; y++) {
                frame.setPixelColor(0x06B6D4FF, Math.floor(barX + x), Math.floor(barY + y));
            }
        }

        encoder.addFrame(frame.bitmap.data);
    }

    console.log("Encodage du GIF d'installation...");
    encoder.finish();
    const buffer = encoder.out.getData();

    fs.writeFileSync('build/installer.gif', buffer);
    console.log("Terminé ! GIF généré dans build/installer.gif ✨");
}

generate().catch(console.error);
