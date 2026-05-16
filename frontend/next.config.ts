import type { NextConfig } from "next";

// 환경 변수 런타임 검증을 위해 env.ts 임포트 (빌드/개발 모드 기동 시 즉시 에러 발생)
import "./lib/env";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
