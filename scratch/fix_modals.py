import os

file_path = r'src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Ensure MainApp accepts setShowPremiumModal and setErrorModal
# (Already done in previous step, but let's double check)

# 2. Define onSubscribe inside MainApp
main_app_start = content.find('function MainApp({')
main_app_body_start = content.find('{', main_app_start) + 1

on_sub_def = "\n  const onSubscribe = () => setShowPremiumModal(true);"
if 'const onSubscribe =' not in content[main_app_body_start:main_app_body_start+500]:
    content = content[:main_app_body_start] + on_sub_def + content[main_app_body_start:]

# 3. Find and remove the modals from MainApp
# They are near the end of MainApp's return
modals_block = """          {/* NEW PREMIUM & ERROR MODALS */}
          <PremiumRequiredModal 
            isOpen={showPremiumModal} 
            onClose={() => setShowPremiumModal(false)} 
            onSubscribe={() => setActiveTab('subscription')} 
            t={t}
          />
          <ModernErrorModal 
            error={errorModal} 
            onClose={() => setErrorModal({ ...errorModal, show: false })} 
          />"""

if modals_block in content:
    content = content.replace(modals_block, "")

# 4. Add the modals to App component return instead
# App component return ends with some modals usually.
# Let's find the main App return.
app_def_start = content.find('function App()')
app_return_start = content.find('return (', app_def_start)
app_return_end = content.find('    );', app_return_start) # This might be tricky in such a big file

# Instead of searching for the end of App's return, let's just search for the place where showQuitModal is used.
quit_modal_call = '<QuitModal'
if quit_modal_call in content:
    idx = content.find(quit_modal_call)
    # Insert our modals before QuitModal
    app_modals = """
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
    if 'PremiumRequiredModal' not in content[idx-500:idx]:
        content = content[:idx] + app_modals + content[idx:]

# 5. Make sure App passes showPremiumModal and errorModal to MainApp if MainApp needs them
# (But wait, if we define onSubscribe in MainApp using setShowPremiumModal, we only need the setter)
# But wait, we used showPremiumModal and errorModal in the modals we just removed from MainApp.
# Since we moved them to App, MainApp no longer needs the value of the states.

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
