import os

file_path = r'electron_app\main.cjs'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: window:hide handler to prevent re-opening loading screen
content = content.replace(
    "ipcMain.handle('window:hide', (event) => {\n    const win = BrowserWindow.fromWebContents(event.sender);\n    if (win) fadeOutAndHide(win);\n});",
    "ipcMain.handle('window:hide', (event) => {\n    const win = BrowserWindow.fromWebContents(event.sender);\n    if (win) {\n        if (win === loadingWindow) win.userHidden = true;\n        fadeOutAndHide(win);\n    }\n});"
)

# Fix 2: createLoadingWindow rounded corners bug
# We set backgroundColor to undefined and ensure no frame/shadow
# And thickFrame: false to avoid Windows aero border artifacts
content = content.replace(
    "backgroundColor: '#00FFFFFF',",
    "backgroundColor: '#00000000',\\n        thickFrame: false,"
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Main Process Corner & Hide Fix Applied")
