import json
import re

def parse_budget(text):
    m = re.search(r'([\d\.]+)억', text)
    if m:
        return int(float(m.group(1)) * 100000000)
    return 300000000

zones = []
zone_id = 1
with open(r'c:\Users\82104\.gemini\antigravity\playground\SeedFit-project-root\SeedFit_app\docs\DATA_CURATION_SPEC.md', 'r', encoding='utf-8') as f:
    content = f.read()

zone_section = content.split('## 2. 재개발 구역 마스터 데이터')[1].split('## 3. 대조군 기축 아파트 데이터')[0]
for line in zone_section.split('\n'):
    if line.startswith('| T'):
        cols = [col.strip() for col in line.split('|')[1:-1]]
        cols_clean = [col for col in cols if col != '']
        if len(cols_clean) >= 4:
            tier = cols_clean[0]
            name = cols_clean[1].replace('**', '').strip()
            district = cols_clean[2].split()[0]
            stage = cols_clean[3]
            budget_str = cols_clean[4]
            budget = parse_budget(budget_str)
            
            zones.append({
                'id': f'zone-{zone_id}',
                'name': name,
                'district': district,
                'stage': stage,
                'minBudget': budget
            })
            zone_id += 1

apt_section = content.split('### 3.1 생애최초 LTV 70% 적용 모델')[1].split('### 3.2')[0]
apts = []
apt_id = 1
for line in apt_section.split('\n'):
    if line.startswith('| **'):
        cols = [col.strip().replace('**', '') for col in line.split('|')[1:-1]]
        if len(cols) >= 8:
            target_price = cols[0]
            actual_price = cols[1]
            name = cols[2]
            district = cols[3]
            apt_type = cols[4].replace('평', '')
            inv_str = cols[5]
            inv_num = parse_budget(inv_str)
            
            apts.append({
                'id': apt_id,
                'name': name,
                'aptType': "59" if apt_type == "24" else "84",
                'recentPrice': actual_price,
                'recovery': 85.0,
                'peakPrice': str(round(float(actual_price.replace('억', '')) * 1.15, 1)) + "억",
                'requiredInvestment': inv_str,
                'numInvestment': inv_num,
                'status': 'good'
            })
            apt_id += 1

ts_content = """export type UnitType = "59" | "84";

export interface ZoneData {
  name: string;
  stage: string;
  district: string;
  minBudget: number;
  data: Record<UnitType, { unitPrice: string; premium: string; totalInvestment: string; futureValue: string }>;
}

export const ZONE_DATA: Record<string, ZoneData> = {
"""

for z in zones:
    ts_content += f"""  "{z['id']}": {{
    name: "{z['name']}",
    district: "{z['district']}",
    stage: "{z['stage']}",
    minBudget: {z['minBudget']},
    data: {{
      "59": {{ unitPrice: "추후 업데이트", premium: "추후 업데이트", totalInvestment: "추후 업데이트", futureValue: "약 12억 원" }},
      "84": {{ unitPrice: "추후 업데이트", premium: "추후 업데이트", totalInvestment: "추후 업데이트", futureValue: "약 15억 원" }},
    }},
  }},
"""

ts_content += "};\n\nexport const COMPARISON_APTS = [\n"
for a in apts:
    ts_content += f"""  {{ id: {a['id']}, name: "{a['name']}", aptType: "{a['aptType']}", recentPrice: "{a['recentPrice']}", recovery: {a['recovery']}, peakPrice: "{a['peakPrice']}", requiredInvestment: "{a['requiredInvestment']}", numInvestment: {a['numInvestment']}, status: "{a['status']}" as const }},\n"""
ts_content += "];\n\n"

ts_content += """export const ZONE_NAMES: Record<string, string> = Object.fromEntries(
  Object.entries(ZONE_DATA).map(([id, zone]) => [id, zone.name])
);

export const MOCK_PROPERTIES = [
  { id: 1, type: "다세대", price: "560,000,000", premium: "260,000,000", rightsPrice: "300,000,000", verified: true },
  { id: 2, type: "뚜껑", price: "450,000,000", premium: "210,000,000", rightsPrice: "240,000,000", verified: true },
  { id: 3, type: "빌라", price: "920,000,000", premium: "350,000,000", rightsPrice: "570,000,000", verified: false },
  { id: 4, type: "다세대", price: "880,000,000", premium: "330,000,000", rightsPrice: "550,000,000", verified: false },
];
"""

with open(r'c:\Users\82104\.gemini\antigravity\playground\SeedFit-project-root\SeedFit_app\frontend\lib\mockData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Parsed {len(zones)} zones and {len(apts)} apartments.")
