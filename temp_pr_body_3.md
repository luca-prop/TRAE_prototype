Closes #3

### 🎯 구현 내용
- `DATABASE_URL`, `SECRET_B2B/ADMIN`, `MOLIT_API_KEY` 등 7개 공통 환경 변수 스키마 정의 (`.env.example`)
- `zod`를 이용한 런타임 유효성 검증 모듈(`lib/env.ts`) 구현
- `next.config.ts` 연동으로 필수 변수 누락 시 빌드/Dev 서버 즉시 실패 처리 (Fail-fast)

### ✅ 확인 사항
- [x] `.env.example`에 7개 변수가 모두 존재하는가?
- [x] Zod 검증 로직이 동작하는가?
- [x] `.gitignore` 설정으로 시크릿 유출 방지 및 example 업로드 보장
