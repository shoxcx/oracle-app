import os

file_path = r'electron_app\main.cjs'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the accidental literal \n
content = content.replace(r"backgroundColor: '#00000000',\n        thickFrame: false,", "backgroundColor: '#00000000',\n        thickFrame: false,")
# Wait, the replace above might not work if it's literal. 
# Let's try specifically for the literal string that appeared in the error.

content = content.replace("backgroundColor: '#00000000',\\n        thickFrame: false,", "backgroundColor: '#00000000',\n        thickFrame: false,")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Main Process Syntax Fixed")
