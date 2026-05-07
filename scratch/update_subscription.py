import os

file_path = r'src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Price and Redirect Link
content = content.replace("S'abonner (4.99\u20ac/mois)", "S'abonner (2.99\u20ac/mois)")
content = content.replace("S'abonner (4.99'/mois)", "S'abonner (2.99\u20ac/mois)") # Handle encoding artifacts
content = content.replace('onClick={() => setIsPremium(true)}', 'onClick={() => window.ipcRenderer.send("app:open-external", "https://oracle-website-liard.vercel.app")}')

# 2. Global Link Update (Replace v0-oracle-sigma links with new one for redirect, though mostly we use ipc for opening now)
# Actually, the user wants the shop link to be the new one.
# Any call to window.open or similar for the shop should be updated.
# I'll replace the Stripe create-portal logic with direct URL opening if that's what they mean.

# 3. Remove "Annuler l'abonnement" button and modal
cancel_btn_start = content.find('<div className="mt-8 pt-6 border-t border-white/5">')
cancel_btn_end = content.find('</div>', cancel_btn_start + 50) + 6
if cancel_btn_start != -1:
    content = content[:cancel_btn_start] + content[cancel_btn_end:]

cancel_modal_start = content.find('{showCancelModal && (')
if cancel_modal_start != -1:
    # Find matching closing brace
    balance = 0
    i = cancel_modal_start + len('{showCancelModal && (')
    while i < len(content):
        if content[i] == '(': balance += 1
        elif content[i] == ')':
            balance -= 1
            if balance < 0: break
        i += 1
    content = content[:cancel_modal_start] + content[i+1:]

# 4. Replace alerts with ModernErrorModal
# alert("Erreur : " + data.error); -> setErrorModal({ show: true, title: "Erreur", message: data.error });
import re
content = re.sub(r'alert\("Erreur : " \+ data\.error\);', 'setErrorModal({ show: true, title: "Erreur", message: data.error });', content)
content = re.sub(r'alert\("Impossible de contacter le serveur de gestion : " \+ \(.*?\)\);', 'setErrorModal({ show: true, title: "Erreur de Connexion", message: "Impossible de contacter le serveur." });', content)
content = re.sub(r'alert\("Erreur: " \+ data\.error\);', 'setErrorModal({ show: true, title: "Erreur", message: data.error });', content)
content = re.sub(r'alert\("Erreur de connexion\."\);', 'setErrorModal({ show: true, title: "Erreur", message: "Erreur de connexion." });', content)
content = re.sub(r'alert\("Erreur portail\."\);', 'setErrorModal({ show: true, title: "Erreur", message: "Erreur portail." });', content)

# 5. Fix the redirect for "DǸCOUVRIR" buttons too
content = content.replace('onClick={() => setActiveTab(\'subscription\')}', 'onClick={() => window.ipcRenderer.send("app:open-external", "https://oracle-website-liard.vercel.app")}')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updates Done")
