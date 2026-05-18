import os
import json

input_file = 'pq-jamb.html'
output_file = 'pq-jamb-expanded.html'

print("🚀 Script started...")

if not os.path.exists(input_file):
    print("❌ pq-jamb.html not found")
    exit()

print("✅ Found pq-jamb.html")

with open(input_file, 'r', encoding='utf-8') as f:
    html = f.read()

print("✅ HTML loaded")

# Find JAMB_DATA
marker = 'const JAMB_DATA = '
start = html.find(marker)
if start == -1:
    print("❌ JAMB_DATA not found")
    exit()

# Brace-match to extract the exact JS object
chunk = html[start + len(marker):]
brace = 0
end = 0
for idx, ch in enumerate(chunk):
    if ch == '{':
        brace += 1
    elif ch == '}':
        brace -= 1
        if brace == 0:
            end = idx + 1
            break

data_str = chunk[:end]
abs_end = start + len(marker) + end  # position in original html after the object

print("✅ Extracted JAMB_DATA")

# Parse — the data is already valid JSON (the original script used demjson3 as a
# workaround for trailing commas, but stdlib json is faster and safer when the
# data is clean JSON, which it is here)
try:
    data = json.loads(data_str)
    print("✅ Parsed data successfully")
except Exception as e:
    print("❌ Parse error:", e)
    exit()

# -------------------------------------------------------------------
# FIX: the original expand() caused duplicates in two ways:
#
# 1. The source data already has each question stored once per year
#    (e.g. english has 50 unique texts × 11 years = 550 entries, all
#    with a distinct year tag). expand() then re-sampled those same
#    questions for every year and padded up to 50 by drawing more
#    random copies → massive duplication.
#
# 2. The `while len(result) < 50` padding loop kept appending random
#    copies of questions already in `result` with no uniqueness check.
#
# SOLUTION: de-duplicate each subject's question pool first (keep the
# question text unique, carry the *first* year it appears as metadata
# but don't treat year as part of identity), then — only if a year
# genuinely has fewer than `target` questions — pad with *unused*
# questions from other years rather than random repeats.
# -------------------------------------------------------------------

def deduplicate_and_expand(data, target=50):
    new_data = {}

    for subject, questions in data.items():
        # 1. Build a pool of truly unique questions (keyed by question text).
        #    Preserve order; keep the entry with the earliest year.
        seen = {}
        for q in questions:
            key = q.get('q', '').strip()
            if key and key not in seen:
                seen[key] = q

        unique_pool = list(seen.values())
        print(f"  {subject}: {len(questions)} raw → {len(unique_pool)} unique questions")

        # 2. Group unique questions by their original year tag.
        from collections import defaultdict
        by_year = defaultdict(list)
        for q in unique_pool:
            by_year[int(q['year'])].append(q)

        result = []
        for year in range(2015, 2026):
            year_qs = [dict(q, year=year) for q in by_year.get(year, [])]

            # If this year has fewer than target, pad with questions from
            # other years that haven't been used for this year yet.
            if len(year_qs) < target:
                used_texts = {q['q'] for q in year_qs}
                extras = [
                    dict(q, year=year)
                    for q in unique_pool
                    if q['q'] not in used_texts
                ]
                # Take only as many as needed (no random to keep determinism;
                # swap to random.sample if you want variety across runs)
                year_qs.extend(extras[:target - len(year_qs)])

            # Cap at target (don't truncate if you want all real questions)
            result.extend(year_qs[:target])

        new_data[subject] = result

    return new_data

print("\n📊 De-duplicating and expanding questions...")
expanded = deduplicate_and_expand(data)

print("\n✅ Questions expanded")

# Write output file
try:
    new_html = (
        html[:start + len(marker)]
        + json.dumps(expanded, indent=2)
        + html[abs_end:]
    )

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(new_html)

    print(f"✅ FILE CREATED → {output_file}")

except Exception as e:
    print("❌ Write error:", e)
