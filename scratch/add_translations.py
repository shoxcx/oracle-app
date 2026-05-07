import os

file_path = r'src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# English keys
en_keys = """    loading_empty_slot: "Empty",
    loading_winrate: "Global Winrate",
    loading_record: "Record",
    streak_wins: "WINS STREAK",
    streak_losses: "LOSSES STREAK",
    attitude_precise: "Precise",
    attitude_struggling: "Struggling",
    attitude_on_fire: "On Fire",
    attitude_tilt: "Likely Tilting",
    attitude_expert: "Expert",
    attitude_veteran: "Veteran",
    attitude_constant: "Constant","""

# French keys
fr_keys = """    loading_empty_slot: "Vide",
    loading_winrate: "Winrate Global",
    loading_record: "Historique",
    streak_wins: "VICTOIRES D'AFFIL\u00c9E",
    streak_losses: "D\u00c9FAITES D'AFFIL\u00c9E",
    attitude_precise: "Pr\u00e9cis",
    attitude_struggling: "En Difficult\u00e9",
    attitude_on_fire: "En Feu",
    attitude_tilt: "Tilt Probable",
    attitude_expert: "Expert",
    attitude_veteran: "V\u00e9t\u00e9ran",
    attitude_constant: "Constant","""

# Add to en: {
if "en: {" in content:
    content = content.replace("en: {", "en: {\n" + en_keys)

# Add to fr: {
if "fr: {" in content:
    content = content.replace("fr: {", "fr: {\n" + fr_keys)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Translations Updated")
