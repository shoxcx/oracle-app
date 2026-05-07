import os

file_path = r'src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add overflow-hidden and ensure outer container has rounding
old_div = '<div className="fixed inset-0 bg-black/70 backdrop-blur-3xl font-inter overflow-hidden border-[1px] border-white/10 rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] select-none">'
new_div = '<div className="fixed inset-0 bg-black/70 backdrop-blur-3xl font-inter overflow-hidden border-[1px] border-white/10 rounded-[3.1rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] select-none pointer-events-auto">'

if old_div in content:
    content = content.replace(old_div, new_div)

# Ensure the inner wrapper also respects rounding
old_inner = '<div className="relative h-full flex flex-col p-8 lg:p-10 overflow-hidden rounded-[3rem]">'
new_inner = '<div className="relative h-full flex flex-col p-8 lg:p-10 overflow-hidden rounded-[3.1rem]">'

if old_inner in content:
    content = content.replace(old_inner, new_inner)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("App.jsx Visual Robustness Applied")
