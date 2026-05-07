import os

file_path = r'src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update MainApp call in App component
main_app_call_start = content.find('<MainApp')
main_app_call_end = content.find('/>', main_app_call_start) + 2
main_app_call = content[main_app_call_start:main_app_call_end]

if 'setShowPremiumModal={setShowPremiumModal}' not in main_app_call:
    new_main_app_call = main_app_call.replace(
        'serverGoldUsers={serverGoldUsers}',
        'serverGoldUsers={serverGoldUsers}\n        setShowPremiumModal={setShowPremiumModal}\n        setErrorModal={setErrorModal}'
    )
    content = content.replace(main_app_call, new_main_app_call)

# 2. Update MainApp definition
main_app_def = 'function MainApp({ \n  theme, setTheme, visualMode, setVisualMode, language, setLanguage, t, appMode, \n  overlaySettings, setOverlaySettings, triggerSocialToast, ddragonVersion,\n  isConnected, currentUser, userRank, currentUserHistory, friends, gamePhase, \n  setGamePhase, champSelectData, setChampSelectData, isPremium, setIsPremium, \n  premiumData, serverGoldUsers \n}) {'
if 'setShowPremiumModal' not in main_app_def:
    new_main_app_def = main_app_def.replace(
        'premiumData, serverGoldUsers \n}) {',
        'premiumData, serverGoldUsers, setShowPremiumModal, setErrorModal\n}) {'
    )
    content = content.replace(main_app_def, new_main_app_def)

# 3. Update SettingsView call in MainApp
settings_view_call_start = content.find('{activeTab === \'settings\' && <SettingsView')
settings_view_call_end = content.find('/>', settings_view_call_start) + 2
settings_view_block = content[settings_view_call_start:settings_view_call_end]

if 'setShowPremiumModal={setShowPremiumModal}' not in settings_view_block:
    new_settings_view_block = settings_view_block.replace(
        'isPremium={isPremium}',
        'isPremium={isPremium}\n                    setIsPremium={setIsPremium}\n                    currentUser={currentUser}\n                    setShowPremiumModal={setShowPremiumModal}'
    )
    content = content.replace(settings_view_block, new_settings_view_block)

# 4. Update SubscriptionView call in MainApp (the one without props)
sub_view_call_old = "                {activeTab === 'subscription' && <SubscriptionView\n                    t={t}\n                    panelClass={panelClass}\n                    isPremium={isPremium}\n                    setIsPremium={setIsPremium}\n                    setActiveTab={setActiveTab}\n                    currentUser={currentUser}\n                  />}"
sub_view_call_new = "                {activeTab === 'subscription' && <SubscriptionView\n                  t={t}\n                  panelClass={panelClass}\n                  isPremium={isPremium}\n                  setIsPremium={setIsPremium}\n                  setActiveTab={setActiveTab}\n                  currentUser={currentUser}\n                  premiumData={premiumData}\n                  setErrorModal={setErrorModal}\n                />}"

if sub_view_call_old in content:
    content = content.replace(sub_view_call_old, sub_view_call_new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
