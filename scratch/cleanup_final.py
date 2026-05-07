import os

file_path = r'src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix duplicate props in SettingsView call
# Search for the block with duplicates
old_props_block = """                  isPremium={isPremium}
                    setIsPremium={setIsPremium}
                    currentUser={currentUser}
                    setShowPremiumModal={setShowPremiumModal}
                  setIsPremium={setIsPremium}
                  currentUser={currentUser}"""

new_props_block = """                  isPremium={isPremium}
                    setIsPremium={setIsPremium}
                    currentUser={currentUser}
                    setShowPremiumModal={setShowPremiumModal}"""

if old_props_block in content:
    content = content.replace(old_props_block, new_props_block)

# 2. Fix dangling } at line 9040
content = content.replace('{/* CANCEL MODAL */}\n      }', '{/* CANCEL MODAL REMOVED */}')

# 3. Fix IPC calls: app:open-external -> app:open-url
content = content.replace('window.ipcRenderer.send("app:open-external"', 'window.ipcRenderer.invoke("app:open-url"')
content = content.replace("window.ipcRenderer.send('app:open-external'", "window.ipcRenderer.invoke('app:open-url'")

# 4. Final verification of SubscriptionView buttons price and text
content = content.replace("S'abonner (2.99\u20ac/mois)", "S'abonner (2.99\u20ac/mois)")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed")
