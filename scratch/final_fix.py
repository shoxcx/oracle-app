import os

file_path = r'src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# The modals were removed from MainApp, now let's add them to App
modals_to_add = """
      <PremiumRequiredModal 
        isOpen={showPremiumModal} 
        onClose={() => setShowPremiumModal(false)} 
        onSubscribe={() => setShowPremiumModal(true)} 
        t={t}
      />
      <ModernErrorModal 
        error={errorModal} 
        onClose={() => setErrorModal({ ...errorModal, show: false })} 
      />
"""

if 'PremiumRequiredModal' not in content[1400:2000]: # Check in App component area
    insertion_point = content.find('{showQuitModal && (')
    if insertion_point != -1:
        content = content[:insertion_point] + modals_to_add + content[insertion_point:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Final Fix Done")
