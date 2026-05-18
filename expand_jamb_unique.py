import os
import random
import demjson3 as demjson
import json

input_file = 'pq-jamb.html'
output_file = 'pq-jamb-expanded.html'

# Step 1: Load HTML
with open(input_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Step 2: Find JAMB_DATA
start = html.find('const JAMB_DATA = {')
brace = 1
i = start + len('const JAMB_DATA = {')
while brace > 0 and i < len(html):
    if html[i] == '{':
        brace += 1
    elif html[i] == '}':
        brace -= 1
    i += 1

data_str = html[start + len('const JAMB_DATA = '):i]

# Step 3: Parse
data = demjson.decode(data_str)

# Step 4: Expand uniquely
expanded = {}

for subject, questions in data.items():
    expanded[subject] = []
    # normalize year
    for q in questions:
        q['year'] = int(q['year'])

    # Create a pool of all questions for fallback
    all_questions = questions[:]

    for year in range(2015, 2026):
        # Get all questions for that year
        year_qs = [q for q in questions if q['year'] == year]

        # Use other years if not enough unique questions
        extra_pool = [q for q in all_questions if q not in year_qs]

        final_list = []
        used = set()

        # Add year questions first
        for q in year_qs:
            if q['q'] not in used:
                new_q = q.copy()
                new_q['year'] = year
                final_list.append(new_q)
                used.add(q['q'])

        # Fill up to 50 with unique questions from other years
        random.shuffle(extra_pool)
        for q in extra_pool:
            if len(final_list) >= 50:
                break
            if q['q'] not in used:
                new_q = q.copy()
                new_q['year'] = year
                final_list.append(new_q)
                used.add(q['q'])

        # Shuffle final questions
        random.shuffle(final_list)
        expanded[subject].extend(final_list)

# Step 5: Write expanded HTML
new_html = html[:start] + 'const JAMB_DATA = ' + json.dumps(expanded, indent=2) + html[i:]

with open(output_file, 'w', encoding='utf-8') as f:
    f.write(new_html)

print("✅ Fully unique pq-jamb-expanded.html created")