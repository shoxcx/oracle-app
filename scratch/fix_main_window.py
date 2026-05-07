import os

file_path = r'electron_app\main.cjs'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: Creation of loadingWindow
# We want to remove resizable: false and ensure it doesn't ignore mouse events by default
content = content.replace("resizable: false,", "resizable: true,")
content = content.replace("loadingWindow.setIgnoreMouseEvents(true, { forward: true });", "// loadingWindow.setIgnoreMouseEvents(true, { forward: true });")

# Fix 2: Everywhere where setIgnoreMouseEvents(true) is called for loadingWindow, we comment it out
# because the user wants to interact with it (Close, Drag)
content = content.replace("loadingWindow.setIgnoreMouseEvents(true);", "// loadingWindow.setIgnoreMouseEvents(true);")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Main Process Fixed")
