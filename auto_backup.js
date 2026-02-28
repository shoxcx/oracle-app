const chokidar = require('chokidar');
const { exec } = require('child_process');

console.log("Démarrage de la sauvegarde automatique GitHub toutes les heures...");

// Sauvegarde toutes les 1 heures (3600000 ms)
setInterval(() => {
    const dateStr = new Date().toLocaleString();
    console.log(`[Auto-Backup] Lancement de la sauvegarde à ${dateStr}`);

    exec('git add . && git commit -m "Auto-backup: ' + dateStr + '" && git push origin main', (error, stdout, stderr) => {
        if (error) {
            console.error(`[Auto-Backup] Erreur lors de la sauvegarde: ${error}`);
            return;
        }
        console.log(`[Auto-Backup] Sauvegarde réussie sur GitHub: \n${stdout}`);
    });
}, 3600000);
