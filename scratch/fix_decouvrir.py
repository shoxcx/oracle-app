import os

file_path = r'src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Use a very specific but safe anchor
old_block_anchor = "const response = await fetch('https://v0-oracle-sigma.vercel.app/api/create-portal', {"
if old_block_anchor in content:
    # Find the button start before this
    idx = content.find(old_block_anchor)
    btn_start = content.rfind('<button', 0, idx)
    btn_end = content.find('}}', idx) + 3 # End of onClick
    
    new_onclick = """              <button 
                onClick={async (e) => { 
                  e.stopPropagation(); 
                  if (!isPremium) {
                    window.ipcRenderer.invoke("app:open-url", "https://oracle-website-liard.vercel.app");
                    return;
                  }
                  try {
                    const userPseudo = currentUser ? `${currentUser.gameName}#${currentUser.tagLine}` : (localStorage.getItem('oracle_user_pseudo') || 'Unknown'); 
                    const response = await fetch('https://v0-oracle-sigma.vercel.app/api/create-portal', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ pseudo: userPseudo })
                    });
                    const data = await response.json();
                    if (data.url) {
                      window.ipcRenderer.invoke('app:open-url', data.url);
                    } else {
                      setErrorModal({ show: true, title: "Aucun Abonnement", message: "Aucun abonnement Oracle Gold n'a \u00e9t\u00e9 trouv\u00e9 pour ce compte." });
                    }
                  } catch (err) {
                    setErrorModal({ show: true, title: "Erreur de Connexion", message: "Impossible de contacter le serveur." });
                  }
                }}"""
    
    # We replace from btn_start to the end of the onClick
    old_onclick_block = content[btn_start:btn_end]
    content = content.replace(old_onclick_block, new_onclick)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed Découvrir Button")
