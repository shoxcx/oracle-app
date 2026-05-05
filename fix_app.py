import sys

with open(r'c:\Users\User\Desktop\Autres\Oracle\lol-tracker\src\App.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
skip_mode = False
found = False

for i in range(len(lines)):
    line = lines[i]
    
    # Identify the start of the "merging" point
    # Line 6518:         }).catch(() => setLoadingHistory(false));
    # Line 6519:       }
    # Line 6520:     }
    # Line 6521:   }, [isOpen, puuid, summonerName, region, queueId]);
    
    if "}).catch(() => setLoadingHistory(false));" in line and "setLoadingHistory(false)" in line:
        # We check the next few lines to be absolutely sure
        if i+2 < len(lines) and "}" in lines[i+1] and "}" in lines[i+2] and "}, [isOpen, puuid, summonerName, region, queueId]);" in lines[i+3]:
            # This is the first useEffect end.
            # We want to replace everything from here down to the second useEffect end.
            found = True
            
            # Start of the merged content
            new_lines.append(line)
            new_lines.append("      }\n")
            new_lines.append("    } else if (!isOpen) {\n")
            new_lines.append("        setLoadingHistory(false);\n")
            new_lines.append("    }\n")
            new_lines.append("\n")
            new_lines.append("    // 2. Body/Container Scrolling Logic\n")
            new_lines.append("    const containers = document.querySelectorAll('#profile-scroll-container');\n")
            new_lines.append("    const globalContent = document.getElementById('main-scroll-container');\n")
            new_lines.append("    \n")
            new_lines.append("    if (isOpen) {\n")
            new_lines.append("      document.body.style.overflow = 'hidden';\n")
            new_lines.append("      containers.forEach(c => c.style.overflow = 'hidden');\n")
            new_lines.append("      if (globalContent) globalContent.style.overflow = 'hidden';\n")
            new_lines.append("    } else {\n")
            new_lines.append("      document.body.style.overflow = 'auto'; // default\n")
            new_lines.append("      containers.forEach(c => c.style.overflow = 'auto');\n")
            new_lines.append("      if (globalContent) globalContent.style.overflow = 'auto';\n")
            new_lines.append("    }\n")
            new_lines.append("\n")
            new_lines.append("    return () => {\n")
            new_lines.append("      document.body.style.overflow = 'auto';\n")
            new_lines.append("      const containersQuery = document.querySelectorAll('#profile-scroll-container');\n")
            new_lines.append("      const gContainer = document.getElementById('main-scroll-container');\n")
            new_lines.append("      containersQuery.forEach(c => c.style.overflow = 'auto');\n")
            new_lines.append("      if (gContainer) gContainer.style.overflow = 'auto';\n")
            new_lines.append("    };\n")
            new_lines.append("  }, [isOpen, puuid, summonerName, region, queueId]);\n")
            
            # Now we set skip_mode to skip until the end of the second useEffect
            skip_mode = True
            continue

    if skip_mode:
        if "}, [isOpen, puuid]);" in line:
            skip_mode = False
        continue
    
    new_lines.append(line)

if found:
    with open(r'c:\Users\User\Desktop\Autres\Oracle\lol-tracker\src\App.jsx', 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("Sucessfully patched App.jsx")
else:
    print("Target block not found precisely")
