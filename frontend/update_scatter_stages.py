import json
import re

ts_path = 'c:/Users/82104/.gemini/antigravity/playground/SeedFit-project-root/SeedFit_app/frontend/app/lib/scatterData.ts'

with open(ts_path, 'r', encoding='utf-8') as f:
    content = f.read()

# We need to map stageStr to the new decimal stage.
# Let's extract the JS array using regex
match = re.search(r'export const scatterData = (\[.*?\]);', content, re.DOTALL)
if not match:
    print("Could not find scatterData array")
    exit(1)

data_json = match.group(1)
# Because it's a JS object without strict JSON keys, we might need a workaround if it's not valid JSON.
# But looking at the file, the keys are quoted like "id", "name", etc., so it IS valid JSON!
data = json.loads(data_json)

# Define mapping
mapping = {
    # 1단계
    "추진준비": 1.1,
    "(모아타운)추진준비": 1.1,
    "연번 부여": 1.2,
    "연번부여": 1.2,
    "신속통합기획 대상지 선정": 1.3,
    "(모아)대상지 선정": 1.3,
    "신속통합기획 확정": 1.4,
    "신속통합기획 후보지 신청": 1.25, # Not explicitly defined, but it's between 연번부여 and 대상지선정/확정... wait, "신속통합기획 후보지 신청" in spec? Let's just put 1.25
    "신속통합기획 완료": 1.4,
    "(모아)관리계획수립": 1.4,
    "(모아)통합심의통과": 1.4,

    # 2단계
    "구역지정": 2.1,
    "정비구역지정": 2.1,
    "정비구역 지정": 2.1,
    "(모아)관리계획고시": 2.1,
    "추진위 승인": 2.2,
    "추진위설립": 2.2,

    # 3단계
    "조합설립인가": 3.1,
    "조합설립": 3.1,
    "사업시행자 지정": 3.1, # (신탁방식)

    # 4단계
    "시공사 선정": 4.1,
    "시공사선정": 4.1,
    "건축심의": 4.2,

    # 5단계
    "사업시행인가": 5.1,
    "사업시행": 5.1,

    # 6단계
    "관리처분인가": 6.1,
    "관리처분": 6.1,

    # 7단계
    "이주": 7.1,
    "철거": 7.2,

    # 8단계
    "착공": 8.1
}

# Apply mapping
for item in data:
    stage_str = item.get("stageStr", "")
    if stage_str in mapping:
        item["stage"] = mapping[stage_str]
    else:
        # Check if any key matches
        for k, v in mapping.items():
            if k in stage_str:
                item["stage"] = v
                break

new_data_json = json.dumps(data, ensure_ascii=False, indent=2)
new_content = content[:match.start(1)] + new_data_json + content[match.end(1):]

with open(ts_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("scatterData updated with sub-stages.")
