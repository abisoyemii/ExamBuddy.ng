import re
import json
import os

file_path = r'c:/Users/toshiba/Desktop/Exambuddy/pq-jamb.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract JAMB_DATA JSON
match = re.search(r'const JAMB_DATA\s*=\s*({.*?});', content, re.DOTALL)
if not match:
    print("No JAMB_DATA found")
    exit(1)

json_str = match.group(1)
data = json.loads(json_str)

# Collect all questions
all_questions = []
for subject, questions in data.items():
    for item in questions:
        if isinstance(item, dict) and 'q' in item and 'opts' in item and 'ans' in item:
            opts_key = '||'.join(item['opts'])
            q_key = f"{item['q']}||{opts_key}||{item['ans']}"
            all_questions.append(q_key)

total = len(all_questions)
unique_count = len(set(all_questions))
duplicates = total - unique_count

print(f"Total questions: {total}")
print(f"Unique questions: {unique_count}")
print(f"Duplicate questions: {duplicates}")

# Per-subject duplicates if needed
print("\nPer-subject analysis:")
for subject, questions in data.items():
    sub_qs = []
    for item in questions:
        if isinstance(item, dict) and 'q' in item and 'opts' in item and 'ans' in item:
            opts_key = '||'.join(item['opts'])
            q_key = f"{item['q']}||{opts_key}||{item['ans']}"
            sub_qs.append(q_key)
    sub_total = len(sub_qs)
    sub_unique = len(set(sub_qs))
    print(f"{subject}: {sub_total} total, {sub_unique} unique, {sub_total - sub_unique} duplicates")

