import os

file_path = r'src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the mistake: remove it from arguments and put it after the opening brace of the function body
bad_line = "  const onSubscribe = () => setShowPremiumModal(true); \n  theme"
good_line = "  theme"
content = content.replace(bad_line, good_line)

# Now find the actual start of the function body
main_app_body_start = content.find('serverGoldUsers, setShowPremiumModal, setErrorModal\n}) {') + len('serverGoldUsers, setShowPremiumModal, setErrorModal\n}) {')

content = content[:main_app_body_start] + "\n  const onSubscribe = () => setShowPremiumModal(true);" + content[main_app_body_start:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed")
