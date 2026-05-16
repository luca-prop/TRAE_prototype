import re
import json

def parse_md_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    data = []
    
    def map_stage(stage_str):
        s = stage_str.strip()
        if not s: return 1
        if any(x in s for x in ['추진준비', '추진 준비', '연번부여', '연번 부여', '신속통합기획 대상지 선정', '신속통합기획 확정', '신속통합기획 완료', '신속통합기획 후보지 신청', '(모아)대상지 선정', '(모아)통합심의통과']):
            return 1
        if any(x in s for x in ['구역지정', '구역 지정', '(모아)관리계획고시', '추진위 승인', '추진위설립']):
            return 2
        if any(x in s for x in ['조합설립인가', '사업시행자 지정']):
            return 3
        if any(x in s for x in ['시공사 선정']):
            return 4
        if any(x in s for x in ['사업시행인가']):
            return 5
        if any(x in s for x in ['관리처분인가']):
            return 6
        if any(x in s for x in ['이주 및 철거']):
            return 7
        if any(x in s for x in ['착공']):
            return 8
        return 1

    def parse_price(price_str):
        nums = re.findall(r'\d+(?:\.\d+)?', price_str)
        if len(nums) >= 2:
            return [float(nums[0]), float(nums[1])]
        elif len(nums) == 1:
            return [float(nums[0]), float(nums[0])]
        return [0, 0]

    for line in lines:
        line = line.strip()
        if not line.startswith('| T'): continue
        
        cols = [c.strip() for c in line.split('|')]
        # | (empty) | Tier | Name | Location | Stage | Price | ...
        # index: 0    1      2      3          4       5
        if len(cols) < 6: continue
        
        tier = cols[1]
        name = cols[2].replace('**', '')
        location = cols[3]
        
        # 단계와 가격 컬럼이 유동적일 수 있으므로 '억'이 들어간 컬럼을 가격으로 판단
        stage_str = ""
        price_str = ""
        
        potential_price_cols = [cols[4], cols[5], cols[6]] if len(cols) > 6 else [cols[4], cols[5]]
        
        for i, col in enumerate(potential_price_cols):
            if '억' in col:
                price_str = col
                # 가격 이전 컬럼을 단계로 판단
                idx = 4 + i
                if idx > 1:
                    stage_str = cols[idx-1]
                break
        
        if not price_str:
            # '억'이 없으면 기본 위치 사용
            stage_str = cols[4]
            price_str = cols[5]

        stage = map_stage(stage_str)
        price_range = parse_price(price_str)
        
        if price_range[0] == 0: continue
        
        data.append({
            'id': name,
            'name': name,
            'district': location.split(' ')[0].strip(),
            'tier': tier,
            'stage': stage,
            'stageStr': stage_str if stage_str else "초기단계",
            'investmentMin': price_range[0],
            'investmentMax': price_range[1],
        })
    
    return data

data = parse_md_file('../docs/DATA_CURATION_SPEC.md')
with open('app/lib/scatterData.ts', 'w', encoding='utf-8') as f:
    f.write('export const scatterData = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n')
