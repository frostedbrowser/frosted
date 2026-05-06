
import os
import re

files = [
    'public/index.js',
    'public/sw.js',
    'public/register-sw.js'
]

for file_path in files:
    full_path = os.path.join('g:/mainprojects/frosted', file_path)
    if os.path.exists(full_path):
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace v=33 with v=34
        new_content = content.replace('v=33', 'v=34')
        
        if new_content != content:
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated version in {file_path}")
        else:
            print(f"No v=33 found in {file_path}")

print("Version bump complete.")
