
import os
import re

files = [
    'public/index.js',
    'public/sw.js'
]

for file_path in files:
    full_path = os.path.join('g:/mainprojects/frosted', file_path)
    if os.path.exists(full_path):
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace scram/ with sj/
        new_content = content.replace('scram/', 'sj/')
        
        if new_content != content:
            with open(full_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated paths in {file_path}")
        else:
            print(f"No scram/ found in {file_path}")

print("Path update complete.")
