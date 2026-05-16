import re
import json

md_path = 'c:/Users/82104/.gemini/antigravity/playground/SeedFit-project-root/SeedFit_app/docs/DATA_CURATION_SPEC.md'
ts_path = 'c:/Users/82104/.gemini/antigravity/playground/SeedFit-project-root/SeedFit_app/frontend/lib/mockData.ts'

with open(md_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

zone_ref_map = {}
for line in lines:
    if line.startswith('| T'):
        parts = [p.strip() for p in line.split('|')]
        if len(parts) >= 10:
            name_part = parts[2].replace('**', '').strip()
            ref_part = parts[-2].strip()
            if ref_part and ref_part != '(입력)':
                ref_part = ref_part.split(' / ')[0].strip()
                m = re.match(r'(.*?)\s+([\d.]+억.*)', ref_part)
                if m:
                    ref_name = m.group(1).strip()
                    ref_val = m.group(2).strip()
                else:
                    ref_name = ref_part
                    ref_val = "추후 업데이트"
                zone_ref_map[name_part] = {"refName": ref_name, "refVal": ref_val}

comp_peak_map = {}
in_table = False
for line in lines:
    if '3.1 생애최초 LTV 70%' in line:
        in_table = True
    if in_table and line.startswith('| **'):
        parts = [p.strip() for p in line.split('|')]
        if len(parts) >= 10:
            recent = parts[2].replace('**', '').replace('억', '').strip()
            name = parts[3].strip()
            peak = parts[-2].strip().replace('억', '')
            if peak:
                try:
                    recent_f = float(recent)
                    peak_f = float(peak)
                    recovery = round((recent_f / peak_f) * 100, 1)
                    comp_peak_map[name] = {'peak': f'{peak}억', 'rec': recovery}
                except ValueError:
                    pass
    if in_table and line.startswith('---'):
        in_table = False

with open(ts_path, 'r', encoding='utf-8') as f:
    ts_lines = f.readlines()

out_lines = []
curr_zone = None

for line in ts_lines:
    m_zone = re.search(r'name:\s*"([^"]+)"', line)
    if m_zone:
        curr_zone = m_zone.group(1)
    
    # Check if we are at a line with futureValue
    if 'futureValue:' in line and curr_zone:
        ref_info = zone_ref_map.get(curr_zone)
        if not ref_info:
            for k, v in zone_ref_map.items():
                if k.replace(' ', '') == curr_zone.replace(' ', ''):
                    ref_info = v
                    break
        
        if ref_info:
            val = ref_info['refVal']
            ref = ref_info['refName']
            line = re.sub(r'futureValue:\s*"[^"]*"(?:,\s*refAptName:\s*"[^"]*")?', f'futureValue: "{val}", refAptName: "{ref}"', line)
            
    # Check for COMPARISON_APTS
    if 'recentPrice:' in line and 'recovery:' in line:
        m_comp = re.search(r'name:\s*"([^"]+)"', line)
        if m_comp:
            apt_name = m_comp.group(1)
            peak_info = comp_peak_map.get(apt_name)
            if not peak_info:
                for k, v in comp_peak_map.items():
                    if k.replace(' ', '') == apt_name.replace(' ', ''):
                        peak_info = v
                        break
            if peak_info:
                peak = peak_info['peak']
                rec = peak_info['rec']
                line = re.sub(r'recovery:\s*[\d.]+(?:,\s*peakPrice:\s*"[^"]*")?', f'recovery: {rec}, peakPrice: "{peak}"', line)
                
    out_lines.append(line)

with open(ts_path, 'w', encoding='utf-8') as f:
    f.writelines(out_lines)

print("mockData.ts correctly updated.")
