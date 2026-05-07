import os

file_path = r'src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the "Oracle Gold" card button in SettingsView
old_button_logic = """              <button 
                onClick={async (e) => { 
                  e.stopPropagation(); 
                  try {
                    // On r\u01e3cup\ufffdre le pseudo (ici on suppose qu'il est accessible, sinon on le r\u01e3cup\ufffdre du store)
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
                      setErrorModal({ show: true, title: "Erreur", message: data.error });
                    }
                  } catch (err) {
                    setErrorModal({ show: true, title: "Erreur de Connexion", message: "Impossible de contacter le serveur." });
                  }
                }}"""

new_button_logic = """              <button 
                onClick={async (e) => { 
                  e.stopPropagation(); 
                  if (!isPremium) {
                    window.ipcRenderer.send("app:open-external", "https://oracle-website-liard.vercel.app");
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

# Use a more robust replacement for the button logic
if 'G\u01e3rer mon moyen de paiement' in content:
    # Find the button after this text
    start_search = content.find('G\u01e3rer mon moyen de paiement')
    btn_start = content.find('<button', start_search)
    btn_onclick_start = content.find('onClick={', btn_start)
    # Find matching brace for onClick
    balance = 0
    i = btn_onclick_start + 8
    while i < len(content):
        if content[i] == '{': balance += 1
        elif content[i] == '}':
            balance -= 1
            if balance < 0: break
        i += 1
    old_onclick = content[btn_onclick_start:i+1]
    
    new_onclick = """onClick={async (e) => { 
                  e.stopPropagation(); 
                  if (!isPremium) {
                    window.ipcRenderer.send("app:open-external", "https://oracle-website-liard.vercel.app");
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
    content = content.replace(old_onclick, new_onclick)

# 2. Fix the price and text in SubscriptionView (already tried but let's be sure)
content = content.replace("S'abonner (4.99\u20ac/mois)", "S'abonner (2.99\u20ac/mois)")

# 3. Final global check for any v0-oracle-sigma links that should be the new site
# (Actually, we should only replace the ones that are meant for the browser)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Final Updates Done")
