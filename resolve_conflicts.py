import sys
import re

file_path = r"C:\Users\User\Desktop\Oracle\lol-tracker\src\components\InGameHelper.jsx"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the conflicts, keeping the HEAD variation.
new_content = re.sub(r'<<<<<<< HEAD\r?\n(.*?)\r?\n=======\r?\n(.*?)\r?\n>>>>>>> [^\r\n]*\r?\n?', r'\1\n', content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Resolved merge conflicts in InGameHelper.jsx")
